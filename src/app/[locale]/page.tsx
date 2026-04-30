// src/app/[locale]/page.tsx

import { HeroSection } from "@/components/sections/HeroSection";

export default async function HomePage({ params }: any) {
  return (
    <>
      <HeroSection />
    </>
  );
}