import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllFaqs,
  getFaqBySlug,
  getFaqPageContent,
  getRelatedFaqs,
} from "@/lib/faq";
import { FaqBreadcrumbs } from "@/components/faq/FaqBreadcrumbs";
import { FaqDetailContent } from "@/components/faq/FaqDetailContent";
import { RelatedFaqs } from "@/components/faq/RelatedFaqs";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqBackLink } from "@/components/faq/FaqBackLink";

type Props = {
  params: Promise<{
    locale: "de";
    slug: string;
  }>;
};

const baseUrl = "https://www.globalsped.de";

export function generateStaticParams() {
  return getAllFaqs("de").map((faq) => ({
    locale: "de",
    slug: faq.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const faq = getFaqBySlug(slug, locale);

  if (!faq) {
    return {};
  }

  const url = `${baseUrl}/${locale}/faq/${faq.slug}`;

  return {
    title: faq.metaTitle,
    description: faq.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: faq.metaTitle,
      description: faq.metaDescription,
      url,
      siteName: "GLOBALSPED",
      locale: "de_DE",
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function FaqDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  const faq = getFaqBySlug(slug, locale);

  if (!faq) {
    notFound();
  }

  const pageContent = getFaqPageContent(locale);
  const relatedFaqs = getRelatedFaqs(faq.slug, locale);

  return (
    <>
      <FaqJsonLd
        faqs={[faq]}
        pageUrl={`${baseUrl}/${locale}/faq/${faq.slug}`}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: pageContent.breadcrumbs.home,
            url: `${baseUrl}/${locale}`,
          },
          {
            name: pageContent.breadcrumbs.faq,
            url: `${baseUrl}/${locale}/faq`,
          },
          {
            name: faq.question,
            url: `${baseUrl}/${locale}/faq/${faq.slug}`,
          },
        ]}
      />

      <main className="bg-[#f7f7f2]">
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-10 lg:px-8 lg:pt-32 lg:pb-16">
          <FaqBackLink locale={locale} content={pageContent.detail} />
          
          <FaqBreadcrumbs
            currentLabel={faq.question}
            content={pageContent.breadcrumbs}
            locale={locale}
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <FaqDetailContent faq={faq} content={pageContent.detail} />
            <RelatedFaqs
              faqs={relatedFaqs}
              content={pageContent.detail}
              locale={locale}
            />
          </div>
        </section>
      </main>
    </>
  );
}