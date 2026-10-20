import Link from "next/link";
import { site } from "@/config/site";
import { intlLocale, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { formatDate } from "@/lib/format";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Countdown } from "./countdown";

// Server Component: renders the static parts; only <Countdown> runs in the browser
export function CountdownSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.countdown;
  const event = site.featuredEvent;

  return (
    <section aria-labelledby="countdown-heading" className="pb-10 sm:pb-12 lg:pb-14">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-gold-100 via-gold-50 to-white p-6 ring-1 ring-gold-200 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-gold-300/30 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
                {t.eyebrow}
              </p>
              <h2 id="countdown-heading" className="mt-2 text-4xl font-semibold sm:text-5xl">
                {event.title}
              </h2>
              <p className="mt-2 text-lg text-ink-muted">{dict.events.featuredSubtitle}</p>
              <p className="mt-4 font-semibold text-gold-800">
                {formatDate(event.date, intlLocale[locale])}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{event.venue}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">{t.cause}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {/* Tickets are sold on the concert's own site, so this is an external link */}
                <a
                  href={event.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("primary")}
                >
                  {t.tickets}
                </a>
                <Link href={localePath(locale, event.href)} className={buttonClasses("secondary")}>
                  {t.cta}
                </Link>
              </div>
            </div>

            <Countdown
              target={event.startsAt}
              labels={{
                days: t.days,
                hours: t.hours,
                minutes: t.minutes,
                seconds: t.seconds,
                started: t.started,
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
