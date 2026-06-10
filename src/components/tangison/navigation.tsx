"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

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
      { label: "Coming Soon", href: "/work", description: "We are rebranding from Gemsweb Digital" },
      { label: "SMEs & Startups", href: "/work/smes", description: "Brand and digital for growing ventures" },
      { label: "Mining & Resources", href: "/work/mining", description: "Safety portals and compliance dashboards" },
      { label: "Government", href: "/work/government", description: "Accessible public sector platforms" },
      { label: "Tourism & Hospitality", href: "/work/tourism", description: "Booking platforms and destination brands" },
      { label: "Agriculture", href: "/work/agriculture", description: "Agri-tech and marketplace platforms" },
      { label: "Finance", href: "/work/finance", description: "Fintech dashboards and banking portals" },
      { label: "Education", href: "/work/education", description: "Learning platforms and EdTech" },
      { label: "Healthcare", href: "/work/healthcare", description: "Patient portals and telemedicine" },
      { label: "Energy", href: "/work/energy", description: "Renewable energy and utility platforms" },
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

/* ─── Search Data ─────────────────────────────────────────── */

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
  { label: "Blog", href: "/blog", category: "Pages" },
  { label: "Brand Identity", href: "/brand", category: "Pages" },
  { label: "Careers", href: "/careers", category: "Pages" },
  { label: "FAQ", href: "/faq", category: "Pages" },
  { label: "SMEs & Startups", href: "/work/smes", category: "Industries", description: "Brand and digital for growing ventures" },
  { label: "Mining & Resources", href: "/work/mining", category: "Industries", description: "Safety portals and compliance dashboards" },
  { label: "Government", href: "/work/government", category: "Industries", description: "Accessible public sector platforms" },
  { label: "Tourism & Hospitality", href: "/work/tourism", category: "Industries", description: "Booking platforms and destination brands" },
  { label: "Agriculture", href: "/work/agriculture", category: "Industries", description: "Agri-tech and marketplace platforms" },
  { label: "Finance", href: "/work/finance", category: "Industries", description: "Fintech dashboards and banking portals" },
  { label: "Education", href: "/work/education", category: "Industries", description: "Learning platforms and EdTech" },
  { label: "Healthcare", href: "/work/healthcare", category: "Industries", description: "Patient portals and telemedicine" },
  { label: "Energy", href: "/work/energy", category: "Industries", description: "Renewable energy and utility platforms" },
  { label: "Website Design", href: "/services/website-design", category: "Services", description: "Intentional interfaces" },
  { label: "Website Development", href: "/services/website-development", category: "Services", description: "Engineered to perform" },
  { label: "Application Design", href: "/services/application-design", category: "Services", description: "Complex systems, clear UX" },
  { label: "Product Design", href: "/services/product-design", category: "Services", description: "End-to-end product thinking" },
  { label: "Brand Systems", href: "/services/brand-systems", category: "Services", description: "Cohesive visual identity" },
  { label: "Design Systems", href: "/services/design-systems", category: "Services", description: "Scalable component architecture" },
  { label: "Creative Direction", href: "/services/creative-direction", category: "Services", description: "Strategic visual leadership" },
];

/* ─── Hamburger Icon ──────────────────────────────────────────── */

function HamburgerIcon({ isOpen, dark = false }: { isOpen: boolean; dark?: boolean }) {
  const color = dark ? "bg-ink" : "bg-skeleton-bone";
  return (
    <div className="w-5 h-5 flex flex-col justify-center gap-[5px] relative">
      <span
        className={`block w-full h-[1.5px] ${color} transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-[3.25px]" : ""
        }`}
      />
      <span
        className={`block w-full h-[1.5px] ${color} transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
        }`}
      />
    </div>
  );
}

/* ─── Desktop Mega-Menu Dropdown ──────────────────────────────── */

function DesktopDropdown({
  item,
  pathname,
  onHoverStart,
  onHoverEnd,
}: {
  item: NavItem;
  pathname: string;
  onHoverStart: (rect: DOMRect) => void;
  onHoverEnd: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
    if (linkRef.current) {
      onHoverStart(linkRef.current.getBoundingClientRect());
    }
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    onHoverEnd();
  }, [onHoverEnd]);

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
        ref={linkRef}
        href={item.href}
        className={`font-jetbrains text-[10px] uppercase tracking-[0.2em] relative group inline-flex items-center transition-colors duration-300 py-1 ${
          isActive
            ? "text-skeleton-bone"
            : "text-skeleton-bone/60 hover:text-skeleton-bone"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        {isActive && (
          <motion.span
            layoutId="active-nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-signal-teal"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full pt-3 z-50"
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            <div className="bg-atlantic-black/95 border border-white/[0.08] min-w-[340px] overflow-hidden" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              {/* Teal accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-signal-teal origin-left"
                aria-hidden="true"
              />

              {/* Optional tagline */}
              {item.megaTagline && (
                <div className="px-5 py-3 border-b border-white/[0.06]">
                  <span className="font-satoshi text-[12px] text-skeleton-bone/40 italic">
                    {item.megaTagline}
                  </span>
                </div>
              )}

              <div className="py-2">
                {item.children.map((child, i) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <motion.div
                      key={child.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={child.href}
                        className={`flex items-center justify-between px-5 py-3 transition-all duration-200 ${
                          isChildActive
                            ? "text-skeleton-bone bg-white/[0.08]"
                            : "text-skeleton-bone/60 hover:text-skeleton-bone hover:bg-white/[0.05]"
                        }`}
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                      >
                        <div>
                          <span className="font-cabinet text-sm font-bold tracking-tight block">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="font-satoshi text-[11px] text-skeleton-bone/30 mt-0.5 block">
                              {child.description}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-skeleton-bone/20 shrink-0 ml-4" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Optional bottom image preview */}
              {item.megaImage && (
                <div className="border-t border-white/[0.06]">
                  <div className="relative h-24 overflow-hidden">
                    <Image
                      src={item.megaImage}
                      alt={item.megaImageAlt || ""}
                      className="object-cover"
                      fill
                      sizes="340px"
                    />
                    <div className="absolute inset-0 bg-atlantic-black/30" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Search Overlay (Cmd+K) ──────────────────────────────────── */

function SearchOverlay({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      )
    : searchableItems;

  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatResults = Object.values(grouped).flat();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && flatResults[selectedIndex]) {
        e.preventDefault();
        onClose();
        window.location.href = flatResults[selectedIndex].href;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex, onClose]);

  useEffect(() => {
    if (!resultsRef.current) return;
    const selected = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-atlantic-black/60"
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[61] w-[min(640px,calc(100vw-48px))] bg-atlantic-black border border-white/[0.08] overflow-hidden"
            style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="flex items-center px-5 py-4 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-skeleton-bone/50 mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search pages, services..."
                className="flex-1 bg-transparent font-jetbrains text-sm text-skeleton-bone placeholder:text-skeleton-bone/30 focus:outline-none"
                aria-label="Search"
              />
              <kbd className="font-jetbrains text-[9px] text-skeleton-bone/20 border border-white/[0.08] px-1.5 py-0.5 ml-3">
                ESC
              </kbd>
            </div>

            <div ref={resultsRef} className="max-h-[45vh] overflow-y-auto p-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="px-3 py-2">
                    <span className="font-jetbrains text-[9px] text-skeleton-bone/25 uppercase tracking-[0.2em]">
                      {category}
                    </span>
                  </div>
                  {items.map((item) => {
                    const flatIndex = flatResults.indexOf(item);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        data-index={flatIndex}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-2.5 transition-colors duration-150 ${
                          flatIndex === selectedIndex
                            ? "bg-white/[0.08] text-skeleton-bone"
                            : "text-skeleton-bone/50 hover:text-skeleton-bone hover:bg-white/[0.04]"
                        }`}
                      >
                        <div>
                          <span className="font-cabinet text-sm font-bold tracking-tight">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="block font-satoshi text-[11px] text-skeleton-bone/30">
                              {item.description}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-skeleton-bone/15 shrink-0 ml-3" />
                      </Link>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <span className="font-jetbrains text-[11px] text-skeleton-bone/25 uppercase tracking-[0.15em]">
                    No results found
                  </span>
                </div>
              )}
            </div>

            <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center gap-4">
              <span className="font-jetbrains text-[9px] text-skeleton-bone/20">
                <kbd className="border border-white/[0.08] px-1 py-0.5 mr-0.5">↑</kbd>
                <kbd className="border border-white/[0.08] px-1 py-0.5 mr-1">↓</kbd>
                Navigate
              </span>
              <span className="font-jetbrains text-[9px] text-skeleton-bone/20">
                <kbd className="border border-white/[0.08] px-1 py-0.5 mr-1">↵</kbd>
                Open
              </span>
              <span className="font-jetbrains text-[9px] text-skeleton-bone/20">
                <kbd className="border border-white/[0.08] px-1 py-0.5 mr-1">esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
      {hasChildren ? (
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
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={`font-cabinet text-xl sm:text-2xl tracking-[0.15em] uppercase transition-colors duration-300 block text-center ${
            item.href === "/contact"
              ? "text-signal-teal hover:text-signal-teal-light"
              : isActive
              ? "text-skeleton-bone"
              : "text-fog-gray/60 hover:text-skeleton-bone"
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

/* ─── Staggered Entrance Variants ──────────────────────────────── */

const STUDIO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navItemVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.07,
      duration: 0.5,
      ease: STUDIO_EASE,
    },
  }),
};

const navRightVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + navItems.length * 0.07 + i * 0.07,
      duration: 0.5,
      ease: STUDIO_EASE,
    },
  }),
};

/* ─── Main Navigation Component ───────────────────────────────── */

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Scroll tracking — determine if scrolled past hero area
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 60);

          // Scroll progress for page indicator
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            setScrollProgress(Math.min(1, Math.max(0, currentScrollY / docHeight)));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body lock for mobile menu
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

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Close search on route change
  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Floating Pill Navigation ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[1000] top-4 left-1/2 -translate-x-1/2 w-[min(1200px,calc(100%-2rem))] md:top-4"
        style={{
          borderRadius: "999px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: isScrolled
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.08)",
          border: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          padding: "0.6rem 1.25rem",
          transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/"
              className="relative h-7 md:h-8 flex items-center transition-opacity duration-300 hover:opacity-80"
              aria-label="Tangison Studio home"
            >
              {/* Light logo for floating dark nav */}
              <Image
                src="/brand/logo-light.webp"
                alt="TANGISON STUDIO"
                width={874}
                height={286}
                className="h-6 md:h-7 w-auto object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop navigation links */}
          <div className="hidden lg:flex items-center gap-6 relative">
            {navItems.map((item, i) =>
              item.children ? (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <DesktopDropdown
                    item={item}
                    pathname={pathname}
                    onHoverStart={() => {}}
                    onHoverEnd={() => {}}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    className={`font-jetbrains text-[10px] uppercase tracking-[0.2em] relative group inline-flex items-center transition-colors duration-300 py-1 ${
                      item.href === "/contact"
                        ? "text-signal-teal hover:text-signal-teal-light"
                        : pathname === item.href
                        ? "text-skeleton-bone"
                        : "text-skeleton-bone/60 hover:text-skeleton-bone"
                    }`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-signal-teal"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            )}
          </div>

          {/* Right side: Search + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              custom={0}
              variants={navRightVariants}
              initial="hidden"
              animate="visible"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-skeleton-bone/60 hover:text-skeleton-bone transition-colors duration-300 py-1.5 px-2.5 border border-white/[0.1] hover:border-white/[0.2]"
              aria-label="Open search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden md:inline font-jetbrains text-[8px] text-skeleton-bone/25 border border-white/[0.1] px-1 py-0.5 ml-1">
                ⌘K
              </kbd>
            </motion.button>

            <motion.div
              custom={1}
              variants={navRightVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/contact"
                className="bg-signal-teal text-signal-white px-5 py-2.5 font-cabinet font-bold text-[11px] tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300 inline-block"
                style={{ borderRadius: "999px" }}
              >
                Let&apos;s Build →
              </Link>
            </motion.div>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-skeleton-bone/70 hover:text-skeleton-bone transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              className="p-2 -mr-2 text-skeleton-bone/70 hover:text-skeleton-bone transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <HamburgerIcon isOpen={isMobileOpen} />
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        {isScrolled && (
          <div
            className="absolute bottom-0 left-4 right-4 h-[1px] bg-signal-teal/30"
            style={{ width: `${scrollProgress * 100}%`, maxWidth: "calc(100% - 2rem)" }}
            aria-hidden="true"
          />
        )}
      </motion.nav>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        pathname={pathname}
      />

      {/* Mobile Menu Overlay — Atlantic Black */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] bg-atlantic-black flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <div className="flex justify-end px-5 sm:px-6 pt-4 md:pt-5">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-skeleton-bone p-2 -mr-2"
                aria-label="Close menu"
              >
                <HamburgerIcon isOpen={true} />
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
                    <MobileAccordionItemDark item={item} pathname={pathname} onClose={() => setIsMobileOpen(false)} />
                  </motion.div>
                ))}
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
    </>
  );
}
