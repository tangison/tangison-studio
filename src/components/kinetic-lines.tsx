import type { CSSProperties, ReactNode } from "react";

/**
 * Kinetic headline: each line rises from behind an overflow mask with a
 * short stagger, extending the nav wordmark's motion language (design.md,
 * "animated wordmark: staggered word reveal") to the hero statement.
 *
 * Progressive enhancement, same contract as .reveal: the lines are visible
 * in the delivered HTML. Only when JS runs (html.js, set by site-nav's
 * chunk on every page) does each line get the hidden start state and the
 * CSS keyframe rise, so no JS never means a blank hero.
 * prefers-reduced-motion collapses to fully visible, no animation.
 *
 * The mask reserves descender room (padding-bottom + negative margin) so
 * the tails of g, y and p are never sheared by the line box.
 */
export function KineticLines({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <h1 className={`h1 ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <span
            className="kinetic-line"
            style={{ "--i": i } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
