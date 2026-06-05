# Task 3 — Color Token Fix Agent

## Task
Replace ALL hardcoded hex color values with proper Tailwind design tokens across the Tangison codebase.

## Summary
Replaced 19 hardcoded hex color instances across 9 files with proper Tailwind design tokens (`bg-terminal-black`, `from-terminal-black`, `via-terminal-black`, `bg-card`).

## Files Modified
1. `src/app/architecture/page-client.tsx` — 4 replacements (bg, from, via)
2. `src/app/systems/page-client.tsx` — 2 replacements (bg)
3. `src/app/intelligence/page-client.tsx` — 3 replacements (bg)
4. `src/app/manifesto/page-client.tsx` — 2 replacements (bg)
5. `src/components/tangison/bento-grid.tsx` — 3 replacements (bg-terminal-black, bg-card)
6. `src/components/tangison/narrative.tsx` — 1 replacement (bg)
7. `src/components/tangison/systems-showcase.tsx` — 2 replacements (from, bg)
8. `src/components/tangison/footer.tsx` — 1 replacement (bg)
9. `src/app/page.tsx` — 1 replacement (bg, discovered during verification)

## Files Verified — No Changes Needed
- `src/app/contact/page-client.tsx` — already uses bg-terminal-black
- `src/app/brand/page-client.tsx` — already uses bg-terminal-black; dynamic style values correctly left unchanged
- `src/app/globals.css` — CSS variable definitions (source of truth), not modified

## Verification
- `bun run lint` passes clean with zero errors
- Comprehensive grep confirms zero remaining hardcoded hex colors in Tailwind bracket notation across src/
