import { CodeableConcept, Medication } from "@medplum/fhirtypes";
import {
  NDC_CODE,
  NDC_OID,
  RXNORM_CODE,
  RXNORM_OID,
  SNOMED_CODE,
  SNOMED_OID,
} from "../../util/constants";
import { combineResources, fillMaps } from "../shared";

export function deduplicateMedications(medications: Medication[]): {
  combinedMedications: Medication[];
  refReplacementMap: Map<string, string[]>;
} {
  const { rxnormMap, ndcMap, snomedMap, refReplacementMap } = groupSameMedications(medications);
  return {
    combinedMedications: combineResources({
      combinedMaps: [rxnormMap, ndcMap, snomedMap],
    }),
    refReplacementMap,
  };
}

export function groupSameMedications(medications: Medication[]): {
  rxnormMap: Map<string, Medication>;
  ndcMap: Map<string, Medication>;
  snomedMap: Map<string, Medication>;
  refReplacementMap: Map<string, string[]>;
} {
  const rxnormMap = new Map<string, Medication>();
  const ndcMap = new Map<string, Medication>();
  const snomedMap = new Map<string, Medication>();
  const refReplacementMap = new Map<string, string[]>();

  function removeOtherCodes(master: Medication): Medication {
    const code = master.code;
    const filtered = code?.coding?.filter(coding => {
      const system = coding.system?.toLowerCase();
      return (
        system?.includes(SNOMED_CODE) ||
        system?.includes(SNOMED_OID) ||
        system?.includes(NDC_CODE) ||
        system?.includes(NDC_OID) ||
        system?.includes(RXNORM_CODE) ||
        system?.includes(RXNORM_OID)
      );
    });
    if (filtered) {
      master.code = {
        ...code,
        coding: filtered,
      };
    }
    return master;
  }

  for (const medication of medications) {
    // TODO: Deal with medications that contain >1 rxnorm / ndc code
    const { rxnormCode, ndcCode, snomedCode } = extractCodes(medication.code);

    if (rxnormCode) {
      fillMaps(rxnormMap, rxnormCode, medication, refReplacementMap, false, removeOtherCodes);
    } else if (ndcCode) {
      fillMaps(ndcMap, ndcCode, medication, refReplacementMap, false, removeOtherCodes);
    } else if (snomedCode) {
      fillMaps(snomedMap, snomedCode, medication, refReplacementMap, false, removeOtherCodes);
    }
  }

  return {
    rxnormMap,
    ndcMap,
    snomedMap,
    refReplacementMap,
  };
}

function extractCodes(concept: CodeableConcept | undefined): {
  rxnormCode: string | undefined;
  ndcCode: string | undefined;
  snomedCode: string | undefined;
} {
  let rxnormCode = undefined;
  let ndcCode = undefined;
  let snomedCode = undefined;
  if (!concept) return { rxnormCode, ndcCode, snomedCode };

  if (concept && concept.coding) {
    for (const coding of concept.coding) {
      const system = coding.system?.toLowerCase();
      const code = coding.code?.trim().toLowerCase();
      if (system && code) {
        if (system.includes(RXNORM_CODE) || system.includes(RXNORM_OID)) {
          rxnormCode = code;
        } else if (system.includes(NDC_CODE) || system.includes(NDC_OID)) {
          ndcCode = code;
        } else if (system.includes(SNOMED_CODE) || system.includes(SNOMED_OID)) {
          snomedCode = code;
        }
      }
    }
  }
  return { rxnormCode, ndcCode, snomedCode };
}