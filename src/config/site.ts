// Facts that are the same in every language. Translated text lives in src/i18n/dictionaries.
export const site = {
  name: "Chorale Christus Regnat",
  shortName: "Christus Regnat",
  motto: {
    call: "Christus Regnat!", // the leader calls
    response: "Ishema Ridashonga!", // the members answer
  },
  founded: 2006,
  socials: {
    youtube: "https://www.youtube.com/@IshemaRidashonga",
    x: "https://x.com/CChristusRegnat",
    facebook: "https://www.facebook.com/choralechristusregnatrwanda/", // TODO: confirm with the choir
  },
  // Temporary: moves to the database (Event table) in Step 7.
  // Source: the choir's #iBweranganzo2026 announcement (venue and tickets not announced yet).
  featuredEvent: {
    title: "iBweranganzo 2026",
    date: "2026-11-29", // ISO date, formatted per language with formatDate()
    href: "/events",
  },
} as const;
