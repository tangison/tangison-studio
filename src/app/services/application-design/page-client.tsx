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
    title: "Information Architecture",
    description: "Complex applications demand rigorous structure. We organise features, data, and workflows into logical hierarchies that users can navigate without thinking. Good architecture reduces cognitive load and ensures that even feature-rich applications feel straightforward and approachable from the very first session.",
  },
  {
    title: "Interaction Design",
    description: "We design how users interact with your application — every click, drag, hover, and keyboard shortcut is considered and intentional. Interaction patterns are consistent, discoverable, and forgiving, ensuring that users can accomplish tasks efficiently without encountering frustrating dead ends or confusing states.",
  },
  {
    title: "User Flow Mapping",
    description: "Before screens are designed, we map the complete user journey through the application. Every entry point, decision node, and exit condition is documented and validated. This ensures no path is left unconsidered and that users always know where they are, where they came from, and where they need to go next.",
  },
  {
    title: "Interface Design",
    description: "We design interfaces that balance density with clarity. Dashboards, forms, data tables, and configuration panels are crafted to present the right information at the right time, with visual hierarchy that guides the eye and reduces the time it takes to complete any given task.",
  },
  {
    title: "Usability Testing",
    description: "Design decisions are validated with real users, not assumptions. We conduct moderated usability sessions to test key workflows, identify friction points, and measure task completion rates. Findings directly inform design refinements, ensuring the application works for the people who will actually use it.",
  },
  {
    title: "Accessibility Compliance",
    description: "We design applications that are usable by everyone, including people using assistive technologies. Keyboard navigation, screen reader compatibility, colour contrast, and ARIA semantics are considered from the beginning — not retrofitted after the fact. Accessibility is a design requirement, not a nice-to-have.",
  },
];

const process = [
  {
    step: "01",
    name: "Research & Understand",
    description: "We immerse ourselves in the domain: user interviews, workflow observation, stakeholder alignment, and competitive analysis. Understanding the problem space deeply is the only way to design software that truly serves its users. We document mental models, pain points, and opportunity areas before sketching a single screen.",
  },
  {
    step: "02",
    name: "Architect & Map",
    description: "With research insights in hand, we define the application's structural foundation. Information architecture, navigation model, and core user flows are mapped and validated with stakeholders. This phase ensures the application's skeleton is sound before visual and interaction design layers are applied.",
  },
  {
    step: "03",
    name: "Design & Validate",
    description: "We design the full interface system — layouts, components, states, and interactions — through iterative cycles. Prototypes are tested with real users, feedback is synthesised, and designs are refined. Every screen is designed across breakpoints, with edge cases and error states given the same attention as the happy path.",
  },
  {
    step: "04",
    name: "Document & Deliver",
    description: "Final designs are documented with comprehensive specifications: component behaviour, interaction details, responsive rules, and accessibility requirements. We deliver a design system that bridges design and development seamlessly, and remain available during implementation to ensure fidelity.",
  },
];

const outcomes = [
  {
    title: "An Application Users Actually Understand",
    description: "Complexity is tamed without being removed. Users can navigate, discover, and accomplish tasks without a manual. The interface meets them where they are — whether they are first-time explorers or power users — reducing support burden and increasing adoption across your user base.",
  },
  {
    title: "Validated Design Decisions",
    description: "Every major design decision is backed by user research or testing data, not opinion. This means fewer debates during development, fewer redesigns after launch, and a product that is more likely to succeed because it was built on evidence rather than assumptions about what users want.",
  },
  {
    title: "Comprehensive Design Documentation",
    description: "Your development team receives detailed specifications that eliminate ambiguity. Component states, interaction rules, responsive behaviour, and accessibility requirements are all documented, reducing the gap between design intent and built product and accelerating the implementation timeline.",
  },
  {
    title: "A Foundation That Scales",
    description: "The information architecture and design system are built to accommodate future features without structural rework. As the application grows, new functionality integrates naturally into the existing framework — preserving usability and visual coherence across every release.",
  },
];

export function ApplicationDesignPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">APPLICATION DESIGN</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Complex Systems, Clear UX
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We design applications that make complexity manageable. Whether it is a data-heavy dashboard, a multi-step workflow, or an enterprise platform, we turn dense functionality into intuitive experiences that people can use without thinking.
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
            How We Approach Application Design
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
              Ready to simplify complexity?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your application. We will research the problem space, design the experience, and deliver a system that works for real users.
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
