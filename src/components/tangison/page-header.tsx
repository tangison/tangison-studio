"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({
  label,
  title,
  subtitle,
  backHref = "/",
  backLabel = "Home",
}: PageHeaderProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!headingRef.current || !isInView) return;

    const words = headingRef.current.querySelectorAll(".page-word");
    if (words.length === 0) return;

    gsap.fromTo(
      words,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [isInView]);

  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 bg-atlantic-black overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean/20 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-jetbrains text-[10px] text-fog-gray/40 uppercase tracking-[0.25em] hover:text-fog-gray/70 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-2 h-2 bg-rust-signal" aria-hidden="true" />
          <span className="font-jetbrains text-[10px] text-fog-gray/50 uppercase tracking-[0.3em]">
            {label}
          </span>
        </motion.div>

        <h1
          ref={headingRef}
          className="font-cabinet text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-[0.95] text-skeleton-bone max-w-5xl"
        >
          {title.split(" ").map((word, i) => (
            <span
              key={i}
              className="page-word inline-block mr-[0.2em]"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-fog-gray font-satoshi text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" aria-hidden="true" />
    </section>
  );
}
