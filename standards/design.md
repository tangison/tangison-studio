# Design Standards

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

> _"Before we design anything we need to understand how the brand is experienced by customers — where it lives, how it functions and what its future is."_ — Luke Powell, Pentagram Partner

---

## Philosophy

These standards are informed by the world's leading brand agencies — Pentagram, Wolff Olins, Landor, COLLINS, Lippincott, Siegel+Gale, and DesignStudio. Every rule traces back to a principle: **design serves story, and story serves people.**

### Core Principles

1. **Strategy without execution is toothless** (Pentagram) — every design decision must trace back to a strategic principle
2. **What you do is more important than what you say** (Wolff Olins) — the brand must be lived, not just displayed
3. **Products are made in factories. Brands are created in the mind** (Landor) — identity must be built from real audience insights
4. **Design is not what we make. Design is what we make possible** (COLLINS) — the brand exists to create possibility for others
5. **Simplicity is the ultimate sophistication** (Siegel+Gale) — remove everything that doesn't add meaning
6. **Good branding makes something look professional. Great branding makes people feel something. Legendary branding changes how people behave.**

---

## Typography

- **Never use** as primary font: Inter, Roboto, Arial, system-ui
- Always use a distinctive typography pairing: one display font + one body font
- Display fonts: for headings, hero text, brand moments — loaded via `next/font`
- Body fonts: for paragraphs, UI text, forms — loaded via `next/font`
- Maximum 2 font families per project (3 only if justified by multilingual requirements)
- Cabinet Grotesk: 400–900 (all weights loaded; 800–900 for headlines and wordmark, 400–700 for sub-headings)
- Satoshi: 300–900 (all weights loaded; 300–400 for body text, 500–700 for emphasis, 900 for rare bold moments)
- JetBrains Mono: 400 (metadata, labels, nav items only)

### Type Scale

Use CSS custom properties from `globals.css` for consistent sizing:

| Token | Value | Usage |
|-------|-------|-------|
| `--text-display` | `clamp(2.5rem, 6vw, 6rem)` | Hero / key moments |
| `--text-h1` | `clamp(2.2rem, 5vw, 4.5rem)` | Page titles |
| `--text-h2` | `clamp(1.75rem, 3.5vw, 3rem)` | Section titles |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.875rem)` | Sub-sections |
| `--text-h4` | `clamp(1.1rem, 1.5vw, 1.5rem)` | Card titles |
| `--text-body` | `1rem` | Standard body |
| `--text-body-lg` | `1.125rem` | Large body |
| `--text-body-sm` | `0.875rem` | Small body |
| `--text-label` | `0.625rem` | Metadata labels |
| `--text-caption` | `0.75rem` | Captions |

### Tracking (Letter-spacing)

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-display` | `-0.04em` | Headlines — tight |
| `--tracking-heading` | `-0.02em` | Section headings |
| `--tracking-body` | `0em` | Body text — default |
| `--tracking-label` | `0.15em` | Labels — open |
| `--tracking-meta` | `0.25em` | Metadata — very open |
| `--tracking-nav` | `0.3em` | Nav items — widest |

---

## Color

- **Never use**: purple gradients on white backgrounds
- Committed color palette: define all colors as CSS custom properties
- One sharp accent color per project — not a rainbow (Signal Teal is ours)
- Dark mode: token architecture is prepared (see `:root` dark overrides in `globals.css`); will ship when implemented with `next-themes`
- No hardcoded hex colors — CSS variables only (including border opacity)
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text (WCAG AA)

### Border Opacity Tokens

Replace all inline `border-black/[0.XX]` and `border-white/[0.XX]` with semantic tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border-subtle` | `rgba(17,19,21, 0.04)` | Lightest — dividers |
| `--color-border-light` | `rgba(17,19,21, 0.06)` | Light — card borders |
| `--color-border-default` | `rgba(17,19,21, 0.09)` | Default — standard borders |
| `--color-border-medium` | `rgba(17,19,21, 0.12)` | Medium — hover borders |
| `--color-border-strong` | `rgba(17,19,21, 0.15)` | Strong — emphasis |
| `--color-border-dark-subtle` | `rgba(255,255,255, 0.04)` | Dark section — lightest |
| `--color-border-dark-light` | `rgba(255,255,255, 0.06)` | Dark section — light |
| `--color-border-dark-medium` | `rgba(255,255,255, 0.08)` | Dark section — medium |

---

## Layout

- **Never use**: generic AI-aesthetic layouts (centered card, gradient hero, floating mockups)
- One intentional aesthetic direction per project — commit to it fully
- Grid: 8px base unit for spacing consistency
- Max content width: 1400px (use `--container-max` CSS variable, not hardcoded)
- Section spacing: 64px–96px between major sections
- Responsive breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

---

## Components

- Use shadcn/ui as base — customize, never use unstyled
- Component variants via `class-variance-authority` (CVA) — see `<StudioButton>` for reference
- Consistent border-radius: **6px default** (Studio design language v2.0), **8px for buttons/CTAs**, **999px for pills**
- Shadows: subtle and consistent — not decorative
- Hover/focus states: always defined, always visible
- Transitions: 300–400ms for micro, 600ms for entrances — see Motion section

---

## Imagery

- All images: WebP format with fallback
- Always lazy-loaded unless above the fold
- Always include `alt` text — descriptive for content, empty string for decorative
- Aspect ratios reserved to prevent layout shift
- Never stretch or distort images
- Icons: **Lucide React** (consistent 2px stroke weight, rounded caps)

---

## Animation

- Purposeful only — never animate for decoration
- Framer Motion for complex, CSS transitions for simple
- Respect `prefers-reduced-motion` — fully supported
- **Studio Ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — the single easing curve for all page animations
- **Durations:**
  - 400ms — hover / micro-interactions
  - 600ms — standard entrance (`fadeUp`)
  - 1000ms — hero / page-level entrances (`fadeUpSlow`)
  - 1200ms — large, dramatic reveals (`fadeUpExtended`)
- **Navigation exception:** Spring physics (stiffness:380, damping:30) for nav hover indicator — this is intentional and documented
- **Stagger:** 80ms per item in lists, 80ms per word in headings
- **Entrance pattern:** opacity 0→1 + translateY 24px→0 (`fadeUp` from `@/lib/motion`)
- No animation on critical interaction paths (buttons, links, form submissions)
- Shared animation utilities in `src/lib/motion.ts` — do not duplicate `fadeUp` variants

---

## Brand Application

- Every project starts with a brand direction document in `memory/projects/`
- Colors, fonts, spacing, and aesthetic direction locked before building
- If no client brand exists — create one and document it
- Brand consistency across every page — no orphaned styles
- The `/brand` page IS the brand system document — keep it in sync with code
- `<Logo>` component in `src/components/tangison/logo.tsx` — do not inline logo `<Image>` calls
- `<StudioButton>` component in `src/components/tangison/studio-button.tsx` — do not duplicate button classes

---

## The Brand Tests

Before finalizing any design decision, apply these tests from the world's greatest agencies:

| Test | Source | Question |
|------|--------|----------|
| **The Pentagram Test** | Pentagram | Does every design decision trace back to a strategic principle? |
| **The Wolff Olins Test** | Wolff Olins | Does this brand behave differently, or just look different? |
| **The Landor Test** | Landor | What does the audience *feel* when they encounter this brand? |
| **The COLLINS Test** | COLLINS | Does this design make something *possible* that wasn't possible before? |
| **The Siegel+Gale Test** | Siegel+Gale | Have we removed everything that doesn't add meaning? |
| **The Lippincott Test** | Lippincott | Will this still work in 20 years? |

<!-- Tangison Studio — tangison.com -->
