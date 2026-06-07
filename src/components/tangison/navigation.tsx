"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Command } from "lucide-react";

/* ─── Navigation Data ─────────────────────────────────────────── */

interface MegaSubItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: MegaSubItem[];
  megaImage?: string;
  megaImageAlt?: string;
  megaTagline?: string;
}

const navItems: NavItem[] = [
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Case Studies", href: "/work#case-studies", description: "Results from the field" },
      { label: "By Industry", href: "/work#industries", description: "Sector-specific outcomes" },
    ],
    megaImage: "/images/gallery/nav-work.webp",
    megaImageAlt: "Work portfolio",
    megaTagline: "Work that moves ideas forward.",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Website Design", href: "/services/website-design", description: "Intentional interfaces" },
      { label: "Website Development", href: "/services/website-development", description: "Engineered to perform" },
      { label: "Application Design", href: "/services/application-design", description: "Complex systems, clear UX" },
      { label: "Product Design", href: "/services/product-design", description: "End-to-end product thinking" },
      { label: "Brand Systems", href: "/services/brand-systems", description: "Cohesive visual identity" },
      { label: "Design Systems", href: "/services/design-systems", description: "Scalable component architecture" },
      { label: "Creative Direction", href: "/services/creative-direction", description: "Strategic visual leadership" },
    ],
    megaImage: "/images/gallery/nav-services.webp",
    megaImageAlt: "Design services",
    megaTagline: "Seven disciplines. One studio.",
  },
  {
    label: "Process",
    href: "/process",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "The Studio", href: "/about", description: "Who we are" },
      { label: "Brand Identity", href: "/brand", description: "Visual and verbal system" },
    ],
    megaImage: "/images/gallery/nav-about.webp",
    megaImageAlt: "About Tangison Studio",
    megaTagline: "Designing from Windhoek.",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* ─── Searchable Page Index ───────────────────────────────────── */

interface SearchEntry {
  label: string;
  href: string;
  category: string;
  description?: string;
}

const searchIndex: SearchEntry[] = [
  // Main pages
  { label: "Work", href: "/work", category: "Pages", description: "Portfolio and case studies" },
  { label: "Case Studies", href: "/work#case-studies", category: "Work", description: "Results from the field" },
  { label: "By Industry", href: "/work#industries", category: "Work", description: "Sector-specific outcomes" },
  { label: "Services", href: "/services", category: "Pages", description: "Seven disciplines, one studio" },
  { label: "Website Design", href: "/services#website-design", category: "Services", description: "Intentional interfaces" },
  { label: "Website Development", href: "/services#website-development", category: "Services", description: "Engineered to perform" },
  { label: "Application Design", href: "/services#application-design", category: "Services", description: "Complex systems, clear UX" },
  { label: "Product Design", href: "/services#product-design", category: "Services", description: "End-to-end product thinking" },
  { label: "Brand Systems", href: "/services#brand-systems", category: "Services", description: "Cohesive visual identity" },
  { label: "Design Systems", href: "/services#design-systems", category: "Services", description: "Scalable component architecture" },
  { label: "Creative Direction", href: "/services#creative-direction", category: "Services", description: "Strategic visual leadership" },
  { label: "Process", href: "/process", category: "Pages", description: "How we work" },
  { label: "About", href: "/about", category: "Pages", description: "Who we are" },
  { label: "Brand", href: "/brand", category: "Pages", description: "Visual and verbal identity" },
  { label: "Contact", href: "/contact", category: "Pages", description: "Get in touch" },
  { label: "Blog", href: "/blog", category: "Pages", description: "Insights and articles" },
  { label: "FAQ", href: "/faq", category: "Pages", description: "Frequently asked questions" },
  { label: "Resources", href: "/resources", category: "Pages", description: "Guides and downloads" },
  { label: "Legal", href: "/legal", category: "Pages", description: "Terms and privacy" },
  { label: "Careers", href: "/careers", category: "Pages", description: "Join the studio" },
];

/* ─── Hamburger Icon ──────────────────────────────────────────── */

function HamburgerIcon({ isOpen, color = "ink" }: { isOpen: boolean; color?: "ink" | "skeleton-bone" }) {
  const bgColor = color === "skeleton-bone" ? "bg-skeleton-bone" : "bg-ink";
  return (
    <div className="w-5 h-5 flex flex-col justify-center gap-[5px] relative">
      <span
        className={`block w-full h-[1.5px] ${bgColor} transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-[3.25px]" : ""
        }`}
      />
      <span
        className={`block w-full h-[1.5px] ${bgColor} transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
        }`}
      />
    </div>
  );
}

/* ─── Search Overlay Component ────────────────────────────────── */

function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Focus input and reset query when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Keyboard shortcut to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter results
  const results = query.trim().length > 0
    ? searchIndex.filter((entry) => {
        const q = query.toLowerCase();
        return (
          entry.label.toLowerCase().includes(q) ||
          (entry.description && entry.description.toLowerCase().includes(q)) ||
          entry.category.toLowerCase().includes(q)
        );
      })
    : searchIndex;

  // Group by category
  const grouped: Record<string, SearchEntry[]> = {};
  for (const entry of results) {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push(entry);
  }

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-atlantic-black/80"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[640px] mx-4 bg-atlantic-black border border-fog-gray/20 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-fog-gray/15">
              <Search className="w-5 h-5 text-signal-teal shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search studio.tangison.com..."
                className="flex-1 bg-transparent text-skeleton-bone font-jetbrains text-sm placeholder:text-fog-gray/40 outline-none tracking-wide"
                aria-label="Search pages"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 border border-fog-gray/20 text-fog-gray/40 font-jetbrains text-[9px] uppercase tracking-widest">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto t-scrollbar">
              {Object.keys(grouped).length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="font-jetbrains text-[11px] text-fog-gray/40 uppercase tracking-[0.15em]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                Object.entries(grouped).map(([category, entries]) => (
                  <div key={category}>
                    <div className="px-5 pt-4 pb-2">
                      <span className="font-jetbrains text-[9px] uppercase tracking-[0.3em] text-signal-teal/70">
                        {category}
                      </span>
                    </div>
                    {entries.map((entry) => {
                      const isActive = pathname === entry.href;
                      return (
                        <button
                          key={entry.href}
                          onClick={() => handleSelect(entry.href)}
                          className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-200 ${
                            isActive
                              ? "bg-signal-teal/10 text-skeleton-bone"
                              : "text-fog-gray/60 hover:bg-fog-gray/10 hover:text-skeleton-bone"
                          }`}
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-signal-teal/50 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="font-jetbrains text-[11px] uppercase tracking-[0.1em] block">
                              {entry.label}
                            </span>
                            {entry.description && (
                              <span className="font-jetbrains text-[9px] text-fog-gray/30 tracking-wide block mt-0.5">
                                {entry.description}
                              </span>
                            )}
                          </div>
                          <span className="font-jetbrains text-[8px] text-fog-gray/20 uppercase tracking-widest shrink-0 hidden sm:block">
                            {entry.href}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-fog-gray/10 flex items-center gap-4">
              <span className="font-jetbrains text-[8px] text-fog-gray/25 uppercase tracking-[0.2em]">
                Navigate
              </span>
              <div className="flex items-center gap-1">
                <kbd className="inline-flex items-center px-1.5 py-0.5 border border-fog-gray/15 text-fog-gray/30 font-jetbrains text-[8px]">↵</kbd>
              </div>
              <span className="font-jetbrains text-[8px] text-fog-gray/25 uppercase tracking-[0.2em] ml-auto">
                Close
              </span>
              <kbd className="inline-flex items-center px-1.5 py-0.5 border border-fog-gray/15 text-fog-gray/30 font-jetbrains text-[8px]">esc</kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Desktop Mega-Menu Dropdown ──────────────────────────────── */

function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isActive =
    pathname === item.href ||
    pathname.startsWith(item.href + "/");

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`font-jetbrains text-[10px] uppercase tracking-[0.2em] relative group inline-flex items-center transition-colors duration-300 ${
          isActive
            ? "text-ink"
            : "text-ink-muted hover:text-ink"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <span
          className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ease-out ${
            isActive
              ? "w-full bg-signal-teal"
              : "w-0 group-hover:w-full bg-signal-teal/60"
          }`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 top-[72px] z-50"
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            <div className="bg-signal-white border-b border-black/[0.06]">
              {/* Teal accent line */}
              <div className="h-[2px] bg-signal-teal" aria-hidden="true" />

              <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  {/* Left: Editorial image */}
                  {item.megaImage && (
                    <div className="md:col-span-5 relative h-48 md:h-64 overflow-hidden">
                      <Image
                        src={item.megaImage}
                        alt={item.megaImageAlt || ""}
                        className="object-cover cinematic-image"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-signal-white/20" />
                      {item.megaTagline && (
                        <p className="absolute bottom-4 left-4 font-cabinet text-lg md:text-xl font-bold text-signal-white tracking-tight">
                          {item.megaTagline}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Right: Links */}
                  <div className={item.megaImage ? "md:col-span-7" : "md:col-span-12"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-3 py-3 transition-all duration-200 ${
                              isChildActive
                                ? "text-ink bg-ocean-mist"
                                : "text-ink-muted hover:text-ink hover:bg-ocean-mist/50"
                            }`}
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="font-cabinet text-base md:text-lg font-bold tracking-tight">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="block font-satoshi text-sm text-ink-muted/60 mt-0.5">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Accordion Item ───────────────────────────────────── */

function MobileAccordionItem({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div>
      {hasChildren ? (
        <button
          className={`font-cabinet text-xl sm:text-2xl tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-3 ${
            isActive ? "text-ink" : "text-ink-muted hover:text-ink"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={`${item.label} — ${isExpanded ? "collapse" : "expand"} submenu`}
        >
          {item.label}
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-jetbrains text-[12px] text-ink-muted/50 leading-none"
          >
            +
          </motion.span>
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={`font-cabinet text-xl sm:text-2xl tracking-[0.15em] uppercase transition-colors duration-300 block ${
            item.href === "/contact"
              ? "text-signal-teal hover:text-signal-teal-light"
              : isActive
              ? "text-ink"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {item.label}
        </Link>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-3 pl-4 border-l-2 border-signal-teal/30">
              {item.children!.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className={`font-satoshi text-sm transition-colors duration-200 py-1 ${
                      isChildActive
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Navigation Component ───────────────────────────────── */

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Cmd+K / Ctrl+K shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isSearchOpen]);

  // When nav is NOT scrolled → show light logo (transparent bg, dark sections underneath)
  // When nav IS scrolled → show dark logo (white bg with blur)
  const logoSrc = isScrolled ? "/brand/logo-dark.webp" : "/brand/logo-light.webp";

  return (
    <>
      {/* Desktop / Shared Nav Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-3 left-3 right-3 z-50 transition-all duration-700 px-5 sm:px-6 md:px-8 py-3 md:py-4 flex justify-between items-center ${
          isScrolled
            ? "bg-signal-white/90 border border-black/[0.06] py-3 md:py-3.5"
            : "bg-transparent border border-transparent"
        }`}
        style={{
          backdropFilter: isScrolled ? "blur(24px)" : "blur(0px)",
          WebkitBackdropFilter: isScrolled ? "blur(24px)" : "blur(0px)",
          maxWidth: "1600px",
          margin: "0 auto",
          transition:
            "backdrop-filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo — switches variant based on scroll state */}
        <Link
          href="/"
          className="relative h-10 md:h-12 flex items-center transition-opacity duration-300 hover:opacity-80 shrink-0"
          aria-label="Tangison Studio home"
        >
          <Image
            src={logoSrc}
            alt="TANGISON STUDIO"
            width={874}
            height={286}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop navigation links + search */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`font-jetbrains text-[10px] uppercase tracking-[0.2em] relative group inline-flex items-center transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-ink"
                    : item.href === "/contact"
                    ? "text-signal-teal hover:text-signal-teal-light"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ease-out ${
                    pathname === item.href
                      ? "w-full bg-signal-teal"
                      : "w-0 group-hover:w-full bg-signal-teal/60"
                  }`}
                />
              </Link>
            )
          )}

          {/* Search toggle button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="font-jetbrains text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors duration-300"
            aria-label="Open search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 border border-fog-gray/40 text-fog-gray/50 text-[8px] tracking-widest">
              <Command className="w-2 h-2" />K
            </kbd>
          </button>
        </div>

        {/* CTA Button + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-signal-teal text-signal-white px-7 py-3.5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
          >
            Let&apos;s Build →
          </Link>

          {/* Mobile hamburger — use light icon when not scrolled (dark bg underneath) */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <HamburgerIcon isOpen={isMobileOpen} color={isScrolled ? "ink" : "skeleton-bone"} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay — Atlantic Black */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-atlantic-black flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button — always light on dark bg */}
            <div className="flex justify-end px-5 sm:px-6 pt-4 md:pt-5">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-skeleton-bone p-2 -mr-2"
                aria-label="Close menu"
              >
                <HamburgerIcon isOpen={true} color="skeleton-bone" />
              </button>
            </div>

            {/* Centered nav links */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <nav className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-sm">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.99 }}
                    transition={{
                      delay: i * 0.06 + 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full text-center"
                  >
                    {/* Mobile links on dark bg */}
                    {item.children ? (
                      <MobileAccordionItemDark item={item} pathname={pathname} onClose={() => setIsMobileOpen(false)} />
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`font-cabinet text-xl sm:text-2xl tracking-[0.15em] uppercase transition-colors duration-300 block ${
                          item.href === "/contact"
                            ? "text-signal-teal hover:text-signal-teal-light"
                            : pathname === item.href
                            ? "text-skeleton-bone"
                            : "text-fog-gray/60 hover:text-skeleton-bone"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Mobile search link */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{
                    delay: navItems.length * 0.06 + 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full text-center"
                >
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      setTimeout(() => setIsSearchOpen(true), 300);
                    }}
                    className="font-cabinet text-xl sm:text-2xl tracking-[0.15em] uppercase transition-colors duration-300 flex items-center justify-center gap-2 mx-auto text-fog-gray/60 hover:text-skeleton-bone"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </motion.div>
              </nav>
            </div>

            {/* Bottom tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pb-8 text-center shrink-0"
            >
              <span className="font-jetbrains text-[9px] text-fog-gray/30 uppercase tracking-[0.3em]">
                Windhoek, Namibia
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

/* ─── Mobile Accordion Item — Dark Variant ────────────────────── */

function MobileAccordionItemDark({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div>
      <button
        className={`font-cabinet text-xl sm:text-2xl tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-3 mx-auto ${
          isActive ? "text-skeleton-bone" : "text-fog-gray/60 hover:text-skeleton-bone"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={`${item.label} — ${isExpanded ? "collapse" : "expand"} submenu`}
      >
        {item.label}
        <motion.span
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-jetbrains text-[12px] text-fog-gray/30 leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-3 pl-4 border-l-2 border-signal-teal/30">
              {item.children!.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className={`font-satoshi text-sm transition-colors duration-200 py-1 ${
                      isChildActive
                        ? "text-skeleton-bone"
                        : "text-fog-gray/50 hover:text-skeleton-bone"
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
