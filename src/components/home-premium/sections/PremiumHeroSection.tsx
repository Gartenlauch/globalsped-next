import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PremiumHomeContent, PremiumStat } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { PremiumGlassCard } from "../ui/PremiumGlassCard";
import { PremiumIconBubble } from "../ui/PremiumIconBubble";
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
  const card = (
    <PremiumGlassCard className="flex h-full min-h-[220px] flex-col transition duration-300 group-hover:-translate-y-1 group-hover:border-[#6b9f12]/45">
      <PremiumIconBubble icon={item.icon} />

      <p className="text-2xl font-semibold text-white">{item.value}</p>

      <h2 className="mt-1 text-sm font-semibold text-white">{item.label}</h2>

      <p className="mt-3 flex-1 text-sm leading-6 text-[#f7f7f2]/65">
        {item.text}
      </p>

      {item.href ? (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9bc43a]">
          Mehr erfahren
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      ) : null}
    </PremiumGlassCard>
  );

  if (!item.href) {
    return card;
  }

  return (
    <Link href={resolveHref(item.href, locale)} className="group block h-full">
      {card}
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
    <section className="relative min-h-[760px] overflow-hidden border-b border-[#6b9f12]/40 lg:min-h-[860px]">
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,40,31,0.96)_0%,rgba(0,40,31,0.78)_36%,rgba(0,40,31,0.24)_68%,rgba(0,40,31,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(107,159,18,0.26),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,40,31,0.9)_100%)]" />

      <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-center px-5 py-28 sm:px-8 lg:min-h-[860px]">
        <div className="max-w-3xl">
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            {content.headline.line1}{" "}
            <span className="text-[#9bc43a]">{content.headline.highlight}</span>{" "}
            {content.headline.line2}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#f7f7f2]/82 sm:text-lg">
            {content.intro}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <PremiumCta cta={content.primaryCta} locale={locale} />
            <PremiumCta cta={content.secondaryCta} locale={locale} variant="secondary" />
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((item) => (
            <HeroStatCard key={item.label} item={item} locale={locale} />
          ))}

          <HeroRouteCard content={content.routeCard} locale={locale} />
        </div>
      </div>
    </section>
  );
}