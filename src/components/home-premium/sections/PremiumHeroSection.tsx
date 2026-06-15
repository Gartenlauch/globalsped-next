import Image from "next/image";
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
      <PremiumGlassCard className="flex h-full min-h-[170px] flex-col justify-between transition duration-300 group-hover:-translate-y-1 group-hover:border-[#6b9f12]/45">
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

export function PremiumHeroSection({ content, locale }: Props) {
  return (
    <section className="relative min-h-[620px] overflow-hidden border-b border-[#6b9f12]/30 lg:min-h-[650px]">
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[70%_50%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,40,31,0.88)_0%,rgba(0,40,31,0.70)_30%,rgba(0,40,31,0.14)_52%,rgba(0,40,31,0.00)_74%,rgba(0,0,0,0.04)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.08)_100%)]" />
      <div className="container relative flex min-h-[620px] flex-col justify-center py-20 lg:min-h-[650px]">
        <div className="max-w-3xl">
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <h1 className="max-w-[560px] text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[50px] lg:text-[56px]">
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