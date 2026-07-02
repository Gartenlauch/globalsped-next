"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getAlternatePathsForPath,
  type SeoLocale,
} from "@/content/metadata/alternates";

type LanguageSwitcherVariant = "dark" | "light";

type Props = {
  variant?: LanguageSwitcherVariant;
};

const languages: { locale: SeoLocale; label: string; name: string }[] = [
  { locale: "de", label: "DE", name: "Deutsch" },
  { locale: "en", label: "EN", name: "English" },
];

function getActiveLocale(pathname: string): SeoLocale | undefined {
  const [, locale] = pathname.split("/");

  return languages.some((language) => language.locale === locale)
    ? (locale as SeoLocale)
    : undefined;
}

export function LanguageSwitcher({ variant = "dark" }: Props) {
  const pathname = usePathname();
  const alternatePaths = getAlternatePathsForPath(pathname);
  const activeLocale = getActiveLocale(pathname);
  const isLight = variant === "light";

  return (
    <nav
      aria-label="Sprachauswahl"
      className={`inline-flex items-center rounded-full border p-1 ${
        isLight
          ? "border-[var(--color-global-green)]/15 bg-[var(--color-global-green)]/5"
          : "border-white/20 bg-white/10"
      }`}
    >
      {languages.map((language) => {
        const isActive = activeLocale === language.locale;
        const href =
          alternatePaths?.[language.locale] ??
          (isActive ? pathname : `/${language.locale}`);

        return (
          <Link
            key={language.locale}
            href={href}
            aria-label={`${language.name} ${
              isActive ? "ist aktiv" : "auswaehlen"
            }`}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wide transition ${
              isActive
                ? "bg-lime-400 text-[var(--color-global-dark)] shadow-[0_0_14px_rgba(163,230,53,0.28)]"
                : isLight
                  ? "text-[var(--color-global-green)] hover:bg-[var(--color-global-green)]/10"
                  : "text-white hover:bg-white/10 hover:text-lime-300"
            }`}
          >
            {language.label}
          </Link>
        );
      })}
    </nav>
  );
}
