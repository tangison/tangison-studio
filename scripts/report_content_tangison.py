#!/usr/bin/env python3
"""Content model for the Tangison copy + design audit and improvement plan.

Report brief block kinds:
  ("para", text)                     body paragraph (inline markup allowed)
  ("h2", text) / ("h3", text)        sub-headings
  ("bullets", [items])               bullet list
  ("callouts", [(value, label)])     stat strip
  ("image", path, max_h, caption)    block figure
  ("table", headers, rows, ratios, caption)
  ("code", title, text)              code recipe block
"""

META = {
    "doc_title": "Tangison Copy and Design Audit: Improvement Plan",
    "author": "Z.ai Design Audit",
    "header_title": "Tangison Copy + Design Audit — tangison.com / studio.tangison.com",
    "subject": "Copy, design layout, and motion audit of tangison.com and studio.tangison.com, benchmarked against wearecollins.com, with a prioritized improvement plan",
}

CH = "/home/z/my-project/audit_data/charts_tangison"

CHAPTERS = [
# =====================================================================
{
"num": 1,
"title": "Executive Summary",
"blocks": [
("para", "This report audits the two live Tangison web properties — <b>tangison.com</b> (the corporate site, Tangison Technologies CC) and <b>studio.tangison.com</b> (the design studio) — across three dimensions the owner flagged: copy, design layout, and animation quality, with wearecollins.com (COLLINS) held as the bar. Both sites were crawled end-to-end with Scrapling on 4 September 2026: twenty rendered pages, 20,143 words of live copy, full-page screenshots, the complete shipped CSS, and one megabyte of shipped JavaScript were captured and measured. The judgement in this report is grounded in that evidence, not in general impressions, and every claim in the findings chapters cites a number or a quote taken from the crawl."),
("para", "The headline conclusion is that <b>Tangison does not have a writing problem; it has a presentation problem.</b> The copy is unusually disciplined — specific, honest, jargon-light, and differentiated around a verifiable-truth positioning that most agencies cannot credibly copy. The weaknesses the owner perceives as \u201cweak style\u201d come from three other places: first, a <b>volume-to-visual inversion</b> — studio case studies run 1,200 to 2,000 words of unbroken text against a handful of small images, the exact inverse of the COLLINS image-first pattern; second, <b>monotone motion</b> — the studio ships a real framer-motion + Lenis stack, but 40 reveal animations share one duration (0.6s), one easing family, and one pattern (fade-plus-rise), while scroll-linked motion, pointer physics, and kinetic typography are entirely absent; third, <b>safe layout rhythm</b> — every section stacks the same text-then-image blocks, with no composition that signals a top-tier studio."),
("callouts", [("20", "pages crawled and rendered"), ("20,143", "words of copy analyzed"), ("0", "scroll-linked animations on studio"), (".6s", "one duration used 28 times")]),
("para", "The improvement plan in Chapters 8 through 10 is sequenced so the highest-leverage changes come first. Copy work (Chapter 8) is mostly restructuring, not rewriting: break the case-study walls into pull-quotes, outcome blocks, and evidence galleries; diversify a CTA vocabulary that currently repeats \u201cContact\u201d up to 32 times per site; rebalance tangison.com\u2019s 0.59 you-to-we ratio; and add the objection layer that is currently missing at the point of decision. Design work (Chapter 9) recomposes the hero zones, converts the work grid to cinematic image-dominant cards, and replaces the uniform section stacking with alternating layout ideas. Motion work (Chapter 10) introduces a tokenized motion system, scroll-linked choreography, clip-path reveals, magnetic hover, and a marquee client strip — all with code recipes that drop into the existing Next.js + motion + Lenis stack. A 90-day roadmap in Chapter 12 sequences the work into three phases, and Chapter 11 lists performance and accessibility fixes that take less than a day each, including a 166 KB favicon and a 126 KB un-subsetted monospace font."),
("para", "One finding deserves emphasis because it cuts the other way: on accessibility fundamentals, <b>both Tangison sites already beat the benchmark.</b> Image alt coverage is 100 percent on both sites (8 of 8 and 11 of 11) where COLLINS ships 0 of 14, and both sites reference prefers-reduced-motion (3 and 4 occurrences) where COLLINS ships none. The audit is therefore fair in both directions — the gap to the bar is in theatrical craft and visual confidence, not in engineering hygiene, and that is a gap that can be closed without abandoning the honesty positioning that makes these sites distinctive."),
]},
# =====================================================================
{
"num": 2,
"title": "Scope, Method and Evidence Base",
"blocks": [
("para", "The audit instrument is <b>Scrapling</b>, a Python adaptive-scraping framework, driving a headless Chromium browser. Every page was fetched with network-idle settling and a scripted progressive scroll (twelve steps to the document bottom and back) so that lazy-loaded images and scroll-triggered reveals actually fired before the full-page screenshot was taken. For each page the crawler captured the rendered DOM, the full-page screenshot, the performance resource timeline, the document font set, and an inventory of scripts, stylesheets, fonts, and links. The shipped CSS bundles and up to twenty-five JavaScript chunks per site were then downloaded over plain HTTP and analyzed statically for design tokens, color usage, transitions, keyframes, breakpoints, and animation-library signatures."),
("para", "The evidence base covers every page a first-time visitor or a procurement buyer would touch. On tangison.com: home, capabilities, company profile, projects and research, contact and compliance, careers, privacy, and the site map. On studio.tangison.com: home, about, services, work index, all five featured case studies (Mendozer, Weca, Enchanted, Dieselman, MI-WAY), the contact page, the free-audit landing page, and the studio\u2019s one blog article. COLLINS contributes the benchmark measurements captured in the prior crawl of its home, case-study index, and one full case study; those numbers are reused here unchanged. A vision-language model was then used as a design reviewer on the key screenshots — both sites\u2019 heroes, the studio homepage, the services page, and a full case study — with prompts asking for blunt, senior-design-director-level critique; its findings are quoted in Chapter 5 and are consistent with the CSS-level metrics."),
("table",
 ["Site", "Pages", "Words", "Requests", "Transfer", "Fonts in document"],
 [
  ["tangison.com", "8", "3,916", "73", "0.54 MB", "Satoshi 300-900, Geist Mono"],
  ["studio.tangison.com", "12", "16,227", "86", "1.11 MB", "Cabinet Grotesk, Satoshi, JetBrains Mono"],
  ["wearecollins.com (benchmark)", "3", "visual-first", "173", "1.32 MB", "Portrait Text, Graphik"],
 ],
 [0.28, 0.10, 0.12, 0.13, 0.12, 0.25],
 "Table 1 — Crawl scope and payload comparison. The studio ships twice the transfer of the corporate site at roughly half of COLLINS' request count."),
("para", "Three measurement caveats apply and are stated up front. First, CSS-level counts (transitions, hover rules, keyframes) measure shipped stylesheets, so runtime library animation is invisible to them; that is why Chapter 6 separately quantifies the JavaScript corpus, where the studio\u2019s framer-motion usage actually lives. Second, bundle-level pattern counts (how many times \u201cwhileInView\u201d appears across one megabyte of chunks) are evidence of scale and variety, not a per-component census; the direction of the findings is robust, the exact numbers are indicative. Third, the vision review sees still screenshots, so it can infer affordances like hover states and parallax only from their absence in the DOM and JS — which is precisely how the missing-motion findings in Chapter 6 were confirmed. Everything else in this report is directly measured or directly quoted."),
]},
# =====================================================================
{
"num": 3,
"title": "Copy Audit — tangison.com",
"blocks": [
("para", "The corporate site writes like a registry document, and to a large degree that is a deliberate and defensible choice: the audience is institutional buyers, tender desks, and compliance officers, and the site\u2019s strongest asset is its insistence on verifiability. The positioning line — <i>\u201cIntelligence for imperfect conditions.\u201d</i> — is genuinely distinctive, and the promise underneath it is unusually concrete: <i>\u201cEvery detail on this site can be checked against the Namibian business registry.\u201d</i> The projects page even stakes the position explicitly: <i>\u201cNo invented metrics, no anonymous case studies.\u201d</i> That is a real strategic moat, and nothing in the improvement plan should dilute it. The audit findings below are about what the copy fails to do for a first-time reader who is not yet a believer."),
("h2", "What the copy gets right"),
("bullets", [
 "Specificity: 53 numeric facts across eight pages — registration number, registration date, street address, a named director, named clients with sectors, live product URLs. Almost no agency site in this market can match this density of checkable fact.",
 "Jargon discipline: the full 3,916-word corpus contains four uses of the word \u201csolution(s)\u201d and no other buzzwords from the standard agency lexicon. No \u201cleverage\u201d, no \u201cseamless\u201d, no \u201cworld-class\u201d.",
 "Honest status labelling: the Tangison Agent research entry is marked \u201cStatus: Discontinued\u201d with the reasoning intact. Feorm is listed as discontinued. This candour is the site\u2019s voice.",
 "Meta descriptions: every page has a real, keyword-bearing description (for example the contact page names tenders, RFIs, and the phone number). SEO groundwork is done.",
]),
("h2", "Where the copy underperforms"),
("para", "The voice is company-centric where a persuasion document needs to be reader-centric. The measured you-to-we ratio is <b>0.59</b> — the site says \u201cwe\u201d and \u201cour\u201d 37 times against 22 \u201cyou\u201d/\u201cyour\u201d — and the homepage asks <b>zero questions</b> across its entire rendered text. AIDA applied to the homepage shows a strong Attention moment (the H1), solid Interest (the five competencies), a thin Desire layer (four text-only project cards with no outcome framing), and an Action layer that is present but repetitive. There is no problem-agitation anywhere on the site: \u201cimperfect conditions\u201d is asserted as a theme but the pain of it — what a tender officer actually loses when a system goes down, what late data costs a newspaper, what a broken portal does to a vocational institute\u2019s intake — is never dramatized. The reader who arrives already convinced is well served; the reader who needs to be moved is not."),
("callouts", [("0.59", "you-to-we ratio (target: at least 1.0)"), ("0", "questions asked across the site"), ("\u00d732", "the CTA label \u201cContact\u201d"), ("4", "jargon words in 3,916 total")]),
("para", "The CTA layer is where the repetition is most visible. The label \u201cContact\u201d appears 32 times in link and button text, \u201cTalk to us\u201d ten times, and the strongest variant — \u201cStart a conversation\u201d — only six. Every one of these points to the same /contact page regardless of context: the reader who just finished the capabilities page and the reader who just read about the Tangison Agent are given the identical next step with the identical words. The contact page itself does good work lowering friction (<i>\u201cinclude the scope, your budget range, and your timeline\u201d</i>), but the reader arrives there with no differentiated expectation. Chapter 8 proposes a context-specific CTA vocabulary that keeps the plain-spoken register while giving each conversion point its own verb and payoff."),
("para", "Structurally, the homepage buries its best proof. The \u201cBuilt to be verified\u201d section — the registry, the ownership, the address, the compliance line — is the site\u2019s most differentiating material, and it sits below four text-only project entries that a scanning reader will skip. The five-competency list is well written but visually a single undifferentiated stack (the design review in Chapter 5 calls it a \u201cvertical slog\u201d). And the Careers page, at 196 words, tells a genuinely compelling story — <i>\u201cWe build for conditions that do not cooperate\u201d</i> — but ends by deferring to the contact page because the careers hub \u201cis coming soon\u201d. The copy fundamentals are sound; the arrangement, volume balance, and reader-directedness are what need work."),
]},
# =====================================================================
{
"num": 4,
"title": "Copy Audit — studio.tangison.com",
"blocks": [
("para", "The studio site is the strongest writing in the audit and simultaneously the site with the most severe presentation problem. Its positioning is sharp — <b>\u201cOne studio instead of three vendors\u201d</b> is a real, arguable, memorable claim, and it is argued well in the blog post: <i>\u201cThis is not about saving time. It is about saving coherence.\u201d</i> The case studies contain the best copywriting on either site. Weca\u2019s one-liners are genuinely excellent — <i>\u201cBrands named. Prices published. WhatsApp first. Google reviews as proof.\u201d</i> and <i>\u201cA site that gets a truck moving again as fast as the phone can ring.\u201d</i> — and each case closes with a transferable lesson rather than a boast. The you-to-we ratio is 1.14, the voice asks 22 questions, and the audit landing page is a complete persuasion page: problem, promise, process with durations, objection handling (\u201cWhat free actually means here\u201d), and a form with exactly four fields. As writing, this is top-quartile agency copy."),
("h2", "The wall of text"),
("para", "The problem is volume and its interaction with layout. The twelve crawled pages carry <b>16,227 words</b>, averaging 1,352 words per page, and the five case studies run 1,221 to 2,015 words each — <b>29 paragraphs exceed 60 words</b>, and the average paragraph inside a case study runs 90 to 130 words with no visual interruption. The Weca case study, for example, spends four consecutive unbroken paragraphs on fitment pricing before the first image appears. The vision review of that page was blunt: <i>\u201cThis is a wall of text\u2026 It feels like a PDF report, not a digital experience.\u201d</i> For a studio whose entire pitch is design capability, the case studies — the pages a prospective client reads to judge that capability — are the least designed pages on the site. COLLINS\u2019 case studies are image sequences with captions; the studio\u2019s are essays with screenshots."),
("image", CH + "/copy_volume.png", 300, "Figure 1 — Body word count per page across both sites. The five case studies (teal, right) are the densest pages on either site."),
("h2", "Framework gaps"),
("para", "Scored against the standard persuasion frameworks, the studio homepage covers Attention (the H1), Interest (recent projects), and Action (a clear, repeated CTA), but its <b>Desire stage is thin</b>: no outcome is quantified or dramatized, because the honesty policy forbids invented metrics and the site has not yet built the evidence layer that would let outcomes be shown honestly. The strongest desire-creating material on the site — the fifteen-project client list, the national newspaper platform, the sixteen-year-old music academy brand, the Google-reviews-as-proof pattern from the Weca build — exists but is rendered as plain text lists. There is also no objection layer at the point of decision: the contact page\u2019s \u201cA few notes that will make your first message easier to answer well\u201d is good friction-lowering, but the classic buying objections (price band, timeline, why not a bigger agency, what happens after launch) are answered nowhere near the CTA. The free-audit page proves the team knows how to do this — its \u201cterms\u201d section is textbook objection handling — the pattern just has not been extended to the paying funnel."),
("h2", "Voice-level cleanups"),
("bullets", [
 "The hedge word \u201cactually\u201d appears 14 times across the studio corpus. It weakens an otherwise confident voice; most instances can simply be deleted (the audit page alone uses it five times in its \u201cwhat free means\u201d section).",
 "36 passive constructions across the corpus, concentrated in the case studies (\u201cthe site was built\u201d, \u201cthe work is carried\u2026\u201d). Active restorations are mechanical and take under an hour.",
 "The CTA vocabulary is better than the corporate site\u2019s — \u201cStart a project brief\u201d and \u201cRequest my free audit\u201d are specific — but \u201cContact\u201d still appears 24 times and every context offers the same two or three labels.",
 "The footer CTA \u201cStart a project brief \u2192\u201d is the strongest repeated CTA on either site and should be the model the rest of the site converges on: verb + artifact + low commitment.",
]),
("para", "One structural note that is copy and architecture at once: the homepage carries eleven distinct H2 sections on one page (recent projects, what we do, principles, process, collaboration, latest writing, and more). Each section is individually well written; together they dilute. The homepage is trying to be the whole site. The improvement plan in Chapter 8 recommends promoting the process and principles material to the About page (where the same four principles already appear, verbatim, creating duplication) and letting the homepage do three jobs with full weight: the promise, the proof, and the ask."),
]},
# =====================================================================
{
"num": 5,
"title": "Design and Layout Audit",
"blocks": [
("para", "Both sites ship a real design system — tokenized type scale, custom fonts, disciplined palettes — which puts them ahead of most of the market before any critique begins. The corporate site\u2019s palette is warm and editorial: paper #f0ede8, ink #1a1a18, hairline #d4cfc7, with a deep green #2b6b5e reserved for accents and a single live-green status dot. The studio\u2019s palette is darker and more branded: near-black #111315, paper #f6f4ef, and a genuine teal family (#2cb5b4 with supporting #0f5c5b, #157372, #e6f2f1) used fourteen times — an accent the site actually owns. Type pairing is deliberate on both (Satoshi plus Geist Mono on corporate; Cabinet Grotesk, Satoshi, and JetBrains Mono on studio), and the mono eyebrow labels with 0.2\u20130.4em tracking are a distinctive signature. The critique below is therefore not about missing craft; it is about composition, scale confidence, and rhythm."),
("h2", "Hero zones: safe where the benchmark is bold"),
("para", "The three-way hero comparison (COLLINS, studio, tangison) produced the clearest design verdict of the audit. The vision review found COLLINS \u201cthe clear winner\u201d on the strength of restraint and authority: a high-contrast serif at massive scale, text floating in deliberate negative space, and a moody near-black field with a single red gesture at the base. Both Tangison heroes were found \u201ccluttered\u201d by comparison — filling the frame with navigation, sub-headlines, and UI chrome — and were told they are \u201cafraid of empty space.\u201d The studio hero was called \u201ccompetent but safe\u2026 a standard SaaS template\u201d with bold type but no typographic tension or asymmetry, and the corporate hero\u2019s image was read as \u201cgeneric tech landscape stock\u201d (it is in fact a Namibian landscape, Skeleton Coast imagery — the reading shows the treatment, not the subject, is the problem)."),
("image", CH + "/hero_compare.jpg", 165, "Figure 2 — Above-the-fold comparison at equal height: COLLINS (left), studio.tangison.com (center), tangison.com (right). The benchmark leads with scale and negative space; both Tangison heroes lead with density."),
("para", "The actionable translation of that verdict is not \u201ccopy COLLINS\u201d — it is three compositional moves available to both sites with their existing palettes and fonts. First, <b>scale and bleed</b>: increase hero display size by roughly 40 percent and let a line or word bleed past the safe grid so the headline becomes a visual object rather than a text block. Second, <b>earn the negative space</b>: cut one of the competing elements (the eyebrow-plus-subhead-plus-CTA-plus-image stack) from the first screen so a single element dominates. Third, <b>replace literal imagery with treated imagery</b>: the corporate hero\u2019s landscape wants a heavier ink treatment or a duotone in the site\u2019s own green, and the studio hero wants its lighthouse image overlapped by the headline rather than sitting politely beside it."),
("h2", "Section rhythm: one idea repeated"),
("para", "Scroll the studio homepage and the layout idea never changes: text block, then large image, then a grid of cards — twice through the services page, and again on home. The vision review called the rhythm \u201cmonotonous\u2026 a predictable scroll rather than a curated editorial journey\u201d and identified the dark \u201cFive steps, one connecting line\u201d process section as the one place the site \u201cfinally breaks the grid and shows structural thinking.\u201d That section — dark background, a connected line, numbered steps, high contrast — is the internal proof that the team can compose an editorial moment; the plan in Chapter 9 is essentially \u201capply the process-section\u2019s thinking to the rest of the page.\u201d On the corporate site, the equivalent finding is the five-competency stack, described by the review as \u201ca vertical slog\u2026 identical rows with zero visual tension,\u201d with the numbered 01\u201305 markers dismissed as \u201cdecorative noise rather than structural navigation.\u201d"),
("image", CH + "/work_grid.jpg", 230, "Figure 3 — The studio work index card grid. Legible and consistent, but one repeated card shape at one repeated scale; no single project dominates and hover affordance is invisible."),
("para", "The work index is the highest-stakes layout on the studio site and currently the most conventional: fifteen projects rendered as an evenly paced sequence of same-shaped cards, each with a category label, a description, and a one-line outcome. The vision review called the presentation \u201ca generic blog feed\u201d with images \u201ctoo small relative to the text block\u201d and \u201chover affordance\u2026 non-existent.\u201d The case-study pages share the problem at the article level: the Weca page\u2019s Challenge and Approach sections run nearly a thousand words before meaningful imagery, and the small production screenshot that does appear has no crop, no treatment, and no captioning rhythm (Figure 4). The fix set — full-bleed case covers, image-dominant cards with floating typography, alternating asymmetric layouts — is specified in Chapter 9."),
("image", CH + "/weca_textwall.jpg", 230, "Figure 4 — Excerpt from the Weca case study (28\u201352 percent scroll depth). Four consecutive dense text columns with no visual interruption; this is the pattern the design review called \u201ca PDF report, not a digital experience.\u201d"),
("h2", "Design token hygiene"),
("bullets", [
 "The studio CSS references about 100 distinct hex/rgba color values with a 209-token custom-property set — healthy tokenization, but the raw color count signals drift; consolidate toward the documented teal/ink/paper families.",
 "Border-radius on the studio ranges from 0 to 9999px across 15 values (pills, 24px cards, 16px, 25px\u2026) — pick two radii (one pill, one card) and enforce them.",
 "backdrop-filter appears 15 times on the studio (glass panels). It is a compatibility and performance tax on exactly the low-end mobile hardware the site\u2019s own \u201cimperfect conditions\u201d positioning speaks to; provide solid-color fallbacks.",
 "focus-visible coverage is 11 rules (corporate) and 9 (studio) against COLLINS\u2019 110 — keyboard navigation styling is the single largest accessibility gap on both sites, and Chapter 11 fixes it in under an hour.",
]),
]},
# =====================================================================
{
"num": 6,
"title": "Motion and Interaction Audit",
"blocks": [
("para", "This is the dimension the owner flagged, and the evidence supports the instinct precisely. The important preliminary finding is that <b>the stack is not the problem.</b> The studio ships motion (framer-motion\u2019s successor library) with 54 motion components in the bundle, Lenis smooth scrolling, and SplitType for text splitting; the corporate site ships motion and Lenis as well. This is the same class of tooling COLLINS uses (motion.dev plus CSS transitions). Nothing needs to be installed or migrated — the gap is entirely in choreography, and it is measurable."),
("h2", "One duration, one easing, one gesture"),
("para", "Across the studio\u2019s one-megabyte JavaScript corpus, the fade-plus-rise reveal is essentially the only choreographed pattern: 107 opacity animations, 74 y-translate animations, 40 whileInView triggers, 32 variant sets, and 62 initial states. The rhythm is uniform to the point of being readable as a template: the duration 0.6 appears 28 times (the next most common is 1.0 at 11), and the easing array [0.16, 1, 0.3, 1] — a single expo-out curve — appears 10 times with only isolated alternatives. Stagger exists (12 occurrences) but with uniform index-based delays. The perceptual result is that every element on the page arrives in the same voice: everything fades, everything rises 20-odd pixels, everything takes just over half a second. Uniform motion reads as \u201csite template\u201d; varied, intentional motion reads as \u201cstudio.\u201d"),
("image", CH + "/duration_mix.png", 185, "Figure 5 — Animation durations in the studio's shipped JS. One value (0.6s) dominates; the benchmark distributes durations from 0.2s to 2.5s (mean 0.53s) across 220 transitions."),
("h2", "What is entirely absent"),
("para", "The absence list is the more damning half of the diagnosis. The corpus contains <b>zero</b> occurrences of useScroll, useTransform, or useSpring — the motion library\u2019s scroll-linked primitives — meaning no element on the studio responds to scroll position continuously: no image parallax, no scroll-linked headline fill (COLLINS\u2019 signature TextScrollFill pattern), no sticky process panel, no progress indicators. There are no magnetic or cursor-tracking interactions (11 whileHover instances cover ordinary state changes), no marquee or infinite-loop kinetic type, and only two clip-path declarations in CSS against COLLINS\u2019 44 — so imagery never wipes or masks in, it only fades. The vision review of the Weca case study inferred exactly this from stills: \u201cI infer zero motion\u2026 no parallax, no scroll-triggered reveals\u2026 In a COLLINS benchmark, the page itself is the demo of your studio\u2019s technical prowess.\u201d"),
("image", CH + "/studio_js_motion.png", 260, "Figure 6 — Motion-library usage in the studio's shipped JS corpus. Red entries are the patterns with zero occurrences: the entire scroll-linked and spring-physics layer is absent."),
("para", "The corporate site\u2019s motion situation is different and simpler: it is nearly static by choice — one animate call, fourteen opacity references, a Lenis config, and a small set of CSS transitions concentrated on navigation and link states (20 declarations, 56 hover rules). For a registry-grade institutional site that restraint is coherent, and the plan does not propose turning it into a showreel. The two upgrades that matter there are a choreographed hero entrance (staggered line-mask reveal of the H1, one parallax drift on the treated landscape) and accordion/list interactions with real easing, so the calmness reads as confidence rather than as absence."),
("h2", "The decorative keyframe layer"),
("para", "The studio\u2019s eleven CSS keyframes (signal-travel, breathe-glow, pulse-ring, blink, stagger-reveal, and siblings) are concentrated in small ambient decorations — status dots, glow rings, scroll pulses. Individually several are well made; collectively they are the wrong spend. Ambience is applied to chrome while the content itself — case covers, project cards, headlines, imagery — receives the same generic fade as everything else. The plan in Chapter 10 keeps at most two ambient keyframes and redirects the effort into exactly six content-level motion patterns with full recipes: staggered line-mask headline reveals, clip-path image wipes, scroll-linked parallax, magnetic buttons, a client-list marquee, and a hero sequence. Six patterns, consistently applied, is what separates a motion system from motion decoration."),
]},
# =====================================================================
{
"num": 7,
"title": "The COLLINS Gap, Side by Side",
"blocks": [
("para", "The table below places the two Tangison sites against the benchmark on the metrics that define the perceived gap. Two fairness notes frame it. First, COLLINS\u2019 numbers come from a Nuxt 3 site with a decade of accumulated design-system investment and a motion team; the comparison is a direction-setter, not a quota. Second, the gap is lopsided in a specific way: COLLINS wins every theatrical metric (transitions, hover states, focus styling, clip-path, scroll-linked patterns), while the Tangison sites win the two hygiene metrics that COLLINS neglects (alt coverage, reduced-motion references). The strategy that follows from the table is therefore not \u201cmatch COLLINS everywhere\u201d but \u201cimport the theatrical layer without exporting the accessibility lead.\u201d"),
("image", CH + "/motion_gap.png", 235, "Figure 7 — CSS-level motion affordances across the three sites. COLLINS (dark) leads by roughly an order of magnitude on transitions, hover, focus-visible, and clip-path; the Tangison sites lead on reduced-motion and alt coverage (not shown)."),
("table",
 ["Metric", "tangison.com", "studio", "COLLINS", "Reading"],
 [
  ["CSS transition declarations", "20", "10", "220", "10\u201320\u00d7 gap; motion lived in JS, not tokens"],
  [":hover rules", "56", "52", "150", "under-designed pointer states"],
  [":focus-visible rules", "11", "9", "110", "keyboard styling gap \u2014 fix in an hour"],
  ["clip-path declarations", "2", "2", "44", "no mask/wipe reveals on imagery"],
  ["@keyframes", "5", "11", "10", "studio's keyframes spent on ambient chrome"],
  ["Motion tokens (named easings/durations)", "0", "ad hoc", "33", "no shared motion vocabulary"],
  ["useScroll / useTransform / useSpring", "0 / 0 / 0", "0 / 0 / 0", "TextScrollFill + scroll-linked", "scroll-linked layer absent"],
  ["Scroll smoothing", "Lenis", "Lenis", "native + CSS", "parity"],
  ["Video as motion", "1 hero asset", "0", "33 Mux videos", "theatrical medium unused"],
  ["Avg. body words per page", "490", "1,352", "minimal (image-first)", "inverted copy-to-visual ratio"],
  ["Image alt coverage", "8 / 8", "11 / 11", "0 / 14", "Tangison leads \u2014 keep it"],
  ["prefers-reduced-motion refs", "3", "4", "0", "Tangison leads \u2014 keep it"],
 ],
 [0.30, 0.15, 0.15, 0.18, 0.22],
 "Table 2 — The benchmark gap. Theatrical metrics favor COLLINS; accessibility hygiene favors both Tangison sites."),
("para", "Three imports close most of the perceptual distance, and they are the organizing spine of Chapter 10. First, a <b>tokenized motion vocabulary</b>: COLLINS\u2019 33 named easings and duration tokens are what make its motion feel intentional; the studio\u2019s single-duration fade is what makes it feel templated. Second, a <b>scroll-linked layer</b>: continuous response to scroll position is the single biggest qualitative difference between the two motion experiences, and the studio\u2019s library already ships the primitives. Third, <b>pointer personality</b>: 150 hover rules against 52 is not about quantity but about craft at the moment of touch — magnetic pulls, image scale settles, cursor feedback on the work grid. None of these require changing stack, hosting, or framework; they are additive to what is already shipped."),
]},
# =====================================================================
{
"num": 8,
"title": "Improvement Plan — Copy",
"blocks": [
("para", "The copy plan preserves the register that makes these sites distinctive — plain, specific, honest — and applies the standard conversion frameworks (AIDA, PAS, CTA formulas, objection handling) as structural tools rather than as a voice change. Everything below is written to be usable directly: headlines are given as variants with rationale, CTAs as replacements per context, and the case-study restructure as a repeatable module pattern. Where a rewrite would risk the site\u2019s truth policy, the constraint is stated explicitly."),
("h2", "Headline variants"),
("table",
 ["Page", "Current", "Option A (outcome-led)", "Option B (audience-led)"],
 [
  ["tangison.com home", "Intelligence for imperfect conditions.", "Systems that keep running when conditions don't.", "The technology partner Namibian institutions can verify."],
  ["studio home", "We build the brand, the product and the intelligence behind it.", "One studio instead of three vendors.", "Brand, product and the systems behind them \u2014 built by one team, not three."],
  ["studio about", "Built at the edge.", "Built at the edge. Run from Windhoek.", "A small studio doing continent-grade work from the edge of the Atlantic."],
  ["studio work", "Projects built with focus.", "Fifteen builds, each with its outcome stated.", "The work, described as it stands."],
  ["tangison.com projects", "Selected work, described as it stands.", "Real work, with its honest status.", "What we have shipped, and what it runs on."],
 ],
 [0.16, 0.26, 0.30, 0.28],
 "Table 3 — Headline variants. Option A leads with outcome (benefit over feature); Option B binds audience to promise. On the studio homepage, promoting the existing positioning line \u201cOne studio instead of three vendors\u201d to the H1 is the strongest single copy move available."),
("para", "Rationale, briefly. The corporate H1 is a brand line — abstract, no audience, no outcome — which is exactly the right job for a tagline and the wrong job for a page title that must orient a first-time tender reader in three seconds. The recommended pattern is to keep \u201cIntelligence for imperfect conditions.\u201d as the brand constant (footer, social, print) and test an outcome-led H1 with a value-prop subhead: <i>\u201cICT, applied AI, and systems engineering for Namibian institutions \u2014 designed, built, run, and verified in Windhoek.\u201d</i> On the studio, the current H1 is a features sentence in the first person (\u201cWe build\u2026\u201d); the positioning line already in the eyebrow is stronger because it is arguable and memorable, and it converts the site\u2019s best argument into its first impression. Test both against the current, one variable at a time."),
("h2", "A CTA vocabulary per context"),
("table",
 ["Context", "Current", "Proposed", "Formula applied"],
 [
  ["Hero (both sites)", "Contact / Talk to us", "Start a project brief \u2014 free 30-minute scoping call", "verb + artifact + ease"],
  ["After capabilities", "All capabilities in detail", "See which capability fits your tender", "verb + relevance"],
  ["After case study", "Start a project", "Want something like this? Start a brief", "borrowed from their own pattern"],
  ["Work grid card", "Read \u2026 case study", "See the Weca build \u2014 brands, prices, proof", "verb + specifics from the case"],
  ["Studio footer", "Start a project brief \u2192", "Keep as is \u2014 it is the model", "verb + artifact + low commitment"],
  ["Audit page", "Request my free audit", "Keep as is \u2014 strongest CTA on either site", "ownership + value"],
  ["Careers (tangison)", "Talk to us", "Tell us what you have built", "audience-specific verb"],
 ],
 [0.20, 0.22, 0.36, 0.22],
 "Table 4 — Context-specific CTA replacements. Every proposal uses action verb plus what they get, and every claim used already exists on the site (the 30-minute call is described on the contact page; the Weca specifics are the case's own words)."),
("para", "The rule behind the table: <b>no CTA may repeat a label more than three times per page, and every context gets its own payoff.</b> The contact page\u2019s promise — reply within two working days, the free 30-minute call that \u201cis where we figure out whether we are the right studio\u201d — is the honest scarcity angle the sites already possess; surface it in the CTA labels themselves instead of leaving it three paragraphs deep on one page. Similarly, the studio\u2019s \u201climited number of projects at a time\u201d policy is currently an About-page aside; it is a legitimate scarcity signal that belongs next to the primary CTA, stated exactly as plainly as it is today."),
("h2", "Case-study restructure (the highest-leverage copy move)"),
("para", "The five case studies do not need less truth; they need a layout that lets a scanning reader buy in before the full narrative. The restructure is a module pattern applied identically to all five: after the H1 and the one-line description, a <b>stat strip</b> of three verifiable facts drawn from the case\u2019s own text (Weca: 20 brands named, prices published from N$2,500, Google reviews as the only testimonial layer); then the Challenge condensed to one tight paragraph with a <b>pull-quote</b> pulled from the strongest line (\u201cA truck waiting for alignment is a truck losing money\u201d); then Approach as a scannable pattern list with small evidence images; then Outcome with the \u201cdoes the qualifying work before the phone rings\u201d framing and the live-site link. The full narrative stays — collapsed behind a \u201cRead the full build note\u201d expansion or simply below the fold — so depth remains available to the reader who wants it. Target: first screen of every case carries at least 60 percent visual, and no unbroken text run exceeds 120 words anywhere."),
("h2", "Desire and objection layers"),
("bullets", [
 "Rebalance tangison.com toward the reader: target you-to-we of at least 1.0 by converting feature sentences to outcome sentences (\u201cWe design, build, and maintain\u2026\u201d gains a companion line: \u201cYour systems stay up when the line drops; your data stays on your infrastructure; your auditors get logs, not promises.\u201d).",
 "Add one PAS block to the capabilities intro \u2014 the site already owns the problem language (\u201cintermittent connectivity, late-arriving data, uneven infrastructure\u201d); one paragraph that costs the reader the status quo, then resolves it, completes the arc without inventing anything.",
 "Build an honest proof strip on the studio homepage from existing material: fifteen shipped projects, the national newspaper platform, the 16-year-old Crescendo brand, the Google-reviews-as-proof pattern. No new claims \u2014 a new presentation of claims already made.",
 "Add a four-question objection FAQ adjacent to the primary CTA on the studio contact page: What does a project cost? (state the band or state the refusal honestly \u2014 they already ask clients for ranges); How long does a build take?; Why not a bigger agency?; What happens after launch? The audit page\u2019s \u201cterms\u201d pattern is the template.",
 "Mechanical cleanups: delete most of the fourteen \u201cactually\u201d hedges on the studio; restore actives in the 36 passive constructions; cap paragraphs at 90 words site-wide.",
]),
]},
# =====================================================================
{
"num": 9,
"title": "Improvement Plan — Design and Layout",
"blocks": [
("para", "The design plan converts the Chapter 5 findings into page-level specifications. The through-line is the same on both sites: <b>each scroll region should present one composition idea, and no two adjacent regions should share a layout.</b> Today both sites alternate between two ideas (text-block, image-block) for their entire length; the target is a rhythm of five or six distinct compositions drawn from the patterns below. Nothing here requires new tooling — it is grid, scale, crop, and restraint work inside the existing design system."),
("h2", "Hero recomposition (both sites)"),
("bullets", [
 "Scale: hero display type up ~40 percent from current size, with the longest line allowed to bleed toward the viewport edge. A word that breaks the grid reads as confidence; a headline that fits the column reads as content.",
 "Dominance: exactly one first-screen element wins. On the corporate site, the H1 plus the green duotone landscape, with the mono eyebrow retained and the subhead cut to one line. On the studio, the H1 overlapping the lighthouse image, with the image darkened 20\u201330 percent so text owns the contrast.",
 "Treatment: replace literal photographic rendering with the site\u2019s own palette \u2014 an ink-multiply or duotone in #2b6b5e (corporate) and #0f5c5b (studio). Treated imagery reads as art direction; untreated imagery reads as stock, regardless of subject.",
 "Motion: the hero is the one place every visitor sees motion; give it the staggered line-mask sequence specified in Chapter 10 rather than the current single fade.",
]),
("h2", "Case grid and case pages (studio)"),
("para", "The work index moves from fifteen equal cards to a <b>featured-plus-stream layout</b>: the most recent or strongest case (Weca, with its brands-and-prices story) renders as a full-bleed cinematic card — edge-to-edge image, project name and one-liner floating on the image in Cabinet Grotesk, category as a mono chip — while the remaining fourteen render as a compact editorial list: oversized index numerals, name, one-line outcome, thumbnail that scales on hover. This is the COLLINS case-index pattern adapted to a text-strong brand: one dominant visual anchor, everything else typographic. On the case pages themselves, apply the Chapter 8 module pattern (stat strip, condensed challenge with pull-quote, pattern list with evidence images) and add a full-width production-screenshot band between Approach and Outcome — the sites exist and are live, so the imagery is free; capture full-page composites of each shipped site the way this audit did."),
("h2", "Section rhythm catalog"),
("para", "To break the two-idea alternation, these five compositions cover every content type both sites currently stack: a full-bleed image band with floating type (case covers, proof strip); a dark editorial panel (the existing Five-Steps section pattern, reused for the proof strip and the objection FAQ); a two-column asymmetric split at 7/5 rather than 6/6 (principles, capability detail); an oversized-index list (client roster, competency matrix); and a single centered statement in display type with generous margins (mission lines, closing CTA). Assign compositions so adjacent sections differ, and the page acquires the editorial journey the vision review asked for without a single new component. The corporate site\u2019s five-competency stack becomes an oversized-index list \u2014 the numerals become 96-plus-point display figures in Geist Mono, each competency getting a one-line scope and room to breathe, which directly resolves the \u201cvertical slog\u201d finding."),
("h2", "CTA presentation"),
("para", "The vision review of the services page found the primary ask \u201crelegated to the footer in a low-contrast button\u2026 a high-intent action with a low-energy entry point.\u201d The fix is structural: every page that argues value (capabilities, services, every case study, the work index) ends with a centered closing statement in display type \u2014 the site\u2019s existing pattern, \u201cHave something worth building?\u201d, is already right \u2014 followed by one primary button in the accent color at 56-plus-pixel height, plus the mono small-print line carrying the honest scarcity signal (\u201cWe reply within two working days. We take a limited number of projects at a time.\u201d). One ask per page, big enough to answer, honest enough to trust."),
]},
# =====================================================================
{
"num": 10,
"title": "Improvement Plan — Motion and Interaction",
"blocks": [
("para", "The motion plan has a strict shape: <b>one token system, six patterns, zero new dependencies.</b> The token system fixes the monotone-duration problem at the root; the six patterns replace the single fade-plus-rise with a vocabulary that a visitor can feel; and everything runs on the motion + Lenis + SplitType stack already in the bundle. Each pattern below includes a drop-in recipe. Durations spread across the scale, easings vary by purpose, and every pattern carries its own reduced-motion behaviour (the sites already reference prefers-reduced-motion \u2014 preserve that in every variant)."),
("h2", "The motion token system"),
("code", "tokens.css + motion variants — one vocabulary for CSS and JS", """/* tokens: durations spread 0.2-1.2s, one easing per intent */
:root {
  --dur-1: 0.2s;  --dur-2: 0.35s; --dur-3: 0.5s;
  --dur-4: 0.8s;  --dur-5: 1.2s;
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --dur-1: 0.01ms; --dur-2: 0.01ms; --dur-3: 0.01ms;
          --dur-4: 0.01ms; --dur-5: 0.01ms; }
}
// motion variants consume the same scale
export const reveal = {
  fast:  { duration: 0.35, ease: [0.16, 1, 0.3, 1] },  // micro state
  base:  { duration: 0.5,  ease: [0.25, 1, 0.5, 1] },  // content reveal
  slow:  { duration: 0.8,  ease: [0.16, 1, 0.3, 1] },  // hero, section covers
};"""),
("h2", "Pattern 1 — Staggered line-mask headline reveal"),
("para", "SplitType is already in the studio bundle and used only for a text-cycle effect. Point it at every H1 and section H2: split into lines, wrap each line in an overflow-hidden mask, and reveal with a y-range of 110 percent (not 20 pixels) over 0.8s with a 60ms per-line stagger. Lines that arrive from behind a mask read as typographic choreography; opacity fades read as a template. This single pattern applied site-wide changes the perceived quality of the first screen more than any other item in this chapter."),
("code", "HeadlineReveal.jsx", """import SplitType from 'split-type';
import { motion, useReducedMotion } from 'motion/react';

export function HeadlineReveal({ children, as = 'h1' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!ref.current || reduce) return;
    const split = new SplitType(ref.current, { types: 'lines' });
    split.lines.forEach((line, i) => {
      line.style.overflow = 'hidden';
      line.innerWrap = line.firstChild;
      motion(line, {
        initial: { yPercent: 110 },
        whileInView: { yPercent: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
      });
    });
    return () => split.revert();
  }, [reduce]);
  const Tag = as;
  return <Tag ref={ref}>{children}</Tag>;
}"""),
("h2", "Pattern 2 — Clip-path image wipes"),
("para", "Imagery should wipe, not fade. A clip-path inset reveal (COLLINS uses 44 clip-path declarations; both Tangison sites ship 2) gives case covers and work-grid images a physical, editorial entrance: the image unmasks top-to-bottom over 0.8s with the expo-out curve, optionally paired with a scale settle from 1.08 to 1. The same wipe run in reverse on exit gives the AnimatePresence page transitions a signature."),
("code", "ImageWipe.jsx", """<motion.div
  initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }}
  whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  <img src={cover} alt={title} />
</motion.div>"""),
("h2", "Pattern 3 — Scroll-linked parallax (the missing layer)"),
("para", "Zero useScroll instances is the audit\u2019s sharpest single number. The first three places to spend it: hero imagery drifting at 0.85\u00d71.15 of scroll velocity; case-cover images parallaxing inside a fixed-height mask; and a scroll-progress fill on the studio\u2019s Five-Steps line, so the process line draws itself as the reader walks the steps \u2014 the COLLINS TextScrollFill idea, expressed in this design system. Continuous response to the reader\u2019s input is what makes a page feel alive rather than sequential."),
("code", "ParallaxImage.jsx", """import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export function ParallaxImage({ src, alt, range = 0.15 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll(
    { target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1],
    reduce ? ['0%', '0%'] : [`${-range * 100}%`, `${range * 100}%`]);
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.2 }} />
    </div>
  );
}"""),
("h2", "Pattern 4 — Magnetic buttons"),
("para", "Eleven whileHover instances cover ordinary color swaps. The primary CTA deserves physics: track pointer distance inside a padding ring, translate the button toward the cursor with a spring (stiffness ~180, damping ~14), and snap back on leave. Applied to the two or three primary CTAs per page only \u2014 magnetic everything is worse than magnetic nothing."),
("code", "MagneticButton.jsx", """import { motion, useMotionValue, useSpring } from 'motion/react';

export function MagneticButton({ children, ...props }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });
  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.cx) * 0.25);   // r.cx/cy = rect center
        y.set((e.clientY - r.cy) * 0.25);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      {...props}
    >{children}</motion.button>
  );
}"""),
("h2", "Pattern 5 — Client marquee"),
("para", "The fifteen-project client list is currently a text list. Rendered as a slow infinite marquee strip in mono type with separators \u2014 the Mendozer, Weca, Enchanted, Dieselman, MI-WAY, Revive, L and R Clearing, Feorm, Crescendo, Tangison Systems, Petrocor, SMEFrog, Cluster Leaf, Nalago, ProAvia line \u2014 it becomes kinetic proof that reads at a glance and adds continuous motion energy to a page that currently has none between sections. Pause on hover, stop under prefers-reduced-motion, 30\u201360s loop duration."),
("h2", "Pattern 6 — Hero sequence"),
("para", "Assemble the first screen as a timed sequence: eyebrow fades at 0.1s, headline lines unmask staggered at 0.2\u20130.5s, treated image wipes in behind at 0.3s, CTA rises at 0.6s \u2014 total under 1.2 seconds, once per session, skippable by scroll. The corporate site\u2019s hero gains the same structure at half the amplitude. A composed entrance is the difference between a page that loads and a page that begins."),
]},
# =====================================================================
{
"num": 11,
"title": "Performance and Accessibility Fixes",
"blocks": [
("para", "These items are small, cheap, and independent of the design work \u2014 several are pure deletions. They are listed with measured sizes so the payoff is visible. The studio ships 1.11 MB across 86 requests for a content site; the target after this chapter is under 0.8 MB with perceptibly faster first paint on mid-range mobile, which is the device class most Namibian visitors actually hold."),
("table",
 ["Item", "Measured", "Fix", "Payoff"],
 [
  ["favicon.png (studio)", "166 KB + 77 KB duplicate", "render a 32px PNG/ICO + 180px apple-touch; reference once", "\u2212240 KB on every first visit"],
  ["JetBrains Mono (studio)", "126 KB full TTF", "woff2 subset via fontsource or next/font local subsets", "\u2212\u2248100 KB"],
  ["Satoshi weights (corporate)", "6 TTF files, 37 KB each", "swap to woff2; drop 300 (unused at scale)", "\u2212150\u2013200 KB"],
  ["backdrop-filter panels (studio)", "15 declarations", "solid-color fallbacks via @supports; audit glass on mobile", "stability on low-end GPUs"],
  [":focus-visible (both)", "11 / 9 rules", "systematic 2px accent outline token on interactive elements", "keyboard parity with benchmark"],
  ["Ambient keyframes (studio)", "11 keyframes", "keep 2; delete or pause the rest under reduced-motion", "less chrome motion, same calm"],
 ],
 [0.22, 0.20, 0.33, 0.25],
 "Table 5 — Independent quick fixes. Each is under a day of work and none blocks the Chapter 9-10 redesign."),
("para", "Two protections to keep while everything else changes. First, alt coverage is 100 percent on both sites against COLLINS\u2019 zero \u2014 hold that line as new imagery enters, including the case-study screenshot bands, which are the most likely place for the habit to slip. Second, the prefers-reduced-motion references already present must propagate into every new pattern from Chapter 10; the recipes as written carry reduce-motion guards, and the review checklist should verify each pattern with the media query emulated before shipping. The goal is to pass COLLINS on theatrical craft without adopting its accessibility debt."),
]},
# =====================================================================
{
"num": 12,
"title": "90-Day Roadmap",
"blocks": [
("para", "The roadmap sequences the plan into three phases by dependency and leverage: quick wins first (they fund credibility for the rest), the case-study system second (it is the highest-leverage single redesign), and the full motion layer last (it lands on top of redesigned layouts rather than being redone). Each phase has an exit condition so progress is checkable, and the whole plan fits the existing Next.js codebases with no re-platforming."),
("table",
 ["Phase", "Days", "Work items", "Exit condition"],
 [
  ["1 \u2014 Hygiene and voice", "1\u201314",
   "All Table 5 items; CTA swap per Table 4; headline A/B per Table 3; delete hedges and passives; you-we rebalance on tangison.com; marquee client strip (Pattern 5)",
   "Lighthouse mobile \u2265 90; transfer \u2264 0.8 MB; zero repeated CTA labels"],
  ["2 \u2014 The case system", "15\u201345",
   "Case-study module restructure on all five cases (Chapter 8); featured-plus-stream work index; full-page screenshot bands; hero recomposition both sites; token system (Chapter 10) adopted",
   "Every case first screen \u2265 60% visual; stat strip + pull-quote live on 5/5 cases"],
  ["3 \u2014 Motion layer", "46\u201390",
   "Patterns 1\u20134 and 6 across studio; corporate hero sequence at half amplitude; scroll-linked Five-Steps line; page transitions; reduced-motion QA pass; re-run this audit's instruments to measure the delta",
   "useScroll/useTransform \u2265 5 live instances; \u2265 4 distinct durations in shipped JS; motion gap to benchmark closed on hover, focus, clip-path"],
 ],
 [0.14, 0.08, 0.50, 0.28],
 "Table 6 — Phased roadmap. Phase 3 closes by re-running the Scrapling instruments from this report against the redesigned sites and scoring the delta."),
("para", "Measurement is built into the plan\u2019s end: every quantitative claim in this report \u2014 the 0.6s duration monoculture, the zero useScroll count, the word-per-page distribution, the focus-visible gap \u2014 is re-measurable with the same scripts, so the Phase 3 exit review can show the before-and-after in the same units. The owner\u2019s instinct that the studio \u201chas a weak style especially at the animations\u201d was directionally correct and is now precisely located: not in the tools, not in the writing, but in the choreography, the copy-to-visual ratio, and the composition rhythm. Ninety days of the work above moves both sites from \u201cdocumented\u201d to \u201cdemonstrated\u201d \u2014 which is, in the end, the same standard the sites already hold themselves to in words."),
]},
# =====================================================================
{
"num": None,
"title": "Appendix — Evidence Inventory",
"blocks": [
("para", "All evidence was captured 4 September 2026 with Scrapling 0.4 (headless Chromium, network-idle, scripted 12-step scroll). Rendered HTML, full-page screenshots, performance entries, document fonts, and asset inventories are stored under audit_data/tangison, audit_data/studio, and audit_data/collins; the analysis scripts are re-runnable against any deployment for the Phase 3 delta review."),
("table",
 ["Artifact", "Path", "What it evidences"],
 [
  ["Crawl summaries", "audit_data/fetch_tangison_summary.json", "pages fetched, engines, byte counts"],
  ["Copy inventory", "audit_data/{site}/copy_inventory.json", "headings, paragraphs, CTAs, forms per page"],
  ["Copy digest", "audit_data/copy_digest.txt", "human-readable full copy per page"],
  ["Copy metrics", "audit_data/{site}/copy_metrics.json", "you/we, jargon, hedges, proof, CTA counts"],
  ["CSS metrics", "audit_data/{site}/css_metrics.json", "tokens, colors, transitions, keyframes, breakpoints"],
  ["JS motion metrics", "audit_data/{site}/js_motion_metrics.json", "motion-library pattern counts, durations, easings"],
  ["JS library scan", "audit_data/{site}/js_libs.json", "stack signatures (motion, Lenis, SplitType)"],
  ["Vision critiques", "audit_data/{site}/vlm_*.json", "design-review findings quoted in Chapter 5"],
  ["Screenshots", "audit_data/{site}/**/*.png", "full-page captures incl. subpages"],
  ["Benchmark metrics", "audit_data/collins/metrics.json", "COLLINS reference numbers (prior crawl)"],
 ],
 [0.24, 0.38, 0.38],
 "Table 7 — Evidence map. Scripts: fetch_tangison.py, fetch_missing_studio.py, extract_copy.py, harvest_tangison.py, analyze_js_motion.py, analyze_copy.py, make_charts_tangison.py."),
]},
]
