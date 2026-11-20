import Link from "next/link";
import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="silk-weave min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24">
      <div className="text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="font-display text-6xl lg:text-7xl text-obsidian mt-6">
          Page <span className="italic text-gold">not found.</span>
        </h1>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 mt-10 text-[12px] font-body font-semibold uppercase tracking-wide-luxe transition-all duration-500 bg-obsidian text-silk hover:bg-gold hover:text-obsidian"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
