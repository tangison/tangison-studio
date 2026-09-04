# Worklog — Studio Tanguson vs COLLINS Audit

---
Task ID: 1
Agent: main (Super Z)
Task: Audit studio.tanguson.com against wearecollins.com (the bar), focus on style + animations, using Scrapling as the instrument. Deliverable: PDF audit report.

Work Log:
- Loaded pdf + VLM + web-search skills; read full PDF skill chain (SKILL.md, fonts.md, report.md, palette.md, cover.md, charts.md, overflow.md, fill-engine.md, pagination.md, typography.md, geometry.md, cover-backgrounds.md).
- Installed scrapling 0.4.15 (+patchright/playwright, Chromium 151 works). `scrapling install` failed only on apt deps (no sudo) — browsers already cached.
- Wrote scripts/fetch_sites.py (Scrapling StealthyFetcher->DynamicFetcher fallback). Found scrapling 0.4 sync sessions call page_action WITHOUT await -> fixed callback to sync Playwright API.
- SUBJECT UNREACHABLE: studio.tanguson.com is NXDOMAIN at the .com registry (Cloudflare DoH authority = gtld-servers). Probed tanguson.com/www + 15 TLD variants + github.io/vercel/netlify/webflow/framer/glitch (all 404/410) + web searches (no trace). Conclusion: site not publicly deployed -> documented as P0 finding.
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
Task: Build, QA and deliver the final PDF audit report.

Work Log:
- Cover: Template 07 Crystal Blue HTML -> poster_validate check-html PASS + cover_validate.js PASS -> html2poster.js --width 794px -> cover.pdf.
- Body: scripts/report_content.py (content model) + scripts/build_report.py (ReportLab TocDocTemplate + multiBuild, FreeSerif/DejaVuSans/NotoSerifSC fonts, install_font_fallback, Template 07 body palette, header/footer decorations, 7 chapters + appendix, 7 figures, 8 tables, 5 code patterns, roman 'i' TOC + arabic body numbering).
- Fixed 3 layout bugs: nested KeepTogether (KT.wrap returns 0xffffff sentinel -> phantom blank page / stalled flow after figures) and SimpleDocTemplate.handle_pageBegin force-switching to a bare 'Later' template (lost header/footer on pages 2+).
- Merged cover+body via pypdf with exact A4 normalization (scripts/merge_final.py); meta.brand; pages.clean (0 blanks); font.check (0 issues); toc.check (pass); pdf_qa.py --skip-cover: PASS 13/13.
- VLM print-QA spot check on cover/TOC/table/chart pages: all OK.

Stage Summary:
- Deliverables in /home/z/my-project/download/: studio-tanguson-vs-collins-design-motion-audit.pdf (19 pages) + studio-tanguson-audit-cover.html.
- Instrument is re-runnable against the subject once reachable: python3 scripts/fetch_sites.py https://studio.tanguson.com/ then harvest_assets.py + analyze_collins.py; score vs the Table 5 rubric.

