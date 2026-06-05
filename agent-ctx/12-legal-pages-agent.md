# Task 12 — Legal Pages Agent

## Task
Create TANGISON legal pages (Privacy Policy, Terms of Service, Cookie Policy) for the rebrand.

## Files Created
1. `src/app/legal/privacy/page.tsx` — Server component
2. `src/app/legal/privacy/page-client.tsx` — Client component (7 sections)
3. `src/app/legal/terms/page.tsx` — Server component
4. `src/app/legal/terms/page-client.tsx` — Client component (5 sections)
5. `src/app/legal/cookies/page.tsx` — Server component
6. `src/app/legal/cookies/page-client.tsx` — Client component (4 sections)

## Design System Applied
- bg-warm-white, text-ink, text-ink-muted, rust-signal accents
- font-cabinet for headings, font-satoshi for body, font-jetbrains for labels
- max-w-[800px] narrow legal text container
- Zero border-radius
- No SiteShell wrapper — simple clean layout
- Sticky footer with flex layout
- Back link to homepage
- Cross-linking between legal pages in footer

## Lint Status
- 0 new errors introduced
- 2 pre-existing errors in carousel.tsx and use-mobile.ts (unrelated)

## Routes
- /legal/privacy
- /legal/terms
- /legal/cookies
