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
    title: "User Experience Design",
    description: "We map user journeys and design interaction patterns that feel intuitive from the first click. Every screen is built around real behaviour, not assumptions, ensuring visitors find what they need without friction or confusion.",
  },
  {
    title: "Wireframing & Prototyping",
    description: "Before a single pixel is polished, we establish structure through wireframes and interactive prototypes. This allows us to test navigation flows, content hierarchy, and feature placement early — saving time and reducing costly revisions later.",
  },
  {
    title: "Visual Design Systems",
    description: "We create cohesive visual languages — typography, colour, spacing, and component styles — that scale across every page. A well-defined design system ensures consistency and gives your team the tools to extend the site without diluting the brand.",
  },
  {
    title: "Responsive Design",
    description: "Every layout is designed for the full spectrum of devices, from narrow mobile screens to ultrawide monitors. We prioritise mobile-first thinking while ensuring the desktop experience takes full advantage of available space.",
  },
  {
    title: "Conversion-Optimised Layouts",
    description: "Strategic placement of calls-to-action, trust signals, and content blocks is driven by research, not guesswork. We design layouts that guide visitors toward meaningful actions — whether that is a purchase, a sign-up, or an inquiry.",
  },
  {
    title: "Landing Page Design",
    description: "Campaign and product launch pages require a different discipline: singular focus, clear hierarchy, and zero distraction. We design landing pages that convert traffic into outcomes with measured, deliberate choices.",
  },
];

const process = [
  {
    step: "01",
    name: "Discover & Define",
    description: "We begin by understanding your audience, business goals, and competitive landscape. Through stakeholder interviews, analytics review, and user research, we define the problems the website must solve and the outcomes it must deliver. This phase produces a shared brief that aligns every subsequent decision.",
  },
  {
    step: "02",
    name: "Structure & Flow",
    description: "With the brief as our foundation, we architect the site's information hierarchy, page structure, and navigation. Wireframes map the user's path through content, ensuring the right information appears at the right moment. We prototype key flows to validate the structure before visual design begins.",
  },
  {
    step: "03",
    name: "Design & Refine",
    description: "Visual design transforms structure into experience. We apply typography, colour, spacing, and imagery to create layouts that communicate your brand and serve your users. Every page is designed across breakpoints, reviewed with real content, and refined through iterative feedback until every detail is resolved.",
  },
  {
    step: "04",
    name: "Deliver & Support",
    description: "Final designs are packaged into a comprehensive handoff — annotated screens, responsive specifications, and a living design system document. We remain available during development to answer questions, review builds, and ensure the finished site matches the design intent pixel-for-pixel.",
  },
];

const outcomes = [
  {
    title: "A Website That Works for Your Business",
    description: "Not just a digital brochure — a purposeful tool designed around measurable objectives. Every element serves a function, from the first scroll to the final call-to-action, ensuring your website actively contributes to growth rather than passively existing online.",
  },
  {
    title: "Consistent Brand Expression",
    description: "A unified visual language across every page reinforces recognition and trust. Your website becomes a reliable extension of your brand, not a disjointed collection of templates. Consistency builds credibility, and credibility converts visitors into customers.",
  },
  {
    title: "Scalable Design Foundation",
    description: "The design system we deliver is built to grow. When you need new pages, features, or sections, the existing patterns and components provide a clear framework — no redesign required. This protects your investment and accelerates future work.",
  },
  {
    title: "Clear Developer Handoff",
    description: "Detailed specifications, responsive behaviour documentation, and a living style guide ensure your development team can build exactly what was designed. Misinterpretation between design and code is eliminated, reducing revision cycles and speeding up delivery.",
  },
];

export function WebsiteDesignPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">WEBSITE DESIGN</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Intentional Interfaces
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We design websites that communicate clearly and convert effectively. Every layout, every interaction, every visual decision is made with purpose — engineered to serve your audience and advance your business objectives.
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
            How We Approach Website Design
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
              Ready to design a website that works?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project. We will map the right approach, define the scope, and deliver a website designed to perform.
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
