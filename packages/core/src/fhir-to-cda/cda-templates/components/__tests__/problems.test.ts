import { faker } from "@faker-js/faker";
import { Bundle, Condition } from "@medplum/fhirtypes";
import path from "path";
import { removeEmptyFields } from "../../clinical-document/clinical-document";
import { xmlBuilder } from "../../clinical-document/shared";
import { buildProblems } from "../problems";
import { conditionHyperlipidemia, conditionNicotine } from "./condition-examples";
import { makeCondition } from "./make-condition";
import { createEmptyBundle, getXmlContentFromFile } from "./shared";

let conditionId: string;
let bundle: Bundle;
let condition: Condition;

beforeAll(() => {
  conditionId = faker.string.uuid();
  condition = makeCondition({
    id: conditionId,
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    note: conditionNicotine.note!,
  });
});

beforeEach(() => {
  bundle = createEmptyBundle();
  bundle.entry?.push({ resource: condition });
});

describe.skip("buildProblems", () => {
  it("correctly includes the text note into the Problems table", () => {
    const res = buildProblems(bundle);
    const cleanedJsonObj = removeEmptyFields(res);
    const xmlRes = xmlBuilder.build(cleanedJsonObj);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    expect(xmlRes).toContain(`<td>${conditionNicotine.note![0]?.text}</td>`);
  });

  it("correctly maps a single Condition without a note", () => {
    bundle.entry = [{ resource: { ...condition, note: [] } }];
    const filePath = path.join(__dirname, "./xmls/problems-section-single-entry.xml");

    const params = {
      conditionId,
    };
    // TODO: Remove the console.log after we fix the tsconfig to ignore "unused" vars,
    // since `eval()` isn't explicitly using them
    console.log("params", params);

    const xmlContent = eval("`" + getXmlContentFromFile(filePath) + "`");
    const res = buildProblems(bundle);
    const cleanedJsonObj = removeEmptyFields(res);
    const xmlRes = xmlBuilder.build(cleanedJsonObj);
    expect(xmlRes).toEqual(xmlContent);
  });

  it("correctly maps two Conditions with notes", () => {
    const conditionId2 = faker.string.uuid();
    const condition2 = makeCondition({
      id: conditionId2,
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      code: conditionHyperlipidemia.code!,
    });

    bundle.entry?.push({ resource: condition2 });
    const filePath = path.join(__dirname, "./xmls/problems-section-two-entries.xml");

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const params = {
      conditionId,
      conditionId2,
    };
    // TODO: Remove the console.log after we fix the tsconfig to ignore "unused" vars,
    // since `eval()` isn't explicitly using them
    console.log("params", params);

    const xmlContent = eval("`" + getXmlContentFromFile(filePath) + "`");
    const res = buildProblems(bundle);
    const cleanedJsonObj = removeEmptyFields(res);
    const xmlRes = xmlBuilder.build(cleanedJsonObj);
    expect(xmlRes).toEqual(xmlContent);
  });
});
