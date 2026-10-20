import Image from "next/image";
import Link from "next/link";
import { mainNav, moreNav, type NavLink } from "@/config/navigation";
import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // Turn config links (key + path) into ready-to-render links (label + localized path)
  const toItem = (link: NavLink) => ({
    href: localePath(locale, link.href),
    label: dict.nav[link.key],
  });

  return (
    <header className="sticky top-0 z-40 border-b border-gold-200/60 bg-white">
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4">
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* alt="" because the visible text next to it already names the choir */}
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            preload
            className="size-9 sm:size-10"
          />
          <span className="font-display text-lg leading-none font-semibold whitespace-nowrap text-ink sm:text-xl">
            {site.shortName}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map(toItem).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted hover:bg-gold-50 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher current={locale} label={dict.common.language} />
          <Link
            href={localePath(locale, "/donate")}
            // max-sm:hidden (not "hidden"), because the button's own inline-flex would override "hidden"
            className={buttonClasses("primary", "max-sm:hidden")}
          >
            {dict.common.donate}
          </Link>
          <MobileMenu
            items={[...mainNav, ...moreNav].map(toItem)}
            labels={{
              open: dict.common.openMenu,
              close: dict.common.closeMenu,
              donate: dict.common.donate,
            }}
            donateHref={localePath(locale, "/donate")}
          />
        </div>
      </Container>
    </header>
  );
}
