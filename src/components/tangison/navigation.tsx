"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { StudioLogo } from "@/components/studio/studio-logo";

/**
 * Minimal Collins-style navigation.
 *
 * A simple top bar: logo left, text links center-right, menu on mobile.
 * No mega-menus, no search overlay, no floating pill, no animations.
 * Just clean, editorial restraint.
 */

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false); // eslint-disable-line react-hooks/set-state-in-effect -- close menu on route change is a legitimate sync
  }, [pathname]);

  // Escape closes mobile menu, focus returns to trigger
  useEffect(() => {
    if (!mobileOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    // Focus close button
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      clearTimeout(t);
      previouslyFocused?.focus();
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b border-card-border bg-skeleton-bone/90 backdrop-blur-sm"
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Studio — home"
          >
            <StudioLogo size={32} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center text-ink"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-atlantic-black/40"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-skeleton-bone shadow-xl flex flex-col">
            <div className="flex h-16 items-center justify-between px-6 border-b border-card-border">
              <StudioLogo size={28} />
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3 text-lg font-display font-medium ${
                        isActive(link.href) ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-card-border" />

              <ul className="space-y-1">
                {[
                  { label: "Partnership", href: "/partnership" },
                  { label: "Process", href: "/process" },
                  { label: "Studio", href: "/studio" },
                  { label: "Blog", href: "/blog" },
                  { label: "Resources", href: "/resources" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Careers", href: "/careers" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 text-base text-ink-muted"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-card-border px-6 py-4">
              <a
                href="mailto:studio@tangison.com"
                className="text-sm font-medium text-ink"
              >
                studio@tangison.com
              </a>
              <p className="mt-1 text-xs text-ink-muted">Windhoek, Namibia</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
