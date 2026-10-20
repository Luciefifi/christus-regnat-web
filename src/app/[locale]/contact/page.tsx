import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { mapsHref, telHref, whatsappHref } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/social-icons";
import { SocialLinks } from "@/components/layout/social-links";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return { title: dict.nav.contact, description: dict.contact.intro };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.contact;
  const { phones, whatsapp, email, mapsQuery } = site.contact;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      {/* Three ways to reach us */}
      <section aria-label={t.title} className="pb-10 sm:pb-12">
        <Container className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <ContactCard title={t.callTitle}>
            <ul className="space-y-1">
              {phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    className="text-lg font-semibold text-ink tabular-nums hover:text-gold-700"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </ContactCard>

          <ContactCard title={t.whatsappTitle}>
            <p className="text-ink-muted">{t.whatsappText}</p>
            <a
              href={whatsappHref(whatsapp, t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "mt-4")}
            >
              <WhatsAppIcon className="size-4" />
              {t.whatsappCta}
            </a>
          </ContactCard>

          <ContactCard title={t.emailTitle}>
            {/* break-all: a long email address must wrap instead of overflowing on small phones */}
            <a
              href={`mailto:${email}`}
              className="font-semibold break-all text-ink hover:text-gold-700"
            >
              {email}
            </a>
          </ContactCard>
        </Container>
      </section>

      {/* Bookings + where to find us */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <Container className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-linear-to-br from-gold-50 to-white p-6 ring-1 ring-gold-200 sm:p-8">
            <h2 className="text-2xl font-semibold">{t.bookTitle}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{t.bookText}</p>
            <a
              href={whatsappHref(whatsapp, t.bookMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "mt-6")}
            >
              <WhatsAppIcon className="size-4" />
              {t.bookCta}
            </a>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gold-100 sm:p-8">
            <h2 className="text-2xl font-semibold">{t.findTitle}</h2>

            {/* <dl> = a list of label → value pairs */}
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs font-semibold tracking-wider text-gold-700 uppercase">
                  {t.parishLabel}
                </dt>
                <dd className="mt-1 text-ink">{dict.common.parish}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wider text-gold-700 uppercase">
                  {t.rehearsalsLabel}
                </dt>
                <dd className="mt-1 text-ink">
                  {dict.practice.rehearsalsDays} ·{" "}
                  <span className="whitespace-nowrap tabular-nums">
                    {site.rehearsals.start} – {site.rehearsals.end}
                  </span>
                  <span className="block text-ink-muted">{site.rehearsals.venue}</span>
                </dd>
              </div>
            </dl>

            <a
              href={mapsHref(mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "mt-6")}
            >
              {t.mapCta}
            </a>

            {/* A small label like "Our parish", not a heading (headings use the serif display font) */}
            <p className="mt-8 text-xs font-semibold tracking-wider text-gold-700 uppercase">
              {t.followTitle}
            </p>
            <SocialLinks variant="light" className="mt-3" />
          </article>
        </Container>
      </section>
    </>
  );
}

// The three small cards at the top share this frame
function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gold-100 sm:p-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </article>
  );
}
