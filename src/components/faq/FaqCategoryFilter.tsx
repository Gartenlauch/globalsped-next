"use client";

import { useMemo, useState } from "react";
import type { FaqItem, FaqPageContent } from "@/content/faq";
import { FaqCard } from "./FaqCard";

type Props = {
  categories: string[];
  faqs: FaqItem[];
  content: FaqPageContent;
};

export function FaqCategoryFilter({ categories, faqs, content }: Props) {
  const [activeCategory, setActiveCategory] = useState(
    content.search.allCategoriesLabel,
  );
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === content.search.allCategoriesLabel ||
        faq.category === activeCategory;

      const search = query.toLowerCase().trim();

      const matchesQuery =
        !search ||
        faq.question.toLowerCase().includes(search) ||
        faq.excerpt.toLowerCase().includes(search) ||
        faq.keywords.some((keyword) =>
          keyword.toLowerCase().includes(search),
        );

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, content.search.allCategoriesLabel, faqs, query]);

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <label
          htmlFor="faq-search"
          className="mb-2 block text-sm font-semibold text-[#003b2f]"
        >
          {content.search.label}
        </label>

        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={content.search.placeholder}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#6b9f12] focus:ring-4 focus:ring-[#6b9f12]/10"
        />
      </div>

      <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
        {[content.search.allCategoriesLabel, ...categories].map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                isActive
                  ? "rounded-full bg-[#003b2f] px-5 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-[#003b2f] transition hover:border-[#6b9f12]"
              }
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredFaqs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredFaqs.map((faq) => (
            <FaqCard
              key={faq.slug}
              faq={faq}
              content={content.cards}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="font-montserrat text-xl font-semibold text-[#003b2f]">
            {content.search.noResultsTitle}
          </h2>
          <p className="mt-3 text-slate-700">
            {content.search.noResultsText}
          </p>
        </div>
      )}
    </div>
  );
}