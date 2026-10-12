import Link from "next/link";
import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function PracticeSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.practice;

  return (
    <section aria-labelledby="practice-heading" className="py-12 sm:py-16 lg:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
          {t.eyebrow}
        </p>
        <h2 id="practice-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">
          {t.title}
        </h2>

        <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          {/* Weekly rehearsals: the one fixed activity every week */}
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gold-100 sm:p-8">
            <IconCircle>
              <path d="M12 7v5l3 2" />
              <circle cx="12" cy="12" r="9" />
            </IconCircle>
            <h3 className="mt-5 text-2xl font-semibold">{t.rehearsalsTitle}</h3>
            <p className="mt-3 font-display text-3xl text-gold-700">{t.rehearsalsDays}</p>
            <p className="mt-4 text-lg font-semibold tabular-nums">
              {site.rehearsals.start} – {site.rehearsals.end}
            </p>
            <p className="mt-1 text-ink-muted">{site.rehearsals.venue}</p>
            <p className="mt-6 text-sm text-ink-muted">{t.rehearsalsNote}</p>
            <Link href={localePath(locale, "/join")} className={buttonClasses("primary", "mt-4")}>
              {t.joinCta}
            </Link>
          </article>

          {/* Holy Mass: follows the monthly plan, so no fixed date here (comes from data later) */}
          <article className="rounded-3xl bg-linear-to-br from-gold-50 to-white p-6 ring-1 ring-gold-200 sm:p-8">
            <IconCircle>
              <path d="M12 3v18M7 8h10" />
            </IconCircle>
            <h3 className="mt-5 text-2xl font-semibold">{t.massTitle}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{t.massText}</p>
            <p className="mt-4 text-sm text-gold-800 italic">{t.massNote}</p>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "mt-6")}
            >
              {t.followCta}
            </a>
          </article>
        </div>
      </Container>
    </section>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-12 place-items-center rounded-full bg-gold-100 text-gold-700">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className="size-6"
      >
        {children}
      </svg>
    </span>
  );
}
