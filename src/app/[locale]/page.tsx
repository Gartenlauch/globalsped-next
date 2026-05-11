import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { CustomsSection } from "@/components/sections/CustomsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { JobsSection } from "@/components/sections/JobsSection";
import { ContactSection } from "@/components/sections/ContactSection";


type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <HeroSection locale={locale} />
      <DestinationsSection locale={locale} />
      <ServicesSection locale={locale} />
      <CustomsSection locale={locale} />
      <AboutUsSection locale={locale} />
      <JobsSection locale={locale} />
      <ContactSection locale={locale} />
      
    </>
  );
}