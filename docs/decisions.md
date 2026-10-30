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

## S7. Client marks in the trust layer, and the case-card lift

Owner request (2026-10-18) reached the studio through the home-page
logo strip: extract the clients' own logos from their websites and
use the real marks instead of plain text names. The trust row now
renders the five featured clients' marks (the same sanitized and
traced SVGs the Technologies site ships, one asset set), each linking
to the client's live site in a new tab; the text fallback stays for
any future case without a usable mark.

The marks sit grayscale at 66% and return to full colour on hover or
keyboard focus; reduced motion keeps them at full colour always.

The case gallery gains one lift: on hover or focus-within the tile
rises 6px, its shadow deepens, the artwork zooms (existing) and the
title takes the teal. Transform and shadow only, no layout cost.
Reduced motion removes the lift and the zoom, keeping the shadow
change as the only hover signal.

## S8. ScrubWords on the capabilities heading

The "Studio and Intelligence. One practice." heading types itself in
as it scrolls into reading position, built on the studio's own scrub()
helper (rAF, lerp, parked off-screen). Words render at full opacity in
the delivered HTML; the faint floor (0.14) only exists once the block
approaches the viewport, so the static page always passes the
colour-contrast audit. Reduced motion never arms it.

## S9. Squible artwork, the slower film, three new cases, and the audit loop

Owner instruction (2026-10-30) bundled four things: regenerate every artwork
image on the site in an ultra-minimal "squible" style with AI generation,
compress and slow the hero film without changing it, add namproff.com,
oryxinstitute.com and the inhouse hola.tangison.com as cases (Liger Tours,
the owner's "ligertours.com", shipped at e1dd345), and run the squirrelscan
audit-website skill on studio.tangison.com and drive the score up.

- Generator: Pollination was tried first and rejected on evidence - the free
  tier stamps a pollinations.ai watermark on every image, ignores requested
  dimensions and does not follow the flat line-art style. The studio would
  not ship watermarked art, so the environment's own image generator produced
  all 95 paintings from a committed subject manifest (per-file subjects,
  same filenames, same aspects, ffmpeg webp q55-58). Client marks and work
  screenshots were NOT regenerated: marks are the clients' real brand assets
  and screenshots are labelled live captures; the no-fabrication rule wins.
- The film: re-timed to 0.8x (180 frames over 9.3s) and re-encoded under
  bitrate ceilings: 87KB webm / 115KB mp4 (was 109/130KB). Poster untouched.
  Old v5 files stay until live verification, then a separate commit removes
  them. A VideoObject with the measured duration now describes the film.
- Cases: NAMproff Group (six companies, one umbrella), Oryx Institute
  (honest launching-soon page), Hola Credit (inhouse cash-flow underwriting,
  live at hola.tangison.com). Copy sourced from the live sites and the
  Technologies site's published facts; no invented metrics. Covers painted
  in the same squible family.
- Insights: "A New Name for the Studio? Why times_studio Might Be Next"
  (Studio Notes, 2026-10-30) - the rename is stated as an exploration,
  nothing decided, with what would and would not change.
- Audit loop (quick baseline 79/C): the 47 aria-label/visible-text mismatches
  on /blog are gone (the card link takes its name from its content); the
  process line is a sibling of the <ol>, not an invalid child; the redundant
  "Preview case" chip is gone (the artwork already links the case), the
  "Live site" chip names its case in its accessible name; /cases drops from
  127 internal links to ~99; the dead labs.tangison.com anchor is a text
  mention and the dead lrclearing.com live link is removed (both flagged to
  the owner); excerpts strip markdown links before excerpting; five case
  descriptions and /terms rebalanced into 120-158 chars; every image ships
  width/height (fill replaced by explicit dimensions + absolute-fill
  styling, rendering unchanged) and the srcset ladder caps at 1920; the
  contact form gains enterkeyhint, an accessible arithmetic human check
  (server-verified, the Technologies pattern) and the mobile takeover gains
  inert; the site graph carries a founder Person with a stable @id that
  article authorship references; markdown variants serve at
  /blog/{slug}.md and /cases/{slug}.md with an alternate link; AGENTS.md
  published; SiteNav serializes four small strings per case instead of
  every case body (the whole-site RSC payload shrinks by hundreds of KB).
- CSP keeps 'unsafe-inline' for scripts: a nonce policy is a middleware
  rollout with real breakage risk (Next hydration payloads, JSON-LD blocks)
  and the Technologies site holds the same documented trade-off.
- Deploy target for the studio moves to a separate Vercel account (owner's
  choice, 2026-10-30): the shared team token keeps hitting the team fair-use
  block, so production deploys happen from the other account once the domain
  is wired there; the repo stays the source of truth on GitHub. The client
  domain is spelled ligertours.com everywhere (docs corrected today).
