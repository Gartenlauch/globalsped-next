import type { FaqItem, FaqPageContent } from "@/content/faq";

type Props = {
  faq: FaqItem;
  content: FaqPageContent["detail"];
};

export function FaqDetailContent({ faq, content }: Props) {
  const paragraphs = faq.answer.split("\n").filter(Boolean);

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
      <div className="mb-6 inline-flex rounded-full bg-[#6b9f12]/10 px-3 py-1 text-xs font-semibold text-[#003b2f]">
        {faq.category}
      </div>

      <h1 className="font-montserrat text-3xl font-semibold tracking-tight text-[#003b2f] md:text-5xl">
        {faq.question}
      </h1>

      <p className="mt-6 rounded-2xl border-l-4 border-[#6b9f12] bg-[#f7f7f2] p-5 text-lg leading-8 text-[#003b2f]">
        {faq.excerpt}
      </p>

      <div className="mt-10 space-y-6 text-base leading-8 text-slate-700">
        {paragraphs.map((paragraph, i) => (
          <p key={paragraph+'-'+i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="font-montserrat text-xl font-semibold text-[#003b2f]">
          {content.relatedTopicsTitle}
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {faq.relatedTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-[#f7f7f2] px-3 py-1 text-sm text-slate-700"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}