"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Search, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { projects } from "@/lib/projects";

/**
 * Floating pill navigation + full-screen mobile menu.
 *
 * The mobile menu follows the COLLINS reference: a full-screen dark
 * takeover with big stacked links, a pill CTA, and a scrollable list
 * of case rows (thumbnail + category + title) below it.
 *
 * Accessibility contract (rebuilt from scratch, kept from v2):
 *  - body scroll lock (overflow + position, restores on close)
 *  - focus trap + focus return to the trigger button
 *  - Escape key closes
 *  - 48px+ touch targets, 100dvh height (no iOS vh jump)
 *  - route change closes the menu
 *  - reduced-motion respected via the CSS transition layer
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // route change closes the menu — state adjusted during render
  // (the React-endorsed pattern; avoids setState-in-effect)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // scroll lock + escape + focus trap
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const scrollY = window.scrollY;

    body.style.overflow = "hidden";
    // guard against iOS rubber-banding while locked
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (!active || !panelRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    // move focus into the menu
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 80);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open, close]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed z-[100] top-2 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-auto"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div
          className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-[25px] border border-line"
          style={{
            background: "var(--surface)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <Link
            href="/"
            aria-label="Studio home"
            className="flex items-center gap-2 shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            {/* favicon is a tiny brand asset; plain img avoids optimizer overhead */}
            <img
              src="/brand/favicon.webp"
              alt=""
              width={26}
              height={26}
              className="shrink-0"
              style={{ width: 26, height: 26 }}
            />
            <span className="font-display font-bold text-[14.5px] tracking-[-0.02em] leading-none">
              Studio
            </span>
          </Link>

          <a
            href={site.group.utm}
            className="hidden md:inline-flex items-center gap-1.5 shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted hover:border-line-strong hover:text-ink transition-colors"
          >
            Part of Tangison Technologies
            <ArrowUpRight aria-hidden="true" className="w-3 h-3" />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-body text-sm font-medium transition-colors whitespace-nowrap rounded-full px-1 py-2 ${
                  pathname === l.href || pathname.startsWith(`${l.href}/`)
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search the site"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted hover:border-line-strong hover:text-ink transition-colors"
            >
              <Search aria-hidden="true" className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start a project
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="offcanvas-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-teal-mist transition-colors lg:hidden"
            >
              <span
                aria-hidden="true"
                className="w-5 h-5 flex flex-col justify-center gap-[5px] relative"
              >
                <span
                  className="block w-full h-[1.5px] bg-current transition-all duration-300 origin-center"
                  style={{ transform: open ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="block w-full h-[1.5px] bg-current transition-all duration-300 origin-center"
                  style={{ transform: open ? "rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* full-screen mobile menu — COLLINS-style takeover */}
      <div
        className="fixed inset-0 z-[200] lg:hidden"
        aria-hidden={!open}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div
          id="offcanvas-menu"
          ref={panelRef}
          role="dialog"
          aria-modal={open}
          aria-label="Menu"
          className="menu-takeover flex h-[100dvh] w-full flex-col"
          style={{
            background: "#0c1014",
            color: "#f6f4ef",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(6%)",
            visibility: open ? "visible" : "hidden",
          }}
        >
          {/* header */}
          <div className="flex items-center justify-between px-6 py-5 shrink-0">
            <span className="flex items-center gap-2">
              <img
                src="/brand/favicon.webp"
                alt=""
                width={26}
                height={26}
                style={{ width: 26, height: 26 }}
              />
              <span className="font-display font-bold text-[15px] tracking-[-0.02em]">
                Studio
              </span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: "rgba(246,244,239,0.24)" }}
            >
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>

          {/* scrollable body: search → links → CTA → case rows → contact */}
          <div className="flex-1 overflow-y-auto scroll-slim px-6 pb-6">
            <Link
              href="/search"
              onClick={close}
              className="mt-2 mb-6 flex items-center gap-3 min-h-[56px] w-full rounded-full border"
              style={{
                borderColor: "rgba(246,244,239,0.2)",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
                transitionDelay: open ? "0.04s" : "0s",
              }}
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center"
                aria-hidden="true"
              >
                <Search className="w-5 h-5" style={{ color: "rgba(246,244,239,0.6)" }} />
              </span>
              <span className="font-body text-[15px]" style={{ color: "rgba(246,244,239,0.8)" }}>
                Search articles and cases
              </span>
            </Link>
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="menu-takeover-link flex items-center justify-between min-h-[68px] border-b"
                    style={{
                      borderColor: "rgba(246,244,239,0.12)",
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(16px)",
                      transitionDelay: open
                        ? `${0.06 + i * 0.06}s`
                        : "0s",
                    }}
                  >
                    <span className="font-display font-bold text-[clamp(1.9rem,8vw,2.4rem)] tracking-[-0.02em]">
                      {l.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-6 h-6"
                      style={{ color: "rgba(246,244,239,0.4)" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              onClick={close}
              className="mt-8 flex items-center justify-center min-h-[56px] w-full rounded-full font-medium"
              style={{
                background: "#f6f4ef",
                color: "#111315",
              }}
            >
              Start a project
            </Link>

            <p
              className="eyebrow mt-10"
              style={{ color: "rgba(246,244,239,0.5)" }}
            >
              Selected cases
            </p>
            <ul className="mt-3 flex flex-col">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/cases/${p.slug}`}
                    onClick={close}
                    className="menu-case-row flex items-center gap-4 rounded-2xl py-2.5 pr-2"
                  >
                    <span className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[14px]">
                      <Image
                        src={`/images/paintings/projects/${p.slug}.webp`}
                        alt={`Soft artwork representing ${p.name}`}
                        fill
                        sizes="136px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
                        {p.category}
                      </span>
                      <span className="mt-1 block truncate font-display font-bold text-[17px] tracking-[-0.01em]">
                        {p.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-5 h-5 shrink-0"
                      style={{ color: "rgba(246,244,239,0.4)" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 flex flex-col gap-3" style={{ borderTop: "1px solid rgba(246,244,239,0.12)" }}>
              <a href={`mailto:${site.email}`} className="text-[15px] font-medium link-underline">
                {site.email}
              </a>
              <a href={site.phoneHref} className="text-[15px] font-medium link-underline">
                {site.phone}
              </a>
              <p className="eyebrow mt-2" style={{ color: "rgba(246,244,239,0.5)" }}>
                {site.location} · {site.hours}
              </p>
            </div>
          </div>

          <div
            className="shrink-0 px-6 pb-6"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          >
            <a
              href={site.whatsapp}
              className="flex items-center justify-center min-h-[52px] w-full rounded-full border font-medium"
              style={{ borderColor: "rgba(246,244,239,0.28)" }}
            >
              WhatsApp the studio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
