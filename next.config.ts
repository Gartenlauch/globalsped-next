import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [45, 60, 70, 72, 75, 80, 90],
  },

  async redirects() {
    return [
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
        destination: "/de/ziellaender",
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

      // EN ist später geplant, deshalb nicht permanent cachen
      {
        source: "/en",
        destination: "/de",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;