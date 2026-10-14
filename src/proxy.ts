import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, LOCALE_COOKIE, localePath } from "@/i18n/config";
import { pickLocale } from "@/i18n/negotiate";

// Runs before every matched request. If the URL has no language prefix (/about),
// redirect to the visitor's best language (/rw/about).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (hasLocale(firstSegment)) return; // already /en/..., /rw/... or /fr/...: continue normally

  const locale = pickLocale(
    request.headers.get("accept-language"),
    request.cookies.get(LOCALE_COOKIE)?.value,
  );

  const url = request.nextUrl.clone();
  url.pathname = localePath(locale, pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, API routes and files with an extension (logo.png, icon.png, ...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
