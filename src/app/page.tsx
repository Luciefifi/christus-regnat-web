import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/config/site";
import choirPhoto from "../../public/choir-group-photo.png";

export default function HomePage() {
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
            href={site.featuredEvent.href}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink shadow-sm ring-1 ring-gold-200 transition hover:ring-gold-400"
          >
            <span className="size-2 rounded-full bg-gold-500" aria-hidden="true" />
            {site.featuredEvent.title} · {site.featuredEvent.dateLabel}
          </Link>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">{site.name}</h1>

          {/* The choir's call and response */}
          <p className="mt-5 font-display text-3xl italic sm:text-4xl">
            <span className="text-ink">{site.motto.call}</span>{" "}
            <span className="text-gold-600">{site.motto.response}</span>
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {site.tagline} A Catholic liturgical and gospel choir singing at {site.parish} since {site.founded}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className={buttonClasses()}>
              Upcoming concerts
            </Link>
            <Link href="/join" className={buttonClasses("secondary")}>
              Join the choir
            </Link>
          </div>
        </div>

        <figure className="relative">
          <Image
            src={choirPhoto}
            alt="Chorale Christus Regnat in white robes with gold collars in front of white and gold drapes"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            preload
            className="h-auto w-full rounded-3xl shadow-2xl shadow-gold-900/10 ring-1 ring-gold-200"
          />
          <figcaption className="mt-3 text-xs text-ink-muted">Event and photographer credit to be confirmed.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
