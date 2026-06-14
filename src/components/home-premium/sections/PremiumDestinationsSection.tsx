import Image from "next/image";
import Link from "next/link";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { resolveHref } from "../helpers/resolveHref";
import { PremiumSectionHeading } from "../ui/PremiumSectionHeading";

type Props = {
  content: PremiumHomeContent["destinations"];
  locale: string;
};

export function PremiumDestinationsSection({ content, locale }: Props) {
  return (
    <section
      id={content.id}
      className="relative isolate overflow-hidden bg-[#f7f7f2] pb-28 pt-20 text-[#00281f] lg:pb-32 lg:pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(107,159,18,0.12),transparent_30%),radial-gradient(circle_at_82%_48%,rgba(107,159,18,0.10),transparent_36%),linear-gradient(180deg,#fffef8_0%,#f7f7f2_58%,#eff3e8_100%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6b9f12]/55 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative z-10">
          <PremiumEyebrow variant="light">{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading variant="light" className="max-w-xl">
            {content.title}
          </PremiumSectionHeading>

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

          <div className="mt-6 flex max-w-md flex-wrap gap-2">
            {content.countries.map((country) => (
              <Link
                key={country.slug}
                href={resolveHref(country.href, locale)}
                title={country.name}
                aria-label={`Transport ${country.name}`}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#00281f]/10 bg-white shadow-[0_10px_28px_rgba(0,40,31,0.10)] transition duration-300 hover:-translate-y-0.5 hover:border-[#6b9f12]/55 hover:shadow-[0_14px_34px_rgba(0,40,31,0.16)]"
              >
                <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full">
                  <span
                    className={`fi fi-${country.flagCode} fis h-full w-full rounded-full bg-cover bg-center`}
                    aria-hidden="true"
                  />
                </span>

                <span className="sr-only">{country.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#00281f]/8 bg-white/70 shadow-[0_34px_90px_rgba(0,40,31,0.12)] backdrop-blur-xl lg:min-h-[520px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_48%,rgba(107,159,18,0.18),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(247,247,242,0.86)_100%)]" />

          <Image
            src={content.mapImage.src}
            alt={content.mapImage.alt}
            fill
            quality={75}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-contain p-7 opacity-95 sm:p-10 lg:p-12"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_48%,rgba(107,159,18,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0)_70%,rgba(247,247,242,0.65)_100%)]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/20 shadow-[0_0_80px_rgba(107,159,18,0.18)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-[linear-gradient(90deg,#00281f_0%,#003b2f_42%,#6b9f12_50%,#003b2f_58%,#00281f_100%)]" />
      <div className="pointer-events-none absolute bottom-10 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#6b9f12]/60 to-transparent" />
    </section>
  );
}