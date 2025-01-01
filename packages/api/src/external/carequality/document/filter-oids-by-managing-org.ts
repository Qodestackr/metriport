import { Op, fn, where, col } from "sequelize";
import { CQLink } from "../cq-patient-data";
import { CQDirectoryEntryModel } from "../../../external/carequality/models/cq-directory";

export async function filterCqLinksByManagingOrg(
  name: string,
  cqLinks: CQLink[]
): Promise<CQLink[]> {
  const managingOrg = await CQDirectoryEntryModel.findOne({
    where: where(fn("LOWER", col("name")), fn("LOWER", name)),
  });

  if (!managingOrg) {
    return [];
  }

  const managingOrgChildren = await CQDirectoryEntryModel.findAll({
    where: {
      managingOrganizationId: {
        [Op.like]: managingOrg.id + "%",
      },
    },
  });

  const cqOrgIds = managingOrgChildren.map(org => org.id);

  return cqLinks.filter(link => cqOrgIds.includes(link.oid));
}
