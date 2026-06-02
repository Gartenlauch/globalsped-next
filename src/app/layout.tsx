import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, siteUrl } from "@/content/metadata/config";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.siteName,
  title: {
    default: "GLOBALSPED",
    template: "%s",
  },
  robots: { // das geöhrt mit der robot.ts geändert damit google index funktioniert
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(process.env.NEXT_PUBLIC_SITE_URL, '-----------------')
  return (
    <html lang="de" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
