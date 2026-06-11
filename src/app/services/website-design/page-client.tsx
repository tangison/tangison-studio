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
    title: "User Experience Design",
    description: "We map user journeys and design interaction patterns that feel intuitive from the first click. Every screen is built around real behaviour, not assumptions, ensuring visitors find what they need without friction or confusion.",
  },
  {
    title: "Wireframing & Prototyping",
    description: "Before a single pixel is polished, we establish structure through wireframes and interactive prototypes. This allows us to test navigation flows, content hierarchy, and feature placement early. This saves time and reduces costly revisions later.",
  },
  {
    title: "Visual Design Systems",
    description: "We create cohesive visual languages, including typography, colour, spacing, and component styles, that scale across every page. A well-defined design system ensures consistency and gives your team the tools to extend the site without diluting the brand.",
  },
  {
    title: "Responsive Design",
    description: "Every layout is designed for the full spectrum of devices, from narrow mobile screens to ultrawide monitors. We prioritise mobile-first thinking while ensuring the desktop experience takes full advantage of available space.",
  },
  {
    title: "Conversion-Optimised Layouts",
    description: "Strategic placement of calls-to-action, trust signals, and content blocks is driven by research, not guesswork. We design layouts that guide visitors toward meaningful actions, whether that is a purchase, a sign-up, or an inquiry.",
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
    description: "Final designs are packaged into a comprehensive handoff: annotated screens, responsive specifications, and a living design system document. We remain available during development to answer questions, review builds, and ensure the finished site matches the design intent pixel-for-pixel.",
  },
];

const outcomes = [
  {
    title: "A Website That Works for Your Business",
    description: "Not just a digital brochure. It is a purposeful tool designed around measurable objectives. Every element serves a function, from the first scroll to the final call-to-action, ensuring your website actively contributes to growth rather than passively existing online.",
  },
  {
    title: "Consistent Brand Expression",
    description: "A unified visual language across every page reinforces recognition and trust. Your website becomes a reliable extension of your brand, not a disjointed collection of templates. Consistency builds credibility, and credibility converts visitors into customers.",
  },
  {
    title: "Scalable Design Foundation",
    description: "The design system we deliver is built to grow. When you need new pages, features, or sections, the existing patterns and components provide a clear framework. No redesign is required. This protects your investment and accelerates future work.",
  },
  {
    title: "Clear Developer Handoff",
    description: "Detailed specifications, responsive behaviour documentation, and a living style guide ensure your development team can build exactly what was designed. Misinterpretation between design and code is eliminated, reducing revision cycles and speeding up delivery.",
  },
];

const relatedServices = [
  {
    title: "Website Development",
    slug: "website-development",
    description: "Fast, clean code and fast load times.",
  },
  {
    title: "Brand Systems",
    slug: "brand-systems",
    description: "Identity that sticks across every touchpoint.",
  },
  {
    title: "Creative Direction",
    slug: "creative-direction",
    description: "Visual leadership that makes every piece line up.",
  },
];

export function WebsiteDesignPage() {
  return (
    <SiteShell>
      {/* A. PageHeader */}
      <PageHeader
        label="WEBSITE DESIGN"
        title="Intentional Interfaces"
        subtitle="We design websites that communicate clearly and convert. Every layout, every interaction, every visual choice is deliberate. Built to serve your audience and your business goals."
        backHref="/services"
        backLabel="Services"
      />

      {/* B. Hero Image */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <Image
              src="/images/services/website-design.webp"
              alt="Website design mockups displayed across desktop, tablet, and mobile screens showing responsive layouts"
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
            We are documenting our website design projects. Real case studies with measurable outcomes will appear here soon.
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
                <div className="border border-card-border bg-signal-white p-8 hover:border-black/[0.1] transition-colors duration-500">
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
              Ready to design a website that works?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project. We will figure out the right approach, set the scope, and deliver a site designed to perform.
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
