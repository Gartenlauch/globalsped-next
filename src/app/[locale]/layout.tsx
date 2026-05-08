import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollHandler } from "@/app/[locale]/SmothScroll";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale}/>
      <ScrollHandler />
      {children}
      <Footer locale={locale} />
    </>
  );
}