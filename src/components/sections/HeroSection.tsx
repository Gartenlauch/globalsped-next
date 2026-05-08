import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { LogoCube } from "@/components/ui/LogoCube";
import { de } from "@/content/de";

const routeIcons: Record<string, typeof Truck> = {
  truck: Truck,
  shield: ShieldCheck,
  globe: Globe2,
};

const trustIcons: Record<string, typeof Truck> = {
  experience: BadgeCheck,
  truck: Truck,
  customs: PackageCheck,
};

export function HeroSection() {
  const hero = de.hero;
  const marqueeItems = [...hero.destinations, ...hero.destinations];

  return (
    <section
      id="hero"
      className="relative flex min-h-[700px] items-center justify-center overflow-hidden pt-18 md:pt-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(104deg,rgba(0,30,24,0.78)_2%,rgba(0,40,31,0.68)_42%,rgba(0,52,41,0.42)_72%,rgba(0,52,41,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(163,230,53,0.16),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_76%,rgba(255,255,255,0.12),transparent_46%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_62%,rgba(0,0,0,0.14)_100%)]" />

      <div className="relative z-10 flex min-h-[680px] items-start py-10 sm:py-12 lg:min-h-[740px] lg:py-14">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1.14fr_0.86fr] lg:gap-12">
            <div className="max-w-[760px] text-white">
              <div className="mb-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-lime-300/95">
                  {hero.badge}
                </p>
              </div>

              <div className="relative max-w-[760px]">
                <div className="absolute -right-2 -top-5 hidden opacity-90 md:block lg:right-2 lg:top-0">
                  {/* A/B toggle: use "executive" or "executive-dark" */}
                  <LogoCube variant="executive-dark" />
                </div>
                <h1 className="text-[18px] font-extrabold uppercase leading-[1.08] tracking-[-0.02em] text-balance sm:text-[26px] md:pr-24 md:text-[34px] xl:text-[44px]">
                  <span className="block drop-shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
                    {hero.headline.line1}
                  </span>
                  <span className="block bg-gradient-to-r from-lime-200 via-lime-300 to-lime-400 bg-clip-text text-transparent">
                    {hero.headline.highlight}
                  </span>
                  <span className="block drop-shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
                    {hero.headline.line2}
                  </span>
                </h1>
              </div>

              <p className="mt-6 max-w-[660px] text-[15px] leading-7 text-white/85 sm:text-base md:text-[17px] md:leading-8">
                {hero.subline}
              </p>


              <div className="mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href={hero.ctaPrimary.href}
                  className="inline-flex items-center gap-2 rounded-full bg-lime-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_16px_40px_rgba(132,180,0,0.32)] transition duration-300 ease-out hover:bg-lime-400 hover:shadow-[0_20px_46px_rgba(132,180,0,0.38)] sm:px-7 sm:py-4 sm:text-sm"
                >
                  {hero.ctaPrimary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={hero.ctaSecondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/[0.04] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.07em] text-white/92 backdrop-blur-md transition duration-300 ease-out hover:border-white/60 hover:bg-white/12 hover:text-white sm:px-7 sm:py-4 sm:text-sm"
                >
                  {hero.ctaSecondary.label}
                </Link>
              </div>

              <div className="mt-8 max-w-[690px] overflow-hidden rounded-full border border-white/18 bg-white/[0.07] px-4 py-2.5 backdrop-blur-md">
                <div className="marquee-track flex w-max whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.08em] text-white/82 sm:text-xs">
                  {marqueeItems.map((item, index) => (
                    <span key={`${item}-${index}`} className="mr-8">
                      {index === 0 && (
                        <span className="mr-5 text-lime-300">
                          {hero.destinationsLabel}:
                        </span>
                      )}
                      • {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="relative ml-auto max-w-[500px] rounded-[28px] border border-white/18 bg-white/[0.08] p-4 shadow-[0_26px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-lime-300/16 blur-3xl" />

                <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-[rgba(0,40,31,0.82)] p-6">
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-lime-300/9 blur-3xl" />

                  <p className="relative text-[10px] font-extrabold uppercase tracking-[0.24em] text-lime-300/95">
                    {hero.routeCard.kicker}
                  </p>

                  <h2 className="relative mt-4 text-[28px] font-bold leading-[1.14] tracking-[-0.01em] text-white">
                    {hero.routeCard.title}
                  </h2>

                  <p className="relative mt-4 max-w-[390px] text-sm leading-7 text-white/74">
                    {hero.routeCard.text}
                  </p>

                  <div className="relative mt-6 space-y-2.5">
                    {hero.routeCard.routes.map((route) => (
                      <div
                        key={route}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.055] px-4 py-2.5 transition duration-300 ease-out hover:bg-white/[0.09]"
                      >
                        <span className="text-sm font-semibold text-white/90">
                          {route}
                        </span>
                        <ArrowRight className="h-4 w-4 text-lime-300" />
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6 grid grid-cols-3 gap-2.5">
                    {hero.routeCard.highlights.map((item) => {
                      const Icon = routeIcons[item.icon] || Globe2;

                      return (
                        <div
                          key={item.label}
                          className="rounded-xl border border-white/10 bg-white/[0.07] p-3 text-center"
                        >
                          <Icon className="mx-auto h-5 w-5 text-lime-300" />
                          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white/80">
                            {item.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-3">
            {hero.trustItems.map((item) => {
              const Icon = trustIcons[item.icon] || PackageCheck;

              return (
                <article
                  key={item.label}
                  className="flex gap-4 rounded-2xl border border-white/15 bg-white/[0.075] p-4 shadow-[0_14px_38px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-300 ease-out hover:bg-white/[0.1]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/14 text-lime-300 ring-1 ring-lime-300/25">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-lg font-extrabold uppercase tracking-[0.05em] text-lime-300">
                      {item.value}
                    </p>
                    <h3 className="mt-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-white/74">
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