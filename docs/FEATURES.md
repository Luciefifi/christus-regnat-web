# Chorale Christus Regnat: Features & Product Notes

> The living list of everything the website should do.
> When a new idea comes up, add it here first (see [How to add a feature](#how-to-add-a-feature)).
> The original brief is `CHRISTUS_REGNAT_PROJECT_BRIEF.md` (kept outside the repo); this file is the up-to-date version.

**Status key:** ✅ done · 🚧 in progress · ⬜ planned · 💡 idea (not yet agreed) · ❓ needs an answer from the choir

---

## 1. How the choir works (facts the site must respect)

| Topic | What we know | Source |
|---|---|---|
| Name and motto | Chorale Christus Regnat (CCR). Call and response: **"Christus Regnat!" / "Ishema Ridashonga!"** | Choir member |
| Founded | 2006, at Centre Christus, Remera | Press |
| Parish | Regina Pacis Parish, Remera, Kigali | Press, choir |
| **Rehearsals (fixed)** | **Every Tuesday and Friday, 18:00–20:00, at Ste Famille (JOC)** | Choir member |
| Sunday Mass | Follows a **monthly plan** (not every Sunday is the same) | Choir member |
| Early-morning Mass | Sometimes, following the **parish plan** | Choir member |
| Mass flyers | A poster is published before each Mass, inviting supporters to come | Choir member |
| Attendance | Taken at most activities; **section leaders** take attendance for their own section | Choir member |
| Attendance rules | **Below 70% (but 50% or more): fine.** **Below 50%:** ❓ consequence to confirm | Choir member |
| Monthly contribution | **Students: 500 RWF/month. Others: 1,000 RWF/month.** Official members only (not candidates) | Choir member |
| Birthday flyers | A flyer is posted on social media for **every member's birthday** | Choir member |
| Feast-day flyers | Flyers for special Catholic days (e.g. Assumption, Christmas) | Choir member |
| Practice reminders | Every Tuesday and Friday, a few hours before practice, the **secretary sends a WhatsApp reminder** to everyone | Choir member |
| New members | Join a separate **new members group**, attendance tracked, then **exams by the technical team**, which makes the final decision | Choir member |
| Big annual concert | **iBweranganzo**: 2023, 2024, and **29 November 2026** (20th anniversary) | Press, choir socials |

---

## 2. Roles and permissions

| Role | Who | Can do |
|---|---|---|
| **Admin** | 1–2 trusted people | Everything, including roles and settings |
| **Committee** | Executive committee | Content (news, events, gallery), member approval, finance, announcements |
| **Technical team** ❓ | Conductors / music leadership | Repertoire, song library, **candidate exams and admission decisions** |
| **Section leader** | Soprano, alto, tenor, bass leaders | **Take attendance for their section**, see section reports, section announcements |
| **Member** | Admitted choir members | Portal: calendar, RSVP, songs, own attendance, own profile |
| **Candidate** | New members not yet admitted | Limited portal: rehearsal calendar, practice songs, own attendance, exam info |
| **Public** | Anyone | Public website |

A person can have more than one role (e.g. a section leader who is also on the committee).

---

## 3. Membership lifecycle (new members to full members) ⬜

```
Join form on website ──► Applicant ──► Candidate (new members group) ──► Exam ──► Decision
     (public)          (committee      (attendance tracked,          (technical   ├─ Admitted → Member
                        reviews)        practice songs)               team)       ├─ Extend candidacy
                                                                                  └─ Not admitted
```

- ⬜ **Join form** creates an *applicant* (name, phone, email, voice part if known, experience, parish).
- ⬜ Committee or technical team accepts the applicant into a **candidate cohort** (e.g. "Candidates – Jan 2027").
- ⬜ **Candidate attendance** is tracked at every activity they're expected at.
- ⬜ **Eligibility for the exam** is shown automatically (e.g. "attendance 85%, eligible"), based on a threshold ❓.
- ⬜ **Exams**: the technical team records results per part (e.g. voice test, sight-reading, theory, set pieces ❓) with scores and comments.
- ⬜ **Decision** recorded by the technical team: admitted / extended / not admitted, with date and notes. Every decision goes in the **audit log**.
- ⬜ On admission the person becomes a **Member** with a voice part and join year, and moves into their section's attendance list.
- ⬜ Candidate and member see their own progress (attendance %, exam date, result) in the portal.

❓ Questions for the choir:
1. How long is a candidacy usually? Is there a minimum attendance % before the exam?
2. What does the exam contain? Is it scored? Can it be retaken?
3. Who takes attendance for the candidates group (a coordinator? the technical team?)
4. Do candidates rehearse with the main choir (Tue/Fri) or separately?

---

## 4. Attendance ⬜

- ⬜ Activities: **rehearsals (Tue/Fri)**, Masses, concerts, weddings/funerals, meetings, other events.
- ⬜ **Section leaders mark attendance for their section** on their phone, fast: one tap per person (Present / Late / Excused / Absent).
- ⬜ Candidate attendance is marked in the same way, on the candidates list.
- ⬜ Rehearsals are **generated automatically** every Tuesday and Friday 18:00–20:00 at Ste Famille (JOC), so no one has to create them by hand; leaders can cancel or move one.
- ⬜ Reports: per member, per section, per activity type, per month; attendance % over a period.
- ⬜ Members see their own attendance history.
- ⬜ Export to CSV/Excel.

### Attendance thresholds and fines ⬜
- ⬜ The system calculates each member's **attendance %** over the assessment period ❓ (monthly? quarterly? per year?).
- ⬜ **70% or more:** OK.
- ⬜ **50% to below 70%:** a **fine** is applied ❓ (amount? fixed or per missed activity?).
- ⬜ **Below 50%:** ❓ consequence to confirm (bigger fine? warning? suspension? review by the committee?).
- ⬜ Fines are created automatically at the end of the period, **reviewed and confirmed by a leader** before they count (no fine without a human check).
- ⬜ Fines appear in the member's finance page next to contributions (see §8a) and can be marked as paid or waived (with a reason, in the audit log).
- ⬜ Early warning: members see "your attendance this period is 68%, below 70%" before the period ends, so they can improve.
- ❓ Do **excused** absences count against the %? Does **late** count as present, half, or absent?
- ❓ Which activities count (rehearsals only, or Masses and concerts too)?
- ❓ Do the same rules apply to candidates?
- 💡 Excuse requests: a member submits "I can't come because…" before the activity; the section leader approves.
- 💡 Works with a poor connection: marking attendance saves offline and syncs later (PWA).

---

## 5. Masses, repertoire and the flyer generator ⬜

- ⬜ **Mass planner** (portal, leaders): date and time, place (Regina Pacis or other), Mass type (Sunday, early morning, feast, wedding, funeral), liturgical season, **conductor**, **soloists**, and **songs per part** (Entrance, Kyrie, Gloria, Psalm, Alleluia, Offertory, Sanctus, Agnus Dei, Communion, Thanksgiving, Recessional).
- ⬜ Monthly plan view: all Masses of the month at once.
- ⬜ **Flyer generator**: one click turns a planned Mass into a gold-and-white poster (logo, motto, date, time, place, conductor, soloists, songs), downloadable as PNG:
  - portrait 1080×1920 (WhatsApp Status, Instagram/TikTok stories)
  - square 1080×1080 (Facebook, X, Instagram posts)
  - built with Next.js `ImageResponse` (`next/og`)
- ⬜ **Public Mass page** (e.g. `/masses/2026-10-18`) that uses the flyer as its share preview.
- ⬜ Liturgical-season colour badges (Advent/Lent = wine, Ordinary Time = leaf, Christmas/Easter = gold, Pentecost/martyrs = jewel).
- 💡 Share buttons: WhatsApp and Facebook with the flyer and link.
- ❓ Please collect 1–2 past flyers so the generator matches what supporters already know.

### Other flyers (same generator, different templates) ⬜
- ⬜ **Birthday flyer** for every member: photo, name, voice part, a blessing message, logo and motto. Generated automatically on the morning of the birthday, ready to download and post.
  - Only for members who **gave consent** (photo + birthday on social media); shows **day and month only, never the birth year**.
- ⬜ **Feast-day flyers** for special Catholic days (Christmas, Easter, Assumption 15 Aug, Christ the King, choir anniversary, …): a liturgical calendar in the system, each day with a greeting text and an image; leaders can edit the message.
- ⬜ A **"Flyers" page in the portal** listing today's and upcoming flyers (birthdays this week, next feast day), so the communication team can prepare in advance.
- 💡 Flyer templates the communication team can tweak (colours within the brand, message text) without code.

---

## 6. Public website

| Page | Status | Notes |
|---|---|---|
| Home | 🚧 | Hero with motto ✅, committee section ⬜, rehearsals and next Mass ⬜, next concert countdown ⬜, latest video ⬜, latest news ⬜ |
| About | ⬜ | Mission, Regina Pacis, languages sung, activities, meaning of "Ishema Ridashonga" ❓ |
| History | ⬜ | Interactive timeline 2006 to today |
| Leadership | ⬜ | Executive (featured), full committee grouped by area, archive of committees since 2006 |
| Music | ⬜ | Songs and albums, YouTube/Apple Music embeds, filters (language, season, occasion) |
| Videos | ⬜ | Official YouTube channel (@IshemaRidashonga), concerts, music videos, music-theory lessons |
| Events / Concerts | ⬜ | Upcoming and past, detail pages, tickets, map, add-to-calendar (.ics) |
| Masses | ⬜ | Upcoming Masses with the choir (from the Mass planner) |
| Gallery | ⬜ | Albums by event and year, lightbox, credits |
| News & Press | ⬜ | Announcements and press links |
| Acts of Love (charity) | ⬜ | Dusangire Lunch and other initiatives |
| Join the Choir | ⬜ | Requirements, rehearsal times, **application form, which starts the membership lifecycle** |
| Contact / Book us | ⬜ | Form, map, bookings for weddings, funerals, events |
| Donate / Support | ⬜ | Mobile Money details, sponsorship packages |

### Homepage sections (planned order)
1. ✅ Hero: name, motto, featured event pill, choir photo
2. ⬜ **Today at Christus Regnat** (only shown when there is something): today's **birthday flyer(s)** (consenting members only) and/or today's **feast-day flyer**, e.g. "Happy Feast of the Assumption"
3. ⬜ **Next event** (see rule below) + weekly rehearsals (Tue & Fri 18:00–20:00, Ste Famille JOC)
4. ⬜ **Meet our committee**: the 5 executive members (President, Vice-President, Technical Vice-President, Secretary, Accountant) ❓ exact titles and names
5. ⬜ Featured video
6. ⬜ Latest news
7. ✅ Footer with motto band, links, socials, featured event

### Rule: which event the homepage shows ⬜
- **Default:** the next upcoming activity, i.e. the next Mass with the choir or the next rehearsal.
- **Pinned big events:** an event (e.g. a concert like iBweranganzo) can be **pinned**. A pinned event stays on the homepage, with a countdown, **until it happens or until a "pin until" date** set by the admin, even if smaller activities come first.
- Several pinned events: show the soonest one.
- After the event: it disappears automatically, and the next pinned event or the default takes over (no one has to remember to remove it).

---

## 7. Leadership and committee ⬜

- ⬜ Current committee is a **big team**: grouped by area (Executive, Music & Technical, Administration & Finance, Communication & Media, Discipline/Social/Charity ❓ real structure).
- ⬜ Homepage shows only members marked **featured** (the executive).
- ⬜ Archive: committees for every term since 2006; unknown people shown as "To be confirmed", **never invented**.
- ⬜ Photos only with consent.
- ❓ Term length, list of roles per area, current names, past committees.

---

## 8. Members portal (login required) ⬜

- ⬜ Dashboard: next rehearsal, next Mass, my duties, announcements, my attendance %
- ⬜ Calendar: rehearsals, Masses, concerts, weddings, funerals; RSVP; subscribe in phone calendar
- ⬜ Attendance (see §4)
- ⬜ Song library: sheet music (PDF), practice audio per voice part, lyrics, available offline
- ⬜ Mass / repertoire planner and flyer generator (see §5)
- ⬜ Announcements: to everyone, to a section, or to candidates; WhatsApp-friendly sharing
- ⬜ Candidates area (see §3)
- ⬜ Finance: monthly contributions and fines (see §8a); expenses (leaders only)
- ⬜ Concert management: tasks, volunteers, ticket sales, door check-in with QR codes
- ⬜ Documents: constitution, minutes, forms
- ⬜ My profile: contact info, voice part, join year, privacy choices

### 8a. Monthly contributions and fines ⬜
- ⬜ Every **official member** owes a monthly contribution: **500 RWF (student)** or **1,000 RWF (non-student)**. Candidates don't pay.
- ⬜ Each member has a **category** (student / non-student) that the accountant can change (e.g. when someone finishes school), with the date it changed.
- ⬜ Amounts are **settings**, not hard-coded, so the choir can change them later without a developer; past months keep the amount that applied then.
- ⬜ The accountant records payments (amount, date, months covered, method: cash / MoMo, reference). One payment can cover several months.
- ⬜ Each member sees their own status: paid months, months owed, fines owed, total balance.
- ⬜ Accountant dashboard: who is up to date, who owes, totals per month, export to Excel.
- ⬜ Attendance fines (see §4) appear in the same balance.
- 💡 Friendly reminders (WhatsApp/SMS/email) for members who owe.
- 💡 Pay by MTN MoMo / Airtel Money from the portal.
- ❓ Is there a deadline each month? Any exemptions (e.g. hardship), and who approves them?
- ❓ Who can see other members' balances (accountant + president only?).

### 8b. Choir finances ⬜

**Goal:** one clear place for all the choir's money, so the accountant's work is easier and the committee can report transparently to members.

**Money in**
- ⬜ Monthly contributions (§8a) and attendance fines (§4)
- ⬜ Concert ticket sales (§10)
- ⬜ Donations and sponsorships (Donate page)
- ⬜ Fees or gifts for services (weddings, funerals, invited events) ❓ does the choir charge?
- ⬜ Other income (sales of albums, etc.)

**Money out**
- ⬜ Expenses with category (e.g. uniforms, instruments, transport, sound/venue, concert production, charity / Acts of Love, refreshments, admin), date, amount, who paid, **receipt photo**, and optional link to an event (e.g. "iBweranganzo 2026").

**Accounts**
- ⬜ Where the money is: cash box, bank account, MoMo number ❓ (balance per account; transfers between them).

**Control and trust**
- ⬜ Expenses above a set amount need **approval** (e.g. president + accountant) before they're recorded as paid ❓ threshold.
- ⬜ Every entry and change is in the **audit log**; entries are corrected with a reversing entry, never silently deleted.
- ⬜ Monthly closing: the accountant confirms the month's totals match the real cash/bank/MoMo balances.

**Budgets**
- ⬜ A budget per event (e.g. concert): planned vs. actual income and expenses, and the final profit/loss of the event.
- 💡 A yearly budget by category.

**Reports**
- ⬜ Monthly and yearly report: income by source, expenses by category, balance per account; export to PDF/Excel for general assembly.
- ⬜ Who sees what: full finances for accountant + president (+ committee ❓); members see **summary totals** (transparency) but not other members' personal balances.

---

### 8c. Analytics and dashboards ⬜

**Choir level** (committee)
- ⬜ **Attendance:** overall % per month, trend over the year, by activity type (practice / Mass / concert), by day (Tuesday vs Friday).
- ⬜ **Sections:** attendance and size per section (soprano, alto, tenor, bass); balance between voices.
- ⬜ **Membership:** number of members over time, new candidates, admissions, people who left; candidate pass rate.
- ⬜ **Finance:** contributions collected vs. expected per month (% of members up to date), income vs. expenses, balance trend, concert results.
- ⬜ **Activity:** number of Masses, concerts, services per month/year.
- 💡 Website: visits, most-watched videos, ticket sales over time (privacy-friendly analytics).

**Section level** (section leaders)
- ⬜ Their section's attendance trend and who is at risk of falling below 70%.

**Member level**
- ⬜ A **member profile card** with: attendance % (this period and trend), activities attended, excused/late counts, contributions paid/owed, fines, join year, voice part, roles held over the years, candidate exam result.
- ⬜ **Each member sees their own** dashboard (motivating: "you attended 92% this quarter").
- ⬜ Leaders see members according to their role: section leaders see their section's attendance; the accountant sees everyone's finances; the committee sees everything.
- 💡 Recognition: "most faithful attendance" of the year (opt-in), anniversaries of joining.

**Privacy**
- ⬜ Personal analytics are **never public**; access follows roles (above) and is logged.
- ❓ What should be visible to all members (e.g. section rankings without names?).

---

### 8d. Reminders and notifications ⬜

**Goal:** automate the reminder the secretary sends by hand before every Tuesday and Friday practice, and use the same system for all choir activities.

**What gets a reminder**
- ⬜ **Practices (Tue & Fri):** a few hours before ❓ (e.g. 14:00 for an 18:00 practice).
- ⬜ **Masses** the choir sings at: the evening before (early-morning Masses especially) + a few hours before.
- ⬜ **Concerts and special events:** several days before + the day before.
- ⬜ **Cancelled or moved activity:** sent immediately.
- 💡 Monthly contribution reminder, birthday wishes, low-attendance warning (see §4, §8a).

**What the reminder says**
- Activity, date, time, place (with a map link), what to bring/wear ❓, and **the songs to practise** (from the Mass planner).
- An **"I can't come" button** that sends an excuse to the section leader (links to attendance, §4).
- Written in the member's language (EN / RW / FR).

**Channels** (from cheapest to most effort)
| Channel | Cost | Notes |
|---|---|---|
| ⬜ **Email** | Free tier is enough (e.g. Resend) | Easy first step |
| ⬜ **App notifications (web push)** | Free | Works once the site is installed as an app (PWA) on the phone; on iPhone requires adding to the Home Screen |
| ⬜ **Ready-to-send WhatsApp message** | Free | The site prepares the text each Tue/Fri; the secretary taps **"Share to WhatsApp"** and picks the choir group. Keeps today's habit, saves the typing |
| 💡 **Automatic WhatsApp** (WhatsApp Business Cloud API) | Paid per message; templates must be approved by Meta | Fully automatic, but costs money and needs a Business account |
| 💡 **SMS** (e.g. Africa's Talking) | Paid per SMS | Reaches members without smartphones/data |

**Member preferences**
- ⬜ Each member chooses channels (email / app / both) and can mute non-essential messages; **practice and cancellation reminders stay on by default**.
- ⬜ Candidates get the reminders for activities they're expected at.

**Admin / secretary**
- ⬜ Reminder times are **settings** (no code change to move 14:00 to 15:00).
- ⬜ Secretary can send a one-off announcement to everyone, a section, or candidates (see §8 announcements).
- ⬜ A log of what was sent, to whom, and whether it failed.

**How it works technically**
- A **scheduled job** (cron) runs every few minutes, finds activities that need a reminder, and sends it once (never twice). This will be our first cron job, and it runs in the deployment step (§12).

❓ Questions: what time is the reminder sent today? Does the choir prefer the free "share to WhatsApp" first, or is there budget for automatic WhatsApp/SMS?

---

## 9. Admin ⬜

- ⬜ Manage members and roles; approve accounts
- ⬜ Edit news, events, gallery, songs, history milestones, committee, press links
- ⬜ Inbox: contact messages, bookings, join applications
- ⬜ Audit log (who changed what, especially admissions and roles)
- ⬜ Data export

---

## 10. Concerts and tickets ⬜

- ⬜ Event pages with ticket types and prices (2023 example: 5,000 / 10,000 / 20,000 RWF, table of six 150,000 RWF)
- ⬜ Ticket reservation with a QR code; pay with MTN MoMo / Airtel Money (manual confirmation first, API later)
- ⬜ Check-in at the door by scanning or typing the code
- ⬜ Sales dashboard for the concert team

---

## 11. Quality and technical requirements

- ⬜ **Languages**: English first (complete), then Kinyarwanda and French
- 🚧 **Design**: white/cream backgrounds, gold accents, deep-brown text, logo accent colours used sparingly ✅
- ⬜ **Mobile-first and fast** on slow networks; installable app (PWA); offline song sheets
- ⬜ **SEO**: share previews, sitemap, structured data for events and the organisation
- ⬜ **Privacy**: consent for member data and photos, role-based access, Rwanda data-protection awareness
- ⬜ Privacy-friendly analytics
- ✅ CI: lint, typecheck, tests and build on every pull request
- ✅ Local database with Docker (Postgres 17 on port 5436)

---

## 12. Roadmap (branches)

| # | Branch | Status |
|---|---|---|
| 1 | `chore/project-setup` | ✅ |
| 2 | `chore/docker` | ✅ |
| 3 | `chore/ci` | ✅ |
| 4 | `feature/design-system` | 🚧 |
| – | `chore/git-hooks` (Husky, lint-staged, Prettier) | ⬜ |
| 5 | `feature/i18n` | ⬜ |
| 6 | `feature/public-pages` (incl. homepage committee and rehearsals) | ⬜ |
| 7 | `chore/database` (Prisma schema, migrations, seed) | ⬜ |
| 8 | `feature/music-videos-events` | ⬜ |
| 9 | `feature/auth` (roles incl. technical team, section leader, candidate) | ⬜ |
| 10 | `feature/portal-*` (attendance, candidates, Mass planner, songs, announcements) | ⬜ |
| – | `feature/flyers` (Mass, birthday and feast-day flyers) | ⬜ |
| – | `feature/contributions` (monthly contributions, fines) | ⬜ |
| – | `feature/finance` (income, expenses, accounts, budgets, reports) | ⬜ |
| – | `feature/analytics` (choir, section and member dashboards) | ⬜ |
| – | `feature/notifications` (email, app push, WhatsApp share; scheduled reminders) | ⬜ |
| 11 | `feature/admin` | ⬜ |
| 12 | `feature/tickets` | ⬜ |
| 13 | `chore/deploy` (Dockerfile, staging, production, domain) | ⬜ |

---

## 13. Open questions for the choir ❓

1. English meaning of "Ishema Ridashonga" (for the About page).
2. Exact committee titles (EN + Kinyarwanda), current names, term years, photo consent.
3. Full committee structure (areas and roles) and past committees since 2006.
4. Candidate process details (§3 questions).
5. Who belongs to the technical team, and who may take candidate attendance.
6. 1–2 past Mass flyers.
7. Contact phone/email, Mobile Money details for donations.
8. Official Instagram/TikTok/WhatsApp channel; confirm the Facebook page.
9. Who owns the christusregnat.rw domain (it currently does not resolve).
10. Details of iBweranganzo 2026: venue, guests, ticketing.
11. Attendance rules: what happens **below 50%**; fine amounts; the period; how excused/late count; which activities count (§4).
12. Contributions: monthly deadline, exemptions, who may see balances (§8a).
13. Birthday flyers: consent wording for members; the list of feast days the choir makes flyers for.
14. Reminders: what time is the practice reminder sent today; budget for automatic WhatsApp/SMS, or start with free email + app + "share to WhatsApp" (§8d).
15. Finances: where the money is kept (cash, bank, MoMo); the approval threshold for expenses; does the choir charge for weddings/funerals; who can see full finances (§8b).
16. Analytics: what all members may see vs. leaders only (§8c).

---

## How to add a feature

1. Add it to the right section above with status 💡 (idea) and one or two lines: **who** uses it and **what problem** it solves.
2. Write open questions with ❓.
3. When the choir agrees, change 💡 to ⬜ and add it to the roadmap table.
4. When work starts, create the branch and mark it 🚧; when merged, mark it ✅.

Changes to this file go through a pull request like any code (`docs/...` branch).
