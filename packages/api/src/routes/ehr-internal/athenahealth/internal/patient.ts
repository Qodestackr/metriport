import Router from "express-promise-router";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { getPatientIdsOrFailFromAppointments } from "../../../../external/ehr/athenahealth/command/get-patients-from-appointments";
import { requestLogger } from "../../../helpers/request-logger";
import { asyncHandler } from "../../../util";
const router = Router();

/**
 * POST /internal/ehr/athenahealth/patient/from-appointments
 *
 * Fetches appointments in a predefined window and creates all patients not already existing
 */
router.post(
  "/from-appointments",
  requestLogger,
  asyncHandler(async (req: Request, res: Response) => {
    getPatientIdsOrFailFromAppointments();
    return res.sendStatus(httpStatus.OK);
  })
);

export default router;