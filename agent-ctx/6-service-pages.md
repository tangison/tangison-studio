# Task 6 — Service Pages Creation

## Summary

Created 7 individual service pages for the Tangison Studio Next.js project, each with its own dedicated route, CTA, offer description, process steps, and outcomes content. Also updated navigation links.

## Files Created

### 7 Service Page Pairs (page.tsx + page-client.tsx)

| Service | Route | Files |
|---------|-------|-------|
| Website Design | `/services/website-design` | `src/app/services/website-design/page.tsx` + `page-client.tsx` |
| Website Development | `/services/website-development` | `src/app/services/website-development/page.tsx` + `page-client.tsx` |
| Application Design | `/services/application-design` | `src/app/services/application-design/page.tsx` + `page-client.tsx` |
| Product Design | `/services/product-design` | `src/app/services/product-design/page.tsx` + `page-client.tsx` |
| Brand Systems | `/services/brand-systems` | `src/app/services/brand-systems/page.tsx` + `page-client.tsx` |
| Design Systems | `/services/design-systems` | `src/app/services/design-systems/page.tsx` + `page-client.tsx` |
| Creative Direction | `/services/creative-direction` | `src/app/services/creative-direction/page.tsx` + `page-client.tsx` |

## File Modified

- **`src/components/tangison/navigation.tsx`** — Changed all 7 service children hrefs from hash links (`/services#website-design`) to dedicated route links (`/services/website-design`)

## Page Structure (consistent across all 7)

Each page follows the same 5-section pattern:

1. **Header Section** — Service name label (JetBrains Mono), H1 title (Cabinet Grotesk), subtitle description (Satoshi), wrapped in SiteShell
2. **Offer Section** (bg-skeleton-bone) — "What We Offer" heading, 6 deliverable cards with teal dot bullets in 3-col grid
3. **Process Section** (bg-signal-white) — "How We Approach [Service]" heading, 4 step cards with numbered steps in 2-col grid
4. **Outcomes Section** (bg-skeleton-bone) — "What You Get" heading, 4 outcome items in 2-col grid
5. **CTA Section** (bg-atlantic-black) — Service-specific CTA heading, "Start a Project →" button linking to /contact

## Design System Adherence

- Colors: Skeleton Bone, Signal White, Atlantic Black, Signal Teal, Ink Muted — all used correctly
- No gradients, no text-shadow/drop-shadow, sharp corners only
- Typography: Cabinet Grotesk (headlines, tracking-tight), Satoshi (body, leading-relaxed), JetBrains Mono (labels/metadata, uppercase, tracking)
- fadeUp animation pattern with `cubic-bezier(0.16, 1, 0.3, 1)` easing
- editorial-divider class for section dividers
- Primary button: Signal Teal bg, white text, Cabinet Grotesk bold, no border-radius, arrow suffix
- Cards use `border border-black/[0.06]` pattern matching existing pages

## Verification

- `bun run lint` passes clean with zero errors
- Dev server running successfully on port 3000
- All 14 files created (7 page.tsx + 7 page-client.tsx)
