# Wave 8 — studio.tangison.com: squible regeneration + SquirrelScan remediation + three new cases

Owner instruction (2026-10-30): run the squirrelscan `audit-website` skill against
studio.tangison.com, fix toward 100, regenerate EVERY artwork image on the site with
Pollination in an ultra-minimal ("squible") style, add ligertours (already shipped),
namproff.com, oryxinstitute.com and the inhouse hola.tangison.com as cases, keep the
hero film but compress it harder and slow it down, keep animation simple, and publish
an insight note saying the studio might be rebranding to times_studio soon.

## Baseline

- squirrel quick audit (25 pages): 79/100 C. 2 errors (a11y/label-content-name-mismatch
  x47 on /blog, a11y/list-structure on /), 196 warnings. Weakest cats: Images 51,
  Agent Experience 50, Performance 65, Accessibility 75.
- Repo head e1dd345 (Liger Tours case). Liger Tours = the owner's "ligertoirs.com" —
  already live in the gallery; no new work needed for it.

## Work map

1. Squible artwork regeneration (script, Pollination flux, fixed seeds):
   all 91 paintings (blog covers, project covers, heroes, root paintings) + 7 OG cards.
   Same filenames (drop-in), same aspects, webp re-encode, flat minimal art compresses
   far smaller than the current painterly texture. Client marks + work screenshots are
   NOT regenerated: marks are the clients' real brand assets, screenshots are labelled
   live captures (evidence); fabrication rule wins over the "every image" wording, and
   the owner's earlier instruction on logos was explicit (keep authentic, never fake).
2. Hero film: re-encode at 0.8x speed (setpts 1.25), VP9/H.264 tighter rate; poster
   untouched. Duration lands ~9.4s; use the real number in the new VideoObject.
3. Cases: add namproff (NAMproff Group, six companies, namproff.com), oryxinstitute
   (Oryx Institute launching-soon site, oryxinstitute.com), hola (Hola Credit, inhouse
   cash-flow underwriting, hola.tangison.com). Copy sourced from the live sites + the
   main site's Hola facts; no invented metrics. Cover art via the squible pipeline.
4. Insight: "Studio Notes" article on the possible times_studio rename — honest
   exploring language, nothing decided, what would and would not change.
5. Audit fixes (map):
   - a11y/label-content-name-mismatch: ArticleCard drops its aria-label (name from
     content; category text was outside the name).
   - a11y/list-structure: ProcessLine moves out of the <ol> into a relative wrapper.
   - identical-links-same-purpose + links/internal-links: drop the redundant
     "Preview case" chip (the artwork + title already link the case); give the
     remaining "Live site" chip a per-case accessible name.
   - broken external links: lrclearing.com 402 -> live URL removed (flagged to owner);
     labs.tangison.com 404 -> /about keeps the text, loses the dead anchor.
   - unrendered markup: excerptFrom strips markdown links/images before excerpting.
   - meta descriptions: 5 case pages + /terms rebalanced into 120-158 chars.
   - perf/lazy-above-fold: contact invitation + case-page art eager; next.config
     deviceSizes capped (no more 2560/3840 srcset candidates); global fill->width/
     height swap so every img ships width/height attrs.
   - AX token weight: SiteNav stops importing the full projects data (it serialized
     every case body into every page's RSC payload); layout passes a slim summary list.
   - ax/agents-md: public/AGENTS.md; llms.txt refreshed. ax/markdown-response:
     text/markdown route handlers + .md rewrites for articles and cases.
   - eeat/author-byline: founder Person node with stable @id in the site graph;
     article author nodes reference it.
   - schema/video + video/video-schema: VideoObject for the studio film (real
     duration, poster, both sources).
   - a11y/input-types: enterkeyhint on the five contact fields; a11y/aria-hidden-focus:
     inert on the closed mobile takeover.
   - security/form-captcha: accessible arithmetic human check (the main site's
     approved pattern) + server verification. CSP 'unsafe-inline' stays, documented:
     nonce middleware is a separate risky rollout (main-site decision mirrors this).
   - content/keyword-stuffing: chip de-duplication removes the caselive/preview
     artifacts; "one/service/site" on prose pages are natural language, documented.
6. Verify: build, standalone serve, Playwright shots (home/blog/cases/3 new cases),
   Lighthouse mobile+desktop, push (studio auto-deploys), live checks, squirrel
   surface re-audit, worklog + decision S9.
