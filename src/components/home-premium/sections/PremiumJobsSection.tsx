import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Users } from "lucide-react";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { premiumIconMap } from "../icons/premiumIcons";
import { resolveHref } from "../helpers/resolveHref";
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(107,159,18,0.22),transparent_32%),radial-gradient(circle_at_16%_72%,rgba(247,247,242,0.08),transparent_34%)]" />

      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(247,247,242,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(247,247,242,0.14)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading variant="light">
            {content.title}
          </PremiumSectionHeading>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f7f7f2]/72">
            {content.intro}
          </p>

          <div className="mt-9">
            <PremiumCta cta={content.cta} locale={locale} />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {content.values.map((item) => {
              const Icon = premiumIconMap[item.icon];

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.055] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#6b9f12]/30 bg-[#6b9f12]/10 text-[#9bc43a]">
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

        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.055] shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:min-h-[560px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(107,159,18,0.22),transparent_34%),linear-gradient(135deg,rgba(247,247,242,0.08)_0%,rgba(247,247,242,0.03)_100%)]" />

          <div className="absolute left-1/2 top-[42%] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[#6b9f12]/30 bg-[#00281f]/80 text-[#9bc43a] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <Users className="h-14 w-14" aria-hidden="true" />
          </div>

          <div className="absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/20" />
          <div className="absolute left-1/2 top-[42%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/10" />

          <div className="absolute left-6 top-6 rounded-3xl border border-[#f7f7f2]/10 bg-[#00281f]/72 p-6 text-[#f7f7f2] shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <BriefcaseBusiness className="h-7 w-7 text-[#9bc43a]" aria-hidden="true" />
            <p className="mt-5 max-w-[240px] text-lg font-semibold leading-snug tracking-[-0.03em]">
              {content.values[0]?.title}
            </p>
            <p className="mt-3 max-w-[260px] text-sm leading-6 text-[#f7f7f2]/68">
              {content.values[0]?.text}
            </p>
          </div>

          <div className="absolute bottom-6 right-6 rounded-3xl border border-[#f7f7f2]/10 bg-[#00281f]/72 p-6 text-[#f7f7f2] shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <CheckCircle2 className="h-7 w-7 text-[#9bc43a]" aria-hidden="true" />
            <p className="mt-5 max-w-[240px] text-lg font-semibold leading-snug tracking-[-0.03em]">
              {content.values[1]?.title}
            </p>
            <p className="mt-3 max-w-[260px] text-sm leading-6 text-[#f7f7f2]/68">
              {content.values[1]?.text}
            </p>
          </div>

          <Link
            href={resolveHref(content.cta.href, locale)}
            className="absolute bottom-6 left-6 inline-flex items-center gap-3 rounded-2xl border border-[#6b9f12]/30 bg-[#6b9f12]/12 px-5 py-4 text-sm font-semibold text-[#9bc43a] transition hover:bg-[#6b9f12] hover:text-white"
          >
            {content.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}