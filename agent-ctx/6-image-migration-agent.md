# Task 6 — Image Migration Agent

## Summary
Replaced ALL 15 `<img>` tags with Next.js `<Image>` component across 11 files in the Tangison codebase.

## Files Modified
1. `src/components/tangison/hero.tsx` — 1 image (hero shipwreck, fill + priority)
2. `src/components/tangison/bento-grid.tsx` — 3 images (large/wide/small, all fill)
3. `src/components/tangison/systems-showcase.tsx` — 1 image (world map, fill)
4. `src/components/tangison/cta.tsx` — 1 image (ocean fog, fill)
5. `src/components/tangison/philosophy.tsx` — 1 image (logo mark, explicit width/height)
6. `src/components/tangison/footer.tsx` — 1 image (logo mark, explicit width/height)
7. `src/app/loading.tsx` — 1 image (logo mark, explicit width/height)
8. `src/app/architecture/page-client.tsx` — 1 image (industrial coast, fill)
9. `src/app/intelligence/page-client.tsx` — 1 image (strategic ops UI, fill)
10. `src/app/manifesto/page-client.tsx` — 3 images (2 fill + 1 explicit width/height)
11. `src/app/brand/page-client.tsx` — 5 images (3 fill + 2 explicit width/height)

## Verification
- `bun run lint` passes clean
- Zero `<img>` tags remain in src/
- Dev server compiles and serves pages successfully
