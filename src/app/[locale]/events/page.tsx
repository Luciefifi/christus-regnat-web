import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getPublicEvents } from "@/data/events";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { groupByYear } from "@/lib/events";
import { EventCard } from "@/components/events/event-card";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/events">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return { title: dict.nav.events, description: dict.events.intro };
}

export default async function EventsPage({ params }: PageProps<"/[locale]/events">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const [dict, events] = await Promise.all([getDictionary(locale), getPublicEvents(locale)]);
  const t = dict.events;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      {/* Upcoming: soonest first */}
      <section aria-labelledby="upcoming-heading" className="pb-12 sm:pb-16">
        <Container>
          <h2 id="upcoming-heading" className="text-3xl font-semibold sm:text-4xl">
            {t.upcomingTitle}
          </h2>
          {events.upcoming.length > 0 ? (
            <ul className="mt-6 space-y-8">
              {events.upcoming.map((event, index) => (
                <li key={event.slug}>
                  <EventCard event={event} locale={locale} dict={dict} priority={index === 0} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-ink-muted">{t.noUpcoming}</p>
          )}
        </Container>
      </section>

      {/* Past: newest first, as a timeline with one marker per year */}
      {events.past.length > 0 && (
        <section aria-labelledby="past-heading" className="pb-12 sm:pb-16">
          <Container>
            <h2 id="past-heading" className="text-3xl font-semibold sm:text-4xl">
              {t.pastTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-ink-muted">{t.pastIntro}</p>

            <div className="mt-8 border-l-2 border-gold-200 pl-5 sm:pl-8">
              {groupByYear(events.past).map(([year, list], groupIndex) => (
                <div key={year} className="relative pb-10 last:pb-0">
                  {/* The dot sits on the timeline line */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[27px] size-3 rounded-full bg-gold-500 ring-4 ring-cream sm:-left-[39px]"
                  />
                  <h3 className="font-display text-3xl text-gold-700">{year}</h3>
                  <ul className="mt-4 space-y-8">
                    {list.map((event, index) => (
                      <li key={event.slug}>
                        <EventCard
                          event={event}
                          locale={locale}
                          dict={dict}
                          past
                          flip={(groupIndex + index) % 2 === 1}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* There is much more on YouTube than we list here */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-4xl bg-ink px-6 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t.youtubeTitle}</h2>
              <p className="mt-3 text-gold-100/80">{t.youtubeText}</p>
            </div>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "shrink-0")}
            >
              {t.youtubeCta}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
