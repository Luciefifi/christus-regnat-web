import Image from "next/image";
import Link from "next/link";
import { executiveCommittee, type CommitteeMember } from "@/config/committee";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { initials } from "@/lib/initials";
import { Container } from "@/components/ui/container";

export function CommitteeSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.committee;

  return (
    <section aria-labelledby="committee-heading" className="py-12 sm:py-16 lg:py-20">
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
          {executiveCommittee.map((member) => (
            <li
              key={member.role}
              className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-gold-100 transition hover:-translate-y-1 hover:shadow-md hover:ring-gold-300 sm:p-5"
            >
              <Avatar member={member} />
              <p className="mt-4 text-xs font-semibold tracking-wider text-gold-700 uppercase">
                {t.roles[member.role]}
              </p>
              <p className="mt-1 font-display text-lg text-ink">{member.name}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Avatar({ member }: { member: CommitteeMember }) {
  const circle = "mx-auto size-24 overflow-hidden rounded-full ring-2 ring-gold-200";

  if (member.photo) {
    return (
      <div className={`relative ${circle}`}>
        <Image src={member.photo} alt={member.name} fill sizes="96px" className="object-cover" />
      </div>
    );
  }

  // No photo yet: initials in a gold circle (decorative, the name is written below)
  return (
    <div
      aria-hidden="true"
      className={`grid place-items-center bg-gold-100 font-display text-2xl text-gold-800 ${circle}`}
    >
      {initials(member.name)}
    </div>
  );
}
