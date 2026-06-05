"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, FlaskConical } from "lucide-react";
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

/* ──────────────────────────────────────────────
   CASE STUDIES DATA
   ────────────────────────────────────────────── */

const upcomingCaseStudies = [
  {
    title: "Self-Hosted AI for a Namibian Mining Operation",
    summary: "How we deployed an offline-first AI monitoring system for a mining company in the Erongo Region. Reduced equipment downtime by predicting failures before they happened.",
    industry: "Mining",
    status: "In Progress",
  },
  {
    title: "AI-Powered Agricultural Advisory for Smallholder Farmers",
    summary: "A mobile-first AI assistant that provides crop management advice to farmers in northern Namibia. Works on basic smartphones with intermittent connectivity.",
    industry: "Agriculture",
    status: "In Progress",
  },
  {
    title: "Automated Compliance for a Financial Services Provider",
    summary: "How we built an AI-driven compliance monitoring system for a Namibian bank. Reduced manual review time and improved regulatory reporting accuracy.",
    industry: "Banking",
    status: "Planned",
  },
];

/* ──────────────────────────────────────────────
   CASE STUDIES PAGE
   ────────────────────────────────────────────── */

export function CaseStudiesPage() {
  return (
    <SiteShell>
      {/* Section 1: Page Header */}
      <section
        className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20"
        aria-label="Case studies header"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-signal-teal transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Insights
            </Link>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              CASE STUDIES
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Real Projects, Real Outcomes
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Detailed accounts of challenges, approaches, and outcomes from Tangison projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Upcoming Case Studies */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone"
        aria-label="Upcoming case studies"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">
            In the Pipeline
          </motion.h2>
          <motion.p {...fadeUp} className="font-satoshi text-ink-muted text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
            Case studies from active and planned projects. Each will detail the challenge, approach, and measurable outcomes.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingCaseStudies.map((study, i) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border border-black/[0.06] bg-signal-white p-6 md:p-8 flex flex-col hover:border-black/[0.1] transition-all duration-500"
              >
                {/* Industry tag + status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-signal-teal">
                    {study.industry}
                  </span>
                  <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink-muted bg-skeleton-bone px-3 py-1.5">
                    {study.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cabinet text-xl font-bold tracking-tight text-ink mb-3 flex-1">
                  {study.title}
                </h3>

                {/* Summary */}
                <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                  {study.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: CTA */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20"
        aria-label="Start a project"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon */}
            <div className="w-16 h-16 border border-black/[0.06] flex items-center justify-center mx-auto mb-8">
              <FlaskConical className="w-6 h-6 text-ink-muted" />
            </div>

            {/* Statement */}
            <p className="font-satoshi text-ink text-lg md:text-xl leading-relaxed mb-4">
              Your project could be the next case study.
            </p>
            <p className="font-satoshi text-ink-muted text-base leading-relaxed">
              Every engagement starts with a conversation. Tell us about your challenge.
            </p>

            {/* Decorative divider */}
            <div
              className="w-12 h-[1px] bg-signal-teal/30 mx-auto my-10"
              aria-hidden="true"
            />

            {/* CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-ink text-signal-white px-8 py-4 font-jetbrains text-[11px] uppercase tracking-[0.15em] hover:bg-ink-light transition-colors duration-300"
            >
              Discuss a project
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
