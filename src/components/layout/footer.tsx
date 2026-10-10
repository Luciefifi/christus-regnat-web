import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { site } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FacebookIcon, XIcon, YouTubeIcon } from "@/components/icons/social-icons";

const getInvolved = [
  { href: "/join", label: "Join the choir" },
  { href: "/contact", label: "Book us for a wedding or event" },
  { href: "/donate", label: "Support our mission" },
  { href: "/charity", label: "Acts of Love" },
];

const socials = [
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: site.socials.x, label: "X (Twitter)", Icon: XIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
];

export function Footer() {
  return (
    // Deep brown (our "ink" colour), not black or blue, so the gold accents glow
    <footer className="mt-24 bg-ink text-gold-50">
      {/* Motto band: the choir's call and response */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col items-center gap-6 py-14 text-center">
          <Image src="/logo.png" alt="" width={72} height={72} className="rounded-full ring-1 ring-gold-400/40" />
          <p className="font-display text-3xl leading-tight sm:text-5xl">
            <span className="text-white">{site.motto.call}</span>{" "}
            <span className="text-gold-300">{site.motto.response}</span>
          </p>
          <div className="h-px w-24 bg-linear-to-r from-transparent via-gold-400 to-transparent" />
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/join" className={buttonClasses("primary")}>
              Sing with us
            </Link>
            <Link href="/contact" className={buttonClasses("onDark")}>
              Book the choir
            </Link>
          </div>
        </Container>
      </div>

      {/* Main columns */}
      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-2xl font-semibold text-white">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-gold-100/70">
            {site.tagline} A Catholic liturgical and gospel choir serving the liturgy since {site.founded}.
          </p>
          <p className="mt-5 flex items-start gap-2 text-sm text-gold-100/70">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400">
              <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {site.parish}
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-white/5 text-gold-100 ring-1 ring-white/10 transition hover:bg-gold-400 hover:text-ink"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Explore" items={mainNav} className="lg:col-span-2" />
        <FooterColumn title="Get involved" items={getInvolved} className="lg:col-span-3" />

        {/* Featured event card */}
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Save the date</p>
          <Link
            href={site.featuredEvent.href}
            className="group mt-4 block rounded-2xl bg-linear-to-br from-gold-400/20 to-transparent p-5 ring-1 ring-gold-400/30 transition hover:ring-gold-400"
          >
            <p className="font-display text-2xl text-white">{site.featuredEvent.title}</p>
            <p className="mt-1 text-sm text-gold-100/80">{site.featuredEvent.subtitle}</p>
            <p className="mt-4 text-sm font-semibold text-gold-300">
              {site.featuredEvent.dateLabel}
              <span aria-hidden="true" className="ml-2 inline-block transition group-hover:translate-x-1">
                →
              </span>
            </p>
          </Link>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-gold-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name} · Since {site.founded}
          </p>
          <a href="#main" className="hover:text-gold-300">
            Back to top ↑
          </a>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  className = "",
}: {
  title: string;
  items: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-gold-100/80 transition hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
