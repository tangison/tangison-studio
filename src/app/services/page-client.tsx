"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/tangison/site-shell";

const services = [
  {
    title: "Website Design",
    slug: "website-design",
    description: "Pages that work. We design websites that communicate clearly and turn visitors into customers.",
    capabilities: ["User experience design", "Wireframing and prototyping", "Visual design systems", "Responsive design"],
    caseStudy: { name: "ProAvia Travel & Tours", slug: "proavia" },
  },
  {
    title: "Website Development",
    slug: "website-development",
    description: "Fast, clean code. Built to load fast and scale without falling over.",
    capabilities: ["Frontend development", "CMS integration", "Performance optimization", "SEO implementation"],
    caseStudy: { name: "Cluster Leaf Safaris", slug: "clusterleaf" },
  },
  {
    title: "Application Design",
    slug: "application-design",
    description: "Complex made simple. We design applications that make complicated things easy to use.",
    capabilities: ["Information architecture", "Interaction design", "User flow mapping", "Interface design"],
    caseStudy: { name: "SMEFrog", slug: "smefrog" },
  },
  {
    title: "Product Design",
    slug: "product-design",
    description: "From idea to launch and beyond. Full product thinking, not just pretty screens.",
    capabilities: ["Product strategy", "Feature prioritization", "Design sprints", "Launch planning"],
    caseStudy: { name: "Feorm", slug: "feorm" },
  },
  {
    title: "Brand Systems",
    slug: "brand-systems",
    description: "Identity that sticks. Marks, palettes, and guidelines that people remember.",
    capabilities: ["Logo and wordmark design", "Color and type systems", "Brand guidelines", "Asset libraries"],
    caseStudy: { name: "Tangison Systems", slug: "tangison-systems" },
  },
  {
    title: "Design Systems",
    slug: "design-systems",
    description: "One source of truth. Every component, every token, every rule in one place.",
    capabilities: ["Component libraries", "Token systems", "Documentation", "Governance frameworks"],
    caseStudy: { name: "Nalago Skincare", slug: "nalago" },
  },
  {
    title: "Creative Direction",
    slug: "creative-direction",
    description: "Visual leadership. We set the direction and make sure every piece lines up.",
    capabilities: ["Campaign strategy", "Art direction", "Visual storytelling", "Cross-channel consistency"],
    caseStudy: { name: "Crescendo Namibia", slug: "crescendo" },
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function ServicesPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">SERVICES</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Seven Disciplines
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              One studio. Every project gets the right combination of strategy, design, and engineering. We work across seven disciplines to deliver digital products that work right, look right, and hold up over time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/services/${service.slug}`} className="block group">
                <div className="border border-card-border bg-signal-white p-8 md:p-10 lg:p-12 hover:border-card-border transition-colors duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    {/* Left: Number + Name */}
                    <div className="lg:col-span-4">
                      <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-signal-teal mb-4 block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-3">
                        <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink">
                          {service.title}
                        </h2>
                        <span className="font-satoshi text-ink-muted text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                    {/* Right: Description + Capabilities + Case Study Link */}
                    <div className="lg:col-span-8">
                      <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-signal-teal mt-2 shrink-0" aria-hidden="true" />
                            <span className="font-satoshi text-sm text-ink-muted">{cap}</span>
                          </div>
                        ))}
                      </div>
                      {/* Case study link */}
                      <Link
                        href={`/work/${service.caseStudy.slug}`}
                        className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-signal-teal hover:text-signal-teal-light transition-colors duration-300 inline-flex items-center gap-2 group/cs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        See an example: {service.caseStudy.name}
                        <span className="inline-block w-0 group-hover/cs:w-3 h-[1px] bg-signal-teal transition-all duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-6">
              Not sure which service fits?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project. We will point you in the right direction.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300 group"
             
            >
              Start a Project →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
