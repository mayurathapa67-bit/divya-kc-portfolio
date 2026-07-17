"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const FALLBACK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const LOGO = "Divya KC";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = FALLBACK_LINKS;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="section-pad mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="font-playfair text-2xl font-semibold tracking-tight text-charcoal"
        >
          {LOGO}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {Array.isArray(links) &&
            links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors",
                      active ? "text-charcoal" : "text-charcoal/60 hover:text-charcoal"
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-coral via-gold to-purple" />
                    )}
                  </Link>
                </li>
              );
            })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold md:inline-block"
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-charcoal/10 bg-white/60 md:hidden"
          >
            <span
              className={cn(
                "h-0.5 w-5 bg-charcoal transition-transform",
                open && "translate-y-2 rotate-45"
              )}
            />
            <span className={cn("h-0.5 w-5 bg-charcoal transition-opacity", open && "opacity-0")} />
            <span
              className={cn(
                "h-0.5 w-5 bg-charcoal transition-transform",
                open && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="section-pad flex flex-col gap-1 pb-6 pt-2">
          {Array.isArray(links) &&
            links.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                      active ? "bg-charcoal/5 text-charcoal" : "text-charcoal/70"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full btn-gradient px-4 py-3 text-center text-base font-semibold"
            >
              Let&apos;s Talk
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
