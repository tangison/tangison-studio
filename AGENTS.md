# AGENTS.md

This file orients coding agents (and humans wearing that hat) to the Tangison Studio website repository. It is the entry point for any agent that needs to understand the codebase shape, the conventions, and the constraints before making changes.

## Repository

- **Location:** `/home/z/my-project/studio/` (locally), `github.com/tangison/tangison-studio` (origin)
- **Stack:** Next.js 16, React 19, TypeScript 5.x, Tailwind CSS 4
- **Runtime:** Node.js 20+, deployed to Vercel as serverless functions
- **Production URL:** https://studio.tangison.com
- **Custom domain** mapped via Vercel project settings.

## Stack rationale

- **Next.js App Router** (not Pages Router). All routes live under `src/app/`.
- **TypeScript strict mode**. No `any`, no `// @ts-ignore`. Typecheck with `npm run typecheck`.
- **Tailwind CSS** with custom design tokens defined in `src/app/globals.css`. See `standards/design.md` for the rules.
- **Self-hosted fonts** via `next/font/local`. Never import Google Fonts or other CDNs. Cabinet Grotesk (display), Satoshi (body), JetBrains Mono (mono).
- **No UI library** (no MUI, no Chakra). Components are hand-built on Tailwind primitives.
- **Framer Motion** for animation. The single easing curve is `cubic-bezier(0.16, 1, 0.3, 1)` defined in `src/lib/motion.ts`. Do not introduce other easing curves.
- **Lucide React** for icons (consistent 2px stroke weight, rounded caps).

## Architecture

```
src/
  app/                  # App Router routes (one folder per route)
    layout.tsx          # Root layout: fonts, OrganizationJsonLd, body
    page.tsx            # Homepage
    [route]/page.tsx    # Per-route pages
    [route]/[slug]/     # Dynamic routes (work/[slug], blog/[slug])
    api/                # API routes (serverless)
    robots.ts           # /robots.txt
    sitemap.ts          # /sitemap.xml
  components/
    tangison/           # Brand-level components (Logo, Navigation, Footer, JsonLd)
    studio/             # Project-level components (StudioButton, ScrollReveal, etc.)
  config/               # Site config (social.ts, etc.)
  lib/                  # Pure logic (case-studies.ts, blog.ts, capabilities.ts, motion.ts)
public/
  brand/                # Logo variants, favicon, og-image
  fonts/                # Self-hosted font files (Cabinet Grotesk, Satoshi, JetBrains Mono)
  images/               # All imagery
    paintings/          # Oil paintings used as visual system across pages
    work/               # Case study screenshots + painting covers
docs/                   # Product and brand documentation
standards/design.md     # Design system rules (read this before touching UI)
```

## Key data files

- `src/lib/case-studies.ts` — 14 case studies, navigation loop closed via `nextSlug`.
- `src/lib/blog.ts` — 19 blog posts, full content embedded.
- `src/lib/capabilities.ts` — Studio/Intelligence capability definitions + programs.
- `src/config/social.ts` — Social links + Google Business Profile (verified 2026-07-13).

## Conventions

### Forbidden

- **Em dashes (`—`)** are forbidden in all source code and prose. Use parentheses, periods, or semicolons instead.
- **Placeholder abbreviations** (`// ...`, `// similar to above`, TODO, FIXME) are forbidden. Either write the real content or omit the section.
- **Inline `<Image>` calls** for the logo. Use `<StudioLogo>` from `src/components/studio/studio-logo.tsx`.
- **Inline button classes**. Use `<StudioButton>` from `src/components/studio/button.tsx`.
- **Hardcoded hex colors**. Use CSS variables defined in `globals.css`.
- **PowerShell**. The dev environment is bash; commands in docs must use bash syntax.
- **External font CDNs**. Self-host everything via `next/font/local`.

### Required

- **TypeScript strict**. `npm run typecheck` must pass before commit.
- **Build must pass** before commit. `npm run build`.
- **WebP** for all raster imagery. Provide `width` + `height` to every `<Image>` (or use `fill` with a sized parent).
- **Descriptive `alt` text** for content images. Empty `alt=""` is acceptable for decorative images, but a meaningful alt is preferred when the image conveys information.
- **Canonical URLs**. Every page must set `alternates: { canonical: "/path" }` in metadata.
- **JSON-LD**. Use the helpers in `src/components/tangison/json-ld.tsx` (Organization, LocalBusiness, Article, FAQ, Breadcrumb, WebPage, Service).
- **Splash-painting style** for any new oil painting. Reference existing paintings in `public/images/paintings/` for the visual language.

## Audit workflow

This site is audited with [squirrelscan](https://squirrelscan.com). The CLI is installed at `/home/z/.local/bin/squirrel`.

```bash
# Run a fresh audit
squirrel audit https://studio.tangison.com --format llm --refresh

# Re-render an existing audit
squirrel report <audit-id> --format llm

# Diff against a baseline
squirrel report --diff <baseline-audit-id> --format llm
```

**Score targets:** 95+ (Grade A) with `--coverage full`. The site currently sits in the 70-80 range; ongoing work targets the remaining performance and agent-experience issues (TTFB, total byte weight, ax/markdown-response, ax/token-weight).

## Verification checklist before push

1. `npm run typecheck` — passes
2. `npm run build` — passes, generates 58+ static pages
3. `git status` — clean (no orphaned files, no debug code)
4. Commit message follows conventional format with concrete details
5. Push to `origin/main` triggers Vercel auto-deploy
6. Verify production deploy by checking `https://studio.tangison.com` returns 200 with fresh etag

## Contact

- Production: studio.tangison.com
- Email: studio@tangison.com
- Location: Windhoek, Namibia
