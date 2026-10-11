// Shared by the proxy, Server Components and Client Components, so no server-only imports here.

export const locales = ["en", "rw", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  rw: "Kinyarwanda",
  fr: "Français",
};

// Locale used for Intl date/number formatting (en-GB gives "29 November 2026", not "November 29")
export const intlLocale: Record<Locale, string> = {
  en: "en-GB",
  rw: "rw-RW",
  fr: "fr-FR",
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefixes a path with the locale: ("rw", "/about") → "/rw/about", ("rw", "/") → "/rw" */
export function localePath(locale: Locale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
