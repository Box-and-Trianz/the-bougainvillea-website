import Image from "next/image";
import { ArrowRight, Check, Quote, Users } from "lucide-react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import HeroSlider from "@/components/HeroSlider";
import LuxButton from "@/components/LuxButton";
import Reveal from "@/components/Reveal";
import { eventTypes, partners, storyImage, testimonials, venues, whyUs } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wedding & Event Venue in Houston, TX | The Bougainvilleas",
  absoluteTitle: true,
  description:
    "Boutique wedding and event venue in West Houston: a Grand Ballroom for up to 350 seated guests, chapel, wine room, bridal suite and in-house catering.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="border-y border-obsidian/10 bg-champagne/30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center">
          {["Only one wedding per day", "In-house planning team", "350 seated · 500 theater", "All-day setup access"].map(
            (t) => (
              <span
                key={t}
                className="font-body text-[11px] uppercase tracking-wide-luxe text-obsidian/60 flex items-center gap-2"
              >
                <Check className="w-3 h-3 text-gold" /> {t}
              </span>
            )
          )}
        </div>
      </section>

      <section className="silk-weave py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative overflow-hidden arch-mask h-[560px]">
                <Image src={storyImage} alt="The Bougainvilleas event venue in West Houston, established 2013" className="object-cover" fill sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-silk px-8 py-6 shadow-xl border border-champagne/50 hidden sm:block">
                <p className="font-display text-5xl text-gold leading-none">2013</p>
                <p className="text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50 mt-2">Established</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              The power of
              <br />
              <span className="italic text-gold">second chances.</span>
            </h2>
            <div className="space-y-5 mt-8 font-body text-base text-obsidian/70 leading-[1.7]">
              <p>
                Life is a canvas of opportunities, and sometimes it grants us a chance to rewrite stories. When faced
                with a tearful bride on what should have been her happiest day, Badra Andrews recognized the potential
                for transformation. In 2013, she emerged from early retirement to reclaim the property she had entrusted
                to others.
              </p>
              <p>
                With unwavering determination, Badra metamorphosed a neglected wedding hall into an exquisite
                masterpiece — now renowned as West Houston&apos;s premier event venue. The once-desolate space blossomed
                into a haven of elegance and charm.
              </p>
              <p>
                Through countless events hosted within its walls, The Bougainvilleas has been a conduit for happiness, a
                stage for celebrations, and a backdrop for cherished memories — a testament to the idea that success is
                most meaningful when shared.
              </p>
            </div>
            <LuxButton to="/the-bougainvilleas" variant="outline" className="mt-10">
              Discover More <ArrowRight className="w-4 h-4" />
            </LuxButton>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-36 bg-obsidian text-silk overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow light>Type of Events</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-silk mt-6">
              Every celebration, <span className="italic text-gold">orchestrated.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-silk/10">
          {eventTypes.map((e, i) => (
            <Reveal key={e.key} delay={i * 0.1}>
              <div className="group relative h-[560px] overflow-hidden bg-obsidian">
                <Image
                  src={e.image}
                  alt={e.title}
                  className="object-cover opacity-45 group-hover:opacity-65 transition-all duration-1000 group-hover:scale-105" fill sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                  <p className="text-[10px] font-body uppercase tracking-luxe text-gold mb-3">0{i + 1}</p>
                  <h3 className="font-display text-4xl text-silk mb-4">{e.title}</h3>
                  <p className="font-body text-sm text-silk/70 leading-relaxed max-h-0 group-hover:max-h-48 overflow-hidden transition-all duration-700">
                    {e.text}
                  </p>
                  <ul className="space-y-2 mt-0 group-hover:mt-5 max-h-0 group-hover:max-h-64 overflow-hidden transition-all duration-700">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[12px] font-body text-silk/80">
                        <span className="w-1 h-1 rounded-full bg-gold" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={e.key === "corporate" ? "/business-events" : "/packages"}
                    className="inline-flex items-center gap-2 mt-6 text-[11px] font-body font-semibold uppercase tracking-wide-luxe text-gold hover:text-silk transition-colors"
                  >
                    View Packages <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-36 silk-weave">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <Eyebrow>The Canvas</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
                Five spaces,
                <br />
                <span className="italic text-gold">one address.</span>
              </h2>
            </div>
            <p className="font-body text-base text-obsidian/60 max-w-md leading-relaxed">
              From a 500-guest ballroom to a 32-seat wine room, our multipurpose spaces adapt to intimate gatherings and
              grand galas alike.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 3) * 0.1}>
                <Link href={`/${v.slug}`} className="group block">
                  <div className="relative overflow-hidden arch-mask h-[420px]">
                    <Image
                      src={v.image}
                      alt={v.name}
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-obsidian/25 transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-body uppercase tracking-luxe text-silk/80 mb-2 flex items-center gap-2">
                        <Users className="w-3 h-3 text-gold" />
                        {v.capacitySeated} seated · {v.capacityTheater} theater
                      </p>
                      <h3 className="font-display text-3xl text-silk text-shadow-luxe">{v.name}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36 bg-champagne/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <Eyebrow>Why Choose Us</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.05]">
              The details that
              <br />
              <span className="italic text-gold">make the day.</span>
            </h2>
            <p className="font-body text-base text-obsidian/60 mt-6 max-w-md leading-relaxed">
              We book only one wedding a day — so when it&apos;s yours, it&apos;s entirely yours. Every detail is
              handled by a team that treats your celebration like their own.
            </p>
            <LuxButton to="/packages" variant="solid" className="mt-10">
              Start Planning <ArrowRight className="w-4 h-4" />
            </LuxButton>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-obsidian/10">
            {whyUs.map((w, i) => (
              <Reveal key={w} delay={(i % 2) * 0.08}>
                <div className="bg-silk p-8 h-full flex items-start gap-4 hover:bg-champagne/30 transition-colors">
                  <span className="font-display text-2xl text-gold/50 mt-1">0{i + 1}</span>
                  <p className="font-body text-sm text-obsidian/80 leading-relaxed">{w}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow>Loved By Houston</Eyebrow>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6">
              Stories worth <span className="italic text-gold">celebrating.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-silk border border-champagne/50 p-8 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-gold/40 mb-4" />
                  <p className="font-body text-sm text-obsidian/70 leading-relaxed flex-1 italic">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-champagne/50">
                    <Image src={t.avatar} alt={t.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="font-display text-lg text-obsidian">{t.name}</p>
                      <p className="text-[10px] font-body uppercase tracking-wide-luxe text-gold">{t.event}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <LuxButton to="/testimonials" variant="outline">
              Read All Reviews <ArrowRight className="w-4 h-4" />
            </LuxButton>
          </Reveal>
        </div>
      </section>

      <section className="py-20 border-y border-obsidian/10 bg-champagne/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Eyebrow className="justify-center">Working With the Best</Eyebrow>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                title={p.name}
              >
                <Image src={p.image} alt={p.name} width={160} height={80} className="h-12 lg:h-14 w-auto object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
