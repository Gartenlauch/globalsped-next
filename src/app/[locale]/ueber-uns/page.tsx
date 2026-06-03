import { AboutUsSection } from "@/components/sections/AboutUsSection";
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
    meta: metadata.pages.about,
  });
}

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.about;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
        type="AboutPage"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Über uns", href: pageMeta.path },
        ]}
      />

      <AboutUsSection locale={locale} />
    </>
  );
}