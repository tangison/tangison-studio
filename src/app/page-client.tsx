"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/tangison/studio-button";
import { PlanCarousel } from "@/components/tangison/plan-carousel";
import { fadeUp, animateFadeUp, STUDIO_EASE, DURATION } from "@/lib/motion";

/* ──────────────────────────────────────────────
   IMAGE DATA
   ────────────────────────────────────────────── */

const featuredWork = [
  {
    name: "ProAvia Travel & Tours",
    label: "Travel & Tourism",
    href: "/work/proavia",
    image: "/images/work/screenshots/proavia-screenshot.webp",
    imageAlt: "ProAvia Travel & Tours website",
    externalUrl: "https://proaviainc.com",
  },
  {
    name: "Nalago Skincare",
    label: "Beauty & Wellness",
    href: "/work/nalago",
    image: "/images/work/screenshots/nalago-screenshot.webp",
    imageAlt: "Nalago Skincare website",
    externalUrl: "https://nalago-nam.com",
  },
  {
    name: "Cluster Leaf Safaris",
    label: "Safari & Tourism",
    href: "/work/clusterleaf",
    image: "/images/work/screenshots/clusterleaf-screenshot.webp",
    imageAlt: "Cluster Leaf Safaris website",
    externalUrl: "https://www.clusterleafsafaris.com",
  },
];

const services = [
  { name: "Website Design", slug: "website-design" },
  { name: "Website Development", slug: "website-development" },
  { name: "Application Design", slug: "application-design" },
  { name: "Product Design", slug: "product-design" },
  { name: "Brand Systems", slug: "brand-systems" },
  { name: "Design Systems", slug: "design-systems" },
  { name: "Creative Direction", slug: "creative-direction" },
];

const processSteps = [
  { num: "01", name: "Discover" },
  { num: "02", name: "Define" },
  { num: "03", name: "Design" },
  { num: "04", name: "Develop" },
  { num: "05", name: "Launch" },
];

const principles = ["Strategic", "Functional", "Beautiful", "Scalable"];

/* fadeUp imported from @/lib/motion — single source of truth */

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function HeroSection() {
  const headline = "We design and build digital products that get results.";

  return (
    <section
      className="hero hero-viewport relative w-full flex items-center overflow-hidden box-border"
      aria-label="Hero section"
    >
      {/* Background image and overlay handled by CSS (.hero + .hero::before) */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left column — text content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 bg-signal-teal" aria-hidden="true" />
              <span
                className="font-jetbrains uppercase tracking-[0.25em] text-ink-muted"
                style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}
              >
                CREATIVE DIGITAL AGENCY
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-cabinet font-black tracking-[-0.04em] leading-[0.95] text-ink mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-ink-muted font-satoshi font-light leading-relaxed mb-10 max-w-lg"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
            >
              Strategy, design, and engineering from Windhoek, Namibia. We work with organizations across Africa to build websites, applications, brand systems, and design systems that do their job and last for years.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: 1, ease: STUDIO_EASE }}
              className="flex flex-wrap gap-4"
            >
              <StudioButton href="/work" variant="primary" size="lg" showArrow>
                See Our Work
              </StudioButton>
              <StudioButton href="/contact" variant="ghost" size="lg">
                Start a Project
              </StudioButton>
            </motion.div>
          </div>

          {/* Right column — Plan carousel (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <PlanCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FEATURED WORK
   ────────────────────────────────────────────── */

function FeaturedWorkSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Featured work">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
          Featured Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featuredWork.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="group block relative">
                {/* Primary link: internal case study */}
                <Link href={project.href} className="block">
                  {/* Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-700"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={i === 0}
                    />
                    {/* External site link — top-right */}
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 bg-signal-white/90 p-2 text-ink-muted hover:text-signal-teal transition-colors duration-300 z-10"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${project.name} live site`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  {/* Caption */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] block mb-1">
                        {project.label}
                      </span>
                      <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-ink-muted group-hover:text-signal-teal group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 group"
          >
            See Our Work
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SERVICES GRID
   ────────────────────────────────────────────── */

function ServicesSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Services">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
          Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="pillar-card group block border border-card-border bg-signal-white p-6 md:p-8 h-full"
              >
                {/* Teal accent line */}
                <div className="w-8 h-[2px] bg-signal-teal mb-6" aria-hidden="true" />
                <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300">
                  {service.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PROCESS STEPS
   ────────────────────────────────────────────── */

function ProcessSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Our process">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
          Process
        </motion.h2>

        {/* Horizontal step-through */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 sm:flex-1"
            >
              <div className="flex items-center gap-3">
                <span className="font-jetbrains text-[11px] text-signal-teal tracking-[0.15em]">
                  {step.num}
                </span>
                <span className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink">
                  {step.name}
                </span>
              </div>
              {i < processSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-fog-gray hidden sm:block ml-auto mr-4 shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 group"
          >
            See how we work
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   STUDIO PRINCIPLES
   ────────────────────────────────────────────── */

function PrinciplesSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Studio principles">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-20 gap-y-6">
          {principles.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-cabinet text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.04em] text-ink"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTACT TEASER
   ────────────────────────────────────────────── */

function ContactTeaserSection() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black overflow-hidden" aria-label="Start a project">
      {/* Gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-ocean/40 via-atlantic-black to-terminal-black/60 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-10 leading-[0.9] relative z-10"
        >
          Got a project in mind?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3, duration: DURATION.slow, ease: STUDIO_EASE }}
          className="relative z-10"
        >
          <StudioButton href="/contact" variant="primary" size="lg" showArrow>
            Start a Project
          </StudioButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HOME PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

/* ──────────────────────────────────────────────
   LABS CROSS-LINK CTA
   ────────────────────────────────────────────── */

function LabsCtaSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-skeleton-bone border-t border-fog-gray" aria-label="Tangison Labs">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-ink-muted/50 block mb-4">
            TANGISON LABS
          </span>
          <h2 className="font-cabinet text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-ink mb-4">
            Need the AI behind the interface?
          </h2>
          <p className="font-satoshi text-ink-muted font-light leading-relaxed mb-6" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}>
            Tangison Labs builds custom AI systems, agents, and self-hosted infrastructure for organizations that need their own stack.
          </p>
          <a
            href="https://tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted/60 hover:text-ink transition-colors duration-300 inline-flex items-center gap-2 group"
          >
            Visit the Lab ↗
            <span className="inline-block w-0 group-hover:w-4 h-[1px] bg-ink/30 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HOME PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

export function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <LabsCtaSection />
      <ProcessSection />
      <PrinciplesSection />
      <ContactTeaserSection />
    </SiteShell>
  );
}
