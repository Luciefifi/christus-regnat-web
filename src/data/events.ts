import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicEventTypes, toEventListItem, toFeaturedEvent } from "@/lib/events";
import type { Locale } from "@/i18n/config";
import { db } from "@/lib/db";

/**
 * The soonest pinned event (isFeatured) that hasn't finished yet, or null.
 * Cached for an hour: once an event is over, it drops off the site within the hour
 * and the next pinned event takes over. `revalidateTag("events")` refreshes it at once.
 */
export async function getFeaturedEvent() {
  "use cache";
  cacheLife("hours");
  cacheTag("events");

  const now = new Date(); // allowed here: the time is part of the cached result
  const event = await db.event.findFirst({
    where: {
      isFeatured: true,
      // still upcoming or happening now; events without an end time use their start time
      OR: [{ endsAt: { gt: now } }, { endsAt: null, startsAt: { gt: now } }],
    },
    orderBy: { startsAt: "asc" },
    select: { title: true, startsAt: true, venue: true, ticketsUrl: true },
  });

  return event ? toFeaturedEvent(event) : null;
}

/**
 * Every public event (no rehearsals or members-only meetings), split into upcoming
 * (soonest first) and past (newest first). An event moves to "past" once it has finished.
 * Highlights come in the given language; the locale is part of the cache key.
 */
export async function getPublicEvents(locale: Locale) {
  "use cache";
  cacheLife("hours");
  cacheTag("events");

  const rows = await db.event.findMany({
    where: { type: { in: publicEventTypes } },
    orderBy: { startsAt: "asc" },
    select: {
      slug: true,
      type: true,
      title: true,
      startsAt: true,
      endsAt: true,
      venue: true,
      ticketsUrl: true,
      edition: true,
      guests: true,
      coverImage: true,
      translations: { where: { locale }, select: { highlight: true } },
      videos: { orderBy: { position: "asc" }, select: { youtubeId: true, title: true } },
    },
  });

  const now = new Date(); // allowed here: the time is part of the cached result
  const isOver = (row: (typeof rows)[number]) => (row.endsAt ?? row.startsAt) <= now;

  return {
    upcoming: rows.filter((row) => !isOver(row)).map(toEventListItem),
    past: rows.filter(isOver).reverse().map(toEventListItem),
  };
}
