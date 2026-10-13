import type { Dictionary } from "@/i18n/types";

// A link as defined in config: the label is a translation key, not text
export type NavKey = keyof Dictionary["nav"];
export type NavLink = { href: string; key: NavKey };

// A link ready to render: localized href + translated label
export type NavItem = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: "/about", key: "about" },
  { href: "/history", key: "history" },
  { href: "/music", key: "music" },
  { href: "/events", key: "events" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
];

export const moreNav: NavLink[] = [
  { href: "/videos", key: "videos" },
  { href: "/leadership", key: "leadership" },
  { href: "/news", key: "news" },
  { href: "/charity", key: "charity" },
  { href: "/join", key: "join" },
];

// Pages that have their own page.tsx, so they no longer need a "coming soon" placeholder
const builtPages = ["/join"];

// Every link the site has: the menus plus the Donate button
const allPages: NavLink[] = [...mainNav, ...moreNav, { href: "/donate", key: "donate" }];

// Every page not built yet shows the "coming soon" page from src/app/[locale]/[slug]/page.tsx
export const comingSoonPages = allPages.filter((link) => !builtPages.includes(link.href));
