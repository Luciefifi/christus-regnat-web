import { describe, expect, it } from "vitest";
import { initials } from "./initials";

describe("initials", () => {
  it("takes the first letter of the first two names", () => {
    expect(initials("Jeremie Bizimana")).toBe("JB");
    expect(initials("Lucie Niyomutoni")).toBe("LN");
  });

  it("handles a single name", () => {
    expect(initials("Monique")).toBe("M");
  });

  it("ignores extra spaces and uses capitals", () => {
    expect(initials("  alice   la douce ")).toBe("AL");
  });

  it("returns an empty string for an empty name", () => {
    expect(initials("   ")).toBe("");
  });
});
