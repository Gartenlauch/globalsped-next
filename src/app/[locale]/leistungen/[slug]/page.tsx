import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceBySlug, getServiceSlugs } from "@/content/services/de/";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const metadata = getMetadataContent(locale);

  const serviceMeta = metadata.services[slug];

  if (!serviceMeta) {
    return buildPageMetadata({
      locale,
      meta: metadata.pages.services,
    });
  }

  return buildPageMetadata({
    locale,
    meta: {
      title: serviceMeta.title,
      description: serviceMeta.description,
      path: `/${locale}/leistungen/${slug}`,
      ogTitle: serviceMeta.ogTitle,
      ogDescription: serviceMeta.ogDescription,
      ogImage: serviceMeta.ogImage,
    },
  });
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({
    locale: "de",
    slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePage locale={locale} service={service} />;
}