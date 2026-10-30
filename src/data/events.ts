import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { toFeaturedEvent } from "@/lib/events";
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
