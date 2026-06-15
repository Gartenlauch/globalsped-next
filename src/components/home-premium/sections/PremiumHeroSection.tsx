import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PremiumHomeContent, PremiumStat } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { PremiumGlassCard } from "../ui/PremiumGlassCard";
import { resolveHref } from "../helpers/resolveHref";

type Props = {
  content: PremiumHomeContent["hero"];
  locale: string;
};

type HeroStatCardProps = {
  item: PremiumStat;
  locale: string;
};

function HeroStatCard({ item, locale }: HeroStatCardProps) {
  return (
    <Link href={resolveHref(item.href, locale)} className="group block">
      <PremiumGlassCard
        padding="compact"
        className="flex h-full min-h-[165px] flex-col justify-between border-white/18 bg-white/[0.095] shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-300 group-hover:-translate-y-1 group-hover:border-[#9bc43a]/45 group-hover:bg-white/[0.13]"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9fca42]">
            {item.eyebrow}
          </p>

          <h2 className="mt-4 text-lg font-semibold leading-tight tracking-[-0.03em] text-white">
            {item.title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#f7f7f2]/70">
            {item.text}
          </p>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9fca42]">
          {item.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </span>
      </PremiumGlassCard>
    </Link>
  );
}

function HeroRouteCard({
  content,
  locale,
}: {
  content: PremiumHomeContent["hero"]["routeCard"];
  locale: string;
}) {
  return (
    <Link href={resolveHref(content.href, locale)} className="group block h-full">
      <PremiumGlassCard
        padding="compact"
        className="flex h-full min-h-[165px] flex-col justify-between border-white/18 bg-white/[0.095] shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-300 group-hover:-translate-y-1 group-hover:border-[#9bc43a]/45 group-hover:bg-white/[0.13]"
      >
        <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

        <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
          {content.title}
        </h2>

        <p className="mt-4 flex-1 text-sm leading-6 text-[#f7f7f2]/70">
          {content.text}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9bc43a]">
          {content.ctaLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </PremiumGlassCard>
    </Link>
  );
}

function HeroBackground({
  image,
}: {
  image: PremiumHomeContent["hero"]["image"];
}) {
  return (
    <>
      <picture className="absolute inset-0 block">
        {image.mobileSrc ? (
          <source
            media="(max-width: 767.98px)"
            srcSet={image.mobileSrc}
          />
        ) : null}

        <source
          media="(min-width: 768px)"
          srcSet={image.src}
        />

        <img
          src={image.src}
          alt={image.alt}
          width={image.width ?? 1665}
          height={image.height ?? 928}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-[58%_50%] md:object-[66%_50%]"
        />
      </picture>

      <div className="absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(180deg,rgba(0,40,31,0.72)_0%,rgba(0,40,31,0.46)_36%,rgba(0,40,31,0.18)_68%,rgba(0,40,31,0)_100%)] md:hidden" />
      <div className="absolute inset-y-0 left-0 w-[82%] bg-[linear-gradient(90deg,rgba(0,40,31,0.46)_0%,rgba(0,40,31,0.20)_58%,rgba(0,40,31,0)_100%)] md:hidden" />
    </>
  );
}

export function PremiumHeroSection({ content, locale }: Props) {
  return (
    <section className="relative min-h-[660px] overflow-hidden border-b border-[#6b9f12]/25 lg:min-h-[700px]">
      <HeroBackground image={content.image} />

      <div className="container relative flex min-h-[660px] flex-col justify-center py-20 lg:min-h-[700px]">
        <div className="max-w-3xl pt-[14px]">
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <h1 className="max-w-[620px] text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[50px] lg:text-[52px]">
            {content.headline.line1}{" "}
            <span className="text-[#9bc43a]">{content.headline.highlight}</span>{" "}
            {content.headline.line2}
          </h1>

          <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-[#f7f7f2]/84">
            {content.intro}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <PremiumCta cta={content.primaryCta} locale={locale} />
            <PremiumCta cta={content.secondaryCta} locale={locale} variant="secondary" />
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((item) => (
            <HeroStatCard key={item.href} item={item} locale={locale} />
          ))}

          <HeroRouteCard content={content.routeCard} locale={locale} />
        </div>
      </div>
    </section>
  );
}