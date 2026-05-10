import type { FaqPageContent } from "@/content/faq";

type Props = {
  content: FaqPageContent["hero"];
};

export function FaqHero({ content }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#00281f] via-[#003b2f] to-[#00281f]">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_top_right,#6b9f12,transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6b9f12]">
            {content.eyebrow}
          </p>

          <h1 className="mt-6 font-montserrat text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {content.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            {content.intro}
          </p>
        </div>
      </div>
    </section>
  );
}