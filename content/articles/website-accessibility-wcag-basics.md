---
title: "Website Accessibility: The WCAG Basics That Matter"
slug: "website-accessibility-wcag-basics"
description: "The checks that cover most real accessibility failures: contrast, keyboard use, alt text, and labels, and how to verify them without special training."
keywords: [website accessibility, WCAG, screen reader, alt text, color contrast, keyboard navigation, inclusive design]
category: "Design & Build"
date: "2026-08-17"
readingMinutes: 3
image: /images/paintings/blog/website-accessibility-wcag-basics.webp
imageAlt: "Soft close-up of hands reading a textured page with large clear type in gentle light."
author: "Tangi Iigonda"
---



Accessibility has a reputation for complexity that its basics do not deserve. The Web Content Accessibility Guidelines (WCAG) run long, but a small set of checks covers the majority of real-world failures. Every one of them is verifiable by an ordinary person in an afternoon, and every one of them makes the site better for everyone, not only for visitors who rely on assistive technology.

## Why it is worth the effort

The practical case is bigger than compliance. Accessible pages are readable by search engines' crawlers, usable on small screens and slow connections, and clearer to every visitor in a hurry. Much of what [audits](/audit) flag as both an accessibility and a findability problem is the same defect seen from two angles.

There is also the legal direction of travel: WCAG is the reference standard in accessibility legislation across many jurisdictions, and organizations that sell to government or large corporates increasingly find conformance questions in procurement. Building to the standard early is cheaper than retrofitting under a deadline.

## Contrast

Text must have enough contrast against its background: WCAG's AA level asks for roughly 4.5 to 1 for body text, 3 to 1 for large text. Pale gray on white is the most common failure in the wild, and the most demoralizing to read in sunlight, which is where phones spend their lives.

Checking is mechanical: any free contrast checker accepts two hex codes and returns the ratio. The design discipline is accepting the answer when it says no, and darkening the text instead of arguing with the tool.

## Keyboard use

Unplug the mouse and navigate the site with Tab, Enter, and Escape. Can you reach the menu, open it, traverse the links, submit the form? Can you see where you are at all times, the visible focus indicator that cheap sites remove for aesthetics?

This single test predicts the experience of screen reader users, power users, and anyone whose hands have reasons to prefer keys. If a visitor can get lost without a mouse, a blind visitor is lost with one.

## Alt text and labels

Every meaningful image needs a description of what it shows, not "image" or "photo2.jpg", but what it actually contributes. Decorative images should be marked as decorative so screen readers skip them. Every form field needs a label attached to it, not a placeholder that vanishes on typing.

The alt-text discipline has an ally most people forget: the same descriptions are read by search engines and displayed when images fail on bad connections. Writing honest alt text is also [an SEO practice](/blog/seo-basics-for-namibian-businesses).

## Structure

Headings that describe their sections, in order: one H1, H2s under it, H3s under those. Lists marked as lists. Not styling, structure, because assistive technology navigates by it. A page whose headings read as an outline is navigable; a page of styled divs is a featureless plain.

## The 80/20 honesty

Full WCAG conformance involves more than this checklist (media captions, motion sensitivity, cognitive-load considerations) and for organizations with serious obligations, a formal audit is worth commissioning. But the four checks above catch the failures we find most often in the wild, and they are the ones built into our work by default, the same way [performance](/blog/core-web-vitals-explained-for-business-owners) is.

If your current site has never been checked, the [free audit](/audit) includes accessibility alongside the other basics, the point of the exercise is not a certificate, it is a website that refuses to exclude the customers who arrived.
