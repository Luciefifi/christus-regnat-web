import { defaultLocale, hasLocale, locales, type Locale } from "./config";

/**
 * Picks the best locale for a visitor:
 * 1. the language they chose before (cookie set by the language switcher)
 * 2. otherwise their browser's Accept-Language header, e.g. "rw-RW,rw;q=0.9,en;q=0.8"
 * 3. otherwise the default (English)
 */
export function pickLocale(
  acceptLanguage: string | null | undefined,
  cookieLocale?: string,
): Locale {
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        language: tag.split("-")[0].toLowerCase(), // "rw-RW" → "rw"
        quality: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter((entry) => entry.language && !Number.isNaN(entry.quality))
    .sort((a, b) => b.quality - a.quality);

  const match = preferred.find((entry) => (locales as readonly string[]).includes(entry.language));
  return match ? (match.language as Locale) : defaultLocale;
}
