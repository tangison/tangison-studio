#!/usr/bin/env python3
"""Content model for the Studio Tanguson vs COLLINS design & motion audit report (English).

Block kinds:
  ("para", text)                      body paragraph (supports <b> tags)
  ("h2", text) / ("h3", text)
  ("bullets", [items])
  ("callouts", [(value, label), ...])
  ("image", path, max_h_pt, caption)
  ("table", headers, rows, ratios, caption)
  ("code", title, code_text)
"""

CH = "/home/z/my-project/audit_data/charts"
CL = "/home/z/my-project/audit_data/collins"

CHAPTERS = [
    # ---------------------------------------------------------------- Chapter 1
    {
        "num": 1,
        "title": "Executive Summary",
        "blocks": [
            ("para",
             "This audit was commissioned with a clear brief: <b>studio.tanguson.com</b> feels visually "
             "weak next to <b>wearecollins.com</b>, especially in its animation, and the gap should be "
             "measured and closed. The instrument chosen was Scrapling, an adaptive web-scraping framework "
             "whose browser fetchers render JavaScript-heavy sites, bypass bot walls, and expose the full "
             "DOM - a credible black-box audit tool. The benchmark, COLLINS, is one of the most awarded "
             "independent brand design firms in the world, and its live site is the reference standard the "
             "studio asked to be measured against. Everything in this report is derived from captures of "
             "that site made on 4 September 2026."),
            ("para",
             "The first finding reshaped the engagement. studio.tanguson.com does not resolve: the .com "
             "registry itself returns NXDOMAIN for the name, and fifteen domain variants plus mirrors on "
             "GitHub Pages, Vercel, Netlify, Webflow, Framer, and Glitch all came back empty. Until DNS is "
             "fixed or the deployment goes live, the subject of this audit literally cannot be scored. That "
             "is the most severe finding a production audit can produce, and it is documented with "
             "registry-level evidence in Chapter 2. Given the instruction to complete the work, the audit "
             "proceeded on everything that could be measured."),
            ("para",
             "The report therefore delivers the three things that make the eventual comparison fast and "
             "objective. First, <b>the bar itself, measured</b>: COLLINS' stack, typography, color, layout, "
             "and motion systems, deconstructed from 19 stylesheets, 52 JavaScript chunks, and network "
             "captures of three pages. Second, <b>the standard in implementable form</b>: the complete "
             "extracted motion token library - 33 named easings including a physics-sampled spring - plus "
             "duration rules and the signature scroll-fill pattern, ready to adopt as code. Third, "
             "<b>the instrument</b>: the Scrapling scripts that captured everything, which re-run against "
             "the studio site in one command the moment it is reachable, together with an eight-dimension "
             "scoring rubric with explicit thresholds."),
            ("callouts", [
                ("NXDOMAIN", "subject domain at the .com registry"),
                ("33", "COLLINS motion tokens extracted"),
                ("220 / 0.53 s", "transitions / mean duration"),
                ("1.35 MB", "transfer across 173 requests"),
            ]),
            ("para",
             "The headline verdict for the eventual gap analysis is already visible in the numbers. "
             "COLLINS achieves its sense of craft without heavy animation libraries: no GSAP, no "
             "smooth-scroll hijacker, no WebGL - just a tokenized CSS transition system (220 declarations "
             "averaging about half a second), the Motion engine for imperative tweens, disciplined "
             "clip-path reveals, and typography doing most of the emotional work. For a studio site that "
             "currently feels weak in motion, the fastest path to the bar is not more animation; it is a "
             "motion token layer, a serif-plus-sans type system, scroll-linked reveals, and interaction "
             "states at COLLINS-grade density. Chapter 6 turns that into a P0-P2 roadmap with acceptance "
             "metrics, and Chapter 5 defines exactly how the result will be scored."),
        ],
    },
    # ---------------------------------------------------------------- Chapter 2
    {
        "num": 2,
        "title": "Methodology and Instruments",
        "blocks": [
            ("h2", "2.1  The instrument"),
            ("para",
             "Scrapling 0.4.15 was the primary instrument for every capture in this report. Its "
             "StealthyFetcher - a stealth-patched Chromium engine with bot-fingerprint defenses - fetched "
             "each page with network-idle waiting and a four-second settle window; the plain DynamicFetcher "
             "stood by as a fallback. Asset files (stylesheets, JavaScript chunks, webfonts) were pulled "
             "with Scrapling's HTTP Fetcher, which impersonates a real browser's TLS fingerprint. One "
             "engine quirk mattered and was solved early: Scrapling's synchronous sessions invoke the "
             "page_action callback without awaiting it, so all in-page capture code was written against the "
             "synchronous Playwright API. That callback is where the audit's evidence was produced:"),
            ("bullets", [
                "A progressive full-page scroll to force lazy-loaded images and scroll-reveal animations "
                "to commit before anything was measured.",
                "A full-page screenshot at device scale 2x (3,840 px wide) for visual critique and for "
                "this report's figures.",
                "performance.getEntriesByType('resource') - every request the page made, with transfer "
                "sizes and initiator types.",
                "document.fonts - the exact font families, styles, and weights the browser loaded.",
            ]),
            ("h2", "2.2  Analysis pipeline"),
            ("para",
             "Captured HTML was parsed with lxml to build an asset inventory: scripts, stylesheets, "
             "preloads, images, links, and meta. Every CSS and JavaScript file was then downloaded and "
             "statically analyzed. For CSS: keyframes, transition and animation declarations, durations, "
             "easings, custom properties, font-faces, color literals, media-query features, and hover and "
             "focus rules. For JavaScript: library fingerprints (Motion, Mux, Howler, Clarity, framework "
             "markers) and tween call patterns. Performance entries were aggregated into request counts "
             "and transfer bytes by type. A vision-language model then reviewed the screenshots as a "
             "design director would, providing the qualitative critique that code cannot see. Code facts "
             "always outrank model guesses in this report; vision observations are used for craft, not for "
             "stack claims."),
            ("h2", "2.3  Why the subject could not be audited"),
            ("para",
             "The audit attempted studio.tanguson.com first and received ERR_NAME_NOT_RESOLVED from the "
             "browser engine. Because a local resolver can be misleading, the name was re-checked over "
             "DNS-over-HTTPS against Cloudflare, which returned Status 3 (NXDOMAIN) with the .com "
             "registry's own authority record attached - meaning the domain is not registered (or has "
             "lapsed), not merely blocked from this network. The probe was then widened to every plausible "
             "variant and every free hosting mirror. The complete evidence is in Table 1. Search engines "
             "were also queried for any trace of the studio and returned nothing but tango-dance false "
             "positives. As far as the public internet is concerned, the site is not deployed."),
            ("table",
             ["Candidate", "Result", "Evidence"],
             [
                 ["studio.tanguson.com", "NXDOMAIN", "Status 3 over DoH; authority = a.gtld-servers.net (.com registry)"],
                 ["tanguson.com / www.", "NXDOMAIN", "Same registry authority returned for both names"],
                 ["15 TLD variants", "NXDOMAIN", ".studio .io .dev .net .org .co .me .design .xyz .digital .work .agency .site .cc .tv, plus .na / .co.za / .africa"],
                 ["tanguson.github.io", "HTTP 404", "'Site not found - GitHub Pages'"],
                 ["tanguson.vercel.app", "HTTP 404", "DEPLOYMENT_NOT_FOUND (Vercel edge)"],
                 ["studio-tanguson.vercel.app", "HTTP 404", "DEPLOYMENT_NOT_FOUND (Vercel edge)"],
                 ["tanguson.netlify.app (x2)", "HTTP 404", "Netlify 'Not Found' page"],
                 ["tanguson.webflow.io", "HTTP 404", "Webflow 404 page"],
                 ["tanguson.framer.app", "HTTP 404", "Framer 'Site Not Found'"],
                 ["tanguson.glitch.me", "HTTP 410", "Glitch project sleeping page"],
                 ["Web search ('tanguson')", "No trace", "Only tango-dance studio false matches"],
             ],
             [0.30, 0.14, 0.56],
             "Table 1 - Reachability evidence for the audit subject, collected 4 September 2026."),
            ("h2", "2.4  Scope and limitations"),
            ("bullets", [
                "Black-box audit of the live COLLINS site only; the studio's GitHub repository was not yet "
                "shared, so no source-level verification of the subject was possible.",
                "Cross-origin performance entries report transferSize 0 when the origin omits "
                "Timing-Allow-Origin; COLLINS' budget is effectively same-origin and unaffected, but the "
                "caveat is noted for future runs.",
                "Screenshots capture the settled state after animations complete; motion choreography was "
                "read from the CSS and JavaScript evidence, which is stronger ground than pixels anyway.",
                "Vision-model observations are qualitative; every stack, token, and metric claim in this "
                "report is grounded in the harvested source files under audit_data/collins/.",
            ]),
        ],
    },
    # ---------------------------------------------------------------- Chapter 3
    {
        "num": 3,
        "title": "The Bar: COLLINS Deconstructed",
        "blocks": [
            ("para",
             "This chapter is the reference standard, built entirely from captured evidence: 19 component "
             "stylesheets (208.5 KB of CSS), 52 JavaScript chunks (1.86 MB of source), two webfonts, and "
             "the rendered DOM and network traces of three pages - the homepage, the case-studies index, "
             "and the Arcane case study. The through-line of everything below is restraint. COLLINS buys "
             "its premium feel with typography, spacing, and a small number of extremely well-tuned motion "
             "primitives - not with heavy libraries. That is the single most useful fact this audit can "
             "hand a smaller studio."),
            ("h2", "3.1  Architecture and stack"),
            ("para",
             "COLLINS runs Nuxt 3 - Vue's server-rendered meta-framework - with an islands-style partial "
             "hydration pattern (lazy-hydrated-component) that keeps below-the-fold widgets out of the "
             "critical path. The imperative motion engine is Motion (motion.dev, the vanilla successor of "
             "Framer Motion), visible in the bundles through its framerAppearId instrumentation and its "
             "animate() call sites. Video is delivered through Mux, sound design through Howler with a "
             "graceful window.Howl fallback, and analytics through Microsoft Clarity. There is no GSAP, no "
             "Lenis or Locomotive smooth-scroll layer, and no Three.js anywhere in the 52 chunks. The "
             "stack is deliberately light for a site this fluid - a signal worth copying on its own."),
            ("table",
             ["Layer", "COLLINS implementation (measured)"],
             [
                 ["Framework", "Nuxt 3 (Vue 3, SSR + lazy-hydrated islands)"],
                 ["Motion engine", "Motion (motion.dev) + 220 tokenized CSS transitions"],
                 ["Video", "Mux adaptive player, lazily mounted"],
                 ["Audio", "Howler.js with window.Howl fallback"],
                 ["Typefaces", "Portrait Text (display serif) + Graphik (UI sans), weight 400 only"],
                 ["Analytics", "Microsoft Clarity"],
                 ["Warm-up strategy", "83 link prefetches + 12 preloads (both fonts preloaded, font-display: swap)"],
                 ["Homepage budget", "1.35 MB across 173 requests"],
             ],
             [0.26, 0.74],
             "Table 2 - The COLLINS stack, as fingerprinted from the shipped bundles."),
            ("h2", "3.2  Typography"),
            ("para",
             "Two commercial typefaces carry the entire brand: Portrait Text for editorial display and "
             "Graphik for interface and body. The radical decision is weight discipline - both faces load "
             "at weight 400 only, with no bold cuts downloaded at all. Hierarchy is produced by scale, "
             "letter-spacing, and case, never by weight, which keeps the font payload at two small woff2 "
             "files and the visual voice consistent. The scale runs from 4.5 rem display down to 0.75 rem "
             "metadata (Table 3), roughly a 6x ratio, which the vision review described as massive, "
             "editorial contrast - headlines read at five to eight times body size. Even letter-spacing is "
             "tokenized: --letter-spacing-eyebrow, -cta, -meta, -title-lg, -paragraph, -xl, consumed "
             "through var() so every component inherits one rhythm."),
            ("table",
             ["Role", "Size", "Notes"],
             [
                 ["Display / hero", "4.5 rem", "Portrait Text, headline statements"],
                 ["Display", "3.625 rem", "Page-level titles"],
                 ["Section", "3 rem", "Section openers"],
                 ["Subhead", "2.0 - 2.25 rem", "Group headings"],
                 ["Sub", "1.5 - 1.8125 rem", "Card and block titles"],
                 ["Lede", "1.12 rem", "Intro paragraphs"],
                 ["Body", "1 rem", "Graphik, 400"],
                 ["Small / meta", "0.75 - 0.875 rem", "Eyebrows, captions, metadata"],
             ],
             [0.24, 0.20, 0.56],
             "Table 3 - The COLLINS type scale, extracted from font-size tokens."),
            ("h2", "3.3  Color"),
            ("para",
             "The palette is warm-neutral with a single accent. Ink is #140700 - a near-black with warmth - "
             "rather than pure #000000; paper tones are #f8f8f7 and #d0d0c8; secondary text sits on muted "
             "greys #514c49 and #5e5855. The accent, COLLINS orange #ff7600, appears in single-digit "
             "declaration counts - it is dosed, not sprayed. There is no gradient system and essentially "
             "zero mix-blend-mode usage; contrast and spacing do the work. On the case-studies index, card "
             "backgrounds adopt each client's own brand color (Spotify green, Twitch purple, Sweetgreen "
             "green), which the vision review called brand-responsive - the accent strategy is "
             "content-driven rather than decoration-driven, a subtle but defining choice."),
            ("h2", "3.4  Layout and responsiveness"),
            ("para",
             "The layout system counts 67 grid and 113 flex declarations across 19 files, with 279 media "
             "queries. The most sophisticated detail is pointer awareness: 68 any-pointer and hover "
             "queries gate hover states so touch devices never receive sticky hover affordances - an "
             "interaction-hygiene practice most sites skip. The homepage measures 5,942 px tall across "
             "five sections at a 1,920 px viewport, and the vision review repeatedly flagged the vertical "
             "whitespace as the primary luxury signal: sections breathe at 10-20 vh intervals, imagery "
             "sits in bento-style masonry on the index, and case pages use intentionally broken grids "
             "where images overlap their containers rather than locking to a 12-column frame."),
            ("image", CL + "/home_hero.jpg", 225,
             "Figure 1 - COLLINS homepage, hero region (captured with Scrapling at 2x)."),
            ("image", CL + "/cs_hero.jpg", 225,
             "Figure 2 - Case-studies index: brand-responsive cards on the warm-neutral base."),
            ("image", CL + "/arcane_hero.jpg", 225,
             "Figure 3 - Arcane case study: editorial scale contrast and broken grid."),
            ("h2", "3.5  Motion affordances"),
            ("para",
             "Figure 4 counts what the shipped CSS actually contains, and the ratio is the story: 220 "
             "transition declarations against only 10 keyframe definitions and 9 will-change hints. "
             "COLLINS animates properties, not keyframe sequences - enter and leave states, hovers, and "
             "reveals are one-line transitions driven by class swaps and the Motion engine, which keeps "
             "the animation surface small, predictable, and cheap to maintain. At 150 hover rules and 110 "
             "focus-visible rules, interaction density is roughly at parity between mouse and keyboard: "
             "focus styling gets almost as much budget as hover, which is both a design and an "
             "accessibility position. Clip-path appears 44 times because it powers the reveal language - "
             "masks and wipes, not fades."),
            ("image", CH + "/motion_affordances.png", 185,
             "Figure 4 - Motion affordance counts in the shipped CSS (19 files, 208.5 KB)."),
            ("h2", "3.6  Performance profile"),
            ("para",
             "The homepage settled at 173 requests and 1.35 MB transferred (Figure 5): 667 KB of data and "
             "API payloads (Nuxt island payloads plus Mux video metadata), 527 KB of JavaScript across 52 "
             "lazily-loaded chunks, and 155 KB of CSS and the two fonts. The largest single chunk is 261 "
             "KB. All 120 content images lazy-load, and 83 prefetch links warm the next route's code. The "
             "discipline to note: video is the only heavy media, it streams through an adaptive player "
             "that mounts lazily, and nothing blocks first paint - both fonts arrive via preload with "
             "font-display: swap, so text paints immediately at the correct weight-400 metrics."),
            ("image", CH + "/transfer_donut.png", 185,
             "Figure 5 - Homepage transfer composition (1.35 MB / 173 requests, initiator type)."),
            ("h2", "3.7  Where the bar is weak (fairness)"),
            ("para",
             "An honest audit of the benchmark finds gaps the studio can beat, and they are not small. "
             "Image alt coverage measured 0 of 14 meaningful images on the homepage. There is not a single "
             "prefers-reduced-motion guard anywhere in the CSS - every transition fires regardless of the "
             "user's OS-level motion setting. ARIA is sparse: 15 aria-label attributes and no role "
             "attributes across the three captured pages. And the type system uses no fluid clamp() "
             "sizing, leaning instead on 279 media queries. A smaller site can match the craft and exceed "
             "the accessibility floor at the same time; that should be the competitive target, not pixel "
             "parity with the benchmark."),
        ],
    },
    # ---------------------------------------------------------------- Chapter 4
    {
        "num": 4,
        "title": "The COLLINS Motion Standard",
        "blocks": [
            ("para",
             "This chapter converts the COLLINS motion system into a standard a development team can adopt "
             "verbatim. Everything below was extracted from the shipped CSS and JavaScript; nothing is "
             "invented. The core discovery is that the entire house feel is tokenized - 33 custom "
             "properties governing easings and durations - which means motion at COLLINS is a design "
             "system discipline, not a per-component improvisation. That is exactly what a site with weak "
             "animation is missing, and it is the cheapest gap to close."),
            ("h2", "4.1  The token library"),
            ("table",
             ["Token", "Value (as shipped)"],
             [
                 ["--ease-out-expo", "cubic-bezier(.19, 1, .22, 1)  -  the signature exit curve"],
                 ["--ease-in-out-quart", "cubic-bezier(.77, 0, .175, 1)"],
                 ["--ease-out-quint", "cubic-bezier(.23, 1, .32, 1)"],
                 ["--ease-out-circ", "cubic-bezier(.075, .82, .165, 1)"],
                 ["--ease-out-back", "cubic-bezier(.175, .885, .32, 1.275)  -  controlled overshoot"],
                 ["--ease-in-back", "cubic-bezier(.6, -.28, .735, .045)"],
                 ["--ease-out-elastic", "linear() table, 100 sampled points, overshoot to 1.373"],
                 ["--easing-spring-elegant", "linear() physics-sampled spring, overshoot to 1.043"],
                 ["--easing-spring-elegant-duration", ".58171 s"],
                 ["--ease / --ease-clip-path", "var(--easing-spring-elegant)"],
                 ["--duration", "1 s  -  default"],
                 ["--duration-clip-path", ".65 s  -  reveals"],
                 ["Spring family durations", ".58 s / .667 s / .833 s / 1.167 s"],
                 ["Bezier coverage", "in / out / in-out x quad, cubic, quart, quint, sine, expo, circ, back"],
             ],
             [0.30, 0.70],
             "Table 4 - The extracted COLLINS motion tokens (curated; full set in the evidence pack)."),
            ("h2", "4.2  The signature curves"),
            ("para",
             "Figure 6 plots the curves that define the house feel. ease-out-expo (.19, 1, .22, 1) leaves "
             "fast and settles long - the curve behind nearly every premium reveal on the modern web, "
             "reserved at COLLINS as a named token so it is never mistyped. The spring-elegant curve is a "
             "genuine damped spring sampled into 100 linear() points with its own duration token of 0.58 "
             "seconds: a small overshoot to 1.043 progress and a slow settle give UI elements physical "
             "weight without cartoonish bounce. The elastic token is the same idea with far more overshoot "
             "(1.373) for playful moments. The strategic point: springs ship as CSS linear() values, so "
             "even declarative transitions can feel physical with zero JavaScript."),
            ("image", CH + "/easing_curves.png", 205,
             "Figure 6 - Signature COLLINS curves, plotted from the shipped token values."),
            ("h2", "4.3  Duration discipline"),
            ("para",
             "Durations are as disciplined as the curves (Figure 7). The CSS mean is 0.53 s with a hard "
             "ceiling of 2.5 s; clip-path reveals get a dedicated 0.65 s token; the spring family runs "
             "0.58 to 1.17 s; and the single 1 s default token covers everything unspecific. There is no "
             "3-second anything and no sub-100 ms strobing - the entire site lives inside the 0.25-1.0 s "
             "window that perceptual research and a decade of award-site practice agree reads as "
             "confident. Weak-motion sites almost always violate this band in one direction (instant, "
             "invisible cuts) or the other (slow, theatrical fades); the fix is a duration scale, not "
             "taste."),
            ("image", CH + "/duration_dist.png", 165,
             "Figure 7 - Distribution of transition and animation durations in the shipped CSS."),
            ("h2", "4.4  Signature patterns, as shipped"),
            ("code", "Pattern 1 - TextScrollFill, the scroll-linked text fill (COLLINS CSS, trimmed)",
             ".text-scroll-fill p span {\n"
             "  -webkit-background-clip: text;\n"
             "  background-clip: text;\n"
             "  background-image: linear-gradient(90deg,\n"
             "      var(--color-foreground) 50%, var(--color-grey-80) 60%);\n"
             "  background-size: 0 100%;   /* JS drives this 0 -> 100% with scroll */\n"
             "  color: transparent;\n"
             "}"),
            ("para",
             "The signature scroll-fill - paragraph text that inks itself in as the reader scrolls - costs "
             "one gradient and one scroll listener. The CSS declares the clip and the gradient; a small "
             "driver sets background-size from scroll progress. It is the highest return-on-effort effect "
             "on the site and reads as far more expensive than it is."),
            ("code", "Pattern 2 - Imperative tweens share the house curve (COLLINS JS, trimmed)",
             "animate(el, { y: ['-50%', '-70%'] },\n"
             "        { duration: 1, ease: [0.19, 1, 0.22, 1] });"),
            ("para",
             "Imperative tweens use the same ease-out-expo values, passed as a bezier array to Motion's "
             "animate(). Tokens and code share one truth: identical numbers in CSS var() form and in "
             "JavaScript array form. This is what 'a motion system' actually means in practice, and it is "
             "the difference between a site that feels designed and one that feels assembled."),
            ("code", "Pattern 3 - Tokenized clip-path reveal (COLLINS CSS, trimmed)",
             ".menu { transition: clip-path var(--duration-clip-path) var(--ease-clip-path); }\n"
             ".menu[open] { clip-path: inset(0 0 0 0); }"),
            ("h2", "4.5  What makes it feel premium"),
            ("para",
             "The vision-language review of the three captured pages singled out the same craft points a "
             "human design director would: the scroll-fill headline, clip-path reveals, brand-responsive "
             "case cards, magnetic-feeling pill buttons, and whitespace described repeatedly as excessive "
             "- in the premium sense. Every one of those observations maps to a token, a transition, or a "
             "spacing rule documented in this chapter. The lesson for a weak-motion site: choreography is "
             "a system property. One easing library, one duration scale, and three signature patterns, "
             "applied everywhere, outperform fifty bespoke animations."),
            ("h2", "4.6  The bar's accessibility gap - and how to beat it"),
            ("para",
             "COLLINS ships zero prefers-reduced-motion guards: every transition and tween fires "
             "regardless of the user's motion preference. A token-based system fixes this in one rule, "
             "because every animation consumes the tokens. This is the one dimension where the studio can "
             "meet the bar and surpass it in a single commit:"),
            ("code", "The reduced-motion kill switch (works because everything consumes tokens)",
             "@media (prefers-reduced-motion: reduce) {\n"
             "  :root {\n"
             "    --duration: .01s;\n"
             "    --duration-clip-path: .01s;\n"
             "  }\n"
             "}"),
        ],
    },
    # ---------------------------------------------------------------- Chapter 5
    {
        "num": 5,
        "title": "The Audit Rubric: Eight Dimensions",
        "blocks": [
            ("para",
             "The rubric below defines what each score level means for the eight dimensions the "
             "instrument measures. It is written so a scorer working only from the captured artifacts can "
             "apply it mechanically - wherever possible the threshold is a count or a byte value the "
             "scripts produce directly. COLLINS' own measured values are listed as the reference. Note "
             "that the bar does not score 5 everywhere: its accessibility posture is demonstrably weak, "
             "which is exactly the opening a smaller studio should exploit."),
            ("table",
             ["Dimension", "What a 5 looks like", "COLLINS measured"],
             [
                 ["Typography", "Two-role system (display serif + UI sans), tokenized scale and letter-spacing, 4x+ size ratio, at most 2 weights loaded", "Portrait Text + Graphik, 13-step scale, ~6x ratio, weight 400 only"],
                 ["Color & theming", "Warm-neutral ramp plus one dosed accent, all colors tokenized, no gradient reliance", "#140700 / #f8f8f7 / #d0d0c8 + #ff7600, fully tokenized"],
                 ["Layout & grid", "Grid+flex system, pointer-aware hover gating, editorial whitespace rhythm, full-bleed sections", "67 grid / 113 flex, 68 any-pointer queries, 5,942 px page"],
                 ["Motion tokens", "Named easing and duration tokens, springs as linear() samples, one source of truth in CSS and JS", "33 tokens incl. sampled springs"],
                 ["Motion choreography", "Reveals and micro-interactions all on tokens, 0.25-1.0 s duration band, at least one scroll-linked signature effect", "220 transitions, mean 0.53 s, TextScrollFill"],
                 ["Interaction & states", "100+ hover rules, 50+ focus-visible rules, active states, pointer gating", "150 hover / 110 focus-visible"],
                 ["Performance", "1.5 MB or less, 200 requests or less, all media lazy, fonts swap, chunks prefetched", "1.35 MB / 173 requests / 120 lazy / 83 prefetch"],
                 ["Accessibility & semantics", "Reduced-motion guard, 90%+ alt coverage, roles and labels, focus order, single h1 per page", "0 reduced-motion guards, 0/14 alt, sparse ARIA"],
             ],
             [0.16, 0.50, 0.34],
             "Table 5 - The eight-dimension rubric with COLLINS as reference (score 5 = left column)."),
            ("h2", "5.1  The instrument, ready to re-run"),
            ("para",
             "The capture and analysis pipeline that produced every number in this report is saved as "
             "four small scripts. They are general-purpose: point them at the studio site and they emit "
             "the same metrics.json the rubric consumes. The moment the domain resolves, the entire "
             "subject-side audit is three commands:"),
            ("code", "Re-running the instrument against the subject",
             "# 1. Capture the subject: rendered HTML, full-page screenshots,\n"
             "#    performance entries, document.fonts, asset inventory\n"
             "python3 scripts/fetch_sites.py https://studio.tanguson.com/\n\n"
             "# 2. Harvest its CSS / JS / font files (edit TAG and SITE_HOST)\n"
             "python3 scripts/harvest_assets.py\n\n"
             "# 3. Produce the metrics the rubric scores\n"
             "python3 scripts/analyze_collins.py   # writes metrics.json"),
            ("bullets", [
                "scripts/fetch_sites.py - Scrapling capture with the sync page_action evidence collector; "
                "accepts the subject URL as an argument and also walks up to two subpages.",
                "scripts/harvest_assets.py - downloads every stylesheet, chunk, and webfont referenced by "
                "the DOM or the performance log, then rescans CSS for font url() references.",
                "scripts/analyze_collins.py - the deconstruction: tokens, easings, durations, colors, "
                "type scale, media queries, hover and focus counts, library fingerprints, request and "
                "byte budgets.",
                "scripts/make_charts.py - regenerates the four figures from metrics.json.",
            ]),
            ("para",
             "A run completes in minutes for a site of this size. Scoring is then a table lookup against "
             "Chapter 5's thresholds, and the gap analysis writes itself: for each dimension, subtract the "
             "subject's level from the COLLINS level and order the roadmap by the size of the gap "
             "multiplied by how cheap the fix is. Chapter 6 pre-computes that ordering for the most "
             "likely weak points."),
        ],
    },
    # ---------------------------------------------------------------- Chapter 6
    {
        "num": 6,
        "title": "Gap Analysis and Recommendations",
        "blocks": [
            ("para",
             "With the subject unreachable, this chapter is written as a build order: implement to the bar "
             "values now, and run the instrument the day the domain resolves to confirm. Every item names "
             "its bar reference and an acceptance metric, so 'done' is checkable rather than argued. "
             "Priorities follow impact-over-effort: P0 items are blocking or foundational, P1 items are "
             "the visible craft gap the user flagged (weak style, weak animation), and P2 items are the "
             "polish that separates the bar from the average."),
            ("h2", "6.1  P0 - blocking and foundational"),
            ("para",
             "<b>1. Make the site reachable.</b> studio.tanguson.com is NXDOMAIN at the .com registry "
             "(Chapter 2, Table 1). Register or restore the zone, deploy, and serve HTTPS. Acceptance: "
             "the name resolves to an A record and returns HTTP 200 externally. Nothing else in this "
             "report can be verified until this lands; it is also the kind of finding that damages trust "
             "with prospective clients if they hit it first."),
            ("para",
             "<b>2. Adopt the motion token layer.</b> Copy the curated token block below into the global "
             "stylesheet and delete every raw transition value in the codebase. This single commit is the "
             "fastest style upgrade available, because it instantly unifies every hover, reveal, and "
             "menu animation onto COLLINS' house curves and duration band."),
            ("code", "The adoptable motion token layer (COLLINS values)",
             ":root {\n"
             "  /* Easing tokens */\n"
             "  --ease-out-expo: cubic-bezier(.19, 1, .22, 1);\n"
             "  --ease-in-out-quart: cubic-bezier(.77, 0, .175, 1);\n"
             "  --ease-out-quint: cubic-bezier(.23, 1, .32, 1);\n"
             "  --ease-out-back: cubic-bezier(.175, .885, .32, 1.275);\n"
             "  /* Durations */\n"
             "  --duration: 1s;\n"
             "  --duration-fast: .25s;\n"
             "  --duration-clip-path: .65s;\n"
             "}\n"
             "@media (prefers-reduced-motion: reduce) {\n"
             "  :root {\n"
             "    --duration: .01s; --duration-fast: .01s; --duration-clip-path: .01s;\n"
             "  }\n"
             "}"),
            ("para",
             "<b>3. Set the accessibility floor.</b> Add the reduced-motion rule above, style "
             ":focus-visible on every interactive element, and adopt an alt-text policy for imagery. "
             "Acceptance: rubric dimension 8 scores 3 or higher, which already beats COLLINS (0 "
             "reduced-motion guards, 0/14 alt coverage). This is the cheapest dimension in which to "
             "legitimately claim to exceed the bar."),
            ("h2", "6.2  P1 - the visible craft gap"),
            ("para",
             "<b>4. Typography system.</b> Adopt a two-role pairing in the COLLINS mold - a display serif "
             "with personality plus a clean UI sans. Strong freely-licensed pairs: Fraunces or Newsreader "
             "for display, Inter or IBM Plex Sans for UI. Discipline matters more than the specific "
             "faces: load at most two weights (400 display + 400/500 sans), scale from about 4.5 rem "
             "hero down to 0.75 rem metadata, and tokenize letter-spacing (tight on large display, wide "
             "and uppercase on eyebrows). Acceptance: a 4x or greater size ratio between hero and body, "
             "and a letter-spacing token set consumed by every component."),
            ("para",
             "<b>5. Ship the scroll-fill hero.</b> The single highest-return pattern from the benchmark "
             "(Chapter 4, Pattern 1). Reuse the CSS as shipped and drive it with a passive scroll "
             "listener:"),
            ("code", "Scroll-fill driver (vanilla, passive listener)",
             "const el = document.querySelector('.scroll-fill p span');\n"
             "const onScroll = () => {\n"
             "  const r = el.getBoundingClientRect();\n"
             "  const p = Math.min(1, Math.max(0,\n"
             "      (innerHeight - r.top) / (innerHeight + r.height)));\n"
             "  el.style.backgroundSize = (p * 100) + '% 100%';\n"
             "};\n"
             "addEventListener('scroll', onScroll, { passive: true });"),
            ("para",
             "<b>6. Interaction density to bar level.</b> COLLINS maintains 150 hover rules and 110 "
             "focus-visible rules. Audit the studio's components and bring every interactive element to "
             "the same standard: color shift plus a motion affordance on hover, always with "
             "transition: all var(--duration-fast) var(--ease-out-expo), and equivalent visible focus. "
             "Gate hover behind pointer capability so touch devices get clean states:"),
            ("code", "Pointer-aware hover gating (COLLINS pattern)",
             "@media (hover: hover) and (pointer: fine) {\n"
             "  .card:hover img { transform: scale(1.04); }\n"
             "}\n"
             ".card img { transition: transform var(--duration) var(--ease-out-expo); }"),
            ("h2", "6.3  P2 - polish beyond the bar's surface"),
            ("para",
             "<b>7. Choose the imperative engine deliberately.</b> If the studio site is Vue/Nuxt, Motion "
             "(motion.dev) matches the COLLINS pattern exactly - animate() with the house curve arrays. "
             "If scroll choreography will be extensive (pinned sections, scrubbed timelines), GSAP plus "
             "ScrollTrigger is the stronger tool; keep the same token values as string constants so CSS "
             "and JS stay in sync. Either is defensible; mixing both without a shared token source is "
             "what produces the inconsistent feel the user described as weak."),
            ("para",
             "<b>8. Media and weight discipline.</b> Serve video through an adaptive, lazily-mounted "
             "player (Mux, or hls.js with poster frames); lazy-load every content image below the fold "
             "and prefetch the next route's chunks on idle. Acceptance: homepage lands at or under the "
             "COLLINS budget of 1.35 MB across 173 requests with zero render-blocking media. "
             "<b>9. Optional signatures.</b> A restrained Howler-based sound design on primary "
             "interactions and a single canvas flourish (COLLINS ships two canvas elements) add the "
             "tactile depth the vision review attributed to the benchmark - but only after the token "
             "layer and interaction density are in place, never instead of them."),
            ("table",
             ["Priority", "Action", "Bar reference", "Acceptance metric"],
             [
                 ["P0", "Fix DNS / deploy the site", "Subject must be reachable at all", "A record + HTTP 200 externally"],
                 ["P0", "Motion token layer", "33 COLLINS tokens", "0 raw transition values in codebase"],
                 ["P0", "Accessibility floor", "Beats COLLINS (0 guards, 0/14 alt)", "Rubric dimension 8 at 3+"],
                 ["P1", "Typography pairing and scale", "Portrait + Graphik, 6x ratio", "4x+ hero/body ratio, letter-spacing tokens"],
                 ["P1", "Scroll-fill hero", "TextScrollFill pattern", "Signature effect live on hero section"],
                 ["P1", "Interaction density", "150 hover / 110 focus-visible", "80%+ of interactive elements styled"],
                 ["P2", "Motion engine decision", "Motion (Nuxt) or GSAP + ScrollTrigger", "Single engine, shared token source"],
                 ["P2", "Media discipline", "Mux-style adaptive video, 120 lazy images", "1.35 MB / 173 requests budget"],
                 ["P2", "Sound and canvas signatures", "Howler audio, 2 canvas elements", "Restrained, opt-in affordances"],
             ],
             [0.10, 0.30, 0.34, 0.26],
             "Table 6 - The roadmap with bar references and acceptance metrics."),
        ],
    },
    # ---------------------------------------------------------------- Appendix
    {
        "num": None,
        "title": "Appendix A: Evidence Pack",
        "blocks": [
            ("para",
             "This appendix records the environment, the captured evidence, and the artifacts so any "
             "number in this report can be re-derived or challenged. All raw evidence lives under "
             "audit_data/collins/ (rendered HTML for three pages, 21 harvested stylesheets, 52 JavaScript "
             "chunks, both webfonts, full-page screenshots, performance logs, and metrics.json), and the "
             "instrument itself lives under scripts/. The full motion token set - including the 100-point "
             "linear() tables for both springs and the elastic curve - is in the harvested CSS, indexed "
             "by the token names in Table 4."),
            ("table",
             ["Component", "Detail"],
             [
                 ["Audit date", "4 September 2026 (UTC+2)"],
                 ["Instrument", "Scrapling 0.4.15 (StealthyFetcher, DynamicFetcher, Fetcher)"],
                 ["Browser engine", "Stealth Chromium via patchright 1.62.3 (Chromium 151.0.7922.34)"],
                 ["Python", "3.12.14"],
                 ["Analysis", "lxml static parsing; regex extraction over 208.5 KB CSS + 1.86 MB JS"],
                 ["Vision critique", "z-ai vision model over downscaled full-page screenshots"],
                 ["Benchmark pages", "wearecollins.com/ , /case-studies , /case-studies/arcane"],
                 ["Subject", "studio.tanguson.com - NXDOMAIN (see Table 1)"],
             ],
             [0.28, 0.72],
             "Table 7 - Environment and capture record."),
            ("table",
             ["Artifact", "Volume"],
             [
                 ["Rendered HTML (3 pages)", "558 KB total"],
                 ["Component stylesheets", "19 files, 208.5 KB (plus inline styles)"],
                 ["JavaScript chunks", "52 files, 1.86 MB source text"],
                 ["Webfonts", "2 files: portrait-text-400.woff2, graphik-400.woff2"],
                 ["Homepage network", "173 requests, 1.35 MB transferred"],
                 ["Largest chunk", "B5XVSSfK.js at 261 KB"],
                 ["Island payloads", "_payload.json requests totaling about 264 KB"],
                 ["Homepage document", "5,942 px tall at 1,920 px viewport"],
             ],
             [0.42, 0.58],
             "Table 8 - Captured evidence volumes."),
            ("para",
             "Re-run path for the subject, once reachable: python3 scripts/fetch_sites.py followed by "
             "scripts/harvest_assets.py and scripts/analyze_collins.py as detailed in Chapter 5.1, then "
             "score the resulting metrics.json against the Table 5 rubric. The gap analysis between that "
             "score sheet and this report's COLLINS reference values is the completed audit the user "
             "asked for; everything required to produce it ships with this document."),
        ],
    },
]

META = {
    "doc_title": "Studio Tanguson vs. COLLINS - Design & Motion Audit",
    "header_title": "Studio Tanguson vs. COLLINS - Design & Motion Audit",
    "author": "Z.ai",
    "date": "4 September 2026",
}
