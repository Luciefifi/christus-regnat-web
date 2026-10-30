import { describe, expect, it } from "vitest";
import { toFeaturedEvent } from "./events";

const row = {
  title: "iBweranganzo 2026",
  startsAt: new Date("2026-11-29T16:00:00+02:00"),
  venue: "Saint Famille Hotel, Kigali",
  ticketsUrl: "https://www.christusregnat.rw/ibweranganzo",
};

describe("toFeaturedEvent", () => {
  it("keeps the details the homepage shows", () => {
    expect(toFeaturedEvent(row)).toEqual({
      title: "iBweranganzo 2026",
      date: "2026-11-29",
      startsAt: "2026-11-29T14:00:00.000Z",
      venue: "Saint Famille Hotel, Kigali",
      ticketsUrl: "https://www.christusregnat.rw/ibweranganzo",
      href: "/events",
    });
  });

  it("uses the date in Kigali, not in UTC", () => {
    // 00:30 in Kigali is still the day before in UTC
    const event = toFeaturedEvent({ ...row, startsAt: new Date("2026-12-01T00:30:00+02:00") });
    expect(event.date).toBe("2026-12-01");
  });

  it("leaves out a missing venue or tickets link", () => {
    const event = toFeaturedEvent({ ...row, venue: null, ticketsUrl: null });
    expect(event.venue).toBeUndefined();
    expect(event.ticketsUrl).toBeUndefined();
  });
});
