import { getAllFaqs } from "@/lib/faq";

export default function sitemap() {
  const baseUrl = "https://www.globalsped.de";
  const faqs = getAllFaqs("de");

  return [
    {
      url: `${baseUrl}/de/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...faqs.map((faq) => ({
      url: `${baseUrl}/de/faq/${faq.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}