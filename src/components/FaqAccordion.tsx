"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { FaqGroup } from "@/content/pages";

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [active, setActive] = useState(groups[0].title);
  const [open, setOpen] = useState<string | null>(groups[0].items[0].q);
  const group = groups.find((g) => g.title === active) ?? groups[0];

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="min-w-0 lg:col-span-4 lg:sticky lg:top-32">
        <p className="text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50 mb-4">Browse by topic</p>
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:overflow-visible">
          {groups.map((g) => (
            <button
              key={g.title}
              onClick={() => {
                setActive(g.title);
                setOpen(g.items[0].q);
              }}
              className={`flex-shrink-0 text-left px-5 py-3 rounded-full lg:rounded-sm text-[11px] font-body font-semibold uppercase tracking-wide-luxe transition-all flex items-center justify-between gap-6 ${
                active === g.title ? "bg-obsidian text-silk" : "bg-champagne/40 text-obsidian/60 hover:text-obsidian"
              }`}
            >
              {g.title}
              <span className={`hidden lg:inline font-display text-base ${active === g.title ? "text-gold" : "text-obsidian/30"}`}>
                {g.items.length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="min-w-0 lg:col-span-8">
        <h2 className="font-display text-3xl sm:text-4xl text-obsidian mb-6">{group.title}</h2>
        <div className="border-t border-obsidian/10">
          {group.items.map((f) => {
            const isOpen = open === f.q;
            return (
              <div key={f.q} className="border-b border-obsidian/10">
                <button
                  onClick={() => setOpen(isOpen ? null : f.q)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span className={`font-display text-xl sm:text-2xl transition-colors ${isOpen ? "text-gold" : "text-obsidian group-hover:text-gold"}`}>
                    {f.q}
                  </span>
                  <Plus
                    className={`w-5 h-5 mt-1.5 flex-shrink-0 text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body text-sm sm:text-base text-obsidian/70 leading-relaxed pb-6 pr-10">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
