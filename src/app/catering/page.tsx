import { ArrowRight, Check, ChefHat, Quote, Truck } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import LuxButton from "@/components/LuxButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { cateringGallery, cateringPartners, cuisines, dietaryOptions } from "@/content/pages";
import { site } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Event Catering Services in Houston, TX",
  description:
    "Chef-crafted event catering in Houston: American, Cajun, barbecue, Mexican, Italian, French, Mediterranean, sushi and vegan menus, served onsite or offsite.",
  path: "/catering",
  image: "/images/catering/plated-dinner.jpg",
});

export default function CateringPage() {
  return (
    <>
      <PageHero
        image="/images/catering/plated-dinner.jpg"
        alt="Plated dinner by the in-house catering team at The Bougainvilleas, Houston"
        eyebrow="Your Style · Your Taste"
        title="Catering"
        subtitle="Every chef-crafted entrée fashioned from the freshest ingredients and original recipes."
      />

      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-7">
            <Eyebrow>From Our Kitchen</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              A cosmopolitan menu,
              <br />
              <span className="italic text-gold">made with pride.</span>
            </h2>
            <div className="space-y-5 mt-8 font-body text-base text-obsidian/70 leading-[1.7]">
              <p>
                With each chef-crafted entrée and with every dish served, we take pride in what we do. At The
                Bougainvilleas, every meal we serve is fashioned out of the freshest ingredients and original recipes.
                Our catering department specializes in a variety of classical and original cuisines from around the
                world.
              </p>
              <p>
                Ask today about our exclusive <strong className="font-semibold text-obsidian">Chef Javier Solis</strong>{" "}
                menu and desserts.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {cuisines.map((c) => (
                <span
                  key={c}
                  className="px-4 py-2 bg-silk border border-champagne/60 rounded-full text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/70"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative overflow-hidden arch-mask h-[460px] sm:h-[560px] max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/catering/chef-in-kitchen.jpg"
                alt="Chef preparing food in The Bougainvilleas kitchen"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-obsidian text-silk">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow light>For Every Table</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              Something for <span className="italic text-gold">every guest.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-silk/10">
            <Reveal>
              <div className="bg-obsidian p-8 lg:p-10 h-full">
                <ChefHat className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-display text-3xl text-silk mb-4">Global Partners</h3>
                <p className="font-body text-sm text-silk/60 leading-relaxed mb-6">
                  For clients with a taste for Persian, Vietnamese or South Asian cuisine, we partner with some of
                  Houston&apos;s most loved kitchens.
                </p>
                <ul className="space-y-3">
                  {cateringPartners.map((p) => (
                    <li key={p.name} className="flex items-baseline justify-between border-b border-silk/10 pb-3">
                      <span className="font-display text-xl text-silk">{p.name}</span>
                      <span className="text-[10px] font-body uppercase tracking-wide-luxe text-gold">{p.cuisine}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-obsidian p-8 lg:p-10 h-full">
                <Check className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-display text-3xl text-silk mb-4">Dietary Needs</h3>
                <p className="font-body text-sm text-silk/60 leading-relaxed mb-6">
                  Six in-house menus, each tailored to your guests. Ask us about any restriction — we&apos;ll design
                  around it.
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-[12px] font-body text-silk/80">
                      <span className="w-1 h-1 rounded-full bg-gold" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-obsidian p-8 lg:p-10 h-full">
                <Truck className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-display text-3xl text-silk mb-4">Offsite Catering</h3>
                <p className="font-body text-sm text-silk/60 leading-relaxed">
                  Hosting at a different location? Our full-service catering department will serve the menu of your
                  choice anywhere — weddings, cocktail receptions or corporate celebrations — so you can simply enjoy
                  your event.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-champagne/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow>The Menu, Plated</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
                A taste of <span className="italic text-gold">what&apos;s to come.</span>
              </h2>
            </div>
            <figure className="max-w-md">
              <Quote className="w-6 h-6 text-gold/40 mb-3" />
              <blockquote className="font-body text-sm text-obsidian/70 italic leading-relaxed">
                &ldquo;I don&apos;t know what y&apos;all put in your food, but it was HEAVENLY!&rdquo;
              </blockquote>
              <figcaption className="text-[10px] font-body uppercase tracking-wide-luxe text-gold mt-2">
                Aubri N. · Mother&apos;s Day 2020
              </figcaption>
            </figure>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {cateringGallery.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.05}>
                <div className="group relative aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={src}
                    alt={`Catering by The Bougainvilleas, dish ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Design Your Menu</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              Let&apos;s plan <span className="italic text-gold">your menu.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md mx-auto">
              Complimentary tastings are offered to booked clients. Contact us today to design your favorite menu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <LuxButton to="/contact" variant="gold">
                Contact Catering <ArrowRight className="w-4 h-4" />
              </LuxButton>
              <a
                href={`tel:${site.phone}`}
                className="font-display text-2xl text-obsidian hover:text-gold transition-colors"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
