"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";
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
      {/* Contextual Analogue Namibia hero image */}
      <div className="absolute inset-0">
        <Image
          src={`/images/work/hero/${cs.slug}-hero.webp`}
          alt={`${cs.name}, ${cs.industry}`}
          fill
          priority
          className="object-cover cinematic-image"
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
            <span className="pill-tag font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1.5">
              {cs.industry}
            </span>
            <span className="pill-tag font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1.5">
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
                className="pill-tag font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted bg-skeleton-bone px-4 py-2"
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
      <ApproachSection cs={cs} />
      <TechStackSection cs={cs} />
      <OutcomeSection cs={cs} />
      <NextProjectCta cs={cs} />
    </SiteShell>
  );
}
