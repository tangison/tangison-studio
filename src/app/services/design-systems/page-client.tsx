"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/tangison/site-shell";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const offers = [
  {
    title: "Component Libraries",
    description: "We design and document reusable UI components — buttons, forms, cards, navigation, modals, and every pattern your product needs. Each component is designed across states, variants, and breakpoints, with clear rules for composition. The result is a library that developers can implement once and reuse everywhere.",
  },
  {
    title: "Token Systems",
    description: "Design tokens are the atoms of a design system: colours, spacing, typography, radii, and shadows expressed as named, platform-agnostic values. We establish token hierarchies with semantic naming that decouples design decisions from implementation, enabling global changes from a single source of truth.",
  },
  {
    title: "Documentation",
    description: "A design system without documentation is just a file. We produce comprehensive, searchable documentation that covers component usage, design principles, accessibility requirements, and code examples. Documentation is structured for both designers and developers, serving as the definitive reference for the system.",
  },
  {
    title: "Governance Frameworks",
    description: "Design systems live or die by adoption and maintenance. We establish governance models that define how the system evolves: who proposes changes, how contributions are reviewed, and when new components are added. This prevents drift, ensures quality, and keeps the system relevant as the product grows.",
  },
  {
    title: "Migration Strategy",
    description: "For teams transitioning from inconsistent UI patterns to a unified system, we develop migration roadmaps that minimise disruption. We audit existing components, map them to the new system, and define a phased rollout plan that allows teams to adopt the system incrementally without blocking feature work.",
  },
  {
    title: "Cross-Platform Consistency",
    description: "When your product spans web, mobile, and other platforms, we ensure the design system translates coherently across each. Platform-specific adaptations are documented alongside shared principles, so the experience feels native on each platform while remaining unmistakably on-brand.",
  },
];

const process = [
  {
    step: "01",
    name: "Audit & Assess",
    description: "We begin by auditing your existing interface patterns, identifying inconsistencies, redundancies, and gaps. This inventory reveals the true scope of the system and provides the baseline against which we measure improvement. We also assess your team's workflow, tooling, and constraints to ensure the system fits how you actually work.",
  },
  {
    step: "02",
    name: "Architect & Tokenize",
    description: "With the audit complete, we establish the system's architectural foundation: token taxonomy, component hierarchy, naming conventions, and composition rules. These decisions are made collaboratively with your team, ensuring the system's structure feels intuitive and sustainable for the people who will maintain it daily.",
  },
  {
    step: "03",
    name: "Build & Document",
    description: "Components are designed systematically — each one defined across variants, states, and breakpoints. As components are completed, they are documented with usage guidelines, accessibility notes, and implementation specifications. The documentation grows alongside the system, never lagging behind the design work.",
  },
  {
    step: "04",
    name: "Adopt & Evolve",
    description: "We support the adoption process through team training, pair implementation sessions, and review of early production usage. The system is not static — we establish contribution workflows and versioning practices that allow it to evolve. Regular audits ensure the system remains healthy, relevant, and trusted by the teams who depend on it.",
  },
];

const outcomes = [
  {
    title: "One Source of Truth",
    description: "Design decisions are centralised and documented. When a colour changes, it changes everywhere. When a component is updated, every instance benefits. The design system eliminates the duplicate work, inconsistencies, and guesswork that slow teams down and erode quality across a product.",
  },
  {
    title: "Faster Design and Development",
    description: "With a library of ready-to-use components and clear documentation, teams build faster. Designers compose rather than create from scratch. Developers implement known patterns rather than solving the same problems repeatedly. The result is shorter cycles, fewer bugs, and more time spent on the unique challenges that actually differentiate your product.",
  },
  {
    title: "Visual and Interaction Consistency",
    description: "Every screen in your product looks and behaves like it came from the same team — because it did, via the system. Users experience a coherent product, not a patchwork of individual preferences. Consistency builds trust, reduces learning curves, and makes the product feel professional and reliable.",
  },
  {
    title: "Sustainable Growth",
    description: "The design system is built to grow with your product and team. New features are faster to design and build because the foundational patterns already exist. The governance framework ensures quality is maintained as the system expands, preventing the decay that turns well-intentioned design systems into abandoned style guides.",
  },
];

export function DesignSystemsPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">DESIGN SYSTEMS</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Scalable Component Architecture
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              One source of truth for your entire product. We build design systems that unify teams, accelerate delivery, and ensure consistency at scale — not just a style guide, but a living system that grows with your product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-black/[0.06] bg-signal-white p-8"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-2 bg-signal-teal mt-2 shrink-0" aria-hidden="true" />
                  <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink">
                    {offer.title}
                  </h3>
                </div>
                <p className="font-satoshi text-sm md:text-base text-ink-muted leading-relaxed pl-5">
                  {offer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            How We Approach Design Systems
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-black/[0.06] bg-skeleton-bone p-8 md:p-10"
              >
                <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-signal-teal block mb-4">
                  {step.step}
                </span>
                <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-4">
                  {step.name}
                </h3>
                <p className="font-satoshi text-sm md:text-base text-ink-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            What You Get
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-black/[0.06] bg-signal-white p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 bg-signal-teal" aria-hidden="true" />
                  <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink">
                    {outcome.title}
                  </h3>
                </div>
                <p className="font-satoshi text-sm md:text-base text-ink-muted leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-6">
              Ready to systematise your design?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your product. We will audit your patterns, architect the system, and deliver a design system that scales with your team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            >
              Start a Project →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
