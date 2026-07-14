/**
 * Blog articles for Studio.
 * 8 complete articles with verified content.
 */

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  cover: string;
  content: { heading?: string; body: string[] }[];
}

export const articles: BlogArticle[] = [
  {
    slug: "one-studio-instead-of-three-vendors",
    title: "One Studio Instead of Three Vendors",
    excerpt: "Why we collapsed brand, product, and intelligence into a single studio, and what that changes for the organizations we work with.",
    date: "2026-07-01",
    category: "Positioning",
    tags: ["studio", "brand", "product", "intelligence"],
    readingTime: 4,
    cover: "/images/paintings/collaboration-studio.webp",
    content: [
      { body: ["Most organizations that need a digital product end up coordinating three separate vendors. A brand consultancy designs the identity. A web studio builds the website. A technology partner handles the backend and any AI features.", "Each vendor has its own timeline, its own priorities, and its own interpretation of what the others are doing. The result is a product that feels like three products stitched together.", "Studio takes a different approach. We handle brand, product, and intelligence under one roof. The people who define the brand are the same people who design the interface and build the systems behind it."] },
      { heading: "What this changes", body: ["When one studio owns all three layers, the handoffs disappear. The brand strategy informs the interface design directly, not through a brief document. The interface design informs the technical architecture, not through a specification call. The technical architecture informs what intelligence features are actually feasible, not through a feasibility study.", "This is not about saving time. It is about saving coherence. A product built by one team with one set of priorities feels different from a product assembled from parts."] },
      { heading: "When three vendors makes sense", body: ["There are situations where separate vendors are the right choice. If you already have a strong brand system and only need a new website, a specialized web studio is sufficient. If you have a mature product and only need to add an AI feature, a technology partner is the right call.", "But if you are building something new, or rebuilding something that has drifted, one studio gives you a coherence that coordination cannot match."] },
      { body: ["Studio is built for organizations that need all three layers working together. Brand, product, and intelligence. One studio instead of three vendors."] },
    ],
  },
  {
    slug: "why-digital-products-fail-before-development-starts",
    title: "Why Digital Products Fail Before Development Starts",
    excerpt: "Most digital product failures are not technical. They are strategic. Here is what goes wrong in the discovery phase and how to prevent it.",
    date: "2026-06-25",
    category: "Strategy",
    tags: ["discovery", "strategy", "process"],
    readingTime: 5,
    cover: "/images/paintings/principles-texture.webp",
    content: [
      { body: ["Digital products fail for many reasons. But the most common failure mode is not a technical one. It is a strategic one. The product was built to solve the wrong problem, or the right problem was understood too late.", "This failure happens before development starts. It happens in the discovery phase, or more often, in the absence of one."] },
      { heading: "The skipping discovery pattern", body: ["Many organizations skip discovery because it feels like delay. They have a deadline. They know what they want. They want to see something built.", "So the studio starts building. Two months later, the product launches. It works. It looks good. But it does not solve the problem the organization actually had, because the problem was never properly defined."] },
      { heading: "What proper discovery looks like", body: ["Discovery is not a long document. It is a set of structured conversations and a clear decision about what the product is for.", "Who is this product for? What are they trying to do? What is stopping them today? What would success look like in measurable terms? These questions seem obvious, but they are rarely answered clearly before development starts.", "At Studio, discovery is the first step of every project. We listen first. We interview stakeholders. We review existing material. We frame the problem in one sentence before proposing a solution."] },
      { heading: "The cost of skipping", body: ["Building the wrong product costs more than discovery. A two-week discovery phase that prevents a three-month build of the wrong thing is one of the highest-ROI investments an organization can make.", "The products that last are the ones that started with a clear understanding of the problem. The products that fail are the ones that started with a solution looking for a problem."] },
    ],
  },
  {
    slug: "brand-systems-for-growing-namibian-businesses",
    title: "Brand Systems for Growing Namibian Businesses",
    excerpt: "A brand system is not a logo. It is the set of rules that lets your organization grow without losing its identity. Here is what that means in practice.",
    date: "2026-06-20",
    category: "Brand",
    tags: ["brand", "identity", "namibia"],
    readingTime: 4,
    cover: "/images/paintings/identity-table.webp",
    content: [
      { body: ["A brand system is not a logo. A logo is one piece of a brand system. The system itself is the set of rules, patterns, and decisions that let your organization present itself consistently as it grows.", "For Namibian businesses, this matters more than it might in larger markets. You are building trust with audiences who may not know your company. Consistency is what builds that trust."] },
      { heading: "What a brand system includes", body: ["A complete brand system includes visual identity (logo, colors, typography), verbal identity (messaging, tone, naming), and application rules (how the system works across website, social media, print, and product).", "Without these rules, every new marketing asset is designed from scratch. The website looks one way. The social media looks another. The business card looks like it belongs to a different company. This inconsistency erodes trust."] },
      { heading: "Why growing businesses need one", body: ["When a business is small, the founder can personally ensure consistency. Every decision goes through one person. But as the team grows, that becomes impossible. A marketing hire needs to create social media posts without asking the founder every time. A developer needs to know which colors to use in the application.", "A brand system makes this possible. It documents the decisions so that anyone on the team can apply them correctly. It turns brand consistency from a personal effort into an organizational capability."] },
      { body: ["At Studio, we build brand systems that are practical, not theoretical. They are designed to be used by real teams making real decisions. If your current identity does not scale with your growth, we can help you build one that does."] },
    ],
  },
  {
    slug: "designing-ai-that-does-actual-work",
    title: "Designing AI That Does Actual Work",
    excerpt: "AI features that solve real problems look different from AI features that demonstrate a model. Here is how we approach applied intelligence at Studio.",
    date: "2026-06-15",
    category: "Intelligence",
    tags: ["ai", "intelligence", "product"],
    readingTime: 5,
    cover: "/images/paintings/intelligence-systems.webp",
    content: [
      { body: ["There are two kinds of AI features in digital products. The first kind is designed to demonstrate that the product uses AI. The second kind is designed to solve a problem that could not be solved without AI.", "The first kind is everywhere. It includes chatbots that answer questions worse than a FAQ page, recommendation engines that suggest things nobody wants, and search features that are less accurate than keyword matching.", "The second kind is rare. It includes systems that can actually understand unstructured data, automate workflows that require judgment, and provide capabilities that were not possible before."] },
      { heading: "How to tell the difference", body: ["The test is simple. Does the AI feature solve a problem that the user has? Or does it solve a problem that the product team has, which is that they want to use AI?", "If the feature is there because users asked for it, or because it makes a meaningful task faster or easier, it is the second kind. If it is there because the competitor has it, or because it looks impressive in a demo, it is the first kind."] },
      { heading: "Where AI actually helps", body: ["AI is genuinely useful in specific contexts. Processing large volumes of unstructured text. Extracting structured data from documents. Automating repetitive decisions that require pattern recognition. Providing search over knowledge bases that are too large for manual organization.", "In each of these cases, the AI is doing something that would be impossible or prohibitively expensive without it. That is the test."] },
      { body: ["At Studio, we apply intelligence where it solves a real problem. Through Tangison Labs, we connect digital experiences to the agents, automations, and infrastructure working behind them. But we do not add AI features unless they earn their place."] },
    ],
  },
  {
    slug: "from-website-to-working-product",
    title: "From Website to Working Product",
    excerpt: "A website is not a product. A product is not a website. Understanding the difference changes how you build, what you invest in, and what you measure.",
    date: "2026-06-10",
    category: "Product",
    tags: ["product", "website", "development"],
    readingTime: 4,
    cover: "/images/paintings/product-workshop.webp",
    content: [
      { body: ["Many organizations start with a website and expect it to become a product. This rarely works. A website and a product are different things, built for different purposes, with different success metrics.", "A website is a marketing surface. Its job is to communicate what your organization does and move visitors toward a conversation. A product is a working tool. Its job is to help users accomplish something they could not accomplish without it."] },
      { heading: "Why the distinction matters", body: ["If you build a website when you need a product, you end up with a marketing surface that users try to use as a tool. It breaks under the weight of expectations it was not designed for. Forms that should be workflows become email chains. Content that should be dynamic becomes static.", "If you build a product when you need a website, you overspend. You build authentication, dashboards, and data models for an audience that just needs to understand what you do and contact you."] },
      { heading: "When you need both", body: ["Most organizations need both. A website that communicates the brand and moves people toward action. A product that serves users who have already engaged.", "The mistake is trying to build both at the same time with the same budget. Start with the website. Get the positioning right. Understand who your users are. Then build the product for those users, informed by what the website taught you."] },
      { body: ["At Studio, we build both. But we help you understand which one you need first, and why. A clear understanding of the difference saves time, money, and frustration."] },
    ],
  },
  {
    slug: "what-a-useful-design-system-changes",
    title: "What a Useful Design System Changes",
    excerpt: "A design system is not a Figma file. It is the shared language that lets your team build consistently at speed. Here is what changes when you have one.",
    date: "2026-06-05",
    category: "Design",
    tags: ["design-systems", "design", "process"],
    readingTime: 4,
    cover: "/images/paintings/product-detail.webp",
    content: [
      { body: ["A design system is not a Figma file. It is not a component library. It is the shared language that lets your team make consistent design decisions at speed.", "Without a design system, every new screen is a design problem. With one, most screens are an assembly problem. That difference changes how fast you can ship."] },
      { heading: "What changes", body: ["With a design system, a new page takes hours instead of days. The designer does not need to decide on button styles, spacing, typography, or color. Those decisions are already made. The designer focuses on the layout and the content.", "Developers do not need to build new components for each page. They assemble existing ones. The code is more consistent, more maintainable, and less buggy."] },
      { heading: "What it does not change", body: ["A design system does not replace design thinking. It does not make strategic decisions for you. It does not tell you what the page should say or what the user needs to accomplish.", "What it does is remove the tactical decisions from the process so that the team can spend its energy on the strategic ones."] },
      { heading: "When to invest in one", body: ["If you are building one website with five pages, you do not need a design system. If you are building a product with twenty screens, or a brand that will have multiple digital surfaces, you do.", "The investment pays for itself when the second screen ships faster than the first. By the tenth screen, the time savings are significant. By the twentieth, the system is the reason you can ship at all."] },
    ],
  },
  {
    slug: "building-digital-products-from-windhoek-for-africa",
    title: "Building Digital Products from Windhoek for Africa",
    excerpt: "Being based in Windhoek is not a limitation. It is an advantage that shapes how we design for audiences across the continent.",
    date: "2026-05-28",
    category: "Studio",
    tags: ["windhoek", "namibia", "africa"],
    readingTime: 4,
    cover: "/images/paintings/windhoek-working-city.webp",
    content: [
      { body: ["Studio is based in Windhoek, Namibia. This is not a footnote. It is a design decision that shapes everything we make.", "Being based in Africa changes how you think about digital products. You design for audiences that often access the web on constrained connections. You design for devices that are not the latest iPhone. You design for contexts where data is expensive and patience is practical."] },
      { heading: "What this means in practice", body: ["It means performance is not optional. A website that loads in two seconds on fiber and eight seconds on 3G is not a fast website. It is a website that excludes half its audience.", "It means accessibility is not optional. Users may be on small screens, on shared devices, or using assistive technology. If your product does not work for them, it does not work.", "It means clarity is not optional. Users may not share your cultural context, your language, or your assumptions. If your interface is not immediately understandable, you have lost them."] },
      { heading: "The advantage", body: ["Designing for these constraints makes you better at designing for everyone. The performance optimizations that help a user on 3G in Windhoek also help a user on fiber in Frankfurt. The accessibility that helps a user on a small screen in Oshakati also helps a user on a large screen in London.", "Products built from Africa for Africa are not lesser products. They are products built with a discipline that comes from designing for real constraints. That discipline travels."] },
      { body: ["We build from Windhoek for organizations across Africa and beyond. The location is the advantage, not the limitation."] },
    ],
  },
  {
    slug: "accessibility-is-part-of-product-quality",
    title: "Accessibility Is Part of Product Quality",
    excerpt: "Accessibility is not a checkbox or a compliance requirement. It is part of what makes a product good. Here is how we think about it at Studio.",
    date: "2026-05-20",
    category: "Accessibility",
    tags: ["accessibility", "quality", "wcag"],
    readingTime: 4,
    cover: "/images/paintings/interface-sketch.webp",
    content: [
      { body: ["Accessibility is often treated as a compliance requirement. Something you do because the law says you must, or because a client asked for it in the contract.", "This framing is wrong. Accessibility is part of product quality. A product that excludes users is not a good product, regardless of how it looks or how fast it loads."] },
      { heading: "What accessibility actually means", body: ["Accessibility means your product works for people with disabilities. That includes users who navigate by keyboard, users who read with screen readers, users who need sufficient color contrast, and users who need larger text or longer interaction times.", "It also means your product works for people in constraining contexts. A user on a slow connection. A user in bright sunlight. A user on a small screen. These are accessibility issues too."] },
      { heading: "Why it is part of quality", body: ["Quality is not just about the absence of bugs. It is about the presence of the right characteristics. Performance is quality. Security is quality. Accessibility is quality.", "When accessibility is treated as a separate concern, it becomes something that can be cut from scope. When it is part of quality, it becomes something that is always present, like testing."] },
      { heading: "How we do it", body: ["At Studio, we build accessibility into the process from the start. Semantic HTML. Sufficient color contrast. Keyboard navigation. Screen reader compatibility. Focus management. Reduced motion support.", "We test with automated tools like axe-core and pa11y, but we also test manually. Automated tools catch about 30 percent of accessibility issues. The rest require human judgment.", "We target WCAG 2.2 AA. Not because it is a requirement, but because it is the right standard for products that want to work for everyone."] },
    ],
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): BlogArticle {
  return articles[0];
}

export function getRelatedArticles(slug: string, count = 3): BlogArticle[] {
  return articles.filter((a) => a.slug !== slug).slice(0, count);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}
