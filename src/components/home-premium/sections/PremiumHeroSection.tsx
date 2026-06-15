import { getImageProps } from "next/image";
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
      <PremiumGlassCard className="flex h-full min-h-[165px] flex-col justify-between p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-[#6b9f12]/45">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9fca42]">
            {item.eyebrow}
          </p>

          <h2 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.03em] text-white">
            {item.title}
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#f7f7f2]/70">
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
      <PremiumGlassCard className="flex h-full min-h-[220px] flex-col transition duration-300 group-hover:-translate-y-1 group-hover:border-[#6b9f12]/45">
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
  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({
    src: image.src,
    alt: image.alt,
    width: image.width ?? 2880,
    height: image.height ?? 1320,
    quality: 80,
    sizes: "100vw",
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    src: image.mobileSrc ?? image.src,
    alt: image.alt,
    width: image.mobileWidth ?? 1200,
    height: image.mobileHeight ?? 1800,
    quality: 80,
    sizes: "100vw",
  });

  return (
    <picture className="absolute inset-0 block">
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />

      <img
        {...desktopProps}
        alt={image.alt}
        fetchPriority="high"
        className="h-full w-full object-cover object-[54%_50%] md:object-[66%_50%]"
      />
    </picture>
  );
}

export function PremiumHeroSection({ content, locale }: Props) {
  return (
    <section className="relative min-h-[660px] overflow-hidden border-b border-[#6b9f12]/25 lg:min-h-[700px]">
     <HeroBackground image={content.image} />
  
  <div className="container relative flex min-h-[660px] flex-col justify-center py-20 lg:min-h-[700px]">
        <div className="max-w-3xl">
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>
    
          <h1 className="max-w-[620px] text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[50px] lg:text-[58px]">
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