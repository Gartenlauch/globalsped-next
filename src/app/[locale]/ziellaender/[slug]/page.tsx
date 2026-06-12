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

function getCountryPath(locale: string, slug: string) {
  return `/${locale}/ziellaender/${slug}`;
}

export async function generateStaticParams() {
  const countryPages = getContent("de").countryPages ?? [];

  return countryPages.map((page) => ({
    locale: "de",
    slug: page.slug,
  }));
}

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
      path: getCountryPath(locale, slug),
      ogTitle: countryMeta.ogTitle,
      ogDescription: countryMeta.ogDescription,
      ogImage: countryMeta.ogImage,
    },
  });
}

export default async function DynamicTargetCountryPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = getContent(locale).countryPages?.find(
    (countryPage) => countryPage.slug === slug
  );
  const metadata = getMetadataContent(locale);
  const countryMeta = metadata.countries[slug];
  const path = getCountryPath(locale, slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={path}
        name={countryMeta?.title ?? `Transport nach ${page.country}`}
        description={countryMeta?.description ?? page.intro}
        mainEntityId={`${absoluteUrl(path)}#service`}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Zielländer", href: `/${locale}/ziellaender` },
          {
            name: `Transport nach ${page.country}`,
            href: path,
          },
        ]}
      />

      <ServiceJsonLd
        path={path}
        name={`Transport nach ${page.country}`}
        description={countryMeta?.description ?? page.intro}
        serviceType={`Internationale Transporte nach ${page.country}`}
        areaServed={[page.country, page.region]}
      />

      <CountryTransportPage locale={locale} page={page} />
    </>
  );
}