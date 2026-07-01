import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getContent } from "@/content";
import { CountryTransportPage } from "@/components/pages/CountryTransportPage";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { CountryTransportJsonLd } from "@/components/seo/CountryTransportJsonLd";
import { getDestinationPath, getLocalizedRoute } from "@/lib/i18n/routes";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  const pages = getContent("en").countryPages ?? [];

  return pages.map((page) => ({
    locale: "en",
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const metadata = getMetadataContent(locale);

  if (locale !== "en") {
    return buildPageMetadata({
      locale,
      meta: metadata.pages.destinations,
    });
  }

  const countryMeta = metadata.countries[slug];

  if (!countryMeta) {
    return buildPageMetadata({
      locale,
      meta: metadata.pages.notFound,
    });
  }

  return buildPageMetadata({
    locale,
    meta: {
      title: countryMeta.title,
      description: countryMeta.description,
      path: getDestinationPath(locale, slug),
      ogTitle: countryMeta.ogTitle,
      ogDescription: countryMeta.ogDescription,
      ogImage: countryMeta.ogImage,
      ogImageAlt: countryMeta.ogImageAlt,
    },
  });
}

export default async function DestinationAliasDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "destinations"));
  }

  const siteContent = getContent(locale);
  const page = siteContent.countryPages?.find((item) => item.slug === slug);
  const metadata = getMetadataContent(locale);
  const countryMeta = metadata.countries[slug];
  const path = getDestinationPath(locale, slug);

  if (!page || !countryMeta) {
    notFound();
  }

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={path}
        name={countryMeta.title}
        description={countryMeta.description}
      />

      <CountryTransportJsonLd
        path={path}
        countryName={page.country}
        title={countryMeta.title}
        description={countryMeta.description}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: siteContent.destinations.badge,
            href: getLocalizedRoute(locale, "destinations"),
          },
          {
            name: page.country,
            href: path,
          },
        ]}
      />

      <CountryTransportPage locale={locale} page={page} />
    </>
  );
}