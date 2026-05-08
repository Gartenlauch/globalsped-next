import { ContactSection } from "@/components/sections/ContactSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;

  return <ContactSection locale={locale} />;
}