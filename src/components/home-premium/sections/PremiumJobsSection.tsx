import Image from "next/image";
import type { PremiumHomeContent, PremiumValueItem, } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { premiumIconMap } from "../icons/premiumIcons";
import { PremiumSectionHeading } from "../ui/PremiumSectionHeading";
type Props = {
  content: PremiumHomeContent["jobs"];
  locale: string;
};

export function PremiumJobsSection({ content, locale }: Props) {
  return (
    <section
      id={content.id}
      className="relative overflow-hidden bg-[#00281f] py-20 text-[#f7f7f2] lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(107,159,18,0.28),transparent_34%),radial-gradient(circle_at_18%_74%,rgba(0,59,47,0.38),transparent_42%),linear-gradient(135deg,rgba(0,40,31,0.52),rgba(0,59,47,0.18)_48%,rgba(0,0,0,0.28))]" />
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(247,247,242,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(247,247,242,0.10)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading highlight={content.titleHighlight}>
            {content.title}
          </PremiumSectionHeading>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f7f7f2]/72">
            {content.intro}
          </p>

          <div className="mt-9">
            <PremiumCta cta={content.cta} locale={locale} />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {content.values.map((item: PremiumValueItem) => {
              const Icon = premiumIconMap[item.icon];

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.055] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#9bc43a]/25 bg-[#6b9f12]/10 text-[#9bc43a]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#f7f7f2]/62">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border-0 bg-[#00281f] shadow-[0_34px_100px_rgba(0,0,0,0.36)] outline-none ring-0 lg:min-h-[560px]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            quality={80}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_50%]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,40,31,0.18)_0%,rgba(0,40,31,0.10)_42%,rgba(0,0,0,0.16)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(107,159,18,0.10),transparent_34%)]" />
        </div>
      </div>
    </section>
  );
}