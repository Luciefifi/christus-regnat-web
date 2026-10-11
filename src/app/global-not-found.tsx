import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { fontVariables } from "./fonts";
import "./globals.css";

// Shown for any URL that matches no page, e.g. /en/does-not-exist.
// It bypasses our layouts (they live under [locale]), so it renders its own <html>.
export const metadata: Metadata = {
  title: `Page not found · ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="grid min-h-dvh place-items-center bg-cream p-6 text-center">
        <main>
          <Image src="/logo.png" alt="" width={96} height={96} className="mx-auto" />
          <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-gold-700 uppercase">404</p>
          <h1 className="mt-2 text-4xl font-semibold">This page could not be found</h1>
          <p className="mt-3 text-ink-muted">Page ntiyabonetse · Cette page est introuvable</p>
          <nav className="mt-8 flex justify-center gap-3 text-sm font-semibold">
            <Link href="/en" className="rounded-full bg-gold-400 px-5 py-2.5 hover:bg-gold-500">
              Home
            </Link>
            <Link
              href="/rw"
              className="rounded-full px-5 py-2.5 ring-1 ring-gold-400 hover:bg-gold-50"
            >
              Ahabanza
            </Link>
            <Link
              href="/fr"
              className="rounded-full px-5 py-2.5 ring-1 ring-gold-400 hover:bg-gold-50"
            >
              Accueil
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
