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
    guests: ["Jean-Claude Gianadda"],
  },
  {
    slug: "ibweranganzo-2023",
    type: EventType.CONCERT,
    title: "iBweranganzo 2023",
    startsAt: new Date("2023-11-19T16:00:00+02:00"), // the press gives both 16:00 and 18:00
    venue: "Camp Kigali (Kigali Conference and Exhibition Village)",
    edition: 1,
    guests: ["Andy Bumuntu", "Josh Ishimwe"],
  },
  {
    slug: "ibweranganzo-2024",
    type: EventType.CONCERT,
    title: "iBweranganzo 2024",
    startsAt: new Date("2024-11-03T00:00:00+02:00"), // start time unknown
    venue: "Lemigo Hotel, Kigali",
    edition: 2,
    guests: ["Mani Martin"],
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
    edition: 3,
    coverImage: "/events/choir-in-concert.jpg", // from christusregnat.rw; the trailer's still is mostly text
  },
];

// ─── Highlights and videos of each event ───
// Highlights: christusregnat.rw/ibweranganzo and press (AllAfrica, The New Times).
// Videos: the choir's YouTube channel (@IshemaRidashonga). The first video is the main one and the cover.
// The Kinyarwanda texts still need a review by a native speaker.
type EventDetails = {
  highlight: { en: string; fr: string; rw: string };
  videos: [youtubeId: string, title: string][];
};

const eventDetails: Record<string, EventDetails> = {
  "christus-regnat-jean-claude-gianadda-2019": {
    highlight: {
      en: "French singer-songwriter Jean-Claude Gianadda brought his Rwanda tour to Kigali and sang his best-loved songs with the choir: Magnificat, Dieu seul suffit, Trouver dans ma vie ta présence and more.",
      fr: "Lors de sa tournée au Rwanda, l'auteur-compositeur français Jean-Claude Gianadda a chanté ses chants les plus aimés avec la chorale : Magnificat, Dieu seul suffit, Trouver dans ma vie ta présence et bien d'autres.",
      rw: "Mu rugendo rwe mu Rwanda, umuhanzi w'Umufaransa Jean-Claude Gianadda yaririmbanye na korali indirimbo ze zikunzwe: Magnificat, Dieu seul suffit, Trouver dans ma vie ta présence n'izindi.",
    },
    videos: [
      ["dLCNsAGNdSo", "Magnificat"],
      ["U9dN-08D7qk", "Dieu seul suffit"],
      ["WsBeBkDks9Q", "Trouver dans ma vie ta présence"],
      ["5dhl49whOFc", "Tu es parti"],
      ["Pg1W-xi7iGE", "Il y a quelque part"],
      ["6d-_XcNOCAE", "Des ponts"],
      ["6FXQS6II218", "Je bénirai le Seigneur"],
      ["_EenArHPOMs", "Une chanson"],
      ["HYlIUzF32mg", "Christus Regnat Hymn"],
    ],
  },
  "ibweranganzo-2023": {
    highlight: {
      en: "The very first iBweranganzo. It launched the Dusangire Lunch campaign and set the choir's signature blend of gospel, Rwandan traditional music and classical works, from Exultate to Mama Shenge with Andy Bumuntu.",
      fr: "Le tout premier iBweranganzo. Il a lancé la campagne Dusangire Lunch et posé le style de la chorale : gospel, musique traditionnelle rwandaise et œuvres classiques, d'Exultate à Mama Shenge avec Andy Bumuntu.",
      rw: "iBweranganzo ya mbere. Yatangije ubukangurambaga bwa Dusangire Lunch, inagaragaza umwihariko wa korali: indirimbo z'Imana, iz'umuco nyarwanda n'iza kera z'abahanga, kuva kuri Exultate kugeza kuri Mama Shenge hamwe na Andy Bumuntu.",
    },
    videos: [
      ["87VU1FMNqTI", "Full concert"],
      ["Hrz9OCUkSOA", "Mama Shenge (with Andy Bumuntu)"],
      ["65AmarueA0A", "Exultate"],
      ["nzFfWqynKVc", "Lascia ch'io pianga"],
      ["0YowjyXfQAc", "Igipimo cy'Urukundo"],
      ["E90HIZUDlu4", "Nyaruguru"],
      ["75vgHXc8YRE", "Uhoraho ni Umwami"],
      ["C9fm2w8HhI0", "Roho yanjye"],
      ["u0IKsn1YLEs", "Icyishongoro cy'Ubucungurwe"],
      ["HQ25hWxncK0", "Inkotanyi cyane"],
      ["mv_3SpskAJw", "Igisingizo cya Bikiramariya"],
    ],
  },
  "ibweranganzo-2024": {
    highlight: {
      en: "The second edition moved to a bigger venue and sang in Kinyarwanda, English and French, from Handel's Hallelujah and O Fortuna to the classics of Rugamba Cyprien. Hundreds came in support of Dusangire Lunch, and Father Innocent Consolateur represented Cardinal Antoine Kambanda.",
      fr: "La deuxième édition a changé de salle pour accueillir plus de monde et a chanté en kinyarwanda, en anglais et en français, de l'Alléluia de Haendel et O Fortuna aux classiques de Rugamba Cyprien. Des centaines de personnes sont venues soutenir Dusangire Lunch, et l'abbé Innocent Consolateur représentait le cardinal Antoine Kambanda.",
      rw: "Ku nshuro ya kabiri, igitaramo cyabereye ahantu hagutse kandi kiririmbwamo indirimbo mu Kinyarwanda, Icyongereza n'Igifaransa, kuva kuri Hallelujah ya Handel na O Fortuna kugeza ku ndirimbo za Rugamba Cyprien. Abantu amagana baje gushyigikira Dusangire Lunch, kandi Padiri Innocent Consolateur yari ahagarariye Antoine Cardinal Kambanda.",
    },
    videos: [
      ["QC89AZwvJ7U", "Rwagasabo (with Mani Martin)"],
      ["PVhZnoOjbn0", "Rejoice O Judah & Hallelujah, Amen (Handel)"],
      ["RMvUQJbJMCQ", "O Fortuna"],
      ["pxtvArPhZUw", "Amakombe y'u Rwanda (Rugamba Cyprien)"],
      ["-KnxFccM8Ww", "Shimirwa Mukiza (Rugamba Cyprien)"],
      ["iUOT2JqDFdE", "Igipimo cy'Urukundo"],
      ["q1pTUOI0XnM", "Urahirwa Bikiramariya"],
      ["kqvqlyZm-nU", "Igicumbi cy'Uburere"],
      ["iwinBS2Ep_U", "Paradizo"],
      ["klSJXO9abYs", "Trouver dans ma vie"],
      ["lTOcLdAYkns", "Come let us sing"],
      ["vyHMBMyaOB0", "Twigishe gusenga"],
    ],
  },
  "ibweranganzo-2026": {
    highlight: {
      en: "The third edition celebrates the choir's 20th anniversary. Ticket sales support Dusangire Lunch, which gives school lunches to children from families in need.",
      fr: "La troisième édition célèbre les 20 ans de la chorale. La vente des billets soutient Dusangire Lunch, qui offre le repas de midi à l'école aux enfants de familles modestes.",
      rw: "Igitaramo cya gatatu cyizihiza isabukuru y'imyaka 20 ya korali. Amafaranga ava ku matike azashyigikira Dusangire Lunch, igaburira ku ishuri abana bo mu miryango itishoboye.",
    },
    videos: [["fvq73O9uU1A", "iBweranganzo 2026 trailer"]],
  },
};

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
    const saved = await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    });

    const details = eventDetails[event.slug];
    if (!details) continue;

    for (const [locale, highlight] of Object.entries(details.highlight)) {
      await prisma.eventTranslation.upsert({
        where: { eventId_locale: { eventId: saved.id, locale } },
        update: { highlight },
        create: { eventId: saved.id, locale, highlight },
      });
    }

    // Videos are replaced as a whole, so reordering or removing one in this file just works
    await prisma.eventVideo.deleteMany({ where: { eventId: saved.id } });
    await prisma.eventVideo.createMany({
      data: details.videos.map(([youtubeId, title], position) => ({
        eventId: saved.id,
        youtubeId,
        title,
        position,
      })),
    });
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
