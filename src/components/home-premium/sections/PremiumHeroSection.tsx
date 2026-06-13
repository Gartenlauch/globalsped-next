import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { PremiumGlassCard } from "../ui/PremiumGlassCard";
import { PremiumIconBubble } from "../ui/PremiumIconBubble";
import { resolveHref } from "../helpers/resolveHref";

type Props = {
  content: PremiumHomeContent["hero"];
  locale: string;
};

export function PremiumHeroSection({ content, locale }: Props) {
  return (
    <section className="relative min-h-[680px] overflow-hidden border-b border-[#6b9f12]/40 lg:min-h-[820px]">
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

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-5 py-28 sm:px-8 lg:min-h-[820px]">
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

        <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
          {content.stats.map((item) => (
            <PremiumGlassCard key={item.label} className="min-h-[150px]">
              <PremiumIconBubble icon={item.icon} />
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <h2 className="mt-1 text-sm font-semibold text-white">{item.label}</h2>
              <p className="mt-3 text-sm leading-6 text-[#f7f7f2]/65">{item.text}</p>
            </PremiumGlassCard>
          ))}
        </div>

        <PremiumGlassCard className="mt-8 max-w-sm lg:absolute lg:bottom-24 lg:right-8">
          <PremiumEyebrow>{content.routeCard.eyebrow}</PremiumEyebrow>

          <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
            {content.routeCard.title}
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#f7f7f2]/70">
            {content.routeCard.text}
          </p>

          <Link
            href={resolveHref(content.routeCard.href, locale)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9bc43a]"
          >
            {content.routeCard.ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </PremiumGlassCard>
      </div>
    </section>
  );
}