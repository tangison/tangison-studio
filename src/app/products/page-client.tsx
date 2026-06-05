"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const products = [
  {
    name: "SkillsCamp",
    status: "LIVE" as const,
    description:
      "531+ modular AI agent skills. No cloud dependency. Built for African contexts.",
    url: "skillscamp.tangison.com",
    href: "/products/skillscamp",
    externalUrl: "https://skillscamp.tangison.com",
    image: "/images/gallery/desk-books-lamp-sunlight.webp",
    imageAlt: "Warmly lit desk with books and study materials",
  },
  {
    name: "Tangison Agent",
    status: "LIVE" as const,
    description:
      "Autonomous AI operations platform. Powered by the Hermes Agent framework.",
    url: "tangison-agent.vercel.app",
    href: "/products/tangison-agent",
    externalUrl: "https://tangison-agent.vercel.app",
    image: "/images/gallery/concrete-glass-architecture.webp",
    imageAlt: "Concrete and glass architectural structure",
  },
  {
    name: "SMEFrog Academy",
    status: "LIVE" as const,
    description:
      "AI education for growing businesses. Practical training designed for African SMEs.",
    url: "smefrog-academy.vercel.app",
    href: "/products/smefrog-academy",
    externalUrl: "https://document-library-one.vercel.app",
    image: "/images/gallery/business-registration-compliance.webp",
    imageAlt: "Business documents and compliance forms",
  },
  {
    name: "SMEFrog",
    status: "LIVE" as const,
    description:
      "Jump Into Business. Namibia remote startup support for entrepreneurs ready to launch and scale.",
    url: "smefrog.vercel.app",
    href: "https://smefrog.vercel.app",
    externalUrl: "https://smefrog.vercel.app",
    image: "/images/gallery/sunlit-books-desk-lamp.webp",
    imageAlt: "Sunlit home workspace with books and desk lamp",
  },
  {
    name: "Feorm",
    status: "IN DEVELOPMENT" as const,
    description:
      "Namibian agrotourism and equipment rental marketplace. In collaboration with Tuppaman Investment.",
    url: null,
    href: "/products/feorm",
    externalUrl: null,
    image: "/images/gallery/desert-path-mountain-view.webp",
    imageAlt: "Desert walking path with distant mountain range",
  },
];

export function ProductsPage() {
  return (
    <SiteShell>
      {/* Section 1: Page Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 bg-warm-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 bg-rust-signal" aria-hidden="true" />
            <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.3em]">
              PRODUCTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cabinet text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-[0.95] text-ink max-w-5xl"
          >
            Built by TANGISON
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-ink-muted font-satoshi text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            We build our own products. Self-hosted. No cloud lock-in.
          </motion.p>
        </div>
      </section>

      {/* Section 2: Product Grid with Images */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white" aria-label="Product directory">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={product.href}
                  className="group block border border-black/[0.06] bg-warm-white overflow-hidden hover:border-black/[0.1] transition-all duration-500 h-full"
                >
                  {/* Product Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-700"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-transparent to-transparent" />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`font-jetbrains text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${
                          product.status === "LIVE"
                            ? "bg-rust-signal/10 text-rust-signal"
                            : "bg-warm-gray/80 text-ink-muted"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-cabinet text-2xl tracking-tight text-ink mb-3 group-hover:text-rust-signal transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {product.url && (
                      <div className="font-jetbrains text-[10px] text-rust-signal mb-4">
                        {product.url}
                      </div>
                    )}

                    <div className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-ink transition-colors duration-300">
                      View product
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: More Products Statement */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-warm-white border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-satoshi text-ink-muted text-base text-center"
          >
            More products in development.
          </motion.p>
        </div>
      </section>

      {/* Section 4: CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black" aria-label="Get in touch">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-jetbrains text-[10px] text-rust-signal/50 uppercase tracking-[0.3em] mb-4 block">
              Build With Us
            </span>
            <h2 className="font-cabinet text-3xl md:text-5xl tracking-tight text-skeleton-bone mb-6">
              Have a product idea?
            </h2>
            <p className="font-satoshi text-fog-gray/60 text-lg mb-10 font-light">
              We ship products too. Talk to us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-skeleton-bone text-atlantic-black px-8 py-4 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-fog-gray transition-all duration-300 group"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
