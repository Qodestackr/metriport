import { FacilityType } from "../../../../domain/medical/facility";
import { FacilityModel } from "../../../../models/medical/facility";
import { mockStartTransaction } from "../../../../models/__tests__/transaction";
import { createFacility, validateObo } from "../create-facility";
import { makeFacilityCreate, makeFacilityCreateCmd } from "./create-facility";

describe("createFacility", () => {
  describe("createFacility", () => {
    let facilityModel_create: jest.SpyInstance;
    beforeEach(() => {
      jest.restoreAllMocks();
      mockStartTransaction();
      jest.spyOn(FacilityModel, "findOne").mockImplementation(async () => null);
      facilityModel_create = jest.spyOn(FacilityModel, "create").mockImplementation(async f => f);
    });

    it("creates facility when no OBO data is provided", async () => {
      const facilityCreate = makeFacilityCreateCmd({
        cwType: null,
        cqType: null,
        cqActive: null,
        cwActive: null,
        cqOboOid: null,
        cwOboOid: null,
      });
      await createFacility(facilityCreate);
      expect(facilityModel_create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...facilityCreate,
          cwType: FacilityType.initiatorAndResponder,
          cqType: FacilityType.initiatorAndResponder,
          cqActive: false,
          cwActive: false,
          cqOboOid: null,
          cwOboOid: null,
        })
      );
    });

    it("creates facility with provided data", async () => {
      const facilityCreate = makeFacilityCreateCmd();
      await createFacility(facilityCreate);
      expect(facilityModel_create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...facilityCreate,
          cqOboOid: facilityCreate.cqOboOid ?? null,
          cwOboOid: facilityCreate.cwOboOid ?? null,
        })
      );
    });

    it("makeFacilityCreateCmd and OBO", async () => {
      const facilityCreate = makeFacilityCreateCmd({
        cwType: FacilityType.initiatorOnly,
        cqType: FacilityType.initiatorOnly,
      });
      expect(facilityCreate).toEqual(
        expect.objectContaining({
          cqActive: true,
          cwActive: true,
        })
      );
      expect(facilityCreate.cqOboOid).toBeDefined();
      expect(facilityCreate.cwOboOid).toBeDefined();
    });
  });

  describe("validateObo", () => {
    it("throws when OBO, CW OBO is active and CW OID is null", async () => {
      const facility = makeFacilityCreate({
        cwType: FacilityType.initiatorOnly,
        cwOboOid: null,
      });
      expect(() => validateObo(facility)).toThrow("CW OBO facility must have CW OBO OID");
    });

    it("throws when OBO, CQ OBO is active and CQ OID is null", async () => {
      const facility = makeFacilityCreate({
        cqType: FacilityType.initiatorOnly,
        cqOboOid: null,
      });
      expect(() => validateObo(facility)).toThrow("CQ OBO facility must have CQ OBO OID");
    });
  });
});
