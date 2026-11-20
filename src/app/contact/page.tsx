import { ArrowRight, Calendar, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import InquiryForm from "@/components/InquiryForm";
import LuxButton from "@/components/LuxButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { heroImages, site, socialIcons } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Contact Us & Directions",
  description:
    "Contact The Bougainvilleas event venue at 12126 Westheimer Rd, Houston, TX 77077. Call 832-914-7844 or email info@TheBougainvilleas.com to check your date.",
  path: "/contact",
  image: heroImages[0],
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`The Bougainvilleas, ${site.address}, ${site.city}`)}`;

const hours = [
  { day: "Tuesday – Friday", time: "By appointment · weekday evenings available" },
  { day: "Saturday", time: "By appointment, pending events" },
  { day: "Sunday & Monday", time: "Closed unless hosting an event" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={heroImages[0]}
        alt="The Bougainvilleas event venue at 12126 Westheimer Rd, Houston"
        eyebrow="Turn Your Dream Into a Reality"
        title={
          <>
            We&apos;d love to <span className="italic text-gold">hear from you.</span>
          </>
        }
        subtitle="Whether you're just starting your search or ready to plan, reach out and we'll connect with you shortly."
      />

      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5 space-y-10">
            <div>
              <Eyebrow>Stay in Touch</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl text-obsidian mt-6 leading-[1.05]">
                Where to <span className="italic text-gold">find us.</span>
              </h2>
            </div>

            <div className="space-y-px bg-obsidian/10">
              <a href={`tel:${site.phone}`} className="group bg-silk flex items-center gap-5 py-5">
                <span className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </span>
                <span>
                  <span className="block text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50">Telephone</span>
                  <span className="font-display text-2xl text-obsidian group-hover:text-gold transition-colors">{site.phone}</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="group bg-silk flex items-center gap-5 py-5">
                <span className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50">Email</span>
                  <span className="font-display text-xl sm:text-2xl text-obsidian group-hover:text-gold transition-colors break-all">
                    {site.email}
                  </span>
                </span>
              </a>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="group bg-silk flex items-center gap-5 py-5">
                <span className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </span>
                <span>
                  <span className="block text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50">Visit</span>
                  <span className="font-display text-2xl text-obsidian group-hover:text-gold transition-colors">
                    {site.address}
                    <br />
                    {site.city}
                  </span>
                </span>
              </a>
            </div>

            <div>
              <p className="flex items-center gap-2 text-[10px] font-body uppercase tracking-luxe text-gold mb-4">
                <Clock className="w-3.5 h-3.5" /> Appointments
              </p>
              <dl className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-champagne/60 pb-3">
                    <dt className="font-body text-sm text-obsidian">{h.day}</dt>
                    <dd className="font-body text-sm text-obsidian/60">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-body text-xs text-obsidian/50 mt-4">
                Also closed Christmas Eve, New Year&apos;s Day, Thanksgiving Day and the Fourth of July.
              </p>
            </div>

            <div className="flex gap-3">
              {Object.entries(socialIcons).map(([key, icon]) => {
                const link = site.social[key as keyof typeof site.social];
                return (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                    className="w-11 h-11 rounded-full bg-obsidian flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Image src={icon} alt={`The Bougainvilleas on ${key[0].toUpperCase() + key.slice(1)}`} width={22} height={22} />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="bg-silk border border-champagne/50 p-6 sm:p-8 lg:p-10 shadow-xl rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-gold" />
                <p className="font-display text-2xl text-obsidian">Send Us a Message</p>
              </div>
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[420px] overflow-hidden bg-obsidian">
        <Image
          src="/images/our-family/front-entrance.jpg"
          alt="The Bougainvilleas front entrance on Westheimer Road"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col justify-center items-start">
          <Reveal>
            <Eyebrow light>Getting Here</Eyebrow>
            <p className="font-display text-4xl sm:text-5xl text-silk mt-6 max-w-xl leading-[1.1]">
              On Westheimer Road, between Beltway 8 &amp; Gessner.
            </p>
            <p className="font-body text-sm text-silk/70 mt-4 max-w-md">
              Minutes from I-10, 59 and the Westpark Tollway · Over 250 free, accessible parking spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <LuxButton href={mapsUrl} variant="gold">
                <Navigation className="w-4 h-4" /> Get Directions
              </LuxButton>
              <LuxButton to="/schedule-a-tour" variant="outlineLight">
                Schedule a Tour <ArrowRight className="w-4 h-4" />
              </LuxButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
