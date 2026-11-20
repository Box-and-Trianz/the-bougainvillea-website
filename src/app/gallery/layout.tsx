import JsonLd from "@/components/JsonLd";
import { heroImages } from "@/lib/data";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

// The gallery page is a client component, so its metadata lives here.
export const metadata = pageMeta({
  title: "Event Spaces & Ballroom Rental in Houston",
  description:
    "Compare our West Houston event spaces: the Grand Ballroom (300 seated), Chapel (90), Wine Room (32), Wedding Suite, or the full venue for up to 350 guests.",
  path: "/gallery",
  image: heroImages[2],
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbJsonLd([["Venues", "/gallery"]]) }} />
      {children}
    </>
  );
}
