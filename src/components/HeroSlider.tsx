"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { heroImages } from "@/lib/data";
import LuxButton from "./LuxButton";
import Reveal from "./Reveal";

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={src} alt={`The Bougainvilleas wedding and event venue in Houston, TX: photo ${i + 1}`} className="object-cover" fill sizes="100vw" priority={i === 0} quality={85} />
        </div>
      ))}
      <div className="absolute inset-0 bg-obsidian/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/50" />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <Reveal>
          <p className="text-[11px] font-body uppercase tracking-luxe text-champagne/90 mb-8">
            West Houston&apos;s Premier Event Venue · Est. 2013
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] text-silk leading-[0.92] text-shadow-luxe">
            Where Houston
            <br />
            <span className="italic text-gold">Celebrates</span> Its
            <br />
            Greatest Stories
          </h1>
          <p className="font-body text-lg text-silk/80 mt-8 max-w-2xl mx-auto leading-relaxed">
            A boutique venue on Westheimer Road — grand ballroom, intimate chapel, and wine room — where every
            celebration receives our full attention.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <LuxButton to="/packages" variant="gold">
              Explore Packages <ArrowRight className="w-4 h-4" />
            </LuxButton>
            <LuxButton to="/gallery" variant="outlineLight">
              Tour the Rooms
            </LuxButton>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-gold" : "w-4 bg-silk/40"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
