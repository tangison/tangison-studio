# Deliverables

## Site rebuild — source (5 September 2026, latest iteration)

**`studio-tangison-source.zip`** — 5.5 MB, 145 files. The full Next.js 16
rebuild of studio.tangison.com, ready to push to GitHub and import on Vercel
(hobby-safe: static pages + one tiny serverless contact route, ~1.5 MB hero
video, 5 runtime deps, /work → /cases 308 redirects).

**Latest iteration** (commit `Cases gallery, Collins-style mobile menu
takeover, Resend contact form`), built against the user's filebin references
(Collins mobile screenshots + gallery templates):
- `/cases` is a full gallery: featured case full-bleed 21:9 with the caption
  overlaid inside the image (category · year + big title + Explore case),
  the other 14 cases in a tight 2-col grid with under-image captions — all
  15 tiles get the same zoom-in/zoom-out motion as the home gallery.
- Mobile menu is a Collins-style full-screen dark takeover: big stacked
  links, white pill CTA, and a scrollable list of all 15 cases as rows.
- Contact form → `/api/contact` → **Resend** → studio@tangison.com.

### Before going live — Resend (2 minutes)
1. Create an API key at resend.com/api-keys.
2. Replace `re_xxxxxxxxx` **everywhere it appears**:
   - `.env` (local) — the file is gitignored, so it never leaves your machine;
   - Vercel → Project → Settings → Environment Variables → `RESEND_API_KEY`
     (plus optional `CONTACT_TO`, `CONTACT_FROM`);
   - `.mcp.json` — only if you use the Resend MCP in Claude Code.
3. With the default `CONTACT_FROM` (Resend's test sender), Resend only
   delivers to the email that owns the account — make sure that is
   studio@tangison.com, or verify tangison.com in Resend and set
   `CONTACT_FROM=Studio <briefs@tangison.com>`.

### Pushing
No push credentials exist in this sandbox. On your machine:
unzip, `git init && git add -A && git commit`, add your GitHub remote, push,
then import the repo on Vercel. (Or ask for a git bundle instead of the zip.)

## Previous iteration

Home "Selected work" tight gallery with zoom in/out motion (see git history);
swap any of the 31 Pollinations images with
`python3 scripts/generate_images.py --only <key>` (`--reseed` / `--seed key=N`,
`--list` shows every key).

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
