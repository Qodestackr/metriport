import { Bundle } from "@medplum/fhirtypes";
import { buildAllergies } from "../components/allergies";
import { buildEncounters } from "../components/encounters";
import { buildFamilyHistory } from "../components/family-history";
import { buildImmunizations } from "../components/immunizations";
import { buildMedications } from "../components/medications";
import { buildMentalStatus } from "../components/mental-status";
import { buildProblems } from "../components/problems";
import { buildProcedures } from "../components/procedures";
import { buildSocialHistory } from "../components/social-history";
import { buildVitalSigns } from "../components/vital-signs";
import { buildAssessmentAndPlan } from "../components/assessment-and-plan";
import { buildVariousNotesAndResults } from "../components/notes-and-results";

export function buildStructuredBody(fhirBundle: Bundle): unknown {
  const variousNotes = buildVariousNotesAndResults(fhirBundle);
  const structuredBodySections = [
    buildSocialHistory(fhirBundle),
    buildMentalStatus(fhirBundle),
    buildMedications(fhirBundle),
    buildProblems(fhirBundle),
    buildAllergies(fhirBundle),
    buildEncounters(fhirBundle),
    buildImmunizations(fhirBundle),
    buildVitalSigns(fhirBundle),
    buildFamilyHistory(fhirBundle),
    buildProcedures(fhirBundle),
    buildAssessmentAndPlan(),
    ...(variousNotes ? variousNotes : []),
  ];

  return {
    structuredBody: {
      component: structuredBodySections.map(section => ({
        section: section,
      })),
    },
  };
}
