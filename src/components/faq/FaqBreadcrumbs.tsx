import Link from "next/link";

import type { FaqPageContent } from "@/content/faq";

type Props = {
  currentLabel: string;
  content: FaqPageContent["breadcrumbs"];
  locale: string;
};

export function FaqBreadcrumbs({ currentLabel, content, locale }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-slate-600">
        <li>
          <Link href={`/${locale}`} className="hover:text-[#003b2f]">
            {content.home}
          </Link>
        </li>

        <li aria-hidden="true">/</li>

        <li>
          <Link href={`/${locale}/faq`} className="hover:text-[#003b2f]">
            {content.faq}
          </Link>
        </li>

        <li aria-hidden="true">/</li>

        <li className="text-[#003b2f]" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
