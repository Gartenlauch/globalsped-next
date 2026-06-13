import { CheckCircle2, Globe2 } from "lucide-react";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { premiumIconMap } from "../icons/premiumIcons";

type Props = {
  content: PremiumHomeContent["about"];
  locale: string;
};

export function PremiumAboutTeaserSection({ content, locale }: Props) {
  return (
    <section
      id={content.id}
      className="grid overflow-hidden bg-[#f7f7f2] text-[#00281f] lg:grid-cols-2"
    >
      <div className="flex min-h-[560px] items-center px-5 py-16 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12">
        <div className="max-w-xl">
          <PremiumEyebrow variant="light">{content.eyebrow}</PremiumEyebrow>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
            {content.title}
          </h2>

          <p className="mt-6 text-base leading-8 text-[#00281f]/75">
            {content.intro}
          </p>

          <p className="mt-4 text-base leading-8 text-[#00281f]/68">
            {content.text}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {content.values.map((item) => {
              const Icon = premiumIconMap[item.icon];

              return (
                <div key={item.title}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00281f]/10 bg-white text-[#6b9f12] shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-[#00281f]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#00281f]/62">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-9">
            <PremiumCta cta={content.cta} locale={locale} variant="dark" />
          </div>
        </div>
      </div>

      <div className="relative min-h-[480px] overflow-hidden bg-[#00281f] lg:min-h-[620px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(107,159,18,0.22),transparent_34%),linear-gradient(135deg,#00281f_0%,#003b2f_52%,#001b15_100%)]" />

        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(247,247,242,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(247,247,242,0.18)_1px,transparent_1px)] [background-size:38px_38px]" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/25" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/15" />

        <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[#6b9f12]/30 bg-[#f7f7f2]/8 text-[#9bc43a] shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Globe2 className="h-14 w-14" aria-hidden="true" />
        </div>

        <div className="absolute left-6 top-6 max-w-xs rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/8 p-6 text-[#f7f7f2] shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <CheckCircle2 className="h-7 w-7 text-[#9bc43a]" aria-hidden="true" />
          <p className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em]">
            {content.values[0]?.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#f7f7f2]/68">
            {content.values[0]?.text}
          </p>
        </div>

        <div className="absolute bottom-6 right-6 max-w-xs rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/8 p-6 text-[#f7f7f2] shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <CheckCircle2 className="h-7 w-7 text-[#9bc43a]" aria-hidden="true" />
          <p className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em]">
            {content.values[1]?.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#f7f7f2]/68">
            {content.values[1]?.text}
          </p>
        </div>

        <div className="absolute bottom-10 left-8 hidden max-w-[220px] rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/8 p-5 text-[#f7f7f2] shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl md:block">
          <p className="text-sm font-semibold leading-snug">
            {content.values[2]?.title}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#f7f7f2]/62">
            {content.values[2]?.text}
          </p>
        </div>
      </div>
    </section>
  );
}