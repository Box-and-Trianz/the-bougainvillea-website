import { ArrowRight, Quote } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import LuxButton from "@/components/LuxButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { culture, designQuotes, team } from "@/content/pages";

export const metadata: Metadata = pageMeta({
  title: "Our Family: Owners, Chef & Planning Team",
  description:
    "Meet the family behind The Bougainvilleas in West Houston: owner Badra Andrews, Chef Javier Solis and the planning team behind every celebration since 2013.",
  path: "/our-family",
  image: "/images/our-family/front-entrance.jpg",
});

export default function OurFamilyPage() {
  return (
    <>
      <PageHero image="/images/our-family/front-entrance.jpg" alt="Front entrance of The Bougainvilleas on Westheimer Road, Houston" eyebrow="The People Behind the Celebrations" title="Our Family" />

      {/* Culture */}
      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <Eyebrow>Our Culture</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              Rooted in values,
              <br />
              <span className="italic text-gold">held in harmony.</span>
            </h2>
            <div className="flex flex-wrap gap-2 mt-8">
              {culture.values.map((v) => (
                <span
                  key={v}
                  className="px-4 py-2 border border-champagne/60 rounded-full text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/70"
                >
                  {v}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="space-y-5 font-body text-base text-obsidian/70 leading-[1.8]">
              {culture.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      {team.map((m, i) => (
        <section key={m.name} className={i % 2 === 0 ? "py-24 lg:py-32 bg-champagne/40" : "py-24 lg:py-32"}>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div className="relative overflow-hidden arch-mask h-[460px] sm:h-[560px]">
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-6 left-6 sm:left-auto sm:-right-6 bg-silk px-6 sm:px-8 py-5 shadow-xl border border-champagne/50">
                  <p className="font-display text-2xl sm:text-3xl text-obsidian leading-none">{m.name}</p>
                  <p className="text-[10px] font-body uppercase tracking-wide-luxe text-gold mt-2">{m.role}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Eyebrow>{m.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
                {m.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="italic text-gold">{m.title.split(" ").slice(-1)}</span>
              </h2>
              <div className="space-y-5 mt-8 font-body text-base text-obsidian/70 leading-[1.7]">
                {m.bio.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <figure className="mt-10 border-l-2 border-gold pl-6">
                <blockquote className="font-display text-2xl italic text-obsidian">&ldquo;{m.quote.text}&rdquo;</blockquote>
                <figcaption className="text-[10px] font-body uppercase tracking-wide-luxe text-gold mt-3">
                  — {m.quote.author}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Design */}
      <section className="py-24 lg:py-32 bg-obsidian text-silk overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <Eyebrow light>Design</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6 leading-[1.05]">
              Every room,
              <br />
              <span className="italic text-gold">dressed with intention.</span>
            </h2>
            <p className="font-body text-base text-silk/60 mt-6 max-w-md leading-relaxed">
              Linens, candles and centerpieces are part of every booking — and our team works alongside your décor
              vendors so the room looks exactly the way you pictured it.
            </p>
            <div className="mt-10 space-y-6">
              {designQuotes.map((q) => (
                <div key={q.author} className="flex gap-4">
                  <Quote className="w-6 h-6 text-gold/50 flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm text-silk/80 italic leading-relaxed">&ldquo;{q.text}&rdquo;</p>
                    <p className="text-[10px] font-body uppercase tracking-wide-luxe text-gold mt-2">{q.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden arch-mask h-[460px] sm:h-[560px] max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/our-family/design.jpg"
                alt="Event decor and linens at The Bougainvilleas"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Come Say Hello</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              We&apos;d love to <span className="italic text-gold">meet you.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <LuxButton to="/schedule-a-tour" variant="gold">
                Schedule a Tour <ArrowRight className="w-4 h-4" />
              </LuxButton>
              <LuxButton to="/testimonials" variant="outline">
                Read Reviews
              </LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
