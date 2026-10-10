"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/button";

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="rounded-full p-2 hover:bg-gold-50"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-16 border-b border-gold-200 bg-white shadow-lg"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-3 font-medium hover:bg-gold-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/donate" onClick={close} className={buttonClasses("primary", "w-full")}>
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
