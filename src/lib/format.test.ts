import { describe, expect, it } from "vitest";
import { formatRwf } from "./format";

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
