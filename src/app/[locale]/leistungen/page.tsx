import { ServicesSection } from "@/components/sections/ServicesSection";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceCatalogJsonLd } from "@/components/seo/ServiceCatalogJsonLd";
import { getServicesCatalogSchema } from "@/content/schema/services";
import { absoluteUrl } from "@/lib/seo/urls";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.services,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.services;
  const servicesCatalogSchema = getServicesCatalogSchema(locale);
  
  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}/leistungen`}
        name={metadata.pages.services.title}
        description={metadata.pages.services.description}
        type="CollectionPage"
        mainEntityId={`${absoluteUrl(`/${locale}/leistungen`)}#service-catalog`}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Leistungen", href: pageMeta.path },
        ]}
      />

      <ServicesSection locale={locale} />
      <ServiceCatalogJsonLd
        path={`/${locale}/leistungen`}
        name={servicesCatalogSchema.name}
        description={servicesCatalogSchema.description}
        services={servicesCatalogSchema.services}
      />
    </>
  );
}