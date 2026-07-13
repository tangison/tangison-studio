"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StudioLogo } from "@/components/studio/studio-logo";
import { socialLinks } from "@/config/social";

/**
 * Intentional closing composition.
 * Dark background, oil-painted fragment, short invitation, pill CTA.
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
      className="bg-atlantic-black text-skeleton-bone"
      role="contentinfo"
    >
      {/* Top — invitation + painting fragment */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display font-bold text-skeleton-bone text-2xl md:text-3xl mb-3">
              Build something worth shipping.
            </h2>
            <p className="font-satoshi text-sm text-skeleton-bone/70 mb-6 max-w-md">
              Studio designs and builds digital products from Windhoek, Namibia.
            </p>
            <Link href="/contact" className="btn-pill btn-pill-teal">
              Start a project
              <span className="arrow-island"><ArrowUpRight className="w-3.5 h-3.5" /></span>
            </Link>
          </div>
          <figure className="painting-frame aspect-[4/3] max-w-xs">
            <Image
              src="/images/paintings/night-signal.webp"
              alt="An oil painting of a dark Namibian coast at night with heavy ocean brushwork and one small teal circular signal."
              width={400}
              height={300}
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </figure>
        </div>
      </div>

      {/* Middle — logo + links + social */}
      <div className="mx-auto max-w-6xl px-6 py-8 border-t border-white/5">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Logo + tagline */}
          <div>
            <StudioLogo size={32} wordmarkColor="light" />
            <p className="font-satoshi text-sm text-skeleton-bone/50 mt-3 max-w-xs">
              We build the brand, the product and the intelligence behind it.
            </p>
          </div>

          {/* Links + social */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <nav aria-label="Pages">
              <p className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-4">Pages</p>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social">
              <p className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-4">Social</p>
              <ul className="space-y-2">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <li key={platform}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors capitalize">
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <p className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-4">Legal</p>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-satoshi text-sm text-skeleton-bone/70 hover:text-signal-teal transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom — copyright + endorsement */}
      <div className="mx-auto max-w-6xl px-6 py-5 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-jetbrains text-[9px] text-skeleton-bone/40 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Tangison Studio
          </p>
          <p className="font-jetbrains text-[9px] text-skeleton-bone/40 uppercase tracking-[0.2em]">
            A Tangison Technologies company · Windhoek, Namibia
          </p>
        </div>
      </div>
    </footer>
  );
}
