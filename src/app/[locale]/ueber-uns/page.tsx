import { AboutUsSection } from "@/components/sections/AboutUsSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;

  return <AboutUsSection locale={locale} />;
}