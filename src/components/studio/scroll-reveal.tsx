"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpSlow, staggerContainer, staggerItem, delayedFadeUp } from "@/lib/motion";

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
