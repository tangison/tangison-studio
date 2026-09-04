"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

/**
 * Floating pill navigation + off-canvas drawer.
 *
 * The drawer is rebuilt from scratch because the production off-canvas was
 * broken on mobile. This implementation handles, in order of importance:
 *  - body scroll lock (overflow + position, restores on close)
 *  - focus trap + focus return to the trigger button
 *  - Escape key closes
 *  - backdrop click closes
 *  - 48px+ touch targets, dvh-aware height (no iOS 100vh jump)
 *  - route change closes the menu
 *  - reduced-motion respected via CSS transitions
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // route change closes the drawer — state adjusted during render
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
    // move focus into the drawer
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

      {/* off-canvas drawer */}
      <div
        className="fixed inset-0 z-[200] lg:hidden"
        aria-hidden={!open}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {/* backdrop */}
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={close}
          className="drawer-backdrop absolute inset-0"
          style={{
            background: "var(--overlay)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
        />
        {/* panel */}
        <div
          id="offcanvas-menu"
          ref={panelRef}
          role="dialog"
          aria-modal={open}
          aria-label="Menu"
          className="drawer-panel absolute right-0 top-0 h-[100dvh] w-full sm:max-w-[420px] flex flex-col border-l border-line"
          style={{
            background: "var(--paper)",
            transform: open ? "translateX(0)" : "translateX(102%)",
            visibility: open ? "visible" : "hidden",
          }}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-line shrink-0">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line hover:bg-teal-mist transition-colors"
            >
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto scroll-slim px-6 py-8">
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <li
                  key={l.href}
                  className="reveal"
                  style={{
                    transition: `opacity .5s var(--ease-primary) ${0.08 + i * 0.06}s, transform .5s var(--ease-primary) ${0.08 + i * 0.06}s`,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(14px)",
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={close}
                    className="group flex items-center justify-between min-h-[64px] px-4 -mx-4 rounded-2xl hover:bg-teal-mist transition-colors"
                  >
                    <span className="font-display font-bold text-[clamp(1.6rem,6vw,2rem)] tracking-[-0.02em]">
                      {l.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-6 h-6 text-ink-faint group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-line flex flex-col gap-4">
              <a
                href={`mailto:${site.email}`}
                className="text-base font-medium link-underline"
              >
                {site.email}
              </a>
              <a href={site.phoneHref} className="text-base font-medium link-underline">
                {site.phone}
              </a>
              <p className="eyebrow mt-2">{site.location} · {site.hours}</p>
            </div>
          </nav>

          <div className="px-6 py-6 border-t border-line shrink-0" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
            <Link
              href="/contact"
              onClick={close}
              className="flex items-center justify-center min-h-[56px] w-full rounded-full bg-ink text-paper font-medium"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
