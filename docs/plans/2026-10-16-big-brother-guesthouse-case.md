# Plan: Big Brother Guest House as a completed studio case (PART C)

Date: 16 October 2026. Status: PROPOSAL, awaiting owner approval. No code changed yet. Target: studio.tangison.com (repo tangison/tangison-studio, Vercel project tangison-studio, git deploys work on this project).

## Facts gathered from the live site (bigbrotherguesthouse.com, fetched 16 October 2026, HTTP 200)

- Name: Big Brother Guesthouse. Positioning: "Home away from home, halfway to everywhere." Location: Usakos, on the B2, between Windhoek and Swakopmund (the site's own words: halfway to Swakopmund).
- Offer: rooms from N$450 (site meta), restaurant and bar on site, pools, lapa, secure parking. Sections: Rooms and Rates, Facilities, Plot 7, Gallery, VIP Card, Contact, Restaurant.
- Booking channels: WhatsApp bookings, Booking.com, SafariNow, Agoda, TripAdvisor links, Google Maps directions. Email: bigbrotherguest@gmail.com. Phones on site: +264 81 264 7606 and +264 81 302 9522.
- Full-page desktop screenshot captured and stored for the case page (session work directory; it will be added as public/images/work/screenshots/full/bigbrotherguesthouse-full.webp, resized to match the existing screenshot set's width class).

Nothing below invents facts: every line of case copy is traceable to the live site fetch above.

## Changes (one commit, after approval)

1. src/lib/projects.ts: new Project entry inserted at the TOP of the array (newest first, matching c4restaurant's precedent), making it case 24.
   - slug: "bigbrotherguesthouse"
   - name: "Big Brother Guesthouse"
   - title: "Big Brother" (tight caption name)
   - category: "Guesthouse and restaurant"
   - eyebrow: "Guesthouse and Restaurant · Usakos · 2026"
   - short: "Home away from home, halfway to everywhere." (their own line, quoted as positioning)
   - description: rooms from N$450 on the B2 in Usakos, restaurant, bar, pools, lapa, secure parking, bookings through WhatsApp and the platforms guests already use.
   - tags (services delivered, house set): Website Design, Website Development, Content Structure
   - live: "https://bigbrotherguesthouse.com"
   - tech: to be confirmed from the delivered build (if unconfirmed, omit tech rather than guess)
   - case content (challenge/approach/craft/outcome): written in the house voice, facts from the fetch; challenge = a guesthouse on the B2 needing bookings without an engine, guests deciding between two cities; approach = rooms and rates, facilities, gallery, and a WhatsApp-first booking path plus the platforms (Booking.com, SafariNow, Agoda) guests arrive on; craft = the four sections, mobile-first, Usakos answers (directions, phone, email); outcome = live at bigbrotherguesthouse.com, bookings through WhatsApp. Each claim checked against the fetch; no invented numbers, no invented review quotes.
2. Case painting: public/images/paintings/projects/bigbrotherguesthouse.webp via the studio Pollinations pipeline (scripts/generate_images.py), soft pastel style, pinned seed, 0.6px gaussian, webp q84, exactly as the three cases from the last wave. Prompt draft: "Soft impressionist painting of a small guesthouse courtyard at dusk in a Namibian desert town, warm lamplight over a veranda, distant dark hills, quiet and welcoming, muted pastel palette, gentle brush strokes, no text, no watermark". VLM blind-style check against two reference case paintings (c4restaurant, kalinasho) before acceptance, re-rolled until it passes, same as last wave.
3. Live-proof screenshot: SCREENSHOTS map entry in src/app/cases/[slug]/page.tsx pointing at the captured full-page shot (resized to the existing screenshots' working width), so the case page renders the Visit the live site block with the real site proof.
4. Flow, checked against every surface the last wave touched:
   - Homepage featured and trust rows read projects.slice(0, 5): the new case enters automatically; no manual count edits anywhere (counts are dynamic).
   - Cases grid and search index: automatic from the projects array (search index regenerated at build).
   - Case card: Preview case chip automatic; Live site chip automatic because live is set.
   - sitemap: dynamic.
   - Counts in copy ("All N cases", footer, about): verified dynamic in the last wave; re-verify in build output.
5. Verification (the house bar): bun install && build, lint 0, Playwright screenshots desktop + 375 of home, /cases, and the new case page, VLM check of the painting style and the screenshot block, live check after Vercel's git deploy (this project deploys green from push), no console errors.

Commit: "New case: Big Brother Guesthouse (Usakos, B2) - guesthouse and restaurant site; case count 23 -> 24; soft-style painting; live screenshot proof"

## Open items for the owner

1. Confirm tech stack tags (or leave tech empty).
2. Confirm the eyebrow year (2026) and whether the VIP Card angle should be mentioned in the case copy.
3. The painting seed: first accepted roll is recorded in the commit, per house convention.
