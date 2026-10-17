# Decisions log (studio, 17 October 2026)

## S1. The film gets small and loads at the load event, not late

Chromium makes a video's first decoded frame the LCP element; hiding the
fetch past the measurement window was rejected as gaming the metric. The
107KB webm (130kbps mp4 fallback) loads when the critical path is done:
poster first, film about a second later, page 516KB with the film
included and 409KB before it. Frame-checked against the painting look.

## S2. GSAP leaves; scroll-motion.ts carries the four effects

Identical triggers (IO one-shots for "top N%" reveals and the wipe, gated
rAF scrub for the line draw and the parallax), 45KB less wire, no 661ms
parse long task. The gate also fixed the first attempt's 1.3s TBT:
off-screen elements cost zero frames. Reduced-motion and no-JS contracts
unchanged.

## S3. Case captures ship as AVIF, og set stays PNG

AVIF holds the 150KB line at equal sharpness for the tall UI captures.
The og set measured 15-20 percent LARGER as JPEG (flat-color art), so
PNG stays: it is already the optimal web format for those files.

## S4. Satoshi ships as latin subsets; prefetch is opt-in for primary paths only

The subset unicode set was surveyed from shipped copy (eleven non-ASCII
characters), 25KB -> 9KB per face. RSC prefetch stays on the two hero
CTAs and goes off on nav, footer, cards and section links: ~40KB less on
every first viewport without touching the primary navigation path.

## S5. /500 is branded (error.tsx + global-error.tsx)

Checklist requirement. The global variant carries inline tokens because
the stylesheet may be the fault. Digests surface, stacks never do.

## S6. Deletion list, deferred until the deploy verifies live

The four full.webp screenshot originals and the two hero-v4/v3 video
files leave in one separate cleanup commit after this deploy is READY
and the live URL spot-checks pass (house deletion rule; originals stay
until then). The Poppins 400/500 source files in src/fonts are unused by
fonts.ts and leave in the same commit.
