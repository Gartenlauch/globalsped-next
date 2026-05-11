import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Globalsped International GmbH",
    short_name: "Globalsped",
    description: "Internationale Transporte zwischen Europa, Zentralasien, Kaukasus und dem Mittleren Osten.",
    start_url: "/de",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003b2f",
    icons: [
      {
        src: "/favIcon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
