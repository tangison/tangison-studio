---
title: "Why We Build on Next.js (and What That Means for Clients)"
slug: "why-we-build-on-next-js"
description: "The engineering rationale behind our stack: static-first rendering, image and font handling, and why the technology choice shows up in the invoice as speed, not jargon."
keywords: [Next.js, React, web development framework, static site generation, website performance, web stack]
category: "Design & Build"
date: "2026-08-21"
readingMinutes: 3
image: /images/paintings/blog/why-we-build-on-next-js.webp
imageAlt: "Soft still life of neatly stacked wooden blocks and a small tool on a workbench in warm light."
author: "Tangi Iigonda"
---



Clients rarely ask what framework their website is built on, which is correct, the question is what the framework makes possible. We build on Next.js, and the choice shows up in outcomes clients do feel: how fast pages load, how well the site ranks, how cheap it is to host, and how easily it grows. Here is the reasoning, translated.

## Static by default, dynamic where needed

Next.js lets us pre-build every page at deploy time, so when a visitor arrives the page is already finished, the server hands over a file instead of assembling a page per visit. For a business site, a case study, or an article, that is strictly better: dramatically faster responses, dramatically cheaper hosting, and less to break.

Where genuine interactivity is needed (an enquiry endpoint, a search, live data) those specific pieces run dynamically while everything around them stays static. The framework draws that line per-feature instead of forcing the whole site to one side of it.

## Images and fonts handled properly

Most of the page-weight problems we find in [audits](/audit) come from images treated carelessly: full-resolution originals served to phones. Next.js treats image handling as infrastructure, automatic modern formats, correct sizes per device, lazy loading below the fold. The website you are reading does this on every image, and the difference on mobile data is the difference between a page that arrives and a page that loads.

Fonts get the same treatment: loaded locally, preloaded in the right weights, zero render-blocking requests to third-party servers. The brand typography loads as fast as the text.

## One codebase, real engineering

Websites outlive their launch. A year in, someone needs to add a page, change a price, extend a section. On a framework with components, types, and conventions, that is an edit. On a pile of individually-built pages, it is archaeology.

This is the same argument as [design systems](/blog/what-is-a-design-system-and-when-you-need-one), one level down: reusable structure compounds. The Next.js component model is what lets us hand a client a site their next developer can actually work on, which protects the value of the investment long after we are out of the picture.

## What it means for the invoice

- **Hosting costs collapse.** A static-heavy Next.js site runs on Vercel's free tier or a few Namibian dollars of compute. There is no server to babysit.
- **Speed is structural.** The [Core Web Vitals](/blog/core-web-vitals-explained-for-business-owners) scores come from the architecture, not from a performance bolt-on bought later.
- **Search engines read the site cleanly.** Server-rendered HTML with proper metadata, sitemaps, and redirects generated from code, not hand-maintained.

## The honest caveats

Next.js is not always the answer. A simple page on an existing rented platform can be the right call for a business that needs to exist online this week and nothing more. And a team already fluent in another stack should usually stay in it, the stack matters less than the discipline of the people holding it, a point we make honestly in [choosing a studio](/blog/how-to-choose-a-web-studio-12-questions).

What the framework buys is not magic; it is defaults. Good defaults, chosen once, applied to every page, which is exactly how we prefer to spend complexity: once, at the beginning, where it is cheap.
