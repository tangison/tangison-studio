"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
      { label: "Website Design", href: "/services#website-design", description: "Intentional interfaces" },
      { label: "Website Development", href: "/services#website-development", description: "Engineered to perform" },
      { label: "Application Design", href: "/services#application-design", description: "Complex systems, clear UX" },
      { label: "Product Design", href: "/services#product-design", description: "End-to-end product thinking" },
      { label: "Brand Systems", href: "/services#brand-systems", description: "Cohesive visual identity" },
      { label: "Design Systems", href: "/services#design-systems", description: "Scalable component architecture" },
      { label: "Creative Direction", href: "/services#creative-direction", description: "Strategic visual leadership" },
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

/* ─── Hamburger Icon ──────────────────────────────────────────── */

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-5 h-5 flex flex-col justify-center gap-[5px] relative">
      <span
        className={`block w-full h-[1.5px] bg-ink transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-[3.25px]" : ""
        }`}
      />
      <span
        className={`block w-full h-[1.5px] bg-ink transition-all duration-300 origin-center ${
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
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-signal-white/20" />
                      {item.megaTagline && (
                        <p className="absolute bottom-4 left-4 font-cabinet text-lg md:text-xl font-bold text-signal-white tracking-tight drop-shadow-lg">
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

  return (
    <>
      {/* Desktop / Shared Nav Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-5 sm:px-6 md:px-12 py-4 md:py-5 flex justify-between items-center ${
          isScrolled
            ? "bg-signal-white/90 border-b border-black/[0.06] py-3 md:py-4"
            : "bg-transparent"
        }`}
        style={{
          backdropFilter: isScrolled ? "blur(24px)" : "blur(0px)",
          WebkitBackdropFilter: isScrolled ? "blur(24px)" : "blur(0px)",
          transition:
            "backdrop-filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo — light variant */}
        <Link
          href="/"
          className="relative h-10 md:h-12 flex items-center transition-opacity duration-300 hover:opacity-80"
          aria-label="Tangison Studio home"
        >
          <Image
            src="/brand/logo-dark.webp"
            alt="TANGISON STUDIO"
            width={874}
            height={286}
            className="h-8 md:h-10 w-auto object-contain"
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
                  className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ease-out ${
                    pathname === item.href
                      ? "w-full bg-signal-teal"
                      : "w-0 group-hover:w-full bg-signal-teal/60"
                  }`}
                />
              </Link>
            )
          )}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 bg-signal-teal text-signal-white px-7 py-3.5 font-cabinet font-bold text-sm tracking-tight hover:opacity-88 hover:-translate-y-px transition-all duration-300"
        >
          Let&apos;s Build →
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          <HamburgerIcon isOpen={isMobileOpen} />
        </button>
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
