import { AboutUsSection } from "@/components/sections/AboutUsSection";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";

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

  return <AboutUsSection locale={locale} />;
}