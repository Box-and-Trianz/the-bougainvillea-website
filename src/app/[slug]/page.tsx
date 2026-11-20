import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import InquiryForm from "@/components/InquiryForm";
import LuxButton from "@/components/LuxButton";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { site, venues } from "@/lib/data";
import { ORG_ID, SITE_URL, abs, breadcrumbJsonLd, graph, pageMeta, postalAddress, snippet } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/** Search-focused page titles for each room (the on-page heading stays the room's name). */
const seoTitles: Record<string, string> = {
  "the-bougainvilleas": "Full Venue Buyout for Up to 350 Guests",
  "the-grand-ballroom": "Grand Ballroom Rental in Houston",
  "the-chapel": "Wedding Chapel in West Houston",
  "the-wine-room": "Private Dining & Wine Room in Houston",
  "the-wedding-suite": "Bridal Suite at Our Houston Venue",
};

/** Search-snippet descriptions (about 150 characters) that lead with what each room is for. */
const seoDescriptions: Record<string, string> = {
  "the-bougainvilleas":
    "Book the entire Bougainvilleas venue in West Houston: Grand Ballroom, Chapel, Wine Room and Wedding Suite for up to 350 seated or 500 theater-style guests.",
  "the-grand-ballroom":
    "Rent the Grand Ballroom in West Houston for weddings, quinceañeras and galas: a light-filled hall seating 300 guests, or 500 theater-style, with catering.",
  "the-chapel":
    "An intimate wedding chapel in West Houston seating 90 guests (220 theater-style), with the Grand Ballroom under the same roof for your reception.",
  "the-wine-room":
    "A candlelit private dining and wine room in West Houston for rehearsal dinners, intimate celebrations and executive dinners, seating up to 32 guests.",
  "the-wedding-suite":
    "A private bridal suite at The Bougainvilleas in West Houston where the wedding party can get ready, relax and take photos before the ceremony.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = venues.find((v) => v.slug === slug);
  if (!venue) return {};
  return pageMeta({
    title: seoTitles[slug] ?? `${venue.name} in Houston`,
    description:
      seoDescriptions[slug] ??
      snippet(`${venue.name} at The Bougainvilleas, West Houston. Holds ${venue.capacitySeated} seated or ${venue.capacityTheater} theater-style. ${venue.blurb}`),
    path: `/${venue.slug}`,
    image: venue.image,
    imageAlt: `${venue.name} at The Bougainvilleas, Houston`,
  });
}

function venueJsonLd(venue: (typeof venues)[number]) {
  return graph(
    {
      "@type": ["Place", "EventVenue"],
      "@id": `${SITE_URL}/${venue.slug}#place`,
      name: `${venue.name} at The Bougainvilleas`,
      description: venue.description,
      url: abs(`/${venue.slug}`),
      image: [venue.image, ...venue.gallery.slice(0, 5)].map(abs),
      maximumAttendeeCapacity: Math.max(venue.capacitySeated, venue.capacityTheater),
      address: postalAddress,
      containedInPlace: { "@id": ORG_ID },
    },
    breadcrumbJsonLd([
      ["Venues", "/gallery"],
      [venue.name, `/${venue.slug}`],
    ])
  );
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params;
  const idx = venues.findIndex((v) => v.slug === slug);
  if (idx === -1) notFound();
  const venue = venues[idx];
  const prev = venues[(idx - 1 + venues.length) % venues.length];
  const next = venues[(idx + 1) % venues.length];

  return (
    <>
      <JsonLd data={venueJsonLd(venue)} />
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={venue.gallery[0]} alt={`${venue.name} at The Bougainvilleas event venue in Houston`} className="object-cover" fill sizes="100vw" priority quality={85} />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-obsidian/40" />
        </div>
        <div className="relative mx-auto max-w-[1400px] w-full px-6 lg:px-10 pb-16">
          <Reveal>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[11px] font-body uppercase tracking-wide-luxe text-champagne/80 hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-3 h-3" /> All Rooms
            </Link>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-silk leading-[0.95] text-shadow-luxe">{venue.name}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-champagne/90">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span className="font-body text-sm">{venue.capacitySeated} seated</span>
              </div>
              <span className="h-4 w-px bg-champagne/30" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span className="font-body text-sm">{venue.capacityTheater} theater</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <Eyebrow>The Space</Eyebrow>
            <p className="font-display text-3xl lg:text-4xl text-obsidian mt-6 leading-[1.3]">{venue.blurb}</p>
            <p className="font-body text-base sm:text-lg text-obsidian/70 mt-8 leading-[1.7]">{venue.description}</p>
            {venue.facts && (
              <ul className="grid sm:grid-cols-2 gap-px bg-obsidian/10 mt-10 border border-obsidian/10">
                {venue.facts.map((f) => (
                  <li key={f} className="bg-silk px-5 py-4 flex items-center gap-3 font-body text-sm text-obsidian/80">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <LuxButton to="/packages" variant="outline">
                View Packages <ArrowRight className="w-4 h-4" />
              </LuxButton>
              <LuxButton to="/schedule-a-tour" variant="solid">
                Schedule a Tour
              </LuxButton>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative overflow-hidden arch-mask h-[400px] sm:h-[460px]">
              <Image
                src={venue.gallery[1] || venue.gallery[0]}
                alt={`${venue.name} interior detail, The Bougainvilleas Houston`}
                className="object-cover" fill sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {venue.gallery.length > 1 && (
        <section className="py-24 lg:py-32 bg-champagne/40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Reveal>
              <Eyebrow>The Gallery</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">Every angle, considered.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {venue.gallery.map((src, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div
                    className={`group relative overflow-hidden arch-mask ${
                      i % 3 === 0 ? "md:row-span-2 h-[420px] md:h-[640px]" : "h-[420px]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${venue.name} at The Bougainvilleas, Houston: photo ${i + 1}`}
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" fill sizes="(min-width: 768px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/15 transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[10px] font-body uppercase tracking-luxe text-silk">View Details</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>Reserve This Room</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              Imagine your
              <br />
              celebration <span className="italic text-gold">here.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md leading-relaxed">
              Tell us about your event and we&apos;ll prepare a tailored proposal — including availability, package
              options, and a private tour of {venue.name}.
            </p>
            <div className="mt-8">
              <a href={`tel:${site.phone}`} className="font-display text-3xl text-obsidian hover:text-gold transition-colors">
                {site.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-champagne/30 p-6 sm:p-8 lg:p-10 rounded-sm">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-obsidian/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 grid grid-cols-2 gap-4">
          <Link href={`/${prev.slug}`} className="group flex items-center gap-3 sm:gap-4">
            <div className="relative overflow-hidden arch-mask w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
              <Image src={prev.image} alt={prev.name} className="object-cover" fill sizes="96px" />
            </div>
            <div>
              <p className="text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/40">Previous</p>
              <p className="font-display text-lg sm:text-xl leading-tight text-obsidian group-hover:text-gold transition-colors">{prev.name}</p>
            </div>
          </Link>
          <Link href={`/${next.slug}`} className="group flex items-center gap-3 sm:gap-4 justify-end text-right">
            <div>
              <p className="text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/40">Next</p>
              <p className="font-display text-lg sm:text-xl leading-tight text-obsidian group-hover:text-gold transition-colors">{next.name}</p>
            </div>
            <div className="relative overflow-hidden arch-mask w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
              <Image src={next.image} alt={next.name} className="object-cover" fill sizes="96px" />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
