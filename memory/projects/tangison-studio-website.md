# Project: Tangison Studio Website

**Domain:** studio.tangison.com  
**Repo:** tangison/tangison-studio  
**Type:** Marketing website (SSG)  
**Status:** Live — tangison-studio.vercel.app

## Architecture Decisions

1. **No database** — All content is hardcoded. Static site = zero cold starts, zero DB costs.
2. **SSG-only** — 29 static pages, 4 dynamic API routes (chat, contact, asr, tts).
3. **Client component pattern** — Server wrapper + client component for each page.
4. **Brand System as page** — `/brand` is the living brand system document, exportable as Markdown.
5. **AI Widget optional** — Studio assistant via z-ai-web-dev-sdk. Site works without it.
6. **Vercel Hobby** — Free tier. All optimization targets set for hobby limits.

## Known Issues

- Social media URLs in `src/config/social.ts` are placeholders
- Blog page is "coming soon" placeholder
- Work/case studies page is "coming soon" placeholder
- Resources page is "coming soon" placeholder
- Careers page is "coming soon" placeholder
- No service worker / PWA support yet
- No i18n structure yet

## Roadmap State

See ROADMAP.md for current phase tracking.

## Build & Deploy

```bash
npm run build     # 29 static + 4 dynamic routes
npm run start     # Local production server
```

Deploy: push to `main` → Vercel auto-build

## Brand System

Version 1.0 — documented at `/brand`
Key change: Gradients allowed for UI overlays, forbidden in illustrations only.

<!-- Tangison Studio — tangison.com -->
