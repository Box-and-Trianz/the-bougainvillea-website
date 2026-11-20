import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import { BRAND, DEFAULT_OG_IMAGE, INDEXABLE, SITE_URL, businessJsonLd, graph, websiteJsonLd } from "@/lib/seo";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ScrollToTop from "@/components/ScrollToTop";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wedding & Event Venue in Houston, TX | The Bougainvilleas",
    template: "%s | The Bougainvilleas",
  },
  description:
    "Boutique wedding and event venue in West Houston with a Grand Ballroom for up to 350 seated guests, a chapel, wine room and in-house catering.",
  applicationName: BRAND,
  category: "Event Venue",
  creator: BRAND,
  publisher: BRAND,
  formatDetection: { telephone: true, email: true, address: true },
  robots: INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  openGraph: { siteName: BRAND, locale: "en_US", type: "website", images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image" },
  // Paste the codes from Google Search Console / Bing Webmaster Tools into these env vars.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Houston",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <JsonLd data={graph(businessJsonLd(), websiteJsonLd())} />
        <ScrollToTop />
        <div className="min-h-screen bg-silk flex flex-col overflow-x-clip">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCTA />
        </div>
      </body>
    </html>
  );
}
