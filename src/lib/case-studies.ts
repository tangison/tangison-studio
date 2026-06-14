/**
 * Tangison Studio — Case Study Data
 *
 * Single source of truth for all portfolio case studies.
 * Each project gets its own page at /work/[slug].
 *
 * Copy follows the Corey Haines copywriting skill rules:
 * - No superlatives
 * - No passive voice
 * - Every sentence earns its place
 * - Direct, confident, understated
 */

export interface CraftNote {
  label: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  /** Screenshot filename prefix — differs from slug when slug has special chars */
  screenshotSlug: string;
  name: string;
  url: string;
  year: string;
  industry: string;
  services: string[];
  tech: string[];
  descriptor: string;
  challengeH2: string;
  challengeBody: string[];
  approachH2: string;
  approachBody: string[];
  craftNotes: CraftNote[];
  outcomeH2: string;
  outcomeBody: string[];
  nextSlug: string;
  /** Built during Gemsweb Digital era */
  era?: string;
  /** Internal project note */
  internal?: boolean;
}

export const caseStudies: CaseStudy[] = [
  /* ──────────────────────────────────────────────
     PROJECT 1: ProAvia Travel & Tours
     ────────────────────────────────────────────── */
  {
    slug: "proavia",
    screenshotSlug: "proavia",
    name: "ProAvia Travel & Tours",
    url: "https://proaviainc.com",
    year: "2026",
    industry: "Travel & Tourism",
    services: ["Website Design", "Website Development"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    descriptor: "Travel logistics, tours, and transfers from Walvis Bay",
    challengeH2:
      "A Namibian travel company needed a site that could close bookings, not just show destinations.",
    challengeBody: [
      "ProAvia is a female-owned, ATTA-accredited tour operator based in Walvis Bay. They run transfers, signature tours, car hire, and accommodation across Namibia. The brief was clear: the old digital presence was not converting. Travelers landed on the site, did not find what they needed, and left. The gap between what ProAvia delivered on the ground and what the website communicated was significant.",
      "Namibian tourism is competitive. Operators compete for the same traveler attention, often with nearly identical service categories. A website that lists services without building trust or guiding toward a booking is a website that exists as a brochure. ProAvia needed more than a brochure. They needed a site that worked as hard as their team did in the field.",
      "The challenge was straightforward: build something that makes it easy to understand what ProAvia does, builds trust through accreditation and real photography, and moves people toward a booking. No friction. No ambiguity.",
    ],
    approachH2: "Trust first. Booking second.",
    approachBody: [
      "The strategic decision was to lead with credibility, not features. First-time visitors to ProAvia do not know the company. They arrive through a search result or a referral, and they need to be convinced that this operator is legitimate before they consider booking. Accreditations, real photography, and a clear service structure do that work faster than any copy could.",
      "The booking flow was redesigned around how Namibian tourism actually works. WhatsApp is the primary communication channel for most travelers in the region. Contact forms create friction. A WhatsApp button removes it. Every design decision served a single question: does this make it easier for a traveler to trust ProAvia and start a conversation?",
    ],
    craftNotes: [
      {
        label: "Real photography over stock",
        body: "Every hero and tour image is from actual ProAvia expeditions. Nothing generic. The Sandwich Harbour dunes are their dunes.",
      },
      {
        label: "Accreditations above the fold",
        body: "ATTA, NIPDB, and NTB logos are placed deliberately. First-time visitors do not know ProAvia. Third-party recognition changes that.",
      },
      {
        label: "WhatsApp as primary CTA",
        body: "For Namibian tourism, WhatsApp converts better than a contact form. We designed around that behavior.",
      },
    ],
    outcomeH2: "A site that works as hard as the team behind it.",
    outcomeBody: [
      "ProAvia launched with a site that reflects the quality of the operation. Tour pages load fast, accreditations are visible, and the WhatsApp booking path is one tap away from every page. The site does what it was built to do: represent a professional operation professionally and make it easy for travelers to take the next step.",
      "The biggest lesson from this project was about restraint. The temptation in travel design is to add more: more images, more sections, more calls to action. ProAvia worked better with fewer, sharper decisions. Trust signals first. Clear service categories second. Booking path third. Everything else was noise.",
    ],
    nextSlug: "nalago",
  },

  /* ──────────────────────────────────────────────
     PROJECT 2: Nalago Skincare
     ────────────────────────────────────────────── */
  {
    slug: "nalago",
    screenshotSlug: "nalago",
    name: "Nalago Skincare",
    url: "https://nalago-nam.com",
    year: "2026",
    industry: "Beauty & Wellness",
    services: ["Website Design", "Website Development", "E-Commerce"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Kalahari-inspired organic skincare for the African market",
    challengeH2:
      "An organic skincare brand with a real story needed a site that could tell it.",
    challengeBody: [
      "Nalago makes skincare from Kalahari melon oil, marula, and other indigenous Namibian ingredients. The product is real. The sourcing is real. The founder's connection to the land is real. None of that was coming through on the old site. The previous presence felt like any other online store selling any other product. Nalago is not any other product.",
      "Organic skincare customers are a specific audience. They read ingredient lists. They want to know where things come from. They want proof that the product is what it claims to be. A generic storefront with a product image and an add-to-cart button does not serve that audience. It undersells the product and leaves questions unanswered.",
      "The brief was to build a site that communicates what makes Nalago different, supports the N$150 price point with confidence, and makes the ingredient story visible, not buried in a product description nobody reads.",
    ],
    approachH2: "The Kalahari as a design system.",
    approachBody: [
      "The color palette was not a design choice. It was a factual one. The warm earth tones and dry-grass hues come directly from the Kalahari landscape where the ingredients grow. This is not theming. It is accuracy. The product is made from that soil and those plants. The site should look like it comes from the same place.",
      "The information architecture was built around the ingredient story. Before a visitor sees a product, they can read about what is in it and why. Ingredient pages are not decoration. They are the conversion engine for an organic skincare brand. People who understand the ingredients are people who buy the product.",
    ],
    craftNotes: [
      {
        label: "Color from the desert",
        body: "The palette pulls from Kalahari earth tones and dry grass. Not because it looked nice, but because it is literally where the ingredients come from.",
      },
      {
        label: "Ingredient pages as trust infrastructure",
        body: "Customers buying organic skincare want to know what is in it and why. The ingredients section is not decoration. It is the conversion engine.",
      },
      {
        label: "N$150 price point displayed prominently",
        body: "The product is affordable premium. Hiding the price creates friction. Showing it confidently signals value.",
      },
    ],
    outcomeH2: "A Namibian skincare brand with a site that can go anywhere.",
    outcomeBody: [
      "Nalago launched with a site that tells the full story. The ingredient pages, the Kalahari palette, and the confident pricing all work together to present a brand that knows what it is and does not need to oversell. The site positions Nalago for growth beyond Namibia without pretending to be something it is not.",
      "The key insight was that the ingredient story is the brand. Most skincare sites treat ingredients as a footnote. Nalago's audience treats them as the headline. Designing for that audience meant making the ingredient story the structural backbone of the site, not an afterthought.",
    ],
    nextSlug: "clusterleaf",
  },

  /* ──────────────────────────────────────────────
     PROJECT 3: Cluster Leaf Safaris
     ────────────────────────────────────────────── */
  {
    slug: "clusterleaf",
    screenshotSlug: "clusterleaf",
    name: "Cluster Leaf Safaris",
    url: "https://www.clusterleafsafaris.com",
    year: "2026",
    industry: "Safari & Tourism",
    services: ["Website Design", "Website Development"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    descriptor: "Owner-operated safari experiences across Southern Africa",
    challengeH2:
      "An 11-year-old safari company with 500+ completed tours had no digital presence that reflected the quality of the work.",
    challengeBody: [
      "Cluster Leaf Safaris has been running since 2015. Taedza, the founder and lead guide, has personally led over 500 tours across Namibia, Botswana, Zimbabwe, and Zambia. That track record is exceptional. The previous website did not communicate any of it. Visitors saw a basic layout with stock imagery and generic tour descriptions. Nothing about it said: this is a company that has been doing this for over a decade and doing it well.",
      "Safari bookings are high-commitment purchases. A traveler spending $4,250 per person on a multi-day expedition needs to feel confident about the operator before they commit. The old site gave them no reason to feel confident. It looked like it could belong to any operator in any country.",
      "The brief was to build a site that matches the reputation the work had already built. The photography existed. The track record existed. The testimonials existed. They just needed a site that could carry all of it.",
    ],
    approachH2: "Let the photography speak. Then get out of the way.",
    approachBody: [
      "The strategic decision was to make Taedza visible. Cluster Leaf Safaris is owner-operated. The same person who runs the company guides the tours. That is a significant trust signal in an industry where many operators outsource their guides. The About section was designed as a confidence builder, not a bio page. Travelers should feel like they know the person leading their trip before they book.",
      "The design approach was maximal photography, minimal decoration. Safari photography is inherently compelling. The site's job is to present it at full scale and then stay out of the way. Over-designed layouts compete with the images. Under-designed layouts fail to build trust. The balance was found by treating the photography as the primary content and everything else as supporting structure.",
    ],
    craftNotes: [
      {
        label: "Mr. T as the product",
        body: "Cluster Leaf Safaris is owner-operated. Taedza is the guide on every trip. The About section is not a bio. It is a confidence builder.",
      },
      {
        label: "Pricing transparency",
        body: "Tours start from $4,250pp. Showing the price upfront filters unqualified leads and signals premium positioning.",
      },
      {
        label: "Mobile-first itinerary pages",
        body: "Most safari research happens on mobile while travelers are already in region. Every itinerary page was designed for a 375px screen first.",
      },
    ],
    outcomeH2: "A site that finally matches the reputation the work had built.",
    outcomeBody: [
      "Cluster Leaf Safaris launched with a site that reflects eleven years of operational quality. The photography is front and center. The pricing is transparent. The guide is visible. Every page works hard to answer the questions a high-commitment buyer has before they reach out.",
      "The primary lesson from this project was about trust architecture. In high-value safari bookings, the website needs to do the work that an in-person meeting would do in other industries. Showing the guide, showing real photography, and displaying pricing honestly all serve the same goal: making a stranger confident enough to commit.",
    ],
    nextSlug: "smefrog",
  },

  /* ──────────────────────────────────────────────
     PROJECT 4: SMEFrog
     ────────────────────────────────────────────── */
  {
    slug: "smefrog",
    screenshotSlug: "smefrog",
    name: "SMEFrog",
    url: "https://smefrog.tangison.com",
    year: "2026",
    industry: "LegalTech / Business Services",
    services: ["Product Design", "Website Development"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Remote business registration and compliance for Namibian SMEs",
    challengeH2:
      "Registering a business in Namibia takes too long and costs too much. SMEFrog was built to fix both.",
    challengeBody: [
      "Business registration in Namibia is slow, expensive, and opaque. SMEs face a process that requires physical visits, multiple forms, and fees that add up quickly. SMEFrog was created to make compliance accessible: remote registration, transparent pricing, and a process that takes days instead of weeks. The product had to sell itself on the homepage. There was no sales team. No drip campaign. The page needed to convert.",
      "The target audience is Namibian entrepreneurs who are time-poor and cost-sensitive. They do not want to read about legal frameworks. They want to know: how much, how long, and what do I need to do. Any copy that does not answer those questions immediately is copy that loses the visitor.",
      "The brief was to design and build a product page that communicates the value proposition in under ten seconds and moves visitors to start the registration process. No ambiguity. No corporate language. Just the facts, structured to convert.",
    ],
    approachH2: "The product IS the marketing.",
    approachBody: [
      "The design treats the value proposition as the hero. The 2X cheaper claim is the first thing a visitor reads after the headline. It is specific, defensible, and it removes the primary objection before anyone asks. From there, the four-step process replaces a complex intake form with plain-language steps. People understand what they are signing up for before they commit.",
      "The CTA strategy was built around WhatsApp for the same reason as ProAvia: Namibian SMEs trust WhatsApp more than web forms. A WhatsApp conversation with the team feels more like getting help and less like submitting a ticket. That distinction matters for conversion in this market.",
    ],
    craftNotes: [
      {
        label: "2X cheaper, front and center",
        body: "The pricing claim is the first thing you read after the headline. It is specific, defensible, and removes the primary objection before anyone asks.",
      },
      {
        label: "Four steps, not a form",
        body: "The process section replaces a complex intake form with four plain-language steps. People understand what they are signing up for before they commit.",
      },
      {
        label: "WhatsApp as the primary CTA",
        body: "Like ProAvia, Namibian SMEs trust WhatsApp more than web forms. The CTA goes straight to a WhatsApp conversation with the team.",
      },
    ],
    outcomeH2:
      "A compliance platform that feels less like government and more like a service.",
    outcomeBody: [
      "SMEFrog launched as a product that communicates clearly. The pricing is visible. The process is simple. The CTA meets the audience where they already are. The site does the work of a sales call without requiring one.",
      "The key learning from SMEFrog was about removing everything that is not the product. Product pages often try to build a narrative, establish authority, and create emotional resonance before getting to the offer. SMEFrog's audience does not have patience for that. They want the offer. Give them the offer. Make it clear. Make it easy. Move on.",
    ],
    nextSlug: "petrocor",
  },

  /* ──────────────────────────────────────────────
     PROJECT 5: Petrocor
     ────────────────────────────────────────────── */
  {
    slug: "petrocor",
    screenshotSlug: "petrocor",
    name: "Petrocor",
    url: "https://petrocor.blackstarhorizon.com",
    year: "2026",
    industry: "Energy & Resources",
    services: ["Website Design", "Website Development"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Wholesale petroleum and chemical distribution across Southern Africa",
    era: "Gemsweb Digital",
    challengeH2:
      "A B2B fuel distributor operating across Namibia and the DRC needed a digital presence that matched the scale of the operation.",
    challengeBody: [
      "Petrocor distributes wholesale petroleum and chemical products across Namibia and the Democratic Republic of Congo. They have been operating for over fifteen years. Their digital presence did not reflect that. The previous site was minimal, undifferentiated, and failed to communicate the scale or reliability of the operation.",
      "In B2B energy distribution, the website serves a specific function: it exists to generate qualified quote requests from procurement decision-makers. It does not need to entertain. It does not need to educate. It needs to communicate authority, longevity, and operational capacity fast enough that a buyer trusts the company enough to request a quote.",
      "The brief was to build a corporate platform that projects authority and drives a single action: Get Quote. Every design decision had to serve that goal. No e-commerce. No self-serve pricing. No distraction from the primary conversion path.",
    ],
    approachH2: "Authority before everything.",
    approachBody: [
      "The design system was built around stability and precision. A dark industrial palette of navy and charcoal communicates seriousness and reliability. This is not a consumer product. It is a procurement decision made by people who need to trust that the supplier can deliver at scale. The color system reflects that context.",
      "The information architecture was stripped to its essentials. There is no checkout flow, no pricing page, and no self-serve portal. The site exists to generate quote requests from qualified B2B buyers. The Get Quote button is the only CTA on the site. Every page funnels toward it.",
    ],
    craftNotes: [
      {
        label: "Dark industrial palette",
        body: "Navy and charcoal communicate stability and precision. This is not a consumer product. It is a procurement decision. The site reflects that.",
      },
      {
        label: "Get Quote as the only CTA",
        body: "There is no checkout, no pricing, no self-serve flow. The site exists to generate quote requests. Every design decision serves that single action.",
      },
      {
        label: "15+ years prominently stated",
        body: "In energy distribution, longevity is the most important trust signal. It goes in the hero.",
      },
    ],
    outcomeH2:
      "A corporate platform built for the decision-makers, not the general public.",
    outcomeBody: [
      "Petrocor launched with a site that communicates scale and reliability in seconds. The dark palette, the longevity claim, and the single CTA all serve the same purpose: making a B2B buyer confident enough to request a quote. The site does not try to be everything. It tries to be one thing well.",
      "The lesson from Petrocor was about focus. B2B sites often try to serve multiple audiences: investors, job seekers, partners, and buyers. Petrocor's site serves one audience: the procurement decision-maker. That clarity made every design decision easier and the final product sharper.",
    ],
    nextSlug: "tangison-systems",
  },

  /* ──────────────────────────────────────────────
     PROJECT 6: Tangison Systems
     ────────────────────────────────────────────── */
  {
    slug: "tangison-systems",
    screenshotSlug: "tangison",
    name: "Tangison Systems",
    url: "https://tangison.com",
    year: "2026",
    industry: "Technology / AI",
    services: ["Website Design", "Website Development", "Brand Direction"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    descriptor: "Sovereign intelligence infrastructure from Windhoek",
    internal: true,
    challengeH2:
      "Building your own company's site is the hardest brief you will ever write.",
    challengeBody: [
      "Every agency faces this. The client is yourself, the budget is zero patience, and the stakes are total. This is the first thing any serious client or collaborator sees. It has to represent the company's capabilities without overstating them. It has to be opinionated without being alienating. It has to be finished, even though it will never feel finished.",
      "The tangison.com brief was to communicate sovereign intelligence infrastructure without sounding like every other AI company. The market is saturated with companies using the same vocabulary: AI solutions, machine learning services, intelligent platforms. None of those terms mean anything specific. Tangison needed to say something specific.",
      "The challenge was internal. No client brief to react to. No feedback loop to iterate through. Just a company trying to describe itself honestly and precisely, in public, for the first time.",
    ],
    approachH2: "Say less. Mean more.",
    approachBody: [
      "The positioning language was the first decision, made before a single wireframe. Sovereign intelligence is not a tagline. It is a specific idea that Tangison owns. It refers to self-hosted, controllable AI infrastructure that organizations can run on their own terms. That specificity is the differentiator. The site needed to communicate it from the first screen.",
      "The site architecture reflects the company's two arms: Labs and Studio. Labs speaks to infrastructure buyers. Studio speaks to design clients. The split is structural, not cosmetic. It lets tangison.com and studio.tangison.com address different audiences without diluting either message. The navigation makes this architecture visible.",
    ],
    craftNotes: [
      {
        label: "Sovereign intelligence as positioning",
        body: 'Not "AI solutions" or "machine learning services." The language is precise and owns a specific idea. That decision was made before a single wireframe.',
      },
      {
        label: "Atlantic coast as a differentiator",
        body: "Namibia is not mentioned defensively. It is stated as a fact and a point of view. The studio operates from the edge of Africa and that specificity is a feature.",
      },
      {
        label: "Two arms, one company",
        body: "The Labs / Studio split is structural, not cosmetic. It lets tangison.com speak to infrastructure buyers while studio.tangison.com speaks to design clients.",
      },
    ],
    outcomeH2:
      "A company site that sounds like a company that knows exactly what it is.",
    outcomeBody: [
      "Tangison.com launched with clear positioning, clean architecture, and no ambiguity about what the company does. The Labs / Studio split works. Sovereign intelligence works. The Namibian origin is stated as a fact, not an apology. The site represents a company that made specific decisions early and built around them.",
      "The hardest lesson from this project was about editing your own work. Internal projects lack the natural constraints that client work provides. There is no deadline imposed by someone else. There is no brief to push back against. The only discipline is self-imposed. The result improves when you treat your own project with the same rigor you would bring to a client's.",
    ],
    nextSlug: "crescendo",
  },

  /* ──────────────────────────────────────────────
     PROJECT 7: Crescendo Namibia
     ────────────────────────────────────────────── */
  {
    slug: "crescendo",
    screenshotSlug: "crescendo",
    name: "Crescendo Namibia",
    url: "https://cresendona.com",
    year: "2026",
    industry: "Music & Education",
    services: ["Website Design", "Website Development", "E-Commerce"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Instruments, lessons, and academy platform since 2009",
    challengeH2:
      "Namibia's longest-running music destination had been operating for 16 years without a site that could carry the weight of that history.",
    challengeBody: [
      "Crescendo has been operating in Windhoek since 2009. They sell musical instruments, run a music academy, and offer lessons across multiple instruments. Sixteen years is a long time in any retail market. In Windhoek, it is nearly unprecedented. The previous website did not communicate that longevity. It looked like a startup, not a 16-year institution.",
      "The challenge was dual: serve the customers who already know Crescendo and need to check inventory or book lessons, and introduce the brand to people who do not yet know that Windhoek has a dedicated music store with an in-house academy. These are different audiences with different needs, and the site has to serve both without splitting into two separate experiences.",
      "The brief was to build a site that treats retail and education as equal pillars, communicates the 16-year track record visibly, and makes it easy for both returning and new customers to find what they need.",
    ],
    approachH2:
      "Serve the city that already knows you. Then introduce yourself to the city that does not.",
    approachBody: [
      "The 16-year track record is the most powerful asset Crescendo has. Since 2009 is not a footnote. It is a headline element. In a market like Windhoek, where businesses open and close regularly, longevity does more work than any marketing copy. The design treats that number as a trust signal, not a historical detail.",
      "The site architecture treats Shop and Academy as co-equal sections. Instruments and lessons are separate revenue streams but the same customer. A parent buying a guitar for their child is a potential academy enrollment. A student taking lessons is a potential instrument buyer. The site reflects that relationship by giving both sections equal weight in the navigation and on the homepage.",
    ],
    craftNotes: [
      {
        label: "Since 2009 as a headline element",
        body: "Sixteen years in a market like Windhoek is rare. That number does more work than any marketing copy.",
      },
      {
        label: "Dark navy with teal accents",
        body: "Music retail and music education need to feel serious and creative at the same time. The color system walks that line.",
      },
      {
        label: "Shop and Academy as equal pillars",
        body: "Instruments and lessons are separate revenue streams but the same customer. The site architecture treats them as co-equals, not a product with an upsell.",
      },
    ],
    outcomeH2: "A site that finally matches 16 years of reputation.",
    outcomeBody: [
      "Crescendo launched with a site that treats its history as an asset. The 16-year track record is visible. The shop and academy sections are equally prominent. A new visitor understands what Crescendo is in under five seconds. A returning customer can find what they need in two clicks.",
      "The primary insight from Crescendo was about leverage. Small businesses in small markets often undervalue their track record. They focus on what they sell, not how long they have been selling it. In a market where longevity is rare, longevity is the brand. The site needed to say that louder than the product catalog.",
    ],
    nextSlug: "feorm",
  },

  /* ──────────────────────────────────────────────
     PROJECT 8: Feorm
     ────────────────────────────────────────────── */
  {
    slug: "feorm",
    screenshotSlug: "feorm",
    name: "Feorm",
    url: "https://feorm.tangison.com",
    year: "2026",
    industry: "Agriculture / Farm Stays",
    services: [
      "Platform Design",
      "Website Development",
      "Brand Identity",
      "Product Design",
    ],
    tech: ["Next.js", "Python"],
    descriptor: "Farm stay discovery and booking platform for Namibia",
    internal: true,
    challengeH2:
      "Namibia has extraordinary farm stays. No platform existed to connect them to the travelers who would love them.",
    challengeBody: [
      "Feorm began as an agrotourism concept and evolved into a farm stay discovery platform during production. The brief was self-authored. There was no client. Tangison identified a gap in the Namibian travel market, validated the idea, built the brand from the ground up, and then designed and developed the platform. That is a different kind of project.",
      "Namibian farmers have capacity for guests. Some already host visitors informally. Travelers looking for authentic, off-grid experiences in Namibia have no easy way to find these places. The gap is not in supply or demand. It is in connection. No platform bridges the two. Feorm was built to bridge it.",
      "Self-authored projects come with a different kind of pressure. There is no client to please, but there is also no client to constrain you. Scope creep is a real risk. The challenge was to define a clear product scope and hold it, even when the temptation was to add more features.",
    ],
    approachH2:
      "We were the client. That made it harder and better.",
    approachBody: [
      "The Feorm identity was defined before a single page was wireframed. Logo, name, color system, and voice were established first. When you are building your own product, the brand is the moat. The name Feorm comes from Old English, meaning hospitality or provision. That etymology informed every design decision. The brand needed to feel warm, agricultural, and Namibian without being kitsch.",
      "The pivot from equipment rental to farm stays happened during research. Namibian farmers had capacity for guests. Travelers had no way to find them. That specific insight drove every product decision. The platform was designed to make farm stays discoverable and bookable, with enough structure to feel trustworthy and enough simplicity to feel authentic.",
    ],
    craftNotes: [
      {
        label: "Brand before product",
        body: "The Feorm identity (logo, name, color system, voice) was defined before a single page was wireframed. When you are building your own product, the brand is the moat.",
      },
      {
        label: "Farm stays, not agrotourism",
        body: "The pivot from equipment rental to farm stays happened during research. Namibian farmers had capacity for guests. Travelers had no way to find them. That specific insight drove every product decision.",
      },
      {
        label: "Python backend",
        body: "Feorm is the only project in the Tangison portfolio that runs a custom backend. It reflects the Lab's capacity for infrastructure, not just interfaces.",
      },
    ],
    outcomeH2:
      "An active product. Still being built. Already a proof of concept for what Tangison can ship without a client brief.",
    outcomeBody: [
      "Feorm is live and under active development. The platform lists farm stays, supports booking inquiries, and presents each property with enough detail to make a decision. The brand identity holds. The Python backend handles data that a static site cannot. It is not finished. It was not designed to be finished. It was designed to be real.",
      "The most important lesson from Feorm was about what happens when you are both the client and the builder. You gain creative freedom. You lose external accountability. The solution was to impose the same discipline on internal projects that client work demands: a written brief, a defined scope, a deadline, and a ship date. Without those constraints, nothing ships.",
    ],
    nextSlug: "proavia",
  },
];

/** Get a case study by slug */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/** Get all case study slugs for static params */
export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
