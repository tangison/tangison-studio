# BUILD_PLAN.md — Tangison Studio Website

**Repo:** `github.com/tangison/tangison-studio`
**Live:** `tangison-studio.vercel.app` (auto-deploys from `main`)
**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · Framer Motion 12 · Vercel Hobby
**Local port:** `http://localhost:3000`

---

## 1. Prerequisites

- Node.js 20+ (Vercel runs Node 20 by default; Next.js 16 requires it)
- npm 10+ (no Yarn, no pnpm — Vercel compatibility)
- Git 2.30+
- A GitHub account with push access to `tangison/tangison-studio`
- A Vercel account with the project linked (auto-deploy is already configured)

Verify Node and npm:

```bash
node --version   # v20.x or higher
npm --version    # 10.x or higher
```

---

## 2. First-time setup

### Clone the repo

```bash
git clone https://github.com/tangison/tangison-studio.git studio
cd studio
```

### Install dependencies

```bash
npm install
```

This installs:

- `next` 16.2.10 (App Router, SSG, image optimization, API routes)
- `react` / `react-dom` 19
- `tailwindcss` 4 (with `@tailwindcss/postcss`)
- `framer-motion` 12
- `lucide-react` (icon set)
- `class-variance-authority` (CVA for button variants)
- `z-ai-web-dev-sdk` (AI widget backend)
- `@astryxdesign/core` + `@astryxdesign/theme-neutral` (design system core)
- `eslint` 9, `eslint-config-next`, `typescript` 5 (devDeps)
- `vitest` 4 + `@playwright/test` (devDeps)

### Verify the install

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint . --max-warnings=0
```

Both should exit 0. If `lint` reports 2 errors in `src/components/tangison/ai-widget.tsx` (lines 732, 735), these are pre-existing and documented in `PROOF.md`. They are not blockers.

---

## 3. Local development

```bash
npm run dev
```

Starts `next dev -p 3000`. Open `http://localhost:3000`.

- Hot reload is on by default.
- The AI widget at `/api/chat` requires `z-ai-web-dev-sdk` to be reachable. If the SDK is not configured, the widget will show an error but the rest of the site will work.
- The contact form at `/api/contact` will write to the in-memory store on local and to Vercel KV on production. Local development does not require a KV binding.

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required for production:

- `ZAI_API_KEY` — z.ai API key for the studio assistant widget
- `CONTACT_TO_EMAIL` — address that contact-form submissions are forwarded to
- `CONTACT_FROM_EMAIL` — address that contact-form submissions are sent from

Optional:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (used in `sitemap.ts` and `robots.ts`)

---

## 4. Project structure

```
studio/
├── public/                     ← static assets served as-is
│   ├── brand/                  ← logo, favicon, app icons
│   ├── documents/              ← 26 PDF playbooks
│   ├── fonts/                  ← Cabinet Grotesk, Satoshi, JetBrains Mono (self-hosted)
│   └── images/
│       ├── paintings/          ← oil-painting WebPs (blog covers, hero, project covers)
│       │   ├── blog/           ← 19 blog cover paintings
│       │   └── projects/       ← 13 case study project paintings
│       ├── work/               ← case study assets
│       │   ├── hero/           ← hero images
│       │   ├── screenshots/    ← gallery + full-page screenshots
│       │   └── {slug}-logo.webp
│       ├── gallery/             ← homepage and section gallery images
│       ├── services/            ← service page images
│       ├── intelligence/        ← intelligence capability images
│       └── partnership/         ← partnership tier images
├── src/
│   ├── app/                    ← Next.js App Router
│   │   ├── layout.tsx          ← root layout (fonts, metadata, SiteShell)
│   │   ├── page.tsx            ← homepage (server wrapper)
│   │   ├── globals.css         ← Tailwind + brand tokens + keyframes
│   │   ├── work/               ← /work + /work/[slug]
│   │   ├── blog/               ← /blog + /blog/[slug]
│   │   ├── services/           ← /services + sub-pages
│   │   ├── about/ studio/ brand/ process/ partnership/ contact/ faq/ careers/ resources/
│   │   ├── legal/              ← privacy, terms, cookies
│   │   ├── api/                ← chat, contact, asr, tts, version
│   │   ├── sitemap.ts          ← generated at build time
│   │   ├── robots.ts
│   │   └── not-found.tsx       ← 404 page
│   ├── components/
│   │   ├── tangison/           ← project-specific (navigation, footer, ai-widget, etc.)
│   │   ├── studio/             ← design-system primitives (button, contact-form, etc.)
│   │   └── studio-ui/          ← UI primitives (button, field, search)
│   ├── lib/                    ← case-studies.ts, blog.ts, motion.ts, capabilities.ts
│   ├── config/                 ← social.ts
│   └── types/
├── scripts/                    ← asset generation scripts (WebP conversion, painting generation)
├── tests/                      ← vitest suite
├── docs/                       ← tangison system prompt, hallmark audit
├── audit/                      ← astryx component list, completion ledger, route manifest
├── agent-ctx/                  ← per-task context files for sub-agents
├── memory/                     ← project memory (global.md, per-project notes)
├── standards/                  ← accessibility, security, code-quality, design, sadc, evidence-based-coding
├── specs/                      ← spec templates
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── vitest.config.ts
├── vercel.json                 ← Vercel build + headers config
├── Caddyfile                   ← local HTTPS reverse proxy config (optional)
└── README.md
```

---

## 5. Development workflow

### Branching

- `main` — production. Always deployable. Auto-deploys to Vercel on push.
- `redesign/*` — major redesign branches.
- `fix/*` — small targeted fixes.
- `agent/*` — autonomous agent runs.

### Quality gate before merge to `main`

Run all five checks. Each must pass.

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint . --max-warnings=0
npm run build        # next build (generates static pages)
npm run test         # vitest run
npm run audit        # npm audit --audit-level=high
```

Or run them together:

```bash
npm run agent:audit
```

If any check fails, fix it before pushing. Pre-existing failures (documented in `PROOF.md`) do not block, but new failures introduced by your change do.

### Adding a case study

1. Add the entry to `src/lib/case-studies.ts`. Update the previous entry's `nextSlug` to point to the new slug, and set the new entry's `nextSlug` to close the loop.
2. Drop the project painting at `public/images/paintings/projects/{slug}.webp`.
3. Drop the full-page screenshot at `public/images/work/screenshots/full/{slug}-full.webp`.
4. Optionally drop logo, hero, and 4 gallery images at the standard paths.
5. Add the slug to the `projectPaintings` map in `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx`.
6. Rebuild and verify the new `/work/{slug}` page renders.

### Adding a blog post

1. Add the entry to `src/lib/blog.ts` with all required fields.
2. Drop the cover painting at `public/images/paintings/blog/blog-{N}.webp` where `{N}` is the next unused number.
3. Reference it via the `cover` field in `blog.ts`.
4. Rebuild and verify the new `/blog/{slug}` page renders.

---

## 6. Build

```bash
npm run build
```

Runs `next build`. Output goes to `.next/`. The build:

- Generates static pages for all routes (57 pages as of August 2026).
- Pre-renders `/work/[slug]` for all 13 case studies.
- Pre-renders `/blog/[slug]` for all 19 articles.
- Compiles `/sitemap.xml` and `/robots.txt`.
- Bundles the AI widget's client JS.

Build time is approximately 25 seconds on Vercel Hobby.

### Build output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    4.2 kB         142 kB
├ ○ /about                               3.1 kB         138 kB
├ ○ /blog                                3.8 kB         141 kB
├ ○ /blog/[slug]                         2.4 kB         137 kB
├ ○ /brand                               5.1 kB         144 kB
├ ○ /contact                             3.7 kB         140 kB
├ ○ /work                                4.0 kB         142 kB
├ ○ /work/[slug]                         2.9 kB         138 kB
└ ... (+49 more routes)
First Load JS shared by all              134 kB
○  (Static)  prerendered as static content
```

---

## 7. Deployment

### Vercel auto-deploy

Pushes to `main` on `github.com/tangison/tangison-studio` trigger an automatic deploy to `tangison-studio.vercel.app`. There is no manual deploy step.

The deploy:

1. Picks up the push via the GitHub integration.
2. Runs `npm install` (using `package-lock.json`).
3. Runs `npm run build` (per `vercel.json` `buildCommand`).
4. Outputs to `.next/` (per `vercel.json` `outputDirectory`).
5. Deploys to the `iad1` region.
6. Applies the security and caching headers in `vercel.json`.
7. Invalidates the CDN cache for the changed routes.

Deploy time is approximately 90 seconds end-to-end. Vercel keeps the previous deploy live until the new one passes the build, so there is zero downtime.

### Custom domain

The Vercel project is configured to serve from `tangison-studio.vercel.app`. To map a custom domain (e.g. `studio.tangison.com`):

1. In the Vercel dashboard → Project → Settings → Domains.
2. Add `studio.tangison.com`.
3. Add the displayed `CNAME` or `A` record at the DNS provider.
4. Wait for the DNS to propagate (usually under 10 minutes for a subdomain).
5. Vercel issues the SSL certificate automatically once the DNS resolves.

### Vercel Hobby limits

The project runs on Vercel Hobby (free). Limits to be aware of:

- 100 GB bandwidth per month
- 10 second serverless function timeout
- 12,000 serverless invocations per day
- 100 hours of build time per month
- 1 GB image optimization per month

The site is designed to stay well within these limits. All pages are static; only the four API routes are serverless, and each is designed to complete well under 10 seconds.

---

## 8. Verification checklist after deploy

After every deploy to production, verify:

- [ ] Homepage loads at `https://tangison-studio.vercel.app/`
- [ ] `/work` shows all 13 case studies
- [ ] `/work/dieselman` and `/work/enchanted` render with no broken images
- [ ] `/blog` shows all 19 articles
- [ ] The 7 newest blog posts (slugs starting `why-namibian-businesses-need...` through `namibia-on-the-screen-...`) render with their cover images
- [ ] `/brand` renders the Brand System v1.0 document
- [ ] `/contact` form posts successfully
- [ ] AI widget opens and responds (if `ZAI_API_KEY` is set)
- [ ] Lighthouse score is 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] axe-core reports zero critical violations
- [ ] No console errors in browser DevTools

---

## 9. Rollback

If a deploy introduces a regression:

1. In the Vercel dashboard → Project → Deployments.
2. Find the most recent green deploy before the regression.
3. Click the `...` menu → `Promote to Production`.
4. The previous deploy is now live. The regression deploy remains in the history for inspection.
5. Fix the regression on a branch, re-merge to `main`, and let the auto-deploy replace the rolled-back version.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `npm install` fails with peer-dep errors | Node version mismatch | Verify Node 20+. Use `nvm use 20`. |
| `npm run build` fails with "Module not found" | Stale `node_modules` | `rm -rf node_modules package-lock.json && npm install` |
| Lighthouse Performance < 90 | Image not optimized | Verify images are `.webp`, not `.png`/`.jpg` for hero and project paintings |
| AI widget shows "Assistant unavailable" | `ZAI_API_KEY` missing on Vercel | Add the env var in Vercel → Project → Settings → Environment Variables |
| 404 on `/work/{new-slug}` | Slug not added to `projectPaintings` map | Edit `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx` |
| `npm run test` fails on Capabilities | Pre-existing test drift | Documented in PROOF.md. Not a blocker. |

---

## 11. Security

- The site has no authentication and no user-uploaded content.
- The contact form rate-limits by IP via Vercel's edge middleware (5 submissions per IP per hour).
- The AI widget uses the `z-ai-web-dev-sdk` server-side. The API key is never exposed to the client.
- All third-party dependencies are pinned in `package-lock.json`. `npm audit --audit-level=high` must pass before each deploy.
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, X-DNS-Prefetch-Control) are set in `vercel.json`.
- HTTPS is enforced by Vercel at the edge. There is no HTTP endpoint.

---

## 12. When to bump the version

The site version lives in `package.json` (`"version": "1.0.0"`). Bump it when:

- A new case study or blog post is added (patch bump: `1.0.0` → `1.0.1`)
- A new page or service is added (minor bump: `1.0.1` → `1.1.0`)
- The brand system changes (major bump: `1.1.0` → `2.0.0`)

Note the bump in `CHANGELOG.md` with the date, the change, and the commit hash.

---

<!-- Tangison Studio — tangison.com -->
