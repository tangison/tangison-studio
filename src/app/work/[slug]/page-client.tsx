"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";
import { fadeUp } from "@/lib/motion";
import type { CaseStudy } from "@/lib/case-studies";

/* ──────────────────────────────────────────────
   ANIMATION CONSTANTS
   ────────────────────────────────────────────── */

const sectionFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

/* ──────────────────────────────────────────────
   A. HERO SECTION
   ────────────────────────────────────────────── */

function HeroSection({ cs }: { cs: CaseStudy }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "480px" }}>
      {/* Background screenshot */}
      <div className="absolute inset-0">
        <Image
          src={`/images/work/screenshots/${cs.screenshotSlug}-screenshot.webp`}
          alt={`${cs.name} website`}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-36 flex flex-col justify-end min-h-[480px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Metadata pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1.5">
              {cs.industry}
            </span>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1.5">
              {cs.year}
            </span>
          </div>

          {/* Project name */}
          <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white mb-4 leading-[0.95]">
            {cs.name}
          </h1>

          {/* One-line descriptor */}
          <p className="font-satoshi text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
            {cs.descriptor}
          </p>
        </motion.div>

        {/* Visit Live Site link — top-right */}
        <a
          href={cs.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-8 right-6 md:right-12 lg:right-20 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-signal-teal transition-colors duration-300 flex items-center gap-2"
        >
          Visit Live Site
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   B. PROJECT OVERVIEW BAR
   ────────────────────────────────────────────── */

function OverviewBar({ cs }: { cs: CaseStudy }) {
  return (
    <div className="bg-atlantic-black py-8 md:py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        <div>
          <span className="font-jetbrains text-[9px] uppercase tracking-[0.25em] text-fog-gray/50 block mb-2">
            Client
          </span>
          <span className="font-cabinet text-lg md:text-xl font-bold text-skeleton-bone tracking-tight">
            {cs.name}
          </span>
        </div>
        <div>
          <span className="font-jetbrains text-[9px] uppercase tracking-[0.25em] text-fog-gray/50 block mb-2">
            Services
          </span>
          <span className="font-cabinet text-lg md:text-xl font-bold text-skeleton-bone tracking-tight">
            {cs.services.join(", ")}
          </span>
        </div>
        <div>
          <span className="font-jetbrains text-[9px] uppercase tracking-[0.25em] text-fog-gray/50 block mb-2">
            Year
          </span>
          <span className="font-cabinet text-lg md:text-xl font-bold text-skeleton-bone tracking-tight">
            {cs.year}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   C. THE CHALLENGE SECTION
   ────────────────────────────────────────────── */

function ChallengeSection({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
      <div className="max-w-[900px] mx-auto">
        <motion.div {...sectionFade}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
            THE CHALLENGE
          </span>
          <h2 className="font-cabinet text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-ink mb-10 leading-[1.15]">
            {cs.challengeH2}
          </h2>
          <div className="space-y-6">
            {cs.challengeBody.map((para, i) => (
              <p key={i} className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   D. SCROLLABLE SCREENSHOT VIEWER
   ────────────────────────────────────────────── */

function ScrollableViewer({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-signal-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...sectionFade}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-8">
            THE SITE
          </span>

          {/* Scrollable container */}
          <div
            className="relative w-full border border-card-border overflow-hidden"
            style={{ height: "600px" }}
          >
            <div
              className="w-full overflow-y-auto"
              style={{
                height: "100%",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <Image
                src={`/images/work/screenshots/full/${cs.screenshotSlug}-full.webp`}
                alt={`${cs.name} full page screenshot`}
                width={1440}
                height={4000}
                className="w-full h-auto"
                sizes="100vw"
                priority={false}
              />
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted/40">
              Scroll to explore ↓
            </span>
            <a
              href={cs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 inline-flex items-center gap-2 group"
            >
              Visit the live site
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Mobile: shorter container */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .relative.w-full.border.border-card-border {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────
   E. THE APPROACH SECTION
   ────────────────────────────────────────────── */

function ApproachSection({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[900px]">
          <motion.div {...sectionFade}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              OUR APPROACH
            </span>
            <h2 className="font-cabinet text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-ink mb-10 leading-[1.15]">
              {cs.approachH2}
            </h2>
            <div className="space-y-6 mb-16">
              {cs.approachBody.map((para, i) => (
                <p key={i} className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Craft notes — 3 columns */}
        <motion.div {...sectionFade}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {cs.craftNotes.map((note, i) => (
              <div key={i} className="border-t border-fog-gray pt-6">
                <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-signal-teal block mb-3">
                  {note.label}
                </span>
                <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   F. TECH STACK SECTION
   ────────────────────────────────────────────── */

function TechStackSection({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-signal-white border-t border-fog-gray/50">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...sectionFade}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-8">
            BUILT WITH
          </span>
          <div className="flex flex-wrap gap-3">
            {cs.tech.map((t) => (
              <span
                key={t}
                className="font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted bg-skeleton-bone px-4 py-2"
                style={{ borderRadius: "999px" }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   G. MULTI-SCREENSHOT GALLERY WITH LIGHTBOX
   ────────────────────────────────────────────── */

function GallerySection({ cs }: { cs: CaseStudy }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const galleryImages = [
    { src: `/images/work/screenshots/gallery/${cs.screenshotSlug}-1.webp`, alt: `${cs.name} header` },
    { src: `/images/work/screenshots/gallery/${cs.screenshotSlug}-2.webp`, alt: `${cs.name} interior section` },
    { src: `/images/work/screenshots/gallery/${cs.screenshotSlug}-3.webp`, alt: `${cs.name} footer` },
    { src: `/images/work/screenshots/gallery/${cs.screenshotSlug}-4.webp`, alt: `${cs.name} sub-page` },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...sectionFade}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-8">
            SELECTED SCREENS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(img.src, img.alt)}
                className="group relative overflow-hidden border border-card-border bg-signal-white text-left cursor-pointer"
                type="button"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            type="button"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt={lightboxAlt}
              width={1440}
              height={900}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────
   H. OUTCOME / REFLECTION SECTION
   ────────────────────────────────────────────── */

function OutcomeSection({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-signal-white">
      <div className="max-w-[900px] mx-auto">
        <motion.div {...sectionFade}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
            THE OUTCOME
          </span>
          <h2 className="font-cabinet text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-ink mb-10 leading-[1.15]">
            {cs.outcomeH2}
          </h2>
          <div className="space-y-6">
            {cs.outcomeBody.map((para, i) => (
              <p key={i} className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   I. NEXT PROJECT CTA
   ────────────────────────────────────────────── */

function NextProjectCta({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-atlantic-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-fog-gray/50 block mb-4">
              NEXT PROJECT
            </span>
            <Link
              href={`/work/${cs.nextSlug}`}
              className="font-cabinet text-2xl md:text-3xl font-bold text-skeleton-bone hover:text-signal-teal transition-colors duration-300 inline-flex items-center gap-3 group"
            >
              Next Project
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
          <Link
            href="/work"
            className="font-jetbrains text-[11px] uppercase tracking-[0.15em] text-fog-gray/60 hover:text-signal-teal transition-colors duration-300 inline-flex items-center gap-2 group"
          >
            See All Work
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CASE STUDY PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const cs = caseStudy;

  return (
    <SiteShell>
      <HeroSection cs={cs} />
      <OverviewBar cs={cs} />
      <ChallengeSection cs={cs} />
      <ScrollableViewer cs={cs} />
      <ApproachSection cs={cs} />
      <TechStackSection cs={cs} />
      <GallerySection cs={cs} />
      <OutcomeSection cs={cs} />
      <NextProjectCta cs={cs} />
    </SiteShell>
  );
}
