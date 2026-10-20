// Fills the database with what we already know about the choir.
// Run with: npx prisma db seed   (safe to run again: upsert never creates duplicates)
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  CommitteeRole,
  EventType,
  PrismaClient,
  type Prisma,
} from "../src/generated/prisma/client";

// Its own client: src/lib/db.ts is "server-only" and only works inside Next.js
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

/** "Jérémie Bizimana" → "jeremie-bizimana" */
function slugify(name: string): string {
  return name
    .normalize("NFD") // "é" becomes "e" + an accent mark...
    .replace(/[̀-ͯ]/g, "") // ...and the accent marks are removed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // spaces and symbols become "-"
    .replace(/^-|-$/g, ""); // no "-" at the start or the end
}

// ─── Events ───
// Sources: christusregnat.rw and press articles (see docs/FEATURES.md §1).
// When the start time is unknown, we store midnight Kigali time and only show the date.
const events: Prisma.EventCreateInput[] = [
  {
    slug: "christus-regnat-jean-claude-gianadda-2019",
    type: EventType.CONCERT,
    title: "Christus Regnat & Jean-Claude Gianadda",
    startsAt: new Date("2019-10-05T00:00:00+02:00"), // announced for 5 and 6 October 2019
    endsAt: new Date("2019-10-06T23:59:00+02:00"),
  },
  {
    slug: "ibweranganzo-2023",
    type: EventType.CONCERT,
    title: "iBweranganzo 2023",
    startsAt: new Date("2023-11-19T16:00:00+02:00"), // the press gives both 16:00 and 18:00
    venue: "Camp Kigali (Kigali Conference and Exhibition Village)",
  },
  {
    slug: "ibweranganzo-2024",
    type: EventType.CONCERT,
    title: "iBweranganzo 2024",
    startsAt: new Date("2024-11-03T00:00:00+02:00"), // start time unknown
    venue: "Lemigo Hotel, Kigali",
  },
  {
    slug: "ibweranganzo-2026",
    type: EventType.CONCERT,
    title: "iBweranganzo 2026",
    startsAt: new Date("2026-11-29T16:00:00+02:00"),
    endsAt: new Date("2026-11-29T20:00:00+02:00"),
    venue: "Saint Famille Hotel, Kigali",
    ticketsUrl: "https://www.christusregnat.rw/ibweranganzo",
    isFeatured: true,
  },
];

// ─── Committees, one per 2-year mandate since the choir was founded ───
// Real people are marked "real:". All other names are invented for now
// and will be replaced with the real committees.
const { PRESIDENT, VICE_PRESIDENT, TECHNICAL_VICE_PRESIDENT, SECRETARY, ACCOUNTANT } =
  CommitteeRole;

type SeedTerm = {
  startYear: number;
  endYear: number;
  members: [CommitteeRole, string][]; // [role, full name]
};

const terms: SeedTerm[] = [
  {
    startYear: 2006,
    endYear: 2008,
    members: [
      [PRESIDENT, "Jean Bosco Hakizimana"],
      [VICE_PRESIDENT, "Marie Claire Mukandayisenga"],
      [TECHNICAL_VICE_PRESIDENT, "Innocent Nshimiyimana"],
      [SECRETARY, "Solange Uwamahoro"],
      [ACCOUNTANT, "Celestin Mbonigaba"],
    ],
  },
  {
    startYear: 2008,
    endYear: 2010,
    members: [
      [PRESIDENT, "Theogene Twagirayezu"],
      [VICE_PRESIDENT, "Vestine Mukarugwiza"],
      [TECHNICAL_VICE_PRESIDENT, "Fabrice Ndayisaba"],
      [SECRETARY, "Esperance Nyiraneza"],
      [ACCOUNTANT, "Gilbert Rukundo"],
    ],
  },
  {
    startYear: 2010,
    endYear: 2012,
    members: [
      [PRESIDENT, "Didier Ntwari"],
      [VICE_PRESIDENT, "Chantal Mukeshimana"],
      [TECHNICAL_VICE_PRESIDENT, "Aimable Hategekimana"],
      [SECRETARY, "Yvonne Uwera"],
      [ACCOUNTANT, "Jean Paul Niyibizi"],
    ],
  },
  {
    startYear: 2012,
    endYear: 2014,
    members: [
      [PRESIDENT, "Eugene Murenzi"],
      [VICE_PRESIDENT, "Annonciata Mukamurenzi"],
      [TECHNICAL_VICE_PRESIDENT, "Valens Nsengiyumva"],
      [SECRETARY, "Liliane Ishimwe"],
      [ACCOUNTANT, "Felix Nzabonimpa"],
    ],
  },
  {
    startYear: 2014,
    endYear: 2016,
    members: [
      [PRESIDENT, "Jean de Dieu Mugabo"],
      [VICE_PRESIDENT, "Immaculee Mukashema"],
      [TECHNICAL_VICE_PRESIDENT, "Gaspard Munyaneza"],
      [SECRETARY, "Sandrine Umuhoza"],
      [ACCOUNTANT, "Callixte Niyomugabo"],
    ],
  },
  {
    startYear: 2016,
    endYear: 2018,
    members: [
      [PRESIDENT, "Alphonse Kayitare"],
      [VICE_PRESIDENT, "Jeanne d'Arc Uwizeye"],
      [TECHNICAL_VICE_PRESIDENT, "Martin Ndagijimana"],
      [SECRETARY, "Beata Mukantwari"],
      [ACCOUNTANT, "Silas Harerimana"],
    ],
  },
  {
    startYear: 2018,
    endYear: 2020,
    members: [
      [PRESIDENT, "Etienne Gatera"],
      [VICE_PRESIDENT, "Odette Uwamariya"],
      [TECHNICAL_VICE_PRESIDENT, "Pacifique Iradukunda"],
      [SECRETARY, "Nadine Umulisa"],
      [ACCOUNTANT, "Damascene Ntawukuriryayo"],
    ],
  },
  {
    startYear: 2020,
    endYear: 2022,
    members: [
      [PRESIDENT, "Frederic Niyonsaba"],
      [VICE_PRESIDENT, "Angelique Mukarusanga"],
      [TECHNICAL_VICE_PRESIDENT, "Samuel Kwizera"],
      [SECRETARY, "Divine Ingabire"],
      [ACCOUNTANT, "Jean Claude Bayingana"],
    ],
  },
  {
    startYear: 2022,
    endYear: 2024,
    members: [
      [PRESIDENT, "Alice La Douce Nyaruhirira"], // real: President in 2023
      [VICE_PRESIDENT, "Josiane Ingabire"],
      [TECHNICAL_VICE_PRESIDENT, "Jérémie Bizimana"], // real: technical deputy in 2023 (press)
      [SECRETARY, "Emmanuel Niyonzima"],
      [ACCOUNTANT, "Clarisse Umutoni"],
    ],
  },
  {
    startYear: 2024,
    endYear: 2026,
    members: [
      [PRESIDENT, "Eric Mugisha"],
      [VICE_PRESIDENT, "Grace Uwase"],
      [TECHNICAL_VICE_PRESIDENT, "Patrick Habimana"],
      [SECRETARY, "Diane Mukamana"],
      [ACCOUNTANT, "Olivier Nkurunziza"],
    ],
  },
  {
    startYear: 2026,
    endYear: 2028,
    members: [
      [PRESIDENT, "Christophe Semuhungu"],
      [VICE_PRESIDENT, "Alice La Douce Nyaruhirira"], // real: current Vice-President
      [TECHNICAL_VICE_PRESIDENT, "Donat Niyobuhungiro"],
      [SECRETARY, "Claudette Uwimana"],
      [ACCOUNTANT, "Seraphine Nyirahabimana"],
    ],
  },
];

// Everyone who appears in a committee, each person once (Alice is in two terms)
const names = [...new Set(terms.flatMap((term) => term.members.map(([, name]) => name)))];

async function main() {
  for (const event of events) {
    await prisma.event.upsert({ where: { slug: event.slug }, update: event, create: event });
  }

  for (const fullName of names) {
    const slug = slugify(fullName);
    await prisma.person.upsert({
      where: { slug },
      update: { fullName },
      create: { slug, fullName },
    });
  }

  for (const { members, ...term } of terms) {
    const savedTerm = await prisma.term.upsert({
      where: { startYear: term.startYear },
      update: term,
      create: term,
    });

    for (const [role, name] of members) {
      const person = { connect: { slug: slugify(name) } };
      await prisma.committeeMember.upsert({
        // @@unique([termId, role]) in the schema becomes this "termId_role" key
        where: { termId_role: { termId: savedTerm.id, role } },
        update: { person },
        create: { role, term: { connect: { id: savedTerm.id } }, person },
      });
    }
  }

  console.log(`Seeded ${events.length} events, ${names.length} people, ${terms.length} terms`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
