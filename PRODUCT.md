# PRODUCT.md — Tangison Studio Website

**Project:** Tangison Studio marketing site and editorial portfolio
**Live URL:** https://tangison-studio.vercel.app (auto-deploys from `main`)
**Repo:** `github.com/tangison/tangison-studio`
**Owner:** Tangison Systems (Pty) Ltd · Windhoek, Namibia
**Author:** Tangi Iigonda · Studio Lead

---

## 1. What this product is

Tangison Studio is a premium, editorial-style marketing website that positions the studio as a world-class design agency operating from Windhoek, Namibia. It is the public digital face of the studio: a static Next.js site that doubles as a portfolio, a brand-system document, and a working storefront for new client enquiries.

The site is built around five convictions that show up in every page:

1. **One studio instead of three vendors.** Brand, product, and intelligence work under one roof, not stitched across three suppliers.
2. **Built from Windhoek for Africa.** The studio is local to the Namibian market and writes for that market explicitly. It does not pretend to be a remote international agency.
3. **Honesty as positioning.** No fabricated metrics, no inflated claims, no fake testimonials. Every case study states what the studio actually built and what it did not build.
4. **Brand is behaviour, not decoration.** The brand lives in how the site behaves (motion, typography, contact paths) not in decoration layered on top.
5. **The work is the proof.** Each case study links to a live client site the visitor can verify themselves. Nothing is shown as a mock-up that is not also shipped.

---

## 2. Who it is for

The site serves three primary audiences.

**Founders and operators of growing Namibian businesses.** This is the dominant audience. They run a real business (logistics, fuel, hospitality, professional services, beauty, education, agri-processing), they have outgrown a Facebook page, and they need a website that earns its place. They want a partner who can deliver brand, site, and product in one engagement.

**Marketing and product leads at established SADC-region organisations.** They have an existing digital presence that underperforms. They need an outside studio to design a brand system, ship a website, or build a working product. They will read the case studies, the brand-system page, and the process page before reaching out.

**Design and technology peers.** Other practitioners who find the studio through writing (the blog), through the brand-system page, or through case studies. They may become collaborators, referrers, or future hires.

---

## 3. What the product does (functional surface)

### Public pages

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, featured work, services summary, process, principles, CTA |
| `/work` | Portfolio index of 13 case studies |
| `/work/[slug]` | Individual case study page with challenge / approach / craft notes / outcome |
| `/services` | Services index (Studio service, Intelligence service) |
| `/process` | Five-phase delivery process |
| `/about` | Studio background and approach |
| `/studio` | Studio info, location, working method |
| `/brand` | Brand System v1.0 documentation, exportable as Markdown |
| `/blog` | Blog index of 19 articles |
| `/blog/[slug]` | Individual article page |
| `/resources` | Downloadable PDF resources (26 AI playbooks) |
| `/partnership` | Partnership tiers (Plan Partner, Plan Care, Plan Studio Plus) |
| `/contact` | Contact form posting to `/api/contact` |
| `/careers` | Careers (currently a coming-soon shell) |
| `/faq` | Frequently asked questions |
| `/legal/privacy` `/legal/terms` `/legal/cookies` | Legal pages |
| `/sitemap.xml` `/robots.txt` | SEO routes |

### Case study data

13 case studies live in `src/lib/case-studies.ts`, each with:

- `slug`, `name`, `url`, `year`, `industry`, `services[]`, `tech[]`
- `descriptor` (one-line summary used on cards)
- `challengeH2` / `challengeBody[]` — what the client faced
- `approachH2` / `approachBody[]` — how the studio approached it
- `craftNotes[]` — 3 labelled notes on specific decisions
- `outcomeH2` / `outcomeBody[]` — what shipped and what changed
- `nextSlug` — the next case study in the navigation loop
- `era?` — set to "Gemsweb Digital era" for projects shipped under the prior brand
- `internal?` — set to `true` for studio-owned projects

The two case studies added in this build are:

- **dieselman** — Dieselman Nam (`dieselman-nam.com`), Walvis Bay mobile diesel service and wheel alignment. Phone-first information architecture.
- **enchanted** — Enchanted Artistry CC (`enchantedna.com`), Windhoek cosmetology and mentorship. Two-founder brand with dual WhatsApp paths.

### Blog content

19 articles live in `src/lib/blog.ts`, each with `slug`, `title`, `excerpt`, `date`, `category`, `tags[]`, `readingTime`, `cover` (WebP painting), and `content[]` (heading + body paragraphs).

The seven articles added in this build are Namibian-business and studio-craft themed:

1. `why-namibian-businesses-need-a-website-that-belongs-to-them`
2. `the-cost-of-looking-like-everyone-else-online`
3. `building-for-windhoek-design-decisions-that-match-the-market`
4. `oil-paint-and-pixels-why-we-work-the-way-we-do`
5. `what-your-website-says-before-you-say-a-word`
6. `from-sketch-to-site-the-tangison-process`
7. `namibia-on-the-screen-designing-for-local-realities`

### API routes

| Route | Purpose |
|---|---|
| `/api/chat` | AI studio assistant powered by `z-ai-web-dev-sdk` |
| `/api/contact` | Contact form handler |
| `/api/tts` | Text-to-speech endpoint |
| `/api/asr` | Speech-to-text endpoint |
| `/api/version` | Build/version info |

The AI widget is optional. If `z-ai-web-dev-sdk` is unavailable, the site still renders fully; only the chat assistant is degraded.

### Resources

26 downloadable PDF playbooks in `public/documents/`, including the AI Blueprint for Namibian Business, AI Maturity Framework, AI ROI Playbook, and 23 sector-specific AI guides (Mining, Agriculture, Tourism, Banking, Healthcare, Education, etc.). These are served from the `/resources` page with cache headers set in `vercel.json`.

---

## 4. Capabilities (how the studio describes itself)

The studio describes two capabilities rather than three:

- **Studio** — Brand, web, and product design work
- **Intelligence** — AI-assisted product and workflow work

The previous three-capability structure (brand, product, intelligence) was retired in commit `d8458b1` in favour of a tighter two-capability positioning. The `tests/studio.test.ts` suite still asserts the old three-capability structure; this is documented in PROOF.md as a pre-existing test drift unrelated to this build.

---

## 5. Brand behaviour on the site

- **Voice:** Corey Haines copywriting rules. No superlatives. No passive voice. Every sentence earns its place. Direct, confident, understated.
- **Headlines:** Active verb, concrete noun, no adjectives for their own sake.
- **Body:** Sentence length varies. Paragraph length 2–4 sentences. Section length 150–300 words.
- **Contact paths:** Real phone numbers and email addresses appear on the case study pages and the contact page. They are verifiable.
- **Motion:** `cubic-bezier(0.16, 1, 0.3, 1)` ("Studio Ease"). Entrance 600ms standard, 1000ms hero, 1200ms dramatic. `prefers-reduced-motion` fully supported.
- **Pricing:** No public pricing. The `/partnership` page shows three tiers (Plan Partner, Plan Care, Plan Studio Plus) as positioning anchors, not transactional offers.

---

## 6. What this product is NOT

- It is not a SaaS application. There is no authentication, no user database, no per-user state.
- It is not an e-commerce site. There is no checkout, no cart, no payment flow.
- It is not a CMS-backed publishing platform. Content lives in TypeScript files. The trade-off is editorial control and build-time safety, at the cost of non-developer authoring.
- It is not a mobile app. It is a website built mobile-first at 375px, scaling up to 1440px+.

---

## 7. Quality bar

Every change to `main` must pass:

- `npm run typecheck` — `tsc --noEmit`, zero errors
- `npm run lint` — `eslint . --max-warnings=0`, zero errors and zero warnings
- `npm run build` — `next build`, all static pages generate
- `npm run test` — `vitest run`, no new failures introduced (pre-existing failures are documented in PROOF.md)
- Manual responsive check at 320, 375, 414, 768, 1024, 1280, 1440 pixels

When a change does not pass all five, it does not ship to `main`.

---

## 8. Maintenance

- **Content edits** — Update `src/lib/case-studies.ts` (case studies) or `src/lib/blog.ts` (blog posts). Rebuild.
- **Brand edits** — Update `src/app/brand/page.tsx` (the brand-system document is code) or `src/app/globals.css` (design tokens). The `/brand` page renders the brand system as the source of truth.
- **New service pages** — Add under `src/app/services/`.
- **New case study images** — Drop `.webp` files under `public/images/paintings/projects/` and update `projectPaintings` map in `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx`.
- **New blog cover** — Drop `.webp` under `public/images/paintings/blog/` and reference via `cover` in `blog.ts`.

---

<!-- Tangison Studio — tangison.com -->
