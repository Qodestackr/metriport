import { XMLBuilder } from "fast-xml-parser";
import { InboundDocumentRetrievalResp } from "@metriport/ihe-gateway-sdk";
import { successStatus, failureStatus, errorSeverity, createSecurityHeader } from "../../shared";
import { xmlBuilderAttributes } from "../../../shared";
import { namespaces } from "../../../constants";
import { S3Utils } from "../../../../../aws/s3";
import { Config } from "../../../../../../util/config";
import { wrapIdInUrnOid } from "../../../../../../util/urn";

const region = Config.getAWSRegion();
const medicalDocumentsBucketName = Config.getMedicalDocumentsBucketName();
let s3UtilsInstance = new S3Utils(region);

function getS3UtilsInstance(): S3Utils {
  return s3UtilsInstance;
}
export function setS3UtilsInstance(s3Utils: S3Utils): void {
  s3UtilsInstance = s3Utils;
}

async function createIti39SoapBody(response: InboundDocumentRetrievalResp): Promise<object> {
  const success = response?.documentReference ? true : false;
  const s3Utils = getS3UtilsInstance();
  const documentResponses = success
    ? await Promise.all(
        (response?.documentReference || []).map(async entry => {
          if (!entry.urn) {
            throw new Error("Document URN is required");
          }
          if (!entry.contentType) {
            throw new Error("Document content type is required");
          }
          const doc = await s3Utils.downloadFile({
            key: entry.urn,
            bucket: medicalDocumentsBucketName,
          });
          const doc64 = Buffer.from(doc).toString("base64");
          return {
            DocumentResponse: {
              HomeCommunityId: wrapIdInUrnOid(entry.homeCommunityId),
              RepositoryUniqueId: entry.repositoryUniqueId,
              DocumentUniqueId: entry.docUniqueId,
              mimeType: entry.contentType,
              Document: doc64,
            },
          };
        })
      )
    : undefined;

  const registryErrors = !success
    ? (response?.operationOutcome?.issue || []).map(issue => ({
        "@_codeContext": issue.details.text,
        "@_errorCode": issue.details?.coding?.[0]?.code,
        "@_severity": errorSeverity,
      }))
    : undefined;

  const soapBody = {
    "@_xmlns": namespaces.urn,
    "@_xmlns:xsd": namespaces.xs,
    "@_xmlns:xsi": namespaces.xsi,
    RetrieveDocumentSetResponse: {
      "@_xmlns": namespaces.urnihe,
      RegistryResponse: {
        "@_xmlns": namespaces.rs,
        "@_status": success ? successStatus : failureStatus,
        ...(registryErrors &&
          registryErrors.length > 0 && {
            RegistryErrorList: {
              RegistryError: registryErrors,
            },
          }),
      },
      ...(documentResponses &&
        documentResponses.length > 0 && {
          DocumentResponse: documentResponses.map(obj => ({
            "@_xmlns": namespaces.urnihe,
            ...obj.DocumentResponse,
          })),
        }),
    },
  };
  return soapBody;
}

export async function createInboundDrResponse(
  response: InboundDocumentRetrievalResp
): Promise<string> {
  const securityHeader = createSecurityHeader({
    signatureConfirmation: response.signatureConfirmation,
  });
  const soapBody = await createIti39SoapBody(response);

  const soapEnvelope = {
    "soap:Envelope": {
      "@_xmlns:soap": namespaces.soap,
      "@_xmlns:wsa": namespaces.wsa,
      "soap:Header": {
        ...securityHeader,
        "wsa:Action": {
          "#text": "urn:ihe:iti:2007:CrossGatewayRetrieveResponse",
          "@_mustUnderstand": "1",
        },
        "wsa:RelatesTo": response.id,
      },
      "soap:Body": soapBody,
    },
  };

  const builder = new XMLBuilder(xmlBuilderAttributes);
  const xmlContent = builder.build(soapEnvelope);
  return xmlContent;
}
