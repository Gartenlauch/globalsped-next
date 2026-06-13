import Link from "next/link";
import { ArrowRight, Globe2, MapPin, Route } from "lucide-react";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { resolveHref } from "../helpers/resolveHref";

type Props = {
  content: PremiumHomeContent["destinations"];
  locale: string;
};

const routePoints = [
  { left: "18%", top: "45%" },
  { left: "34%", top: "37%" },
  { left: "51%", top: "43%" },
  { left: "66%", top: "35%" },
  { left: "78%", top: "52%" },
  { left: "58%", top: "63%" },
];

export function PremiumDestinationsSection({ content, locale }: Props) {
  const featuredCountries = content.countries.slice(0, 6);

  return (
    <section
      id={content.id}
      className="relative overflow-hidden bg-[#f7f7f2] py-20 text-[#00281f] lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(107,159,18,0.13),transparent_32%),radial-gradient(circle_at_84%_50%,rgba(0,59,47,0.08),transparent_38%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <PremiumEyebrow variant="light">{content.eyebrow}</PremiumEyebrow>

          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#00281f]/72">
            {content.intro}
          </p>

          <div className="mt-8">
            <PremiumCta cta={content.cta} locale={locale} variant="dark" />
          </div>

          <div className="mt-12 flex items-end gap-3">
            <span className="text-6xl font-semibold tracking-[-0.06em] text-[#6b9f12]">
              {content.statValue}
            </span>
            <span className="pb-3 text-sm font-semibold text-[#00281f]/70">
              {content.statLabel}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {content.countries.map((country) => (
              <Link
                key={country.slug}
                href={resolveHref(country.href, locale)}
                title={country.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00281f]/10 bg-white text-xl shadow-sm transition hover:-translate-y-0.5 hover:border-[#6b9f12]/45 hover:shadow-md"
              >
                <span aria-hidden="true">{country.flag}</span>
                <span className="sr-only">{country.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-[#00281f]/10 bg-white shadow-[0_30px_90px_rgba(0,40,31,0.13)] lg:min-h-[560px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,159,18,0.18),transparent_35%),linear-gradient(135deg,#ffffff_0%,#f7f7f2_46%,#eaf0df_100%)]" />

          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(0,40,31,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,40,31,0.25)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#6b9f12]/30 bg-[#00281f] text-[#9bc43a] shadow-[0_20px_70px_rgba(0,40,31,0.35)]">
            <Globe2 className="h-10 w-10" aria-hidden="true" />
          </div>

          {routePoints.map((point, index) => (
            <span
              key={`${point.left}-${point.top}`}
              className="absolute h-3 w-3 rounded-full bg-[#6b9f12] shadow-[0_0_0_8px_rgba(107,159,18,0.14)]"
              style={{
                left: point.left,
                top: point.top,
                opacity: 1 - index * 0.08,
              }}
            />
          ))}

          <div className="absolute left-[18%] top-[45%] h-px w-[64%] origin-left rotate-[-8deg] bg-gradient-to-r from-[#6b9f12]/10 via-[#6b9f12]/70 to-[#6b9f12]/10" />
          <div className="absolute left-[28%] top-[62%] h-px w-[45%] origin-left rotate-[-24deg] bg-gradient-to-r from-[#6b9f12]/10 via-[#6b9f12]/55 to-[#6b9f12]/10" />
          <div className="absolute left-[34%] top-[33%] h-px w-[48%] origin-left rotate-[18deg] bg-gradient-to-r from-[#6b9f12]/10 via-[#6b9f12]/55 to-[#6b9f12]/10" />

          <div className="absolute left-6 top-6 rounded-2xl border border-[#00281f]/10 bg-white/85 p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6b9f12]/12 text-[#6b9f12]">
                <Route className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#00281f]">
                  {content.statValue} {content.statLabel}
                </p>
                <p className="mt-1 text-xs text-[#00281f]/58">
                  {content.eyebrow}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link
                key={country.slug}
                href={resolveHref(country.href, locale)}
                className="group flex items-center gap-3 rounded-2xl border border-[#00281f]/10 bg-white/88 p-3 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#6b9f12]/35 hover:shadow-md"
              >
                <span className="text-xl" aria-hidden="true">
                  {country.flag}
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold text-[#00281f]">
                  {country.name}
                </span>
                <ArrowRight className="h-4 w-4 text-[#6b9f12] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          <div className="absolute right-6 top-6 hidden rounded-2xl border border-[#00281f]/10 bg-white/80 p-4 shadow-lg backdrop-blur-md sm:block">
            <MapPin className="h-6 w-6 text-[#6b9f12]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}