import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceBySlug, getServiceSlugs } from "@/content/services/de/";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { absoluteUrl } from "@/lib/seo/urls";


type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const metadata = getMetadataContent(locale);
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildPageMetadata({
      locale,
      meta: metadata.pages.services,
    });
  }

  return buildPageMetadata({
    locale,
    meta: {
      title: service.seo.title,
      description: service.seo.description,
      path: `/${locale}/leistungen/${slug}`,
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

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}/leistungen/${slug}`}
        name={service.seo.title}
        description={service.seo.description}
        mainEntityId={`${absoluteUrl(`/${locale}/leistungen/${slug}`)}#service`}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Leistungen", href: `/${locale}/leistungen` },
          { name: service.hero.title, href: `/${locale}/leistungen/${slug}` },
        ]}
      />

      <ServiceJsonLd
        path={`/${locale}/leistungen/${slug}`}
        name={service.hero.title}
        description={service.seo.description}
        serviceType={service.badge}
        areaServed={service.regions?.items}
      />
      <ServicePage locale={locale} service={service} />

    </>
  );
}