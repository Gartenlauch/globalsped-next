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
      className="relative isolate overflow-hidden bg-[#003b2f] pb-28 pt-20 text-[#f7f7f2] lg:pb-32 lg:pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_10%,rgba(107,159,18,0.30),transparent_32%),radial-gradient(circle_at_86%_42%,rgba(0,59,47,0.24),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(0,40,31,0.18),transparent_42%)]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(107,159,18,0.26),transparent_30%),radial-gradient(circle_at_82%_26%,rgba(247,247,242,0.08),transparent_34%),radial-gradient(circle_at_58%_92%,rgba(0,40,31,0.92),transparent_48%),linear-gradient(135deg,#003b2f_0%,#062f28_42%,#071f1a_100%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative z-10">
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading highlight={content.titleHighlight}>
            {content.title}
          </PremiumSectionHeading>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#f7f7f2]/72">
            {content.intro}
          </p>

          <div className="mt-8">
            <PremiumCta cta={content.cta} locale={locale} />
          </div>

          <div
            className="mt-10 flex items-center gap-3"
            aria-label={content.routeSignal.ariaLabel}
          >
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.20)]">
              <span
                className={`fi fi-${content.routeSignal.originFlagCode} fis h-8 w-8 rounded-full bg-cover bg-center`}
                aria-hidden="true"
              />
              <span className="sr-only">{content.routeSignal.originLabel}</span>
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9bc43a]">
              {content.routeSignal.targetLabel}
            </span>
          </div>

          <div className="mt-7 flex max-w-md flex-wrap gap-2.5">
            {content.countries.map((country) => (
              <Link
                key={country.slug}
                href={resolveHref(country.href, locale)}
                title={country.name}
                aria-label={`Transport ${country.name}`}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/90 shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-[#9bc43a]/70 hover:bg-white hover:shadow-[0_18px_44px_rgba(0,0,0,0.28)]"
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

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] shadow-[0_34px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl lg:min-h-[520px]">
          <Image
            src={content.mapImage.src}
            alt={content.mapImage.alt}
            fill
            quality={80}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>

    </section>
  );
}