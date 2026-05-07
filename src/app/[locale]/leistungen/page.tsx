import { ServicesSection } from "@/components/sections/ServicesSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  return <ServicesSection locale={locale} />;
}