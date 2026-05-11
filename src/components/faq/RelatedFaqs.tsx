import Link from "next/link";

import type { FaqItem, FaqPageContent } from "@/content/faq";

type Props = {
  faqs: FaqItem[];
  content: FaqPageContent["detail"];
  locale: "de";
};

export function RelatedFaqs({ faqs, content, locale }: Props) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-3xl bg-[#003b2f] p-6 text-white shadow-sm">
        <h2 className="font-montserrat text-xl font-semibold">
          {content.relatedFaqsTitle}
        </h2>

        <div className="mt-5 space-y-4">
          {faqs.map((faq) => (
            <Link
              key={faq.slug}
              href={`/${locale}/faq/${faq.slug}`}
              className="block rounded-2xl bg-white/8 p-4 text-sm leading-6 text-white/85 transition hover:bg-white/12 hover:text-white"
            >
              {faq.question}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}