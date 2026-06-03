import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";


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
    meta: metadata.pages.contact,
  });
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;


  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}/kontakt`}
        name="Kontakt für internationale Transporte"
        description="Kontakt zu GLOBALSPED für internationale Transporte, Zollabwicklung, FTL, LTL, Thermotransporte und Projektlogistik."
        type="ContactPage"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Kontakt", href: `/${locale}/kontakt` },
        ]}
      />
      <ContactSection locale={locale} />
    </>
  )
}