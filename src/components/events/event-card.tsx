import { intlLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { formatEdition, type EventListItem } from "@/lib/events";
import { formatDate } from "@/lib/format";
import { buttonClasses } from "@/components/ui/button";
import { EventVideos } from "./event-videos";

export function EventCard({
  event,
  locale,
  dict,
  past = false,
  flip = false,
  priority = false,
}: {
  event: EventListItem;
  locale: Locale;
  dict: Dictionary;
  past?: boolean; // past events sit under a year heading and no longer sell tickets
  flip?: boolean; // media on the right on large screens, to alternate down the page
  priority?: boolean; // the first card on the page loads its image first
}) {
  const t = dict.events;
  const Title = past ? "h4" : "h3";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gold-100 lg:grid lg:grid-cols-2">
      <div className={flip ? "lg:order-last" : undefined}>
        {event.videos.length > 0 ? (
          <EventVideos
            videos={event.videos}
            eventTitle={event.title}
            cover={event.coverImage}
            labels={{ play: t.play, moreVideos: past ? t.moreVideos : t.watchTrailer }}
            priority={priority}
          />
        ) : (
          <Poster event={event} locale={locale} />
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <p className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-gold-700 uppercase">
          <span>{t.types[event.type]}</span>
          {event.edition && (
            <span className="rounded-full bg-gold-100 px-2.5 py-0.5 tracking-normal text-gold-800 normal-case">
              {formatEdition(event.edition, locale)}
            </span>
          )}
        </p>
        <Title className="mt-2 font-display text-3xl text-ink sm:text-4xl">{event.title}</Title>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-muted">{t.when}</dt>
            <dd className="font-semibold text-gold-800">
              {/* <time> lets search engines and calendars read the date */}
              <time dateTime={event.date}>{formatDate(event.date, intlLocale[locale])}</time>
              {event.time && <> · {event.time}</>}
            </dd>
          </div>
          {event.venue && (
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-ink-muted">{t.where}</dt>
              <dd className="text-ink">{event.venue}</dd>
            </div>
          )}
          {event.guests.length > 0 && (
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-ink-muted">{t.guests}</dt>
              <dd className="flex flex-wrap gap-1.5">
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

        {event.highlight && (
          <p className="mt-6 leading-relaxed text-ink-muted">{event.highlight}</p>
        )}

        {/* Tickets are sold on the concert's own site, so this is an external link */}
        {event.ticketsUrl && !past && (
          <div className="mt-auto pt-8">
            <a
              href={event.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary")}
            >
              {t.tickets}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

// When an event has no video yet: a gold card with the year, so no box is ever empty
function Poster({ event, locale }: { event: EventListItem; locale: Locale }) {
  return (
    <div
      aria-hidden="true"
      className="relative grid aspect-video place-items-center overflow-hidden bg-linear-to-br from-gold-300 via-gold-100 to-cream lg:aspect-auto lg:h-full"
    >
      <div className="absolute -right-16 -bottom-16 size-64 rounded-full bg-gold-400/30 blur-3xl" />
      <div className="relative text-center">
        <p className="font-display text-7xl font-semibold text-gold-900/80 sm:text-8xl">
          {event.date.slice(0, 4)}
        </p>
        {event.edition && (
          <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-gold-800 uppercase">
            {formatEdition(event.edition, locale)}
          </p>
        )}
      </div>
    </div>
  );
}
