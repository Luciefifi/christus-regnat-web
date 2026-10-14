import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

// Each language is loaded only when needed, and only on the server (never sent to the browser).
// Typing the loaders as Promise<Dictionary> makes TypeScript fail if rw.json or fr.json misses a key.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  rw: () => import("./dictionaries/rw.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
