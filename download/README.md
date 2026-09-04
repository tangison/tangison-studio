# Deliverables

## Site rebuild — source (5 September 2026)

**`studio-tangison-source.zip`** — 5.5 MB, 141 files. The full Next.js 16
rebuild of studio.tangison.com, ready to push to GitHub and import on Vercel
(hobby-safe: fully static, ~1.5 MB hero video, 4 runtime deps, /work → /cases
308 redirects).

Highlights of the latest iteration (commit `Home cases: Collins-style tight
gallery with zoom in/out motion`):
- Home "Selected work" is now a Collins-style tight gallery: featured case
  full-width 21:9 with a zoom-settle entrance, the rest in a 2-col grid;
  images zoom IN on hover/focus (scale 1 → 1.07, 1.1 s expo-out) and ease
  back OUT on leave; captions are always visible but minimal (title +
  category · year, arrow slides in on hover).
- Tightened case copy across `src/lib/projects.ts`: new `title` /
  `category` fields, punchier one-line `short` outcomes, trimmed long
  eyebrows; the cases-page overlay shows `category · year` + short title.
- `scripts/generate_images.py` is tracked in the repo: all 31 soft-style
  Pollinations images as a manifest of single calls. Swap any image with
  `python3 scripts/generate_images.py --only <key>` (plus `--reseed` /
  `--seed key=N`); `--list` prints every key, seed and size. Each swap is
  one API call, auto-normalized to exact dimensions + webp q84 + 0.6 px
  soft finish.

## Current audit (corrected scope — 4 September 2026)

**`tangison-copy-design-audit-improvement-plan.pdf`** — 27 pages.
Copy, design-layout, and motion audit of **tangison.com** and **studio.tangison.com**
(correct domains, "i" spelling), benchmarked against **wearecollins.com**, crawled
with Scrapling. Contains: site-by-site copy findings, design layout findings (with
vision-model critique), the motion diagnosis (monotone choreography, zero
scroll-linked animation), the COLLINS gap table, and a prioritized improvement
plan (copy rewrites, design specs, motion recipes with code, perf/a11y fixes,
90-day roadmap).
Cover source: `../audit_data/cover_tangison.html`.

## Superseded (wrong domain spelling — kept for the COLLINS reference data only)

**`studio-tanguson-vs-collins-design-motion-audit.pdf`** — earlier report against
the misspelled `studio.tanguson.com` (NXDOMAIN). Its COLLINS benchmark analysis
and metrics remain valid and are reused by the current report; its subject-site
findings are void.
