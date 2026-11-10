# Landing Page Conversion Audit: studio.tangison.com

Date: 2026-11-10. Standard: `autonnel/autonnel-skills` landing-page-conversion-audit.
Inputs received: page URL only (rendered DOM + screenshot at 390x844 in a real
browser). Not received: traffic source / ad sample, sessions and conversions,
funnel drop-off, device split. No paid traffic is running, so every
quantitative claim below is an estimate; findings ranked by first-principles
friction.

## Verdict

The page was the problem, once, and only once: the first phone viewport
carried no call to action at all. A first-time visitor saw the slogan, a
still image and the client strip; the only next steps were scrolling or
opening the menu. For a studio whose conversion is a project brief, the
fold argued with itself. That is fixed this wave: one primary button now
sits under the slogan. The second gap was total: the site shipped with no
analytics at all, so nothing on it could ever be optimised. Also fixed.
Everything downstream (offer clarity, form friction, trust, post-submit
path) was already in good shape.

## Fix now (ordered by expected impact)

1. Above-the-fold CTA - no primary action visible at 390x844; the fold
   ended at the client strip → "Start a project" (primary) and "See the
   work" (outline) added under the slogan, image unchanged | effort: S |
   confidence: high | FIXED (commit bfad9fc)
2. Measurement - zero analytics, zero conversion events → Vercel
   Analytics added site-wide; `track("brief_submitted")` fires on a real
   form send | effort: S | confidence: high | FIXED (commit bfad9fc)

## Test, don't guess

When traffic justifies it, A/B the primary label ("Start a project" vs
"Start a conversation"), judged on brief_submitted per session. Also
worth watching, not testing yet: whether the CTA row pulls attention
from the film below it; judge on scroll depth once analytics accumulates.

## Not a problem

- Form friction: one page, seven fields, four required (name, email,
  the brief, one arithmetic human check), honeypot, optional timeline
  and budget. Inline validation via native constraints and labels.
- Trust at the moment of action: real client marks linking to the
  clients' own sites, honest case studies, founder-led about page.
- Post-submit: "Brief received" sets the reply-time expectation (two
  working days) with a send-again path; WhatsApp and mailto routes
  remain visible.
- Client counts ("All 29 cases", "and 24 more") compute from the data
  file and update themselves.
- Price hidden: correct for custom studio work.
- All images carry dimensions; no third-party render-blocking scripts.

## Could not check

- Sessions, conversions, funnel steps, device split: not provided and
  not previously collected (no analytics existed). Everything above is
  structural, not statistical.
- Field LCP: not measured in this audit.
- Click id carrying: no paid traffic; revisit server-side tracking if
  ads ever run.
