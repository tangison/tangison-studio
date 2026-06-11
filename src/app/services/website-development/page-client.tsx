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
    title: "Frontend Development",
    description: "We write clean, semantic, accessible HTML, CSS, and JavaScript that renders faithfully across browsers and devices. Our frontend code is modular, well-documented, and built for maintainability. It is designed not just for the initial launch but for every iteration that follows.",
  },
  {
    title: "CMS Integration",
    description: "Whether you need a headless CMS for editorial flexibility or a traditional platform for team-managed content, we integrate systems that let your team update the site independently. We configure content models, templates, and workflows that match how your organisation actually works.",
  },
  {
    title: "Performance Optimization",
    description: "Speed is a feature, not an afterthought. We optimise asset delivery, implement lazy loading, minimise render-blocking resources, and configure caching strategies to achieve sub-second load times. Every millisecond we remove improves engagement and search ranking.",
  },
  {
    title: "SEO Implementation",
    description: "Technical SEO is embedded in our development process, not bolted on at the end. We implement structured data, canonical URLs, meta tag management, sitemap generation, and proper heading hierarchies to ensure search engines can crawl and index your site effectively.",
  },
  {
    title: "API & Third-Party Integration",
    description: "Modern websites rarely stand alone. We integrate payment gateways, CRM systems, marketing platforms, analytics tools, and custom APIs. This connects your website to the tools your business depends on, with robust error handling and graceful fallbacks.",
  },
  {
    title: "Hosting & Deployment",
    description: "We configure modern hosting environments, including Vercel, Netlify, or dedicated infrastructure, with CI/CD pipelines, staging environments, and automated deployments. Your site ships reliably, scales automatically, and rolls back instantly if something goes wrong.",
  },
];

const process = [
  {
    step: "01",
    name: "Architecture & Planning",
    description: "We review the design system and translate it into a technical architecture: component structure, data models, API contracts, and integration points. This phase produces a clear development plan with milestones, technology choices, and risk assessments before any code is written.",
  },
  {
    step: "02",
    name: "Build & Iterate",
    description: "Development proceeds in focused sprints, building the site component by component and page by page. We ship regularly to a staging environment so you can review progress in context, provide feedback early, and ensure the build stays aligned with the design intent.",
  },
  {
    step: "03",
    name: "Test & Optimize",
    description: "Before launch, every page is tested across browsers, devices, and network conditions. We run performance audits, accessibility checks, and SEO validations. Load times are measured and optimised. Broken links, console errors, and edge cases are identified and resolved.",
  },
  {
    step: "04",
    name: "Launch & Monitor",
    description: "Deployment is automated and repeatable. We launch with monitoring in place, including uptime checks, performance tracking, and error logging, so any issue is caught immediately. Post-launch, we provide a support window to address any adjustments and ensure the site performs reliably under real traffic.",
  },
];

const outcomes = [
  {
    title: "A Fast, Reliable Website",
    description: "Built on modern infrastructure with performance baked in from the start. Your site loads quickly, handles traffic spikes, and stays online. A slow or unavailable website does not just lose visitors; it loses credibility.",
  },
  {
    title: "Content Independence",
    description: "With a properly integrated CMS, your team can publish, update, and manage content without depending on a developer for every change. We train your team on the system and document every workflow so you are self-sufficient from day one.",
  },
  {
    title: "Search Engine Visibility",
    description: "Technical SEO best practices are implemented at the code level, giving your site the structural foundation it needs to rank. Combined with well-structured content, this means organic discovery works in your favour from launch onward.",
  },
  {
    title: "Future-Ready Architecture",
    description: "The codebase is modular, documented, and built on proven frameworks. When you need to add features, integrate new services, or scale the platform, the architecture supports growth without requiring a rebuild. Your investment is protected.",
  },
];

const relatedServices = [
  {
    title: "Website Design",
    slug: "website-design",
    description: "Pages that communicate clearly and convert.",
  },
  {
    title: "Application Design",
    slug: "application-design",
    description: "Complex made simple with intuitive UX.",
  },
  {
    title: "Design Systems",
    slug: "design-systems",
    description: "One source of truth for your entire product.",
  },
];

export function WebsiteDevelopmentPage() {
  return (
    <SiteShell>
      {/* A. PageHeader */}
      <PageHeader
        label="WEBSITE DEVELOPMENT"
        title="Engineered to Perform"
        subtitle="Clean code, fast load times, built to scale. We develop websites that deliver on every metric, from Core Web Vitals to content management. Engineering is not an afterthought. It is half the product."
        backHref="/services"
        backLabel="Services"
      />

      {/* B. Hero Image */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <Image
              src="/images/services/website-development.webp"
              alt="Code editor and browser windows showing a website development workflow with component architecture"
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
            How We Approach Website Development
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
            We are documenting our website development projects. Real case studies with measurable outcomes will appear here soon.
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
              Ready to build something that lasts?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project. We will lay out the technical approach, plan the build, and deliver a site that performs.
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
