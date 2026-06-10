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

const relatedServices = [
  {
    title: "Product Design",
    slug: "product-design",
    description: "End-to-end product thinking from concept to launch and beyond.",
  },
  {
    title: "Design Systems",
    slug: "design-systems",
    description: "Scalable component architecture for your entire product.",
  },
  {
    title: "Website Development",
    slug: "website-development",
    description: "Engineered to perform with clean code and fast load times.",
  },
];

export function ApplicationDesignPage() {
  return (
    <SiteShell>
      {/* A. PageHeader */}
      <PageHeader
        label="APPLICATION DESIGN"
        title="Complex Systems, Clear UX"
        subtitle="We design applications that make complexity manageable. Whether it is a data-heavy dashboard, a multi-step workflow, or an enterprise platform, we turn dense functionality into intuitive experiences that people can use without thinking."
        backHref="/services"
        backLabel="Services"
      />

      {/* B. Hero Image */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden" style={{ borderRadius: 0 }}>
            <Image
              src="/images/services/application-design.webp"
              alt="Application interface design showing dashboard layouts, data tables, and form components on a large monitor"
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
                style={{ borderRadius: 0 }}
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
                style={{ borderRadius: 0 }}
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
                style={{ borderRadius: 0 }}
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
            We are documenting our application design projects. Real case studies with measurable outcomes will appear here soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-fog-gray/20 p-6 text-center" style={{ borderRadius: 0 }}>
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
                <div className="border border-black/[0.06] bg-signal-white p-8 hover:border-black/[0.1] transition-colors duration-500" style={{ borderRadius: 0 }}>
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
              Ready to simplify complexity?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your application. We will research the problem space, design the experience, and deliver a system that works for real users.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
              style={{ borderRadius: 0 }}
            >
              Start a Project →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
