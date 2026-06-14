# Tangison Studio Website — Architecture

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

## Overview

The Tangison Studio website is a statically-generated marketing site with a client-side AI assistant widget. It serves as the primary digital presence for Tangison Studio, a creative digital agency based in Windhoek, Namibia.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | SSG, image optimization, API routes |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS 4 | Utility-first, design token integration |
| Animation | Framer Motion + GSAP | Spring-physics nav, staggered entrances |
| AI Widget | z-ai-web-dev-sdk | Studio assistant chat |
| Deployment | Vercel Hobby | Free tier, automatic deploys from GitHub |
| Package Manager | npm | Vercel compatibility |

## Directory Structure

```
src/
├── app/                           ← Next.js App Router pages
│   ├── layout.tsx                 ← Root layout (fonts, metadata, nav+footer)
│   ├── page.tsx                   ← Homepage (server component wrapper)
│   ├── page-client.tsx            ← Homepage client component (hero, work, services, process, principles, CTA)
│   ├── loading.tsx                ← Global loading state (gradient, signal pulse)
│   ├── globals.css                ← Tailwind + brand tokens + keyframes
│   ├── about/page-client.tsx      ← About page
│   ├── blog/page-client.tsx       ← Blog (coming soon)
│   ├── brand/page-client.tsx      ← Brand System v1.0 documentation
│   ├── careers/page-client.tsx    ← Careers (coming soon)
│   ├── contact/page-client.tsx    ← Contact form
│   ├── faq/page-client.tsx        ← FAQ
│   ├── legal/                     ← Privacy, Terms, Cookies
│   ├── process/page-client.tsx    ← 5-phase process page
│   ├── resources/page-client.tsx  ← Resources (coming soon)
│   ├── services/                  ← 7 service pages + index
│   ├── studio/page-client.tsx     ← Studio info
│   ├── work/page-client.tsx       ← Portfolio (coming soon)
│   └── api/                       ← 4 API routes (chat, contact, asr, tts)
├── components/tangison/           ← Project-specific components
│   ├── navigation.tsx             ← Ultra-dynamic nav (spring physics, sliding indicator, staggered entrance)
│   ├── footer.tsx                 ← Editorial footer with images, link columns, social
│   ├── site-shell.tsx             ← Nav + footer wrapper
│   ├── page-header.tsx            ← Reusable page header with GSAP word animation
│   ├── logo.tsx                   ← Shared Logo component (dark/light, sm/md/lg)
│   ├── studio-button.tsx          ← Shared Button component (CVA variants: primary/secondary/ghost/outline)
│   ├── ai-widget.tsx              ← Studio assistant chat widget
│   └── json-ld.tsx                ← Structured data schemas
├── lib/
│   └── motion.ts                  ← Shared Framer Motion variants (fadeUp, staggerContainer, etc.)
├── config/
│   └── social.ts                  ← Social media links (single source of truth)
└── types/                         ← TypeScript type definitions
```

## Key Architecture Decisions

1. **SSG over SSR** — All pages are statically generated at build time (29 static pages). Only API routes are dynamic.
2. **Client components isolated** — Each page uses a `page.tsx` server wrapper + `page-client.tsx` client component pattern for optimal hydration.
3. **No database** — The site is fully static. No Prisma, no Neon. Content is hardcoded in component files.
4. **No auth** — Public marketing site. No authentication needed.
5. **AI Widget is optional** — The studio assistant uses z-ai-web-dev-sdk via API routes. If the API is down, the site still works.
6. **Brand System as code** — The `/brand` page IS the brand system document, exportable as Markdown.
7. **Vercel Hobby limits** — 100GB bandwidth, 10s serverless timeout, 12k invocations/day, 100hr build/mo, 1GB image opt/mo.
8. **Shared components** — `<Logo>`, `<StudioButton>`, and `fadeUp` from `@/lib/motion` eliminate duplication across pages.

## Brand Philosophy

The Tangison Studio brand system is built on principles distilled from the world's leading brand agencies:

### Pentagram — "Strategy Without Execution is Toothless"
A brand is not a logo. It is a narrative made visible. Consistency is embedded, not enforced — the system is built so well that people *want* to follow it. Typography is architecture, not decoration. Color carries meaning, not just aesthetics.

### Wolff Olins — "What You Do Is More Important Than What You Say"
Brand is behavior, not communication. The Tangison Studio brand is *lived* through every interaction — from the first pixel to the final deployment. Color tells a story through movement (Signal Teal as signal, not decoration).

### Landor — "Products Are Made in Factories. Brands Are Created in the Mind"
Identity is built from real audience insights. Every design element carries meaning beyond aesthetics. The "Shipwreck Mast" mark, "Analogue Namibia" photography, and Signal Teal accent are all rooted in Namibian identity and the studio's actual context.

### COLLINS — "Design Is Not What We Make. Design Is What We Make Possible"
The brand exists to create possibility for clients. Typography has a "clean, muscular voice." The system is built to be maintained by in-house teams — scalability baked in from day one. One idea at its heart (Signal), expressed in 100 different ways.

### Siegel+Gale — "Simplicity Is the Ultimate Sophistication"
Every element that doesn't add meaning has been removed. One accent color. Three fonts. A single easing curve. The simplest solution that works is the best solution.

### The Brand Tests
Before finalizing any design decision, we apply:
- **The Pentagram Test:** Does every decision trace back to a strategic principle?
- **The Wolff Olins Test:** Does this brand behave differently, or just look different?
- **The Landor Test:** What does the audience *feel* when they encounter this brand?
- **The COLLINS Test:** Does this design make something *possible* that wasn't possible before?
- **The Siegel+Gale Test:** Have we removed everything that doesn't add meaning?

## Brand System v1.0 — Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Skeleton Bone | #F6F4EF | Page base, light backgrounds |
| Signal White | #FFFFFF | Cards, panels |
| Atlantic Black | #111315 | Primary text, dark sections |
| Terminal Black | #0A0B0C | Deepest dark, footer |
| Signal Teal | #2CB5B4 | CTAs, links, STUDIO descriptor |
| Signal Teal Light | #3CC8C7 | Hover state for Signal Teal |
| Signal Teal Muted | rgba(44,181,180,0.15) | Subtle teal background |
| Ocean Mist | #E6F2F1 | Hover states, subtle tint |
| Fog Gray | #D9D7D2 | Secondary text, dividers |
| Ink Muted | #6B6860 | Body text |

### Border Opacity Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Border Subtle | rgba(17,19,21, 0.04) | Lightest dividers |
| Border Light | rgba(17,19,21, 0.06) | Card borders |
| Border Default | rgba(17,19,21, 0.09) | Standard borders |
| Border Medium | rgba(17,19,21, 0.12) | Hover borders |
| Border Strong | rgba(17,19,21, 0.15) | Emphasis |
| Border Dark Subtle | rgba(255,255,255, 0.04) | Dark section lightest |
| Border Dark Light | rgba(255,255,255, 0.06) | Dark section light |
| Border Dark Medium | rgba(255,255,255, 0.08) | Dark section medium |

## Font Stack

| Font | Weights | Usage |
|------|---------|-------|
| Cabinet Grotesk | 400–900 | Headlines (800–900), sub-headings (400–700), wordmark |
| Satoshi | 300–900 | Body text (300–400), emphasis (500–700), rare bold (900) |
| JetBrains Mono | 400 | Metadata, labels, nav items |

## Type Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-display` | `clamp(2.5rem, 6vw, 6rem)` | Hero / key moments |
| `--text-h1` | `clamp(2.2rem, 5vw, 4.5rem)` | Page titles |
| `--text-h2` | `clamp(1.75rem, 3.5vw, 3rem)` | Section titles |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.875rem)` | Sub-sections |
| `--text-h4` | `clamp(1.1rem, 1.5vw, 1.5rem)` | Card titles |
| `--text-body` | `1rem` | Standard body |
| `--text-label` | `0.625rem` | Metadata labels |

## Motion System

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — "Studio Ease"
- **Entrance:** 600ms (standard), 1000ms (hero), 1200ms (dramatic) — opacity 0→1 + translateY 24px→0
- **Hover/micro:** 400ms
- **Navigation:** Spring physics (stiffness:380, damping:30) — documented exception for nav hover indicator
- **Stagger:** 80ms per item, 80ms per word
- **prefers-reduced-motion:** Fully supported
- **Shared utilities:** `src/lib/motion.ts` (fadeUp, fadeUpSlow, staggerContainer, etc.)

## Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| `<Logo>` | `src/components/tangison/logo.tsx` | Dark/light variants, sm/md/lg sizes |
| `<StudioButton>` | `src/components/tangison/studio-button.tsx` | CVA variants: primary, secondary, ghost, outline |
| `<PageHeader>` | `src/components/tangison/page-header.tsx` | Reusable page header, light/dark |
| `<SiteShell>` | `src/components/tangison/site-shell.tsx` | Nav + footer wrapper |
| `fadeUp` | `src/lib/motion.ts` | Primary entrance animation |

## Deployment

- **Platform:** Vercel Hobby (free)
- **Region:** iad1 (US East — closest to Namibia with free tier)
- **Domain:** tangison-studio.vercel.app → studio.tangison.com (custom domain)
- **Auto-deploy:** GitHub push to main triggers build
- **Build:** `npm run build`
- **Output:** `.next` (Vercel native, NOT standalone)

<!-- Tangison Studio — tangison.com -->
