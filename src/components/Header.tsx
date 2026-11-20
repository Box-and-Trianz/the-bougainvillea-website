"use client";

import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site, venues } from "@/lib/data";

const linkCls = "text-[12px] font-body font-medium uppercase tracking-wide-luxe transition-colors";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? "glass shadow-[0_1px_30px_rgba(0,0,0,0.06)] py-3"
          : "py-4 xl:py-6 bg-silk/80 backdrop-blur-md xl:bg-transparent xl:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center justify-between">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl lg:text-[28px] text-obsidian tracking-wide">The Bougainvilleas</span>
          <span className="text-[9px] font-body uppercase tracking-luxe text-gold mt-1">Houston · Est. 2013</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.mega)
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-1 ${linkCls} ${
                      venues.some((v) => pathname === `/${v.slug}`) || pathname === item.path
                        ? "text-gold"
                        : "text-obsidian/80 hover:text-gold"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />
                  </Link>
                  {openMenu === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6">
                      <div className="glass shadow-2xl rounded-sm border border-champagne/40 p-6 w-[680px] grid grid-cols-3 gap-5">
                        {venues.map((v) => (
                          <Link key={v.slug} href={`/${v.slug}`} className="group block">
                            <div className="relative overflow-hidden arch-mask h-44 mb-3">
                              <Image
                                src={v.image}
                                alt={v.name}
                                fill
                                sizes="200px"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-obsidian/0 transition-colors" />
                            </div>
                            <p className="font-display text-lg text-obsidian group-hover:text-gold transition-colors">
                              {v.name}
                            </p>
                            <p className="text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50 mt-1">
                              {v.capacitySeated} seated · {v.capacityTheater} theater
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );

            if (item.children)
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className={`flex items-center gap-1 ${linkCls} ${
                      item.children.some((c) => isActive(c.path)) ? "text-gold" : "text-obsidian/80 hover:text-gold"
                    }`}
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {openMenu === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6">
                      <div className="glass shadow-2xl rounded-sm border border-champagne/40 py-3 w-56">
                        {item.children.map((c) => (
                          <Link
                            key={c.path}
                            href={c.path}
                            className={`block px-6 py-3 ${linkCls} ${
                              isActive(c.path) ? "text-gold" : "text-obsidian/80 hover:text-gold hover:bg-champagne/30"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`${linkCls} ${isActive(item.path) ? "text-gold" : "text-obsidian/80 hover:text-gold"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <a
            href={`tel:${site.phone}`}
            className="text-[12px] font-body font-semibold uppercase tracking-wide-luxe text-obsidian border-b border-gold pb-0.5 hover:text-gold transition-colors"
          >
            {site.phone}
          </a>
        </div>

        <button className="xl:hidden text-obsidian" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden glass border-t border-champagne/40 mt-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-champagne/30 py-3">
                  <p className="text-sm font-body font-medium uppercase tracking-wide-luxe text-obsidian/80">
                    {item.label}
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 mt-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.path}
                        href={c.path}
                        className="py-2 text-[12px] font-body uppercase tracking-wide-luxe text-obsidian/60 hover:text-gold"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`py-3 text-sm font-body font-medium uppercase tracking-wide-luxe border-b border-champagne/30 ${
                    isActive(item.path) ? "text-gold" : "text-obsidian/80"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-4">
              <p className="text-[10px] font-body uppercase tracking-luxe text-gold mb-3">Our Rooms</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {venues.map((v) => (
                  <Link key={v.slug} href={`/${v.slug}`} className="block">
                    <div className="relative overflow-hidden arch-mask h-28 mb-2">
                      <Image src={v.image} alt={v.name} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
                    </div>
                    <p className="font-display text-sm text-obsidian">{v.name}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-5">
              <Link
                href="/schedule-a-tour"
                className="bg-gold text-obsidian px-6 py-3 rounded-full text-[11px] font-body font-semibold uppercase tracking-wide-luxe"
              >
                Schedule a Tour
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="text-sm font-body font-semibold uppercase tracking-wide-luxe text-gold"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
