/**
 * Studio Resources.
 *
 * 20 practical guides for people running businesses and building digital
 * products in Namibia and the wider SADC region.
 *
 * Editorial rules that apply to every entry in this file:
 *  - No em dashes. Commas, colons and full stops only.
 *  - Currency is written N$ consistently, never mixed with NAD or R.
 *  - Phone numbers use the Namibian format, +264 xx xxx xxxx.
 *  - No invented statistics. Where a number would need a source we describe
 *    the mechanism instead of quoting a figure.
 *  - Written for someone reading on a phone, on mobile data, who is paying
 *    for that data.
 *
 * Per-resource identity: every resource carries its own accent pair and
 * motif so that no two detail pages look like the same template. `accent`
 * is used for large decorative elements only. `accentInk` is the darkened
 * variant used for text and small marks, chosen to pass WCAG AA on both
 * Skeleton Bone (#F6F4EF) and Signal White (#FFFFFF).
 */

export type ResourceMotif = "grid" | "rule" | "stack" | "arc" | "column" | "step";

export type ResourceFormat = "Guide" | "Checklist" | "Template" | "Explainer" | "Reference";

export interface ResourceSection {
  heading?: string;
  body?: string[];
  /** Rendered as a numbered sequence. Use for processes that have an order. */
  steps?: { title: string; detail: string }[];
  /** Rendered as a tick list. Use for things you verify, not things you do in order. */
  checks?: string[];
  /** Rendered as a two-column comparison table. */
  table?: { caption?: string; head: string[]; rows: string[][] };
  /** Rendered as a pull quote sized against the resource accent. */
  callout?: string;
}

export interface Resource {
  slug: string;
  title: string;
  excerpt: string;
  category: "Brand" | "Product" | "Web" | "Intelligence" | "Operations";
  format: ResourceFormat;
  readingTime: number;
  date: string;
  /** Large decorative use only. */
  accent: string;
  /** AA-passing text variant of the accent. */
  accentInk: string;
  motif: ResourceMotif;
  cover: string;
  /** Short line shown under the title on the detail page. Sets the frame. */
  standfirst: string;
  sections: ResourceSection[];
  related: string[];
}

export const resources: Resource[] = [
  /* 01 */
  {
    slug: "namibian-website-launch-checklist",
    title: "The Namibian Website Launch Checklist",
    excerpt:
      "Everything that should be true before a Namibian business puts a website in front of customers, from domain control to the phone number actually being answered.",
    category: "Web",
    format: "Checklist",
    readingTime: 6,
    date: "2026-08-10",
    accent: "#2CB5B4",
    accentInk: "#0F5C5B",
    motif: "grid",
    cover: "/images/paintings/resources/resource-01.webp",
    standfirst:
      "A launch is not the day the site goes live. It is the day the site can survive a customer.",
    sections: [
      {
        body: [
          "Most website launches in Namibia go wrong in the same few places. The domain is registered in a developer's personal account. The contact number on the site rings a phone nobody carries. The site looks correct on the laptop it was built on and falls apart on the phone the customer is actually holding.",
          "This checklist is the one we run before any Studio project goes live. Work through it in order. Anything you cannot tick is a launch blocker, not a nice to have.",
        ],
      },
      {
        heading: "Ownership and access",
        checks: [
          "The domain is registered in the business name, in an account the business controls, not the developer's personal account.",
          "You hold the login for the domain registrar and can prove it by logging in yourself, today.",
          "You hold the login for the hosting or deployment platform.",
          "The business email account that receives form submissions belongs to the business, not to a staff member who may leave.",
          "Domain auto-renew is switched on and the card on file is current.",
        ],
      },
      {
        heading: "The things customers touch",
        checks: [
          "Every phone number on the site is dialled once, from a phone, and answered by a person who knows the business.",
          "Every email address on the site receives a test message and someone replies to it.",
          "The WhatsApp link opens the correct number with a sensible prefilled message.",
          "Physical address matches what appears on Google Maps, written street, suburb, town.",
          "Trading hours are correct, including how you handle public holidays.",
        ],
      },
      {
        heading: "The technical floor",
        checks: [
          "The site loads on a phone on mobile data, not only on office wifi.",
          "Every page has a unique title and description.",
          "The site has a favicon and a social sharing image, so a WhatsApp link preview does not look broken.",
          "HTTPS is active and the http version redirects to it.",
          "A 404 page exists, is styled, and offers a route back into the site.",
          "The sitemap is submitted to Google Search Console.",
        ],
      },
      {
        callout:
          "If you tick nothing else, tick domain ownership. Recovering a domain from a former developer is the single most expensive avoidable problem in Namibian small business web work.",
      },
      {
        heading: "The week after",
        body: [
          "Launch day is not the end of the work. In the first week, watch what people actually do. Check that enquiries are arriving. Check that they are arriving in a form you can act on. Check that the phone number is being used.",
          "If nothing arrives in the first week, the problem is almost never the design. It is usually that nobody knows the site exists yet, or that the site does not say clearly enough what the business does.",
        ],
      },
    ],
    related: ["what-a-website-costs-in-namibia", "website-handover-checklist", "google-business-profile-namibia"],
  },

  /* 02 */
  {
    slug: "domains-and-hosting-in-namibia",
    title: "Domains and Hosting for Namibian Businesses",
    excerpt:
      "Whether to take a .na or a .com, where to host, and how to avoid the most common ownership trap in Namibian web projects.",
    category: "Web",
    format: "Guide",
    readingTime: 7,
    date: "2026-08-08",
    accent: "#C56A4A",
    accentInk: "#9A4A2E",
    motif: "column",
    cover: "/images/paintings/resources/resource-02.webp",
    standfirst:
      "The domain is the only part of your website you can never rebuild. Treat it accordingly.",
    sections: [
      {
        body: [
          "Everything else about a website can be replaced. The design can be redone, the copy rewritten, the hosting moved in an afternoon. The domain is different. It is the address customers have saved, the address printed on your vehicle, the address in your email signature. Losing it is not a technical problem, it is a business problem.",
        ],
      },
      {
        heading: "Choosing between .na and .com",
        table: {
          caption: "How the two options actually differ in practice",
          head: ["Consideration", ".com.na or .na", ".com"],
          rows: [
            ["Signals", "Clearly a Namibian business", "Could be anywhere"],
            ["Registration", "Local process, more paperwork", "Instant, self service"],
            ["Cost", "Generally higher per year", "Generally lower per year"],
            ["Best for", "Businesses serving Namibia only", "Businesses selling across borders"],
            ["Availability", "Better, shorter names still free", "Most short names taken"],
          ],
        },
      },
      {
        body: [
          "There is no universally correct answer. A hardware supplier in Ondangwa serving customers in Oshana has a good reason to take a .com.na, because the local signal is an asset. A lodge selling to German and South African travellers has a good reason to take a .com, because the international audience does not read .na as trust, it reads it as unfamiliar.",
          "If the budget allows, register both and point one at the other. This is cheap insurance and it stops a competitor taking the variant.",
        ],
      },
      {
        heading: "Where to host",
        body: [
          "Physical server location matters less than people assume. A modern site served from a global edge network will usually reach a Windhoek browser faster than a single server sitting in a local data centre, because the content is cached closer to the user and the connection is better optimised.",
          "What matters far more is total page weight. On a Namibian mobile connection, a lean site on distant hosting beats a heavy site on local hosting every time. Fix the weight first, worry about the server location second.",
        ],
      },
      {
        heading: "The ownership trap",
        body: [
          "The most common failure we see is a domain registered under a developer's personal account, with a personal email as the administrative contact. This is rarely malicious. It is usually just the fastest way to get a project started.",
          "It becomes a problem when the relationship ends, when the developer moves abroad, or when the renewal notice goes to an inbox nobody checks any more. At that point the business cannot renew its own address.",
        ],
        checks: [
          "Registrar account is in the business name.",
          "Administrative contact is a business email address that more than one person can access.",
          "You have personally logged into the registrar at least once.",
          "Auto renew is on, with a current payment method.",
          "The renewal date is in a shared calendar, not only in an email.",
        ],
      },
    ],
    related: ["website-handover-checklist", "namibian-website-launch-checklist", "template-or-custom-build"],
  },

  /* 03 */
  {
    slug: "writing-website-copy-for-namibian-customers",
    title: "Writing Website Copy for Namibian Customers",
    excerpt:
      "How to write for a Namibian audience without sounding like a template built for somewhere else, and where multilingual copy helps rather than patronises.",
    category: "Brand",
    format: "Guide",
    readingTime: 8,
    date: "2026-08-06",
    accent: "#153E52",
    accentInk: "#153E52",
    motif: "rule",
    cover: "/images/paintings/resources/resource-03.webp",
    standfirst:
      "Most bad website copy in Namibia is not badly written. It is written for somebody else.",
    sections: [
      {
        body: [
          "Read enough Namibian business websites and you start seeing the same paragraph. Something about being a leading provider, committed to excellence, delivering innovative solutions tailored to your needs. It is grammatically fine and it says nothing. It was written for no particular reader, which means it lands with no particular reader.",
          "The fix is not better adjectives. It is writing to someone specific.",
        ],
      },
      {
        heading: "Say the specific thing",
        table: {
          caption: "The same claim, vague and specific",
          head: ["Vague", "Specific"],
          rows: [
            ["Fast, reliable delivery", "Same day in Windhoek, next day to Walvis Bay and Swakopmund"],
            ["Competitive pricing", "Full price list on this page, no quote needed"],
            ["Years of experience", "Trading since 2009, same workshop, same two mechanics"],
            ["We serve all of Namibia", "We deliver to all 14 regions, with a surcharge north of Tsumeb"],
            ["Quality workmanship", "Twelve month warranty on all fitted parts"],
          ],
        },
      },
      {
        body: [
          "Notice that every specific version is also a version a competitor cannot copy without either matching it or lying. That is the point. Specificity is a competitive moat, vagueness is a commodity.",
        ],
      },
      {
        heading: "Write for the connection, not just the reader",
        body: [
          "A meaningful share of Namibian traffic arrives on a phone, on mobile data, outside the main centres. That reader is paying for every kilobyte and is often on an unreliable connection. This changes how you write, not only how you build.",
          "Put the most important sentence first. Do not bury the offer under three paragraphs of company history. Keep the hero short enough to read before the images finish loading, because sometimes the images will not finish loading.",
        ],
      },
      {
        heading: "On using local languages",
        body: [
          "Namibia is genuinely multilingual. Oshiwambo, Afrikaans, Otjiherero, Khoekhoegowab, Rukwangali, Silozi and German all carry real weight depending on region and audience. Used well, a local greeting or a place name in the right language signals that you are actually from here.",
          "Used badly, it is worse than not trying. A mistranslated greeting, or a language chosen because it seemed representative rather than because it matches the audience, reads as decoration. Customers notice.",
          "The rule we work to is simple. Never use a language you cannot have verified by a fluent speaker who knows the audience. If you cannot get it checked before launch, leave it out and add it later.",
        ],
        callout:
          "Tokenistic use of a language you cannot verify is worse than not using it at all.",
      },
      {
        heading: "Formality is a decision, not a default",
        body: [
          "Namibian business audiences span a wide range. A tender document for a ministry and an Instagram-native fashion label in Windhoek are not the same reader, and copy that works for one will actively repel the other.",
          "Decide the register deliberately. Government, mining, financial services and corporate procurement generally expect a more formal address. Consumer retail, hospitality and youth-facing brands generally do not. Getting this wrong is the fastest way to look like you do not understand who you are talking to.",
        ],
      },
      {
        heading: "The house rules we follow",
        checks: [
          "Use simple words. Use, not utilise. Buy, not purchase.",
          "Write in the active voice. We deliver nationwide, not nationwide delivery is offered.",
          "Cut the hedges. Almost, very, really, kind of. They weaken every sentence they enter.",
          "No em dashes. Commas, colons and full stops carry the same work.",
          "Write N$ consistently. Never mix N$ and NAD in the same document.",
          "Phone numbers in full international format, +264 81 341 1522, so the link works from outside the country.",
          "Never invent a statistic or a testimonial. If the proof does not exist yet, say what is true instead.",
        ],
      },
    ],
    related: ["brand-identity-starter-kit", "seo-for-namibian-search", "scoping-a-project-before-quotes"],
  },

  /* 04 */
  {
    slug: "page-weight-and-mobile-data-costs",
    title: "Page Weight and the Cost of Mobile Data",
    excerpt:
      "Why a heavy website is a pricing decision in Namibia, and a practical budget for what a page should weigh.",
    category: "Web",
    format: "Explainer",
    readingTime: 6,
    date: "2026-08-04",
    accent: "#3D7A5F",
    accentInk: "#2C5A46",
    motif: "stack",
    cover: "/images/paintings/resources/resource-04.webp",
    standfirst:
      "Every megabyte you ship is money out of your customer's airtime. Build like it.",
    sections: [
      {
        body: [
          "In markets where data is effectively free and unlimited, page weight is a speed problem. In Namibia it is also a cost problem. A visitor on a prepaid bundle is spending real money to load your homepage, and if that homepage is heavy they are spending more of it than they need to.",
          "This is not an abstract nicety. A heavy site loses the customer twice. Once because it is slow, and once because loading it cost them something.",
        ],
      },
      {
        heading: "A working budget",
        table: {
          caption: "Total transfer per page, uncached first visit",
          head: ["Budget", "Weight", "What it means"],
          rows: [
            ["Target", "Under 500 KB", "Loads comfortably on a weak connection"],
            ["Acceptable", "500 KB to 1 MB", "Noticeably slow on 3G, workable on LTE"],
            ["Too heavy", "1 MB to 2 MB", "Visitors on data will feel the cost"],
            ["Broken", "Over 2 MB", "You are losing people before they see anything"],
          ],
        },
      },
      {
        heading: "Where the weight actually goes",
        body: [
          "In almost every site we audit, the order is the same. Images first, by a wide margin. JavaScript second. Fonts third. CSS is almost never the problem, despite being the thing people most often try to minify.",
          "This means the highest leverage work is nearly always image work, and the most common mistake is shipping a photograph at its original camera dimensions and letting the browser scale it down. The browser scales the display size. It still downloads every pixel.",
        ],
      },
      {
        heading: "The fixes, in order of return",
        steps: [
          {
            title: "Resize before you upload",
            detail:
              "No image on a website needs to be 4000 pixels wide. A full width hero rarely needs more than 1600. A card thumbnail rarely needs more than 800.",
          },
          {
            title: "Use a modern format",
            detail:
              "WebP typically saves a quarter to a third over JPEG at the same visual quality. Most tools export it now.",
          },
          {
            title: "Set explicit width and height",
            detail:
              "This does not reduce weight, but it stops the page jumping as images arrive, which is what makes a slow site feel broken rather than just slow.",
          },
          {
            title: "Lazy load anything below the fold",
            detail:
              "The visitor may never scroll that far. Do not make them pay for it up front.",
          },
          {
            title: "Then look at JavaScript",
            detail:
              "Ask what each third party script is actually earning. Chat widgets, tag managers and analytics stacks accumulate quietly and are rarely audited after installation.",
          },
        ],
      },
      {
        callout:
          "Fix the images before you optimise anything else. On most sites it is more than half the total weight and it is the easiest thing to change.",
      },
    ],
    related: ["preparing-photography-brief", "accessibility-basics-wcag-aa", "connectivity-resilience-planning"],
  },

  /* 05 */
  {
    slug: "brand-identity-starter-kit",
    title: "A Brand Identity Starter Kit for Small Namibian Businesses",
    excerpt:
      "The minimum set of brand assets a small business actually needs, what each one is for, and what you can safely skip until later.",
    category: "Brand",
    format: "Guide",
    readingTime: 7,
    date: "2026-08-02",
    accent: "#7A4E7E",
    accentInk: "#5E3A61",
    motif: "arc",
    cover: "/images/paintings/resources/resource-05.webp",
    standfirst:
      "You do not need a brand book. You need about nine things, done properly, that stop you improvising every time you need a poster.",
    sections: [
      {
        body: [
          "Full brand identity programmes are appropriate for organisations with multiple departments producing material independently. Most small Namibian businesses are not that. They have one or two people making a poster on a Thursday afternoon because there is a promotion on Saturday.",
          "For that reality, a hundred page brand book is not just excessive, it is actively unhelpful. What you need is a small kit that answers the questions you will actually face.",
        ],
      },
      {
        heading: "The nine things",
        steps: [
          { title: "Primary logo", detail: "The full version. Used where there is room for it." },
          { title: "Logomark", detail: "The symbol alone, for profile pictures, favicons and stamps." },
          { title: "A one colour version", detail: "Solid black and solid white. For vehicle vinyl, embroidery, stamps and anywhere printing in colour is not an option." },
          { title: "Two typefaces", detail: "One for headings, one for body. Both must be available on the machines your staff actually use. A beautiful licensed typeface nobody has installed will simply be replaced with Calibri." },
          { title: "Three to five colours", detail: "Written down as hex values, not described as our blue. Include one dark, one light, and one accent." },
          { title: "A photography rule", detail: "One sentence about what your photographs look like, so images from three different sources still feel related." },
          { title: "A social profile set", detail: "Correctly cropped square and circular versions, exported once, so nobody crops the logo badly under time pressure." },
          { title: "An email signature", detail: "One block of text, same for everyone, with the correct phone format." },
          { title: "A document template", detail: "Quote and invoice. This is the brand asset customers see most often and the one most often neglected." },
        ],
      },
      {
        heading: "File formats, kept simple",
        table: {
          head: ["You have", "Use it for", "Watch out for"],
          rows: [
            ["SVG", "Websites, anything on screen", "Scales infinitely, tiny file size, always prefer it"],
            ["PDF or EPS", "Printers, signwriters, vinyl", "This is what a professional printer will ask for"],
            ["PNG", "Slides, documents, transparent backgrounds", "Fixed size, gets blurry when enlarged"],
            ["JPG", "Photographs only", "Cannot hold a transparent background, never use for a logo"],
          ],
        },
      },
      {
        callout:
          "If your designer delivered only JPG and PNG files, you did not receive your logo. You received pictures of your logo. Ask for the vector source.",
      },
      {
        heading: "What to skip for now",
        body: [
          "You can safely defer a tone of voice document, an illustration system, a motion identity and a full brand architecture. These matter at scale. They do not matter when three people are running everything.",
          "Spend the money you save on better photography instead. For a small business, photography changes perception faster than almost any other brand investment.",
        ],
      },
    ],
    related: ["logo-file-formats-explained", "preparing-photography-brief", "writing-website-copy-for-namibian-customers"],
  },

  /* 06 */
  {
    slug: "logo-file-formats-explained",
    title: "Logo File Formats, Explained Once",
    excerpt:
      "What SVG, PDF, PNG and JPG are each for, why your printer keeps asking for something you do not have, and how to tell if you actually own your logo.",
    category: "Brand",
    format: "Reference",
    readingTime: 5,
    date: "2026-07-30",
    accent: "#B8863B",
    accentInk: "#8A6329",
    motif: "grid",
    cover: "/images/paintings/resources/resource-06.webp",
    standfirst:
      "The signwriter is not being difficult. You genuinely cannot make a good banner from a logo pulled off Facebook.",
    sections: [
      {
        body: [
          "There are two families of image file, and almost every logo problem comes from confusing them.",
          "Vector files describe shapes with mathematics. A circle is stored as an instruction to draw a circle. You can scale it to the side of a building and it stays sharp. Raster files store a grid of coloured dots. Enlarge it and you are enlarging the dots, which is why it goes soft and blocky.",
          "A logo should always be created as a vector. Everything else is exported from it.",
        ],
      },
      {
        heading: "The four you will encounter",
        table: {
          head: ["Format", "Family", "Use it for", "Do not use it for"],
          rows: [
            ["SVG", "Vector", "Websites and apps", "Sending to a traditional printer, some still cannot open it"],
            ["PDF or EPS", "Vector", "Printers, signwriters, vehicle branding, embroidery", "Putting on a web page"],
            ["PNG", "Raster", "Slides, Word documents, anywhere you need transparency", "Anything that will be enlarged"],
            ["JPG", "Raster", "Photographs", "Logos, ever, because it cannot do transparency"],
          ],
        },
      },
      {
        heading: "How to test whether you own your logo",
        body: [
          "Open the file you were given. If you can zoom in indefinitely and the edges stay perfectly crisp, it is a vector and you are fine. If the edges turn into visible squares, it is a raster export.",
          "A raster export is not ownership. If that is all you have, ask your designer for the vector source. If the designer is unreachable, the logo will need to be redrawn, which is a real cost and entirely avoidable.",
        ],
        checks: [
          "You have an SVG file for web use.",
          "You have a PDF or EPS for print.",
          "You have a solid black version and a solid white version.",
          "You have a version with a transparent background.",
          "The files are stored somewhere the business controls, not only on one person's laptop.",
        ],
      },
      {
        callout:
          "A logo delivered only as a JPG with a white box behind it is the single most common asset problem we find when auditing Namibian businesses.",
      },
    ],
    related: ["brand-identity-starter-kit", "website-handover-checklist", "preparing-photography-brief"],
  },

  /* 07 */
  {
    slug: "payment-options-for-namibian-websites",
    title: "Taking Payment on a Namibian Website",
    excerpt:
      "The realistic options for accepting money online in Namibia, what each one costs you in friction, and why EFT is still doing most of the work.",
    category: "Operations",
    format: "Guide",
    readingTime: 7,
    date: "2026-07-28",
    accent: "#2B6B8E",
    accentInk: "#1F5069",
    motif: "column",
    cover: "/images/paintings/resources/resource-07.webp",
    standfirst:
      "Before you build a checkout, work out whether your customers actually want to pay that way.",
    sections: [
      {
        body: [
          "Online payment in Namibia is not the solved problem it is in larger markets. The options are narrower, the integration work is heavier, and a meaningful share of customers still prefer to pay by EFT or in person even when a card option exists.",
          "That last point matters more than the technology. Building a full checkout for an audience that will not use it is an expensive way to learn something you could have found out by asking.",
          "Confirm current fees, settlement times and onboarding requirements directly with each provider before you commit. These change, and they vary by business type and turnover. [NEEDS CLIENT VERIFICATION]",
        ],
      },
      {
        heading: "The realistic options",
        table: {
          head: ["Method", "Best for", "Main friction"],
          rows: [
            ["Bank EFT with reference", "Invoiced work, B2B, higher value orders", "Manual reconciliation, payment confirmation lag"],
            ["Card gateway", "Consumer retail, repeat low value orders", "Merchant onboarding, per transaction fees"],
            ["Mobile money and wallets", "Lower value consumer payments", "Coverage depends on the customer's provider"],
            ["Cash on delivery", "Local delivery in a single town", "Cash handling, failed deliveries"],
            ["Pay in store, order online", "Businesses with a physical shopfront", "None technically, this is often the right answer"],
          ],
        },
      },
      {
        heading: "The question to answer first",
        body: [
          "How many orders per month do you expect, and what is the average value? If the answer is a small number of high value orders, you almost certainly do not need a checkout. You need a good quote request form and clear banking details.",
          "A checkout earns its complexity when order volume is high enough that manual invoicing becomes the bottleneck. Below that point, it adds cost, adds a thing that can break, and adds a compliance surface, in exchange for convenience you may not need yet.",
        ],
      },
      {
        heading: "If you are taking EFT, do it properly",
        checks: [
          "Banking details are on the page, not only in an emailed invoice.",
          "You tell the customer exactly what reference to use, and why it matters.",
          "You state how long confirmation takes, so the customer is not left guessing.",
          "Someone checks the account daily and confirms receipt to the customer.",
          "Prices are written in N$ consistently, with a clear statement of whether VAT is included.",
        ],
      },
      {
        callout:
          "A clear EFT process that a human confirms within a few hours beats a card gateway nobody trusts yet.",
      },
    ],
    related: ["preparing-product-data-ecommerce", "whatsapp-business-for-enquiries", "what-a-website-costs-in-namibia"],
  },

  /* 08 */
  {
    slug: "whatsapp-business-for-enquiries",
    title: "Using WhatsApp Business Without Losing Enquiries",
    excerpt:
      "WhatsApp is the default business channel in Namibia. Here is how to run it so enquiries do not disappear into one person's personal phone.",
    category: "Operations",
    format: "Guide",
    readingTime: 6,
    date: "2026-07-26",
    accent: "#3D7A5F",
    accentInk: "#2C5A46",
    motif: "stack",
    cover: "/images/paintings/resources/resource-08.webp",
    standfirst:
      "For most Namibian businesses WhatsApp is not a support channel. It is the front door.",
    sections: [
      {
        body: [
          "Customers here will message a business on WhatsApp before they will fill in a contact form, and often before they will phone. Fighting that preference is pointless. The work is in handling it properly so that enquiries do not vanish.",
        ],
      },
      {
        heading: "The failure mode",
        body: [
          "The standard pattern is that WhatsApp enquiries land on the owner's personal phone. This works until it does not. Messages get buried under family chats. Nobody else can answer when the owner is driving to Walvis Bay. When a staff member leaves, the conversation history leaves with them.",
          "There is no record of what was quoted, no way to see how many enquiries came in last month, and no way to follow up on the ones that went quiet.",
        ],
      },
      {
        heading: "Setting it up so it survives",
        steps: [
          {
            title: "Use a dedicated business number",
            detail:
              "Separate from anyone's personal number. It stays with the business when staff change. This is the single most important step.",
          },
          {
            title: "Install WhatsApp Business, not standard WhatsApp",
            detail:
              "It is free and gives you a business profile, catalogue, quick replies, labels and away messages.",
          },
          {
            title: "Complete the business profile",
            detail:
              "Address, hours, website, category, short description. This is what a new customer reads before deciding whether you look real.",
          },
          {
            title: "Write three quick replies",
            detail:
              "Pricing, availability, and where you are located. These three questions will be most of your inbound volume.",
          },
          {
            title: "Set an away message with a real time",
            detail:
              "We reply within one working day is honest and useful. We will get back to you shortly is neither.",
          },
          {
            title: "Use labels as a pipeline",
            detail:
              "New enquiry, quoted, waiting on customer, closed. This turns the inbox into something you can actually manage.",
          },
        ],
      },
      {
        heading: "Linking from your website",
        body: [
          "Use a click to chat link so the customer does not have to copy the number. The format is wa.me followed by the number in full international form with no plus sign and no spaces. For +264 81 341 1522 that is wa.me/264813411522.",
          "You can prefill the message, and you should. A link from your pricing page that opens with a message already referring to pricing tells you where the customer came from and saves them typing on a phone.",
        ],
        callout:
          "Prefill a different message on each page. It costs nothing and it tells you which page is actually generating enquiries.",
      },
    ],
    related: ["namibian-website-launch-checklist", "payment-options-for-namibian-websites", "google-business-profile-namibia"],
  },

  /* 09 */
  {
    slug: "preparing-photography-brief",
    title: "Briefing Photography for a Namibian Business",
    excerpt:
      "How to commission photographs that make a business look like itself, and the shot list to hand the photographer before the day.",
    category: "Brand",
    format: "Template",
    readingTime: 6,
    date: "2026-07-24",
    accent: "#C56A4A",
    accentInk: "#9A4A2E",
    motif: "arc",
    cover: "/images/paintings/resources/resource-09.webp",
    standfirst:
      "Stock photography of a boardroom in another country is the fastest way to look like you are hiding something.",
    sections: [
      {
        body: [
          "For a small business, photography moves perception faster than almost any other investment. It is also the thing most often left until the website is nearly finished, at which point there is no budget and no time, and stock images get used instead.",
          "Commission the photography early. Treat it as infrastructure, not decoration.",
        ],
      },
      {
        heading: "Why stock hurts more here",
        body: [
          "Namibia is a small market. Customers frequently recognise the places and the people in genuine photographs, and they equally recognise when the photograph is not from here. A generic image of a smiling team in an office that is clearly not in Windhoek does not read as professional. It reads as evasive.",
          "Real photographs of your actual premises, staff and work will beat better lit stock every time, because they answer the question the customer is really asking, which is whether you exist and whether you do this properly.",
        ],
      },
      {
        heading: "The shot list to hand over",
        checks: [
          "The premises from outside, so a customer can recognise it when they arrive.",
          "The premises inside, wide enough to show the space.",
          "The team, together, looking like themselves rather than posed against a wall.",
          "Individual portraits of anyone a customer will deal with directly, shot the same way.",
          "The work in progress, not only the finished result.",
          "The finished result, shot properly, at least five variations.",
          "Detail shots of materials, tools or product texture, for use as background and section imagery.",
          "At least three horizontal wide frames with empty space, for website headers with text over them.",
        ],
      },
      {
        heading: "The technical asks",
        checks: [
          "Both horizontal and vertical versions of key shots. Websites need wide, social needs tall.",
          "Full resolution originals delivered to you, not only web sized exports.",
          "Written confirmation that you own or are licensed to use the images commercially, indefinitely.",
          "Signed permission from any identifiable staff member or customer appearing in a shot.",
          "Files named descriptively, not DSC_4471.",
        ],
      },
      {
        callout:
          "Ask for the full resolution originals in writing before the shoot, not after. Photographers who deliver only compressed exports are common, and re-exporting later is not always possible.",
      },
      {
        heading: "One rule for consistency",
        body: [
          "Write one sentence describing how your photographs should look, and give it to every photographer you ever hire. Something like: natural light, shot on location, people working rather than posing, no heavy filters.",
          "That single sentence is what keeps images taken two years apart by different people still looking like the same business.",
        ],
      },
    ],
    related: ["brand-identity-starter-kit", "page-weight-and-mobile-data-costs", "content-inventory-template"],
  },

  /* 10 */
  {
    slug: "google-business-profile-namibia",
    title: "Setting Up Google Business Profile in Namibia",
    excerpt:
      "For most local businesses this matters more than the website. How to claim it, what to fill in, and the fields people leave empty.",
    category: "Web",
    format: "Checklist",
    readingTime: 5,
    date: "2026-07-22",
    accent: "#2B6B8E",
    accentInk: "#1F5069",
    motif: "grid",
    cover: "/images/paintings/resources/resource-10.webp",
    standfirst:
      "Many customers will decide whether to contact you from the search result, without ever opening your website.",
    sections: [
      {
        body: [
          "When someone searches for a plumber in Windhoek or a lodge near Etosha, what they see first is a map with business listings. Those listings come from Google Business Profile, and they are free.",
          "A complete profile with real photographs and current hours will beat an incomplete profile belonging to a better business. This is unfair, and it is also how it works.",
        ],
      },
      {
        heading: "Claim it first",
        body: [
          "A listing for your business may already exist, generated automatically or created by a customer. Search for your business name and check. If a listing exists, claim it rather than creating a duplicate, because duplicates split your reviews and confuse the ranking.",
          "Verification usually happens by postcard, phone or email depending on the business type. The postcard route can be slow to Namibian addresses, so use phone or email verification if either is offered.",
        ],
      },
      {
        heading: "The fields that matter",
        checks: [
          "Business name exactly as it appears on your signage. Do not stuff keywords into it.",
          "Primary category chosen precisely. This drives more of your visibility than anything else on the profile.",
          "Full address in Namibian convention, street, suburb, town.",
          "Pin dropped on the actual entrance, not the middle of the block. Check it on a phone.",
          "Phone number in the format customers can tap, +264 81 341 1522.",
          "Hours, including a plan for public holidays.",
          "Website link.",
          "At least ten photographs, real ones, including the exterior so people can find you.",
          "A description that says what you do and where you do it, in plain words.",
        ],
      },
      {
        heading: "The part everyone skips",
        body: [
          "Reviews. Ask satisfied customers directly, in person or over WhatsApp, with a link that takes them straight to the review form. Most people are willing and simply never think of it.",
          "Reply to every review, including the negative ones, calmly and factually. The reply is not for the person who complained. It is for the next customer reading the complaint, who is deciding whether you seem like the kind of business that handles problems well.",
        ],
        callout:
          "Reply to negative reviews for the audience, not the author. Everyone else is reading how you handle it.",
      },
    ],
    related: ["seo-for-namibian-search", "whatsapp-business-for-enquiries", "namibian-website-launch-checklist"],
  },

  /* 11 */
  {
    slug: "scoping-a-project-before-quotes",
    title: "Scoping a Digital Project Before You Ask for Quotes",
    excerpt:
      "How to write a brief good enough that three quotes are actually comparable, and why vague briefs produce quotes that are all wrong.",
    category: "Product",
    format: "Template",
    readingTime: 7,
    date: "2026-07-20",
    accent: "#153E52",
    accentInk: "#153E52",
    motif: "step",
    cover: "/images/paintings/resources/resource-11.webp",
    standfirst:
      "If three quotes come back wildly different, the problem is usually the brief, not the suppliers.",
    sections: [
      {
        body: [
          "A vague brief does not get you flexible quotes. It gets you three suppliers guessing at three different projects, then a decision made on price between things that are not comparable.",
          "The supplier who quoted lowest often did so because they understood the least. That gap reappears later as variation orders, and the cheap quote stops being cheap.",
        ],
      },
      {
        heading: "What a usable brief contains",
        steps: [
          {
            title: "The business outcome",
            detail:
              "Not we need a website. Rather: we are losing enquiries because customers cannot find our prices, and we want price information available without a phone call.",
          },
          {
            title: "Who the audience is",
            detail:
              "Be concrete. Procurement officers at mining companies is a different project from walk-in retail customers in Katutura.",
          },
          {
            title: "The page list",
            detail:
              "Actually list them. Home, about, four service pages, contact. This single item removes most quote variance.",
          },
          {
            title: "What must be there on day one, and what can wait",
            detail:
              "Separate these explicitly. It is the difference between an affordable first phase and an unaffordable everything.",
          },
          {
            title: "Who provides content",
            detail:
              "Text and photographs. This is the most common cause of stalled projects and the most common hidden cost in a quote.",
          },
          {
            title: "Integrations",
            detail:
              "Accounting system, booking system, payment, WhatsApp, mailing list. Name them.",
          },
          {
            title: "Who maintains it afterwards",
            detail:
              "You, the supplier on retainer, or nobody. Say so, because it changes what should be built.",
          },
          {
            title: "Budget range and deadline",
            detail:
              "Withholding the budget does not get a better price. It gets a quote for the wrong project.",
          },
        ],
      },
      {
        heading: "On sharing the budget",
        body: [
          "The common worry is that naming a budget means the supplier will simply quote to it. Some will. A good supplier uses it differently, to tell you what is achievable within it and what is not.",
          "A range is enough. Between N$ 40,000 and N$ 60,000 gives a supplier everything they need to propose something real, and lets them tell you honestly if your expectations do not fit inside it.",
        ],
        callout:
          "Withholding your budget does not protect you from being overcharged. It only guarantees the quotes will not be comparable.",
      },
      {
        heading: "Questions to ask every quote",
        checks: [
          "What exactly is included, page by page?",
          "Who owns the domain, hosting and source code when this is finished?",
          "What happens if I want a change after launch, and what does that cost?",
          "What is the hosting or maintenance cost per year, in N$?",
          "Will I be able to edit content myself, and will you show me how?",
          "What is not included that I should expect to pay for separately?",
        ],
      },
    ],
    related: ["what-a-website-costs-in-namibia", "template-or-custom-build", "website-handover-checklist"],
  },

  /* 12 */
  {
    slug: "what-a-website-costs-in-namibia",
    title: "What a Website Actually Costs in Namibia",
    excerpt:
      "An honest account of where the money goes in a web project, the ongoing costs people forget, and why the same brief returns very different numbers.",
    category: "Operations",
    format: "Explainer",
    readingTime: 7,
    date: "2026-07-18",
    accent: "#B8863B",
    accentInk: "#8A6329",
    motif: "column",
    cover: "/images/paintings/resources/resource-12.webp",
    standfirst:
      "The build is a one off. The running costs are forever, and they are what catch people out.",
    sections: [
      {
        body: [
          "We are not going to publish a price list for other people's work. Rates vary by supplier, by scope and by year, and a number quoted here would be wrong for someone within months.",
          "What is stable, and more useful, is the structure of the cost. Understanding where money goes lets you read any quote properly, including ours.",
        ],
      },
      {
        heading: "The one off costs",
        table: {
          head: ["Component", "What drives the number"],
          rows: [
            ["Discovery and planning", "How clear the brief is before work starts"],
            ["Design", "Number of unique page layouts, not number of pages"],
            ["Content and copywriting", "Whether you supply text or the supplier writes it"],
            ["Photography", "Half day or full day, travel, whether you already have usable images"],
            ["Build", "Number of unique templates, integrations, whether you need to edit it yourself"],
            ["Testing and launch", "Number of devices and browsers, complexity of the forms"],
          ],
        },
      },
      {
        heading: "The ongoing costs people forget",
        checks: [
          "Domain renewal, annually, and it must not lapse.",
          "Hosting, monthly or annually depending on the platform.",
          "SSL certificate, often included, sometimes not. Ask.",
          "Software updates, if the site runs on a platform that requires them.",
          "Backups, and more importantly a tested restore.",
          "Content changes after launch, whether by you or billed by the supplier.",
          "Email hosting, which is separate from website hosting and frequently forgotten.",
        ],
      },
      {
        heading: "Why the same brief gets very different quotes",
        body: [
          "Usually one of four reasons. The suppliers understood the brief differently, which is a brief problem. They are proposing different levels of custom work, from a configured template to a bespoke build. They include different amounts of content production. Or one has priced the ongoing relationship into the build and another has not.",
          "Ask each supplier to break the quote into those components. Differences that looked arbitrary usually become obvious once itemised.",
        ],
        callout:
          "A quote you cannot break into components is a quote you cannot compare. Ask for the breakdown before you compare totals.",
      },
      {
        heading: "Where it is worth spending more",
        body: [
          "Photography, content, and the mobile experience. These three determine whether the site works on the phone your customer is actually holding, and they are the three most commonly cut when a budget tightens.",
          "Where it is usually worth spending less: animation, custom illustration, and features nobody has asked for yet. These can be added later once the site is earning its keep.",
        ],
      },
    ],
    related: ["scoping-a-project-before-quotes", "template-or-custom-build", "domains-and-hosting-in-namibia"],
  },

  /* 13 */
  {
    slug: "accessibility-basics-wcag-aa",
    title: "Accessibility Basics That Actually Change Things",
    excerpt:
      "The small number of accessibility fixes that deliver most of the benefit, explained without the standards language.",
    category: "Web",
    format: "Guide",
    readingTime: 7,
    date: "2026-07-16",
    accent: "#7A4E7E",
    accentInk: "#5E3A61",
    motif: "rule",
    cover: "/images/paintings/resources/resource-13.webp",
    standfirst:
      "Most accessibility failures are not exotic. They are grey text, tiny buttons and images with no description.",
    sections: [
      {
        body: [
          "Accessibility is often presented as a compliance exercise, which makes it sound like something to survive rather than something to do. In practice the majority of real world barriers come from a short list of ordinary mistakes, and fixing them improves the site for everyone.",
          "This is particularly true on mobile, in bright sunlight, on a cracked screen, which describes a great deal of real Namibian browsing.",
        ],
      },
      {
        heading: "The fixes with the highest return",
        steps: [
          {
            title: "Fix your colour contrast",
            detail:
              "Light grey text on a white background is the most common failure on the web. Body text needs a contrast ratio of at least 4.5 to 1. Free checkers will tell you in seconds.",
          },
          {
            title: "Make tap targets big enough",
            detail:
              "Anything tappable should be at least 44 by 44 pixels. You can keep the visual element small and enlarge the invisible hit area around it.",
          },
          {
            title: "Do not let body text go below 16 pixels",
            detail:
              "Smaller than that is hard to read and, on iOS, causes the page to zoom when a form field is focused, which feels broken.",
          },
          {
            title: "Write real alt text",
            detail:
              "Describe what the image shows and why it is there. A decorative flourish should have empty alt text so screen readers skip it. Never write image or photo.",
          },
          {
            title: "Label every form field visibly",
            detail:
              "Placeholder text disappears the moment someone types, which strands anyone who is interrupted. Use a real label above the field.",
          },
          {
            title: "Make sure it works from the keyboard",
            detail:
              "Press tab repeatedly. You should always see where you are, and you should be able to reach and operate everything. If focus disappears, something is broken.",
          },
          {
            title: "Respect reduced motion",
            detail:
              "Some people get genuinely unwell from parallax and heavy scroll animation. Honour the operating system setting that asks for less of it.",
          },
        ],
      },
      {
        heading: "Test it in ten minutes",
        checks: [
          "Tab through the whole page without touching the mouse.",
          "Zoom the browser to 200 percent and check nothing is cut off.",
          "Load the site on a phone, outside, in direct sunlight.",
          "Turn on your phone's screen reader and try to use the contact form.",
          "Run one automated checker, then fix the things it finds by hand.",
        ],
      },
      {
        callout:
          "Automated tools catch perhaps a third of real accessibility problems. They are a starting point, not a certificate.",
      },
    ],
    related: ["page-weight-and-mobile-data-costs", "namibian-website-launch-checklist", "writing-website-copy-for-namibian-customers"],
  },

  /* 14 */
  {
    slug: "seo-for-namibian-search",
    title: "Search, the Way Namibians Actually Search",
    excerpt:
      "Why competing for generic international keywords is a losing game, and what local search intent looks like instead.",
    category: "Web",
    format: "Guide",
    readingTime: 7,
    date: "2026-07-14",
    accent: "#2CB5B4",
    accentInk: "#0F5C5B",
    motif: "stack",
    cover: "/images/paintings/resources/resource-14.webp",
    standfirst:
      "You are not competing with the world. You are competing with four other businesses in Windhoek, and that is a much better fight.",
    sections: [
      {
        body: [
          "A lot of SEO advice is written for markets with enormous search volume and brutal competition. Namibia is not that market, and the advice transfers badly.",
          "Here, search volumes are smaller, competition for local terms is often thin, and the intent behind a search is usually immediate and commercial. Someone searching for a tyre fitment in Otjiwarongo is not researching. They need a tyre fitted.",
        ],
      },
      {
        heading: "Place is the differentiator",
        table: {
          head: ["Weak target", "Better target"],
          rows: [
            ["office furniture", "office furniture Windhoek"],
            ["safari lodge", "lodge near Etosha south gate"],
            ["accounting services", "small business accountant Swakopmund"],
            ["borehole drilling", "borehole drilling Otjozondjupa"],
            ["car service", "Toyota service Ongwediva"],
          ],
        },
      },
      {
        body: [
          "The left column is unwinnable and, even if you won it, would deliver visitors who cannot buy from you. The right column is winnable and delivers people who can actually walk in.",
        ],
      },
      {
        heading: "What actually moves local ranking",
        checks: [
          "A complete, verified Google Business Profile. For local search this outranks most on-site work.",
          "Your business name, address and phone number written identically everywhere they appear online.",
          "A separate page for each service and, where it makes sense, each town you serve.",
          "Page titles that name the service and the place.",
          "Genuine reviews, arriving steadily rather than twenty in one week.",
          "A site that loads quickly on mobile data.",
        ],
      },
      {
        heading: "What to ignore",
        body: [
          "Keyword density, meta keyword tags, and anyone selling you backlinks. The first two have not mattered for many years and the third can actively damage you.",
          "Also ignore anyone guaranteeing a number one ranking. Nobody controls that, and the promise itself tells you what you need to know about the supplier.",
        ],
        callout:
          "For a business with a physical location in Namibia, an hour spent completing your Google Business Profile will usually outperform a month of on-site optimisation.",
      },
    ],
    related: ["google-business-profile-namibia", "writing-website-copy-for-namibian-customers", "content-inventory-template"],
  },

  /* 15 */
  {
    slug: "content-inventory-template",
    title: "The Content Inventory That Stops Projects Stalling",
    excerpt:
      "Web projects rarely stall on code. They stall waiting for text and photographs. This is the sheet that prevents it.",
    category: "Product",
    format: "Template",
    readingTime: 5,
    date: "2026-07-12",
    accent: "#B8863B",
    accentInk: "#8A6329",
    motif: "grid",
    cover: "/images/paintings/resources/resource-15.webp",
    standfirst:
      "The design was approved in week two. The site launched in month five. The missing four pages of text were the reason.",
    sections: [
      {
        body: [
          "This is the most predictable failure in web projects and the least discussed. The build finishes on time. Then everything waits, sometimes for months, on copy that somebody at the client was going to write when things quietened down.",
          "The fix is unglamorous. Make content a tracked deliverable with a named owner and a date, exactly like any other part of the project.",
        ],
      },
      {
        heading: "The columns you need",
        table: {
          head: ["Column", "What goes in it"],
          rows: [
            ["Page", "Home, About, Service: Fleet Maintenance"],
            ["URL", "The final path, agreed early so links do not break later"],
            ["Purpose", "One sentence on what this page is for"],
            ["Primary action", "The one thing the visitor should do here"],
            ["Text owner", "A person's name, never a department"],
            ["Text status", "Not started, drafted, approved"],
            ["Images needed", "How many, what of"],
            ["Image owner", "A person's name"],
            ["Due date", "An actual date"],
          ],
        },
      },
      {
        heading: "How to run it",
        steps: [
          { title: "Fill it in before design starts", detail: "The page list drives the design, not the other way round." },
          { title: "Name individuals, never teams", detail: "Marketing will write it means nobody will write it." },
          { title: "Set dates before the build finishes", detail: "Content deadlines must land before the developer needs the content, not after." },
          { title: "Review it weekly, in writing", detail: "Five minutes on a call. The sheet is the agenda." },
          { title: "Escalate a slipped date immediately", detail: "One slipped content deadline moves the whole launch." },
        ],
      },
      {
        callout:
          "If nobody's name is in the owner column, the content does not have an owner. It has a hope.",
      },
      {
        heading: "If the client cannot write it",
        body: [
          "Say so early and price for it. Many businesses genuinely do not have anyone who can write good web copy, and pretending otherwise costs everyone months.",
          "An interview based approach works well. An hour of recorded conversation with the owner usually yields better and more honest material than three months of waiting for them to write something themselves.",
        ],
      },
    ],
    related: ["scoping-a-project-before-quotes", "writing-website-copy-for-namibian-customers", "preparing-photography-brief"],
  },

  /* 16 */
  {
    slug: "template-or-custom-build",
    title: "Template or Custom Build",
    excerpt:
      "An honest comparison of configured templates and bespoke builds, including the cases where paying for custom work is simply wrong.",
    category: "Product",
    format: "Explainer",
    readingTime: 6,
    date: "2026-07-10",
    accent: "#2B6B8E",
    accentInk: "#1F5069",
    motif: "column",
    cover: "/images/paintings/resources/resource-16.webp",
    standfirst:
      "We build custom software. We will still tell you when a template is the right answer.",
    sections: [
      {
        body: [
          "There is an obvious incentive for a studio to recommend custom work on every project. We are going to argue against that, because recommending a bespoke build to a business that needs five pages and a contact form is how studios lose clients permanently.",
        ],
      },
      {
        heading: "The comparison",
        table: {
          head: ["", "Configured template", "Custom build"],
          rows: [
            ["Upfront cost", "Lower", "Higher"],
            ["Time to launch", "Weeks", "Months"],
            ["Looks like your competitors", "Sometimes, yes", "No"],
            ["Unusual requirements", "Fights you", "Handles them"],
            ["Performance", "Carries weight you do not use", "Only what you ship"],
            ["Editing it yourself", "Usually easy", "Depends what was built"],
            ["Long term flexibility", "Limited by the template", "Limited by budget"],
          ],
        },
      },
      {
        heading: "Choose a template when",
        checks: [
          "Your requirements are genuinely standard: pages, a form, maybe a simple catalogue.",
          "Speed to launch matters more than differentiation.",
          "Budget is tight and better spent on photography and content.",
          "Nobody internally will be maintaining anything complicated.",
          "You are testing whether the business needs a website at all.",
        ],
      },
      {
        heading: "Choose a custom build when",
        checks: [
          "The website is the product, not a brochure for it.",
          "You have a workflow no template anticipates.",
          "You need to integrate with systems you already run.",
          "Page weight and speed are commercially important to you.",
          "Brand differentiation is a real competitive factor in your market.",
          "You expect the thing to grow substantially over several years.",
        ],
      },
      {
        callout:
          "Spending N$ 80,000 on a bespoke build for a five page brochure site is not ambition. It is a supplier who did not tell you the truth.",
      },
      {
        heading: "The middle path",
        body: [
          "Often the right answer is a template now and a custom build in two years, once you know from real traffic what customers actually do. Launching quickly and cheaply teaches you things no discovery workshop will.",
          "Just make sure the template phase does not trap you. Own the domain, own the content, and be able to export it.",
        ],
      },
    ],
    related: ["what-a-website-costs-in-namibia", "scoping-a-project-before-quotes", "website-handover-checklist"],
  },

  /* 17 */
  {
    slug: "preparing-product-data-ecommerce",
    title: "Preparing Product Data Before You Build a Shop",
    excerpt:
      "The unglamorous spreadsheet work that decides whether an online shop launches on time, and the fields people always forget.",
    category: "Product",
    format: "Template",
    readingTime: 6,
    date: "2026-07-08",
    accent: "#3D7A5F",
    accentInk: "#2C5A46",
    motif: "step",
    cover: "/images/paintings/resources/resource-17.webp",
    standfirst:
      "The shop is not late because of the code. It is late because nobody weighed the products.",
    sections: [
      {
        body: [
          "Every e-commerce project has the same hidden critical path, and it is not development. It is the product data. Four hundred products, each needing a description, a price, dimensions, a weight and at least one decent photograph, is weeks of work that nobody scheduled.",
          "Start it the day the project is approved.",
        ],
      },
      {
        heading: "The fields you need for every product",
        table: {
          head: ["Field", "Why it matters"],
          rows: [
            ["SKU", "Must match your accounting or stock system exactly"],
            ["Name", "As a customer would say it, not the supplier catalogue name"],
            ["Short description", "One or two sentences, used on listing pages"],
            ["Full description", "The detail, used on the product page"],
            ["Price in N$", "State clearly whether VAT is included"],
            ["Weight", "Required for any shipping calculation"],
            ["Dimensions", "Required for courier quotes on bulky items"],
            ["Stock quantity", "Or a rule for what happens when it runs out"],
            ["Category", "Decide the structure before you start filling this in"],
            ["Images", "Minimum one, three is better, consistent background"],
          ],
        },
      },
      {
        heading: "The ones people forget",
        body: [
          "Weight and dimensions. They feel irrelevant until the courier integration needs them, at which point somebody has to physically weigh four hundred items.",
          "Whether prices include VAT. Getting this wrong is not a display bug, it is an invoicing problem that reaches your accounts.",
          "What happens at zero stock. Hide the product, show it as out of stock, or accept a backorder. Each is defensible, but the decision has to be made by you, not by a default setting.",
        ],
      },
      {
        heading: "Photograph them consistently",
        steps: [
          { title: "Pick one background and never change it", detail: "Plain white or a single mid grey. Consistency across the grid matters more than any individual shot." },
          { title: "Same distance, same angle, every time", detail: "A product grid where every item sits at a different scale looks amateurish immediately." },
          { title: "Shoot square", detail: "Square crops fit e-commerce grids and social posts without re-cropping." },
          { title: "Name the file with the SKU", detail: "This is what turns four hundred images into an import instead of four hundred manual uploads." },
          { title: "Export at a sensible size", detail: "Around 1200 pixels square is plenty. Full camera resolution will make the shop unusable on mobile data." },
        ],
      },
      {
        callout:
          "Name every image file with its SKU. It is the difference between a bulk import and a week of manual matching.",
      },
    ],
    related: ["payment-options-for-namibian-websites", "page-weight-and-mobile-data-costs", "content-inventory-template"],
  },

  /* 18 */
  {
    slug: "ai-tools-for-small-namibian-teams",
    title: "Where AI Is Actually Useful in a Small Namibian Team",
    excerpt:
      "A grounded look at what these tools do well, what they do badly, and the specific risks of using them on client and customer data.",
    category: "Intelligence",
    format: "Guide",
    readingTime: 8,
    date: "2026-07-06",
    accent: "#153E52",
    accentInk: "#153E52",
    motif: "arc",
    cover: "/images/paintings/resources/resource-18.webp",
    standfirst:
      "Useful for drafting, summarising and translating a first pass. Not useful for anything where being confidently wrong is expensive.",
    sections: [
      {
        body: [
          "The conversation around these tools tends to swing between replacing your staff and useless hype. Neither is accurate for a small team running a real business.",
          "What is accurate is narrower and more useful. Language models are good at producing a competent first draft of something, and poor at knowing whether that draft is true.",
        ],
      },
      {
        heading: "Where it genuinely helps",
        table: {
          head: ["Task", "Why it works"],
          rows: [
            ["First drafts of routine writing", "You edit rather than start from nothing"],
            ["Summarising long documents", "Tenders, contracts, reports you must read anyway"],
            ["Rewriting for a different audience", "Same facts, formal or plain, quickly"],
            ["Translation first pass", "Still needs a fluent speaker to verify before publishing"],
            ["Explaining unfamiliar technical material", "Quotes, specifications, error messages"],
            ["Structuring a spreadsheet or formula", "Faster than searching for the syntax"],
          ],
        },
      },
      {
        heading: "Where it will cost you",
        body: [
          "Anything involving a specific fact you cannot verify. These systems produce fluent, confident, wrong answers, and the fluency is exactly what makes the error dangerous. A wrong figure in a quotation does not look wrong.",
          "Anything requiring current local knowledge. Namibian regulations, local pricing, who supplies what in Windhoek. The training data is thin here and the confident tone does not change with the confidence level.",
          "Anything where the voice matters. Unedited model output has a recognisable flatness. Customers may not name it, but they notice that the writing sounds like everyone else's.",
        ],
      },
      {
        heading: "The data rules to set before anyone starts",
        checks: [
          "Never paste client confidential information into a public tool.",
          "Never paste personal information about customers or staff.",
          "Never paste banking details, credentials or contract terms under NDA.",
          "Assume anything you submit may be retained. Check each tool's actual policy rather than assuming.",
          "Write these rules down and tell every staff member, because they are already using these tools whether or not you have a policy.",
        ],
      },
      {
        callout:
          "Treat model output as a draft from a fast, well read assistant who has never been to Namibia and will not tell you when they are guessing.",
      },
      {
        heading: "A practical way in",
        body: [
          "Pick one repetitive writing task that already exists and is low risk. Quote follow up emails, product descriptions, meeting summaries. Run it for a month and see whether it actually saved time.",
          "Do not start with anything customer facing and unedited. Start where a mistake is cheap and visible.",
        ],
      },
    ],
    related: ["writing-website-copy-for-namibian-customers", "connectivity-resilience-planning", "content-inventory-template"],
  },

  /* 19 */
  {
    slug: "website-handover-checklist",
    title: "The Handover Checklist: Actually Owning Your Website",
    excerpt:
      "What you must receive when a web project ends, so that changing supplier later is an inconvenience rather than a rebuild.",
    category: "Operations",
    format: "Checklist",
    readingTime: 6,
    date: "2026-07-04",
    accent: "#C56A4A",
    accentInk: "#9A4A2E",
    motif: "rule",
    cover: "/images/paintings/resources/resource-19.webp",
    standfirst:
      "The test of ownership is simple. If your developer stopped answering the phone tomorrow, could you carry on?",
    sections: [
      {
        body: [
          "Most businesses discover what they do not own at the worst possible moment. The developer has emigrated, or the relationship has soured, or the person who built it simply stopped replying. Only then does it emerge that the domain is in someone else's account and nobody has the source files.",
          "Run this at handover, while everyone is still friendly and the invoice is still open. That is the only real leverage you will have.",
        ],
      },
      {
        heading: "Credentials you must hold",
        checks: [
          "Domain registrar login, tested by you personally.",
          "Hosting or deployment platform login, tested by you personally.",
          "Content management system administrator account in your name.",
          "Google Business Profile ownership, not manager access.",
          "Google Analytics and Search Console ownership.",
          "Email hosting administrator access.",
          "Any third party service the site depends on, such as a form handler, payment gateway or mailing list.",
        ],
      },
      {
        heading: "Files you must receive",
        checks: [
          "Source code, in a repository your business controls.",
          "Logo files in vector format, SVG and PDF.",
          "All original photographs at full resolution.",
          "Any purchased fonts, with the licence documentation in your business name.",
          "A database export, if the site uses one.",
          "Design files, or at minimum an exported style reference.",
        ],
      },
      {
        heading: "Documents you must have",
        checks: [
          "Written confirmation that copyright in the work transfers to you on final payment.",
          "A list of every recurring cost, what it is for, how much in N$, and when it renews.",
          "Basic instructions for the three or four things you will most often want to change.",
          "The backup arrangement, including where backups are stored and how to restore one.",
          "Named contact and response expectations for anything still under support.",
        ],
      },
      {
        callout:
          "Ownership of the domain and the source code are the two that matter most. Everything else can be rebuilt. Those two cannot.",
      },
      {
        heading: "Test it, do not assume it",
        body: [
          "Do not accept a list of credentials. Log into each one yourself, while the developer is still available to fix anything that does not work.",
          "An untested password is not access. It is a note that looks like access.",
        ],
      },
    ],
    related: ["domains-and-hosting-in-namibia", "scoping-a-project-before-quotes", "logo-file-formats-explained"],
  },

  /* 20 */
  {
    slug: "connectivity-resilience-planning",
    title: "Planning for Power Cuts and Connectivity Gaps",
    excerpt:
      "How to keep a business reachable when the power drops or the line goes down, covering both your systems and the customer's experience.",
    category: "Intelligence",
    format: "Guide",
    readingTime: 7,
    date: "2026-07-02",
    accent: "#7A4E7E",
    accentInk: "#5E3A61",
    motif: "step",
    cover: "/images/paintings/resources/resource-20.webp",
    standfirst:
      "Design for the outage rather than around it, and the ordinary day gets better too.",
    sections: [
      {
        body: [
          "Any business operating across Namibia and the region plans around interruption. Power drops, fibre gets cut, a tower goes down, weather takes out a link to a site outside the main centres.",
          "The instinct is to treat this as an IT problem to be solved with hardware. Some of it is. But a large part is a design problem, and the design decisions are cheaper than the hardware.",
        ],
      },
      {
        heading: "Two different problems",
        table: {
          head: ["", "Your side goes down", "Their side is weak"],
          rows: [
            ["What happens", "You cannot answer, your systems are unreachable", "Customer on a poor mobile connection"],
            ["Customer sees", "No reply, or a site that will not load", "A site that loads slowly or partially"],
            ["Main fix", "Redundancy and a communication plan", "Lighter pages, offline tolerance"],
            ["Cost", "Hardware and connectivity", "Mostly build decisions"],
          ],
        },
      },
      {
        heading: "Keeping your side reachable",
        checks: [
          "Host the website somewhere other than your own premises, so an office outage does not take the site down with it.",
          "Use a second connection from a different provider for anything critical, ideally on a different technology.",
          "Keep a charged phone with a data bundle as the last resort channel, and make sure someone is responsible for it.",
          "Put an away message on WhatsApp and email that states when you will be back, not that you are unavailable.",
          "Publish an alternative contact route that does not depend on the connection that just failed.",
        ],
      },
      {
        heading: "Designing for the customer's weak connection",
        steps: [
          { title: "Keep pages light", detail: "Under 500 KB where possible. This is the single highest leverage decision." },
          { title: "Put the critical information in text", detail: "Phone number, address, hours. Text arrives when images have not." },
          { title: "Never put a phone number only in an image", detail: "If the image fails, the customer cannot reach you at all." },
          { title: "Make forms tolerant", detail: "A submission that fails should not clear what the person typed." },
          { title: "Cache sensibly", detail: "A returning visitor should not re-download everything to see your hours." },
          { title: "Test on a throttled connection", detail: "Browser developer tools can simulate a slow connection. Use it before launch, not after complaints." },
        ],
      },
      {
        callout:
          "If your phone number exists only inside a logo image, an outage on the customer's side means they cannot contact you at all.",
      },
      {
        heading: "Write the plan down",
        body: [
          "One page. Who does what when the power goes, which number customers should use, who posts the update and where, and how you tell people it is resolved.",
          "The plan is worth more than the generator, because the generator only covers one of the failure modes.",
        ],
      },
    ],
    related: ["page-weight-and-mobile-data-costs", "whatsapp-business-for-enquiries", "ai-tools-for-small-namibian-teams"],
  },
];

export const resourceCategories = [
  "Brand",
  "Product",
  "Web",
  "Intelligence",
  "Operations",
] as const;

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getAllResourceSlugs(): string[] {
  return resources.map((r) => r.slug);
}

export function getRelated(slug: string): Resource[] {
  const r = getResource(slug);
  if (!r) return [];
  return r.related
    .map((s) => getResource(s))
    .filter((x): x is Resource => Boolean(x));
}
