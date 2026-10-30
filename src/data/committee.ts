import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { toCommitteeMembers } from "@/lib/committee";
import { db } from "@/lib/db";

/**
 * The executive committee of the current term (the one that started most recently).
 * Cached: the committee changes once every two years, so the page is built with it
 * and refreshed daily. After editing the committee, `revalidateTag("committee")` shows it at once.
 */
export async function getCurrentCommittee() {
  "use cache";
  cacheLife("days");
  cacheTag("committee");

  const term = await db.term.findFirst({
    orderBy: { startYear: "desc" },
    select: {
      members: { select: { role: true, person: { select: { fullName: true, photoUrl: true } } } },
    },
  });

  return toCommitteeMembers(term?.members ?? []);
}
