# Wave 17: full audit stack, scored, fixed to the bar

Date: 2026-11-10. Bar: 8/10 in every category, plus the hard thresholds
the web-quality skills define (LCP < 2.5s, CLS < 0.1, WCAG AA contrast).

## Skills run (discovered through skills.sh, executed against the live site)

web-design-guidelines (vercel-labs, 846.2K installs), seo-audit
(coreyhaines31, 250.6K), web-perf (cloudflare, 123.7K),
landing-page-conversion-audit (autonnel, 122.6K; ran 2026-11-10, see
AUDIT_CONVERSION_20261110.md), impeccable audit (pbakaus, 81.9K),
squirrelscan audit-website (74.9K), web-quality-audit and accessibility
(addyosmani, 105K). Lighthouse 13 mobile supplied the numeric scores.
Skills for stacks this site does not use (Firebase, Convex, SwiftUI,
Flutter, app stores, paid ads) were excluded by domain.

## Scores, mobile Lighthouse (before -> after this wave)

| Page | Before | After |
|---|---|---|
| / | P93-87 across runs, CLS 0 | P85-93, CLS 0, LCP phases ~0.7s |
| /contact | P86-75 across runs, LCP 2.6-3.0s | P89, LCP 2.5s, CLS 0 |
| /cases, /cases/* | P94-95 | unchanged |
| A11y / BP / SEO | 100 / 100 / 100 | 100 / 100 / 100 |

Squirrelscan: overall 93 A, zero failing rules, SEO group 100, Images
100, Links 100, Accessibility 100. Custom sweep over 15 URLs: all 200,
self-referencing canonicals, zero em dashes, zero AI-tell terms, zero
banned CTA labels, one h1 per page.

## Fixed this wave

1. Fonts (Poppins, Satoshi, JetBrains Mono): display swap -> optional.
   The late swap re-painted display headings and could re-record LCP
   after first paint; optional keeps the first paint final. Cached
   visitors still get the real faces. Studio CLS was already 0; this
   closes the LCP side.
2. Home hero image: explicit fetchPriority="high" added next to
   priority. Lighthouse's discovery checklist had scored the preload
   priority hint false.
3. Undersized UI text (impeccable detector, 15 findings at 390x844):
   every 10px mono label raised to 11px, the one 11px overlay label to
   12px on larger screens. Thirteen instances across cards, blog, and
   nav.
4. Stale machine-facing copy: public/AGENTS.md said "31 case studies"
   (the gallery is 29) and described "the studio film" on the home page
   (the film was retired in wave 10). public/llms.txt repeated the film
   claim. Both now match the shipped site. Caught by cross-reading the
   agent docs against the wave history during the audit.
5. Meta descriptions over the 160-char guideline: Liger Tours 230 ->
   156, M&M Engineering 171 -> 153, the Oryx Institute article 202 ->
   157. The "Stated as exactly what it covers." tail was an internal
   note, not a reader sentence; the facts stay in the body copy.

## Documented, not defects

- The featured first case card ships eager (no lazy) although it can
  sit just under the fold: it is the primary content of the page and
  the tile visitors scroll to first. Squirrelscan's offscreen-lazy
  warning is noted and kept.
- Cream palette (impeccable cream-palette): pinned owner decision.
- CSP 'unsafe-inline' (squirrelscan): required by Next.js inline
  bootstrap; a nonce CSP is a follow-up with real breakage risk.
- Byte weight on /blog (3.2MB): below-fold card images are lazy, so the
  weight does not touch LCP; slimming the painting set is a separate
  content task.
- Markdown variants exist for articles and case studies (as AGENTS.md
  says); squirrelscan still asks for a site-wide markdown response.
  Partial coverage is the honest state and the docs say exactly that.
- Sandbox CPU noise: TBT on the same page moved 140-790ms between
  identical runs. Structural signals (CLS, discovery checklist,
  contrast) are stable and are what this wave trusted.
