import Image from "next/image";
import type { CommitteeMember } from "@/lib/committee";
import { initials } from "@/lib/initials";

// One committee member: photo (or initials), role and name. Used on the homepage and Leadership page.
export function MemberCard({ member, role }: { member: CommitteeMember; role: string }) {
  return (
    <div className="h-full rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-gold-100 transition hover:-translate-y-1 hover:shadow-md hover:ring-gold-300 sm:p-5">
      <Avatar member={member} />
      <p className="mt-4 text-xs font-semibold tracking-wider text-gold-700 uppercase">{role}</p>
      <p className="mt-1 font-display text-lg text-ink">{member.name}</p>
    </div>
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
