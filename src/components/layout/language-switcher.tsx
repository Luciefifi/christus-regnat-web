"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/i18n/config";

// Remembers the choice for a year, so the proxy sends returning visitors to their language
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname(); // e.g. "/rw/about"
  const rest = pathname.split("/").slice(2).join("/"); // "about"

  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-full bg-gold-50 p-1 ring-1 ring-gold-200">
        {locales.map((locale) => {
          const isCurrent = locale === current;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}${rest ? `/${rest}` : ""}`}
                hrefLang={locale}
                lang={locale}
                title={localeNames[locale]}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => rememberLocale(locale)}
                className={`block rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                  isCurrent ? "bg-white text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                }`}
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
