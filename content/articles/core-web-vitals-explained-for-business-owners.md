---
title: "Core Web Vitals Explained for Business Owners"
slug: "core-web-vitals-explained-for-business-owners"
description: "What LCP, INP, and CLS actually measure in plain language, why Google cares, and the fixes that move the numbers most on real Namibian connections."
keywords: [Core Web Vitals, LCP, INP, CLS, page speed, website performance, Google ranking factors]
category: "Design & Build"
date: "2026-08-22"
readingMinutes: 3
image: /images/paintings/blog/core-web-vitals-explained-for-business-owners.webp
imageAlt: "Soft analog stopwatch and small gauge resting on a pale surface in gentle light."
author: "Tangi Iigonda"
---

Core Web Vitals is Google's name for three measurements of how a page actually feels to use: how fast the main content appears, how quickly the page responds when tapped, and whether things jump around while it loads. Google uses them as ranking signals, which is why they escaped the engineering world and landed in marketing meetings. Here is what each one means in language that survives translation.

## The three measurements

**LCP — Largest Contentful Paint.** How long until the biggest visible element (usually the hero image or headline) finishes appearing. Under 2.5 seconds is good. On prepaid mobile data, this is the number most Namibian visitors actually experience.

**INP — Interaction to Next Paint.** How quickly the page visibly responds when someone taps a button or a menu. Under 200 milliseconds feels instant; over half a second feels broken. INP replaced an older metric in 2024 and is stricter: it measures the whole visit, not the first click.

**CLS — Cumulative Layout Shift.** Whether elements move after they have appeared — the text you were reading that jumps down when an image loads, the button that slides away as your finger lands on it. Under 0.1 is good. CLS is the quiet one: it does not feel like "slow," it feels like a site that fights you.

## Why Google cares

Google's stated position is straightforward: it ranks pages by the experience of using them, measured on real visits, from real devices, on real connections — not lab conditions. The data comes from actual Chrome users who opted in. Mobile experience is indexed first, so the phone version of your site is the one being scored.

The vitals are not the biggest ranking factor — relevant content beats fast irrelevance — but between two equally relevant competitors, the faster page wins the tie. And speed has an effect that predates Google entirely: visitors who wait, leave.

## What moves the numbers most

From [audits](/audit) of real sites in this market, four fixes account for most of the improvement:

- **Compress and correctly size images.** The single most common problem: multi-megabyte photos served to phones. Modern formats at honest dimensions routinely cut page weight by 80 percent.
- **Reserve space for images and embeds** with width and height attributes, so the layout does not shift while they load. This is most of CLS fixed in one habit.
- **Serve static pages where possible.** A page that is already built when requested loads in a fraction of the time of one assembled per visit. It is why we build on [Next.js](/blog/why-we-build-on-next-js) with static output by default.
- **Trim third-party scripts.** Every chat widget, pixel, and tracker costs interaction time. Keep the ones that earn their keep; delete the ones nobody reads the reports from.

## How to check yours

Google's PageSpeed Insights reports the vitals for any URL, splitting lab data from real visitor data. The real-user data is the truth; the lab data is the diagnosis. For a fuller picture, Search Console shows vitals across your whole site, page by page.

One honest caveat: scores vary by connection. A page that scores well on fiber can still feel slow on the mobile network your customers actually use, which is why we test on real phones and metered connections before we call a build finished — the same discipline behind our [free audit](/audit), which includes speed and data cost as standard checks.

Fast is not a feature you add at the end. It is the accumulated result of a hundred small decisions, made early, by people who measure.
