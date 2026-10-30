import { describe, expect, it } from "vitest";
import {
  formatEdition,
  groupByYear,
  toEventListItem,
  toFeaturedEvent,
  youtubeThumbnail,
} from "./events";

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

const listRow = {
  slug: "ibweranganzo-2026",
  type: "CONCERT" as const,
  title: "iBweranganzo 2026",
  startsAt: new Date("2026-11-29T16:00:00+02:00"),
  venue: "Saint Famille Hotel, Kigali",
  ticketsUrl: null,
  edition: 3,
  guests: [],
  coverImage: null,
  translations: [{ highlight: "The 20th anniversary." }],
  videos: [{ youtubeId: "fvq73O9uU1A", title: "Trailer" }],
};

describe("toEventListItem", () => {
  it("shows the start time in Kigali", () => {
    expect(toEventListItem(listRow)).toEqual({
      slug: "ibweranganzo-2026",
      type: "concert",
      title: "iBweranganzo 2026",
      date: "2026-11-29",
      time: "16:00",
      venue: "Saint Famille Hotel, Kigali",
      ticketsUrl: undefined,
      edition: 3,
      guests: [],
      coverImage: undefined,
      highlight: "The 20th anniversary.",
      videos: [{ youtubeId: "fvq73O9uU1A", title: "Trailer" }],
    });
  });

  it("leaves out the time when it is unknown (stored as midnight in Kigali)", () => {
    const event = toEventListItem({ ...listRow, startsAt: new Date("2024-11-03T00:00:00+02:00") });
    expect(event.date).toBe("2024-11-03");
    expect(event.time).toBeUndefined();
  });
});

describe("groupByYear", () => {
  it("groups events by year and keeps their order", () => {
    const events = ["2024-11-03", "2023-11-19", "2023-05-01", "2019-10-05"].map((date) => ({
      ...toEventListItem(listRow),
      date,
    }));
    const groups = groupByYear(events);
    expect(groups.map(([year, list]) => [year, list.map((e) => e.date)])).toEqual([
      ["2024", ["2024-11-03"]],
      ["2023", ["2023-11-19", "2023-05-01"]],
      ["2019", ["2019-10-05"]],
    ]);
  });
});

describe("formatEdition", () => {
  it("writes English ordinals", () => {
    expect([1, 2, 3, 4, 11, 12, 13, 21].map((n) => formatEdition(n, "en"))).toEqual([
      "1st edition",
      "2nd edition",
      "3rd edition",
      "4th edition",
      "11th edition",
      "12th edition",
      "13th edition",
      "21st edition",
    ]);
  });

  it("writes French and Kinyarwanda editions", () => {
    expect(formatEdition(1, "fr")).toBe("1re édition");
    expect(formatEdition(3, "fr")).toBe("3e édition");
    expect(formatEdition(3, "rw")).toBe("Edisiyo ya 3");
  });
});

describe("toEventListItem without extras", () => {
  it("has no highlight when there is no text in this language", () => {
    expect(toEventListItem({ ...listRow, translations: [] }).highlight).toBeUndefined();
  });
});

describe("youtubeThumbnail", () => {
  it("builds the still image URL", () => {
    expect(youtubeThumbnail("QC89AZwvJ7U", "maxres")).toBe(
      "https://i.ytimg.com/vi/QC89AZwvJ7U/maxresdefault.jpg",
    );
    expect(youtubeThumbnail("QC89AZwvJ7U", "hq")).toBe(
      "https://i.ytimg.com/vi/QC89AZwvJ7U/hqdefault.jpg",
    );
  });
});
