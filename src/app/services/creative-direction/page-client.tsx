"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/tangison/site-shell";
import { PageHeader } from "@/components/tangison/page-header";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const offers = [
  {
    title: "Campaign Strategy",
    description: "We develop creative campaign strategies that translate business objectives into visual and verbal concepts with clear audience targeting, messaging hierarchies, and channel plans. Every campaign we direct starts with a strategic foundation. Memorable creative is only valuable when it drives measurable outcomes.",
  },
  {
    title: "Art Direction",
    description: "From photography and illustration to motion and spatial design, we direct the visual execution of every element within a project. Art direction makes sure that every image, layout, and interaction aligns with the overarching creative vision, creating a cohesive experience rather than a collection of disconnected assets.",
  },
  {
    title: "Visual Storytelling",
    description: "We build visual narratives that communicate complex ideas with clarity and emotional resonance. A brand launch, a product story, or an annual report: we structure content and design to guide the audience through a deliberate journey. This builds understanding, engagement, and connection at every stage.",
  },
  {
    title: "Cross-Channel Consistency",
    description: "When a message needs to live across digital, print, environmental, and social channels, we make sure the creative execution is adapted, not diluted, for each medium. We direct how the core concept translates to different formats, sizes, and contexts while maintaining the integrity and impact of the original idea.",
  },
  {
    title: "Creative Workshop Facilitation",
    description: "We facilitate structured creative sessions that bring stakeholders, strategists, and makers into alignment. These workshops generate ideas, resolve disagreements, and establish a shared creative direction before significant resources are committed. The output is a clear brief that everyone has contributed to and believes in.",
  },
  {
    title: "Vendor & Production Direction",
    description: "When projects involve external producers, photographers, printers, fabricators, or developers, we act as the creative authority, reviewing deliverables against the brief and making sure quality is maintained. This oversight prevents the degradation that often occurs when creative vision passes through multiple hands.",
  },
];

const process = [
  {
    step: "01",
    name: "Align & Brief",
    description: "We start by aligning with your business goals, audience, and brand context. Through workshops and stakeholder conversations, we develop a creative brief that defines the challenge, the opportunity, and the success criteria. This brief becomes the contract between strategy and execution: the standard against which every creative decision is measured.",
  },
  {
    step: "02",
    name: "Concept & Direction",
    description: "With the brief established, we explore creative directions through mood boards, concept sketches, and narrative frameworks. Multiple directions are considered, challenged, and refined before we converge on the strongest approach. The chosen direction is documented with clear visual and verbal guidelines that enable consistent execution.",
  },
  {
    step: "03",
    name: "Direct & Produce",
    description: "We oversee the production of every creative element. This includes directing photographers, guiding illustrators, reviewing layouts, and approving production details. This hands-on direction makes sure the final output matches the creative vision with precision. We do not hand off and disappear; we stay involved until every piece is right.",
  },
  {
    step: "04",
    name: "Review & Refine",
    description: "After launch, we review performance against the brief's success criteria. What worked? What missed the mark? These insights inform future creative decisions and make sure that each project builds on the last. Creative direction is an ongoing relationship with your brand, not a one-time deliverable.",
  },
];

const outcomes = [
  {
    title: "Creative That Serves Strategy",
    description: "Every visual and verbal choice is grounded in business objectives. The creative work is not just beautiful. It is purposeful, measurable, and aligned with what your organisation needs to achieve. Aesthetics serve function, and the result is work that performs as well as it looks.",
  },
  {
    title: "Unified Brand Expression",
    description: "Across every channel and touchpoint, the creative execution tells the same story with the same voice. This coherence amplifies impact. The audience encounters a consistent message wherever they interact with your brand, reinforcing recognition and trust with every impression.",
  },
  {
    title: "Efficient Production",
    description: "With clear creative direction established upfront, production teams, internal or external, work faster and with fewer revisions. The brief, visual guidelines, and ongoing direction eliminate ambiguity and reduce the back-and-forth that wastes time and budget on projects without strong creative leadership.",
  },
  {
    title: "A Higher Standard of Execution",
    description: "Creative direction raises the quality bar across every deliverable. When every decision passes through a coherent creative framework, the cumulative result is work that feels intentional, polished, and confident: the kind of output that distinguishes a brand from its competitors and earns lasting audience respect.",
  },
];

const relatedServices = [
  {
    title: "Brand Systems",
    slug: "brand-systems",
    description: "Identity that sticks across every touchpoint.",
  },
  {
    title: "Website Design",
    slug: "website-design",
    description: "Pages that communicate clearly and convert.",
  },
  {
    title: "Product Design",
    slug: "product-design",
    description: "From idea to launch and beyond.",
  },
];

export function CreativeDirectionPage() {
  return (
    <SiteShell>
      {/* A. PageHeader */}
      <PageHeader
        label="CREATIVE DIRECTION"
        title="Strategic Visual Leadership"
        subtitle="We set the direction and make sure every piece lines up. Creative direction is the discipline of making strategy, design, and execution converge into one coherent experience across campaigns, channels, and contexts."
        backHref="/services"
        backLabel="Services"
      />

      {/* B. Hero Image */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <Image
              src="/images/services/creative-direction.webp"
              alt="Creative direction session with mood boards, colour swatches, and layout sketches arranged on a studio table"
              width={1600}
              height={1200}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* C. What We Offer */}
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
                className="border border-card-border bg-signal-white p-8"
               
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

      {/* D. How We Approach It */}
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
                className="border border-card-border bg-skeleton-bone p-8 md:p-10"
               
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

      {/* E. What You Get */}
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
                className="border border-card-border bg-signal-white p-8"
               
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

      {/* F. Case Studies — Coming Soon */}
      <section className="py-24 bg-atlantic-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-signal-teal mb-4">Case Studies</p>
          <h2 className="font-cabinet text-3xl lg:text-4xl text-skeleton-bone mb-6">Work in Progress</h2>
          <p className="font-satoshi text-lg text-fog-gray max-w-2xl mx-auto mb-8">
            We are documenting our creative direction projects. Real case studies with measurable outcomes will appear here soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-fog-gray/20 p-6 text-center">
                <div className="w-full aspect-[4/3] bg-fog-gray/10 mb-4 flex items-center justify-center">
                  <span className="font-jetbrains text-xs text-fog-gray tracking-wider uppercase">Coming Soon</span>
                </div>
                <p className="font-satoshi text-sm text-fog-gray">Case study {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. Related Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-signal-teal mb-4">Related Services</p>
          <h2 className="font-cabinet text-3xl text-ink mb-12">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                <div className="border border-card-border bg-signal-white p-8 hover:border-card-border transition-colors duration-500">
                  <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-2 group-hover:text-signal-teal transition-colors duration-300">
                    {service.title} →
                  </h3>
                  <p className="font-satoshi text-sm text-ink-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* H. CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-6">
              Ready to raise the bar on your creative output?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project or campaign. We will set the direction, guide the execution, and make sure every piece lines up.
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
