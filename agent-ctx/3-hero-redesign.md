# Task 3: Hero Section Redesign & Padding Fix

## Agent: Code Agent
## Date: 2025-03-05

## Changes Made

### File: `/home/z/tangison-studio/src/app/page-client.tsx`

#### 1. Hero Section - Desktop Redesign (Two-Column Layout)

**Before:** Full-bleed background image slider with 70% bone overlay covering the entire hero. Text was placed on top of the washed-out image. The right column had a static editorial image (`hero-editorial-studio.webp`) that was disconnected from the slider.

**After:**
- **Desktop (lg+):** Clean two-column layout on pure `bg-skeleton-bone` background — no background image bleeding through behind the text.
  - Left column (6/12 cols, 7/12 on xl): Text content with label, headline, subtitle, CTA buttons, and slider indicators — all on a clean bone background.
  - Right column (6/12 cols, 5/12 on xl): Contained editorial image that cycles through the `heroImages` slider array. Includes:
    - Cinematic image treatment (`.cinematic-image` class preserved)
    - Editorial inner border frame (`border border-signal-white/20` with `inset-3`)
    - Caption below image with alt text and slide counter in JetBrains Mono
    - Smooth opacity-based crossfade between slides (no scale animation on the contained image)
- **Mobile (<lg):** Retained the full-bleed background slider but improved the overlay from `bg-skeleton-bone/70` to `bg-skeleton-bone/80` for better text readability.

#### 2. Padding Fix - Navigation Top Padding

**Before:** `min-h-screen flex items-end` with no top padding — content was pushed to the bottom and didn't account for the fixed navigation bar.

**After:**
- Added `pt-24 md:pt-32` to the content wrapper (96px mobile, 128px desktop) to properly clear the fixed navigation bar (~72px mobile, ~80px desktop)
- Changed layout from `items-end` to `flex flex-col justify-end lg:justify-center` — content aligns to bottom on mobile (above the full-bleed image) and centers vertically on desktop
- Adjusted bottom padding: `pb-20 md:pb-28 lg:pb-0` — no bottom padding needed on desktop since content is vertically centered

#### 3. Slider Indicators Repositioned

**Before:** Indicators were absolutely positioned at `bottom-8 left-6`, floating over the background image.

**After:** Indicators are inline, positioned below the CTA buttons in the left text column. Enhanced with:
- Thicker indicator bars (2px height instead of 1px)
- Wider active state (w-8 instead of w-6) and inactive state (w-4 instead of w-3)
- Added slide counter text in JetBrains Mono (e.g., "01 / 03")

#### 4. Headline Typography Refinement

- Adjusted font size clamp for better proportion in the two-column layout: `text-[clamp(2.4rem,5vw,4.5rem)] lg:text-[clamp(2.8rem,4.2vw,5.5rem)]`

### Preserved Functionality
- GSAP word-by-word animation on headline (`.hero-word` class and timeline)
- All FadeUp animations
- Auto-advancing image slider (5-second interval)
- Click-to-navigate slider indicators
- Scroll opacity fade (`heroOpacity` via `useScroll` + `useTransform`)
- All links and buttons (Explore Work, Start a Project)
- Bottom edge line separator

## Design System Compliance
- No gradients used
- No text-shadow or drop-shadow
- Sharp corners only (0px radius enforced by global CSS)
- Easing: cubic-bezier(0.16, 1, 0.3, 1) on all animations
- Typography: Cabinet Grotesk (headlines), Satoshi (body), JetBrains Mono (metadata)
- Motion durations: 0.6s-1.2s for entrances, 0.3s for hovers
