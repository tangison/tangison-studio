"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const articles = [
  {
    title: "What is an Applied AI Laboratory?",
    summary:
      "Why research, building, and deployment belong together. The laboratory model for AI companies.",
    category: "Business",
    readTime: "8 min",
    comingSoon: true,
  },
  {
    title: "Why AI in Africa Starts with Practical Problems",
    summary:
      "The case for building AI that solves real problems instead of chasing trends.",
    category: "AI in Africa",
    readTime: "6 min",
    comingSoon: true,
  },
  {
    title: "How We Built Our AI Assistant",
    summary:
      "A technical walkthrough of the Tangison AI widget and the engineering decisions behind it.",
    category: "Technical",
    readTime: "12 min",
    comingSoon: true,
  },
  {
    title: "Self-Hosted AI: Why Your Infrastructure Should Stay on Your Servers",
    summary:
      "The case against cloud dependency. Data sovereignty, cost control, and reliability for African organizations.",
    category: "Infrastructure",
    readTime: "7 min",
    comingSoon: true,
  },
  {
    title: "Offline-First AI: Building Systems That Work Without Internet",
    summary:
      "How we design AI systems that stay operational when connectivity drops. Architecture patterns and lessons learned.",
    category: "Technical",
    readTime: "10 min",
    comingSoon: true,
  },
  {
    title: "AI Maturity in African Organizations: Where to Start",
    summary:
      "A practical guide to assessing your organization's AI readiness and taking the first meaningful steps.",
    category: "AI in Africa",
    readTime: "9 min",
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
   ARTICLES PAGE
   ────────────────────────────────────────────── */

export function ArticlesPage() {
  return (
    <SiteShell>
      {/* Section 1: Page Header */}
      <section
        className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20"
        aria-label="Articles header"
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
              ARTICLES
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Perspectives and Commentary
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Perspectives and educational content on applied AI and building in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Article Cards */}
      <section
        className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone"
        aria-label="Articles"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
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
                {/* Category tag */}
                <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-signal-teal mb-4">
                  {article.category}
                </span>

                {/* Title */}
                <h2 className="font-cabinet text-xl font-bold tracking-tight text-ink mb-3 flex-1">
                  {article.title}
                </h2>

                {/* Summary */}
                <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-6">
                  {article.summary}
                </p>

                {/* Footer: Read time + Coming Soon badge */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/[0.04]">
                  <span className="font-jetbrains text-[10px] text-ink-muted/60 uppercase tracking-wider">
                    {article.readTime} read
                  </span>
                  {article.comingSoon && (
                    <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink-muted bg-skeleton-bone px-3 py-1.5">
                      Coming Soon
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Bottom statement */}
          <motion.div
            {...fadeUp}
            className="mt-16 md:mt-20 text-center"
          >
            <div
              className="w-8 h-[1px] bg-signal-teal/30 mx-auto mb-6"
              aria-hidden="true"
            />
            <p className="font-satoshi text-ink-muted text-base">
              More articles coming soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cross-links Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20" aria-label="Explore more">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/insights/resources"
              className="group block border border-black/[0.06] bg-signal-white p-8 md:p-10 hover:border-black/[0.1] transition-all duration-500"
            >
              <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-signal-teal mb-4 block">
                Resources
              </span>
              <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-3 group-hover:text-signal-teal transition-colors duration-300">
                AI Guides and Frameworks
              </h3>
              <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                Download our comprehensive library of AI strategy guides, maturity frameworks, and industry-specific playbooks.
              </p>
              <div className="flex items-center gap-2 mt-6 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-signal-teal transition-colors duration-300">
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/insights/case-studies"
              className="group block border border-black/[0.06] bg-signal-white p-8 md:p-10 hover:border-black/[0.1] transition-all duration-500"
            >
              <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-signal-teal mb-4 block">
                Case Studies
              </span>
              <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-3 group-hover:text-signal-teal transition-colors duration-300">
                Results from the Field
              </h3>
              <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                Real projects. Real outcomes. See how organizations are deploying AI with TANGISON STUDIO.
              </p>
              <div className="flex items-center gap-2 mt-6 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-signal-teal transition-colors duration-300">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
