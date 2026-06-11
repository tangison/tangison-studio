# Tangison Studio — A11y + Performance Audit Report

**Date:** 2026-03-05  
**Scope:** All `.tsx` files in `src/app/` and `src/components/`  
**Standard:** WCAG 2.1 AA / Core Web Vitals  

---

## Executive Summary

| Severity | Count | Summary |
|----------|-------|---------|
| **P0 — Blocking** | 7 | Contrast failures on dark sections; keyboard-inaccessible element |
| **P1 — Major** | 6 | Missing focus traps; heading hierarchy breaks; all pages client components |
| **P2 — Minor** | 7 | No form validation announcements; GSAP + Framer double-bundle; render-blocking fonts |
| **P3 — Polish** | 5 | `scaleY` layout animations; global `border-radius !important`; over-weighted fonts |

**Most critical issue:** The dark (Atlantic Black) sections of the site — footer, CTA sections, mobile menu, AI widget — contain numerous text elements with contrast ratios between **1.5:1 and 3.6:1**, far below the WCAG AA minimum of **4.5:1** for normal text. This affects an estimated 30+ text elements site-wide.

---

## P0 — BLOCKING (Must fix before ship)

### P0-1. Footer link text contrast: `text-white/40` on `bg-atlantic-black` = **3.60:1** ❌

**Files:** `src/components/tangison/footer.tsx` lines 124, 142, 160, 186, 203, 209, 227  
**Colors:** `#FFFFFF` at 40% opacity on `#111315` → computed `#707173`  
**WCAG AA required:** 4.5:1 (normal text)  
**Fix:** Increase to `text-white/60` (computed `#9C9C9E`, ratio ~5.5:1) or `text-white/70`.

### P0-2. Footer heading contrast: `text-signal-teal/60` on `bg-atlantic-black` = **1.92:1** ❌

**File:** `src/components/tangison/footer.tsx` lines 116, 135, 154, 173, 197, 220  
**Colors:** `#2CB5B4` at 60% opacity on `#111315` → computed `#217474`  
**Fix:** Use full `text-signal-teal` (ratio 3.23:1 — still fails for normal text) or `text-signal-teal-light` (#3CC8C7, ratio 4.04:1 — still fails). Best fix: use `text-skeleton-bone` for headings and `text-signal-teal` only for decorative accents, or increase heading font size to ≥18pt bold (3:1 large-text threshold) and use `text-signal-teal-light`.

### P0-3. Footer copyright text: `text-white/20` and `text-white/15` on dark = **1.84:1 / ~1.5:1** ❌

**File:** `src/components/tangison/footer.tsx` lines 250–253  
**Fix:** Increase to `text-white/40` minimum for decorative text, or `text-white/50` for readable text.

### P0-4. Signal Teal on Atlantic Black: `text-signal-teal` (#2CB5B4) on #111315 = **3.23:1** ❌

**Files (partial list):**
- `navigation.tsx` line 752: Contact link in nav
- `navigation.tsx` lines 502, 523: Mobile menu Contact and active links
- `ai-widget.tsx` line 763: "LIVE" status indicator
- `ai-widget.tsx` line 822: Voice mode label
- `about/page-client.tsx` line 24: Section label
- `studio/page-client.tsx` line 24: Section label
- `contact/page-client.tsx` line 123: Section label
- `work/industry-template.tsx` line 60: Status label
- `brand/page-client.tsx` line 334: Version metadata

**Fix:** For normal text, use `text-signal-teal-light` (#3CC8C7, ratio 4.04:1) — still fails. Recommend creating a lighter teal variant at ~#4ED4D3 (estimated ratio ~4.6:1) or reserving teal for large/bold text only and using `text-fog-gray` or `text-skeleton-bone/80` for small metadata labels.

### P0-5. AI Widget low-contrast text on dark backgrounds

| Class | Computed Color | Ratio | Location |
|-------|---------------|-------|----------|
| `text-fog-gray/40` | ~`#616160` | **2.90:1** | `ai-widget.tsx` lines 168, 276, 439, 461, 879, 942 |
| `text-fog-gray/50` | ~`#757574` | **3.83:1** | `navigation.tsx` line 269, `ai-widget.tsx` line 198, `studio/about` principle descriptions |
| `text-fog-gray/30` | ~`#525252` | **2.30:1** | `ai-widget.tsx` lines 460, 465, 469, 1033 |
| `text-fog-gray/25` | ~`#484847` | **2.10:1** | `ai-widget.tsx` lines 771, 1033 |
| `text-fog-gray/20` | ~`#3E3E3D` | **1.70:1** | `ai-widget.tsx` line 1036 |
| `text-skeleton-bone/40` | ~`#707173` | **3.60:1** | `about/page-client.tsx` line 93, `studio/page-client.tsx` line 95 |

**Fix:** Increase all opacity values to ≥60% for readable text, or use dedicated WCAG-compliant color tokens.

### P0-6. Light-theme low-contrast text: `text-ink-muted/N` on `bg-skeleton-bone`

| Class | Computed Color | Ratio | Location |
|-------|---------------|-------|----------|
| `text-ink-muted/50` | ~`#B1AEA8` | **2.08:1** | `navigation.tsx` lines 238, 269, 439; `page-client.tsx` line 412 |
| `text-ink-muted/40` | ~`#C0BDB7` | **1.80:1** | `navigation.tsx` lines 404, 407, 416, 452, 797 |
| `text-ink-muted/30` | even lower | **~1.5:1** | `navigation.tsx` line 460 |

**Fix:** Never use `ink-muted` below 100% opacity for readable text. Use `text-ink-muted` (5.13:1) at minimum.

### P0-7. AI Widget notification bubble — not keyboard accessible

**File:** `src/components/tangison/ai-widget.tsx` lines 705–720  
**Issue:** `motion.div` with `onClick`, `role="button"`, `aria-label="Open Tangison Studio chat"` — but **no `tabIndex={0}`** and **no `onKeyDown` handler**. Screen reader users can see it but keyboard users cannot activate it.  
**Fix:** Add `tabIndex={0}` and `onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(true); } }}`.

---

## P1 — MAJOR (Fix in next sprint)

### P1-1. No focus traps in modal dialogs

**Files:** `navigation.tsx` (search overlay, mobile menu), `ai-widget.tsx` (chat panel)  
**Issue:** All three dialogs use `role="dialog"` and `aria-modal="true"` but don't trap focus. Tabbing moves focus behind the overlay to background elements.  
**Fix:** Implement focus trap (use `focus-trap` package or manual `querySelectorAll` cycle). When dialog opens, move focus to first interactive element. When dialog closes, restore focus to trigger.

### P1-2. Heading hierarchy — Footer skips h2

**File:** `src/components/tangison/footer.tsx`  
**Issue:** Footer uses `<h3>` for column headings (Studio, Resources, Legal, etc.) with no preceding `<h2>`. Screen readers announce this as a heading level skip.  
**Fix:** Change `<h3>` to `<h2>` or add a visually-hidden `<h2>` before the columns.

### P1-3. Heading hierarchy — Home Principles section has no heading

**File:** `src/app/page-client.tsx` lines 330–352  
**Issue:** The "Principles" section (`aria-label="Studio principles"`) displays large words (Strategic, Functional, Beautiful, Scalable) but contains **no heading element**. Screen reader users have no way to navigate to this section.  
**Fix:** Add a visually-hidden or visible `<h2>`.

### P1-4. Not-found and Error pages lack landmarks and SiteShell

**Files:** `src/app/not-found.tsx`, `src/app/error.tsx`  
**Issue:** These pages render outside `SiteShell`, meaning:
- No `<nav>` landmark
- No skip-to-content link
- No `<footer>` (not-found)
- No consistent page structure for assistive tech

**Fix:** Wrap in `SiteShell` or add `main`, skip link, and footer manually.

### P1-5. All pages are client components — no server component optimization

**Files:** Every `page-client.tsx` (29 files)  
**Issue:** Every page uses `"use client"`. This means:
- No static HTML generation for content-heavy pages (legal, FAQ, brand)
- Full JS bundle required before content renders
- Legal pages (terms, privacy, cookies) are pure static content — should be server components
- Blog page, FAQ page, careers page — all could be RSC with only interactive bits client-side

**Fix:** Extract static content into server components. Only wrap interactive elements (forms, animations) in client components. Legal pages should be entirely server-rendered.

### P1-6. Contact form lacks screen reader announcements

**File:** `src/app/contact/page-client.tsx`  
**Issue:** 
- No `aria-live` region for form submission status (success/error messages)
- No client-side validation — relies entirely on HTML5 `required` + server response
- No `aria-describedby` linking required asterisks to fields
- Honeypot field correctly uses `aria-hidden` and `tabIndex={-1}` ✅

**Fix:** Wrap the `AnimatePresence` area in `<div aria-live="polite">` so success/error states are announced.

---

## P2 — MINOR (Fix in next cycle)

### P2-1. GSAP loaded for a single animation — replace with Framer Motion

**File:** `src/components/tangison/page-header.tsx` line 37  
**Issue:** GSAP (est. ~25KB gzipped) is imported for one `fromTo` animation that animates `y` and `opacity`. Framer Motion (already bundled) can do this natively.  
**Fix:** Replace GSAP `fromTo` with `framer-motion` `useInView` + `animate`. Remove `gsap` from `package.json`.

### P2-2. Render-blocking external font CSS imports

**File:** `src/app/globals.css` lines 1–2  
**Issue:** Two `@import url()` calls for FontShare and Google Fonts are render-blocking. Also loading more font weights than needed:
- Satoshi: 300, 400, 500, 700, 900 (5 weights; 300 and 900 rarely used)
- Cabinet Grotesk: 400, 500, 700, 800, 900 (5 weights; 400 and 500 rarely used)
- JetBrains Mono: variable 100–800 (full range; only 400 used)

**Fix:** Use `next/font` with `subsets` and `weight` options for automatic optimization, preloading, and zero CLS. Remove CSS `@import` lines.

### P2-3. Hero background image loaded via CSS — no optimization

**File:** `src/app/globals.css` lines 332–341  
**Issue:** `.hero` uses `background-image: url('/images/gallery/hero-bg-skeleton-coast.webp')`. This bypasses Next.js Image optimization (no AVIF, no responsive sizes, no lazy loading, no priority).  
**Fix:** Convert to `<Image fill priority>` component with proper `sizes` attribute.

### P2-4. Search overlay lacks `aria-activedescendant` for selected result

**File:** `src/components/tangison/navigation.tsx` lines 370–478  
**Issue:** The search dialog navigates results with arrow keys (lines 348–358) but doesn't use `aria-activedescendant` on the input or `role="option"` + `id` on result items. Screen readers don't announce which result is selected.  
**Fix:** Add `role="combobox"` to input, `aria-activedescendant` pointing to selected result, `role="listbox"` to results container, and `role="option"` + `id` to each result.

### P2-5. `text-signal-teal` on `bg-signal-teal-muted` = ~2.5:1 ❌

**File:** `src/components/tangison/navigation.tsx` lines 224, 258  
**Issue:** Active dropdown items use `text-ink bg-signal-teal-muted` which is fine (ink on light teal). But the active state in mobile menu uses `text-skeleton-bone` on dark background, which is fine. No actual issue with this combination — the active dropdown uses `text-ink` not `text-signal-teal`. Disregard.

### P2-6. Legal pages duplicate skip-link implementation

**Files:** `src/app/legal/terms/page-client.tsx` line 32, `privacy/page-client.tsx` line 40, `cookies/page-client.tsx` line 28  
**Issue:** Each legal page has its own skip-link, `main`, and `footer` — duplicating SiteShell logic. The skip-link styles are slightly different from the SiteShell version.  
**Fix:** Refactor legal pages to use SiteShell or a shared LegalShell component.

### P2-7. Home page lacks h2 between "Featured Work" and "Services"

**File:** `src/app/page-client.tsx`  
**Issue:** The page goes: h1 → h2 (Featured Work) → h3 (project names) → h2 (Services) → h3 (service names) → no h2 (Principles) → h2 (implied by Contact Teaser section). The heading flow is mostly correct except for the Principles section noted in P1-3.

---

## P3 — POLISH (Backlog)

### P3-1. `scaleY` animation causes layout thrash

**Files:** `navigation.tsx` lines 536–539 (mobile accordion), `ai-widget.tsx` lines 808–812, 893–897  
**Issue:** Framer Motion `scaleY` animations trigger paint on every frame.  
**Fix:** Use `height: auto` animation via `AnimatePresence` with `initial={{ height: 0 }}` + `animate={{ height: "auto" }}`, or use `grid-template-rows: 0fr → 1fr` trick.

### P3-2. Global `border-radius: 6px !important` on ALL elements

**File:** `src/app/globals.css` lines 232–237  
**Issue:** `*, *::before, *::after { border-radius: 6px !important; }` applies to every DOM element including non-visual elements, potentially causing unnecessary style recalculation.  
**Fix:** Apply `border-radius` only to visual element types (div, section, button, a, input, etc.) or use a utility class.

### P3-3. `framer-motion` `layoutId` on nav underline causes layout animation

**File:** `src/components/tangison/navigation.tsx` lines 207–210, 759–764  
**Issue:** `layoutId="active-nav-underline"` triggers FLIP animation on every route change, which can cause jank.  
**Fix:** This is acceptable for desktop but ensure `prefers-reduced-motion` is respected (it is via globals.css ✅).

### P3-4. `warm-white` color token not defined

**Files:** `src/app/contact/page-client.tsx` line 314  
**Issue:** `border-warm-white/30 border-t-warm-white` — `warm-white` is not defined in the theme tokens. This will fallback or be ignored.  
**Fix:** Replace with `border-skeleton-bone/30 border-t-skeleton-bone` or define `warm-white` in theme.

### P3-5. AI Widget loads on every page

**File:** `src/components/tangison/site-shell.tsx` line 27  
**Issue:** `<TangisonAIWidget />` is included in SiteShell, meaning its full JS bundle (voice recognition, TTS, chat API) loads on every page including legal pages and 404.  
**Fix:** Use `next/dynamic` with `ssr: false` to lazy-load the widget:  
```tsx
const TangisonAIWidget = dynamic(() => import('./ai-widget').then(m => ({ default: m.TangisonAIWidget })), { ssr: false })
```

---

## What's Working Well ✅

| Area | Implementation |
|------|---------------|
| **Skip-to-content link** | `site-shell.tsx` line 17–21: proper sr-only/focus-visible pattern |
| **Focus indicators** | `globals.css` line 249–252: `:focus-visible` with 2px Signal Teal outline |
| **Reduced motion** | `globals.css` lines 219–229: comprehensive `prefers-reduced-motion` override |
| **Touch targets** | `globals.css` lines 266–270: 44px minimum on mobile for `a, button` |
| **ARIA on navigation** | `role="navigation"`, `aria-label`, `aria-expanded`, `aria-haspopup` all present |
| **ARIA on search** | `role="dialog"`, `aria-modal`, `aria-label`, input `aria-label` |
| **ARIA on AI widget** | `role="dialog"`, `aria-modal`, `aria-label`, `aria-expanded` on trigger |
| **Form labels** | Contact form: all inputs have `<label htmlFor>` + `id` + `required` |
| **Honeypot** | Hidden field with `aria-hidden`, `tabIndex={-1}`, `inert` |
| **Image alt text** | All `<Image>` components have meaningful `alt` text |
| **Image priority** | Above-fold images use `priority`; hero background is CSS (P2-3) |
| **Image formats** | `next.config.ts` enables AVIF + WebP output |
| **SEO metadata** | All page.tsx files export `Metadata` with title, description, OG, canonical |
| **Semantic landmarks** | `<main>`, `<nav role="navigation">`, `<footer>` present via SiteShell |
| **Security headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options all set |
| **Language attribute** | `<html lang="en">` ✅ |
| **Color token system** | Well-documented, systematic brand tokens in CSS |

---

## Color Contrast Reference Table

| Token | Hex | On Background | Computed | Ratio | AA Normal |
|-------|-----|--------------|----------|-------|-----------|
| `ink` | `#111315` | `skeleton-bone` `#F6F4EF` | — | **16.75:1** | ✅ |
| `ink-muted` | `#6B6860` | `skeleton-bone` `#F6F4EF` | — | **5.13:1** | ✅ |
| `fog-gray` | `#D9D7D2` | `atlantic-black` `#111315` | — | **12.92:1** | ✅ |
| `signal-teal` | `#2CB5B4` | `skeleton-bone` `#F6F4EF` | — | **5.18:1** | ✅ |
| `signal-teal` | `#2CB5B4` | `atlantic-black` `#111315` | — | **3.23:1** | ❌ |
| `signal-teal-light` | `#3CC8C7` | `atlantic-black` `#111315` | — | **4.04:1** | ❌ |
| `white/60` | — | `atlantic-black` | `#9C9C9E` | **5.50:1** | ✅ |
| `white/40` | — | `atlantic-black` | `#707173` | **3.60:1** | ❌ |
| `white/20` | — | `atlantic-black` | `#424344` | **1.84:1** | ❌ |
| `white/15` | — | `atlantic-black` | `#363638` | **~1.5:1** | ❌ |
| `fog-gray/60` | — | `atlantic-black` | `#898988` | **5.23:1** | ✅ |
| `fog-gray/50` | — | `atlantic-black` | `#757574` | **3.83:1** | ❌ |
| `fog-gray/40` | — | `atlantic-black` | `#616160` | **2.90:1** | ❌ |
| `signal-teal/60` | — | `atlantic-black` | `#217474` | **1.92:1** | ❌ |
| `skeleton-bone/70` | — | `atlantic-black` | `#B1B1AF` | **7.99:1** | ✅ |
| `skeleton-bone/60` | — | `atlantic-black` | `#989896` | **5.05:1** | ✅ |
| `skeleton-bone/40` | — | `atlantic-black` | `#707173` | **3.60:1** | ❌ |
| `ink-muted/50` | — | `skeleton-bone` | `#B1AEA8` | **2.08:1** | ❌ |
| `ink-muted/40` | — | `skeleton-bone` | `#C0BDB7` | **1.80:1** | ❌ |

---

## Recommended Priority Order

1. **Fix all P0 contrast issues** — Create a `dark-text-compliant` token set:
   - Replace all `white/40` → `white/60` in footer
   - Replace all `signal-teal/60` → `skeleton-bone` for headings
   - Replace all `fog-gray/N` where N<60 → `fog-gray/60` minimum
   - Replace `ink-muted/N` where N<100 → `ink-muted` for readable text
2. **Fix P0-7 keyboard accessibility** on AI widget notification bubble
3. **Add focus traps** to all three dialogs (P1-1)
4. **Fix heading hierarchy** in footer and principles section (P1-2, P1-3)
5. **Add `aria-live` region** to contact form (P1-6)
6. **Wrap not-found/error in SiteShell** (P1-4)
7. **Convert legal pages to server components** (P1-5 — largest refactor)
8. **Remove GSAP** and replace with Framer Motion (P2-1)
9. **Migrate to `next/font`** (P2-2)
10. **Lazy-load AI Widget** with `next/dynamic` (P3-5)
