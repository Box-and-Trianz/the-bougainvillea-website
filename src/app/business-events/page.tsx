import { ArrowRight, Briefcase, Car, Layers, MapPin, Sparkles, Users } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { CorporateInquiryForm } from "@/components/Forms";
import LuxButton from "@/components/LuxButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  bookingSteps,
  corporateGallery,
  corporateReasons,
  corporateSpaces,
  corporateUses,
  locationPoints,
} from "@/content/pages";
import { site } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Corporate Event Venue in West Houston",
  description:
    "Host corporate events in West Houston: galas, board meetings, product launches and training days, with in-house catering, A/V and 250+ parking spaces.",
  path: "/business-events",
  image: "/images/corporate/hero.jpg",
});

const reasonIcons = [Sparkles, Layers, Briefcase, Car];

export default function BusinessEventsPage() {
  return (
    <>
      <PageHero
        image="/images/corporate/hero.jpg"
        alt="Corporate event setup at The Bougainvilleas in West Houston"
        eyebrow="Business · Corporate · Professional"
        title={
          <>
            Corporate <span className="italic text-gold">Events</span>
          </>
        }
        subtitle="Host your next corporate event at Houston's premier venue."
        height="h-[65vh] min-h-[480px]"
      />

      {/* Why businesses choose us */}
      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <Eyebrow className="justify-center">Why Businesses Choose Us</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              The details that <span className="italic text-gold">reflect on you.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-obsidian/10">
            {corporateReasons.map((r, i) => {
              const Icon = reasonIcons[i];
              return (
                <Reveal key={r.title} delay={i * 0.08}>
                  <div className="bg-silk p-8 h-full hover:bg-champagne/30 transition-colors">
                    <Icon className="w-7 h-7 text-gold mb-6" />
                    <p className="text-[10px] font-body uppercase tracking-wide-luxe text-gold mb-2">{r.subtitle}</p>
                    <h3 className="font-display text-2xl text-obsidian mb-4">{r.title}</h3>
                    <p className="font-body text-sm text-obsidian/70 leading-relaxed">{r.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three spaces */}
      <section className="py-24 lg:py-32 bg-obsidian text-silk">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow light>Three Spaces</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              Infinite <span className="italic text-gold">possibilities.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {corporateSpaces.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <Link href={`/${s.slug}`} className="group relative block h-[440px] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <p className="text-[10px] font-body uppercase tracking-luxe text-gold mb-3 flex items-center gap-2">
                      <Users className="w-3 h-3" /> {s.capacity}
                    </p>
                    <h3 className="font-display text-4xl text-silk mb-4">{s.name}</h3>
                    <p className="font-body text-sm text-silk/70 leading-relaxed">{s.text}</p>
                    <span className="inline-flex items-center gap-2 mt-6 text-[11px] font-body font-semibold uppercase tracking-wide-luxe text-gold group-hover:text-silk transition-colors">
                      View the Room <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal uses */}
      <section className="py-24 lg:py-32 bg-champagne/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <Eyebrow>Daytime & Evening</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              Ideal uses for
              <br />
              <span className="italic text-gold">business events.</span>
            </h2>
            <div className="relative overflow-hidden arch-mask h-[320px] sm:h-[400px] mt-10 hidden sm:block">
              <Image
                src="/images/corporate/venue-and-catering.jpg"
                alt="Corporate event setup at The Bougainvilleas"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-obsidian/10">
            {corporateUses.map((u, i) => (
              <Reveal key={u} delay={(i % 2) * 0.06}>
                <div className="bg-silk p-6 sm:p-7 h-full flex items-start gap-4">
                  <span className="font-display text-xl text-gold/50 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-body text-sm text-obsidian/80 leading-relaxed">{u}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-4 bg-silk">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {corporateGallery.map((src, i) => (
            <div key={src} className="group relative aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt={`Corporate event at The Bougainvilleas ${i + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="py-24 lg:py-32 silk-weave">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <Eyebrow>Convenient · Accessible · Stress-Free</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              A location that works for your
              <span className="italic text-gold"> entire guest list.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md leading-relaxed">
              Corporate event logistics shouldn&apos;t be a headache. At The Bougainvilleas, they&apos;re part of what
              sets your event apart.
            </p>
            <div className="flex items-center gap-3 mt-8 text-obsidian/70">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="font-body text-sm">
                {site.address}, {site.city}
              </span>
            </div>
          </Reveal>
          <div className="space-y-px bg-obsidian/10">
            {locationPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="bg-silk py-6 flex flex-col sm:flex-row gap-2 sm:gap-8">
                  <p className="font-display text-xl text-obsidian sm:w-48 flex-shrink-0">{p.title}</p>
                  <p className="font-body text-sm text-obsidian/70 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking steps */}
      <section className="py-24 lg:py-32 bg-obsidian text-silk">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow light>How to Book</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              From walkthrough to <span className="italic text-gold">celebratory toast.</span>
            </h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-silk/10">
            {bookingSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className="bg-obsidian p-8 h-full">
                  <p className="font-display text-5xl text-gold/60 leading-none">{i + 1}</p>
                  <h3 className="font-display text-2xl text-silk mt-5 mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-silk/60 leading-relaxed">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Event Inquiry</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              Let&apos;s plan your
              <br />
              <span className="italic text-gold">next gathering.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md leading-relaxed">
              Need help right now? Reach us at{" "}
              <a href={`tel:${site.phone}`} className="text-obsidian border-b border-gold hover:text-gold">
                {site.phone}
              </a>{" "}
              or{" "}
              <a href={`mailto:${site.email}`} className="text-obsidian border-b border-gold hover:text-gold break-all">
                {site.email}
              </a>
              . We&apos;re here to help.
            </p>
            <div className="mt-10">
              <LuxButton to="/packages" variant="outline">
                Corporate Packages <ArrowRight className="w-4 h-4" />
              </LuxButton>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="bg-champagne/30 p-6 sm:p-8 lg:p-10 rounded-sm">
              <CorporateInquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
