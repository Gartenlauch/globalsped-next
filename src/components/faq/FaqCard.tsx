import Link from "next/link";
import type { FaqItem, FaqPageContent } from "@/content/faq";

type Props = {
  faq: FaqItem;
  content: FaqPageContent["cards"];
};

export function FaqCard({ faq, content }: Props) {
  return (
    <article className="group relative rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#6b9f12]/40 hover:shadow-md">
      <div className="mb-4 inline-flex rounded-full bg-[#6b9f12]/10 px-3 py-1 text-xs font-semibold text-[#003b2f]">
        {faq.category}
      </div>

      <h3 className="font-montserrat text-xl font-semibold text-[#003b2f]">
        <Link href={`/de/faq/${faq.slug}`} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {faq.question}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        {faq.excerpt}
      </p>

      <div className="mt-6 text-sm font-semibold text-[#003b2f] group-hover:text-[#6b9f12]">
        {content.readMoreLabel}
      </div>
    </article>
  );
}