import { describe, expect, it } from "vitest";
import { termYears, toCommitteeMembers } from "./committee";

const person = (fullName: string, photoUrl: string | null = null) => ({ fullName, photoUrl });

describe("toCommitteeMembers", () => {
  it("translates database roles into dictionary keys", () => {
    expect(
      toCommitteeMembers([{ role: "TECHNICAL_VICE_PRESIDENT", person: person("Donat N") }]),
    ).toEqual([{ role: "technicalVicePresident", name: "Donat N", photo: undefined }]);
  });

  it("puts the President first, whatever order the database returns", () => {
    const members = toCommitteeMembers([
      { role: "ACCOUNTANT", person: person("E") },
      { role: "SECRETARY", person: person("D") },
      { role: "PRESIDENT", person: person("A") },
      { role: "TECHNICAL_VICE_PRESIDENT", person: person("C") },
      { role: "VICE_PRESIDENT", person: person("B") },
    ]);
    expect(members.map((m) => m.name)).toEqual(["A", "B", "C", "D", "E"]);
  });

  it("keeps the photo when there is one", () => {
    expect(
      toCommitteeMembers([{ role: "PRESIDENT", person: person("A", "/committee/a.jpg") }])[0].photo,
    ).toBe("/committee/a.jpg");
  });

  it("returns an empty list when there is no committee", () => {
    expect(toCommitteeMembers([])).toEqual([]);
  });
});

describe("termYears", () => {
  it("joins the first and last year", () => {
    expect(termYears(2024, 2026)).toBe("2024–2026");
  });

  it("leaves the end open when it is not set", () => {
    expect(termYears(2026, null)).toBe("2026–");
  });
});
