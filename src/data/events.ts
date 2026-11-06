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
    select: { slug: true, title: true, startsAt: true, venue: true, ticketsUrl: true },
  });

  return event ? toFeaturedEvent(event) : null;
}

// What the Events page and the event pages show, with the highlight in one language
function eventFields(locale: Locale) {
  return {
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
    videos: {
      orderBy: { position: "asc" },
      select: { youtubeId: true, title: true, composer: true, featuring: true, isSong: true },
    },
    photos: { orderBy: { position: "asc" }, select: { src: true } },
  } as const;
}

// An event is over once it has finished; events without an end time use their start time
function isOver(row: { startsAt: Date; endsAt: Date | null }, now: Date) {
  return (row.endsAt ?? row.startsAt) <= now;
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
    select: eventFields(locale),
  });

  const now = new Date(); // allowed here: the time is part of the cached result
  return {
    upcoming: rows.filter((row) => !isOver(row, now)).map(toEventListItem),
    past: rows
      .filter((row) => isOver(row, now))
      .reverse()
      .map(toEventListItem),
  };
}

/** One public event for its own page, or null when no public event has this slug. */
export async function getEvent(slug: string, locale: Locale) {
  "use cache";
  cacheLife("hours");
  cacheTag("events");

  const row = await db.event.findFirst({
    where: { slug, type: { in: publicEventTypes } },
    select: eventFields(locale),
  });
  if (!row) return null;

  const now = new Date(); // allowed here: the time is part of the cached result
  return { ...toEventListItem(row), isPast: isOver(row, now) };
}

/** The slugs of every public event, so each event page is built ahead of time. */
export async function getEventSlugs() {
  "use cache";
  cacheLife("hours");
  cacheTag("events");

  const rows = await db.event.findMany({
    where: { type: { in: publicEventTypes } },
    select: { slug: true },
  });
  return rows.map((row) => row.slug);
}
