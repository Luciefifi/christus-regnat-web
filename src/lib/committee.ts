import type { CommitteeRole as DbCommitteeRole } from "@/generated/prisma/enums";
import type { Dictionary } from "@/i18n/types";

export type CommitteeRole = keyof Dictionary["committee"]["roles"];

export type CommitteeMember = {
  role: CommitteeRole; // translated via dict.committee.roles[role]
  name: string;
  photo?: string; // only with the person's consent
};

// The database stores "TECHNICAL_VICE_PRESIDENT"; the dictionaries use "technicalVicePresident".
// The order here is the order the committee is shown in.
const roleKeys: Record<DbCommitteeRole, CommitteeRole> = {
  PRESIDENT: "president",
  VICE_PRESIDENT: "vicePresident",
  TECHNICAL_VICE_PRESIDENT: "technicalVicePresident",
  SECRETARY: "secretary",
  ACCOUNTANT: "accountant",
};

const roleOrder = Object.values(roleKeys);

/** Turns database rows into what the site shows, President first. */
export function toCommitteeMembers(
  rows: { role: DbCommitteeRole; person: { fullName: string; photoUrl: string | null } }[],
): CommitteeMember[] {
  return rows
    .map(({ role, person }) => ({
      role: roleKeys[role],
      name: person.fullName,
      photo: person.photoUrl ?? undefined,
    }))
    .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
}
