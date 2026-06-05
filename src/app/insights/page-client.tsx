"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, BookOpen, FlaskConical, FolderOpen } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const routeCards = [
  {
    title: "Articles",
    description:
      "Perspectives and educational content on applied AI and building in Africa.",
    href: "/insights/articles",
    icon: BookOpen,
  },
  {
    title: "Case Studies",
    description:
      "Real projects. Real outcomes. From the Tangison laboratory.",
    href: "/insights/case-studies",
    icon: FlaskConical,
  },
  {
    title: "Resources",
    description: "AI guides, frameworks, and industry-specific playbooks for African organizations.",
    href: "/insights/resources",
    icon: FolderOpen,
  },
];

const featuredArticles = [
  {
    title: "What is an Applied AI Laboratory?",
    summary:
      "Why research, building, and deployment belong together. The laboratory model for AI companies.",
    comingSoon: true,
  },
  {
    title: "Why AI in Africa Starts with Practical Problems",
    summary:
      "The case for building AI that solves real problems instead of chasing trends.",
    comingSoon: true,
  },
  {
    title: "How We Built Our AI Assistant",
    summary:
      "A technical walkthrough of the Tangison AI widget and the engineering decisions behind it.",
    comingSoon: true,
  },
];

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
   INSIGHTS HUB PAGE
   ────────────────────────────────────────────── */

export function InsightsPage() {
  return (
    <SiteShell>
      {/* Section 1: Page Header */}
      <section
        className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20"
        aria-label="Insights header"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              INSIGHTS
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Thinking and Perspectives
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              On applied AI, engineering, and building in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Route Cards */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone"
        aria-label="Explore insights"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2
            {...fadeUp}
            className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20"
          >
            Explore
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routeCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={card.href}
                  className="group block border border-black/[0.06] bg-signal-white p-8 md:p-10 lg:p-12 h-full hover:border-black/[0.1] transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 border border-black/[0.06] flex items-center justify-center group-hover:border-signal-teal/30 transition-colors duration-500">
                      <card.icon className="w-5 h-5 text-ink-muted group-hover:text-signal-teal transition-colors duration-300" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-ink-muted/30 group-hover:text-signal-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <h3 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-4 group-hover:text-signal-teal transition-colors duration-300">
                    {card.title}
                  </h3>

                  <p className="font-satoshi text-ink-muted text-base leading-relaxed">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-2 mt-8 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-signal-teal transition-colors duration-300">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Featured Article Previews */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20"
        aria-label="Featured articles"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2
            {...fadeUp}
            className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20"
          >
            Featured
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="group border border-black/[0.06] bg-skeleton-bone/40 p-6 md:p-8 h-full flex flex-col hover:border-black/[0.1] transition-all duration-500">
                  <h3 className="font-cabinet text-xl font-bold tracking-tight text-ink mb-3">
                    {article.title}
                  </h3>

                  <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-6 flex-1">
                    {article.summary}
                  </p>

                  {article.comingSoon && (
                    <div className="inline-flex self-start">
                      <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink-muted bg-skeleton-bone px-3 py-1.5">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Featured Resources */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone"
        aria-label="Featured resources"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <motion.h2
              {...fadeUp}
              className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink"
            >
              Resources
            </motion.h2>
            <Link
              href="/insights/resources"
              className="hidden md:inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 group"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The AI Blueprint for Namibian Business",
                summary: "A foundational guide for organizations looking to adopt AI. Covers strategy, readiness, and practical first steps.",
                category: "Strategy",
              },
              {
                title: "The AI Maturity Framework",
                summary: "Assess where your organization stands on the AI maturity curve and how to advance systematically.",
                category: "Framework",
              },
              {
                title: "The AI Ethics and Governance Guide",
                summary: "Guidelines for responsible AI deployment covering bias mitigation, data privacy, and governance structures.",
                category: "Governance",
              },
            ].map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/insights/resources"
                  className="group block border border-black/[0.06] bg-signal-white p-6 md:p-8 h-full hover:border-black/[0.1] transition-all duration-500"
                >
                  <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-signal-teal mb-4 block">
                    {resource.category}
                  </span>
                  <h3 className="font-cabinet text-xl font-bold tracking-tight text-ink mb-3 group-hover:text-signal-teal transition-colors duration-300">
                    {resource.title}
                  </h3>
                  <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                    {resource.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-6 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-signal-teal transition-colors duration-300">
                    <span>Download</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile link */}
          <div className="md:hidden mt-8 text-center">
            <Link
              href="/insights/resources"
              className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 group"
            >
              View All Resources
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: CTA — AI Assistant */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black"
        aria-label="Ask our AI assistant"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-12 h-[2px] bg-signal-teal/50 mx-auto mb-8"
              aria-hidden="true"
            />
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-6">
              Have a question about our work?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-10">
              Our AI assistant can answer questions about our work, approach, and products.
            </p>
            <p className="font-jetbrains text-[10px] text-skeleton-bone/30 uppercase tracking-[0.3em]">
              Click the assistant icon in the bottom-right corner
            </p>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
