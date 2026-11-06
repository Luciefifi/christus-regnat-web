import type { EventType } from "@/generated/prisma/enums";
import type { Locale } from "@/i18n/config";

export type FeaturedEvent = {
  title: string;
  date: string; // ISO date in Kigali, e.g. "2026-11-29", formatted per language with formatDate()
  startsAt: string; // full ISO timestamp, for the countdown
  venue?: string;
  ticketsUrl?: string;
  href: string;
};

// "en-CA" formats dates as YYYY-MM-DD; Kigali time so a 00:30 event isn't shown on the day before
const kigaliDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Kigali" });

/** The event's own page, without the language: "/events/ibweranganzo-2026" */
export function eventHref(slug: string): string {
  return `/events/${slug}`;
}

/** Turns a database event into what the homepage, hero and footer show. */
export function toFeaturedEvent(row: {
  slug: string;
  title: string;
  startsAt: Date;
  venue: string | null;
  ticketsUrl: string | null;
}): FeaturedEvent {
  return {
    title: row.title,
    date: kigaliDay.format(row.startsAt),
    startsAt: row.startsAt.toISOString(),
    venue: row.venue ?? undefined,
    ticketsUrl: row.ticketsUrl ?? undefined,
    href: eventHref(row.slug),
  };
}

// ─── Events page ───

// Event types shown on the public Events page (rehearsals and members-only meetings are not)
export const publicEventTypes: EventType[] = ["CONCERT", "MASS", "WEDDING", "FUNERAL", "OTHER"];

export type EventVideo = {
  youtubeId: string;
  title: string;
  composer?: string;
  featuring?: string; // a guest or soloist
  isSong?: boolean; // false for a full concert or a trailer
};

export type EventListItem = {
  slug: string;
  type: Lowercase<EventType>; // "concert", translated via dict.events.types[type]
  title: string;
  date: string; // ISO date in Kigali, formatted per language with formatDate()
  time?: string; // "16:00" in Kigali; missing when the start time is unknown
  startsAt: string; // full ISO timestamps, for "add to calendar"
  endsAt?: string;
  venue?: string;
  ticketsUrl?: string;
  edition?: number;
  guests: string[];
  coverImage?: string; // a photo in public/; otherwise the main video's still
  highlight?: string; // in the visitor's language
  videos: EventVideo[]; // the first one is the main video and the cover
  photos: string[]; // gallery, files in public/
};

const kigaliTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Kigali",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Turns a database event into a row of the Events page. */
export function toEventListItem(row: {
  slug: string;
  type: EventType;
  title: string;
  startsAt: Date;
  endsAt: Date | null;
  venue: string | null;
  ticketsUrl: string | null;
  edition: number | null;
  guests: string[];
  coverImage: string | null;
  translations: { highlight: string }[]; // already filtered to one language
  videos: {
    youtubeId: string;
    title: string;
    composer?: string | null;
    featuring?: string | null;
    isSong?: boolean;
  }[]; // already in order
  photos?: { src: string }[]; // already in order
}): EventListItem {
  const time = kigaliTime.format(row.startsAt);

  return {
    slug: row.slug,
    type: row.type.toLowerCase() as Lowercase<EventType>,
    title: row.title,
    date: kigaliDay.format(row.startsAt),
    // The seed stores midnight when the start time is unknown, so we only show the date
    time: time === "00:00" ? undefined : time,
    startsAt: row.startsAt.toISOString(),
    endsAt: row.endsAt?.toISOString(),
    venue: row.venue ?? undefined,
    ticketsUrl: row.ticketsUrl ?? undefined,
    edition: row.edition ?? undefined,
    guests: row.guests,
    coverImage: row.coverImage ?? undefined,
    highlight: row.translations[0]?.highlight,
    videos: row.videos.map((video) => ({
      youtubeId: video.youtubeId,
      title: video.title,
      composer: video.composer ?? undefined,
      featuring: video.featuring ?? undefined,
      isSong: video.isSong,
    })),
    photos: (row.photos ?? []).map((photo) => photo.src),
  };
}

/** Groups past events by year, keeping their order: [["2024", [...]], ["2023", [...]]]. */
export function groupByYear(events: EventListItem[]): [string, EventListItem[]][] {
  const groups = new Map<string, EventListItem[]>();
  for (const event of events) {
    const year = event.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), event]);
  }
  return [...groups];
}

const englishOrdinal = new Intl.PluralRules("en", { type: "ordinal" });
const englishSuffix: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: "st",
  two: "nd",
  few: "rd",
};

/** 1 → "1st edition" (en), "1re édition" (fr), "Edisiyo ya 1" (rw). */
export function formatEdition(edition: number, locale: Locale): string {
  switch (locale) {
    case "en":
      return `${edition}${englishSuffix[englishOrdinal.select(edition)] ?? "th"} edition`;
    case "fr":
      return `${edition}${edition === 1 ? "re" : "e"} édition`;
    case "rw":
      return `Edisiyo ya ${edition}`;
  }
}

// ─── Add to calendar ───

/** 2026-11-29T14:00:00.000Z → "20261129T140000Z", the date format calendar files use */
function icsTime(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Commas, semicolons and backslashes have a meaning in calendar files, so they are escaped */
function icsText(text: string): string {
  return text.replace(/[\\;,]/g, (char) => `\\${char}`).replace(/\n/g, "\\n");
}

const twoHours = 2 * 60 * 60 * 1000;

/**
 * A calendar file (.ics) for one event, which Google, Apple and Outlook calendars all open.
 * Without a known start time it becomes an all-day event; without an end, it lasts two hours.
 */
export function calendarFile(event: EventListItem): string {
  const end = event.endsAt ?? new Date(Date.parse(event.startsAt) + twoHours).toISOString();
  const when = event.time
    ? [`DTSTART:${icsTime(event.startsAt)}`, `DTEND:${icsTime(end)}`]
    : [`DTSTART;VALUE=DATE:${event.date.replace(/-/g, "")}`];

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chorale Christus Regnat//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@christus-regnat`,
    `DTSTAMP:${icsTime(event.startsAt)}`, // fixed, so the file is the same on every build
    ...when,
    `SUMMARY:${icsText(event.title)}`,
    ...(event.venue ? [`LOCATION:${icsText(event.venue)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n"); // calendar files need Windows line endings
}

/** The calendar file as a link the browser downloads, so no server route is needed */
export function calendarHref(event: EventListItem): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarFile(event))}`;
}

/** YouTube's still image of a video: "maxres" (1280×720) for covers, "hq" (480×360) for small ones. */
export function youtubeThumbnail(youtubeId: string, size: "maxres" | "hq"): string {
  return `https://i.ytimg.com/vi/${youtubeId}/${size}default.jpg`;
}
