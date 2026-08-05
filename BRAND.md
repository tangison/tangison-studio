# BRAND.md — Tangison Studio Brand System v1.0

**Owner:** Tangi Iigonda · Studio Lead
**Live source of truth:** https://tangison-studio.vercel.app/brand (renders this document as a page)
**Code source of truth:** `src/app/brand/page.tsx` and `src/app/globals.css`
**Status:** v1.0 — ratified and applied across the site

---

## 1. Brand thesis

Tangison Studio is a creative digital agency operating from Windhoek, Namibia. The brand is built on a single conviction: **brand is behaviour, not communication.** A studio is judged by what it ships, not by what it says about itself.

That conviction has three corollaries that show up in every page, every motion, and every line of copy:

1. **Honesty is positioning.** Stating what you actually do, who you actually serve, and what you do not claim is a differentiator in a market where most sites overpromise and under-specify.
2. **Local is real.** The studio is from Windhoek. It writes for the Namibian and SADC market. It does not pretend to be a remote international agency.
3. **The work is the proof.** Every portfolio entry links to a live client site the visitor can verify themselves.

---

## 2. Brand lineage

The brand draws on five reference agencies. Each contributes one principle that is testable in the work.

| Reference | Principle | Tangison test |
|---|---|---|
| **Pentagram** | Strategy without execution is toothless. | Every strategic decision traces to a shipped artefact. |
| **Wolff Olins** | What you do is more important than what you say. | The brand behaves differently, not just looks different. |
| **Landor** | Products are made in factories. Brands are created in the mind. | Every design element carries meaning beyond aesthetics. |
| **COLLINS** | Design is not what we make. Design is what we make possible. | Each design choice makes something possible that wasn't. |
| **Siegel+Gale** | Simplicity is the ultimate sophistication. | Everything that doesn't add meaning has been removed. |

---

## 3. Voice

The studio's voice follows the Corey Haines copywriting rules. This is not a style preference; it is enforced on every page.

- **No superlatives.** "World-class", "best", "leading", "award-winning" do not appear in the copy. If a claim cannot be substantiated, it does not appear.
- **No passive voice.** "The site was built by the studio" becomes "The studio built the site." Active verbs only.
- **Every sentence earns its place.** Sentences that exist only to bridge to the next sentence are removed.
- **Direct, confident, understated.** Confidence is shown through specifics, not through adjectives.
- **Specifics over generalities.** "31 Hage Geingob Street, Walvis Bay" beats "conveniently located".
- **Honesty about limits.** What the studio did not build, did not claim, and does not offer is stated explicitly. This is a positioning move, not a disclaimer.

### Voice examples

| Avoid | Use |
|---|---|
| "We deliver world-class solutions" | "We shipped a Next.js site that puts the phone number first." |
| "Our team of experts" | "Stephen Lee owns Dieselman Nam. Chané Philander and Anthea Feris run Enchanted Artistry CC." |
| "Cutting-edge design" | "Type scale uses `clamp()` so headlines scale fluidly between 375px and 1440px." |
| "Trusted by leading brands" | "13 case studies. Each links to a live site you can verify." |

---

## 4. Palette

The palette is two anchors (Skeleton Bone, Atlantic Black), one accent (Signal Teal), and a small set of supporting neutrals. One accent only. The accent does not change per section.

| Token | Hex | Usage |
|---|---|---|
| Skeleton Bone | `#F6F4EF` | Page base, light backgrounds |
| Signal White | `#FFFFFF` | Cards, panels |
| Atlantic Black | `#111315` | Primary text, dark sections |
| Terminal Black | `#0A0B0C` | Deepest dark, footer |
| Signal Teal | `#2CB5B4` | CTAs, links, STUDIO descriptor |
| Signal Teal Light | `#3CC8C7` | Hover state for Signal Teal |
| Signal Teal Muted | `rgba(44,181,180,0.15)` | Subtle teal background |
| Ocean Mist | `#E6F2F1` | Hover states, subtle tint |
| Fog Gray | `#D9D7D2` | Secondary text, dividers |
| Ink Muted | `#6B6860` | Body text |

### Border opacity tokens

Borders use opacity-of-black so they read correctly on both light and dark sections.

| Token | Value | Usage |
|---|---|---|
| Border Subtle | `rgba(17,19,21,0.04)` | Lightest dividers |
| Border Light | `rgba(17,19,21,0.06)` | Card borders |
| Border Default | `rgba(17,19,21,0.09)` | Standard borders |
| Border Medium | `rgba(17,19,21,0.12)` | Hover borders |
| Border Strong | `rgba(17,19,21,0.15)` | Emphasis |
| Border Dark Subtle | `rgba(255,255,255,0.04)` | Dark section lightest |
| Border Dark Light | `rgba(255,255,255,0.06)` | Dark section light |
| Border Dark Medium | `rgba(255,255,255,0.08)` | Dark section medium |

---

## 5. Typography

Three typefaces. Each has one job. There is no fourth typeface.

| Font | Weights | Job |
|---|---|---|
| **Cabinet Grotesk** | 400, 500, 700, 800, 900 | Headlines (800–900), sub-headings (400–700), wordmark |
| **Satoshi** | 300, 400, 500, 700, 900 | Body text (300–400), emphasis (500–700), rare bold (900) |
| **JetBrains Mono** | 400 | Metadata, labels, nav items |

Fonts are self-hosted as `.ttf` files in `public/fonts/` and loaded via `next/font/local` so no third-party request is made at runtime.

### Type scale

All headlines use `clamp()` for fluid scaling between 375px and 1440px viewports.

| Token | Value | Usage |
|---|---|---|
| `--text-display` | `clamp(2.5rem, 6vw, 6rem)` | Hero / key moments |
| `--text-h1` | `clamp(2.2rem, 5vw, 4.5rem)` | Page titles |
| `--text-h2` | `clamp(1.75rem, 3.5vw, 3rem)` | Section titles |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.875rem)` | Sub-sections |
| `--text-h4` | `clamp(1.1rem, 1.5vw, 1.5rem)` | Card titles |
| `--text-body` | `1rem` | Standard body |
| `--text-label` | `0.625rem` | Metadata labels |

---

## 6. Motion system

Motion is intentionally restrained. The studio does not use motion to entertain; it uses motion to direct attention.

- **Studio Ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — single easing curve used across the site.
- **Entrance duration:** 600ms standard, 1000ms hero, 1200ms dramatic. Translate Y 24px → 0, opacity 0 → 1.
- **Hover / micro-interactions:** 400ms.
- **Navigation:** Spring physics (stiffness 380, damping 30) — documented exception for the nav hover indicator.
- **Stagger:** 80ms per item, 80ms per word.
- **Reduced motion:** `prefers-reduced-motion: reduce` is fully supported. Motion is removed, not softened.

Shared motion variants live in `src/lib/motion.ts` (`fadeUp`, `fadeUpSlow`, `staggerContainer`, etc.).

---

## 7. Components

The studio ships a small set of shared components. There is no "second" version of any of these.

| Component | File | Purpose |
|---|---|---|
| `<Logo>` | `src/components/tangison/logo.tsx` | Dark/light variants, sm/md/lg sizes |
| `<StudioButton>` | `src/components/tangison/studio-button.tsx` | CVA variants: primary, secondary, ghost, outline |
| `<PageHeader>` | `src/components/tangison/page-header.tsx` | Reusable page header, light/dark |
| `<SiteShell>` | `src/components/tangison/site-shell.tsx` | Nav + footer wrapper |
| `<Navigation>` | `src/components/tangison/navigation.tsx` | Ultra-dynamic nav with spring-physics indicator |
| `<Footer>` | `src/components/tangison/footer.tsx` | Editorial footer with images, link columns, social |
| `<AIWidget>` | `src/components/tangison/ai-widget.tsx` | Studio assistant chat widget |
| `<JsonLd>` | `src/components/tangison/json-ld.tsx` | Structured data schemas |

---

## 8. Logo usage

- **Mark:** The Shipwreck Mast mark (drawn from Namibian Skeleton Coast iconography).
- **Wordmark:** "Tangison Studio" in Cabinet Grotesk 700, sentence case.
- **Variants:** Dark (for light backgrounds), Light (for dark backgrounds).
- **Sizes:** sm (24px), md (32px), lg (48px).
- **Clear space:** Equal to the height of the "T" in the wordmark on all sides.
- **Minimum size:** 24px mark + wordmark. Below that, mark only.

---

## 9. Imagery

Imagery is the most controlled element of the brand. Stock photography is forbidden on the marketing surfaces of the site. The image library is built from two sources:

1. **Oil-painting style WebP images.** Generated via the `z-ai image` tool with a consistent prompt suffix: `oil painting, impressionist style, visible thick brushwork, warm earth-tone palette of ochre umber cream olive and dusty rose, soft Namibian golden-hour light`. These are used for blog covers, hero paintings, and case study project paintings.
2. **Real client screenshots.** Full-page screenshots taken via `agent-browser` CLI from live client sites, then converted to WebP. These are the only images on case study pages. Nothing is staged.

The painting palette is intentionally different from the brand palette. Paintings carry earth tones (ochre, umber, cream, olive, dusty rose) for warmth; the brand palette (Skeleton Bone, Atlantic Black, Signal Teal) carries the system.

---

## 10. Brand tests

Before any new artefact ships, it must pass:

- **Pentagram Test** — Does every decision trace back to a strategic principle?
- **Wolff Olins Test** — Does this brand behave differently, or just look different?
- **Landor Test** — What does the audience *feel* when they encounter this brand?
- **COLLINS Test** — Does this design make something *possible* that wasn't possible before?
- **Siegel+Gale Test** — Have we removed everything that doesn't add meaning?

If a decision fails one of these tests, the decision is reconsidered, not the test.

---

## 11. Forbidden

The following are forbidden on the Tangison Studio marketing surfaces:

- Stock photography of models, handshakes, globes, lighthouses, or other generic corporate imagery.
- Superlatives: "world-class", "best", "leading", "award-winning", "cutting-edge", "innovative".
- Passive voice in body copy.
- Testimonials that cannot be sourced to a real, contactable client.
- Fabricated metrics. ("300% increase in conversions" without a verifiable source.)
- Gradient backgrounds on text. (Signal Teal is solid, not gradient.)
- Drop shadows on cards. (Borders carry the separation; shadows are forbidden.)
- Carousel sliders for content. (Replaced by static grids and case-study pagination.)
- Pop-ups, exit intents, or any interruptive overlay.
- Auto-playing video or audio.

---

## 12. Change control

The brand system is versioned. The current version is v1.0, ratified when the site shipped. Changes to the brand system:

1. Are proposed in writing, with the specific token / rule / component named.
2. Are tested against the five Brand Tests.
3. Are applied to the `/brand` page in code (`src/app/brand/page.tsx`) — the rendered page IS the document.
4. Are reflected in `globals.css` design tokens.
5. Are committed with a clear commit message referencing the version bump.
6. Are noted in `CHANGELOG.md`.

---

<!-- Tangison Studio — tangison.com -->
