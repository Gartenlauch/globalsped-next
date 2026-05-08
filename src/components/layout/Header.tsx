"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getContent } from "@/content";
import { Menu, X } from "lucide-react";



type Props = {
  locale: string;
};

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = getContent(locale).header;


  const resolveHref = (href: string) => href.replace("{locale}", locale);
  const isHome = pathname === `/${locale}`;


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  const navLinks = [
    { label: "Start", href: `/${locale}` },
    { label: "Destinationen", href: `/${locale}#destinationen` },
    { label: "Leistungen", href: `/${locale}#leistungen` },
    { label: "Zollabwicklung", href: `/${locale}#zollabwicklung` },
    { label: "Über uns", href: `/${locale}#ueber-uns` },
    { label: "Kontakt", href: `/${locale}#kontakt` },
    { label: "FAQ", href: `/${locale}/faq` },
  ];

  return (
    <header
      className={`fixed left-0 top-0 z-[10000] w-full transition-all duration-300 ${isTransparent
        ? "bg-transparent text-white"
        : "bg-white/95 text-[var(--color-global-dark)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Link
          href={`/${locale}`}
          className={`logo-text text-[26px] font-black uppercase tracking-[0.08em] transition ${isTransparent
            ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
            : "text-[var(--color-global-green)]"
            }`}
        >
          {t.logoLabel}
        </Link>
        {/*Desktop Navigation*/}
        <nav className="nav-text hidden items-center gap-7 text-sm font-extrabold uppercase tracking-wide lg:flex">
          {t.nav.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              onClick={() => setIsScrolled(true)}
              className={`transition hover:text-lime-400 ${isTransparent ? "text-white" : "text-[var(--color-global-dark)]"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <Link href={resolveHref(t.cta.href)} className="btn-primary">
            {t.cta.label}
          </Link>
        </nav>
        {/*mobile Button*/}
        <button
          type="button"
          aria-label={mobileOpen ? t.menuCloseLabel : t.menuOpenLabel}
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setMobileOpen((value) => !value);
          }}
          className={`relative z-[10000] flex h-12 w-12 touch-manipulation items-center justify-center rounded-2xl border transition-all duration-300 lg:hidden ${isTransparent && !mobileOpen
            ? "border-white/25 text-white"
            : "border-black/10 bg-white text-[var(--color-global-dark)] shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            }`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/*mobile Navigation*/}
      {mobileOpen && (
        <div
          className={`fixed left-0 right-0 top-[80px] z-[9999] overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${mobileOpen
              ? "max-h-[calc(100vh-80px)] opacity-100"
              : "max-h-0 opacity-0"
            }`}
        >
          <nav className="container flex flex-col py-6">
            {t.nav.map((link, index) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={() => {
                  setMobileOpen(false);
                  setIsScrolled(true);
                }}
                className={`border-b border-black/5 py-4 text-base font-black uppercase tracking-wide text-[var(--color-global-dark)] transition-all duration-500 ${mobileOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 45}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={resolveHref(t.cta.href)}
              onClick={() => {
                setMobileOpen(false);
                setIsScrolled(true);
              }}
              className={`btn-primary mt-6 text-center transition-all duration-500 ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
            >
              {t.cta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}