"use client";

import { Calendar, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InquiryForm from "./InquiryForm";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* One fixed layer for both floating controls so they can never overlap:
          side by side from sm up, back-to-top stacked above the bar on phones. */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-[1400px] p-4 lg:p-6 pointer-events-none flex flex-col items-end gap-3 sm:flex-row sm:items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pointer-events-auto order-1 sm:order-2 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold text-obsidian flex items-center justify-center shadow-2xl hover:bg-silk transition-colors"
          aria-label="Back to top"
          tabIndex={visible ? 0 : -1}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div className="pointer-events-auto order-2 sm:order-1 w-full sm:flex-1 sm:min-w-0 min-h-14 glass-dark rounded-full border border-silk/20 pl-6 pr-2 py-2 flex items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3 text-silk">
            <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
            <div className="hidden sm:block">
              <p className="font-display text-base leading-none">Check Availability</p>
              <p className="text-[10px] font-body uppercase tracking-wide-luxe text-silk/60 mt-1">
                One wedding per day · Book your date
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/packages"
              className="hidden md:inline-flex text-[11px] font-body font-semibold uppercase tracking-wide-luxe text-silk/80 hover:text-gold transition-colors"
            >
              View Packages
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="bg-gold text-obsidian px-6 py-2.5 rounded-full text-[11px] font-body font-semibold uppercase tracking-wide-luxe hover:bg-silk transition-colors"
            >
              Check Dates
            </button>
          </div>
        </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-silk rounded-sm w-full max-w-lg p-8 lg:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-obsidian/40 hover:text-obsidian transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-[10px] font-body uppercase tracking-luxe text-gold mb-2">Start the conversation</p>
            <h3 className="font-display text-4xl text-obsidian mb-2">Check Availability</h3>
            <p className="font-body text-sm text-obsidian/60 mb-6">
              Share a few details and we&apos;ll confirm your date and arrange a tour.
            </p>
            <InquiryForm compact />
          </div>
        </div>
      )}
    </>
  );
}
