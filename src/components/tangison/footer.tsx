"use client";

import React from "react";
import Link from "next/link";
import { StudioLogo } from "@/components/studio/studio-logo";
import { socialLinks } from "@/config/social";

/**
 * Minimal Collins-style footer.
 *
 * Logo, one line of links, social, copyright.
 * No editorial images, no multi-column complexity, no gradients.
 * Just clean, editorial restraint.
 */

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Partnership", href: "/partnership" },
  { label: "FAQ", href: "/faq" },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
] as const;

export function Footer() {
  return (
    <footer
      className="border-t border-card-border bg-skeleton-bone"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top: logo + links */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo + tagline */}
          <div className="space-y-3">
            <StudioLogo size={32} />
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
              Digital products built with clarity, character and purpose.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: social + legal + copyright */}
        <div className="mt-10 flex flex-col gap-4 border-t border-card-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Social */}
          <div className="flex items-center gap-4">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-muted transition-colors hover:text-ink capitalize"
              >
                {platform}
              </a>
            ))}
          </div>

          {/* Legal + copyright */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-xs text-ink-muted">
              © {new Date().getFullYear()} Tangison Studio
            </span>
          </div>
        </div>

        {/* Endorsement */}
        <p className="mt-4 text-xs text-ink-muted">
          A Tangison Technologies company · Windhoek, Namibia
        </p>
      </div>
    </footer>
  );
}
