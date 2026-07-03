import type { NextConfig } from "next";

const serviceSlugPairs = [
  ["ftl-komplettladungen", "ftl-full-truck-loads"],
  ["ltl-teilladungen", "ltl-part-loads"],
  ["thermotransporte", "temperature-controlled-transport"],
  ["gefahrguttransporte", "dangerous-goods-transport"],
  ["zollabwicklung", "customs-clearance"],
  ["projektlogistik", "project-logistics"],
] as const;

const countrySlugPairs = [
  ["transport-kasachstan", "freight-transport-kazakhstan"],
  ["transport-usbekistan", "freight-transport-uzbekistan"],
  ["transport-kirgisistan", "freight-transport-kyrgyzstan"],
  ["transport-turkmenistan", "freight-transport-turkmenistan"],
  ["transport-tadschikistan", "freight-transport-tajikistan"],
  ["transport-aserbaidschan", "freight-transport-azerbaijan"],
  ["transport-georgien", "freight-transport-georgia"],
  ["transport-armenien", "freight-transport-armenia"],
  ["transport-mongolei", "freight-transport-mongolia"],
  ["transport-irak", "freight-transport-iraq"],
  ["transport-tuerkei", "freight-transport-turkey"],
  ["transport-ukraine", "freight-transport-ukraine"],
] as const;

const localizedCanonicalRedirects = [
  { source: "/de/about-us", destination: "/de/ueber-uns", permanent: true },
  { source: "/en/ueber-uns", destination: "/en/about-us", permanent: true },
  { source: "/de/careers", destination: "/de/jobs", permanent: true },
  { source: "/en/jobs", destination: "/en/careers", permanent: true },
  {
    source: "/de/careers/application",
    destination: "/de/jobs/bewerbung",
    permanent: true,
  },
  {
    source: "/en/jobs/bewerbung",
    destination: "/en/careers/application",
    permanent: true,
  },
  {
    source: "/de/transport-request",
    destination: "/de/transport-anfrage",
    permanent: true,
  },
  {
    source: "/en/transport-anfrage",
    destination: "/en/transport-request",
    permanent: true,
  },
  { source: "/de/privacy-policy", destination: "/de/datenschutz", permanent: true },
  { source: "/en/datenschutz", destination: "/en/privacy-policy", permanent: true },
  { source: "/de/legal-notice", destination: "/de/impressum", permanent: true },
  { source: "/en/impressum", destination: "/en/legal-notice", permanent: true },
  { source: "/de/services", destination: "/de/leistungen", permanent: true },
  { source: "/en/leistungen", destination: "/en/services", permanent: true },
  { source: "/de/destinations", destination: "/de/ziellaender", permanent: true },
  { source: "/en/ziellaender", destination: "/en/destinations", permanent: true },
  ...serviceSlugPairs.flatMap(([deSlug, enSlug]) => [
    {
      source: `/de/services/${deSlug}`,
      destination: `/de/leistungen/${deSlug}`,
      permanent: true,
    },
    {
      source: `/de/services/${enSlug}`,
      destination: `/de/leistungen/${deSlug}`,
      permanent: true,
    },
    {
      source: `/en/leistungen/${deSlug}`,
      destination: `/en/services/${enSlug}`,
      permanent: true,
    },
    {
      source: `/en/leistungen/${enSlug}`,
      destination: `/en/services/${enSlug}`,
      permanent: true,
    },
  ]),
  ...countrySlugPairs.flatMap(([deSlug, enSlug]) => [
    {
      source: `/de/destinations/${deSlug}`,
      destination: `/de/ziellaender/${deSlug}`,
      permanent: true,
    },
    {
      source: `/de/destinations/${enSlug}`,
      destination: `/de/ziellaender/${deSlug}`,
      permanent: true,
    },
    {
      source: `/en/ziellaender/${deSlug}`,
      destination: `/en/destinations/${enSlug}`,
      permanent: true,
    },
    {
      source: `/en/ziellaender/${enSlug}`,
      destination: `/en/destinations/${enSlug}`,
      permanent: true,
    },
  ]),
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [45, 60, 70, 72, 75, 80, 90],
  },

  async redirects() {
    return [
      ...localizedCanonicalRedirects,
      {
        source: "/",
        destination: "/de",
        permanent: true,
      },

      // Alte indexierte Länder-URLs aus der Google Search Console
      {
        source: "/transport-ukraine",
        destination: "/de/ziellaender/transport-ukraine",
        permanent: true,
      },
      {
        source: "/transport-georgien",
        destination: "/de/ziellaender/transport-georgien",
        permanent: true,
      },
      {
        source: "/transport-usbekistan",
        destination: "/de/ziellaender/transport-usbekistan",
        permanent: true,
      },
      {
        source: "/transport-irak",
        destination: "/de/ziellaender/transport-irak",
        permanent: true,
      },
      {
        source: "/transport-irak/",
        destination: "/de/ziellaender/transport-irak",
        permanent: true,
      },
      {
        source: "/transport-kasachstan",
        destination: "/de/ziellaender/transport-kasachstan",
        permanent: true,
      },
      {
        source: "/transport-kirgistan",
        destination: "/de/ziellaender/transport-kirgisistan",
        permanent: true,
      },
      {
        source: "/transport-kirgisistan",
        destination: "/de/ziellaender/transport-kirgisistan",
        permanent: true,
      },
      {
        source: "/transport-mongolei",
        destination: "/de/ziellaender/transport-mongolei",
        permanent: true,
      },
      {
        source: "/transport-tadschikistan",
        destination: "/de/ziellaender/transport-tadschikistan",
        permanent: true,
      },
      {
        source: "/transport-aserbeidschan",
        destination: "/de/ziellaender/transport-aserbaidschan",
        permanent: true,
      },
      {
        source: "/transport-aserbaidschan",
        destination: "/de/ziellaender/transport-aserbaidschan",
        permanent: true,
      },
      {
        source: "/transport-turkmenistan",
        destination: "/de/ziellaender/transport-turkmenistan",
        permanent: true,
      },
      {
        source: "/transport-armenien",
        destination: "/de/ziellaender/transport-armenien",
        permanent: true,
      },

      // Alte Länder ohne neue Detailseite
      {
        source: "/transport-moldau",
        destination: "/de/ziellaender",
        permanent: true,
      },
      {
        source: "/transport-afghanistan",
        destination: "/de/ziellaender",
        permanent: true,
      },
      // Alte Sonderseiten
      {
        source: "/index.php/en/locations",
        destination: "/en/destinations",
        permanent: true,
      },
      {
        source: "/transport-wohin%20sie%20wollen!",
        destination: "/de/transport-anfrage",
        permanent: true,
      },
      {
        source: "/transport-wohin%20sie%20wollen%21",
        destination: "/de/transport-anfrage",
        permanent: true,
      },
      // Alte englische Länder-URLs aus Google Search Console
      {
        source: "/en/transport-armenia",
        destination: "/en/destinations/freight-transport-armenia",
        permanent: true,
      },
      {
        source: "/en/transport-kazakhstan",
        destination: "/en/destinations/freight-transport-kazakhstan",
        permanent: true,
      },
      {
        source: "/en/transport-georgia",
        destination: "/en/destinations/freight-transport-georgia",
        permanent: true,
      },
      {
        source: "/en/transport-iraq",
        destination: "/en/destinations/freight-transport-iraq",
        permanent: true,
      },
      {
        source: "/en/transport-tajikistan",
        destination: "/en/destinations/freight-transport-tajikistan",
        permanent: true,
      },
      {
        source: "/en/transport-kyrgyzstan",
        destination: "/en/destinations/freight-transport-kyrgyzstan",
        permanent: true,
      },

      // Alte englische Übersichtsseite
      {
        source: "/index.php/en/locations",
        destination: "/en/destinations",
        permanent: true,
      },

      // Alte englische Impressums-URL
      {
        source: "/en/impress",
        destination: "/en/legal-notice",
        permanent: true,
      },

      // Alte Länder ohne neue Detailseite
      // Alte Länder ohne neue Detailseite
      {
        source: "/transport-moldau",
        destination: "/de/ziellaender",
        permanent: true,
      },
      {
        source: "/transport-moldau/",
        destination: "/de/ziellaender",
        permanent: true,
      },
      {
        source: "/transport-moldawien",
        destination: "/de/ziellaender",
        permanent: true,
      },
      {
        source: "/transport-moldawien/",
        destination: "/de/ziellaender",
        permanent: true,
      },
      {
        source: "/transport-afghanistan",
        destination: "/de/ziellaender",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
