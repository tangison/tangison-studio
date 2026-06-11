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

export function CareersPage() {
  return (
    <SiteShell>
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">CAREERS</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Join the Studio
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We are always looking for talented people who care about quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-12">
              Open Positions
            </h2>

            <div className="border border-card-border bg-signal-white p-8 md:p-10 text-center">
              <p className="font-satoshi text-ink-muted text-base leading-relaxed mb-4">
                No open positions at this time.
              </p>
              <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                We are a small studio and hire when we have the right role. Send your portfolio to{" "}
                <a href="mailto:studio@tangison.com" className="text-signal-teal hover:text-signal-teal-light transition-colors">
                  studio@tangison.com
                </a>{" "}
                and we will keep you in mind.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we look for */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
        <div className="max-w-[800px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-12">
              What We Look For
            </h2>
            <div className="space-y-6">
              {[
                { title: "Craft", desc: "You care about details. Typography, spacing, interaction: you notice everything." },
                { title: "Thinking", desc: "You ask why before how. You research before you design. You challenge assumptions." },
                { title: "Communication", desc: "You can explain your decisions. You write clearly. You listen well." },
                { title: "Independence", desc: "You work well autonomously. You take ownership. You deliver." },
              ].map((item, i) => (
                <div key={item.title} className="border-b border-card-border pb-6">
                  <h3 className="font-cabinet text-lg font-bold tracking-tight text-ink mb-1">{item.title}</h3>
                  <p className="font-satoshi text-ink-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
