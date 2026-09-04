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
