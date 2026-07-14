"use client";

import React from "react";
import Link from "next/link";
import { StudioLogo } from "@/components/studio/studio-logo";
import { socialLinks } from "@/config/social";

/**
 * Compact footer — two rows on desktop, minimal.
 * No painting, no repeated CTA, no giant columns.
 * Target: 280-400px desktop, <520px mobile.
 */

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
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
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Row 1 — logo + links + social */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <StudioLogo size={28} wordmarkColor="light" />
            <nav aria-label="Footer" className="flex items-center gap-5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-satoshi text-sm text-skeleton-bone/60 hover:text-signal-teal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-satoshi text-sm text-skeleton-bone/60 hover:text-signal-teal transition-colors capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        {/* Row 2 — email + legal + copyright */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:studio@tangison.com"
            className="font-satoshi text-sm text-skeleton-bone/60 hover:text-signal-teal transition-colors"
          >
            studio@tangison.com
          </a>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-satoshi text-xs text-skeleton-bone/40 hover:text-skeleton-bone/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="font-jetbrains text-[9px] text-skeleton-bone/40 uppercase tracking-[0.2em]">
              © 2026 Tangison Studio · Windhoek, Namibia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
