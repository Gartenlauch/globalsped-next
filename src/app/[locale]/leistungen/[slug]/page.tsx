import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ServicePage } from "@/components/services/ServicePage";
import {
  getServiceBySlug,
  getServiceStaticParams,
  isSupportedServiceLocale,
} from "@/content/services";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function getServicesOverviewPath(locale: string) {
  return locale === "en" ? "/en/services" : `/${locale}/leistungen`;
}

function getServiceDetailPath(locale: string, slug: string) {
  return locale === "en"
    ? `/en/services/${slug}`
    : `/${locale}/leistungen/${slug}`;
}

function getBreadcrumbLabels(locale: string) {
  return locale === "en"
    ? {
      home: "Home",
      services: "Services",
    }
    : {
      home: "Startseite",
      services: "Leistungen",
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const metadata = getMetadataContent(locale);

  if (!isSupportedServiceLocale(locale)) {
    return buildPageMetadata({
      locale,
      meta: metadata.pages.services,
    });
  }

  const service = getServiceBySlug(slug, locale);

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
      path: getServiceDetailPath(locale, slug),
    },
  });
}

export function generateStaticParams() {
  return getServiceStaticParams();
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isSupportedServiceLocale(locale)) {
    notFound();
  }

  const service = getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbLabels(locale);
  const servicePath = getServiceDetailPath(locale, slug);
  const servicesOverviewPath = getServicesOverviewPath(locale);

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={servicePath}
        name={service.seo.title}
        description={service.seo.description}
      />

      <ServiceJsonLd
        path={servicePath}
        name={service.hero.title}
        description={service.seo.description}
        serviceType={service.hero.title}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: breadcrumbs.home,
            href: `/${locale}`,
          },
          {
            name: breadcrumbs.services,
            href: servicesOverviewPath,
          },
          {
            name: service.hero.title,
            href: servicePath,
          },
        ]}
      />

      <ServicePage locale={locale} service={service} />
    </>
  );
}