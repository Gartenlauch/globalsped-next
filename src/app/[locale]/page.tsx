import { PremiumHomePage } from "@/components/home-premium/PremiumHomePage";
import { ContactSection } from "@/components/sections/ContactSection";
import { absoluteUrl } from "@/lib/seo/urls";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getMetadataContent } from "@/content/metadata";


type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.home;
  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}`}
        name={pageMeta.title}
        description={pageMeta.description}
        mainEntityId={`${absoluteUrl()}/#organization`}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: "Start",
            href: `/${locale}`,
          },
        ]}
      />
      <PremiumHomePage locale={locale} />
      <ContactSection locale={locale} />

    </>
  );
}