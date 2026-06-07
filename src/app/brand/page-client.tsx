"use client";

import React, { useState } from "react";
import { SiteShell } from "@/components/tangison/site-shell";
import { motion } from "framer-motion";
import Image from "next/image";

/* ─── Color Data ──────────────────────────────────────────────── */

const colorGroups = {
  Primary: [
    { name: "Skeleton Bone", hex: "#F6F4EF", token: "skeleton-bone", usage: "Page base, light backgrounds" },
    { name: "Signal White", hex: "#FFFFFF", token: "signal-white", usage: "Cards, panels, maximum contrast" },
    { name: "Atlantic Black", hex: "#111315", token: "atlantic-black", usage: "Primary text, dark sections" },
    { name: "Terminal Black", hex: "#0A0B0C", token: "terminal-black", usage: "Deepest dark, footer" },
  ],
  Accent: [
    { name: "Signal Teal", hex: "#2CB5B4", token: "signal-teal", usage: "CTAs, links, STUDIO descriptor, highlights" },
  ],
  Supporting: [
    { name: "Ocean Mist", hex: "#E6F2F1", token: "ocean-mist", usage: "Subtle teal tint, hover states" },
    { name: "Fog Gray", hex: "#D9D7D2", token: "fog-gray", usage: "Secondary text, dividers" },
    { name: "Ink Muted", hex: "#6B6860", token: "ink-muted", usage: "Secondary text" },
  ],
};

const lightHexes = ["#F6F4EF", "#FFFFFF", "#E6F2F1", "#D9D7D2"];

/* ─── Animation helpers ───────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

/* ─── ColorSwatch Component ───────────────────────────────────── */

function ColorSwatch({ color, highlight = false }: { color: typeof colorGroups.Primary[number]; highlight?: boolean }) {
  const isLight = lightHexes.includes(color.hex);

  return (
    <div className={`border ${highlight ? "border-signal-teal/30 bg-ocean-mist/30" : "border-black/[0.06] bg-signal-white"}`}>
      <div
        className="h-24 w-full"
        style={{ backgroundColor: color.hex }}
      />
      <div className="p-4">
        <p className="font-cabinet text-sm font-bold text-ink">{color.name}</p>
        <p className="font-jetbrains text-[11px] text-ink mt-0.5">{color.hex}</p>
        <p className="font-jetbrains text-[9px] text-ink-muted mt-0.5 tracking-[0.1em]">{color.token}</p>
        <p className="font-satoshi text-[11px] text-ink-muted mt-2">{color.usage}</p>
      </div>
    </div>
  );
}

/* ─── Anti-Pattern Card ───────────────────────────────────────── */

function AntiPattern({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border border-error/20 bg-signal-white p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-jetbrains text-[9px] text-error uppercase tracking-[0.2em]">Don&apos;t</span>
      </div>
      <p className="font-cabinet text-sm font-bold text-ink mb-1">{title}</p>
      <p className="font-satoshi text-[12px] text-ink-muted">{desc}</p>
    </div>
  );
}

/* ─── Motion Demo ─────────────────────────────────────────────── */

function MotionDemo() {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{
          opacity: animate ? 1 : 0.3,
          y: animate ? 0 : 24,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-24 h-24 bg-signal-teal"
      />
      <button
        onClick={() => setAnimate(!animate)}
        className="bg-ink text-signal-white px-6 py-3 font-jetbrains text-[10px] uppercase tracking-[0.15em] hover:bg-signal-teal transition-colors duration-300"
      >
        {animate ? "Reset" : "Animate"}
      </button>
      <div className="font-jetbrains text-[10px] text-ink-muted text-center">
        <p>ease: cubic-bezier(0.16, 1, 0.3, 1)</p>
        <p>duration: 0.6s–1.2s</p>
        <p>entrance: opacity 0→1, translateY 24px→0</p>
      </div>
    </div>
  );
}

/* ─── Main Brand Page ─────────────────────────────────────────── */

/* ─── Brand System Markdown Export ──────────────────────────── */

const brandSystemMarkdown = `# TANGISON STUDIO — Brand System v1.0

**Document ID:** TNG-STUDIO-ID-01  
**Status:** Immutable  
**URL:** studio.tangison.com/brand

---

## Identity Mark

**Name:** Shipwreck Mast  
**Description:** The Tangison Studio Mark  
**Variants:**  
- logo-dark: Black mark + black TANGISON + teal STUDIO (for light backgrounds)  
- logo-light: White/ghost mark + white TANGISON + teal STUDIO (for dark backgrounds)  
**Favicon:** Circular teal with black Shipwreck Mast mark  
**Rules:**  
- Use logo-light on dark backgrounds  
- Use logo-dark on light backgrounds  
- Maintain clearspace equal to mark height  
- Minimum size: 24px height  
- Do not rotate, skew, or alter the mark  
- Do not place on busy backgrounds without container  
- Do not use mark without wordmark  
- Do not change the mark colors

---

## Wordmark System

**Font:** Cabinet Grotesk 800–900  
**Structure:** TANGISON + STUDIO (inverted)  
**STUDIO Color:** Signal Teal #2CB5B4  
**Tracking:** -0.04em  
**Minimum Size:** 24px height  
**Clearspace:** Equal to mark height on all sides

---

## Color System

### Primary
- Skeleton Bone: #F6F4EF — Page base, light backgrounds
- Signal White: #FFFFFF — Cards, panels, maximum contrast
- Atlantic Black: #111315 — Primary text, dark sections
- Terminal Black: #0A0B0C — Deepest dark, footer

### Accent
- Signal Teal: #2CB5B4 — CTAs, links, STUDIO descriptor, highlights

### Supporting
- Ocean Mist: #E6F2F1 — Subtle teal tint, hover states
- Fog Gray: #D9D7D2 — Secondary text, dividers
- Ink Muted: #6B6860 — Secondary text

---

## Typography

### Cabinet Grotesk — Headlines Only · 800–900
tracking: -0.04em  
Used for headlines, section titles, and the wordmark.

### Satoshi — Body Text · 300–400
line-height: 1.6  
Used for paragraphs, descriptions, and interface text.

### JetBrains Mono — Metadata · Labels · 400
tracking: 0.1–0.3em · size: 9–12px · uppercase preferred  
Used for metadata, labels, version numbers, and navigation items ONLY.

---

## Design Elements

- **Accent Line:** 2px height, Signal Teal, section dividers and emphasis
- **Arrow Suffix:** Unicode arrow (→), always follows primary CTA text
- **Primary Button:** Signal Teal bg, white text, Cabinet Grotesk bold, no border-radius
- **Secondary Button:** Transparent bg, Signal Teal border and text

---

## Illustration Style

**Name:** Flat Editorial Illustration  
**Reference:** Japanese travel poster aesthetic — Hiroshi Yoshida meets Studio Ghibli background art. Not anime. Not photorealistic.  
**Technique:** Clean flat colour fields, minimal linework, subtle paper grain texture only  

### Illustration Palette
- Bone White: #F6F4EF — Light surfaces
- Atlantic Black: #111315 — Dark surfaces, silhouettes
- Signal Teal: #2CB5B4 — Sole accent colour
- Deep Navy: #0A0B0C — Sky, deep shadow
- Fog Gray: #D9D7D2 — Neutral elements
- Burnt Orange: #C4622D — Namibian earth, dune faces
- Pale Sand: #E8DFD0 — Desert ground, salt pans

**Rule:** Maximum 6 flat colours per image. No other colours permitted.

### Composition Rules
- Vast empty space is intentional
- Fewer elements is always better
- Maximum 3 focal elements per image
- Humans: flat illustrated silhouette only, in motion, face never detailed

### Forbidden Techniques
- Gradients  
- Glows  
- Photorealism  
- Neon  
- Text in images  
- Logos in images  
- Rounded bubbly shapes  
- Lens flares  
- More than 6 colours per image

---

## Motion System

**Easing Curve:** cubic-bezier(0.16, 1, 0.3, 1)  
**Duration:** 0.6s–1.2s entrance, 0.4s hover/micro  
**Entrance:** opacity 0→1 + translateY 24px→0, staggered by 0.1s  
**Rules:** No bounce. No spring. Always include prefers-reduced-motion support.

---

## Anti-Patterns

- Never use gradients on any element
- No text-shadow or drop-shadow on type
- All elements use sharp corners (max 4px radius)
- No decorative blobs or floating elements
- Silence is design — remove unnecessary words
- No bounce, spring, or playful easing curves
`;

export default function BrandPage() {
  const [copied, setCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(brandSystemMarkdown);
    } catch {
      // fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([brandSystemMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tangison-studio-brand-system-v1.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMdCopied(true);
    setTimeout(() => setMdCopied(false), 2000);
  };

  return (
    <SiteShell>
      {/* ─── Sticky Export Bar ─── */}
      <div className="sticky top-[72px] md:top-[80px] z-40 bg-terminal-black/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-3 flex items-center justify-between">
          <span className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.3em]">TNG-STUDIO-ID-01 · Brand System v1.0</span>
          <div className="flex gap-3">
            <button
              onClick={handleCopyText}
              className="bg-atlantic-black text-skeleton-bone/80 px-4 py-2 font-jetbrains text-[9px] uppercase tracking-[0.15em] hover:bg-signal-teal hover:text-signal-white transition-colors duration-300 border border-white/[0.06]"
              aria-label="Copy brand system as text"
            >
              {copied ? "Copied" : "Copy as Text"}
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="bg-signal-teal text-signal-white px-4 py-2 font-jetbrains text-[9px] uppercase tracking-[0.15em] hover:bg-signal-teal/80 transition-colors duration-300"
              aria-label="Download brand system as Markdown"
            >
              {mdCopied ? "Downloaded" : "Download .md"}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Section 1: Hero — Full-width dark ─── */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div {...fadeUp}>
            {/* H1 — Brand Identity heading */}
            <h1 className="font-cabinet text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-skeleton-bone mb-8">
              Brand Identity
            </h1>

            {/* Large TANGISON wordmark */}
            <div className="mb-4">
              <Image
                src="/brand/logo-light.webp"
                alt="TANGISON STUDIO"
                width={874}
                height={286}
                className="h-24 md:h-36 lg:h-48 w-auto object-contain mx-auto"
                priority
              />
            </div>

            {/* Version metadata */}
            <p className="font-jetbrains text-[10px] text-signal-teal/60 uppercase tracking-[0.3em] mt-8">
              TNG-STUDIO-ID-01 · Brand System v1.0 · Immutable
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
              <div
                className="w-full h-6 absolute top-0"
                style={{
                  background: "rgba(44,181,180,0.4)",
                  animation: "scroll-pulse 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Identity Mark ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Identity Mark">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4">Identity Mark</h2>
            <p className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-16">
              Shipwreck Mast — The Tangison Studio Mark
            </p>

            {/* Mark on dark and light backgrounds side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-atlantic-black p-12 md:p-16 w-full flex items-center justify-center">
                  <Image
                    src="/brand/logo-light.webp"
                    alt="TANGISON STUDIO identity mark on dark background"
                    width={874}
                    height={286}
                    className="h-24 md:h-32 w-auto object-contain"
                  />
                </div>
                <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em]">Dark background</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-skeleton-bone p-12 md:p-16 w-full flex items-center justify-center border border-black/[0.06]">
                  <Image
                    src="/brand/logo-dark.webp"
                    alt="TANGISON STUDIO identity mark on light background"
                    width={874}
                    height={286}
                    className="h-24 md:h-32 w-auto object-contain"
                  />
                </div>
                <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em]">Light background</span>
              </div>
            </div>

            {/* Structural rules — do/don't grid */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-success/20 bg-signal-white p-5">
                <span className="font-jetbrains text-[9px] text-success uppercase tracking-[0.2em]">Do</span>
                <ul className="mt-3 space-y-2 font-satoshi text-sm text-ink-muted">
                  <li>Use logo-light on dark backgrounds</li>
                  <li>Use logo-dark on light backgrounds</li>
                  <li>Maintain clearspace equal to mark height</li>
                  <li>Minimum size: 24px height</li>
                </ul>
              </div>
              <div className="border border-error/20 bg-signal-white p-5">
                <span className="font-jetbrains text-[9px] text-error uppercase tracking-[0.2em]">Don&apos;t</span>
                <ul className="mt-3 space-y-2 font-satoshi text-sm text-ink-muted">
                  <li>Rotate, skew, or alter the mark</li>
                  <li>Place on busy backgrounds without container</li>
                  <li>Use mark without wordmark</li>
                  <li>Change the mark colors</li>
                </ul>
              </div>
            </div>

            {/* Favicon scale */}
            <div className="max-w-3xl mx-auto mt-16">
              <h3 className="font-cabinet text-lg font-bold text-ink mb-6">Favicon Scale</h3>
              <div className="bg-atlantic-black p-8 flex items-end gap-8">
                {[64, 32, 16].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-3">
                    <Image
                      src="/brand/favicon.webp"
                      alt={`Tangison Studio favicon at ${size}×${size}px`}
                      width={size}
                      height={size}
                      className="object-contain"
                    />
                    <span className="font-jetbrains text-[9px] text-fog-gray/50 uppercase tracking-[0.1em]">
                      {size}×{size}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-jetbrains text-[10px] text-ink-muted mt-3 tracking-[0.1em]">1:2.8 ratio</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Wordmark System ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone border-t border-black/[0.06]" aria-label="Wordmark System">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">Wordmark System</h2>

            {/* Wordmark large on white */}
            <div className="bg-signal-white border border-black/[0.06] p-12 md:p-20 mb-6">
              <Image
                src="/brand/logo-dark.webp"
                alt="TANGISON STUDIO wordmark on light background"
                width={874}
                height={286}
                className="h-20 md:h-28 w-auto object-contain"
              />
            </div>

            {/* Wordmark large on dark */}
            <div className="bg-atlantic-black p-12 md:p-20 mb-12">
              <Image
                src="/brand/logo-light.webp"
                alt="TANGISON STUDIO wordmark on dark background"
                width={874}
                height={286}
                className="h-20 md:h-28 w-auto object-contain"
              />
            </div>

            {/* Spec table */}
            <div className="border border-black/[0.06] bg-signal-white p-6 md:p-8">
              <h3 className="font-cabinet text-lg font-bold text-ink mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Font", "Cabinet Grotesk 800–900"],
                  ["Wordmark", "TANGISON + STUDIO (inverted)"],
                  ["STUDIO Color", "Signal Teal #2CB5B4"],
                  ["Tracking", "-0.04em"],
                  ["Minimum Size", "24px height"],
                  ["Clearspace", "Equal to mark height on all sides"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.15em] shrink-0 min-w-[100px]">
                      {label}
                    </span>
                    <span className="font-satoshi text-sm text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Color System ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white border-t border-black/[0.06]" aria-label="Color System">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4">Color System</h2>
            <p className="font-satoshi text-base text-ink-muted font-light leading-relaxed max-w-2xl mb-16">
              White and bone backgrounds dominate. Dark sections used sparingly. Signal Teal is the single accent.
            </p>

            {Object.entries(colorGroups).map(([group, colors]) => (
              <div key={group} className="mb-12">
                <h3 className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-6">
                  {group}
                </h3>
                <div className={`grid gap-4 ${group === "Accent" ? "grid-cols-1 max-w-sm" : "grid-cols-2 sm:grid-cols-4"}`}>
                  {colors.map((color) => (
                    <ColorSwatch
                      key={color.token}
                      color={color}
                      highlight={color.token === "signal-teal"}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Teal in context */}
            <div className="mt-16 border border-black/[0.06] bg-skeleton-bone p-8 md:p-12">
              <h3 className="font-cabinet text-lg font-bold text-ink mb-8">Signal Teal in Context</h3>
              <div className="flex flex-wrap gap-6 items-center">
                {/* CTA button */}
                <div className="bg-signal-teal text-signal-white px-7 py-4 font-cabinet font-bold text-sm">
                  Primary Button →
                </div>
                {/* Teal accent line */}
                <div className="w-16 h-[2px] bg-signal-teal" />
                {/* STUDIO descriptor */}
                <span className="font-cabinet text-2xl font-black tracking-[-0.04em] text-ink">
                  TANGISON <span className="text-signal-teal">STUDIO</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: Typography ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone border-t border-black/[0.06]" aria-label="Typography">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">Typography</h2>

            <div className="space-y-8">
              {/* Cabinet Grotesk */}
              <div className="border border-black/[0.06] bg-signal-white p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-cabinet text-2xl font-bold text-ink mb-2">Cabinet Grotesk</h3>
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.15em]">Headlines Only · 800–900</span>
                  </div>
                </div>
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-2xl mb-10">
                  The primary display typeface. Used exclusively for headlines, section titles, and the wordmark. tracking: -0.04em.
                </p>
                <div className="space-y-6">
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 800</span>
                    <p className="font-cabinet text-3xl md:text-5xl text-ink font-extrabold tracking-[-0.04em]">
                      We design and build digital experiences
                    </p>
                  </div>
                  <div>
                    <span className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.15em] block mb-2">Weight 900</span>
                    <p className="font-cabinet text-3xl md:text-5xl text-ink font-black tracking-[-0.04em]">
                      Strategic · Functional · Beautiful
                    </p>
                  </div>
                </div>
              </div>

              {/* Satoshi */}
              <div className="border border-black/[0.06] bg-signal-white p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-cabinet text-2xl font-bold text-ink mb-2">Satoshi</h3>
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.15em]">Body Text · 300–400</span>
                  </div>
                </div>
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-2xl mb-10">
                  The primary body typeface. Used for paragraphs, descriptions, and interface text. line-height: 1.6.
                </p>
                <p className="font-satoshi text-lg md:text-xl text-ink font-light leading-relaxed max-w-3xl">
                  We believe great design is invisible. It doesn&apos;t draw attention to itself — it draws attention to the work. Every pixel, every line of code, every interaction serves the idea. That&apos;s the Tangison Studio approach.
                </p>
              </div>

              {/* JetBrains Mono */}
              <div className="bg-atlantic-black p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-cabinet text-2xl font-bold text-skeleton-bone mb-2">JetBrains Mono</h3>
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.15em]">Metadata · Labels · 400</span>
                  </div>
                </div>
                <p className="font-satoshi text-sm text-skeleton-bone/60 leading-relaxed max-w-2xl mb-10">
                  The monospace typeface. Used for metadata, labels, version numbers, and navigation items ONLY. Never dominant. tracking: 0.1–0.3em, size: 9–12px, uppercase preferred.
                </p>
                <div className="space-y-4">
                  <p className="font-jetbrains text-[11px] text-skeleton-bone/80 uppercase tracking-[0.2em]">
                    TNG-STUDIO-ID-01 · BRAND SYSTEM V1.0
                  </p>
                  <p className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.3em]">
                    DISCOVER → DEFINE → DESIGN → DEVELOP → LAUNCH
                  </p>
                  <p className="font-jetbrains text-[9px] text-fog-gray/40 uppercase tracking-[0.15em]">
                    LAST UPDATED: 2026-03-04 · IMMUTABLE
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 6: Design Elements ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white border-t border-black/[0.06]" aria-label="Design Elements">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">Design Elements</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Accent line */}
              <div className="border border-black/[0.06] bg-skeleton-bone p-6">
                <span className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.2em] block mb-4">Accent Line</span>
                <div className="w-12 h-[2px] bg-signal-teal mb-4" />
                <p className="font-satoshi text-[12px] text-ink-muted">2px height. Signal Teal. Used as section dividers and emphasis.</p>
              </div>

              {/* Arrow */}
              <div className="border border-black/[0.06] bg-skeleton-bone p-6">
                <span className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.2em] block mb-4">Arrow Suffix</span>
                <span className="font-cabinet text-xl font-bold text-ink">→</span>
                <p className="font-satoshi text-[12px] text-ink-muted mt-4">Unicode arrow. Always follows primary CTA text.</p>
              </div>

              {/* Primary Button */}
              <div className="border border-black/[0.06] bg-skeleton-bone p-6">
                <span className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.2em] block mb-4">Primary Button</span>
                <div className="bg-signal-teal text-signal-white px-4 py-3 font-cabinet font-bold text-sm inline-block mb-4">
                  Let&apos;s Build →
                </div>
                <p className="font-satoshi text-[12px] text-ink-muted">Signal Teal bg, white text, Cabinet Grotesk bold, 14px 28px padding, no border-radius.</p>
              </div>

              {/* Secondary Button */}
              <div className="border border-black/[0.06] bg-skeleton-bone p-6">
                <span className="font-jetbrains text-[9px] text-signal-teal uppercase tracking-[0.2em] block mb-4">Secondary Button</span>
                <div className="border border-signal-teal text-signal-teal px-4 py-3 font-cabinet font-bold text-sm inline-block mb-4">
                  Learn More
                </div>
                <p className="font-satoshi text-[12px] text-ink-muted">Transparent bg, Signal Teal border and text, same sizing.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 6.5: Illustration Style ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone border-t border-black/[0.06]" aria-label="Illustration Style">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4">Illustration Style</h2>
            <p className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-16">
              Flat Editorial Illustration — Named Brand Asset
            </p>

            {/* Full-width example image */}
            <div className="mb-16 border border-black/[0.06] overflow-hidden">
              <Image
                src="/images/gallery/hero-slider-namibia.webp"
                alt="Flat editorial illustration example — Sossusvlei dead vlei at dawn"
                width={1344}
                height={768}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Style reference */}
            <div className="border border-black/[0.06] bg-signal-white p-6 md:p-10 mb-8">
              <h3 className="font-cabinet text-lg font-bold text-ink mb-4">Style Reference</h3>
              <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-3xl mb-6">
                Japanese travel poster aesthetic — Hiroshi Yoshida meets Studio Ghibli background art. Not anime. Not photorealistic. Clean flat colour fields, minimal linework, subtle paper grain texture only. The illustration system treats every scene as a graphic composition: flat shapes, limited palette, vast empty space, and Signal Teal as the sole accent colour.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Technique", "Clean flat colour fields, minimal linework, subtle paper grain texture only"],
                  ["Composition", "Maximum 3 focal elements per image. Vast empty space is intentional."],
                  ["Humans", "Flat illustrated silhouette only, in motion, face never detailed, treated as a graphic shape"],
                  ["Aspect Ratio", "16:9 landscape only"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.15em] shrink-0 min-w-[100px]">
                      {label}
                    </span>
                    <span className="font-satoshi text-sm text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration palette swatches */}
            <div className="border border-black/[0.06] bg-signal-white p-6 md:p-10 mb-8">
              <h3 className="font-cabinet text-lg font-bold text-ink mb-6">Illustration Palette</h3>
              <p className="font-satoshi text-sm text-ink-muted mb-6">Maximum 6 flat colours per image. No other colours permitted.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { name: "Bone White", hex: "#F6F4EF", usage: "Light surfaces" },
                  { name: "Atlantic Black", hex: "#111315", usage: "Dark surfaces, silhouettes" },
                  { name: "Signal Teal", hex: "#2CB5B4", usage: "Sole accent colour" },
                  { name: "Deep Navy", hex: "#0A0B0C", usage: "Sky, deep shadow" },
                  { name: "Fog Gray", hex: "#D9D7D2", usage: "Neutral elements" },
                  { name: "Burnt Orange", hex: "#C4622D", usage: "Namibian earth, dune faces" },
                  { name: "Pale Sand", hex: "#E8DFD0", usage: "Desert ground, salt pans" },
                ].map((swatch) => {
                  const isLight = ["#F6F4EF", "#D9D7D2", "#E8DFD0"].includes(swatch.hex);
                  return (
                    <div key={swatch.hex} className="border border-black/[0.06]">
                      <div
                        className="h-20 w-full"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="p-3">
                        <p className="font-cabinet text-xs font-bold text-ink">{swatch.name}</p>
                        <p className="font-jetbrains text-[10px] text-ink mt-0.5">{swatch.hex}</p>
                        <p className="font-satoshi text-[10px] text-ink-muted mt-1">{swatch.usage}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Forbidden techniques */}
            <div className="border border-error/20 bg-signal-white p-6 md:p-10">
              <span className="font-jetbrains text-[9px] text-error uppercase tracking-[0.2em]">Forbidden Techniques</span>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {["Gradients", "Glows", "Photorealism", "Neon", "Text in images", "Logos in images", "Rounded bubbly shapes", "Lens flares", "More than 6 colours per image"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-3 h-[2px] bg-error/40 shrink-0" />
                    <span className="font-satoshi text-sm text-ink-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: Motion System ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone border-t border-black/[0.06]" aria-label="Motion System">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">Motion System</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Spec */}
              <div>
                <h3 className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-6">Easing Curve</h3>
                <div className="border border-black/[0.06] bg-signal-white p-6 mb-8">
                  <code className="font-jetbrains text-sm text-ink">cubic-bezier(0.16, 1, 0.3, 1)</code>
                </div>

                <h3 className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-6">Duration Range</h3>
                <div className="border border-black/[0.06] bg-signal-white p-6 mb-8">
                  <p className="font-satoshi text-ink text-sm">0.6s – 1.2s for all entrance animations</p>
                  <p className="font-satoshi text-ink-muted text-sm mt-2">0.4s for hover and micro-interactions</p>
                </div>

                <h3 className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-6">Rules</h3>
                <ul className="space-y-2 font-satoshi text-sm text-ink-muted">
                  <li>All entrance: opacity 0→1 + translateY 24px→0, staggered by 0.1s</li>
                  <li>No bounce. No spring.</li>
                  <li>Always include prefers-reduced-motion support.</li>
                </ul>
              </div>

              {/* Live demo */}
              <div className="border border-black/[0.06] bg-signal-white p-8 md:p-12 flex items-center justify-center">
                <MotionDemo />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 8: Anti-Patterns ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white border-t border-black/[0.06]" aria-label="Anti-Patterns">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">Anti-Patterns</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AntiPattern title="Gradients" desc="Never use gradients on any element. Flat colors only." />
              <AntiPattern title="Shadows on text" desc="No text-shadow or drop-shadow on type." />
              <AntiPattern title="Border-radius > 4px" desc="All elements use sharp corners. Maximum 4px radius." />
              <AntiPattern title="Decorative blobs" desc="No abstract shapes, floating elements, or decorative blobs." />
              <AntiPattern title="Filler copy" desc="Silence is design. Remove unnecessary words." />
              <AntiPattern title="Bounce animations" desc="No bounce, spring, or playful easing curves." />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 9: Brand Board ─── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black" aria-label="Brand Board">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-skeleton-bone mb-16">Brand Board</h2>

            <div className="border border-white/[0.06] bg-terminal-black p-12 md:p-20">
              {/* Logo */}
              <div className="mb-12">
                <Image
                  src="/brand/logo-light.webp"
                  alt="TANGISON STUDIO brand board logo"
                  width={874}
                  height={286}
                  className="h-20 md:h-28 w-auto object-contain"
                />
              </div>

              {/* Palette strip */}
              <div className="flex h-12 mb-1">
                {["#F6F4EF", "#FFFFFF", "#E6F2F1", "#D9D7D2", "#6B6860"].map((hex) => (
                  <div
                    key={hex}
                    className="flex-1"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
              <div className="flex h-12">
                {["#2CB5B4", "#111315", "#0A0B0C"].map((hex) => (
                  <div
                    key={hex}
                    className="flex-1"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>

              {/* Type specimens */}
              <div className="mt-12 space-y-4">
                <p className="font-cabinet text-3xl md:text-4xl font-black text-skeleton-bone tracking-[-0.04em]">
                  Cabinet Grotesk 900
                </p>
                <p className="font-satoshi text-lg text-skeleton-bone/60 font-light">
                  Satoshi 300 — Body text for all reading experiences
                </p>
                <p className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.3em]">
                  JETBRAINS MONO 400 — METADATA AND LABELS
                </p>
              </div>

              {/* Tagline */}
              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <p className="font-cabinet text-xl md:text-2xl font-bold text-skeleton-bone/70 tracking-tight">
                  Designing the interfaces through which intelligence becomes useful.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Export Section ─── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-signal-white border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleCopyText}
                className="w-full bg-ink text-signal-white p-4 font-jetbrains uppercase tracking-[0.15em] text-sm hover:bg-signal-teal transition-colors duration-300"
                aria-label="Copy brand system as text"
              >
                {copied ? "Copied to Clipboard" : "Copy as Text"}
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="w-full bg-signal-teal text-signal-white p-4 font-jetbrains uppercase tracking-[0.15em] text-sm hover:bg-signal-teal/80 transition-colors duration-300"
                aria-label="Download brand system as Markdown"
              >
                {mdCopied ? "Downloaded" : "Download as Markdown"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
