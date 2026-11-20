import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Eyebrow from "@/components/Eyebrow";
import FaqAccordion from "@/components/FaqAccordion";
import LuxButton from "@/components/LuxButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { faqGroups } from "@/content/pages";
import { heroImages, site } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Venue FAQs: Capacity, Catering & Payments",
  description:
    "Answers to common questions about The Bougainvilleas in Houston: guest capacity, catering, deposits and payments, outside vendors and event-day logistics.",
  path: "/faq",
  image: heroImages[4],
});

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero image={heroImages[4]} alt="Reception setup at The Bougainvilleas event venue, Houston" eyebrow="Good To Know" title="Questions & Answers" />

      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-12 lg:mb-16">
            <Eyebrow>Frequently Asked</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              Everything you need
              <br />
              <span className="italic text-gold">before you say yes.</span>
            </h2>
          </Reveal>
          <FaqAccordion groups={faqGroups} />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-obsidian text-silk">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow light>Still Wondering?</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              Ask us <span className="italic text-gold">anything.</span>
            </h2>
            <p className="font-body text-base text-silk/60 mt-6 max-w-md mx-auto">
              Call {site.phone} or send a note — our planning team responds within one business day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <LuxButton to="/contact" variant="gold">
                Contact Us <ArrowRight className="w-4 h-4" />
              </LuxButton>
              <LuxButton to="/schedule-a-tour" variant="outlineLight">
                Schedule a Tour
              </LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
