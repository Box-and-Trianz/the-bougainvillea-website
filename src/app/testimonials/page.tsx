import { Quote, Star } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import LuxButton from "@/components/LuxButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { moreTestimonials, type Review } from "@/content/pages";
import { heroImages, testimonials } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Reviews from Couples & Event Hosts",
  description:
    "Read reviews from couples, families and companies who held weddings, quinceañeras, galas and corporate events at The Bougainvilleas in West Houston.",
  path: "/testimonials",
  image: heroImages[3],
});

const stars = [0, 1, 2, 3, 4];
const reviews: Review[] = [...testimonials, ...moreTestimonials];
const initials = (name: string) =>
  name
    .replace(/[^A-Za-z& ]/g, "")
    .split(/\s+|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

export default function TestimonialsPage() {
  return (
    <>
      <PageHero image={heroImages[3]} alt="Wedding celebration at The Bougainvilleas in Houston" eyebrow="Loved By Houston" title="Testimonials">
        <div className="flex justify-center gap-1 mb-6">
          {stars.map((i) => (
            <Star key={i} className="w-5 h-5 fill-gold text-gold" />
          ))}
        </div>
      </PageHero>

      <section className="py-24 lg:py-32 silk-weave">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <Eyebrow className="justify-center">Real Celebrations</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              Stories from our
              <br />
              <span className="italic text-gold">guests.</span>
            </h2>
            <p className="font-body text-sm uppercase tracking-wide-luxe text-obsidian/50 mt-6">
              {reviews.length} reviews · 5.0 average
            </p>
          </Reveal>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {reviews.map((t, i) => (
              <div key={t.name + i} className="break-inside-avoid mb-6">
                <Reveal delay={(i % 3) * 0.08}>
                  <div className="bg-silk border border-champagne/50 p-7 sm:p-8 rounded-sm hover:border-gold/40 transition-colors">
                    <div className="flex items-center gap-1 mb-4">
                      {stars.map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-gold/30 mb-3" />
                    <p className="font-body text-sm text-obsidian/75 leading-relaxed italic mb-6">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-champagne/50">
                      {t.avatar ? (
                        <Image src={t.avatar} alt={t.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <span className="w-12 h-12 rounded-full bg-champagne/60 flex items-center justify-center font-display text-lg text-gold flex-shrink-0">
                          {initials(t.name)}
                        </span>
                      )}
                      <div>
                        <p className="font-display text-lg text-obsidian leading-tight">{t.name}</p>
                        <p className="text-[10px] font-body uppercase tracking-wide-luxe text-gold">{t.event}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-obsidian text-silk">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow light>Your Turn</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              Write your own
              <br />
              <span className="italic text-gold">love story.</span>
            </h2>
            <p className="font-body text-base text-silk/60 mt-6 max-w-md mx-auto">
              Join the hundreds of Houston families who&apos;ve celebrated their greatest moments at The Bougainvilleas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <LuxButton to="/schedule-a-tour" variant="gold">
                Schedule a Tour
              </LuxButton>
              <LuxButton to="/gallery" variant="outlineLight">
                Explore Rooms
              </LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
