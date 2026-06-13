import { getPremiumHomeContent } from "@/content/home-premium";
import { PremiumHeroSection } from "./sections/PremiumHeroSection";
import { PremiumServicesSection } from "./sections/PremiumServicesSection";
import { PremiumDestinationsSection } from "./sections/PremiumDestinationsSection";
import { PremiumAboutTeaserSection } from "./sections/PremiumAboutTeaserSection";
import { PremiumJobsTeaserSection } from "./sections/PremiumJobsTeaserSection";
import { PremiumFaqTeaserSection } from "./sections/PremiumFaqTeaserSection";

type Props = {
  locale: string;
};

export function PremiumHomePage({ locale }: Props) {
  const content = getPremiumHomeContent(locale);

  return (
    <main className="overflow-hidden bg-[#00281f] text-[#f7f7f2]">
      <PremiumHeroSection content={content.hero} locale={locale} />
      <PremiumServicesSection content={content.services} locale={locale} />
      <PremiumDestinationsSection content={content.destinations} locale={locale} />
      <PremiumAboutTeaserSection content={content.about} locale={locale} />
      <PremiumJobsTeaserSection content={content.jobs} locale={locale} />
      {content.faq.enabled ? (
        <PremiumFaqTeaserSection content={content.faq} locale={locale} />
      ) : null}
    </main>
  );
}