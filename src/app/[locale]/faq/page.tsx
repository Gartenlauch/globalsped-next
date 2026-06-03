import type { Metadata } from "next";
import {
    getAllFaqs,
    getFaqCategories,
    getFaqPageContent,
    getFeaturedFaqs,
} from "@/lib/faq";
import { FaqHero } from "@/components/faq/FaqHero";
import { FaqCategoryFilter } from "@/components/faq/FaqCategoryFilter";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { siteUrl } from "@/content/metadata/config"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const baseUrl = siteUrl;


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const metadata = getMetadataContent(locale);

    return buildPageMetadata({
        locale,
        meta: metadata.pages.faq,
    });
}

type Props = {
    params: Promise<{
        locale: "de";
    }>;
};

export default async function FaqPage({ params }: Props) {
    const { locale } = await params;
    const pageContent = getFaqPageContent(locale);
    const faqs = getAllFaqs(locale);
    const categories = getFaqCategories(locale);
    const featuredFaqs = getFeaturedFaqs(locale, 6);

    return (
        <>
            <FaqJsonLd
                faqs={featuredFaqs}
                pagePath={`/${locale}/faq`}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: "Start", href: `/${locale}` },
                    { name: "FAQ", href: `/${locale}/faq` },
                ]}
            />

            <main className="bg-[#f7f7f2]">
                <FaqHero content={pageContent.hero} />

                <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6b9f12]">
                            {pageContent.overview.eyebrow}
                        </p>
                        <h2 className="mt-4 font-montserrat text-3xl font-semibold text-[#003b2f] md:text-4xl">
                            {pageContent.overview.title}
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-700">
                            {pageContent.overview.text}
                        </p>
                    </div>

                    <FaqCategoryFilter
                        categories={categories}
                        faqs={faqs}
                        content={pageContent}
                    />
                </section>
            </main>
        </>
    );
}