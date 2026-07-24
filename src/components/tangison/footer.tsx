"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { StudioLogo } from "@/components/studio/studio-logo";
import { socialLinks } from "@/config/social";

/**
 * Footer — compact, mobile-optimized, with atmospheric painting.
 * Two rows on desktop, stacked on mobile.
 * Target: under 400px desktop, under 520px mobile.
 */

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const parentLinks = [
  { label: "Tangison", href: "https://tangison.com" },
  { label: "Labs", href: "https://labs.tangison.com" },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
] as const;

export function Footer() {
  return (
    <footer
      className="bg-atlantic-black text-skeleton-bone"
      role="contentinfo"
    >
      <h2 className="sr-only">Site footer</h2>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        {/* Row 1 — logo + painting + links */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
          {/* Left — logo + tagline */}
          <div className="flex flex-col gap-2">
            <StudioLogo size={28} wordmarkColor="light" />
            <p className="font-satoshi text-xs sm:text-sm text-skeleton-bone/70 max-w-xs">
              Brand, product, and the systems behind it. One studio instead of three vendors.
            </p>
          </div>

          {/* Center — atmospheric painting (hidden on mobile to save space) */}
          <div className="hidden md:block">
            <div className="w-32 h-20 overflow-hidden rounded-[25px]">
              <Image
                src="/images/paintings/footer-atmosphere.webp"
                alt="An oil painting of a dark Namibian coastline at night with one small teal signal light."
                width={128}
                height={80}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — links */}
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-4 sm:gap-5 md:justify-end">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-satoshi text-sm text-skeleton-bone/60 hover:text-signal-teal transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            {parentLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Row 2 — social + email */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-white/5 pt-6">
          <div className="flex flex-wrap items-center gap-4">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-satoshi text-sm text-skeleton-bone/60 hover:text-signal-teal transition-colors capitalize whitespace-nowrap"
              >
                {platform}
              </a>
            ))}
          </div>
          <a
            href="mailto:studio@tangison.com"
            className="font-satoshi text-sm text-skeleton-bone/60 hover:text-signal-teal transition-colors whitespace-nowrap"
          >
            studio@tangison.com
          </a>
        </div>

        {/* Row 3 — legal + copyright */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-satoshi text-xs text-skeleton-bone/60 hover:text-skeleton-bone/70 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-jetbrains text-[9px] text-skeleton-bone/60 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            © 2026 Tangison Studio · Windhoek, Namibia
          </p>
        </div>
      </div>
    </footer>
  );
}
