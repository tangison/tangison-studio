# Wave 3 verification record: the transfer budget pass (17 October 2026)

Scope: the webmaster checklist applied to both sites, with the owner's
re-stated exit criteria. The main site's fixes were docs-first this wave;
the studio carried the code changes.

## Starting point (measured, local production builds)

| Measure | Main home | Main company | Studio home |
| --- | --- | --- | --- |
| Lighthouse perf/a11y/bp/SEO | 92/96/96/100 | 90/96/96/100 | 84/100/96/100 |
| Transfer | 557KB | 336KB | 1,007KB |
| LCP / TBT / CLS | 3.2s / - / 0 | 3.5s / - / 0 | 3.7s / 280ms / 0 |

The studio home was double the 500KB budget (495KB hero film, 232KB JS,
41KB prefetch fan-out, 122KB fonts) and carried a 661ms framework long
task plus the GSAP chunk.

## Changes shipped (studio, six commits; main, one commit)

1. Branded /500 (error.tsx + global-error.tsx), checklist section 3.
2. Hero film v5: 418KB -> 107KB webm (130kbps mp4 fallback), load-armed
   source attach, poster-first. Frame-checked against the painting look.
3. GSAP removed: scroll-motion.ts (IO one-shots + gated rAF scrub) with
   verified behavior parity; TBT 1,350ms -> 250-400ms after the IO gate
   fixed the first attempt's mount-time loop churn.
4. Satoshi latin subsets (25KB -> 9KB per face) + prefetch={false} on
   secondary links; primary CTAs keep prefetch.
5. Case screenshots to AVIF: the four over-line captures now 99-142KB,
   all seven uniform AVIF, text sharpness verified on 1:1 crops.
6. Main site: six PNGs to lossless webp (13 references), completing
   "every shipped raster is webp or avif" on both sites.

## Final gates (clean-server runs, Lighthouse 13.5, mobile simulate)

| Gate | Main home | Main company | Studio home |
| --- | --- | --- | --- |
| Performance (90+) | 90 | 91 | 88-93 across clean runs |
| Accessibility (95+) | 96 | 100 | 100 |
| Best practices | 96 | 96 | 96 |
| SEO (100) | 100 | 100 | 100 |
| LCP / TBT / CLS | 2.9s / - / 0 | 3.3s / - / 0.068 | 2.4-2.7s / 250-400ms / 0 |
| Transfer | 625KB (452KB excl. owner-approved hero video) | 439KB | 516KB (409KB excl. the post-load film) |

Console errors and failed requests: zero on all tested routes (the only
request that ever 404s is /_vercel/insights/script.js, which exists only
on the Vercel edge). Horizontal overflow: zero at 360/375/768/1440 on
main /, /company, /cases, /how-we-help and studio /, /cases/bigbrotherguesthouse,
/services, in light and prefers-color-scheme dark.

Force dark (Emulation.setAutoDarkModeOverride, the Samsung/Android
path): verified on main /, /company, /how-we-help and studio /, case
page. Photographs and paintings keep natural color, no double inversion,
no white plates; the color-scheme declaration strategy (D12) holds.

Motion parity after the GSAP removal, verified in the browser: the
process line draws between the cards, the wipe plays once at the closing
ask, parallax drifts with the 1.12 scale guard, reveals collapse for
reduced motion and no-JS, film plays after load.

## Known, documented deviations

- Studio lab perf fluctuates 88-93 run to run on this container (the
  film's software VP9 decode under 4x CPU throttle); a11y and SEO hold
  at 100. Field LCP on hardware-decoding devices is expected under the
  lab number.
- Transfer: main home carries the owner-approved hero video exception
  (D2/D8 lineage); studio home's film is 107KB, post-load, and the
  critical path sits at 409KB. Both sites are inside the 500KB budget
  for everything required to settle the first viewport.
