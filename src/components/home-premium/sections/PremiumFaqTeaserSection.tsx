import Link from "next/link";
import { ArrowRight, HelpCircle, SearchCheck } from "lucide-react";
import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { resolveHref } from "../helpers/resolveHref";

type Props = {
  content: PremiumHomeContent["faq"];
  locale: string;
};

export function PremiumFaqTeaserSection({ content, locale }: Props) {
  return (
    <section
      id={content.id}
      className="relative overflow-hidden bg-[#003b2f] py-20 text-[#f7f7f2] lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(107,159,18,0.18),transparent_30%),radial-gradient(circle_at_84%_76%,rgba(247,247,242,0.08),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {content.title}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#f7f7f2]/72">
              {content.intro}
            </p>
          </div>

          <PremiumCta cta={content.overviewCta} locale={locale} variant="secondary" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.items.map((item, index) => (
            <Link
              key={item.href}
              href={resolveHref(item.href, locale)}
              className="group"
            >
              <article className="flex min-h-[290px] flex-col rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.055] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:border-[#6b9f12]/45">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6b9f12]/30 bg-[#6b9f12]/10 text-[#9bc43a]">
                    {index === 0 ? (
                      <SearchCheck className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <HelpCircle className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>

                  <span className="text-xs font-semibold text-[#f7f7f2]/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#9bc43a]">
                  {item.category}
                </p>

                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.025em] text-white">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-6 text-[#f7f7f2]/68">
                  {item.text}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9bc43a]">
                  {item.ctaLabel}
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}