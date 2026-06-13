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
  content: PremiumHomeContent["services"];
  locale: string;
};

export function PremiumServicesSection({ content, locale }: Props) {
  return (
    <section id={content.id} className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={content.backgroundImage.src}
          alt={content.backgroundImage.alt}
          fill
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(107,159,18,0.23),transparent_32%),linear-gradient(180deg,#00281f_0%,#003b2f_45%,#00281f_100%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
        <div>
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl">
            {content.title}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#f7f7f2]/72">
            {content.intro}
          </p>

          <div className="mt-8">
            <PremiumCta cta={content.overviewCta} locale={locale} variant="secondary" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((item) => (
            <Link key={item.href} href={resolveHref(item.href, locale)} className="group">
              <PremiumGlassCard className="flex min-h-[250px] flex-col transition duration-300 group-hover:-translate-y-1 group-hover:border-[#6b9f12]/45">
                <PremiumIconBubble icon={item.icon} />

                <h3 className="text-lg font-semibold tracking-[-0.025em] text-white">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-6 text-[#f7f7f2]/68">
                  {item.text}
                </p>

                <span className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#6b9f12]/15 text-[#9bc43a] transition group-hover:bg-[#6b9f12] group-hover:text-white">
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