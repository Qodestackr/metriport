import { Sequelize } from "sequelize";
import { DocumentQueryResult } from "../../domain/medical/document-query-result";
import { DocumentQueryResponseIncoming } from "@metriport/ihe-gateway-sdk";
import { ModelSetup } from "../_default";
import { BaseIHEResultModel } from "./ihe-result";

export class DocumentQueryResultModel
  extends BaseIHEResultModel<DocumentQueryResultModel>
  implements DocumentQueryResult
{
  static NAME = "document_query_result";
  declare data: DocumentQueryResponseIncoming;

  static setup: ModelSetup = (sequelize: Sequelize) => {
    DocumentQueryResultModel.init(BaseIHEResultModel.attributes(), {
      ...BaseIHEResultModel.modelOptions(sequelize),
      tableName: DocumentQueryResultModel.NAME,
    });
  };
}