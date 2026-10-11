import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { intlLocale, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { formatDate } from "@/lib/format";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import choirPhoto from "../../../public/choir-group-photo.png";

export function HeroSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-cream">
      {/* Soft gold glow behind the hero (decorative) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-144 rounded-full bg-gold-200/40 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <Link
            href={localePath(locale, site.featuredEvent.href)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink shadow-sm ring-1 ring-gold-200 transition hover:ring-gold-400"
          >
            <span className="size-2 rounded-full bg-gold-500" aria-hidden="true" />
            {site.featuredEvent.title} · {formatDate(site.featuredEvent.date, intlLocale[locale])}
          </Link>

          <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-7xl">
            {site.name}
          </h1>

          {/* The choir's call and response (never translated) */}
          <p className="mt-5 font-display text-3xl italic sm:text-4xl">
            <span className="text-ink">{site.motto.call}</span>{" "}
            <span className="text-gold-600">{site.motto.response}</span>
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {dict.common.tagline} {dict.home.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localePath(locale, "/events")} className={buttonClasses()}>
              {dict.home.ctaEvents}
            </Link>
            <Link href={localePath(locale, "/join")} className={buttonClasses("secondary")}>
              {dict.home.ctaJoin}
            </Link>
          </div>
        </div>

        <figure className="relative">
          <Image
            src={choirPhoto}
            alt={dict.home.photoAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            preload
            className="h-auto w-full rounded-3xl shadow-2xl ring-1 shadow-gold-900/10 ring-gold-200"
          />
          <figcaption className="mt-3 text-xs text-ink-muted">{dict.home.photoCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
