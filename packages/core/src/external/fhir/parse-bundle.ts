import { Bundle } from "@medplum/fhirtypes";
import { Config } from "../../util/config";
import { uuidv4 } from "../../util/uuid-v7";

const sourceUrl = "https://api.metriport.com/cda/to/fhir";
const placeholderReplaceRegex = new RegExp("66666666-6666-6666-6666-666666666666", "g");
const metriportPrefixRegex = new RegExp("Metriport/identifiers/Metriport/", "g");

// Moved here from sqs-to-fhir.ts

export function parseRawBundleForFhirServer(
  payloadRaw: string,
  patientId: string,
  log: typeof console.log
): Bundle {
  let payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (Config.isSandbox()) {
    const idsReplaced = replaceIds(payloadRaw);
    log(`IDs replaced, length: ${idsReplaced.length}`);
    const placeholderUpdated = idsReplaced.replace(placeholderReplaceRegex, patientId);
    payload = JSON.parse(placeholderUpdated);
    log(`Payload to FHIR (length ${placeholderUpdated.length}): ${JSON.stringify(payload)}`);
  } else {
    payload = JSON.parse(payloadRaw);
  }
  // light validation to make sure it's a bundle
  if (payload.resourceType !== "Bundle") {
    throw new Error(`Not a FHIR Bundle`);
  }
  return payload;
}

function replaceIds(payload: string) {
  const fhirBundle = JSON.parse(payload);
  const stringsToReplace: { old: string; new: string }[] = [];
  for (const bundleEntry of fhirBundle.entry) {
    // validate resource id
    const idToUse = bundleEntry.resource.id;
    const newId = uuidv4();
    bundleEntry.resource.id = newId;
    stringsToReplace.push({ old: idToUse, new: newId });
    // replace meta's source and profile
    bundleEntry.resource.meta = {
      lastUpdated: bundleEntry.resource.meta?.lastUpdated ?? new Date().toISOString(),
      source: sourceUrl,
    };
  }
  let fhirBundleStr = JSON.stringify(fhirBundle);
  for (const stringToReplace of stringsToReplace) {
    // doing this is apparently more efficient than just using replace
    const regex = new RegExp(stringToReplace.old, "g");
    fhirBundleStr = fhirBundleStr.replace(regex, stringToReplace.new);
  }

  fhirBundleStr = fhirBundleStr.replace(metriportPrefixRegex, "");

  return fhirBundleStr;
}