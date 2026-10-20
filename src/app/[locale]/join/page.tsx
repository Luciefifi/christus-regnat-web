import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({ params }: PageProps<"/[locale]/join">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  // A page-specific description replaces the site-wide one from the layout
  return { title: dict.nav.join, description: dict.join.intro };
}

export default async function JoinPage({ params }: PageProps<"/[locale]/join">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.join;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      {/* Steps + rehearsal card */}
      <section aria-labelledby="steps-heading" className="pb-12 sm:pb-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 id="steps-heading" className="text-3xl font-semibold sm:text-4xl">
              {t.stepsTitle}
            </h2>

            <ol className="mt-8 space-y-6">
              {t.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  {/* The <ol> already tells screen readers the number, so this circle is decorative */}
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-100 font-display text-lg text-gold-800"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* self-start: don't stretch the card to the height of the steps column */}
          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gold-100 sm:p-8 lg:self-start">
            <h2 className="text-2xl font-semibold">{t.rehearsalsTitle}</h2>
            <p className="mt-3 font-display text-2xl text-gold-700">
              {dict.practice.rehearsalsDays}
            </p>
            <p className="mt-2 text-lg font-semibold tabular-nums">
              {site.rehearsals.start} – {site.rehearsals.end}
            </p>
            <p className="mt-1 text-ink-muted">{site.rehearsals.venue}</p>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">{t.applyNote}</p>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "mt-4")}
            >
              {t.followCta}
            </a>
          </aside>
        </Container>
      </section>
    </>
  );
}
