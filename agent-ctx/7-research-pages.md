# Task 7 — Research Pages Agent

## Task
Create TANGISON Research pages for the rebrand (/research, /research/projects, /research/open-source)

## Files Created
1. `src/app/research/page.tsx` — Server component with metadata
2. `src/app/research/page-client.tsx` — Research Hub (2 route cards + CTA)
3. `src/app/research/projects/page.tsx` — Server component with metadata
4. `src/app/research/projects/page-client.tsx` — Research Projects (3 initiative cards + CTA)
5. `src/app/research/open-source/page.tsx` — Server component with metadata
6. `src/app/research/open-source/page-client.tsx` — Open Source (5 repo cards + CTA)

## Files Modified
- `src/app/sitemap.ts` — Added 3 new research routes

## Key Decisions
- Followed existing pattern from services/products pages (light theme, warm-white bg)
- Used framer-motion staggered animations with cubic-bezier(0.16, 1, 0.3, 1)
- Decorative images use Next.js Image with fill + opacity-10
- GitHub links use external <a> tags with target="_blank"
- Internal navigation uses Next.js <Link>
- Back links on sub-pages use ArrowLeft icon

## Verification
- `bun run lint` — only pre-existing errors (carousel.tsx, use-mobile.ts)
- No new lint errors in any created files
- All design tokens use Tailwind variables from globals.css
- Zero border-radius enforced globally
