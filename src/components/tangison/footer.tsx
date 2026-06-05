"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const footerLinks = {
  Services: [
    { label: "Applied AI", href: "/services/applied-ai" },
    { label: "AI Infrastructure", href: "/services/infrastructure" },
    { label: "AI Consulting", href: "/services/consulting" },
  ],
  Products: [
    { label: "SkillsCamp", href: "/products/skillscamp" },
    { label: "Tangison Agent", href: "/products/tangison-agent" },
    { label: "SMEFrog Academy", href: "/products/smefrog-academy" },
    { label: "Feorm", href: "/products/feorm" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Brand", href: "/brand" },
  ],
  Insights: [
    { label: "Articles", href: "/insights/articles" },
    { label: "Case Studies", href: "/insights/case-studies" },
    { label: "Resources", href: "/insights/resources" },
  ],
  Connect: [
    { label: "contact@tangison.com", href: "mailto:contact@tangison.com", external: true },
    { label: "github.com/tangison", href: "https://github.com/tangison", external: true },
  ],
} as const;

function CopyDomainButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("tangison.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "tangison.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 font-jetbrains text-[11px] text-white/30 tracking-[0.15em] hover:text-white/60 transition-colors duration-300"
      aria-label="Copy tangison.com to clipboard"
    >
      <span>tangison.com</span>
      {copied ? (
        <Check className="w-3 h-3 text-rust-signal" />
      ) : (
        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      )}
    </button>
  );
}

export function Footer() {
  const footerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={footerRef}
      className="bg-atlantic-black border-t border-white/[0.04]"
    >
      {/* Top section with big logo and tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Big logo */}
          <div className="mb-8">
            <Image
              src="/images/logo-white.webp"
              alt="TANGISON"
              width={874}
              height={286}
              className="h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </div>

          {/* Tagline + location row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 mb-12 md:mb-16">
            <p className="font-cabinet text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 tracking-tight leading-tight max-w-lg">
              Applied AI.<br />
              Built in Africa.
            </p>
            <div className="flex flex-col gap-1 pb-1">
              <span className="font-jetbrains text-[10px] text-white/25 uppercase tracking-[0.3em]">Location</span>
              <span className="font-jetbrains text-[11px] text-white/50 uppercase tracking-[0.15em]">Windhoek, Namibia</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-white/[0.06] mb-12 md:mb-16" />
        </div>
      </motion.div>

      {/* Link columns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16">
            {/* Services column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.3em] mb-5">
                Services
              </h3>
              <div className="flex flex-col gap-3">
                {footerLinks.Services.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-jetbrains text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-rust-signal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Products column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.3em] mb-5">
                Products
              </h3>
              <div className="flex flex-col gap-3">
                {footerLinks.Products.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-jetbrains text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-rust-signal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Company column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.3em] mb-5">
                Company
              </h3>
              <div className="flex flex-col gap-3">
                {footerLinks.Company.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-jetbrains text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-rust-signal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Insights column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.3em] mb-5">
                Insights
              </h3>
              <div className="flex flex-col gap-3">
                {footerLinks.Insights.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-jetbrains text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white/80 transition-colors duration-300 relative group/link inline-block w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-rust-signal/50 group-hover/link:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect column */}
            <div>
              <h3 className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.3em] mb-5">
                Connect
              </h3>
              <div className="flex flex-col gap-3">
                {footerLinks.Connect.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-jetbrains text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white/80 transition-colors duration-300 relative group/link inline-flex items-center gap-1.5 w-fit"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-60 transition-opacity" />}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-rust-signal/50 group-hover/link:w-full transition-all duration-500" />
                  </a>
                ))}
              </div>

              {/* CTA in Connect column */}
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-rust-signal text-warm-white px-6 py-3.5 font-jetbrains text-[10px] uppercase tracking-[0.2em] hover:bg-rust-light transition-colors duration-300 group"
                >
                  Contact Us
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <div className="mt-5">
                <CopyDomainButton />
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
            &copy; {new Date().getFullYear()} TANGISON. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy"
              className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.2em] hover:text-white/40 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="font-jetbrains text-[9px] text-white/20 uppercase tracking-[0.2em] hover:text-white/40 transition-colors"
            >
              Terms
            </Link>
            <span className="font-jetbrains text-[9px] text-white/15 uppercase tracking-[0.2em]">
              Windhoek, Namibia
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
