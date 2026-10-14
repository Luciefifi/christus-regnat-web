import { notFound } from "next/navigation";
import { CommitteeSection } from "@/components/home/committee-section";
import { CountdownSection } from "@/components/home/countdown-section";
import { HeroSection } from "@/components/home/hero-section";
import { PracticeSection } from "@/components/home/practice-section";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// The page only loads data and arranges sections; each section lives in its own file
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <PracticeSection locale={locale} dict={dict} />
      <CountdownSection locale={locale} dict={dict} />
      <CommitteeSection locale={locale} dict={dict} />
    </>
  );
}
