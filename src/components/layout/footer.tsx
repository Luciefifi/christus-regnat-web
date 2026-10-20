import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { site } from "@/config/site";
import { intlLocale, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { formatDate } from "@/lib/format";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "./social-links";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const path = (href: string) => localePath(locale, href);

  const explore = mainNav.map((link) => ({ href: path(link.href), label: dict.nav[link.key] }));
  const getInvolved = [
    { href: path("/join"), label: dict.footer.joinChoir },
    { href: path("/contact"), label: dict.footer.bookEvent },
    { href: path("/donate"), label: dict.footer.support },
    { href: path("/charity"), label: dict.footer.actsOfLove },
  ];

  return (
    // Deep brown (our "ink" colour), not black or blue, so the gold accents glow
    <footer className="bg-ink text-gold-50">
      {/* "Christus Regnat! Ishema Ridashonga!" band */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col items-center gap-5 py-10 text-center sm:gap-6 sm:py-14">
          <Image
            src="/logo.png"
            alt=""
            width={72}
            height={72}
            className="rounded-full ring-1 ring-gold-400/40"
          />
          <p className="font-display text-3xl leading-tight sm:text-5xl">
            <span className="text-white">{site.motto.call}</span>{" "}
            <span className="text-gold-300">{site.motto.response}</span>
          </p>
          <div className="h-px w-24 bg-linear-to-r from-transparent via-gold-400 to-transparent" />
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={path("/join")} className={buttonClasses("primary")}>
              {dict.footer.singWithUs}
            </Link>
            <Link href={path("/contact")} className={buttonClasses("onDark")}>
              {dict.footer.bookChoir}
            </Link>
          </div>
        </Container>
      </div>

      {/* Main columns */}
      {/* Two columns from the smallest phones up, so the link lists sit side by side */}
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12">
        <div className="col-span-2 lg:col-span-4">
          <p className="font-display text-2xl font-semibold text-white">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-gold-100/70">
            {dict.common.tagline} {dict.footer.about}
          </p>
          <p className="mt-5 flex items-start gap-2 text-sm text-gold-100/70">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-gold-400"
            >
              <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {dict.common.parish}
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <FooterColumn title={dict.footer.explore} items={explore} className="lg:col-span-2" />
        <FooterColumn
          title={dict.footer.getInvolved}
          items={getInvolved}
          className="lg:col-span-3"
        />

        {/* Featured event card */}
        <div className="col-span-2 lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            {dict.footer.saveTheDate}
          </p>
          <Link
            href={path(site.featuredEvent.href)}
            className="group mt-4 block rounded-2xl bg-linear-to-br from-gold-400/20 to-transparent p-5 ring-1 ring-gold-400/30 transition hover:ring-gold-400"
          >
            <p className="font-display text-2xl text-white">{site.featuredEvent.title}</p>
            <p className="mt-1 text-sm text-gold-100/80">{dict.events.featuredSubtitle}</p>
            <p className="mt-4 text-sm font-semibold text-gold-300">
              {formatDate(site.featuredEvent.date, intlLocale[locale])}
              <span
                aria-hidden="true"
                className="ml-2 inline-block transition group-hover:translate-x-1"
              >
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
            © {site.name} · {dict.footer.since} {site.founded}
          </p>
          <a href="#main" className="hover:text-gold-300">
            {dict.footer.backToTop} ↑
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
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">{title}</p>
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
