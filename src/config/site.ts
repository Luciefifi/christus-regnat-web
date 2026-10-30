// Facts that are the same in every language. Translated text lives in src/i18n/dictionaries.
export const site = {
  name: "Chorale Christus Regnat",
  shortName: "Christus Regnat",
  // "Christus Regnat! Ishema Ridashonga!": shown in the hero, footer and About page.
  // Never translated: it stays the same in every language. (Not the choir's motto; the key keeps
  // its old name until we know what the choir calls this phrase.)
  motto: {
    call: "Christus Regnat!",
    response: "Ishema Ridashonga!",
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
} as const;
