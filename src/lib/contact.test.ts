import { describe, expect, it } from "vitest";
import { mapsHref, telHref, whatsappHref } from "./contact";

describe("telHref", () => {
  it("removes spaces so phones can dial the number", () => {
    expect(telHref("+250 788 472 859")).toBe("tel:+250788472859");
  });
});

describe("whatsappHref", () => {
  it("keeps only the digits of the number", () => {
    expect(whatsappHref("+250 788 472 859")).toBe("https://wa.me/250788472859");
  });

  it("adds a ready-made message, safely encoded", () => {
    expect(whatsappHref("+250 788 472 859", "Hello & welcome?")).toBe(
      "https://wa.me/250788472859?text=Hello%20%26%20welcome%3F",
    );
  });
});

describe("mapsHref", () => {
  it("encodes the place for a Google Maps search", () => {
    expect(mapsHref("Regina Pacis, Kigali")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Regina%20Pacis%2C%20Kigali",
    );
  });
});
