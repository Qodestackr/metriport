import { Encounter, Practitioner, Location } from "@medplum/fhirtypes";
import { exampleAddress } from "./make-encounter";

export const encounter1: Partial<Encounter> = {
  status: "finished",
  class: {
    code: "99214",
    display: "OV EST PT LEV 4",
    system: "http://www.ama-assn.org/go/cpt",
  },
  type: [
    {
      text: "Urgent Care Office Visit",
      coding: [
        {
          code: "99214",
          display: "OV EST PT LEV 4",
          system: "http://www.ama-assn.org/go/cpt",
        },
      ],
    },
  ],
  period: { start: "2012-07-23T16:45:00.000Z", end: "2012-07-23T17:00:00.000Z" },
  reasonCode: [
    {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "444814009",
          display: "Viral sinusitis (disorder)",
        },
      ],
    },
    {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "82423001",
          display: "Chronic pain (finding)",
        },
      ],
    },
  ],
};

export const practitioner1: Partial<Practitioner> = {
  identifier: [{ system: "http://hl7.org/fhir/sid/us-npi", value: "111222333" }],
  name: [{ family: "Zoidberg", given: ["John A."], suffix: ["MD"] }],
  address: [exampleAddress],
  telecom: [{ system: "phone", value: "+1-600-700-8000", use: "work" }],
  qualification: [
    {
      code: {
        text: "FAMILY MEDICINE PHYSICIAN",
        coding: [
          {
            code: "207Q00000X",
            display: "FAMILY MEDICINE PHYSICIAN",
            system: "http://nucc.org/provider-taxonomy",
          },
          {
            code: "319",
            display: "Physician Assistant",
            system: "urn:oid:1.2.840.114350.1.13.76.2.7.10.836982.1050",
          },
        ],
      },
    },
  ],
};

export const practitioner2: Partial<Practitioner> = {
  ...practitioner1,
  name: [{ family: "Farnsworth", given: ["Hubert"], suffix: ["MD"] }],
  qualification: [
    {
      code: {
        text: "FAMILY MEDICINE PHYSICIAN",
        coding: [
          {
            code: "207Q00000X",
            display: "FAMILY MEDICINE PHYSICIAN",
            system: "http://nucc.org/provider-taxonomy",
          },
        ],
      },
    },
  ],
};

export const location1: Partial<Location> = {
  name: "Planet Express Medical Office",
  address: exampleAddress,
  type: [
    {
      text: "Urgent Care",
    },
  ],
};
