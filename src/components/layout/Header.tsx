"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getContent } from "@/content";
import { Menu, X } from "lucide-react";

type Props = {
  locale: string;
};

export function Header({ locale }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(`/${locale}`);
  const [isOpen, setIsOpen] = useState(false);

  const t = getContent(locale).header;

  const resolveHref = (href: string) => href.replace("{locale}", locale);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link sync
  useEffect(() => {
    const updateActiveHref = () => {
      setActiveHref(`${window.location.pathname}${window.location.hash}`);
    };

    updateActiveHref();

    window.addEventListener("hashchange", updateActiveHref);
    window.addEventListener("popstate", updateActiveHref);

    return () => {
      window.removeEventListener("hashchange", updateActiveHref);
      window.removeEventListener("popstate", updateActiveHref);
    };
  }, []);

  const isActiveLink = (href: string) => activeHref === resolveHref(href);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setIsOpen(false); // ✅ Menü zuverlässig schließen
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[99999] w-full text-white backdrop-blur-xl transition-all duration-300 ${isScrolled
        ? "bg-[linear-gradient(90deg,rgba(0,40,31,0.96)_0%,rgba(0,78,66,0.88)_50%,rgba(0,40,31,0.96)_100%)] shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        : "bg-[linear-gradient(90deg,rgba(0,40,31,0.84)_0%,rgba(0,78,66,0.62)_50%,rgba(0,40,31,0.84)_100%)]"
        }`}
    >
      <div className="container flex items-center justify-between py-4 pr-16 lg:pr-0">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          onClick={() => handleNavClick(`/${locale}`)}
          className="logo-text text-[26px] font-black uppercase tracking-[0.08em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition"
        >
          {t.logoLabel}
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-text hidden items-center gap-6 text-sm font-extrabold uppercase tracking-wide lg:flex">
          {t.nav.map((link) => {
            const href = resolveHref(link.href);
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => handleNavClick(href)}
                className={`relative px-1 py-2 transition-all duration-300 ${active
                  ? "text-lime-400"
                  : "text-white hover:text-lime-300"
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.45)] transition-all duration-300 ${active ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                />
              </Link>
            );
          })}

          <Link href={resolveHref(t.cta.href)} className="btn-primary">
            {t.cta.label}
          </Link>
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onTouchStart={()=>setIsOpen((prev) => !prev )}

        className="absolute right-4 top-1/2 z-[100000] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 right-0 top-[76px] z-[99998] bg-white text-[var(--color-global-dark)] shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden overflow-hidden ${isOpen
            ? "max-h-[calc(100vh-76px)] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >

        <nav className="container flex flex-col py-6">
          {t.nav.map((link) => {
            const href = resolveHref(link.href);
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => handleNavClick(href)}
                className={`relative rounded-2xl px-5 py-4 text-base font-black uppercase tracking-wide transition-all duration-300 ${active
                  ? "bg-lime-300/15 text-[var(--color-global-green)]"
                  : "text-[var(--color-global-dark)] hover:bg-black/5"
                  }`}
              >
                {link.label}

                {active && (
                  <span className="absolute bottom-3 left-0 top-3 w-[4px] rounded-full bg-[var(--color-global-green)] shadow-[0_0_10px_rgba(101,163,13,0.35)]" />
                )}
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href={resolveHref(t.cta.href)}
            onClick={() => handleNavClick(resolveHref(t.cta.href))}
            className="btn-primary mt-6 text-center"
          >
            {t.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}