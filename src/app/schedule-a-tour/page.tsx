import { Check, Clock, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import { TourRequestForm } from "@/components/Forms";
import Reveal from "@/components/Reveal";
import { site, venues } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Schedule a Private Venue Tour",
  description:
    "Book a private tour of The Bougainvilleas in West Houston. See the Grand Ballroom, Chapel, Wine Room and Wedding Suite in person or by video call.",
  path: "/schedule-a-tour",
  image: "/images/hero/hero-2.jpg",
});

const expect = [
  "A walk through the Grand Ballroom, Chapel, Wine Room & Wedding Suite",
  "Package options and pricing tailored to your guest count",
  "Menu ideas from our in-house culinary team",
  "Available dates — we book only one wedding per day",
];

export default function ScheduleTourPage() {
  return (
    <section className="silk-weave pt-36 lg:pt-44 pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Venue Tour</Eyebrow>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-obsidian mt-6 leading-[1]">
            Schedule your
            <br />
            <span className="italic text-gold">private tour.</span>
          </h1>
          <p className="font-body text-base text-obsidian/60 mt-6 max-w-md leading-relaxed">
            See the ballroom in event lighting, walk the chapel, and feel the wine room. Our team tailors every visit to
            your celebration — no pressure, just possibility.
          </p>

          <p className="text-[10px] font-body uppercase tracking-luxe text-gold mt-10 mb-4">What to expect</p>
          <ul className="space-y-3">
            {expect.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-gold" />
                </span>
                <span className="font-body text-sm text-obsidian/80 leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-10">
            {venues.slice(0, 3).map((v) => (
              <div key={v.slug}>
                <div className="relative overflow-hidden arch-mask h-28 sm:h-36">
                  <Image src={v.image} alt={v.name} fill sizes="(min-width: 1024px) 13vw, 33vw" className="object-cover" />
                </div>
                <p className="font-display text-sm sm:text-base text-obsidian mt-2 leading-tight">{v.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-3 text-obsidian/70">
            <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-gold transition-colors">
              <Phone className="w-4 h-4 text-gold" /> <span className="font-body text-sm">{site.phone}</span>
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="font-body text-sm">
                {site.address}, {site.city}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gold" />
              <span className="font-body text-sm">Tuesday–Saturday by appointment</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="bg-silk border border-champagne/50 p-6 sm:p-8 lg:p-10 shadow-xl rounded-sm">
            <p className="font-display text-3xl text-obsidian mb-1">Request a Visit</p>
            <p className="font-body text-sm text-obsidian/60 mb-8">Choose a date and time — we&apos;ll confirm within one business day.</p>
            <TourRequestForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
