import type en from "./dictionaries/en.json";

// English is the source of truth: every other language must have exactly the same keys.
export type Dictionary = typeof en;
