/**
 * Tangison Studio — Shared Motion Utilities
 *
 * Centralises all Framer Motion variants and constants used across the site.
 * Previously duplicated in every page-client.tsx — now a single source of truth.
 *
 * Brand system reference:
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1) — "Studio Ease"
 * - Entrance: 0.6s base, 1.2s slow, opacity 0→1 + translateY 24px→0
 * - Hover/micro: 0.4s
 * - Stagger: 0.08s–0.1s per item
 * - Navigation: Spring physics (stiffness:380, damping:30) — documented exception
 * - prefers-reduced-motion: Fully supported via CSS fallback
 *
 * @module motion
 */

/* ─── Easing ─────────────────────────────────────────────────────── */

/** Studio Ease — the single easing curve for all page-level animations */
export const STUDIO_EASE = [0.16, 1, 0.3, 1] as const;

/** Navigation spring config — documented exception from the no-spring rule */
export const NAV_SPRING = { stiffness: 380, damping: 30 } as const;

/* ─── Durations ──────────────────────────────────────────────────── */

export const DURATION = {
  fast: 0.4,    // Hover / micro-interactions
  base: 0.6,    // Standard entrance
  slow: 1.0,    // Hero / page-level entrances
  extended: 1.2, // Large, dramatic reveals
} as const;

/* ─── Stagger ────────────────────────────────────────────────────── */

export const STAGGER = {
  item: 0.08,   // Standard item stagger
  word: 0.08,   // Word-by-word stagger (PageHeader)
  nav: 0.07,    // Navigation link stagger
} as const;

/* ─── Viewport ───────────────────────────────────────────────────── */

/** Default viewport settings for whileInView animations */
export const VIEWPORT = {
  once: true,
  margin: "-80px" as const,
} as const;

/* ─── Variant: fadeUp ────────────────────────────────────────────── */

/**
 * fadeUp — the primary entrance animation used across all pages.
 * opacity 0→1 + translateY 24px→0, Studio Ease.
 *
 * Usage:
 * ```tsx
 * <motion.div {...fadeUp}>Content</motion.div>
 * <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>Delayed</motion.div>
 * ```
 */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.base, ease: STUDIO_EASE },
} as const;

/**
 * fadeUpSlow — slower entrance for hero sections and large reveals.
 */
export const fadeUpSlow = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.slow, ease: STUDIO_EASE },
} as const;

/**
 * fadeUpExtended — dramatic entrance for key moments.
 */
export const fadeUpExtended = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.extended, ease: STUDIO_EASE },
} as const;

/* ─── Variant: fadeIn ────────────────────────────────────────────── */

/** Simple opacity fade without vertical movement */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.base, ease: STUDIO_EASE },
} as const;

/* ─── Variant: staggerContainer ──────────────────────────────────── */

/**
 * staggerContainer — wrap a list of motion.children to stagger their entrance.
 *
 * Usage:
 * ```tsx
 * <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
 *   {items.map((item, i) => (
 *     <motion.div key={i} variants={staggerItem}>{item}</motion.div>
 *   ))}
 * </motion.div>
 * ```
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.item,
    },
  },
} as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: STUDIO_EASE },
  },
} as const;

/* ─── Utility: delayedFadeUp ─────────────────────────────────────── */

/**
 * Create a fadeUp variant with a custom delay.
 *
 * Usage:
 * ```tsx
 * <motion.div {...delayedFadeUp(0.3)}>Delayed content</motion.div>
 * ```
 */
export function delayedFadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: DURATION.base, ease: STUDIO_EASE, delay },
  };
}

/* ─── Utility: animateFadeUp ─────────────────────────────────────── */

/**
 * fadeUp triggered by `animate` instead of `whileInView`.
 * Use for hero sections where content should animate on mount.
 *
 * Usage:
 * ```tsx
 * <motion.div {...animateFadeUp(0.2)}>Hero content</motion.div>
 * ```
 */
export function animateFadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow, delay, ease: STUDIO_EASE },
  };
}
