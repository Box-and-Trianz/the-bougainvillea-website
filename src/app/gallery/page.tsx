"use client";

import Image from "next/image";
import { ArrowRight, Quote, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import LuxButton from "@/components/LuxButton";
import Reveal from "@/components/Reveal";
import { heroImages, venues } from "@/lib/data";

export default function GalleryPage() {
  const [view, setView] = useState<"seated" | "theater">("seated");

  const toggleCls = (active: boolean) =>
    `px-6 py-2.5 rounded-full text-[11px] font-body font-semibold uppercase tracking-wide-luxe transition-all ${
      active ? "bg-obsidian text-silk" : "text-obsidian/60"
    }`;

  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImages[2]}
          alt="Event spaces at The Bougainvilleas venue in West Houston"
          className="object-cover" fill sizes="100vw" priority quality={85} />
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="relative text-center px-6">
          <Reveal>
            <p className="text-[11px] font-body uppercase tracking-luxe text-champagne/90 mb-6">The Venue</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-silk leading-[0.95] text-shadow-luxe">
              Pick Your Room
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 silk-weave">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <Eyebrow>Explore Our Spaces</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
                Find the room
                <br />
                <span className="italic text-gold">for your guest count.</span>
              </h2>
            </div>
            <div>
              <p className="text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50 mb-3">
                Toggle capacity view
              </p>
              <div className="inline-flex bg-champagne/40 rounded-full p-1">
                <button onClick={() => setView("seated")} className={toggleCls(view === "seated")}>
                  Seated
                </button>
                <button onClick={() => setView("theater")} className={toggleCls(view === "theater")}>
                  Theater
                </button>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 3) * 0.1}>
                <Link href={`/${v.slug}`} className="group block h-full">
                  <div className="relative overflow-hidden arch-mask h-[440px]">
                    <Image
                      src={v.image}
                      alt={v.name}
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-obsidian/30 transition-colors duration-500" />
                    <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full">
                      <span className="font-display text-2xl text-obsidian">
                        {view === "seated" ? v.capacitySeated : v.capacityTheater}
                      </span>
                      <span className="text-[9px] font-body uppercase tracking-wide-luxe text-obsidian/50 ml-1">
                        {view === "seated" ? "seated" : "theater"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="text-[10px] font-body uppercase tracking-luxe text-silk/80 mb-2 flex items-center gap-2">
                        <Users className="w-3 h-3 text-gold" />
                        {v.capacitySeated} seated · {v.capacityTheater} theater
                      </p>
                      <h3 className="font-display text-3xl text-silk text-shadow-luxe">{v.name}</h3>
                      <p className="font-body text-xs text-silk/70 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {v.blurb}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-4 text-[10px] font-body font-semibold uppercase tracking-wide-luxe text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-champagne/40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Quote className="w-10 h-10 text-gold/40 mx-auto mb-8" />
            <blockquote className="font-display text-3xl lg:text-5xl text-obsidian leading-[1.3] italic">
              To create something exceptional, your mindset must be relentlessly focused on the smallest detail.
            </blockquote>
            <p className="font-body text-sm uppercase tracking-luxe text-gold mt-8">— Giorgio Armani</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Begin</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              Your room is
              <br />
              <span className="italic text-gold">waiting.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md mx-auto">
              Whether you&apos;re celebrating a wedding or hosting a corporate event, our all-inclusive venue is the
              perfect place for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <LuxButton to="/packages" variant="gold">
                View Packages <ArrowRight className="w-4 h-4" />
              </LuxButton>
              <LuxButton to="/the-grand-ballroom" variant="outline">
                Tour the Ballroom
              </LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
