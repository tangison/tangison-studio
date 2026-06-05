"use client";

import React, { useState } from "react";
import { SiteShell } from "@/components/tangison/site-shell";
import { motion } from "framer-motion";
import Image from "next/image";

/* ─── Color Data ──────────────────────────────────────────────── */

const colors = [
  { name: "Warm White", hex: "#FAFAF8", token: "warm-white", usage: "Primary background" },
  { name: "Warm Gray", hex: "#F0EDE8", token: "warm-gray", usage: "Card surfaces" },
  { name: "Sand Gray", hex: "#E8E5DF", token: "sand-gray", usage: "Subtle backgrounds" },
  { name: "Atlantic Black", hex: "#111315", token: "atlantic-black", usage: "Dark sections, primary text" },
  { name: "Terminal Black", hex: "#0A0B0C", token: "terminal-black", usage: "Deepest surfaces" },
  { name: "Steel Shadow", hex: "#1C1E22", token: "steel-shadow", usage: "Dark cards" },
  { name: "Ink", hex: "#111315", token: "ink", usage: "Primary text" },
  { name: "Ink Muted", hex: "#6B6860", token: "ink-muted", usage: "Secondary text" },
  { name: "Rust Signal", hex: "#C56A4A", token: "rust-signal", usage: "Accent, CTAs" },
  { name: "Rust Light", hex: "#D4896F", token: "rust-light", usage: "Hover states" },
  { name: "Deep Ocean", hex: "#16353D", token: "deep-ocean", usage: "Info states" },
] as const;

const lightHexes = ["#FAFAF8", "#F0EDE8", "#E8E5DF", "#D4896F"];

/* ─── Copy-all content ────────────────────────────────────────── */

const BRAND_SPEC_MD = `# TANGISON Brand Specifications

## Brand Overview
TANGISON is a Namibian applied AI laboratory. The brand communicates precision, restraint, and deliberate craftsmanship.

## Logo
TANGISON Logo (icon + wordmark)
Minimum size: 24px
Clear space: equal to mark height on all sides
Note: Use logo-white.webp on dark backgrounds. Use logo.webp on light backgrounds.

## Colors
- Warm White: #FAFAF8 (warm-white): Primary background
- Warm Gray: #F0EDE8 (warm-gray): Card surfaces
- Sand Gray: #E8E5DF (sand-gray): Subtle backgrounds
- Atlantic Black: #111315 (atlantic-black): Dark sections, primary text
- Terminal Black: #0A0B0C (terminal-black): Deepest surfaces
- Steel Shadow: #1C1E22 (steel-shadow): Dark cards
- Ink: #111315 (ink): Primary text
- Ink Muted: #6B6860 (ink-muted): Secondary text
- Rust Signal: #C56A4A (rust-signal): Accent, CTAs
- Rust Light: #D4896F (rust-light): Hover states
- Deep Ocean: #16353D (deep-ocean): Info states

## Typography
- Display: Cabinet Grotesk (400, 700, 900)
- Body: Satoshi (300, 400, 500, 700, 900)
- Technical: JetBrains Mono (100-800)

## Voice and Tone
Clear before clever. Direct before diplomatic. Confident without arrogance. Warm without being casual. Practical without being boring.

Words to use: AI, systems, infrastructure, research, laboratory, build, deploy, engineering, practical, Africa, Namibia, applied
Words to avoid: Intelligence (as discipline), sovereign/sovereignty, intercept, signal, deploy (military context), execute/protocol, classified/operational, world-class, cutting-edge, revolutionary, synergy, leverage, empower, disruptive, game-changing, paradigm shift`;

/* ─── Animation helpers ───────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

/* ─── ColorSwatch Component ───────────────────────────────────── */

function ColorSwatch({ color }: { color: typeof colors[number] }) {
  const isLight = lightHexes.includes(color.hex);

  return (
    <div className="border border-black/[0.06] bg-warm-gray">
      {/* Color block */}
      <div
        className="h-20 w-full"
        style={{ backgroundColor: color.hex }}
      />
      {/* Info */}
      <div className="p-3">
        <p className="font-cabinet text-sm text-ink">{color.name}</p>
        <p className="font-jetbrains text-[11px] text-ink mt-0.5">{color.hex}</p>
        <p className="font-jetbrains text-[9px] text-ink-muted mt-0.5">{color.token}</p>
      </div>
    </div>
  );
}

/* ─── Main Brand Page ─────────────────────────────────────────── */

export default function BrandPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(BRAND_SPEC_MD);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = BRAND_SPEC_MD;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SiteShell>
      {/* ─── Section 1: Page Header ─── */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 bg-warm-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <div className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-6">
              BRAND
            </div>
            <h1 className="font-cabinet text-5xl md:text-8xl text-ink tracking-tight mb-6">
              Brand Guidelines
            </h1>
            <p className="font-satoshi text-lg text-ink-muted font-light leading-relaxed max-w-2xl">
              The TANGISON brand system for partners, designers, and collaborators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Brand Overview ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Brand overview">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <p className="font-satoshi text-lg md:text-xl text-ink font-light leading-relaxed max-w-3xl mb-12">
              TANGISON is a Namibian applied AI laboratory. The brand communicates precision, restraint, and deliberate craftsmanship. Every visual and verbal expression should reinforce these qualities.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Restrained", "Precise", "Deliberate", "Architectural", "Warm"].map((attr) => (
                <span
                  key={attr}
                  className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted border border-black/[0.06] bg-warm-gray px-4 py-2"
                >
                  {attr}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Logo ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Logo">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl text-ink mb-4">Logo</h2>
            <p className="font-jetbrains text-[11px] text-ink-muted uppercase tracking-[0.15em] mb-16">
              TANGISON Logo
            </p>

            {/* Logo display — large, centered */}
            <div className="flex justify-center mb-16">
              <div className="border border-black/[0.06] bg-warm-gray p-12 md:p-20">
                <Image
                  src="/images/logo.png"
                  alt="TANGISON Logo"
                  width={874}
                  height={286}
                  className="h-24 md:h-40 w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Usage guidelines */}
            <div className="max-w-3xl mx-auto mb-16">
              <h3 className="font-cabinet text-lg text-ink mb-6">Usage Guidelines</h3>
              <ul className="space-y-3 font-satoshi text-sm text-ink-muted leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-rust-signal shrink-0 mt-0.5">&#8226;</span>
                  <span>Minimum size: 24px</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-rust-signal shrink-0 mt-0.5">&#8226;</span>
                  <span>Clear space: equal to the height of the mark on all sides</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-rust-signal shrink-0 mt-0.5">&#8226;</span>
                  <span>Do not rotate, skew, or alter the mark</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-rust-signal shrink-0 mt-0.5">&#8226;</span>
                  <span>Do not place on busy backgrounds without a solid container</span>
                </li>
              </ul>
            </div>

            {/* Logo on dark + light background */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-atlantic-black border border-black/[0.06] p-10 flex items-center justify-center w-full">
                  <Image
                    src="/images/logo-white.webp"
                    alt="Logo on dark background"
                    width={874}
                    height={286}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em]">Dark background</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-warm-white border border-black/[0.06] p-10 flex items-center justify-center w-full">
                  <Image
                    src="/images/logo.png"
                    alt="Logo on light background"
                    width={874}
                    height={286}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em]">Light background</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Colors ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Colors">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl text-ink mb-4">Colors</h2>
            <p className="font-satoshi text-base text-ink-muted font-light leading-relaxed max-w-2xl mb-16">
              The light-first color palette. Every token is designed for clarity and warmth, with restrained accents.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {colors.map((color) => (
                <ColorSwatch key={color.token} color={color} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: Typography ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Typography">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl text-ink mb-16">Typography</h2>

            <div className="space-y-16">
              {/* Cabinet Grotesk */}
              <div className="border border-black/[0.06] bg-warm-gray p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-cabinet text-2xl text-ink mb-2">Cabinet Grotesk</h3>
                    <span className="font-jetbrains text-[10px] text-rust-signal uppercase tracking-[0.15em]">Display &amp; Headings</span>
                  </div>
                </div>
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-2xl mb-10">
                  The primary display typeface. Used for headlines, section titles, and the wordmark. Geometric, modern, and authoritative.
                </p>
                <div className="space-y-6">
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 400</span>
                    <p className="font-cabinet text-3xl md:text-4xl text-ink">Aa Bb Cc 0123</p>
                  </div>
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 700</span>
                    <p className="font-cabinet text-3xl md:text-4xl text-ink font-bold">Aa Bb Cc 0123</p>
                  </div>
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 900</span>
                    <p className="font-cabinet text-3xl md:text-4xl text-ink font-black">Aa Bb Cc 0123</p>
                  </div>
                </div>
              </div>

              {/* Satoshi */}
              <div className="border border-black/[0.06] bg-warm-gray p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-cabinet text-2xl text-ink mb-2">Satoshi</h3>
                    <span className="font-jetbrains text-[10px] text-rust-signal uppercase tracking-[0.15em]">Body Text</span>
                  </div>
                </div>
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-2xl mb-10">
                  The primary body typeface. Used for paragraphs, descriptions, and interface text. Clean, readable, and warm.
                </p>
                <div className="space-y-6">
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 400</span>
                    <p className="font-satoshi text-3xl md:text-4xl text-ink">Aa Bb Cc 0123</p>
                  </div>
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 500</span>
                    <p className="font-satoshi text-3xl md:text-4xl text-ink font-medium">Aa Bb Cc 0123</p>
                  </div>
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 700</span>
                    <p className="font-satoshi text-3xl md:text-4xl text-ink font-bold">Aa Bb Cc 0123</p>
                  </div>
                </div>
              </div>

              {/* JetBrains Mono */}
              <div className="border border-black/[0.06] bg-warm-gray p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-cabinet text-2xl text-ink mb-2">JetBrains Mono</h3>
                    <span className="font-jetbrains text-[10px] text-rust-signal uppercase tracking-[0.15em]">Technical &amp; Labels</span>
                  </div>
                </div>
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-2xl mb-10">
                  The monospace typeface. Used for metadata, labels, tags, navigation items, and code. Precise and functional.
                </p>
                <div className="space-y-6">
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 400</span>
                    <p className="font-jetbrains text-3xl md:text-4xl text-ink">Aa Bb Cc 0123</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 6: Voice & Tone ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Voice and Tone">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl text-ink mb-16">Voice and Tone</h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Writing guidelines */}
              <div className="lg:col-span-7 space-y-8">
                {[
                  {
                    title: "Clear before clever",
                    desc: "Every sentence should be understood on first reading. No exceptions.",
                  },
                  {
                    title: "Direct before diplomatic",
                    desc: "Say what it is. Not what it could be interpreted as.",
                  },
                  {
                    title: "Confident without arrogance",
                    desc: '\"We build AI that works\" not \"We are the future.\" Claims need proof.',
                  },
                  {
                    title: "Warm without being casual",
                    desc: "Professional but human. Not stiff.",
                  },
                  {
                    title: "Practical without being boring",
                    desc: "Show the outcome. Not the process.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border-b border-black/[0.06] pb-6">
                    <h3 className="font-cabinet text-lg text-ink mb-1">{item.title}</h3>
                    <p className="font-satoshi text-sm text-ink-muted leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Words to use / avoid */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h3 className="font-jetbrains text-[10px] text-rust-signal uppercase tracking-[0.2em] mb-4">Words to use</h3>
                  <p className="font-satoshi text-sm text-ink leading-relaxed">
                    AI, systems, infrastructure, research, laboratory, build, deploy, engineering, practical, Africa, Namibia, applied
                  </p>
                </div>
                <div>
                  <h3 className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-4">Words to avoid</h3>
                  <p className="font-satoshi text-sm text-ink-muted leading-relaxed">
                    Intelligence (as discipline), sovereign/sovereignty, intercept, signal (as metaphor), deploy (military context), execute/protocol, classified/operational, world-class, cutting-edge, revolutionary, synergy, leverage, empower, disruptive, game-changing, paradigm shift
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: Brand Board ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Brand board">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl text-ink mb-16">Brand Board</h2>

            <div className="relative border border-black/[0.06] overflow-hidden bg-warm-gray p-12 md:p-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Logo on light */}
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-warm-white border border-black/[0.06] p-8 flex items-center justify-center w-full">
                    <Image
                      src="/images/logo.png"
                      alt="TANGISON Logo on light"
                      width={874}
                      height={286}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                  <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em]">Logo: Light</span>
                </div>
                {/* Logo on dark */}
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-atlantic-black border border-black/[0.06] p-8 flex items-center justify-center w-full">
                    <Image
                      src="/images/logo-white.webp"
                      alt="TANGISON Logo on dark"
                      width={874}
                      height={286}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                  <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em]">Logo: Dark</span>
                </div>
              </div>
              {/* Color palette strip */}
              <div className="flex mt-8 h-12">
                {colors.slice(0, 6).map((color) => (
                  <div
                    key={color.token}
                    className="flex-1"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name}: ${color.hex}`}
                  />
                ))}
              </div>
              <div className="flex mt-1 h-12">
                {colors.slice(6).map((color) => (
                  <div
                    key={color.token}
                    className="flex-1"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name}: ${color.hex}`}
                  />
                ))}
              </div>
            </div>
            <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] mt-4">
              The complete TANGISON identity. Logo, palette, and visual direction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 8: Copy All Button ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]" aria-label="Copy specifications">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <button
              onClick={handleCopyAll}
              className="w-full bg-ink text-warm-white p-4 font-jetbrains uppercase tracking-[0.15em] text-sm hover:bg-ink-light transition-colors duration-300"
              aria-label="Copy brand specifications to clipboard"
            >
              {copied ? (
                <span className="text-rust-signal">COPIED</span>
              ) : (
                "Copy Brand Specifications"
              )}
            </button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
