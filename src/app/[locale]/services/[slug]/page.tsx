import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { ServicePage } from "@/components/services/ServicePage";
import { getContent } from "@/content";
import {
  getServiceBySlug,
  getServiceSlugs,
  isSupportedServiceLocale,
} from "@/content/services";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { getLocalizedRoute, getServicePath } from "@/lib/i18n/routes";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getServiceSlugs("en").map((slug) => ({
    locale: "en",
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (locale !== "en" || !isSupportedServiceLocale(locale)) {
    const metadata = getMetadataContent(locale);

    return buildPageMetadata({
      locale,
      meta: metadata.pages.services,
    });
  }

  const service = getServiceBySlug(slug, locale);

  if (!service) {
    const metadata = getMetadataContent(locale);

    return buildPageMetadata({
      locale,
      meta: metadata.pages.notFound,
    });
  }

  return buildPageMetadata({
    locale,
    meta: {
      title: service.seo.title,
      description: service.seo.description,
      path: getServicePath(locale, slug),
    },
  });
}

export default async function ServiceAliasDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "services"));
  }

  if (!isSupportedServiceLocale(locale)) {
    notFound();
  }

  const service = getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  const siteContent = getContent(locale);
  const servicePath = getServicePath(locale, slug);

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
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: siteContent.services.badge,
            href: getLocalizedRoute(locale, "services"),
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