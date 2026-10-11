import { Inter, Playfair_Display } from "next/font/google";

// Shared by the [locale] layout and the global 404 page.
// Headings: swap the font here only; the rest of the app uses the `font-display` class.
export const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontVariables = `${display.variable} ${sans.variable}`;
