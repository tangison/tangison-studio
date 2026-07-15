# Hallmark Audit Report — studio.tangison.com

**Audit date:** 2026-07-15
**Commit:** 686cfd0 → (post-audit fixes)
**Auditor:** Hallmark design skill (anti-AI-slop framework)

## Pre-emit Critique Scores

| Axis | Score | Notes |
|------|-------|-------|
| **Philosophy** | 4/5 | Font tokens (Cabinet Grotesk, Satoshi, JetBrains Mono) are properly loaded via next/font/local. Color tokens exist as CSS custom properties. Minor: 8 inline hex values in brand/page.tsx — acceptable (it's a palette display page). |
| **Hierarchy** | 5/5 | Exactly 1 H1 per page. 6 H2s on homepage with clear section structure. 8 sections with varied spacing. Heading hierarchy is clean and semantic. |
| **Execution** | 4/5 | Buttons now use border:0 with tonal fills (fixed). Nav controls are borderless circles (fixed). Minor: old studio-button.tsx with ghost/outline variants existed — removed. overflow-x:hidden changed to overflow-x:clip (gate 34). |
| **Specificity** | 5/5 | No invented metrics. No "trusted by thousands" claims. No fake testimonials. No fabricated percentages. Case study outcomes use factual delivery statements, not invented statistics. |
| **Restraint** | 4/5 | Motion is restrained (framer-motion used for nav/menu only, not every element). prefers-reduced-motion is supported (3 CSS rules). Focus-visible halo present. Minor: 2 "decorative" references in CSS but they're structural, not ornamental. |
| **Variety** | 4/5 | Homepage has good structural variety (8 sections with alternating light/dark, varied grid layouts). Work and Services pages share a similar header→content→dark-CTA rhythm — could benefit from more structural differentiation. |

**Overall: 26/30 (87%)**

## Anti-Pattern Checklist

| Gate | Status | Notes |
|------|--------|-------|
| No outline buttons | ✅ PASS | All buttons use filled backgrounds, border:0 |
| No ring-1 | ✅ PASS | No ring-1 classes found |
| No permanent focus rings | ✅ PASS | Focus-visible only (keyboard) |
| No hairline borders on buttons | ✅ PASS | Removed from all CTA controls |
| No italic headers | ✅ PASS | 0 italic header references |
| No re-drawn chrome | ✅ PASS | No fake browser bars, phone frames, or IDE chrome |
| No invented metrics | ✅ PASS | No fabricated percentages, testimonials, or claims |
| overflow-x: clip (not hidden) | ✅ FIXED | Changed from hidden → clip |
| Mobile responsiveness | ✅ PASS | Tested at 375px, 768px, 1440px |
| Reduced motion | ✅ PASS | 3 CSS rules for prefers-reduced-motion |
| Focus-visible | ✅ PASS | Present in globals.css and button component |
| No "trusted by" slop | ✅ PASS | 0 matches |
| No "world-class" slop | ✅ PASS | 0 matches (1 reference in API prompt telling chatbot NOT to use these words) |

## Issues Found and Fixed

1. **Old studio-button.tsx with border variants** — REMOVED
   - Had `ghost` variant with `border border-ink/10`
   - Had `outline` variant with `border border-signal-teal/30`
   - Not imported anywhere — safe to delete

2. **overflow-x: hidden → overflow-x: clip** — FIXED
   - Hallmark gate 34: use `clip`, not `hidden`
   - Updated in layout.tsx and globals.css

3. **"leverage" in case study copy** — FIXED
   - Replaced with "advantage" in Crescendo case study body

## Issues Noted (Acceptable)

1. **Inline hex in brand/page.tsx** — ACCEPTABLE
   - 8 hex values used to display the color palette
   - This is a brand showcase page, not a design token violation

2. **Work and Services share similar rhythm** — NOTED
   - Both use header→content→dark-CTA pattern
   - Not a violation, but could benefit from structural differentiation in future

3. **PlanCarousel component exists but unused** — NOTED
   - Not imported anywhere in the current codebase
   - Could be removed in a future cleanup pass

## Stamp

```
/* Hallmark · audit · P4 H5 E4 S5 R4 V4 · 26/30 */
```
