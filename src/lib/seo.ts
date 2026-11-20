import type { Metadata } from "next";
import { site, venues } from "./data";

/**
 * Public URL of the live site. Canonical links, the sitemap and structured data are built from it.
 * Set NEXT_PUBLIC_SITE_URL if the site moves to another domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebougainvilleas.com").replace(/\/$/, "");

/**
 * Only the production deployment may be indexed. Vercel preview/development deployments get
 * `noindex` so they never compete with the real site in search results.
 */
export const INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

export const DEFAULT_OG_IMAGE = "/og/default.jpg";
export const BRAND = site.name;

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

type PageMetaInput = {
  /** Page-specific part of the title. " | The Bougainvilleas" is appended unless `absoluteTitle` is set. */
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

/** Title, description, canonical URL, Open Graph and Twitter tags for one page. */
export function pageMeta({ title, description, path, image, imageAlt, absoluteTitle, type = "website" }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BRAND}`;
  const img = { url: image ?? DEFAULT_OG_IMAGE, alt: imageAlt ?? `${BRAND}, event venue in West Houston` };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: BRAND,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [img.url] },
  };
}

/** Trim text to a search-snippet-friendly length on a word boundary. */
export function snippet(text: string, max = 155) {
  const clean = text.replace(/[*_#>`]/g, "").replace(/\s+/g, " ").replace(/…$/, "").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max - 1)).replace(/[,;:.\s—–-]+$/, "") + "…";
}

/* ----------------------------- Structured data ----------------------------- */

const [street, cityLine] = [site.address, site.city];
const [, region = "TX", postal = ""] = cityLine.match(/,\s*([A-Z]{2})\s*(\d{5})/) ?? [];

export const ORG_ID = `${SITE_URL}/#venue`;

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: street,
  addressLocality: "Houston",
  addressRegion: region,
  postalCode: postal,
  addressCountry: "US",
};

/** The business itself: a local business that is also an event venue. Rendered on every page. */
export function businessJsonLd() {
  return {
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": ORG_ID,
    name: BRAND,
    alternateName: "The Bougainvilleas Event Center",
    slogan: "Second chances, first dances",
    description:
      "Boutique wedding and event venue in West Houston with a Grand Ballroom, Chapel, Wine Room and Wedding Suite, in-house catering and a dedicated planning team.",
    url: SITE_URL,
    logo: abs("/apple-icon.png"),
    image: [abs(DEFAULT_OG_IMAGE), abs(venues[0]?.image ?? "/images/hero/hero-1.jpg")],
    telephone: `+1-${site.phone}`,
    email: site.email,
    address: postalAddress,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BRAND}, ${street}, ${cityLine}`)}`,
    areaServed: ["Houston", "West Houston", "Katy", "Sugar Land", "Energy Corridor", "Westchase", "Memorial"].map((name) => ({ "@type": "Place", name })),
    foundingDate: "2013",
    maximumAttendeeCapacity: 500,
    priceRange: "$$$",
    currenciesAccepted: "USD",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "On-site parking (250+ spaces)", value: true },
      { "@type": "LocationFeatureSpecification", name: "In-house catering", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bridal suite", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-site chapel", value: true },
      { "@type": "LocationFeatureSpecification", name: "Audio/visual equipment", value: true },
    ],
    containsPlace: venues.map((v) => ({ "@id": `${SITE_URL}/${v.slug}#place` })),
    sameAs: Object.values(site.social),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

/** Breadcrumb trail for a page, e.g. [["Venues", "/gallery"], ["The Chapel", "/the-chapel"]]. */
export function breadcrumbJsonLd(trail: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as const, ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

/** Wrap one or more schema.org nodes into a single JSON-LD graph. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
