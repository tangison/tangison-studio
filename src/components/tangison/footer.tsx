"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { socialLinks } from "@/config/social";

const footerColumns = {
  Studio: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "The Studio", href: "/studio" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Brand", href: "/brand" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/resources" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
} as const;

const techColumn = {
  label: "Tangison Technologies",
  descriptor: "One company. Two arms.",
  links: [
    { label: "Applied AI Laboratory", href: "https://tangison.com", external: true },
    { label: "Creative Studio", href: "https://studio.tangison.com", external: true },
    { label: "About the Company", href: "https://tangison.com/about", external: true },
  ],
} as const;

export function Footer() {
  const footerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={footerRef}
      className="relative bg-atlantic-black border-t border-white/[0.04] overflow-hidden"
    >
      {/* Gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-atlantic-black via-atlantic-black to-terminal-black pointer-events-none" />
      {/* Top section — logo + tagline + images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Logo mark + wordmark */}
          <div className="mb-8">
            <Image
              src="/brand/logo-light.webp"
              alt="TANGISON STUDIO"
              width={874}
              height={286}
              className="h-14 md:h-18 lg:h-20 w-auto object-contain"
            />
          </div>

          {/* Tagline */}
          <p className="font-satoshi text-lg md:text-xl text-skeleton-bone/70 font-light leading-relaxed max-w-lg mb-10">
            Designing the interfaces through which intelligence becomes useful.
          </p>

          {/* Two editorial images */}
          <div className="grid grid-cols-2 gap-3 mb-12 md:mb-16">
            <div className="relative h-32 md:h-48 lg:h-56 overflow-hidden">
              <Image
                src="/images/gallery/footer-editorial-left.webp"
                alt="Namibian dune landscape"
                className="object-cover cinematic-image"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-atlantic-black/60 to-transparent" />
            </div>
            <div className="relative h-32 md:h-48 lg:h-56 overflow-hidden">
              <Image
                src="/images/gallery/footer-editorial-right.webp"
                alt="Etosha salt pan"
                className="object-cover cinematic-image"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-atlantic-black/60 to-transparent" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-white/[0.06]" />
        </div>
      </motion.div>

      {/* Link columns + Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-16"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-16">
            {/* Studio column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-5">
                Studio
              </h3>
              <div className="flex flex-col gap-3">
                {footerColumns.Studio.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-fog-gray hover:text-skeleton-bone transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-5">
                Resources
              </h3>
              <div className="flex flex-col gap-3">
                {footerColumns.Resources.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-fog-gray hover:text-skeleton-bone transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-5">
                Legal
              </h3>
              <div className="flex flex-col gap-3">
                {footerColumns.Legal.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-fog-gray hover:text-skeleton-bone transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Tangison Technologies column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-2">
                {techColumn.label}
              </h3>
              <p className="font-satoshi text-[11px] text-fog-gray mb-4">
                {techColumn.descriptor}
              </p>
              <div className="flex flex-col gap-3">
                {techColumn.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-satoshi text-sm text-fog-gray hover:text-skeleton-bone transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact column */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-5">
                Contact
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:studio@tangison.com"
                  className="font-satoshi text-sm text-fog-gray hover:text-skeleton-bone transition-colors duration-300 relative group/link inline-block w-fit"
                >
                  studio@tangison.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                </a>
                <Link
                  href="/contact"
                  className="font-satoshi text-sm text-fog-gray hover:text-skeleton-bone transition-colors duration-300 relative group/link inline-block w-fit"
                >
                  studio.tangison.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                </Link>
              </div>
            </div>

            {/* Social icons */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em] mb-5">
                Follow
              </h3>
              <div className="flex flex-col gap-3">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-satoshi text-sm text-white/40 hover:text-signal-teal transition-colors duration-300 relative group/link inline-block w-fit capitalize"
                  >
                    {platform}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 border-t border-white/[0.04]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-jetbrains text-[9px] text-fog-gray/60 uppercase tracking-[0.3em]">
            &copy; 2026 Tangison Systems. All Rights Reserved.
          </p>
          <p className="font-jetbrains text-[9px] text-fog-gray/50 uppercase tracking-[0.2em]">
            Digital Infrastructure by Tuppaman Group
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
