---
title: "How We Built Our AI Assistant"
slug: "how-we-built-our-ai-assistant"
description: "A practical walkthrough of the studio's own assistant: what it answers, how the content stays current, what we deliberately did not build, and what it costs to run."
keywords: [AI assistant, chatbot architecture, retrieval augmented generation, applied AI, Tangison, build log]
category: "Studio Notes"
date: "2026-09-03"
readingMinutes: 3
image: /images/paintings/blog/blog-04.webp
imageAlt: "A small glowing orb held gently between cupped hands in soft dusk light."
author: "Tangi Iigonda"
---



We run a small AI assistant on the studio's site. It answers questions about our services, our [cases](/cases), our process, and how to start a project. It books nothing, pretends nothing, and when a question leaves its ground it says so and points to [email or a call](/contact).

This is a build log, not a pitch. The interesting part of a small assistant is not the model, it is the discipline around it.

## What it actually does

The assistant answers from our own published material: service descriptions, case study summaries, pricing guidance, process steps, and the [insights library](/blog). That is a few hundred pieces of text, which matters because the grounding problem for a small business assistant is not volume. It is freshness and trust.

Everything it says traces back to a page on this site. If a visitor asks about what a website costs, the answer comes from what we actually publish on that subject, and it links to it. There is no improvisation about clients we have not worked with or work we have not done.

## The architecture is deliberately boring

A small corpus does not need exotic machinery. The working shape is:

- **A content layer**: the same markdown and structured data that builds the site pages.
- **A retrieval step**: when a question arrives, find the pieces of content most similar to it.
- **A generation step**: the model answers strictly from those pieces, with the instruction to refuse when they do not contain the answer.

Retrieval plus grounded generation. No fine-tuning, no custom training runs. Every improvement we have made in six months has been to the content layer (clearer pricing text, better case summaries) not to the model. That is the correct order of operations for a corpus this size.

## What we deliberately did not build

No accounts, no chat history, no analytics on individual visitors. The assistant keeps nothing. It cannot be talked into commitments: it does not quote custom project prices beyond the published ranges, and it routes negotiations to humans. Anything a visitor types is processed for that one answer and not stored.

We also did not give it a name, a face, or a personality beyond plain helpfulness. Personas make an assistant feel more capable than it is, and mismatched expectation is the most expensive failure mode of the whole category.

## The cost of running it

Honest numbers: the assistant costs us roughly the price of a good coffee per week at current traffic, almost all of it in model calls, because retrieval over a small corpus is effectively free. The real cost is editorial (keeping the source pages current) and that cost exists anyway because those pages serve humans first. The assistant is a reader of the site, not a parallel source of truth that drifts from it.

## What we learned

Three lessons, all of them transferable to client work:

- **Write for retrieval**: pages with clear headings and explicit answers ground the assistant better than prose that "captures a feeling." Writing for the assistant improved the pages for humans too.
- **Refusal is a feature**: the moment we made the assistant comfortable saying "this one is better answered by a person," its useful answers got more trusted.
- **Ship narrow, widen slowly**: it launched answering questions about services only. Cases, process, and the research library were added one at a time, each after the previous scope proved solid.

The assistant is small, and that is the point. It does actual work, the definition we apply to [everything we build](/blog/why-ai-in-africa-starts-with-practical-problems), and it does it without asking anyone to maintain a second, secret version of the truth.
