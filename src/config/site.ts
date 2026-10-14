// Facts that are the same in every language. Translated text lives in src/i18n/dictionaries.
export const site = {
  name: "Chorale Christus Regnat",
  shortName: "Christus Regnat",
  motto: {
    call: "Christus Regnat!", // the leader calls
    response: "Ishema Ridashonga!", // the members answer
  },
  founded: 2006,
  // Official choir contacts, as published on christusregnat.rw. Both numbers are on WhatsApp.
  contact: {
    phones: ["+250 788 472 859", "+250 788 302 207"],
    whatsapp: "+250 788 472 859",
    email: "christusregnat2006@gmail.com",
    mapsQuery: "Paroisse Regina Pacis, Remera, Kigali", // what Google Maps searches for
  },
  socials: {
    youtube: "https://www.youtube.com/@IshemaRidashonga",
    instagram: "https://www.instagram.com/christus_regnat_choir/",
    facebook: "https://www.facebook.com/choralechristusregnatrwanda/",
    x: "https://x.com/CChristusRegnat", // TODO: confirm @CChristusRegnat vs @IshemaRidashong
  },
  // The fixed weekly rehearsals (source: choir member). Day names are translated in the dictionaries.
  rehearsals: {
    start: "18:00",
    end: "20:00",
    venue: "Ste Famille (JOC)",
  },
  // Temporary: moves to the database (Event table) in chore/database.
  // Source: christusregnat.rw/ibweranganzo (3rd edition, 20th anniversary).
  featuredEvent: {
    title: "iBweranganzo 2026",
    date: "2026-11-29", // ISO date, formatted per language with formatDate()
    startsAt: "2026-11-29T16:00:00+02:00", // 16:00 Kigali time (UTC+2)
    venue: "Saint Famille Hotel, Kigali",
    ticketsUrl: "https://www.christusregnat.rw/ibweranganzo",
    href: "/events",
  },
} as const;
