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

/** Turns a database event into what the homepage, hero and footer show. */
export function toFeaturedEvent(row: {
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
    href: "/events", // becomes /events/<slug> once event pages exist
  };
}
