import { ApplicationPage } from "@/components/pages/ApplicationPage";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

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
    meta: metadata.pages.application,
  });
}

export default async function BewerbungPage({ params }: Props) {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.application;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", href: `/${locale}` },
          { name: "Jobs", href: `/${locale}/jobs` },
          { name: "Bewerbung", href: `/${locale}/jobs/bewerbung` },
        ]}
      />

      <ApplicationPage locale={locale} />
    </>
  );
}