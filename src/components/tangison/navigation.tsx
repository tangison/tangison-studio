"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { StudioLogo } from "@/components/studio/studio-logo";

/* ─── Navigation Data (only existing routes) ─────────────────── */

const menuGroups = [
  {
    title: "Work",
    links: [
      { label: "All Work", href: "/work" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Capabilities", href: "/services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Partnership", href: "/partnership" },
    ],
  },
  {
    title: "Journal",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Start a project", href: "/contact" },
      { label: "studio@tangison.com", href: "mailto:studio@tangison.com" },
    ],
  },
] as const;

/* ─── Search Data (only existing routes) ─────────────────────── */

interface SearchItem {
  label: string;
  href: string;
  category: string;
  description?: string;
}

const searchableItems: SearchItem[] = [
  { label: "Home", href: "/", category: "Pages" },
  { label: "Work", href: "/work", category: "Pages" },
  { label: "Services", href: "/services", category: "Pages" },
  { label: "Process", href: "/process", category: "Pages" },
  { label: "About", href: "/about", category: "Pages" },
  { label: "Contact", href: "/contact", category: "Pages" },
  { label: "Partnership", href: "/partnership", category: "Pages" },
  { label: "Blog", href: "/blog", category: "Pages" },
  { label: "Resources", href: "/resources", category: "Pages" },
  { label: "FAQ", href: "/faq", category: "Pages" },
  { label: "Careers", href: "/careers", category: "Pages" },
  { label: "Brand Identity", href: "/brand", category: "Pages" },
  { label: "Studio", href: "/studio", category: "Pages" },
  // Case studies
  { label: "ProAvia Travel & Tours", href: "/work/proavia", category: "Work", description: "Travel & Tourism — Website design and development" },
  { label: "Nalago Skincare", href: "/work/nalago", category: "Work", description: "Beauty & Wellness — E-commerce" },
  { label: "Cluster Leaf Safaris", href: "/work/clusterleaf", category: "Work", description: "Safari & Tourism — Website design" },
  { label: "SMEFrog", href: "/work/smefrog", category: "Work", description: "LegalTech — Product design" },
  { label: "Petrocor", href: "/work/petrocor", category: "Work", description: "Corporate — Website design" },
  { label: "Crescendo", href: "/work/crescendo", category: "Work", description: "Website design and development" },
  { label: "FEORM", href: "/work/feorm", category: "Work", description: "Website design and development" },
  { label: "L&R Clearing Agency", href: "/work/lrclearing", category: "Work", description: "Logistics — Website design" },
  { label: "Revive Auto Works", href: "/work/reviveautoworks", category: "Work", description: "Automotive — Website design" },
  { label: "MI-WAY", href: "/work/miway", category: "Work", description: "Website design and development" },
  // Capabilities
  { label: "Brand", href: "/services#brand", category: "Capabilities", description: "Identity and systems" },
  { label: "Product", href: "/services#product", category: "Capabilities", description: "Websites and applications" },
  { label: "Intelligence", href: "/services#intelligence", category: "Capabilities", description: "Applied AI and automation" },
];

/* ─── Two-Line Menu Toggle (morphs into X) ───────────────────── */

function MenuToggle({ isOpen, color = "dark" }: { isOpen: boolean; color?: "dark" | "light" }) {
  const lineColor = color === "dark" ? "bg-ink" : "bg-skeleton-bone";
  return (
    <div className="w-5 h-5 flex flex-col justify-center gap-[5px] relative">
      <span
        className={`block w-full h-[1.5px] ${lineColor} transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-[3.25px]" : ""
        }`}
      />
      <span
        className={`block w-full h-[1.5px] ${lineColor} transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
        }`}
      />
    </div>
  );
}

/* ─── Search Overlay (Cmd+K) ──────────────────────────────────── */

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.trim()
    ? searchableItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
    : searchableItems;

  // Group by category
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const flatResults = Object.values(grouped).flat();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatResults[selectedIndex]) {
        window.location.href = flatResults[selectedIndex].href;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flatResults, selectedIndex]);

  let runningIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] px-4"
    >
      <div className="absolute inset-0 bg-atlantic-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-skeleton-bone rounded-full shadow-2xl overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-card-border">
          <Search className="w-5 h-5 text-ink-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search work, capabilities, pages..."
            className="flex-1 bg-transparent font-satoshi text-lg text-ink placeholder:text-ink-muted/50 focus:outline-none"
            aria-label="Search"
          />
          <kbd className="font-jetbrains text-[9px] text-ink-muted border border-card-border px-2 py-1 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto p-2">
          {flatResults.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-2">
                <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em] px-4 py-2">
                  {category}
                </p>
                {items.map((item) => {
                  const idx = runningIndex++;
                  const isSelected = idx === selectedIndex;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-full transition-colors ${
                        isSelected ? "bg-ocean-mist" : "hover:bg-ocean-mist/50"
                      }`}
                    >
                      <div>
                        <p className="font-satoshi text-sm font-medium text-ink">{item.label}</p>
                        {item.description && (
                          <p className="font-satoshi text-xs text-ink-muted">{item.description}</p>
                        )}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Expanded Editorial Menu Overlay ────────────────────────── */

function ExpandedMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[105] md:flex"
    >
      <div className="absolute inset-0 bg-atlantic-black/80 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative ml-auto w-full md:w-[85%] lg:w-[75%] xl:w-[65%] bg-atlantic-black overflow-y-auto overscroll-contain"
        style={{ minHeight: "100dvh" }}
      >
        <div className="flex flex-col" style={{ minHeight: "100dvh" }}>
          {/* Top bar — close button */}
          <div className="flex items-center justify-between px-6 md:px-12 py-6">
            <StudioLogo size={28} wordmarkColor="light" />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center text-skeleton-bone"
              aria-label="Close menu"
            >
              <MenuToggle isOpen color="light" />
            </button>
          </div>

          {/* Content grid */}
          <div className="flex-1 grid md:grid-cols-[1fr_1.2fr] gap-0">
            {/* Left — oil painting + featured note */}
            <div className="hidden md:flex flex-col justify-end p-12 border-r border-white/5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="painting-frame mb-8"
              >
                <Image
                  src="/images/paintings/work-intro.webp"
                  alt="An oil painting of a solitary weathered signal mast on the Skeleton Coast at first light."
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-display text-2xl font-bold text-skeleton-bone leading-tight mb-3"
              >
                We build the brand, the product and the intelligence behind it.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="font-satoshi text-sm text-skeleton-bone/70"
              >
                One studio instead of three vendors.
              </motion.p>
            </div>

            {/* Right — link groups */}
            <div className="p-6 md:p-12">
              {menuGroups.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8 last:mb-0"
                >
                  <p className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-4">
                    {group.title}
                  </p>
                  <ul className="space-y-2">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      const isExternal = link.href.startsWith("mailto:") || link.href.startsWith("http");
                      const LinkComponent = isExternal ? "a" : Link;
                      return (
                        <li key={link.href}>
                          <LinkComponent
                            href={link.href}
                            onClick={onClose}
                            className={`group inline-flex items-center gap-2 font-display text-xl md:text-2xl font-bold tracking-tight transition-colors ${
                              isActive ? "text-signal-teal" : "text-skeleton-bone hover:text-signal-teal"
                            }`}
                          >
                            {link.label}
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </LinkComponent>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom — social */}
          <div className="flex items-center gap-6 px-6 md:px-12 py-6 border-t border-white/5">
            <a href="https://www.facebook.com/namibia.digital" target="_blank" rel="noopener noreferrer" className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors">Facebook</a>
            <a href="https://www.instagram.com/tangison_studio" target="_blank" rel="noopener noreferrer" className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors">Instagram</a>
            <a href="https://www.threads.net/@tangison_studio" target="_blank" rel="noopener noreferrer" className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors">Threads</a>
            <span className="ml-auto font-jetbrains text-[9px] text-skeleton-bone/40 uppercase tracking-[0.2em]">Windhoek, Namibia</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Navigation Component ──────────────────────────────── */

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false); // eslint-disable-line react-hooks/set-state-in-effect -- close menu on route change is a legitimate sync
  }, [pathname]);

  // Cmd/Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
          menuTriggerRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isMenuOpen]);

  // Prevent body scroll when menu or search is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <>
      {/* Floating Pill Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[100] top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] md:w-auto"
        aria-label="Main navigation"
      >
        <div
          className="flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2.5 rounded-full"
          style={{
            background: isScrolled ? "#F6F4EF" : "rgba(246, 244, 239, 0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: isScrolled ? "0 2px 12px rgba(17, 19, 21, 0.06)" : "none",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Studio — home"
          >
            <StudioLogo size={30} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {[
              { label: "Work", href: "/work" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-satoshi text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls — both circular */}
          <div className="flex items-center gap-2">
            {/* Search button — circular */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:text-ink transition-colors"
              aria-label="Open search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Two-line menu toggle — circular */}
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <MenuToggle isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 md:h-20" />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>

      {/* Expanded Editorial Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <ExpandedMenu onClose={() => setIsMenuOpen(false)} pathname={pathname} />
        )}
      </AnimatePresence>
    </>
  );
}
