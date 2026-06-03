import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "@/content";
import { CountryTransportPage } from "@/components/pages/CountryTransportPage";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { absoluteUrl } from "@/lib/seo/urls";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";


type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const metadata = getMetadataContent(locale);

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
      path: `/${locale}/${slug}`,
      ogTitle: countryMeta.ogTitle,
      ogDescription: countryMeta.ogDescription,
      ogImage: countryMeta.ogImage,
    },
  });
}

export default async function DynamicCountryPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = getContent(locale).countryPages?.find((p) => p.slug === slug);
  const metadata = getMetadataContent(locale);
  const countryMeta = metadata.countries[slug];

  if (!page) {
    notFound();
  }

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}/${slug}`}
        name={countryMeta?.title ?? `Transport nach ${page.country}`}
        description={countryMeta?.description ?? page.intro}
        mainEntityId={`${absoluteUrl(`/${locale}/${slug}`)}#service`}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Destinationen", href: `/${locale}/destinationen` },
          {
            name: `Transport nach ${page.country}`,
            href: `/${locale}/${slug}`,
          },
        ]}
      />

      <ServiceJsonLd
        path={`/${locale}/${slug}`}
        name={`Transport nach ${page.country}`}
        description={countryMeta?.description ?? page.intro}
        serviceType={`Internationale Transporte nach ${page.country}`}
        areaServed={[page.country, page.region]}
      />
      <CountryTransportPage locale={locale} page={page} />
    </>
  );
}