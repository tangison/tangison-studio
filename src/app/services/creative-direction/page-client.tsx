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
    title: "Campaign Strategy",
    description: "We develop creative campaign strategies that translate business objectives into visual and verbal concepts with clear audience targeting, messaging hierarchies, and channel plans. Every campaign we direct starts with a strategic foundation — because memorable creative is only valuable when it drives measurable outcomes.",
  },
  {
    title: "Art Direction",
    description: "From photography and illustration to motion and spatial design, we direct the visual execution of every element within a project. Art direction ensures that every image, layout, and interaction aligns with the overarching creative vision, creating a cohesive experience rather than a collection of disconnected assets.",
  },
  {
    title: "Visual Storytelling",
    description: "We craft visual narratives that communicate complex ideas with clarity and emotional resonance. Whether it is a brand launch, a product story, or an annual report, we structure content and design to guide the audience through a deliberate journey — building understanding, engagement, and connection at every stage.",
  },
  {
    title: "Cross-Channel Consistency",
    description: "When a message needs to live across digital, print, environmental, and social channels, we ensure the creative execution is adapted — not diluted — for each medium. We direct how the core concept translates to different formats, sizes, and contexts while maintaining the integrity and impact of the original idea.",
  },
  {
    title: "Creative Workshop Facilitation",
    description: "We facilitate structured creative sessions that bring stakeholders, strategists, and makers into alignment. These workshops generate ideas, resolve disagreements, and establish a shared creative direction before significant resources are committed. The output is a clear brief that everyone has contributed to and believes in.",
  },
  {
    title: "Vendor & Production Direction",
    description: "When projects involve external producers — photographers, printers, fabricators, or developers — we act as the creative authority, reviewing deliverables against the brief and ensuring quality is maintained. This oversight prevents the degradation that often occurs when creative vision passes through multiple hands.",
  },
];

const process = [
  {
    step: "01",
    name: "Align & Brief",
    description: "We start by aligning with your business goals, audience, and brand context. Through workshops and stakeholder conversations, we develop a creative brief that defines the challenge, the opportunity, and the success criteria. This brief becomes the contract between strategy and execution — the standard against which every creative decision is measured.",
  },
  {
    step: "02",
    name: "Concept & Direction",
    description: "With the brief established, we explore creative directions through mood boards, concept sketches, and narrative frameworks. Multiple directions are considered, challenged, and refined before we converge on the strongest approach. The chosen direction is documented with clear visual and verbal guidelines that enable consistent execution.",
  },
  {
    step: "03",
    name: "Direct & Produce",
    description: "We oversee the production of every creative element — directing photographers, guiding illustrators, reviewing layouts, and approving production details. This hands-on direction ensures the final output matches the creative vision with precision. We do not hand off and disappear; we stay involved until every piece is right.",
  },
  {
    step: "04",
    name: "Review & Refine",
    description: "After launch, we review performance against the brief's success criteria. What worked? What missed the mark? These insights inform future creative decisions and ensure that each project builds on the last. Creative direction is an ongoing relationship with your brand, not a one-time deliverable.",
  },
];

const outcomes = [
  {
    title: "Creative That Serves Strategy",
    description: "Every visual and verbal choice is grounded in business objectives. The creative work is not just beautiful — it is purposeful, measurable, and aligned with what your organisation needs to achieve. Aesthetics serve function, and the result is work that performs as well as it looks.",
  },
  {
    title: "Unified Brand Expression",
    description: "Across every channel and touchpoint, the creative execution tells the same story with the same voice. This coherence amplifies impact — the audience encounters a consistent message wherever they interact with your brand, reinforcing recognition and trust with every impression.",
  },
  {
    title: "Efficient Production",
    description: "With clear creative direction established upfront, production teams — internal or external — work faster and with fewer revisions. The brief, visual guidelines, and ongoing direction eliminate ambiguity and reduce the back-and-forth that wastes time and budget on projects without strong creative leadership.",
  },
  {
    title: "A Higher Standard of Execution",
    description: "Creative direction raises the quality bar across every deliverable. When every decision passes through a coherent creative framework, the cumulative result is work that feels intentional, polished, and confident — the kind of output that distinguishes a brand from its competitors and earns lasting audience respect.",
  },
];

export function CreativeDirectionPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">CREATIVE DIRECTION</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Strategic Visual Leadership
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We set the direction and ensure every touchpoint aligns. Creative direction is the discipline of making sure that strategy, design, and execution converge into a single, coherent experience — across campaigns, channels, and contexts.
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
            How We Approach Creative Direction
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
              Ready to elevate your creative output?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project or campaign. We will set the direction, direct the execution, and ensure every touchpoint aligns.
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
