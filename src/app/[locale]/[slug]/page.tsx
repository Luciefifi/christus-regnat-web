import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comingSoonPages } from "@/config/navigation";
import { site } from "@/config/site";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// One file serves every page that isn't built yet: /en/about, /rw/music, /fr/donate, ...
// A real page added later (e.g. about/page.tsx) automatically wins over this [slug] route.

function findPage(slug: string) {
  return comingSoonPages.find((page) => page.href === `/${slug}`);
}

// Prerender all placeholder pages at build time.
// Called once per locale from the layout: 12 slugs × 3 languages = 36 static pages.
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

export default async function ComingSoonPage({ params }: PageProps<"/[locale]/[slug]">) {
  const { locale, slug } = await params;
  const page = findPage(slug);
  // dynamicParams = false isn't available with Cache Components, so unknown slugs are rejected here
  if (!hasLocale(locale) || !page) notFound();
  const dict = await getDictionary(locale);
  const t = dict.comingSoon;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
            {t.eyebrow}
          </p>
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
        </div>
      </Container>
    </section>
  );
}
