import { cloneDeep } from "lodash";
import { getPatientOrFail } from "../../command/medical/patient/get-patient";
import { Patient } from "../../models/medical/patient";
import { PatientDataCommonwell } from "./patient-shared";
import { LinkStatus } from "../patient-link";

export const setCommonwellId = async ({
  patientId,
  cxId,
  commonwellPatientId,
  commonwellPersonId,
  commonwellStatus,
}: {
  patientId: string;
  cxId: string;
  commonwellPatientId: string;
  commonwellPersonId: string | undefined;
  commonwellStatus?: LinkStatus | undefined;
}): Promise<Patient> => {
  const updatedPatient = await getPatientOrFail({ id: patientId, cxId });

  const updatedData = cloneDeep(updatedPatient.data);
  updatedData.externalData = {
    ...updatedData.externalData,
    COMMONWELL: new PatientDataCommonwell(
      commonwellPatientId,
      commonwellPersonId,
      commonwellStatus
    ),
  };

  return updatedPatient.update({ data: updatedData });
};