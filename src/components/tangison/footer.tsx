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
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Brand", href: "/brand" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/resources" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ],
} as const;

export function Footer() {
  const footerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={footerRef}
      className="bg-atlantic-black border-t border-white/[0.04]"
    >
      {/* Top section — logo + tagline + images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16"
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
                src="/images/gallery/desert-path-quiver-trees.webp"
                alt="Quiver trees lining a desert path in southern Namibia"
                className="object-cover cinematic-image"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-atlantic-black/60 to-transparent" />
            </div>
            <div className="relative h-32 md:h-48 lg:h-56 overflow-hidden">
              <Image
                src="/images/gallery/concrete-glass-architecture-structure.webp"
                alt="Concrete and glass architectural structure representing design precision"
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
        className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16">
            {/* Studio column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal/60 uppercase tracking-[0.3em] mb-5">
                Studio
              </h3>
              <div className="flex flex-col gap-3">
                {footerColumns.Studio.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-white/40 hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal/60 uppercase tracking-[0.3em] mb-5">
                Resources
              </h3>
              <div className="flex flex-col gap-3">
                {footerColumns.Resources.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-white/40 hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-signal-teal/60 uppercase tracking-[0.3em] mb-5">
                Legal
              </h3>
              <div className="flex flex-col gap-3">
                {footerColumns.Legal.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-satoshi text-sm text-white/40 hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact column */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-jetbrains text-[9px] text-signal-teal/60 uppercase tracking-[0.3em] mb-5">
                Contact
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:studio@tangison.com"
                  className="font-satoshi text-sm text-white/40 hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                >
                  studio@tangison.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                </a>
                <Link
                  href="/contact"
                  className="font-satoshi text-sm text-white/40 hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                >
                  studio.tangison.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-signal-teal/50 group-hover/link:w-full transition-all duration-500" />
                </Link>
              </div>
            </div>

            {/* Social icons */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-jetbrains text-[9px] text-signal-teal/60 uppercase tracking-[0.3em] mb-5">
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
        className="border-t border-white/[0.04]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.3em]">
            &copy; 2026 Tangison Systems. All Rights Reserved.
          </p>
          <p className="font-jetbrains text-[9px] text-white/15 uppercase tracking-[0.2em]">
            Digital Infrastructure by Tuppaman Group
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
