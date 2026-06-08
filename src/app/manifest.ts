import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GLOBALSPED Internationale Logistik",
    short_name: "GLOBALSPED",
    description:
      "Internationale Transporte, Zollabwicklung und Logistiklösungen.",
    start_url: "/de",
    display: "standalone",
    background_color: "#00281f",
    theme_color: "#003b2f",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
