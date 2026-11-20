import Image from "next/image";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Eyebrow from "@/components/Eyebrow";
import InquiryForm from "@/components/InquiryForm";
import LuxButton from "@/components/LuxButton";
import Reveal from "@/components/Reveal";
import { packageGroups } from "@/content/pages";
import { heroImages } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Wedding & Event Packages in Houston",
  description:
    "Wedding, quinceañera, birthday, gala and corporate event packages in West Houston, with venue, catering and planning included. Request the full brochure.",
  path: "/packages",
  image: heroImages[1],
});

export default function PackagesPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImages[1]}
          alt="Wedding reception package setup at The Bougainvilleas, Houston"
          className="object-cover" fill sizes="100vw" priority quality={85} />
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="relative text-center px-6">
          <Reveal>
            <p className="text-[11px] font-body uppercase tracking-luxe text-champagne/90 mb-6">
              The Bougainvilleas Events
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-silk leading-[0.95] text-shadow-luxe">Packages</h1>
            <p className="font-body text-lg text-silk/80 mt-6 max-w-xl mx-auto">
              Start planning your celebration. Discover packages, pricing, and experiences for weddings, business
              events, quinceañeras, and unforgettable social occasions.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="brochure" className="silk-weave py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>Start Planning</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              Download the
              <br />
              <span className="italic text-gold">brochure.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md leading-relaxed">
              Share a few details and we&apos;ll send our full brochure — including package options, pricing tiers,
              sample menus, and everything you need to begin planning. No obligation, just information.
            </p>
            <div className="mt-10 space-y-4">
              {[
                "Detailed pricing for every room",
                "Sample menus tailored to dietary needs",
                "Customizable add-ons & decor options",
                "Flexible payment plan information",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <p className="font-body text-sm text-obsidian/80">{t}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-10 p-5 bg-champagne/40 rounded-sm">
              <FileText className="w-8 h-8 text-gold flex-shrink-0" />
              <div>
                <p className="font-display text-xl text-obsidian">Full Event Brochure</p>
                <p className="text-[11px] font-body uppercase tracking-wide-luxe text-obsidian/50">
                  PDF · Delivered to your inbox
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-silk border border-champagne/50 p-6 sm:p-8 lg:p-10 shadow-xl rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-gold" />
                <p className="font-display text-2xl text-obsidian">Request Your Brochure</p>
              </div>
              <InquiryForm formKey="brochure" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-obsidian text-silk">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow light>Tailored Packages</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              Built around <span className="italic text-gold">your moment.</span>
            </h2>
          </Reveal>
          <div className="space-y-20">
            {packageGroups.map((g, gi) => (
              <div key={g.key}>
                <Reveal className="flex items-baseline gap-4 mb-8 border-b border-silk/10 pb-4">
                  <span className="font-display text-3xl text-gold/60">0{gi + 1}</span>
                  <h3 className="font-display text-3xl sm:text-4xl text-silk">{g.title}</h3>
                </Reveal>
                <div className={`grid gap-6 ${g.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {g.items.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.1}>
                      <div className="group relative h-[440px] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes={g.items.length === 3 ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                          className="object-cover opacity-45 group-hover:opacity-65 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
                        {p.tag && (
                          <span className="absolute top-6 left-6 bg-gold text-obsidian px-4 py-1.5 rounded-full text-[10px] font-body font-semibold uppercase tracking-wide-luxe">
                            {p.tag}
                          </span>
                        )}
                        <div className="relative h-full flex flex-col justify-end p-8">
                          <h4 className="font-display text-3xl sm:text-4xl text-silk mb-4">{p.name}</h4>
                          <p className="font-body text-sm text-silk/70 leading-relaxed">{p.text}</p>
                          <a
                            href="#brochure"
                            className="inline-flex items-center gap-2 mt-6 text-[11px] font-body font-semibold uppercase tracking-wide-luxe text-gold hover:text-silk transition-colors"
                          >
                            Request Pricing <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-champagne/40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Good To Know</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              Questions about <span className="italic text-gold">what&apos;s included?</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md mx-auto">
              Deposits, menus, dietary needs, outside vendors, payment plans — find every answer in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <LuxButton to="/faq" variant="solid">
                Read the FAQ <ArrowRight className="w-4 h-4" />
              </LuxButton>
              <LuxButton to="/business-events" variant="outline">
                Corporate Events
              </LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
