import type { Dictionary } from "@/i18n/types";

export type CommitteeRole = keyof Dictionary["committee"]["roles"];

export type CommitteeMember = {
  role: CommitteeRole; // translated via dict.committee.roles[role]
  name: string;
  photo?: string; // e.g. "/committee/president.jpg" in public/, only with the person's consent
  isPlaceholder?: boolean; // true = invented name, must be replaced with real data
};

// Temporary: moves to the database (CommitteeMember table) in Step 7.
// ALL NAMES BELOW ARE INVENTED PLACEHOLDERS. They are not real committee members.
export const executiveCommittee: CommitteeMember[] = [
  { role: "president", name: "Christophe Semuhungu", isPlaceholder: true },
  { role: "vicePresident", name: "Alice Ladouce Nyaruhirira", isPlaceholder: true },
  { role: "technicalVicePresident", name: "Donat Niyobuhungiro", isPlaceholder: true },
  { role: "secretary", name: "Claudette Uwimana", isPlaceholder: true },
  { role: "accountant", name: "Seraphine Nyirahabimana", isPlaceholder: true },
];
