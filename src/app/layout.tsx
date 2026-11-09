import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "مكتب السعدي للاستشارات القانونية والخدمات الإجرائية",
    template: "%s | مكتب السعدي",
  },
  description:
    "مكتب السعدي للاستشارات القانونية والخدمات الإجرائية: قضايا، استشارات، تأسيس شركات، وتصاريح وتراخيص للأفراد والشركات.",
  openGraph: {
    title: "مكتب السعدي للاستشارات القانونية والخدمات الإجرائية",
    description:
      "منظومة خدمات قانونية وإجرائية للأفراد والشركات مع متابعة منظمة وسرية مهنية.",
    locale: "ar_EG",
    type: "website",
    images: [
      { url: "/images/logo.png", width: 1200, height: 800 },
      { url: "/images/hero.jpg", width: 1200, height: 900 },
    ],
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${ibm.variable} h-full`}>
      <body className="min-h-full overflow-x-hidden bg-paper font-sans text-char antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
