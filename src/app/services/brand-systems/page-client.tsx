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
    title: "Logo & Wordmark Design",
    description: "We design marks and wordmarks that are distinctive, legible, and built to endure. Every logo we create works across scales — from a favicon to a billboard — and performs in both full-colour and single-colour contexts. The result is a mark that is recognisable, not just decorative.",
  },
  {
    title: "Colour & Type Systems",
    description: "Colour palettes and typographic hierarchies are the backbone of visual identity. We define systems that are flexible enough for diverse applications yet constrained enough to maintain coherence. Every colour and type choice is documented with usage rules, ensuring consistency across every medium and maker.",
  },
  {
    title: "Brand Guidelines",
    description: "We produce comprehensive brand guidelines that codify the visual system into clear, usable rules. Spacing, sizing, placement, colour combinations, and misuse examples are all included. The guidelines serve as the single source of truth for anyone producing brand materials — internal teams, agencies, and partners alike.",
  },
  {
    title: "Asset Libraries",
    description: "A brand system is only as useful as its implementation. We deliver complete asset libraries — logo files in every format, icon sets, illustration styles, photography direction, and template files — ready for immediate use across digital and print applications.",
  },
  {
    title: "Verbal Identity",
    description: "Brand is more than visual. We define the tone of voice, messaging framework, and key vocabulary that give your brand a distinct verbal character. This ensures that written communications — from website copy to social media posts — are as consistent and intentional as the visual identity.",
  },
  {
    title: "Brand Audit & Evolution",
    description: "For established brands that need refinement rather than reinvention, we conduct thorough audits of existing identity usage and recommend targeted evolutions. This approach preserves brand equity while addressing inconsistencies, modernising dated elements, and expanding the system for new contexts.",
  },
];

const process = [
  {
    step: "01",
    name: "Discover & Position",
    description: "We begin by understanding your brand's context: audience, market position, competitive landscape, and organisational values. Through workshops and research, we define the strategic foundation — the personality, positioning, and principles that the visual system must express. Strategy precedes aesthetics.",
  },
  {
    step: "02",
    name: "Explore & Define",
    description: "With the strategy as our guide, we explore visual directions through broad experimentation. Multiple concepts are developed, each expressing the brand's character through different formal approaches. We present these concepts with rationale, test key applications, and converge on the direction that best embodies the brand's intent.",
  },
  {
    step: "03",
    name: "Systematise & Document",
    description: "The chosen direction is expanded into a complete system. Every element — logo, colour, type, pattern, iconography — is designed, tested across applications, and codified into rules. Brand guidelines are produced with precise specifications, usage examples, and misuse boundaries, ensuring the system can be applied consistently by anyone.",
  },
  {
    step: "04",
    name: "Deliver & Activate",
    description: "We deliver the full asset library, guidelines document, and implementation templates. But delivery is not the end — we support the rollout, review early applications, and train your team on the system. This ensures the brand launches correctly and maintains integrity as it enters the real world.",
  },
];

const outcomes = [
  {
    title: "A Brand That Is Recognised, Not Just Seen",
    description: "A cohesive visual system creates cumulative recognition. Every touchpoint reinforces the same identity, building familiarity and trust over time. Customers do not just see your brand — they remember it, because every interaction is consistent, intentional, and distinct from the competition.",
  },
  {
    title: "Consistency Across Every Touchpoint",
    description: "Whether it is a social media post, a business card, a proposal template, or a trade show booth — the brand looks, sounds, and feels like the same organisation. This consistency eliminates the fragmentation that erodes credibility and makes even well-resourced brands appear unprofessional.",
  },
  {
    title: "Independence from External Agencies",
    description: "Comprehensive guidelines and ready-to-use assets mean your internal team can produce on-brand materials without depending on an agency for every deliverable. The system is designed to empower, not create dependency — saving time, reducing cost, and accelerating output.",
  },
  {
    title: "A System Built to Scale",
    description: "The brand system is designed for growth. New products, markets, and channels can be addressed within the existing framework without dilution or reinvention. As your organisation evolves, the visual identity evolves with it — coherently and confidently.",
  },
];

const relatedServices = [
  {
    title: "Creative Direction",
    slug: "creative-direction",
    description: "Strategic visual leadership that ensures every touchpoint aligns.",
  },
  {
    title: "Design Systems",
    slug: "design-systems",
    description: "Scalable component architecture for your entire product.",
  },
  {
    title: "Website Design",
    slug: "website-design",
    description: "Intentional interfaces that communicate clearly and convert.",
  },
];

export function BrandSystemsPage() {
  return (
    <SiteShell>
      {/* A. PageHeader */}
      <PageHeader
        label="BRAND SYSTEMS"
        title="Cohesive Visual Identity"
        subtitle="Marks, wordmarks, palettes, and guidelines that scale. We build brand systems that work everywhere — consistently, recognisably, and with the flexibility to grow as your organisation does."
        backHref="/services"
        backLabel="Services"
      />

      {/* B. Hero Image */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <Image
              src="/images/services/brand-systems.webp"
              alt="Brand identity materials including logo variations, colour palettes, and typography specimens laid out on a clean surface"
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

      {/* D. How We Approach It */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            How We Approach Brand Systems
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

      {/* F. Case Studies — Coming Soon */}
      <section className="py-24 bg-atlantic-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-signal-teal mb-4">Case Studies</p>
          <h2 className="font-cabinet text-3xl lg:text-4xl text-skeleton-bone mb-6">Work in Progress</h2>
          <p className="font-satoshi text-lg text-fog-gray max-w-2xl mx-auto mb-8">
            We are documenting our brand systems projects. Real case studies with measurable outcomes will appear here soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-fog-gray/20 p-6 text-center">
                <div className="w-full aspect-[4/3] bg-fog-gray/10 mb-4 flex items-center justify-center">
                  <span className="font-jetbrains text-xs text-fog-gray/40 tracking-wider uppercase">Coming Soon</span>
                </div>
                <p className="font-satoshi text-sm text-fog-gray/60">Case study {i}</p>
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
                <div className="border border-black/[0.06] bg-signal-white p-8 hover:border-black/[0.1] transition-colors duration-500">
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
              Ready to define your brand?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your organisation. We will develop a brand system that is distinctive, consistent, and built to scale with you.
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
