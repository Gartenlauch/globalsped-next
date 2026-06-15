import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { premiumIconMap } from "../icons/premiumIcons";
import { PremiumSectionHeading } from "../ui/PremiumSectionHeading";

type Props = {
  content: PremiumHomeContent["about"];
  locale: string;
};

type ProofCard = PremiumHomeContent["about"]["proofCards"][number];

function CompactProofCard({ card }: { card: ProofCard }) {
  const Icon = premiumIconMap[card.icon];

  return (
    <article className="rounded-[1.5rem] border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.065] p-5 text-[#f7f7f2] shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#6b9f12]/25 bg-[#6b9f12]/10 text-[#9bc43a]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        <div>
          <h3 className="text-lg font-semibold leading-snug tracking-[-0.03em] text-white">
            {card.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#f7f7f2]/64">
            {card.text}
          </p>
        </div>
      </div>
    </article>
  );
}

export function PremiumAboutSection({ content, locale }: Props) {
  const [languageCard, generationCard, networkCard] = content.proofCards;
  return (
    <section
      id={content.id}
      className="grid overflow-hidden bg-[#f7f7f2] text-[#00281f] lg:grid-cols-2"
    >
      <div className="flex min-h-[560px] items-center px-5 py-16 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12">
        <div className="max-w-xl">
          <PremiumEyebrow variant="light">{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading
            highlight={content.titleHighlight}
            variant="light"
          >
            {content.title}
          </PremiumSectionHeading>

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

      <div className="relative min-h-[500px] overflow-hidden bg-[#00281f] lg:min-h-[580px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(107,159,18,0.22),transparent_34%),linear-gradient(135deg,#00281f_0%,#003b2f_52%,#001b15_100%)]" />

        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(247,247,242,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(247,247,242,0.18)_1px,transparent_1px)] [background-size:38px_38px]" />

        <div className="relative z-10 flex min-h-[500px] items-center px-5 py-14 sm:px-8 lg:min-h-[580px] lg:px-12">
          <div className="mx-auto grid w-full max-w-xl gap-4">
            {languageCard ? (
              <article className="rounded-[1.5rem] border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.075] p-5 text-[#f7f7f2] shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#6b9f12]/25 bg-[#6b9f12]/10 text-[#9bc43a]">
                    {(() => {
                      const Icon = premiumIconMap[languageCard.icon];
                      return <Icon className="h-5 w-5" aria-hidden="true" />;
                    })()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold leading-snug tracking-[-0.03em] text-white">
                      {languageCard.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#f7f7f2]/64">
                      {languageCard.text}
                    </p>

                    {languageCard.languages ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {languageCard.languages.map((language) => (
                          <span
                            key={language.name}
                            title={language.name}
                            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#f7f7f2]/15 bg-white/10 shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
                          >
                            <span
                              className={`fi fi-${language.flagCode} fis h-full w-full rounded-full bg-cover bg-center`}
                              aria-hidden="true"
                            />
                            <span className="sr-only">{language.name}</span>
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              {generationCard ? <CompactProofCard card={generationCard} /> : null}
              {networkCard ? <CompactProofCard card={networkCard} /> : null}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/20" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b9f12]/10" />
      </div>
    </section>
  );
}