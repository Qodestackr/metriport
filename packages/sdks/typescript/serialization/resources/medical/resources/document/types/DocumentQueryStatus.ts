/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Metriport from "../../../../../../api";
import * as core from "../../../../../../core";

export const DocumentQueryStatus: core.serialization.Schema<
    serializers.medical.DocumentQueryStatus.Raw,
    Metriport.medical.DocumentQueryStatus
> = core.serialization.enum_(["processing", "completed", "failed"]);

export declare namespace DocumentQueryStatus {
    type Raw = "processing" | "completed" | "failed";
}