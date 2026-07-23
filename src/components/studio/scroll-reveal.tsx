"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpSlow, staggerContainer, staggerItem, delayedFadeUp, STUDIO_EASE, DURATION } from "@/lib/motion";

/**
 * ScrollReveal — wraps content in a Framer Motion whileInView animation.
 * Uses the shared motion.ts Studio Ease and durations.
 *
 * Usage:
 * <ScrollReveal>Any content here</ScrollReveal>
 * <ScrollReveal delay={0.2}>Delayed content</ScrollReveal>
 * <ScrollReveal slow>Slower entrance for hero sections</ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  slow = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  slow?: boolean;
  className?: string;
}) {
  const variant = slow ? fadeUpSlow : fadeUp;
  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.whileInView}
      viewport={variant.viewport}
      transition={{ ...variant.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerReveal — wraps a list of children that stagger their entrance.
 *
 * Usage:
 * <StaggerReveal>
 *   <StaggerItem>First</StaggerItem>
 *   <StaggerItem>Second</StaggerItem>
 *   <StaggerItem>Third</StaggerItem>
 * </StaggerReveal>
 */
export function StaggerReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * FadeIn — simple opacity fade without vertical movement.
 * Good for images and paintings that should not shift vertically.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleReveal — image entrance that scales from 1.05→1 while fading in.
 * Creates a "settling into frame" effect for paintings and photos.
 * Respects prefers-reduced-motion via CSS fallback.
 */
export function ScaleReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION.slow, delay, ease: STUDIO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLift — wraps content that lifts slightly on hover.
 * Uses scale(1.02) + subtle shadow increase for a physical "card lift" feel.
 * Does NOT affect layout: translateY uses will-change and GPU compositing.
 */
export function HoverLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(17,19,21,0.08)" }}
      transition={{ duration: 0.3, ease: STUDIO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * TextReveal — word-by-word stagger reveal for hero headings.
 * Each word fades up independently with a stagger delay.
 *
 * Usage:
 * <TextReveal text="We build the brand, the product and the intelligence behind it." />
 */
export function TextReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: DURATION.base, ease: STUDIO_EASE },
            },
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * ParentBadge — a small badge that links back to the parent company.
 * Used on the homepage and key pages to show the Tangison group connection.
 */
export function ParentBadge({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, delay: 0.8, ease: STUDIO_EASE }}
      className={className}
    >
      <a
        href="https://tangison.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] hover:text-signal-teal-text transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-signal-teal shrink-0" aria-hidden="true" />
        Part of Tangison Technologies
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </a>
    </motion.div>
  );
}
