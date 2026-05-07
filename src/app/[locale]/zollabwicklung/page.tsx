import { CustomsSection } from "@/components/sections/CustomsSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function CustomsPage({ params }: Props) {
  const { locale } = await params;

  return <CustomsSection locale={locale} />;
}