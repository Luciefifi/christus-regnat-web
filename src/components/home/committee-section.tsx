import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { CommitteeMember } from "@/lib/committee";
import { MemberCard } from "@/components/committee/member-card";
import { Container } from "@/components/ui/container";

export function CommitteeSection({
  locale,
  dict,
  members,
}: {
  locale: Locale;
  dict: Dictionary;
  members: CommitteeMember[];
}) {
  const t = dict.committee;
  if (members.length === 0) return null; // no committee in the database yet

  return (
    <section aria-labelledby="committee-heading" className="pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
              {t.eyebrow}
            </p>
            <h2 id="committee-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-2 text-ink-muted">{t.subtitle}</p>
          </div>
          <Link
            href={localePath(locale, "/leadership")}
            className="text-sm font-semibold text-gold-700 hover:text-gold-900"
          >
            {t.viewAll} →
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {members.map((member) => (
            <li key={member.role}>
              <MemberCard member={member} role={t.roles[member.role]} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
