import Image from "next/image";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { allPages, site, socialIcons, venues } from "@/lib/data";
import Eyebrow from "./Eyebrow";
import InquiryForm from "./InquiryForm";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="relative bg-obsidian text-silk overflow-hidden">
      <section className="relative silk-weave">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow light>The Closer</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.05] text-silk">
              Schedule a
              <br />
              <span className="italic text-gold">private tour.</span>
            </h2>
            <p className="font-body text-base text-silk/60 mt-6 max-w-md leading-relaxed">
              See the ballroom in event lighting. Walk the chapel. Feel the wine room. Our team will tailor the visit to
              your celebration — no pressure, just possibility.
            </p>
            <div className="mt-8 space-y-3">
              <a href={`tel:${site.phone}`} className="flex items-center gap-3 text-silk/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" /> <span className="font-body text-sm">{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-silk/70 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" /> <span className="font-body text-sm">{site.email}</span>
              </a>
              <div className="flex items-center gap-3 text-silk/70">
                <MapPin className="w-4 h-4 text-gold" />{" "}
                <span className="font-body text-sm">
                  {site.address}, {site.city}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-silk rounded-sm p-6 sm:p-8 lg:p-10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-gold" />
                <p className="font-display text-2xl text-obsidian">Plan Your Celebration</p>
              </div>
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-t border-silk/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            {/* Light version of the logo (lettering in silk, flowers kept) for the dark footer. */}
            <Image
              src="/logo-light.png"
              alt="The Bougainvilleas"
              width={1200}
              height={226}
              sizes="300px"
              className="h-12 lg:h-14 w-auto"
            />
            <p className="text-[10px] font-body uppercase tracking-luxe text-gold mt-4">
              West Houston&apos;s Premier Event Venue
            </p>
            <p className="font-body text-sm text-silk/50 mt-6 max-w-sm leading-relaxed">
              Where Houston celebrates its greatest stories. A boutique venue on Westheimer Road where every event
              receives our full attention.
            </p>
            <div className="flex gap-3 mt-6">
              {Object.entries(socialIcons).map(([key, icon]) => {
                const link = site.social[key as keyof typeof site.social];
                return link ? (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image src={icon} alt={`The Bougainvilleas on ${key[0].toUpperCase() + key.slice(1)}`} width={28} height={28} className="w-7 h-7" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-body uppercase tracking-luxe text-gold mb-5">Explore</p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-3">
              {allPages.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="font-body text-sm text-silk/60 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-body uppercase tracking-luxe text-gold mb-5">Our Rooms</p>
            <ul className="space-y-3">
              {venues.map((v) => (
                <li key={v.slug}>
                  <Link href={`/${v.slug}`} className="font-body text-sm text-silk/60 hover:text-gold transition-colors">
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-silk/10">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-6 pb-40 sm:pb-28 lg:pb-32 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-body text-[11px] text-silk/40">
              © {new Date().getFullYear()} The Bougainvilleas. All rights reserved.
            </p>
            <p className="font-body text-[11px] text-silk/40">Second chances, first dances · Houston, Texas</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
