import { describe, expect, it } from "vitest";
import { pickLocale } from "./negotiate";

describe("pickLocale", () => {
  it("uses the saved cookie first", () => {
    expect(pickLocale("fr-FR,fr;q=0.9", "rw")).toBe("rw");
  });

  it("ignores an invalid cookie", () => {
    expect(pickLocale("fr-FR,fr;q=0.9", "de")).toBe("fr");
  });

  it("picks the highest-quality supported browser language", () => {
    expect(pickLocale("de-DE,de;q=0.9,rw;q=0.8,en;q=0.7")).toBe("rw");
    expect(pickLocale("en;q=0.5,fr;q=0.9")).toBe("fr");
  });

  it("matches regional variants to the base language", () => {
    expect(pickLocale("fr-CA")).toBe("fr");
  });

  it("falls back to English", () => {
    expect(pickLocale("de-DE,sw;q=0.9")).toBe("en");
    expect(pickLocale(null)).toBe("en");
    expect(pickLocale("")).toBe("en");
  });
});
