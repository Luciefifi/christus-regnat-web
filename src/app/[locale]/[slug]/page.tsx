import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { comingSoonPages } from "@/config/navigation";
import { site } from "@/config/site";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// One file serves every page that isn't built yet: /en/about, /rw/music, /fr/donate, ...
// A real page added later (e.g. about/page.tsx) automatically wins over this [slug] route.

type Params = PageProps<"/[locale]/[slug]">["params"];

function findPage(slug: string) {
  return comingSoonPages.find((page) => page.href === `/${slug}`);
}

// Prerender all placeholder pages at build time.
// Called once per locale from the layout: slugs × 3 languages.
export async function generateStaticParams() {
  return comingSoonPages.map((page) => ({ slug: page.href.slice(1) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = findPage(slug);
  if (!hasLocale(locale) || !page) notFound();
  const dict = await getDictionary(locale);

  return { title: dict.nav[page.key] };
}

// Not async: the frame below doesn't need the URL, so Next.js can show it instantly
// on navigation (the "App Shell") while the slug-specific content streams in.
export default function ComingSoonPage({ params }: PageProps<"/[locale]/[slug]">) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Suspense fallback={<ComingSoonSkeleton />}>
            <ComingSoonContent params={params} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

// Everything that depends on the URL (which page, which language) lives inside <Suspense>
async function ComingSoonContent({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const page = findPage(slug);
  // dynamicParams = false isn't available with Cache Components, so unknown slugs are rejected here
  if (!hasLocale(locale) || !page) notFound();
  const dict = await getDictionary(locale);
  const t = dict.comingSoon;

  return (
    <>
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">{t.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.nav[page.key]}</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t.text}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={localePath(locale, "/")} className={buttonClasses()}>
          {t.backHome}
        </Link>
        <a
          href={site.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary")}
        >
          {t.follow}
        </a>
      </div>
    </>
  );
}

// Same shape as the real content, so nothing jumps when the text arrives
function ComingSoonSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="mx-auto h-3 w-24 rounded-full bg-gold-100" />
      <div className="mx-auto mt-4 h-10 w-64 rounded-full bg-gold-100" />
      <div className="mx-auto mt-6 h-4 w-full max-w-md rounded-full bg-gold-50" />
      <div className="mx-auto mt-2 h-4 w-3/4 max-w-sm rounded-full bg-gold-50" />
    </div>
  );
}
