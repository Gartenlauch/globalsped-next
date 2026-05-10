import Link from "next/link";
import { Truck, Globe2, ShieldCheck } from "lucide-react";
import { LogoCube } from "@/components/ui/LogoCube";
import { getContent } from "@/content";

const featureIcons = [Globe2, Truck, ShieldCheck];

export function HeroSection({ locale = "de" }) {
  const t = getContent(locale);
  const marqueeItems = [...t.hero.destinations, ...t.hero.destinations];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-28 text-white md:pt-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,40,31,0.72)_0%,rgba(0,40,31,0.58)_45%,rgba(0,40,31,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(163,230,53,0.16),transparent_30%)]" />

      <div className="container relative z-10 flex min-h-[calc(100svh-7rem)] items-center justify-center pb-14">
        <div className="mx-auto w-full max-w-[1120px] text-center">
          <div className="mb-5 flex justify-center md:mb-6">
            <div className="scale-75 md:scale-100">
              <LogoCube />
            </div>
          </div>

          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.22em] text-lime-300 sm:text-xs md:tracking-[0.30em]">
            {t.hero.badge}
          </p>

          <h1 className="mx-auto max-w-[980px] text-[34px] font-black uppercase leading-[0.98] tracking-[-0.04em] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            {t.hero.headline.line1}
            <span className="block text-lime-300">
              {t.hero.headline.highlight}
            </span>
            <span className="block">{t.hero.headline.line2}</span>
          </h1>

          <div className="mx-auto mt-5 max-w-[100vw] overflow-hidden md:mt-6">
            <div className="marquee-track flex w-max whitespace-nowrap text-xs font-black uppercase tracking-wide text-white/88 sm:text-sm">
              {marqueeItems.map((item, index) => (
                <span key={`${item}-${index}`} className="mr-7 inline-flex items-center gap-2">
                  {index === 0 && (
                    <span className="inline-flex items-center gap-2 text-lime-300">
                      <Truck size={16} />
                      {t.hero.destinationsLabel}:
                    </span>
                  )}
                  <span>• {item}</span>
                </span>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-[760px] text-base leading-7 text-white/88 sm:text-lg md:leading-8">
            {t.hero.subline}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={t.hero.ctaPrimary.href} className="btn-primary w-full justify-center sm:w-auto">
              {t.hero.ctaPrimary.label}
            </Link>

            <Link
              href={t.hero.ctaSecondary.href}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/35 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[var(--color-global-dark)] sm:w-auto"
            >
              {t.hero.ctaSecondary.label}
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-[980px] gap-4 sm:grid-cols-3">
            {t.hero.trustItems.map((item, index) => {
              const Icon = featureIcons[index] ?? ShieldCheck;

              return (
                <article
                  key={item.label}
                  className="flex items-start gap-4 rounded-3xl border border-white/15 bg-[rgba(0,40,31,0.58)] p-4 text-left shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300">
                    <Icon size={22} />
                  </div>

                  <div>
                    <div className="text-lg font-black uppercase text-lime-300">
                      {item.value}
                    </div>
                    <h3 className="mt-1 text-sm font-black uppercase text-white">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/76">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}