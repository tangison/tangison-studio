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
    services: ["Brand Systems", "Website Design", "Digital Direction"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    descriptor: "Travel logistics, curated tours, and transfer services from Walvis Bay, connecting visitors to the coast, the desert, and the broader Namibian experience.",
    challengeH2:
      "A Namibian travel company needed a site that could close bookings, not just show destinations.",
    challengeBody: [
      "ProAvia is a female-owned, ATTA-accredited tour operator based in Walvis Bay. They run transfers, signature tours, car hire, and accommodation across Namibia. The brief was clear: the old digital presence was not converting. Travelers landed on the site, did not find what they needed, and left. The gap between what ProAvia delivered on the ground and what the website communicated was wide.",
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
    services: ["Brand Identity", "E-Commerce", "Website Development"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Kalahari-inspired organic skincare formulated for the African market, with ingredient stories and a brand system rooted in Namibian landscape.",
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
    services: ["Brand Systems", "Website Design", "Creative Direction"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    descriptor: "Owner-operated safari experiences across Southern Africa. Built around eleven years of operational trust, transparent pricing, and visible guides.",
    challengeH2:
      "An 11-year-old safari company with 500+ completed tours had no digital presence that reflected the quality of the work.",
    challengeBody: [
      "Cluster Leaf Safaris has been running since 2015. Taedza, the founder and lead guide, has personally led over 500 tours across Namibia, Botswana, Zimbabwe, and Zambia. That track record is exceptional. The previous website did not communicate any of it. Visitors saw a basic layout with stock imagery and generic tour descriptions. Nothing about it said: this is a company that has been doing this for over a decade and doing it well.",
      "Safari bookings are high-commitment purchases. A traveler spending $4,250 per person on a multi-day expedition needs to feel confident about the operator before they commit. The old site gave them no reason to feel confident. It looked like it could belong to any operator in any country.",
      "The brief was to build a site that matches the reputation the work had already built. The photography existed. The track record existed. The testimonials existed. They just needed a site that could carry all of it.",
    ],
    approachH2: "Let the photography speak. Then get out of the way.",
    approachBody: [
      "The strategic decision was to make Taedza visible. Cluster Leaf Safaris is owner-operated. The same person who runs the company guides the tours. That is a strong trust signal in an industry where many operators outsource their guides. The About section was designed as a confidence builder, not a bio page. Travelers should feel like they know the person leading their trip before they book.",
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
    descriptor: "Remote business registration and compliance for Namibian SMEs, simplifying what used to require in-person visits, queues, and weeks of back-and-forth.",
    internal: true,
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
    services: ["Brand Identity", "Website Design"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Wholesale petroleum and chemical distribution across Southern Africa, with a site that handles trade-specific documentation, pricing, and account workflows.",
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
    services: ["Brand Systems", "Website Design", "Product Design"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    descriptor: "Sovereign intelligence infrastructure from Windhoek, Namibia. Built so organizations retain control of their data, models, and decisions.",
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
    url: "https://crescendonamibia.com",
    year: "2026",
    industry: "Music & Education",
    services: ["Brand Identity", "Website Development", "E-Commerce"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor: "Instruments, lessons, and academy platform since 2009, with retail and education treated as co-equal pillars under a single sixteen-year-old brand.",
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
      "The primary insight from Crescendo was about advantage. Small businesses in small markets often undervalue their track record. They focus on what they sell, not how long they have been selling it. In a market where longevity is rare, longevity is the brand. The site needed to say that louder than the product catalog.",
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
    services: ["Brand Identity", "Website Design"],
    tech: ["Next.js", "Python"],
    descriptor: "Farm stay discovery and booking platform for Namibia, connecting travelers with working farms, guesthouses, and lodges across the country.",
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
    nextSlug: "lrclearing",
  },

  /* ──────────────────────────────────────────────
     PROJECT 9: L&R Clearing Agency
     ────────────────────────────────────────────── */
  {
    slug: "lrclearing",
    screenshotSlug: "lrclearing",
    name: "L&R Clearing Agency",
    url: "https://lrclearing.com",
    year: "2026",
    industry: "Logistics & Customs Clearing",
    services: ["Brand Identity", "Company Profile", "Policy Documentation"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor:
      "Customs clearing and freight forwarding across Walvis Bay, Lüderitz, and Southern African borders",
    challengeH2:
      "Customs clearance is a trust business. The site needed to prove operational competence, not list services.",
    challengeBody: [
      "L&R Clearing Agency operates at Walvis Bay and Lüderitz, with on-the-ground presence at five major Southern African border posts. Cargo owners choosing a clearing agent are not shopping for features. They are shopping for reliability. A delayed clearance at Ariamsvlei or Noordoewer costs money every hour. The previous site did not communicate that L&R understood this.",
      "The logistics category in Namibia is crowded with generic websites. Most operators list services without specifying where they work, which borders they cover, or how they handle permits. That ambiguity is a problem for a buyer who needs to know whether their cargo can move through a specific port on a specific timeline. A site that does not answer those questions forces the buyer to call. A site that answers them earns the call.",
      "The brief was to build a site that shows operational specificity. Which ports. Which borders. What documentation. What pricing model. The site needed to make L&R look like what they are: a Namibian clearing agent with regional reach and the phone numbers to prove it.",
    ],
    approachH2: "Operational specificity as positioning.",
    approachBody: [
      "The structure was built around the five crossings L&R actually serves. Walvis Bay, Lüderitz, Ariamsvlei, Noordoewer, and the regional border posts are not abstract service areas. They are specific places with specific clearance requirements. Naming them on the site does more for trust than any tagline could.",
      "Pricing and permits were treated as first-class content, not buried in a PDF. A buyer researching clearing agents wants to understand the cost structure and the permit process before they make contact. Making that information visible filters out unqualified leads and shortens the conversation for qualified ones. The phone number and email are still the primary conversion path. The site just makes sure the conversation starts informed.",
    ],
    craftNotes: [
      {
        label: "Five crossings, one handover",
        body: "The site names the actual ports and borders L&R serves. Operational specificity does more for trust than any marketing copy.",
      },
      {
        label: "Pricing as content",
        body: "B2B logistics sites usually hide pricing. L&R surfaces it. Buyers who understand the cost model before they call are buyers who convert faster.",
      },
      {
        label: "Permits as a section, not a footnote",
        body: "Permits are a real buyer question. Treating them as first-class content answers that question before it becomes a sales objection.",
      },
    ],
    outcomeH2:
      "A site that signals competence before the first call.",
    outcomeBody: [
      "L&R launched with a site that reflects the operation. Port and border coverage is specific. Pricing is visible. Permit processes are explained. The phone numbers are real and they ring. The site does the qualifying work so that when the phone does ring, the conversation is already past the basics.",
      "The lesson here was about honesty as a positioning tool. Logistics is an industry where most sites overpromise and under-specify. Being specific about what you actually do, where you actually do it, and what it actually costs is a differentiator. The site does not try to sound big. It tries to sound accurate.",
    ],
    nextSlug: "reviveautoworks",
  },

  /* ──────────────────────────────────────────────
     PROJECT 10: Revive Auto Works
     ────────────────────────────────────────────── */
  {
    slug: "reviveautoworks",
    screenshotSlug: "reviveautoworks",
    name: "Revive Auto Works",
    url: "https://reviveautoworks.cc",
    year: "2026",
    industry: "Automotive Repair & Servicing",
    services: ["Brand Identity", "Website Design"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor:
      "Auto repairs and servicing in Namibia with WhatsApp booking and OE parts",
    challengeH2:
      "Independent auto shops compete on trust. The site needed to make that trust visible.",
    challengeBody: [
      "Revive Auto Works is an independent automotive repair shop in Namibia. The category is crowded. Every shop claims expert technicians, quality parts, and reliable service. Most sites look the same because most sites say the same things. A buyer with a vehicle that needs work has no way to distinguish between shops from their websites alone.",
      "The previous Revive presence did not communicate the things that actually differentiate the shop. OE parts. Workmanship guarantee. WhatsApp booking. The standard of care. These are not abstract marketing claims. They are operational realities that a buyer cares about. A site that buries them under generic copy undersells the business.",
      "The brief was to build a site that positions Revive as premium without pretending to be a luxury dealer service center. Premium care at independent-shop rates. The site needed to make the value visible, not just claim it.",
    ],
    approachH2: "Service-led structure. WhatsApp-first booking.",
    approachBody: [
      "The information architecture was built around services first. Routine servicing, brakes and suspension, electrical, pre-purchase inspections, general maintenance. Each service gets its own block with a clear scope. A buyer who knows what they need can find it. A buyer who does not can read and self-diagnose. That is the work the site does.",
      "The booking flow was designed around how Namibian vehicle owners actually behave. WhatsApp is the primary channel. A WhatsApp button is visible on every section. The Revive Standard covers OE parts, workmanship guarantee, and expert technicians. It is positioned as a commitment, not a tagline. It appears where buyers make decisions, not just on a homepage banner.",
    ],
    craftNotes: [
      {
        label: "WhatsApp on every section",
        body: "For Namibian auto service, WhatsApp is the booking channel. Placing the button on every service block removes friction at the decision point.",
      },
      {
        label: "The Revive Standard as positioning",
        body: "OE parts, workmanship guarantee, expert technicians. Stated as a commitment, repeated where buyers decide. The standard is the differentiator.",
      },
      {
        label: "Service-led IA",
        body: "Each service has its own block with scope. Buyers who know what they need find it fast. Buyers who do not can self-diagnose.",
      },
    ],
    outcomeH2: "A site that makes the value visible.",
    outcomeBody: [
      "Revive launched with a site that reflects the standard of the shop. The service structure is clear. The booking path is one tap away from every section. The Revive Standard is visible where it matters. The site does what it was built to do: make a premium independent shop look like what it is.",
      "The lesson was about clarity as positioning. In a category where most sites say the same things, being specific about what you do, how you book, and what you guarantee is the differentiator. The site does not try to sound premium. It tries to be clear. Clarity is the premium signal.",
    ],
    nextSlug: "miway",
  },

  /* ──────────────────────────────────────────────
     PROJECT 11: MI-WAY by Malu Investment
     ────────────────────────────────────────────── */
  {
    slug: "miway",
    screenshotSlug: "miway",
    name: "MI-WAY by Malu Investment",
    url: "https://mi-way.org",
    year: "2026",
    industry: "Transport & Multi-Service",
    services: ["Brand Identity", "Website Design", "Social Media Setup"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor:
      "Northern Namibia multi-service enterprise spanning taxi, construction, logistics, and cleaning",
    challengeH2:
      "A multi-service business is hard to position. The site needed to make four service lines legible.",
    challengeBody: [
      "MI-WAY by Malu Investment is a northern Namibian enterprise operating across four service lines: taxi transport, construction, logistics, and cleaning. Established in 2017. Operating out of Oshakati, Ongwediva, and Ondangwa. The previous presence did not communicate the scope or the standard. A buyer looking for a taxi and a buyer looking for a construction contractor are different audiences with different needs, and they both need to understand what MI-WAY does within seconds of landing.",
      "Multi-service businesses struggle with positioning. The temptation is to list everything and hope the visitor finds what they need. That approach assumes the visitor already knows what they are looking for. Most do not. They arrive with a question: can this company help me with this? They leave if the answer is not obvious. The site needed to answer that question for four different audiences without diluting the brand.",
      "The brief was to build a site that makes a multi-service business legible. Four service lines, one standard, one brand. Northern Namibia roots as positioning, not just geography. A booking path that works for taxi customers without alienating construction clients.",
    ],
    approachH2: "Four services. One standard. Northern roots.",
    approachBody: [
      "The structure was built around the four service lines as equal pillars. Taxi transport, construction, logistics, cleaning. Each gets its own section with scope, coverage, and a clear next step. The MI-WAY standard is show up, do the work, do it well. It runs across all four. A visitor can scan the services and find theirs in seconds.",
      "The positioning leans into northern Namibia. Oshakati, Ongwediva, Ondangwa are not just cities on a map. They are the operating territory. Naming them on the site signals where MI-WAY is strong and filters out inquiries from outside the coverage area. The booking flow is taxi-first because that is the highest-volume service, but every service has a clear contact path.",
    ],
    craftNotes: [
      {
        label: "Four services, one standard",
        body: "Taxi, construction, logistics, cleaning. Equal pillars, one brand standard. The site does not force visitors to choose a primary service.",
      },
      {
        label: "Northern Namibia as positioning",
        body: "Oshakati, Ongwediva, Ondangwa are named on the site. Geography is not just coverage. It is positioning.",
      },
      {
        label: "Booking-first hero",
        body: "The hero leads with Book a Ride because taxi is the highest-volume service. Other services have clear contact paths lower down.",
      },
    ],
    outcomeH2: "A multi-service business made legible.",
    outcomeBody: [
      "MI-WAY launched with a site that makes a four-service business understandable in seconds. The service pillars are clear. The geography is specific. The booking path for the highest-volume service is one tap away. The site does what it was built to do: help different audiences find what they need without confusion.",
      "The lesson was about legibility as a design problem. Multi-service businesses fail on websites when they try to be everything to everyone. The solution is not to hide services. It is to structure them so that each audience can find theirs fast. MI-WAY's site does that. Four services, one standard, one clear path for each.",
    ],
    nextSlug: "dieselman",
  },

  /* ──────────────────────────────────────────────
     PROJECT 12: Dieselman Nam
     ────────────────────────────────────────────── */
  {
    slug: "dieselman",
    screenshotSlug: "dieselman",
    name: "Dieselman Nam",
    url: "https://www.dieselman-nam.com",
    year: "2026",
    industry: "Diesel Service & Mobile Mechanics",
    services: ["Brand Identity", "Website Design", "Website Development"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor:
      "Mobile diesel service, wheel alignment, and roadside assistance from Walvis Bay across the Erongo Region",
    challengeH2:
      "A Walvis Bay diesel service with no digital presence needed a site that put the phone number first.",
    challengeBody: [
      "Dieselman Nam operates from 31 Hage Geingob Street in Walvis Bay. Stephen Lee owns and runs it. The work is mobile wheel alignment, diagnostics and ECU programming, mechanical and diesel repairs, and call-out and roadside assistance. The equipment is real: a HAWEKA AXIS4000 mobile alignment system that goes to the vehicle instead of the vehicle coming to a workshop. The previous digital presence did not communicate any of this.",
      "The audience is specific. Truck owners, fleet operators, bakkie drivers, and light commercial vehicle owners in the Erongo Region whose vehicles cannot afford to sit still. A truck waiting for alignment at a fixed workshop is a truck losing money. A buyer looking for diesel service online wants one thing first: a phone number they can call right now. A website that buries that number behind a contact form fails the audience before they finish reading the headline.",
      "The brief was to build a site that leads with the contact path, names the actual services and equipment, states the location explicitly, and makes it easy for a buyer in transit to find what they need in seconds. No friction. No corporate language. Just the facts, structured around the phone call.",
    ],
    approachH2: "Phone first. Services second. Honesty throughout.",
    approachBody: [
      "The information architecture was built around the contact path. Call and WhatsApp buttons appear on every page, every section, and the mobile navigation. The phone number is +264 81 741 2110. It is visible above the fold on every screen size. The email is dieselman.nam@gmail.com. None of this is decoration. A diesel service site that hides the phone number is a site that loses the customer.",
      "The services were structured as four equal pillars: Mobile Wheel Alignment, Diagnostics and ECU Programming, Mechanical and Diesel Repairs, and Call-out and Roadside Assistance. Each gets its own page. Each page states what is in scope and what is not claimed. That honesty pattern is unusual for service websites. Most service sites overpromise. Dieselman's site does the opposite. It states what the team actually does, names the equipment they actually use, and is explicit about what they do not claim (HAWEKA partnership, fixed radius, response times, tolerance targets).",
      "The visual system leaned into the industrial context. Walvis Bay runs on trucks and port logistics. The color palette and photography direction reflect that context. Client-supplied footage from the workshop and from call-outs across the Erongo Region is the visual evidence. Nothing is staged stock. Nothing is faked. The site is honest about which images are workshop footage and which are supporting atmosphere.",
    ],
    craftNotes: [
      {
        label: "Phone number above everything",
        body: "Call and WhatsApp buttons on every page, every section, mobile nav. The phone number is the primary conversion path for a diesel service. Hiding it is the failure mode.",
      },
      {
        label: "HAWEKA AXIS4000 named as equipment",
        body: "The alignment system is named because it is a real piece of equipment that signals competence. The site is explicit that this is not a HAWEKA endorsement. Honesty about the relationship is itself a trust signal.",
      },
      {
        label: "In scope / Not claimed pattern",
        body: "Each service page lists what is in scope and what is not claimed. Most service sites overpromise. Dieselman's site does the opposite. Naming the limits is a positioning move.",
      },
    ],
    outcomeH2:
      "A site that gets a truck moving again as fast as the phone can ring.",
    outcomeBody: [
      "Dieselman Nam launched with a site that puts the contact path first, the services second, and the equipment and location as verifiable specifics. A buyer in transit can find the phone number, understand the service scope, and call in under thirty seconds. The site does the qualifying work before the phone rings.",
      "The lesson was about honesty as positioning. In a category where most sites overpromise and under-specify, being explicit about what you actually do, what equipment you actually use, and what you do not claim is a differentiator. The site does not try to sound big. It tries to sound accurate. Accuracy is the trust signal for a buyer whose truck is sitting on the side of the road.",
    ],
    nextSlug: "enchanted",
  },

  /* ──────────────────────────────────────────────
     PROJECT 13: Enchanted Artistry CC
     ────────────────────────────────────────────── */
  {
    slug: "enchanted",
    screenshotSlug: "enchanted",
    name: "Enchanted Artistry CC",
    url: "https://www.enchantedna.com",
    year: "2026",
    industry: "Cosmetology, Arts & Mentorship",
    services: ["Brand Identity", "Website Design", "Website Development"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor:
      "Cosmetology, mentorship, and creative guidance for women in Windhoek, including expectant and new mothers",
    challengeH2:
      "A Windhoek cosmetology and mentorship practice needed a site that carried two founders' voices without splitting into two brands.",
    challengeBody: [
      "Enchanted Artistry CC is a Windhoek-based practice run by two founders. Chané Yvette Philander shapes the creative side. Anthea Feris brings the people-centred guidance. The work spans cosmetology, drama coaching, content creation, and mentorship for women, including expectant and new mothers. It is a faith-rooted practice. It is not a religious brand. That distinction matters and the previous presence did not communicate it.",
      "The challenge was dual. The site needed to serve beauty clients looking for makeup and hair services, and it needed to serve mothers looking for guidance through pregnancy, post-partum, and breastfeeding. Those are different audiences with different needs. Most cosmetology sites collapse them into a single services list. That approach underserves both. The site also needed to make the founders visible as people, not as a generic brand, because the work is personal and the trust signal is the founder herself.",
      "The brief was to build a site that holds the dual nature of the practice. Cosmetology and mentorship as equal pillars. Founders visible by name. Faith present without being a religious site. Contact paths that reflect how Namibian women actually communicate, which means WhatsApp, and which means two numbers because there are two founders.",
    ],
    approachH2: "Founders as the brand. Services as the structure.",
    approachBody: [
      "The strategic decision was to make the founders the brand. Chané and Anthea are named on the homepage with their portraits. Their roles are stated. Their individual WhatsApp numbers are listed separately. A visitor who connects more naturally with one founder can reach that founder directly. That is not a small thing in a market where most business sites list a single generic contact form.",
      "The services were structured as five equal pillars: Makeup, Hair, Drama coaching, Guidance, and Content creation. Each gets its own block with a clear scope and a direct Enquire button. Guidance is positioned as the differentiated service. Most Windhoek cosmetology sites do not offer mentorship for expectant and new mothers. Enchanted's site makes that service visible as a first-class category, not a footnote.",
      "The faith dimension was handled with restraint. The biblical reference (Matthew 5:16) appears once, in the footer, as part of the brand voice. It is present for visitors who recognise it. It does not dominate the experience for visitors who do not. That balance is what lets the site serve both the founder's faith and the broad audience without alienating either.",
    ],
    craftNotes: [
      {
        label: "Two WhatsApp numbers, one per founder",
        body: "Chané and Anthea each have their own WhatsApp number on the site. A visitor can reach the founder they connect with directly. That matches how Namibian women actually communicate.",
      },
      {
        label: "Guidance as a first-class service",
        body: "Mentorship for expectant and new mothers is positioned as an equal pillar alongside makeup and hair. Most cosmetology sites bury it. Enchanted's site makes it visible because it is the differentiated service.",
      },
      {
        label: "Faith present, not preached",
        body: "The Matthew 5:16 reference appears once, in the footer. It is present for visitors who recognise it. It does not dominate the experience for visitors who do not. That balance serves both audiences.",
      },
    ],
    outcomeH2: "A site that holds two founders, two audiences, and one brand.",
    outcomeBody: [
      "Enchanted Artistry CC launched with a site that makes the founders visible, the services legible, and the contact paths direct. A beauty client can find what they need in two clicks. A mother looking for guidance can find it in two clicks. Both can reach the founder they connect with directly. The site does what it was built to do: hold the dual nature of the practice without splitting into two brands.",
      "The primary lesson was about founders as the brand. In a category where most cosmetology sites look interchangeable, putting the actual people behind the work front and centre is the differentiator. Trust in this category is personal. The site needed to reflect that. Founders visible by name, with their own WhatsApp numbers, is how that trust gets built online.",
    ],
    nextSlug: "weca",
  },

  /* ──────────────────────────────────────────────
     PROJECT 14: Weca Offroad Centre
     ────────────────────────────────────────────── */
  {
    slug: "weca",
    screenshotSlug: "weca",
    name: "Weca Offroad Centre",
    url: "https://wecaoffroad.com",
    year: "2026",
    industry: "4x4 Offroad Fitment & Accessories",
    services: ["Brand Identity", "Website Design", "Website Development", "E-commerce Setup"],
    tech: ["Next.js", "Tailwind CSS"],
    descriptor:
      "Namibia's trusted 4x4 specialist in Swakopmund, selling and fitment for 20 leading offroad brands with a price-match guarantee and live Google reviews",
    challengeH2:
      "A Swakopmund 4x4 fitment workshop with twenty authorised brands needed a site that made the catalogue legible before the shop even opened.",
    challengeBody: [
      "Weca Offroad Centre operates from the corner of Eberston and Nelson Mandela Street in Swakopmund. Established 2015. The workshop sells and fits parts and accessories from twenty authorised brands: Wildog, Dometic, Tentco, Tough Dog, EcoFlow, WARN, Howling Moon, Fox, Runva, GOBI X, Ratel, Moremi, DeGraaf Exhausts, Fredlin Hoists, EFS, Tougher, Beesdam, Escape Gear, AluBlack, and Rockford. The work spans rooftop tent installation, suspension system fitment, bumper replacement, and bespoke canopy building. None of this was on the previous site in a form a buyer could use.",
      "The audience is specific. Namibian 4x4 owners preparing for a trip into the Namib or the Kaokoveld, safari operators maintaining fleet vehicles, and overland travellers passing through Swakopmund who need a part fitted before they continue north. A buyer in this category has two questions before they make a call. Which brands do you actually stock? And what does fitment actually cost? A site that cannot answer either question forces the buyer onto WhatsApp for a quote, which is friction when the competitor down the road publishes prices.",
      "The brief was to build a site that names every authorised brand, publishes fitment prices openly, makes WhatsApp the contact path of first resort (because that is how Namibian buyers actually communicate), and surfaces third-party proof that cannot be edited or removed. The site is currently under construction by Tangison Studio, with a public banner stating that content and pricing are not final. That honesty about the in-progress state is itself part of the trust pattern.",
    ],
    approachH2: "Brands named. Prices published. WhatsApp first. Google reviews as proof.",
    approachBody: [
      "The information architecture leads with the brand catalogue. Twenty authorised brands are listed on the homepage in an auto-scrolling carousel, each with a one-line scope description (Wildog for bumpers and protection, Dometic for camping equipment, Tough Dog for suspension systems, WARN for winches and recovery gear, and so on). A buyer who already knows which brand they want can confirm in seconds that Weca stocks it. A buyer who does not know which brand they want can scan the list and ask. The catalogue is the trust signal. A 4x4 fitment workshop that does not name its brands is a workshop that does not want to be checked.",
      "The fitment services were structured as four equal pillars with published starting prices: Rooftop Tent Installation from N$ 2,500, Suspension System Fitment from N$ 4,500, Bumper Replacement from N$ 3,500, and Custom Canopy Building on request. Publishing prices is unusual in the Namibian fitment category, where most workshops quote only after a phone call. Weca's site does the opposite because the buyer's first question is what it costs. The price-match guarantee (beat any written quotation in Namibia) is stated explicitly on the Why Weca Offroad section, alongside Expert Fitment, Quality Parts, and After-Sales support.",
      "The contact path is WhatsApp first, phone second, email third. The phone number is +264 81 169 1942. The email is wecaoffroadcentre@gmail.com. Hours are Mon-Fri 08:00 to 17:00 and Sat 08:00 to 12:00. The location is named explicitly. The trust proof is the live Google Maps embed on the homepage, which pulls reviews directly from Google's listing and cannot be edited or removed by Weca. That detail matters in a category where most sites publish self-curated testimonials. The Weca site does not host testimonials at all. It points at Google.",
    ],
    craftNotes: [
      {
        label: "Twenty authorised brands named on the homepage",
        body: "Wildog, Dometic, Tentco, Tough Dog, EcoFlow, WARN, Howling Moon, Fox, Runva, GOBI X, Ratel, Moremi, DeGraaf Exhausts, Fredlin Hoists, EFS, Tougher, Beesdam, Escape Gear, AluBlack, Rockford. The catalogue is the trust signal. A fitment workshop that does not name its brands cannot be checked.",
      },
      {
        label: "Fitment prices published openly",
        body: "Rooftop Tent Installation from N$ 2,500. Suspension System Fitment from N$ 4,500. Bumper Replacement from N$ 3,500. Custom Canopy Building on request. Most Namibian fitment workshops quote only after a phone call. Weca's site publishes prices because the buyer's first question is what it costs.",
      },
      {
        label: "Live Google reviews as the only testimonial layer",
        body: "The site embeds the Google Maps listing for Weca Offroad Centre directly on the homepage. Reviews are pulled live from Google. Weca cannot edit or remove them. The site does not host self-curated testimonials. That detail is the trust pattern in a category where most testimonial sections are unverifiable.",
      },
    ],
    outcomeH2:
      "A site that names its brands, publishes its prices, and points at Google for the proof.",
    outcomeBody: [
      "Weca Offroad Centre launched in a public under-construction state with a site that does what the category usually avoids. It names every authorised brand. It publishes fitment prices. It surfaces reviews that cannot be edited or removed. A buyer can confirm the brand they want, see what fitment costs, and read third-party proof before they make the WhatsApp call. The site does the qualifying work before the phone rings.",
      "The lesson was about proof over claim. In a category where most 4x4 fitment sites promise quality, expertise, and service, the differentiator is publishing the specifics that can be checked. Which brands. What prices. What real customers have actually said. The Weca site does not promise. It shows. The trust signal is the verifiable detail, not the adjective.",
    ],
    nextSlug: "mendozer",
  },
  /* ──────────────────────────────────────────────
     PROJECT 15: Mendozer Investments
     ────────────────────────────────────────────── */
  {
    slug: "mendozer",
    screenshotSlug: "mendozer",
    name: "Mendozer Investments",
    url: "https://mendozer.com",
    year: "2026",
    industry: "Multi-Sector Group",
    services: ["Brand Systems", "Website Design", "Website Development", "Content Structure"],
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    descriptor:
      "A Namibian group operating across construction, technology, cooling, logistics, fuel and energy, and tourism and agriculture, presented as one accountable structure rather than six separate businesses.",
    challengeH2:
      "Six working directions under one group, and no single place that made the whole structure legible.",
    challengeBody: [
      "Mendozer Investments works across six directions: construction and infrastructure, technology and systems, cooling and cold chain, logistics and support services, fuel and energy distribution, and tourism and agriculture. Each one has its own buyers, its own procurement language, and its own idea of what proof looks like. A contractor checking whether the group can handle a site build is not reading the same page as a facilities manager checking cold-chain capability.",
      "A diversified group faces a specific problem online. Say everything at once and the visitor cannot tell what you actually do. Split into six microsites and the group advantage disappears, because the whole argument for a group is that one accountable backbone carries work that crosses disciplines. The site had to hold both ideas at the same time.",
      "There was a second constraint, and it shaped the build more than anything else. Mendozer would not publish project claims that had not been approved for publication. No invented client list, no unverifiable numbers, no stock photography standing in for site work. That ruled out the usual way a group site builds credibility and forced the structure to earn trust differently.",
    ],
    approachH2: "Six clear entry points, one group behind all of them.",
    approachBody: [
      "The homepage leads with the group proposition, then branches immediately into the six directions. A visitor picks the direction closest to the work in front of them and moves into a sector page that speaks that sector's language. Nobody has to read about cold chain to find out about construction. The routing question, which sector am I, is answered in the first screen.",
      "The group argument is carried by a single instruction repeated at each branch: start with the sector closest to the work, and bring the group in when the brief crosses disciplines. That sentence does the work that a generic about-us paragraph usually fails at, because it tells the visitor exactly when the multi-sector structure becomes useful to them rather than asserting that it is impressive.",
      "Because approved project detail was limited, the site was built so that verifiable material carries the credibility. Real archive imagery from actual sites, published only where it was cleared. A compliance route that surfaces the registration, VAT and licensing record. An updates route for activity that has been approved for publication. The enquiry path sends a prepared message to contact@mendozer.com without storing submissions on the site. Where proof was not available, the site says nothing rather than filling the gap.",
    ],
    craftNotes: [
      {
        label: "Sector-first routing on the homepage",
        body: "Six numbered directions, each with a one-line scope statement and its own route. A visitor self-selects in the first screen instead of reading a generic group overview and guessing which part applies to them.",
      },
      {
        label: "Only approved imagery, only approved claims",
        body: "Project and service detail appears when it has been cleared for publication. Archive photography comes from real Mendozer sites. The site carries no unverified project claims and no self-curated testimonials, because a group that cannot be checked is a group that will be doubted.",
      },
      {
        label: "Public records as the trust layer",
        body: "Registration, VAT and licensing detail sits on its own route. For procurement buyers in Namibia, a verifiable compliance record answers the qualifying question faster than any claim about capability.",
      },
      {
        label: "One enquiry route across six sectors",
        body: "The contact path prepares a message to contact@mendozer.com and lets the sender pick a sector or a group enquiry when the brief crosses more than one direction. No enquiry data is stored on the website.",
      },
    ],
    outcomeH2:
      "One group site that routes six audiences without diluting any of them.",
    outcomeBody: [
      "Mendozer Investments has a site where a construction buyer, a cold-chain manager and a fuel distributor each find their own entry point within seconds, while the group structure stays visible behind all six. The multi-sector position reads as coordination rather than as a list of unrelated activities.",
      "The build also settled a question worth carrying forward. Restraint about unverified claims is not a weakness in a group site. Naming only what has been approved, and pointing at public records for the rest, produces a page that holds up when a procurement officer starts checking. Specificity that can be verified beats scale that cannot.",
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
