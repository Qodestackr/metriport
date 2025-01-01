import { z } from "zod";
import { schemaOrArray, samlHeaderSchema, slot, stringOrNumberSchema } from "../../../schema";

export const iti38RequestBody = z.object({
  AdhocQueryRequest: z.object({
    ResponseOption: z.object({
      _returnType: z.literal("LeafClass"),
    }),
    AdhocQuery: z.object({
      Slot: schemaOrArray(slot),
    }),
  }),
});

export const iti38RequestSchema = z.object({
  Envelope: z.object({
    Header: samlHeaderSchema,
    Body: iti38RequestBody,
  }),
});
export type Iti38Request = z.infer<typeof iti38RequestSchema>;

export const DocumentRequest = z.object({
  DocumentUniqueId: stringOrNumberSchema,
  RepositoryUniqueId: stringOrNumberSchema,
  HomeCommunityId: stringOrNumberSchema,
});
export type DocumentRequest = z.infer<typeof DocumentRequest>;

export const iti39RequestBody = z.object({
  RetrieveDocumentSetRequest: z.object({
    DocumentRequest: schemaOrArray(DocumentRequest),
  }),
});

export const iti39RequestSchema = z.object({
  Envelope: z.object({
    Header: samlHeaderSchema,
    Body: iti39RequestBody,
  }),
});
export type Iti39Request = z.infer<typeof iti39RequestSchema>;
