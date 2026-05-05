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

const routeIcons = {
  truck: Truck,
  shield: ShieldCheck,
  globe: Globe2,
};

const trustIcons = {
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
      className="relative min-h-[690px] overflow-hidden bg-[var(--color-global-deep)] lg:min-h-[720px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,40,31,0.88)_0%,rgba(0,59,47,0.65)_45%,rgba(0,59,47,0.18)_100%)] opacity-60" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute left-[8%] top-[16%] h-72 w-72 rounded-full bg-lime-300/18 blur-[120px] " />
      <div className="absolute right-[12%] top-[28%] h-96 w-96 rounded-full bg-white/8 blur-[140px]" />

      <div className="relative z-10 flex min-h-[690px] items-center py-20 lg:min-h-[720px] lg:py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-[780px] text-white">
              <div className="mb-7 flex items-center gap-4">
                <LogoCube />
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-lime-300">
                  {hero.badge}
                </p>
              </div>

              <h1 className="max-w-[760px] text-[28px] font-black uppercase leading-[1.08] tracking-tight sm:text-[36px] md:text-[44px] xl:text-[50px]">
                <span className="block">{hero.headline.line1}</span>
                <span className="block text-lime-300">
                  {hero.headline.highlight}
                </span>
                <span className="block">{hero.headline.line2}</span>
              </h1>

              <p className="mt-6 max-w-[650px] text-base leading-8 text-white/86 md:text-lg">
                {hero.subline}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={hero.ctaPrimary.href}
                  className="inline-flex items-center gap-2 rounded-full bg-lime-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(132,180,0,0.35)] transition hover:-translate-y-0.5 hover:bg-lime-400"
                >
                  {hero.ctaPrimary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={hero.ctaSecondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.03] px-7 py-4 text-sm font-black uppercase tracking-wide text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-global-dark)]"
                >
                  {hero.ctaSecondary.label}
                </Link>
              </div>

              <div className="mt-8 max-w-[680px] overflow-hidden rounded-full border border-white/14 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md">
                <div className="marquee-track flex w-max whitespace-nowrap text-xs font-black uppercase tracking-wide text-white/82">
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
              <div className="relative ml-auto max-w-[520px] rounded-[30px] border border-white/14 bg-white/[0.07] p-4 shadow-[0_35px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-lime-300/20 blur-3xl" />
                <div className="absolute -bottom-10 left-12 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

                <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-[rgba(0,40,31,0.84)] p-7">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />

                  <p className="relative text-[11px] font-black uppercase tracking-[0.32em] text-lime-300">
                    {hero.routeCard.kicker}
                  </p>

                  <h2 className="relative mt-5 text-2xl font-black uppercase leading-tight text-white">
                    {hero.routeCard.title}
                  </h2>

                  <p className="relative mt-5 max-w-[390px] text-sm leading-7 text-white/70">
                    {hero.routeCard.text}
                  </p>

                  <div className="relative mt-7 space-y-3">
                    {hero.routeCard.routes.map((route) => (
                      <div
                        key={route}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 transition hover:bg-white/[0.09]"
                      >
                        <span className="text-sm font-bold text-white/88">
                          {route}
                        </span>
                        <ArrowRight className="h-4 w-4 text-lime-300" />
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-7 grid grid-cols-3 gap-3">
                    {hero.routeCard.highlights.map((item) => {
                      const Icon = routeIcons[item.icon] || Globe2;

                      return (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-center"
                        >
                          <Icon className="mx-auto h-5 w-5 text-lime-300" />
                          <p className="mt-2 text-xs font-black uppercase text-white/78">
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

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {hero.trustItems.map((item) => {
              const Icon = trustIcons[item.icon] || PackageCheck;

              return (
                <article
                  key={item.label}
                  className="flex gap-4 rounded-2xl border border-white/12 bg-white/[0.065] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/[0.1]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/14 text-lime-300 ring-1 ring-lime-300/25">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-lg font-black uppercase text-lime-300">
                      {item.value}
                    </p>
                    <h3 className="mt-1 text-xs font-black uppercase tracking-wide text-white">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-white/72">
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