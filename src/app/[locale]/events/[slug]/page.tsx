import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent, getEventSlugs } from "@/data/events";
import { hasLocale, intlLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { mapsHref } from "@/lib/contact";
import { calendarHref, formatEdition, youtubeThumbnail, type EventListItem } from "@/lib/events";
import { formatDate } from "@/lib/format";
import { EventVideos } from "@/components/events/event-videos";
import { PhotoGallery } from "@/components/events/photo-gallery";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Build every event page ahead of time (called once per language by the layout).
// With Cache Components the list can't be empty, so an empty database gives one page that 404s.
export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "none" }];
}

// The event's own photo, or else the still of its main video
function coverOf(event: EventListItem): string | undefined {
  const main = event.videos[0];
  return event.coverImage ?? (main && youtubeThumbnail(main.youtubeId, "maxres"));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/events/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const event = await getEvent(slug, locale);
  if (!event) notFound();

  const cover = coverOf(event);
  return {
    title: event.title,
    description: event.highlight,
    // The picture shown when the page is shared on WhatsApp, Facebook, X...
    openGraph: cover ? { images: [cover] } : undefined,
  };
}

export default async function EventPage({ params }: PageProps<"/[locale]/events/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const [dict, event] = await Promise.all([getDictionary(locale), getEvent(slug, locale)]);
  if (!event) notFound();
  const t = dict.events;
  const cover = coverOf(event);
  const date = formatDate(event.date, intlLocale[locale]);

  return (
    <>
      {/* Hero: the event's photo behind its name */}
      <section className="relative isolate overflow-hidden bg-ink">
        {cover && (
          <Image
            src={cover}
            alt=""
            fill
            sizes="100vw"
            preload
            className="-z-10 object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/60 to-ink/20" />

        <Container className="pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
          <Link
            href={localePath(locale, "/events")}
            className="text-sm font-semibold text-gold-200 hover:text-white"
          >
            ← {t.allEvents}
          </Link>

          <p className="mt-10 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-gold-300 uppercase sm:mt-16">
            <span>{t.types[event.type]}</span>
            {event.edition && (
              <span className="rounded-full bg-gold-400 px-2.5 py-0.5 tracking-normal text-ink normal-case">
                {formatEdition(event.edition, locale)}
              </span>
            )}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            {event.title}
          </h1>
          <p className="mt-4 text-lg font-semibold text-gold-200">
            <time dateTime={event.date}>{date}</time>
            {event.time && <> · {event.time}</>}
            {event.venue && <span className="font-normal text-gold-50/80"> · {event.venue}</span>}
          </p>
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            {/* The body font: the display font is for headings, long text reads better in Inter */}
            {event.highlight && (
              <p className="text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
                {event.highlight}
              </p>
            )}

            {event.videos.length > 0 && (
              <div className={event.highlight ? "mt-10" : undefined}>
                <h2 className="text-2xl font-semibold sm:text-3xl">{t.videosTitle}</h2>
                <div className="mt-4 overflow-hidden rounded-3xl shadow-sm ring-1 ring-gold-100">
                  <EventVideos
                    videos={event.videos}
                    eventTitle={event.title}
                    cover={event.coverImage}
                    layout="songs"
                    labels={{ play: t.play, moreVideos: t.songsTitle, with: t.guests }}
                  />
                </div>
              </div>
            )}

            {event.photos.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold sm:text-3xl">{t.photosTitle}</h2>
                <div className="mt-4">
                  <PhotoGallery
                    photos={event.photos}
                    eventTitle={event.title}
                    labels={{
                      photo: t.photoLabel,
                      close: t.closePhoto,
                      previous: t.previousPhoto,
                      next: t.nextPhoto,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Practical details: stays in view beside the videos on large screens */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gold-100 sm:p-8">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-ink-muted">{t.when}</dt>
                  <dd className="mt-0.5 font-semibold text-gold-800">
                    {date}
                    {event.time && <> · {event.time}</>}
                  </dd>
                </div>
                {event.venue && (
                  <div>
                    <dt className="text-ink-muted">{t.where}</dt>
                    <dd className="mt-0.5 text-ink">{event.venue}</dd>
                  </div>
                )}
                {event.guests.length > 0 && (
                  <div>
                    <dt className="text-ink-muted">{t.guests}</dt>
                    <dd className="mt-1.5 flex flex-wrap gap-1.5">
                      {event.guests.map((guest) => (
                        <span
                          key={guest}
                          className="rounded-full bg-cream px-2.5 py-0.5 font-medium text-ink ring-1 ring-gold-200"
                        >
                          {guest}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

              {/* Only useful before the event: tickets, calendar, directions */}
              {!event.isPast && (
                <div className="mt-6 flex flex-col gap-3">
                  {/* Tickets are sold on the concert's own site, so this is an external link */}
                  {event.ticketsUrl && (
                    <a
                      href={event.ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses("primary")}
                    >
                      {t.tickets}
                    </a>
                  )}
                  <a
                    href={calendarHref(event)}
                    download={`${event.slug}.ics`}
                    className={buttonClasses("secondary")}
                  >
                    {t.addToCalendar}
                  </a>
                  {event.venue && (
                    <a
                      href={mapsHref(event.venue)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses("ghost")}
                    >
                      {t.directions}
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
