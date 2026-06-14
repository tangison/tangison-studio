"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, FolderOpen } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const routeCards = [
  {
    title: "Articles",
    description: "Perspectives and educational content on design, development, and building in Africa.",
    href: "/insights/articles",
    icon: BookOpen,
  },
  {
    title: "Case Studies",
    description: "Real projects. Real outcomes. From Tangison Studio.",
    href: "/insights/case-studies",
    icon: FlaskConical,
  },
  {
    title: "Resources",
    description: "Guides, frameworks, and industry playbooks for African organizations.",
    href: "/insights/resources",
    icon: FolderOpen,
  },
];

const featuredArticles = [
  {
    title: "What Makes a Design System Scalable",
    summary: "How to build component libraries that grow with your product, not against it.",
    comingSoon: true,
  },
  {
    title: "Why AI in Africa Starts with Practical Problems",
    summary: "The case for building AI that solves real problems instead of chasing trends.",
    comingSoon: true,
  },
  {
    title: "How We Built Our AI Assistant",
    summary: "A technical walkthrough of the Tangison AI widget and the engineering decisions behind it.",
    comingSoon: true,
  },
];

const featuredResources = [
  {
    title: "The AI Blueprint for Namibian Business",
    summary: "A foundational guide for organizations looking to adopt AI. Strategy, readiness, and first steps.",
    category: "Strategy",
  },
  {
    title: "The AI Maturity Framework",
    summary: "Assess where your organization stands on the AI maturity curve and how to advance systematically.",
    category: "Framework",
  },
  {
    title: "The AI Ethics and Governance Guide",
    summary: "Guidelines for responsible AI deployment covering bias mitigation, data privacy, and governance.",
    category: "Governance",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function BlogPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">BLOG</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Thinking and Perspectives
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              On design, engineering, and building in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Route Cards */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Explore">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            Explore
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routeCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={card.href}
                  className="group block border border-card-border bg-signal-white p-8 md:p-10 h-full hover:border-card-border transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 border border-card-border flex items-center justify-center group-hover:border-signal-teal/30 transition-colors duration-500">
                      <card.icon className="w-5 h-5 text-ink-muted group-hover:text-signal-teal transition-colors duration-300" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-muted/30 group-hover:text-signal-teal group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="font-cabinet text-2xl font-bold tracking-tight text-ink mb-4 group-hover:text-signal-teal transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="font-satoshi text-ink-muted text-base leading-relaxed">{card.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20" aria-label="Featured">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            Featured
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="group border border-card-border bg-skeleton-bone/40 p-6 md:p-8 h-full flex flex-col">
                  <h3 className="font-cabinet text-xl font-bold tracking-tight text-ink mb-3">
                    {article.title}
                  </h3>
                  <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-6 flex-1">
                    {article.summary}
                  </p>
                  {article.comingSoon && (
                    <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink-muted bg-skeleton-bone px-3 py-1.5 self-start">
                      Coming Soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Resources">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            Resources
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/insights/resources"
                  className="group block border border-card-border bg-signal-white p-6 md:p-8 h-full hover:border-card-border transition-all duration-500"
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
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
