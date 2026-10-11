import { describe, expect, it } from "vitest";
import { formatDate, formatRwf } from "./format";

describe("formatRwf", () => {
  it("formats amounts with thousands separators and the RWF suffix", () => {
    expect(formatRwf(5000)).toBe("5,000 RWF");
    expect(formatRwf(150000)).toBe("150,000 RWF");
  });

  it("handles zero", () => {
    expect(formatRwf(0)).toBe("0 RWF");
  });

  it("rejects negative or fractional amounts", () => {
    expect(() => formatRwf(-1)).toThrow();
    expect(() => formatRwf(10.5)).toThrow();
  });
});

describe("formatDate", () => {
  it("formats day month year in each language", () => {
    expect(formatDate("2026-11-29", "en-GB")).toBe("29 November 2026");
    expect(formatDate("2026-11-29", "fr-FR")).toBe("29 novembre 2026");
    expect(formatDate("2026-11-29", "rw-RW")).toBe("29 Ugushyingo 2026");
  });

  it("does not shift the day across timezones", () => {
    expect(formatDate("2026-01-01", "en-GB")).toBe("1 January 2026");
  });
});
