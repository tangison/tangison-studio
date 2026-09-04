# Worklog — Tangison vs COLLINS Audit

---
Task ID: 1
Agent: main (Super Z)
Task: Audit studio.tanguson.com against wearecollins.com (the bar), focus on style + animations, using Scrapling as the instrument. Deliverable: PDF audit report.

Work Log:
- Loaded pdf + VLM + web-search skills; read full PDF skill chain (SKILL.md, fonts.md, report.md, palette.md, cover.md, charts.md, overflow.md, fill-engine.md, pagination.md, typography.md, geometry.md, cover-backgrounds.md).
- Installed scrapling 0.4.15 (+patchright/playwright, Chromium 151 works). `scrapling install` failed only on apt deps (no sudo) — browsers already cached.
- Wrote scripts/fetch_sites.py (Scrapling StealthyFetcher->DynamicFetcher fallback). Found scrapling 0.4 sync sessions call page_action WITHOUT await -> fixed callback to sync Playwright API.
- SUBJECT UNREACHABLE: studio.tanguson.com is NXDOMAIN at the .com registry (Cloudflare DoH authority = gtld-servers). Probed tanguson.com/www + 15 TLD variants + github.io/vercel/netlify/webflow/framer/glitch (all 404/410) + web searches (no trace). Conclusion: site not publicly deployed -> documented as P0 finding. [SUPERSEDED: wrong spelling — see Task 3]
- Fetched wearecollins.com (homepage + case-studies + arcane) with Scrapling: rendered HTML, full-page screenshots, perf resource entries, document.fonts, inventory.
- Wrote scripts/harvest_assets.py: 21 CSS + ~52 JS chunks + 2 fonts via Scrapling Fetcher (HTTP).
- Wrote scripts/analyze_collins.py -> metrics.json: full design/motion deconstruction.
- Wrote scripts/prep_screens.py (downscaled screenshots) and ran VLM critique (z-ai vision) on 3 pages.
- Wrote scripts/make_charts.py: 4 charts (motion affordances, transfer donut, easing curves, duration dist) in Template 07 blue family.

Stage Summary:
- COLLINS stack: Nuxt 3 (SSR + lazy-hydrated islands), Motion (motion.dev) + CSS transitions, Mux video, Howler audio, Clarity analytics. NO GSAP/lenis/three.
- COLLINS design system: Portrait Text (serif 400) + Graphik (sans 400); warm neutrals (#140700 ink, #f8f8f7 paper, #d0d0c8 line) + #ff7600 accent; letter-spacing tokenized; 279 media queries (68 any-pointer).
- COLLINS motion system: 33 motion tokens (full Penner bezier library + springs via linear() + --ease-out-expo cubic-bezier(.19,1,.22,1)); 220 transitions (mean 0.53s, max 2.5s); 44 clip-path; 150 hover; 110 focus-visible; 10 keyframes; 9 will-change; TextScrollFill scroll-linked text fill.
- COLLINS perf: 173 requests, 1.35 MB transfer, 120 lazy imgs, 83 prefetches, doc height 5942px.
- COLLINS weaknesses (fair audit): alt coverage 0/14, prefers-reduced-motion 0, sparse ARIA.
- Next: build PDF report (Template 07 Crystal Blue cover + ReportLab body with TOC).

---
Task ID: 2
Agent: main (Super Z)
Task: Build, QA and deliver the final PDF audit report (SUPERSEDED — audited the misspelled subject; report kept only for its COLLINS reference data).

Work Log:
- Cover: Template 07 Crystal Blue HTML -> poster_validate check-html PASS + cover_validate.js PASS -> html2poster.js --width 794px -> cover.pdf.
- Body: scripts/report_content.py (content model) + scripts/build_report.py (ReportLab TocDocTemplate + multiBuild, FreeSerif/DejaVuSans/NotoSerifSC fonts, install_font_fallback, Template 07 body palette, header/footer decorations, 7 chapters + appendix, 7 figures, 8 tables, 5 code patterns, roman 'i' TOC + arabic body numbering).
- Fixed 3 layout bugs: nested KeepTogether (KT.wrap returns 0xffffff sentinel -> phantom blank page / stalled flow after figures) and SimpleDocTemplate.handle_pageBegin force-switching to a bare 'Later' template (lost header/footer on pages 2+).
- Merged cover+body via pypdf with exact A4 normalization (scripts/merge_final.py); meta.brand; pages.clean (0 blanks); font.check (0 issues); toc.check (pass); pdf_qa.py --skip-cover: PASS 13/13.
- VLM print-QA spot check on cover/TOC/table/chart pages: all OK.

Stage Summary:
- Deliverables in /home/z/my-project/download/: studio-tanguson-vs-collins-design-motion-audit.pdf (19 pages) + studio-tanguson-audit-cover.html. [Superseded by Task 3 deliverable; README updated.]

---
Task ID: 3
Agent: main (Super Z)
Task: CORRECTED audit — user clarified targets are tangison.com AND studio.tangison.com (spelling with "i"); focus copy + design layout; deliver an improvement plan. Benchmark remains wearecollins.com. Instrument: Scrapling.

Work Log:
- Confirmed both domains live via DNS (Vercel). Old "site unreachable" finding was a spelling artifact.
- Wrote scripts/fetch_tangison.py (Scrapling DynamicFetcher, network_idle, scripted 12-step scroll, full-page screenshots, perf entries, doc fonts): crawled tangison.com (home + capabilities, profile, projects, contact, careers, privacy, sitemap) and studio.tangison.com (home + about + 5 case studies).
- Wrote scripts/fetch_missing_studio.py: added studio /services, /contact, /audit, /blog/one-studio-instead-of-three-vendors.
- Wrote scripts/extract_copy.py: structured copy inventory for 20 pages (headings, paragraphs, CTAs, buttons, forms, nav, footer) -> copy_inventory.json + copy_digest.txt.
- Wrote scripts/harvest_tangison.py: downloaded CSS + fonts + JS chunks per site via Scrapling Fetcher; wrote scripts/analyze_js_motion.py (framer-motion pattern counts) and scripts/analyze_copy.py (you/we ratio, jargon, hedges, proof, CTA repetition).
- Ran VLM design critiques (z-ai vision): tangison home, studio home, Weca case study, services page, 3-way hero comparison vs COLLINS.
- Made charts (make_charts_tangison.py, cascade seed-7 warm palette): motion_gap, studio_js_motion, copy_volume, duration_mix + evidence composites (hero_compare, weca_textwall, work_grid).
- Wrote report content model (report_content_tangison.py): 12 chapters + appendix; built body via build_report_tangison.py (TocDocTemplate + multiBuild, adapted from proven infra; palette.cascade seed-7; chr()-based esc() to survive code.sanitize entity mangling; nbsp-binding for em-dash/quote line-start rule).
- Cover: Template 01 HUD (light, warm palette, Archivo + JetBrains Mono echoing audited sites); passed poster_validate + cover_validate (fixed 34px->41px anchor-line gap); rendered via html2poster.js --width 794px.
- Merged via merge_tangison.py (exact A4 normalization, 0.1pt tolerance after QA flagged 595.9 vs 595.3pt cover).
- QA: meta.brand, pages.clean (0 blank), font.check (0 issues), toc.check (clean), pdf_qa.py --skip-cover PASS; VLM print-QA on 5 pages: all OK.

Stage Summary:
- Deliverable: /home/z/my-project/download/tangison-copy-design-audit-improvement-plan.pdf (27 pages, 1.35 MB) + cover_tangison.html source.
- Key findings: copy is strong but presentation-inverted (case studies 1,221-2,015 words vs image-first benchmark; 29 paragraphs >60 words); motion stack present (motion + Lenis + SplitType) but monotone (0.6s duration x28, single expo-out easing, 40 whileInView fade-rise; ZERO useScroll/useTransform/useSpring); layout rhythm uniform; CTA "Contact" x24-32; you/we 0.59 on corporate site. Both sites BEAT COLLINS on alt coverage (100% vs 0/14) and reduced-motion.
- Studio stack: Next.js + motion + Lenis + SplitType; perf quick wins: 166KB favicon, 126KB TTF mono font.
- Instrument re-runnable for the roadmap's Phase 3 delta review: fetch_tangison.py + harvest_tangison.py + analyze_js_motion.py + analyze_copy.py.

---
Task ID: 4
Agent: main (Super Z)
Task: Rebuild studio.tangison.com per user brief: rename Work→Cases as a gallery with hidden-text tiles, dark-theme case pages, fixed off-canvas mobile menu, hero replaced with user-supplied video (muted+optimized), and all imagery regenerated via Pollinations in the soft style. Prepare for Vercel hobby push with proper author.

Work Log:
- Downloaded hero video from filebin (gemini_generated_video_d5c021d5.mp4, 1280x720 h264+aac 4.5MB) → ffmpeg: stripped audio, CRF 27 veryfast, faststart → public/videos/hero.mp4 (1.5MB) + poster frame.
- Downloaded brand assets (favicon/logo-dark/logo-light webp) + 5 live-site screenshots from studio.tangison.com (reused as real proof, not regenerated).
- Downloaded all 11 site font files (Cabinet Grotesk 400-900, Satoshi 300-900, JetBrains Mono) → src/fonts + next/font/local (src/lib/fonts.ts).
- Crawled the 10 remaining case pages (/work/clusterleaf etc.) → scripts/extract_cases_extra.py → audit_data/cases_extra.json.
- scripts/build_projects_data.py → src/lib/projects.ts: all 15 projects with challenge/approach/craft/outcome parsed from crawled .md + JSON (fixed craft-point extraction bug: short-title/long-body detection inside approach zone).
- scripts/generate_images.py: 31 images via Pollinations (rate-limit hardening: 1-concurrent-per-IP queue, 25s backoff on 429; proavia needed a manual seed swap). scripts/normalize_images.py: exact target dims (1200x900 / 900x1200 / 1200x675 / 1280x720) + webp q84 + 0.6px gaussian soft finish.
- VLM QA: contact sheet → consistent soft pastel editorial aesthetic confirmed; individually re-checked 4 flagged tiles (capability-brand, clusterleaf, reviveautoworks, contact-gallery-02) — all clean (thumbnail misreads).
- Built the site (Next.js 16 App Router): design tokens from the live CSS (paper #f6f4ef / ink #0c1014 / teal #2cb5b4, --ease-primary cubic-bezier(.16,1,.3,1)); dual theme via .theme-ink.
  - src/components/site-nav.tsx: floating pill nav + REBUILT off-canvas drawer (scroll lock with iOS fixed-body guard, focus trap, Esc/backdrop close, focus return, 100dvh, 48px targets, route-change close, staggered links).
  - src/components/case-tile.tsx: gallery tile — image fills card, text hidden; overlay reveals on hover/focus (pointer) or the info button (touch, aria-pressed), tap image navigates.
  - Pages: home (video hero + scrim), /cases (dark gallery, 15 tiles), /cases/[slug] (15 dark case studies with live-proof screenshots + next-case nav), /services, /about, /contact (mailto compose + gallery strip), /audit, /blog/one-studio-instead-of-three-vendors.
  - SEO: per-page metadata (absolute titles on cases), JSON-LD Organization, sitemap.ts (22 URLs), robots.ts; next.config redirects /work→/cases + /work/:slug→/cases/:slug (308 verified).
- Trimmed project for Vercel hobby: 4 runtime deps (next/react/react-dom/lucide-react), removed prisma/api/shadcn scaffold (~900→132 packages), plain `next build`, no standalone output; bun.lock regenerated; no-op db scripts kept for sandbox runner.
- Agent-browser verification (desktop + 390x844): video hero plays (readyState 4), all 15 tiles load, drawer opens/closes correctly (transform, scroll lock, focus, Esc, backdrop, route nav), touch reveal chip pins overlay (opacity 1), tile tap → /cases/mendozer, /work redirect 308→/cases, 0 console errors, 0 page errors; lint clean; scroll-behavior warning fixed via data-scroll-behavior.
- Git: author Tangi Iigonda <studio@tangison.com>, commit 1c564f6 "Rebuild Studio site: Cases gallery, video hero, soft imagery, fixed off-canvas". No push credentials/remote in this environment — source zip prepared at download/studio-tangison-source.zip (4.4MB).

Stage Summary:
- Deliverables: full site rebuild (committed locally, zip in download/), 31 regenerated Pollinations images, optimized hero video, fixed off-canvas, Cases gallery + dark case pages.
- To ship: push the repo to the GitHub remote and import on Vercel (hobby-safe: fully static, ~1.5MB video, 4 runtime deps, legacy /work URLs permanently redirected).

---
Task ID: 5
Agent: main (Super Z)
Task: User follow-up on the rebuild — make the home-page cases section even tighter and Collins-like (gallery feel, zoom-in/zoom-out animation, very little copy), tighten case copy in src/lib/projects.ts, and keep individual Pollinations image swaps possible via scripts/generate_images.py.

Work Log:
- Found the workspace reset had dropped the image-pipeline scripts (only audit scripts survived; all 31 webp images, video, fonts and site source intact). Recreated scripts/generate_images.py from scratch: 31-entry manifest (key, dims, pinned seed, prompt reconstructed from in-code alt texts), one Pollinations call per image, --only/--reseed/--seed/--list/--dry-run flags, serial queue with 25s 429 backoff, center-crop + exact dims + 0.6px gaussian + webp q84 normalize, raw kept in scripts/.raw/, backup-restore on normalize failure. Verified: manifest lists 31/31 on disk; dry-run emits a valid flux URL.
- src/lib/projects.ts: added `title` (short display name) + `category` (tight sector) to the Project interface and all 15 entries; rewrote every `short` as a punchy one-liner (e.g. mendozer "Six businesses. One accountable platform.", feorm "Our own product — shipping without a client brief."); trimmed long eyebrows (weca, enchanted, reviveautoworks, lrclearing).
- New src/components/case-card.tsx (server component): image fills the card, caption always visible but minimal — title left, category · year + arrow right; arrow slides in on hover.
- globals.css: `.case-card-image` zoom-in on hover/focus (scale 1 → 1.07, brightness 1.03, 1.1s --ease-out-expo) and ease-back-out on leave; `.reveal-zoom` entrance (scale 1.045 → 1 over 1.3s expo) with prefers-reduced-motion neutralization added.
- reveal.tsx: new `variant="rise"|"zoom"` prop.
- Home page: Selected-work section rebuilt — header reduced to one eyebrow line + "All 15 cases" link; featured case full-width (21:9, zoom-settle entrance, col-span-2) + 4 cases in 2-col 4:3 grid; no description text, no "View case" label.
- case-tile.tsx (cases page): overlay mono line now `category · 2026`, headline now short `title` (name/short line kept for the on-demand reveal).
- Removed dead scaffold tailwind.config.ts (Tailwind 4 CSS-first site) — killed the tailwindcss-animate module-not-found build warning.
- Verified with agent-browser on prod build: 5 cards render, first 21:9 full-width; hover produces computed transform matrix(1.07) with brightness(1.03), leave returns to none; all 5 reveals fire on scroll; mobile 390x844 single column, 16:10 featured, captions fit (24px, no overflow); /cases 15 tiles with "Group platform · 2026 · Mendozer" overlay; /cases/feorm + /cases/mendozer render tightened copy, 0 broken images, 0 console/page errors; lint + build clean (all routes static).
- Git hygiene: untracked 308 accidentally-committed audit_data files via filter-branch across all history (repo .git 100MB+ → 5.4MB, files kept on disk for the re-runnable audit instrument); .gitignore: /scripts/* with !/scripts/generate_images.py tracked, package-lock.json ignored (bun.lock canonical); core.fileMode false for restore noise; committed @types/node pin. Commits (author Tangi Iigonda <studio@tangison.com>): "Home cases: Collins-style tight gallery with zoom in/out motion" + "chore: pin @types/node, ignore stray npm lockfile (bun.lock is canonical)".
- Regenerated download/studio-tangison-source.zip from HEAD: 5.5MB, 141 files (was lost in reset; old one was 112MB with audit data). Updated download/README.md.

Stage Summary:
- Home cases section is now a Collins-style tight gallery with real zoom-in/zoom-out motion and very little copy; all case copy tightened; any of the 31 images can be swapped surgically with `python3 scripts/generate_images.py --only <key>` (one Pollinations call each).
- Repo is Vercel-hobby-clean (5.4MB history, 4 runtime deps, static output); still no push credentials in this environment — ship via download/studio-tangison-source.zip.
