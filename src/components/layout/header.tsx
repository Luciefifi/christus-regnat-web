import Image from "next/image";
import Link from "next/link";
import { mainNav, moreNav } from "@/config/navigation";
import { site } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-200/60 bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          {/* alt="" because the visible text next to it already names the choir */}
          <Image src="/logo.png" alt="" width={40} height={40} preload />
          <span className="font-display text-xl font-semibold leading-none text-ink">{site.shortName}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted hover:bg-gold-50 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/donate" className={buttonClasses("primary", "hidden sm:inline-flex")}>
            Donate
          </Link>
          <MobileMenu items={[...mainNav, ...moreNav]} />
        </div>
      </Container>
    </header>
  );
}
