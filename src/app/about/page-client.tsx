"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

/* ──────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const values = [
  {
    title: "Research is foundational",
    description:
      "Every system we build starts with understanding. We investigate before we assume.",
  },
  {
    title: "Building is proof",
    description:
      "Talk is cheap. Shipped products and working systems prove credibility.",
  },
  {
    title: "Africa is not a market, it is a context",
    description:
      "We build for African realities, not Western assumptions adapted for Africa.",
  },
  {
    title: "No shortcuts",
    description:
      "Quality is non-negotiable. Every decision is intentional. Every system is built to last.",
  },
];

const timeline = [
  {
    name: "GemsWeb Digital",
    description: "Founded as a digital agency delivering web and marketing solutions across Namibia.",
  },
  {
    name: "Tangison",
    description:
      "Evolved into an applied AI laboratory. Now building infrastructure, products, and research for organizations across Africa.",
  },
];

/* ──────────────────────────────────────────────
   ABOUT PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

export function AboutPage() {
  return (
    <SiteShell>
      {/* ── Section 1: Page Header (LIGHT) ── */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-rust-signal block mb-6">
              ABOUT
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Tangison
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Applied AI. Built in Namibia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Company Story (LIGHT) ── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              TANGISON is a Namibian applied AI laboratory and engineering
              company. We research, build, deploy, and commercialize AI systems,
              products, and infrastructure for organizations across Africa.
            </p>
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Based in Windhoek, we combine research with practical engineering.
              Our systems work in African conditions. Where networks are
              unreliable. Where conditions are volatile. Where solutions must be
              resilient by design.
            </p>
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Our approach is simple: research before building, build before
              shipping, and ship before promising. We believe AI should solve
              real problems, not chase trends.
            </p>
          </motion.div>

          {/* Right: Decorative image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden"
          >
            <Image
              src="/images/gallery/desert-glass-concrete-landscape.webp"
              alt="Desert landscape with concrete and glass structures in Namibia"
              className="object-cover cinematic-image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: What We Believe (DARK) ── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-rust-signal/50" aria-hidden="true" />
          </motion.div>
          <motion.h2
            {...fadeUp}
            className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-16 md:mb-20"
          >
            What We Believe
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border border-white/[0.06] p-8 md:p-10 hover:border-white/[0.12] transition-colors duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-rust-signal" aria-hidden="true" />
                  <span className="font-jetbrains text-[10px] text-skeleton-bone/40 uppercase tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-skeleton-bone mb-3">
                  {value.title}
                </h3>
                <p className="font-satoshi text-skeleton-bone/60 text-sm md:text-base leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Evolution (LIGHT) ── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2
            {...fadeUp}
            className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20"
          >
            Our Path
          </motion.h2>

          <div className="max-w-3xl">
            {timeline.map((entry, i) => (
              <motion.div
                key={entry.name}
                {...staggerItem}
                transition={{
                  ...staggerItem.transition,
                  delay: i * 0.1,
                }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Vertical line */}
                <div
                  className="absolute left-0 top-2 bottom-0 w-[1px] bg-black/[0.08]"
                  aria-hidden="true"
                />
                {/* Dot */}
                <div
                  className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 bg-rust-signal"
                  aria-hidden="true"
                />
                <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-2">
                  {entry.name}
                </h3>
                <p className="font-satoshi text-ink-muted text-sm md:text-base leading-relaxed">
                  {entry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Location (LIGHT) ── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2
            {...fadeUp}
            className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20"
          >
            Location
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            {/* Address */}
            <motion.div
              {...fadeUp}
              className="flex flex-col justify-center"
            >
              <span className="font-jetbrains text-[10px] text-rust-signal uppercase tracking-[0.25em] block mb-6">
                SATELLITE OFFICE
              </span>
              <address className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink leading-relaxed not-italic">
                Corner of Frans Indongo Street and John Meinert Street,
                Windhoek, Namibia
              </address>
              <p className="font-satoshi text-ink-muted text-sm mt-4 leading-relaxed">
                Primary operations run from Windhoek.
              </p>
            </motion.div>

            {/* Decorative image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[280px] md:min-h-[360px] lg:min-h-[420px] overflow-hidden"
            >
              <Image
                src="/images/gallery/desert-path-quiver-trees.webp"
                alt="Desert path through quiver trees in Namibia"
                className="object-cover cinematic-image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 6: CTA (DARK) ── */}
      <section
        className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black"
        aria-label="Work with us"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-10 leading-[0.9]"
          >
            Start a project together
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-rust-signal text-warm-white px-10 py-5 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-rust-light transition-colors duration-300 group"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
