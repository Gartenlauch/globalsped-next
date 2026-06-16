import type { PremiumHomeContent } from "@/content/home-premium/types";
import { PremiumCta } from "../ui/PremiumCta";
import { PremiumEyebrow } from "../ui/PremiumEyebrow";
import { premiumIconMap } from "../icons/premiumIcons";
import { PremiumSectionHeading } from "../ui/PremiumSectionHeading";
import Image from "next/image";

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
      className="grid overflow-hidden bg-[#00281f] text-[#f7f7f2] lg:grid-cols-2"
    >
      <div className="relative flex min-h-[560px] items-center overflow-hidden bg-[linear-gradient(135deg,#0f493d_0%,#0b382f_46%,#132a24_100%)] px-5 py-16 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(107,159,18,0.22),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(247,247,242,0.08),transparent_38%)]" />
        <div className="relative z-10 max-w-xl">
          <PremiumEyebrow>{content.eyebrow}</PremiumEyebrow>

          <PremiumSectionHeading highlight={content.titleHighlight}>
            {content.title}
          </PremiumSectionHeading>

          <p className="mt-6 text-base leading-8 text-[#f7f7f2]/76">
            {content.intro}
          </p>

          <p className="mt-4 text-base leading-8 text-[#f7f7f2]/68">
            {content.text}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
  {content.values.map((item) => {
    const Icon = premiumIconMap[item.icon];

    return (
      <div key={item.title}>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#9bc43a]/25 bg-white/[0.08] text-[#9bc43a] shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl">
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

          <div className="mt-9">
          <PremiumCta cta={content.cta} locale={locale} />
          </div>
        </div>
      </div>

      <div className="relative min-h-[540px] overflow-hidden bg-[#00281f] lg:min-h-[620px]">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          quality={80}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_50%]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,40,31,0.66)_0%,rgba(0,40,31,0.38)_44%,rgba(0,40,31,0.14)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(107,159,18,0.12),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.30)_100%)]" />

        <div className="relative z-10 min-h-[540px] px-5 py-12 sm:px-8 lg:min-h-[620px] lg:px-12">
          <div className="relative min-h-[540px] lg:min-h-[620px]">
            {languageCard ? (
              <article className="mx-auto w-full max-w-[575px] rounded-3xl border border-white/16 bg-white/[0.095] p-5 text-[#f7f7f2] shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2">
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

            <div className="mt-14 grid w-full gap-5 sm:grid-cols-2 lg:absolute lg:bottom-[-80px] lg:left-1/2 lg:mt-0 lg:w-[575px] lg:-translate-x-1/2">
              {generationCard ? <CompactProofCard card={generationCard} /> : null}
              {networkCard ? <CompactProofCard card={networkCard} /> : null}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}