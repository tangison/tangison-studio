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
│   └── ai-widget.tsx              ← Studio assistant chat widget
├── config/
│   └── social.ts                  ← Social media links (placeholder URLs)
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

## Brand System v1.0 — Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Skeleton Bone | #F6F4EF | Page base, light backgrounds |
| Signal White | #FFFFFF | Cards, panels |
| Atlantic Black | #111315 | Primary text, dark sections |
| Terminal Black | #0A0B0C | Deepest dark, footer |
| Signal Teal | #2CB5B4 | CTAs, links, STUDIO descriptor |
| Ocean Mist | #E6F2F1 | Hover states, subtle tint |
| Fog Gray | #D9D7D2 | Secondary text, dividers |
| Ink Muted | #6B6860 | Body text |

## Font Stack

| Font | Weights | Usage |
|------|---------|-------|
| Cabinet Grotesk | 800-900 | Headlines, wordmark |
| Satoshi | 300-400 | Body text, descriptions |
| JetBrains Mono | 400 | Metadata, labels, nav items |

## Motion System

- **Easing:** cubic-bezier(0.16, 1, 0.3, 1)
- **Entrance:** 0.6s-1.2s, opacity 0→1 + translateY 24px→0
- **Hover/micro:** 0.4s
- **Navigation:** Spring physics (stiffness:380, damping:30), sliding hover indicator, staggered 70ms entrance
- **prefers-reduced-motion:** Fully supported

## Deployment

- **Platform:** Vercel Hobby (free)
- **Region:** iad1 (US East — closest to Namibia with free tier)
- **Domain:** tangison-studio.vercel.app → studio.tangison.com (custom domain)
- **Auto-deploy:** GitHub push to main triggers build
- **Build:** `npm run build`
- **Output:** `.next` (Vercel native, NOT standalone)

<!-- Tangison Studio — tangison.com -->
