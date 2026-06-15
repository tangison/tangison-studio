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
    title: "Product Strategy",
    description: "Before design begins, we define what the product is, who it serves, and how it succeeds. We work with you to establish the value proposition, competitive positioning, and success metrics that will guide every design and engineering decision throughout the product lifecycle.",
  },
  {
    title: "Feature Prioritisation",
    description: "Not every feature deserves to be built. We help you identify the features that will deliver the most value to users and the business, using structured frameworks that balance impact, effort, and strategic alignment. The result is a focused product roadmap, not a wishlist.",
  },
  {
    title: "Design Sprints",
    description: "When you need to move fast without sacrificing rigour, we facilitate design sprints that compress weeks of exploration into days. These intensive sessions produce validated concepts, testable prototypes, and clear direction. This is ideal for new products, critical features, or pivots that need quick resolution.",
  },
  {
    title: "User Research & Validation",
    description: "We embed research into the product design process at every stage. From early concept testing to post-launch behavioural analysis, we gather evidence about what users actually need and how they behave. This research informs decisions, reduces risk, and makes sure the product earns adoption rather than hoping for it.",
  },
  {
    title: "MVP & Launch Planning",
    description: "We help you define the minimum viable product that delivers genuine value: not a skeleton, but a complete experience for a focused scope. Launch planning includes rollout strategy, onboarding design, feedback collection mechanisms, and the measurement framework you need to learn from real usage data.",
  },
  {
    title: "Iterative Evolution",
    description: "Products are never finished. We design for continuous improvement, building the feedback loops, analytics foundations, and design systems that support ongoing iteration. Each release builds on the last, guided by data and user insight rather than feature requests and internal politics.",
  },
];

const process = [
  {
    step: "01",
    name: "Define the Problem",
    description: "We start by understanding the problem you are solving and the people you are solving it for. Through stakeholder workshops, user interviews, and market analysis, we develop a shared understanding of the opportunity, constraints, and success criteria. This phase produces a product brief that anchors every subsequent decision.",
  },
  {
    step: "02",
    name: "Explore & Prototype",
    description: "With the problem defined, we explore solutions through rapid prototyping. Multiple concepts are generated, tested, and refined in quick cycles. We validate assumptions early, discard what does not work, and converge on the approach that best serves users and business goals. Speed of learning is prioritised over polish at this stage.",
  },
  {
    step: "03",
    name: "Design & Detail",
    description: "The chosen direction is developed into a complete product design. Every screen, state, and interaction is designed with precision. The design system is established, edge cases are addressed, and the full experience is documented for development. Usability testing confirms that the detailed design still solves the original problem.",
  },
  {
    step: "04",
    name: "Launch & Learn",
    description: "We support the launch with onboarding design, release documentation, and a measurement framework. Post-launch, we analyse user behaviour, gather feedback, and identify opportunities for the next iteration. The product evolves based on evidence, so that each version is an improvement over the last.",
  },
];

const outcomes = [
  {
    title: "A Product Grounded in Real Need",
    description: "Every feature, flow, and interaction is designed to solve a validated problem. The product earns its place in users' lives because it was built on understanding, not assumption. This foundation dramatically reduces the risk of building something nobody wants or needs.",
  },
  {
    title: "A Clear Roadmap from Day One",
    description: "You receive not just a design, but a strategic plan: what to build first, what comes next, and what to measure along the way. The roadmap is flexible enough to adapt to learning but structured enough to keep the team focused on delivering value with every release.",
  },
  {
    title: "Validated, Shippable Design",
    description: "The product design has been tested with real users before development begins. This means fewer surprises during implementation, fewer changes after launch, and a much higher probability that the product will perform as intended when it reaches the market.",
  },
  {
    title: "Built for Continuous Improvement",
    description: "The design system, research practices, and measurement framework we establish are designed to support ongoing evolution. As your user base grows and market conditions shift, the product can adapt without starting from scratch. This protects your investment and extends the product's useful life.",
  },
];

const relatedServices = [
  {
    title: "Application Design",
    slug: "application-design",
    description: "Complex made simple with intuitive UX.",
  },
  {
    title: "Creative Direction",
    slug: "creative-direction",
    description: "Visual leadership that makes every piece line up.",
  },
  {
    title: "Design Systems",
    slug: "design-systems",
    description: "One source of truth for your entire product.",
  },
];

export function ProductDesignPage() {
  return (
    <SiteShell>
      {/* A. PageHeader */}
      <PageHeader
        label="PRODUCT DESIGN"
        title="Complete Product Thinking"
        subtitle="From concept to launch and beyond. We design products that solve real problems and create lasting value. Not just interfaces, but complete experiences backed by strategy, research, and a clear path to market."
        backHref="/services"
        backLabel="Services"
      />

      {/* B. Hero Image */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <Image
              src="/images/services/product-design.webp"
              alt="Product design process showing wireframes, user flow diagrams, and prototype screens arranged on a workspace"
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
            How We Approach Product Design
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

      {/* F. Client Testimonials */}
      <section className="py-24 bg-atlantic-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-signal-teal mb-4 text-center">Client Testimonials</p>
          <h2 className="font-cabinet text-3xl lg:text-4xl text-skeleton-bone mb-12 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { quote: "Great man. I will definitely come back next year with a better course plan since this is just a startup.", author: "Mr. Job", company: "Nalago" },
              { quote: "Awesome work man. Now my customers have all the information they need.", author: "Mr. T", company: "Cluster Leaf Safaris" },
              { quote: "We would work on major projects together.", author: "Mr. Makopa", company: "Petrocor & Blackster Horizon" },
              { quote: "She loves the work we are doing.", author: "Miss Kay", company: "Proavia Travel" },
            ].map((testimonial, i) => (
              <div key={i} className="border border-white/[0.06] p-6">
                <p className="font-satoshi text-skeleton-bone/80 text-sm leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="border-t border-white/[0.06] pt-3">
                  <p className="font-cabinet text-xs font-bold text-skeleton-bone">{testimonial.author}</p>
                  <p className="font-satoshi text-xs text-fog-gray/60">{testimonial.company}</p>
                </div>
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
              Ready to build a product that matters?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your vision. We will set the strategy, design the experience, and help you launch with confidence.
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
