import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "@/content";
import { CountryTransportPage } from "@/components/pages/CountryTransportPage";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getContent(locale).countryPages?.find((p) => p.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: `Transport nach ${page.country} | Globalsped`,
    description: `Internationale Transporte nach ${page.country}: FTL, LTL, Sammelgut, Thermotransporte, Projekttransporte und Zollabwicklung.`,
  };
}

export default async function DynamicCountryPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = getContent(locale).countryPages?.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return <CountryTransportPage locale={locale} page={page} />;
}