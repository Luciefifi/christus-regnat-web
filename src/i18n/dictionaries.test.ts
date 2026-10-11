import { describe, expect, it } from "vitest";
import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";
import rw from "./dictionaries/rw.json";

// Lists every key path, e.g. ["nav.about", "nav.music", ...]
function keyPaths(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? keyPaths(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

describe("dictionaries", () => {
  const englishKeys = keyPaths(en).sort();

  it.each([
    ["rw", rw],
    ["fr", fr],
  ])("%s has exactly the same keys as English", (_name, dictionary) => {
    expect(keyPaths(dictionary).sort()).toEqual(englishKeys);
  });

  it.each([
    ["en", en],
    ["rw", rw],
    ["fr", fr],
  ])("%s has no empty translations", (_name, dictionary) => {
    const empty = keyPaths(dictionary).filter((path) => {
      const value = path
        .split(".")
        .reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], dictionary);
      return typeof value === "string" && value.trim() === "";
    });
    expect(empty).toEqual([]);
  });
});
