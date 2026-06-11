# Changelog

All notable changes to the Tangison Studio website.

---

## [0.6.0] — 2026-06-10

### Added
- Evidence-Based Coding Agent Protocol baked into AGENTS.md as a core rule
- New standard: `standards/evidence-based-coding.md` — full protocol document
- Every technical claim must be backed by evidence; no claims without diffs, output, or verification
- Anti-hallucination rules, completion criteria, shadcn/ui enforcement, and large refactor phases
- Global memory updated: "Claims without evidence" added to Never Ship list

---

## [0.5.0] — 2026-06-07

### Added
- Studio OS framework integrated into the project
  - brief.md, ARCHITECTURE.md, ROADMAP.md, AGENTS.md
  - memory/ system (global.md, projects/tangison-studio-website.md)
  - standards/ (code-quality, security, design, accessibility, sadc)
  - specs/ (spec template)
  - skills/ (SKILL-MAP.md, registry.json, local/)
  - scripts/ (setup.sh, update.sh)
- Gradients restored and enhanced across the site
  - Hero overlay: gradient from-skeleton-bone/90 via /60 to /95
  - Contact teaser: deep-ocean gradient atmosphere
  - Page headers: enhanced gradient for dark variant
  - Footer: gradient from atlantic-black to terminal-black
  - Loading screen: gradient background
  - Process image break: enhanced via-skeleton-bone/40
- Brand System v1.0 updated: gradients allowed for UI overlays, forbidden in illustrations only

### Fixed
- Git identity corrected to tangison@proton.me / tangison
- Vercel deployment: removed bun.lock from tracking, added package-lock.json
- Public email consistently studio@tangison.com across all pages

### Changed
- Brand System anti-pattern: "Gradients" → "Illustration gradients only"
- Brand System markdown export: updated gradient rules
- Forbidden techniques section scoped to illustrations

---

## [0.4.0] — 2026-06-07

### Added
- Ultra-dynamic navigation with spring physics, sliding hover indicator, staggered entrance
- Proportional scroll-driven backdrop blur
- Active page indicator with shared layoutId
- Enhanced dropdowns with tagline previews

### Fixed
- Footer email changed from tangison@proton.me to studio@tangison.com
- Layout metadata author URL set to studio@tangison.com
- Editorial divider thickness: 1px → 2px
- Vercel Hobby optimization: removed bun.lock, fixed start script, limited image sizes

---

## [0.3.0] — 2026-06-06

### Added
- AI Studio Assistant widget with z-ai-web-dev-sdk
- ASR and TTS API routes
- Contact form API route
- Homepage hero redesigned two-column layout on desktop

---

## [0.2.0] — 2026-06-06

### Added
- Brand System v1.0 compliance overhaul
- 7 individual service pages
- Process, About, FAQ, Legal pages
- Blog, Work, Resources, Careers placeholders

---

## [0.1.0] — 2026-06-05

### Added
- Initial Next.js 16 project setup
- Tailwind CSS 4 with brand design tokens
- Font loading (Cabinet Grotesk, Satoshi, JetBrains Mono)
- Basic homepage with hero, services, CTA
- Navigation and footer components
- Vercel deployment configuration

<!-- Tangison Studio — tangison.com -->
