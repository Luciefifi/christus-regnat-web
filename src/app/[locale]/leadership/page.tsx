import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getCommitteeTerms } from "@/data/committee";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { termYears } from "@/lib/committee";
import { MemberCard } from "@/components/committee/member-card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/leadership">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return { title: dict.nav.leadership, description: dict.leadership.intro };
}

export default async function LeadershipPage({ params }: PageProps<"/[locale]/leadership">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const [dict, terms] = await Promise.all([getDictionary(locale), getCommitteeTerms()]);
  const t = dict.leadership;
  const roles = dict.committee.roles;
  const [current, ...past] = terms;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      {/* The committee serving now, as large cards */}
      {current && (
        <section aria-labelledby="current-heading" className="pb-12 sm:pb-16">
          <Container>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 id="current-heading" className="text-3xl font-semibold sm:text-4xl">
                {t.currentTitle}
              </h2>
              <p className="font-display text-2xl text-gold-700">
                {termYears(current.startYear, current.endYear)}
              </p>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {current.members.map((member) => (
                <li key={member.role}>
                  <MemberCard member={member} role={roles[member.role]} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Every earlier committee, newest first: one card per term */}
      {past.length > 0 && (
        <section aria-labelledby="past-heading" className="pb-12 sm:pb-16 lg:pb-20">
          <Container>
            <h2 id="past-heading" className="text-3xl font-semibold sm:text-4xl">
              {t.pastTitle.replace("{year}", String(site.founded))}
            </h2>
            <p className="mt-2 max-w-2xl text-ink-muted">{t.pastIntro}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((term) => (
                <li
                  key={term.startYear}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gold-100 sm:p-6"
                >
                  <h3 className="font-display text-2xl text-gold-700">
                    {termYears(term.startYear, term.endYear)}
                  </h3>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    {term.members.map((member) => (
                      <div key={member.role} className="flex justify-between gap-4">
                        <dt className="text-ink-muted">{roles[member.role]}</dt>
                        <dd className="text-right font-medium text-ink">{member.name}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
