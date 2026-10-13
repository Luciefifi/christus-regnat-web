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

// coming soon pages
export const comingSoonPages: NavLink[] = [
  ...mainNav,
  ...moreNav,
  { href: "/donate", key: "donate" },
];
