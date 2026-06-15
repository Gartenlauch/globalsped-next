import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { PremiumGlassCard } from "../ui/PremiumGlassCard";
import { PremiumIconBubble } from "../ui/PremiumIconBubble";
import { resolveHref } from "../helpers/resolveHref";
import { PremiumSectionHeading } from "../ui/PremiumSectionHeading";


type Props = {
  content: PremiumHomeContent["services"];
  locale: string;
};


export function PremiumServicesSection({ content, locale }: Props) {
  return (
    <section id={content.id} className="relative isolate overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage.src}
          alt={content.backgroundImage.alt}
          fill
          quality={80}
          sizes="100vw"
          className="object-cover opacity-80"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,40,31,0.42)_0%,rgba(0,40,31,0.26)_34%,rgba(0,40,31,0.12)_68%,rgba(0,40,31,0.06)_100%)]" />

      <div className="relative z-20 mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
        <div>
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading highlight={content.titleHighlight}>
            {content.title}
          </PremiumSectionHeading>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#f7f7f2]/72">
            {content.intro}
          </p>

          <div className="mt-8">
            <PremiumCta cta={content.overviewCta} locale={locale} variant="secondary" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-fr xl:grid-cols-3">
          {content.cards.map((item) => (
            <Link
              key={item.href}
              href={resolveHref(item.href, locale)}
              className="group block h-full"
            >
              <PremiumGlassCard className="flex h-full flex-col justify-between border-white/18 bg-white/[0.095] shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition duration-300 group-hover:-translate-y-1 group-hover:border-[#9bc43a]/45 group-hover:bg-white/[0.13] lg:min-h-[255px] xl:min-h-[270px]">
                <PremiumIconBubble icon={item.icon} />

                <h3 className="mt-4 text-lg font-semibold leading-tight tracking-[-0.025em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[#f7f7f2]/70">
                  {item.text}
                </p>

                <span className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-[#9bc43a] backdrop-blur-xl transition group-hover:border-[#9bc43a]/45 group-hover:bg-[#6b9f12] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{item.ctaLabel}</span>
                </span>
              </PremiumGlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}