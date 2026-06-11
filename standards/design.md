# Design Standards

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

## Typography

- **Never use** as primary font: Inter, Roboto, Arial, system-ui
- Always use a distinctive typography pairing: one display font + one body font
- Display fonts: for headings, hero text, brand moments — loaded via `next/font`
- Body fonts: for paragraphs, UI text, forms — loaded via `next/font`
- Font pairing must create visual hierarchy, not visual noise
- Maximum 2 font families per project (3 only if justified by multilingual requirements)

## Color

- **Never use**: purple gradients on white backgrounds
- Committed color palette: define all colors as CSS custom properties
- One sharp accent color per project — not a rainbow
- Dark mode: plan for it from the start, even if not shipped immediately
- No hardcoded hex colors — CSS variables only
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text (WCAG AA)

## Layout

- **Never use**: generic AI-aesthetic layouts (centered card, gradient hero, floating mockups)
- One intentional aesthetic direction per project — commit to it fully
- Grid: 8px base unit for spacing consistency
- Max content width: 1280px for desktop
- Section spacing: 64px–96px between major sections
- Responsive breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

## Components

- Use shadcn/ui as base — customize, never use unstyled
- Component variants via `class-variance-authority` (CVA)
- Consistent border-radius per project (pick one: 4px, 8px, or 12px — not mixed)
- Shadows: subtle and consistent — not decorative
- Hover/focus states: always defined, always visible
- Transitions: 150ms for micro, 300ms for layout — nothing slower

## Imagery

- All images: WebP format with fallback
- Always lazy-loaded unless above the fold
- Always include `alt` text — descriptive for content, empty string for decorative
- Aspect ratios reserved to prevent layout shift
- Never stretch or distort images
- Icons: Phosphor Icons (consistent weight per project)

## Animation

- Purposeful only — never animate for decoration
- Framer Motion for complex, CSS transitions for simple
- Respect `prefers-reduced-motion`
- Maximum animation duration: 500ms
- No animation on critical interaction paths (buttons, links, form submissions)

## Brand Application

- Every project starts with a brand direction document in `memory/projects/`
- Colors, fonts, spacing, and aesthetic direction locked before building
- If no client brand exists — create one and document it
- Brand consistency across every page — no orphaned styles

<!-- Tangison Studio — tangison.com -->
