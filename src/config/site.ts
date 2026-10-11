export const site = {
  name: "Chorale Christus Regnat",
  shortName: "Christus Regnat",
  motto: {
    call: "Christus Regnat!", // the leader calls
    response: "Ishema Ridashonga!", // the members answer
  },
  tagline: "Faith in every note. Excellence in every harmony.",
  founded: 2006,
  parish: "Regina Pacis Parish, Remera, Kigali",
  socials: {
    youtube: "https://www.youtube.com/@IshemaRidashonga",
    x: "https://x.com/CChristusRegnat",
    facebook: "https://www.facebook.com/choralechristusregnatrwanda/", // TODO: confirm with the choir
  },
  // Temporary: moves to the database (Event table) in Step 7.
  // Source: the choir's #iBweranganzo2026 announcement (venue and tickets not announced yet).
  featuredEvent: {
    title: "iBweranganzo 2026",
    subtitle: "20th anniversary concert",
    dateLabel: "29 November 2026",
    href: "/events",
  },
} as const;
