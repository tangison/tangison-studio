"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function IndustryComingSoonPage({
  industry,
  description,
  services,
  breadcrumb,
}: {
  industry: string;
  description: string;
  services: string[];
  breadcrumb: string;
}) {
  return (
    <SiteShell>
      {/* Breadcrumb */}
      <section className="pt-28 md:pt-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/work#industries"
              className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-signal-teal transition-colors duration-300"
            >
              <ArrowLeft className="w-3 h-3" />
              Work / Industries
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Header */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              {breadcrumb}
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              {industry}
            </h1>
            <div className="flex items-center gap-2 mb-8">
              <Clock className="w-4 h-4 text-signal-teal" />
              <span className="font-jetbrains text-[11px] uppercase tracking-[0.15em] text-signal-teal">
                Case studies coming soon
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description + Services */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-signal-white border-y border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Description */}
            <motion.div {...fadeUp}>
              <div className="editorial-divider mb-8" />
              <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
                What we do in this sector
              </h2>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Services */}
            <motion.div {...fadeUp}>
              <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
                Capabilities
              </h2>
              <ul className="space-y-4">
                {services.map((service, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-signal-teal shrink-0 mt-0.5" />
                    <span className="font-satoshi text-ink-muted text-base leading-relaxed">
                      {service}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="w-16 h-16 bg-signal-teal-muted flex items-center justify-center mx-auto mb-8">
              <Clock className="w-7 h-7 text-signal-teal" />
            </div>
            <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-4">
              Case Studies Are Being Assembled
            </h2>
            <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed mb-6">
              We are carefully putting together detailed case studies from both the Gemsweb Digital era and our new work as Tangison Studio. Each case study will include project context, our process, the outcomes, and what we learned.
            </p>
            <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed mb-10">
              In the meantime, if you have a project in the {industry.toLowerCase()} space, we would love to hear about it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-8 py-4 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
              >
                Start a Project &rarr;
              </Link>
              <Link
                href="/work#industries"
                className="inline-flex items-center gap-2 border border-black/[0.1] text-ink px-8 py-4 font-cabinet font-bold text-sm tracking-tight hover:bg-signal-white hover:border-black/[0.15] transition-all duration-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Industries
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-6 leading-[0.9]">
              Have a project?
            </h2>
            <p className="font-satoshi text-fog-gray/60 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              While we put the portfolio together, we are still taking on new work. Start a conversation and let&apos;s build something together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            >
              Start a Project &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
