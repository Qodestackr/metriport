import { z } from "zod";
import { consolidationConversionType, resourceTypeForConsolidation } from "../../medical";

export const internalSendConsolidatedSchema = z.object({
  bundleLocation: z.string(),
  bundleFilename: z.string(),
  requestId: z.string(),
  conversionType: z.enum(consolidationConversionType).optional(),
  generateAiBrief: z.boolean().optional(),
  resources: z.array(z.enum(resourceTypeForConsolidation)).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type InternalSendConsolidated = z.infer<typeof internalSendConsolidatedSchema>;