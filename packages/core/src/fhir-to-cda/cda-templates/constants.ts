import { Config } from "../../util/config";
const metriportOid = Config.getSystemRootOID();

export const _xsiTypeAttribute = "_xsi:type";
export const _xmlnsSdtcAttribute = "_xmlns:sdtc";
export const _xmlnsXsiAttribute = "_xmlns:xsi";
export const _xmlnsXsiValue = "http://www.w3.org/2001/XMLSchema-instance";
export const loincSystemCode = "2.16.840.1.113883.6.1";
export const snomedSystemCode = "2.16.840.1.113883.6.96";
export const nlmNihSystemCode = "2.16.840.1.113883.6.88";
export const amaAssnSystemCode = "2.16.840.1.113883.6.12";
export const fdasisSystemCode = "2.16.840.1.113883.4.9";
export const hl7ActCode = "2.16.840.1.113883.5.4";
export const providerTaxonomy = "2.16.840.1.113883.6.101";
export const vaccineAdministeredCodeSet = "2.16.840.1.113883.12.292";
export const icd10SystemCode = "2.16.840.1.113883.6.90";
export const extensionValue2014 = "2014-06-09";
export const extensionValue2015 = "2015-08-01";
export const extensionValue2019 = "2019-06-20";
export const loincCodeSystem = "2.16.840.1.113883.6.1";
export const loincSystemName = "LOINC";
export const snomedCodeSystem = "2.16.840.1.113883.6.96";
export const snomedSystemName = "SNOMED CT";
export const placeholderOrgOid = "placeholder-ORG-OID";
export const NOT_SPECIFIED = "Not Specified";

// Codes taken from: https://www.hl7.org/ccdasearch/
export const oids = {
  assessmentAndPlanSection: "2.16.840.1.113883.10.20.22.2.9",
  medicationsSection: "2.16.840.1.113883.10.20.22.2.1.1",
  mentalStatusSection: "2.16.840.1.113883.10.20.22.2.56",
  problemsSection: "2.16.840.1.113883.10.20.22.2.5.1",
  proceduresSection: "2.16.840.1.113883.10.20.22.2.7",
  resultsSection: "2.16.840.1.113883.10.20.22.2.3.1",
  socialHistorySection: "2.16.840.1.113883.10.20.22.2.17",
  encountersSection: "2.16.840.1.113883.10.20.22.2.22",
  immunizationsSection: "2.16.840.1.113883.10.20.22.2.2.1",
  familyHistorySection: "2.16.840.1.113883.10.20.22.2.15",
  allergiesSection: "2.16.840.1.113883.10.20.22.2.6.1",
  notesSection: "2.16.840.1.113883.10.20.22.2.65",
  problemConcernAct: "2.16.840.1.113883.10.20.22.4.3",
  socialHistoryObs: "2.16.840.1.113883.10.20.22.4.38",
  vitalSignsObs: "2.16.840.1.113883.10.20.22.4.27",
  vitalSignsSection: "2.16.840.1.113883.10.20.22.2.4.1",
  medicationActivity: "2.16.840.1.113883.10.20.22.4.16",
  mentalStatusObs: "2.16.840.1.113883.10.20.22.4.74",
  problemObs: "2.16.840.1.113883.10.20.22.4.4",
  resultOrganizer: "2.16.840.1.113883.10.20.22.4.1",
  familyHistoryOrganizer: "2.16.840.1.113883.10.20.22.4.45",
  familyHistoryObservation: "2.16.840.1.113883.10.20.22.4.46",
  medicationInformation: "2.16.840.1.113883.10.20.22.4.23",
  resultObs: "2.16.840.1.113883.10.20.22.4.2",
  allergyConcernAct: "2.16.840.1.113883.10.20.22.4.30",
  allergyIntoleranceObservation: "2.16.840.1.113883.10.20.22.4.7",
  reactionObservation: "2.16.840.1.113883.10.20.22.4.9",
  encounterActivity: "2.16.840.1.113883.10.20.22.4.49",
  immunizationActivity: "2.16.840.1.113883.10.20.22.4.52",
  encounterDiagnosis: "2.16.840.1.113883.10.20.22.4.80",
  immunizationMedicationInformation: "2.16.840.1.113883.10.20.22.4.54",
  serviceDeliveryLocation: "2.16.840.1.113883.10.20.22.4.32",
  vitalSignsOrganizer: "2.16.840.1.113883.10.20.22.4.26",
  noteActivity: "2.16.840.1.113883.10.20.22.4.202",
  procedureActivity: "2.16.840.1.113883.10.20.22.4.14",
  problemStatus: "2.16.840.1.113883.10.20.22.4.6",
};

export const mentalHealthSurveyCodes = ["44249-1"];
export const socialHistorySurveyCodes = ["lg51306-5"];

export const clinicalDocumentConstants = {
  realmCode: "US",
  typeIdExtension: "POCD_HD000040",
  typeIdRoot: "2.16.840.1.113883.1.3",
  templateIds: [
    { root: "2.16.840.1.113883.10.20.22.1.1", extension: extensionValue2015 },
    { root: "2.16.840.1.113883.10.20.22.1.9", extension: extensionValue2015 },
  ],
  assigningAuthorityName: "METRIPORT",
  rootOid: metriportOid,
  code: {
    codeSystem: "2.16.840.1.113883.6.1",
    codeSystemName: "LOINC",
  },
  confidentialityCode: {
    code: "N",
    codeSystem: "2.16.840.1.113883.5.25",
    displayName: "Normal",
  },
  languageCode: "en-US",
  versionNumber: "3",
};
