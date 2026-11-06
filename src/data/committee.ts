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

/** Every committee since the choir was founded, the current one first. */
export async function getCommitteeTerms() {
  "use cache";
  cacheLife("days");
  cacheTag("committee");

  const terms = await db.term.findMany({
    orderBy: { startYear: "desc" },
    select: {
      startYear: true,
      endYear: true,
      members: { select: { role: true, person: { select: { fullName: true, photoUrl: true } } } },
    },
  });

  return terms.map((term) => ({
    startYear: term.startYear,
    endYear: term.endYear,
    members: toCommitteeMembers(term.members),
  }));
}
