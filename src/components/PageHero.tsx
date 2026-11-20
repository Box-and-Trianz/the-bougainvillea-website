import Image from "next/image";
import Reveal from "./Reveal";

type Props = {
  image: string;
  /** Describes the photo for search engines and screen readers. */
  alt?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  overlay?: string;
  height?: string;
  children?: React.ReactNode;
};

/** Full-bleed photographic page header used across interior pages. */
export default function PageHero({
  image,
  alt = "The Bougainvilleas event venue in West Houston",
  eyebrow,
  title,
  subtitle,
  overlay = "bg-obsidian/55",
  height = "h-[55vh] min-h-[420px]",
  children,
}: Props) {
  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <Image src={image} alt={alt} fill priority quality={85} sizes="100vw" className="object-cover" />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative text-center px-6 pt-16">
        <Reveal>
          {children}
          <p className="text-[11px] font-body uppercase tracking-luxe text-champagne/90 mb-6">{eyebrow}</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-silk leading-[0.95] text-shadow-luxe">
            {title}
          </h1>
          {subtitle && <p className="font-body text-base sm:text-lg text-silk/80 mt-6 max-w-xl mx-auto">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
