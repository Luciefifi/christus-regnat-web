import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return { title: dict.nav.about, description: dict.about.intro };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.about;

  // Key figures. Numbers don't need translating, only their labels do.
  const stats = [
    { value: String(site.founded), label: t.stats.founded },
    { value: "100+", label: t.stats.members },
    { value: "80+", label: t.stats.songs },
    { value: "4", label: t.stats.sections },
  ];

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      {/* "Christus Regnat! Ishema Ridashonga!": the same in every language, never translated */}
      <section className="pb-10 sm:pb-12 lg:pb-14">
        <Container>
          <div className="rounded-4xl bg-ink px-6 py-10 text-center sm:px-12 sm:py-14">
            {/* lang tells screen readers to switch pronunciation: Latin, then Kinyarwanda */}
            <p className="font-display text-3xl leading-tight sm:text-5xl">
              <span lang="la" className="text-white">
                {site.motto.call}
              </span>{" "}
              <span lang="rw" className="text-gold-300">
                {site.motto.response}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* Key figures */}
      <section className="pb-10 sm:pb-12 lg:pb-14">
        <Container>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              // flex-col-reverse: the number shows on top, but the HTML keeps label (dt) before value (dd)
              <div
                key={stat.label}
                className="flex flex-col-reverse rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gold-100"
              >
                <dt className="mt-1 text-xs font-semibold tracking-wider text-gold-700 uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl text-ink sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Story + music */}
      <section className="pb-10 sm:pb-12 lg:pb-14">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <TextBlock title={t.storyTitle} paragraphs={t.story} />
          <TextBlock title={t.musicTitle} paragraphs={t.music} />
        </Container>
      </section>

      {/* Acts of Love + call to action */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <Container className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-linear-to-br from-gold-50 to-white p-6 ring-1 ring-gold-200 sm:p-8">
            <h2 className="text-2xl font-semibold">{t.charityTitle}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{t.charityText}</p>
            <Link
              href={localePath(locale, "/charity")}
              className={buttonClasses("secondary", "mt-6")}
            >
              {t.charityCta}
            </Link>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gold-100 sm:p-8">
            <h2 className="text-2xl font-semibold">{t.ctaTitle}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{t.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={localePath(locale, "/join")} className={buttonClasses()}>
                {dict.nav.join}
              </Link>
              <Link href={localePath(locale, "/contact")} className={buttonClasses("secondary")}>
                {dict.nav.contact}
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}

// A heading followed by paragraphs (used for "Our story" and "Our music")
function TextBlock({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
