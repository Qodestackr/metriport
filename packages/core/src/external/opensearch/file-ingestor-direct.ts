import { Client } from "@opensearch-project/opensearch";
import { IndexFields } from ".";
import { out } from "../../util/log";
import { makeS3Client } from "../aws/s3";
import {
  IngestRequest,
  OpenSearchFileIngestor,
  OpenSearchFileIngestorConfig,
} from "./file-ingestor";

export type OpenSearchFileIngestorDirectSettings = {
  logLevel?: "info" | "debug" | "none";
};

export type OpenSearchFileIngestorDirectConfig = OpenSearchFileIngestorConfig & {
  endpoint: string;
  username: string;
  password: string;
  settings?: OpenSearchFileIngestorDirectSettings;
};

export class OpenSearchFileIngestorDirect extends OpenSearchFileIngestor {
  private readonly endpoint: string;
  private readonly username: string;
  private readonly password: string;
  private readonly settings: OpenSearchFileIngestorDirectSettings;

  constructor(config: OpenSearchFileIngestorDirectConfig) {
    super(config);
    this.endpoint = config.endpoint;
    this.username = config.username;
    this.password = config.password;
    this.settings = {
      logLevel: config.settings?.logLevel ?? "none",
    };
  }

  // TODO split into 2: one that gets the actual content, another (class?) that gets form S3 and ingests w/ content
  async ingest({
    cxId,
    patientId,
    entryId,
    s3FileName,
    s3BucketName,
  }: IngestRequest): Promise<void> {
    const defaultLogger = out(`ingest - ${cxId} - ${patientId}`, `- fileName: ${s3FileName}`);
    const log = this.getLog(defaultLogger);

    const data = await this.getFileContents(s3FileName, s3BucketName, log);
    if (!data) {
      log(`Empty data reading file from S3, skipping search ingestion...`);
      return;
    }
    const content = this.cleanUpContents(data, log);
    await this.sendToOpenSearch(
      {
        cxId,
        patientId,
        entryId,
        s3FileName,
        content,
      },
      log
    );
  }

  private async getFileContents(s3FileName: string, s3BucketName: string, log = console.log) {
    const s3 = makeS3Client(this.config.region);
    log(`Downloading from ${s3BucketName}...`);
    const obj = await s3
      .getObject({
        Bucket: s3BucketName,
        Key: s3FileName,
      })
      .promise();
    return obj.Body?.toString("utf-8");
  }

  // IMPORTANT: keep this in sync w/ the Lambda's sqs-to-opensearch-xml.ts version of it.
  // Ideally we would use the same code the Lambda does, but since the cost/benefit doesn't seeem to be worth it.
  private cleanUpContents(contents: string, log = console.log) {
    log(`Cleaning up file contents...`);
    const result = contents
      .trim()
      .toLowerCase()
      .replace(/"/g, "'")
      .replace(/(\s\s+)|(\n\n)|(\n)|(\t)|(\r)/g, " ");
    return result;
  }

  private async sendToOpenSearch(
    {
      cxId,
      patientId,
      entryId,
      s3FileName,
      content,
    }: {
      cxId: string;
      patientId: string;
      entryId: string;
      s3FileName: string;
      content: string;
    },
    log = console.log
  ): Promise<void> {
    const { indexName } = this.config;
    const auth = { username: this.username, password: this.password };
    const client = new Client({ node: this.endpoint, auth });

    // create index if it doesn't already exist
    const indexExists = Boolean((await client.indices.exists({ index: indexName })).body);
    if (!indexExists) {
      log(`Index ${indexName} doesn't exist, creating one...`);
      const indexProperties: Record<keyof IndexFields, { type: string }> = {
        cxId: { type: "keyword" },
        patientId: { type: "keyword" },
        s3FileName: { type: "keyword" },
        content: { type: "text" },
      };
      const body = { mappings: { properties: indexProperties } };
      const createResult = (await client.indices.create({ index: indexName, body })).body;
      log(`Created index ${indexName}: ${JSON.stringify(createResult)}`);
    }

    // add a document to the index
    const document: IndexFields = {
      cxId,
      patientId,
      s3FileName,
      content,
    };

    log(`Ingesting file ${s3FileName} into index ${indexName}...`);
    const response = await client.update({
      index: indexName,
      id: entryId,
      body: { doc: document, doc_as_upsert: true },
    });
    log(`Successfully ingested it, response: ${JSON.stringify(response.body)}`);
  }

  private getLog(defaultLogger: ReturnType<typeof out>): typeof console.log {
    if (this.settings.logLevel === "none") return () => {}; //eslint-disable-line @typescript-eslint/no-empty-function
    if (this.settings.logLevel === "debug") return defaultLogger.debug;
    return defaultLogger.log;
  }
}