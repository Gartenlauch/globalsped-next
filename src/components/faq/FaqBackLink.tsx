import Link from "next/link";
import type { FaqPageContent } from "@/content/faq";

type Props = {
  locale: string;
  content: FaqPageContent["detail"];
};

export function FaqBackLink({ locale, content }: Props) {
  return (
    <Link
      href={`/${locale}/faq`}
      className="mb-6 inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#003b2f] shadow-sm transition hover:border-[#6b9f12]/50 hover:text-[#6b9f12] focus:outline-none focus:ring-4 focus:ring-[#6b9f12]/20"
    >
      ← {content.backToFaqLabel}
    </Link>
  );
}