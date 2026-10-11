import { describe, expect, it } from "vitest";
import { getTimeLeft } from "./countdown";

const target = Date.parse("2026-11-29T18:00:00+02:00");

describe("getTimeLeft", () => {
  it("splits the remaining time into units", () => {
    const now = target - (2 * 86_400 + 3 * 3_600 + 4 * 60 + 5) * 1000;
    expect(getTimeLeft(target, now)).toEqual({
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
      done: false,
    });
  });

  it("ignores milliseconds (rounds down to the second)", () => {
    expect(getTimeLeft(target, target - 1_999).seconds).toBe(1);
  });

  it("is done at the target time and stays at zero afterwards", () => {
    const zero = { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    expect(getTimeLeft(target, target)).toEqual(zero);
    expect(getTimeLeft(target, target + 60_000)).toEqual(zero);
  });
});
