"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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
    }, 200);
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
          className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-400 ease-out ${
            isActive
              ? "w-full bg-signal-teal"
              : "w-0 group-hover:w-full bg-signal-teal/60"
          }`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full pt-3 z-50"
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            <div className="bg-signal-white border border-black/[0.06] min-w-[320px] overflow-hidden">
              {/* Teal accent line */}
              <div className="h-[2px] bg-signal-teal" aria-hidden="true" />

              <div className="py-3">
                {item.children.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center justify-between px-5 py-3 transition-all duration-200 ${
                        isChildActive
                          ? "text-ink bg-ocean-mist"
                          : "text-ink-muted hover:text-ink hover:bg-ocean-mist/50"
                      }`}
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      <div>
                        <span className="font-cabinet text-sm font-bold tracking-tight block">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="font-satoshi text-[11px] text-ink-muted/50 mt-0.5 block">
                            {child.description}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-3 h-3 text-ink-muted/30 shrink-0 ml-4" />
                    </Link>
                  );
                })}
              </div>
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

  // Filter results
  const filtered = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      )
    : searchableItems;

  // Group by category
  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatResults = Object.values(grouped).flat();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
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
        // Navigate using Next.js router
        window.location.href = flatResults[selectedIndex].href;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex, onClose]);

  // Scroll selected into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const selected = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-atlantic-black/50"
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[61] w-[min(640px,calc(100vw-48px))] bg-signal-white border border-black/[0.06] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            {/* Input */}
            <div className="flex items-center px-5 py-4 border-b border-black/[0.06]">
              <Search className="w-4 h-4 text-ink-muted mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search pages, services..."
                className="flex-1 bg-transparent font-jetbrains text-sm text-ink placeholder:text-ink-muted/40 focus:outline-none"
                aria-label="Search"
              />
              <kbd className="font-jetbrains text-[9px] text-ink-muted/30 border border-black/[0.08] px-1.5 py-0.5 ml-3">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-[45vh] overflow-y-auto p-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="px-3 py-2">
                    <span className="font-jetbrains text-[9px] text-ink-muted/40 uppercase tracking-[0.2em]">
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
                            ? "bg-ocean-mist text-ink"
                            : "text-ink-muted hover:text-ink hover:bg-ocean-mist/30"
                        }`}
                      >
                        <div>
                          <span className="font-cabinet text-sm font-bold tracking-tight">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="block font-satoshi text-[11px] text-ink-muted/50">
                              {item.description}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-ink-muted/20 shrink-0 ml-3" />
                      </Link>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <span className="font-jetbrains text-[11px] text-ink-muted/40 uppercase tracking-[0.15em]">
                    No results found
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 border-t border-black/[0.04] flex items-center gap-4">
              <span className="font-jetbrains text-[9px] text-ink-muted/30">
                <kbd className="border border-black/[0.08] px-1 py-0.5 mr-0.5">↑</kbd>
                <kbd className="border border-black/[0.08] px-1 py-0.5 mr-1">↓</kbd>
                Navigate
              </span>
              <span className="font-jetbrains text-[9px] text-ink-muted/30">
                <kbd className="border border-black/[0.08] px-1 py-0.5 mr-1">↵</kbd>
                Open
              </span>
              <span className="font-jetbrains text-[9px] text-ink-muted/30">
                <kbd className="border border-black/[0.08] px-1 py-0.5 mr-1">esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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

/* ─── Main Navigation Component ───────────────────────────────── */

type NavVisualState = "top" | "floating" | "hidden";

export function Navigation() {
  const [navState, setNavState] = useState<NavVisualState>("top");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Scroll tracking — ultra-smooth with requestAnimationFrame
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    let scrollDirection: "up" | "down" | "idle" = "idle";
    let accumulatedDelta = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;

          // Scroll progress for page indicator
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            setScrollProgress(Math.min(1, Math.max(0, currentScrollY / docHeight)));
          }

          // Accumulate delta to filter out micro-scroll jitter
          accumulatedDelta += delta;

          if (Math.abs(accumulatedDelta) > 8) {
            scrollDirection = accumulatedDelta > 0 ? "down" : "up";
            accumulatedDelta = 0;
          }

          // State transitions
          if (currentScrollY < 60) {
            setNavState("top");
          } else if (scrollDirection === "down" && currentScrollY > 300) {
            setNavState("hidden");
          } else {
            setNavState("floating");
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
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
      // Cmd+K / Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      // Escape to close search
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

  const isFloating = navState === "floating";
  const isTop = navState === "top";
  const isHidden = navState === "hidden";

  return (
    <>
      {/* Desktop / Shared Nav Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: isHidden ? -100 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.3 },
        }}
        className={`fixed z-50 transition-all duration-700 ${
          isFloating
            ? "top-3 left-4 right-4 md:left-6 md:right-6 lg:left-auto lg:right-auto lg:top-4 lg:max-w-[1200px] lg:mx-auto bg-signal-white/[0.97] border border-black/[0.06] px-5 md:px-8 py-3 md:py-3.5"
            : "top-0 left-0 w-full px-5 sm:px-6 md:px-12 lg:px-20 py-4 md:py-5 bg-transparent"
        }`}
        style={{
          backdropFilter: isFloating ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: isFloating ? "blur(20px)" : "blur(0px)",
          transition: "backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), top 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Teal accent line — visible when floating */}
        {isFloating && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-signal-teal origin-left"
            aria-hidden="true"
          />
        )}

        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-8 md:h-10 flex items-center transition-opacity duration-300 hover:opacity-80"
            aria-label="Tangison Studio home"
          >
            <Image
              src="/brand/logo-dark.webp"
              alt="TANGISON STUDIO"
              width={874}
              height={286}
              className={`${
                isFloating ? "h-7 md:h-8" : "h-8 md:h-10"
              } w-auto object-contain transition-all duration-500`}
              priority
            />
          </Link>

          {/* Desktop navigation links */}
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
                    className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-400 ease-out ${
                      pathname === item.href
                        ? "w-full bg-signal-teal"
                        : "w-0 group-hover:w-full bg-signal-teal/60"
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          {/* Right side: Search + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-ink transition-colors duration-300 py-2 px-2.5 border border-black/[0.06] hover:border-black/[0.12]"
              aria-label="Open search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden md:inline font-jetbrains text-[8px] text-ink-muted/30 border border-black/[0.08] px-1 py-0.5 ml-1">
                ⌘K
              </kbd>
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="bg-signal-teal text-signal-white px-6 py-3 font-cabinet font-bold text-sm tracking-tight hover:opacity-88 hover:-translate-y-px transition-all duration-300"
            >
              Let&apos;s Build →
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-ink"
              aria-label="Open search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <button
              className="p-2 -mr-2 text-ink"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <HamburgerIcon isOpen={isMobileOpen} dark />
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        {isFloating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 h-[1.5px] bg-signal-teal/30"
            style={{ width: `${scrollProgress * 100}%` }}
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
            className="fixed inset-0 z-40 bg-atlantic-black flex flex-col"
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
