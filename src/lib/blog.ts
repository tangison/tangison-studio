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
    cover: "/images/paintings/blog/blog-01.webp",
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
    cover: "/images/paintings/blog/blog-02.webp",
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
    cover: "/images/paintings/blog/blog-03.webp",
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
    cover: "/images/paintings/blog/blog-04.webp",
    content: [
      { body: ["There are two kinds of AI features in digital products. The first kind is designed to demonstrate that the product uses AI. The second kind is designed to solve a problem that could not be solved without AI.", "The first kind is everywhere. It includes chatbots that answer questions worse than a FAQ page, recommendation engines that suggest things nobody wants, and search features that are less accurate than keyword matching.", "The second kind is rare. It includes systems that can actually understand unstructured data, run workflows that require judgment, and provide capabilities that were not possible before."] },
      { heading: "How to tell the difference", body: ["The test is simple. Does the AI feature solve a problem that the user has? Or does it solve a problem that the product team has, which is that they want to use AI?", "If the feature is there because users asked for it, or because it makes a meaningful task faster or easier, it is the second kind. If it is there because the competitor has it, or because it looks impressive in a demo, it is the first kind."] },
      { heading: "Where AI actually helps", body: ["AI is genuinely useful in specific contexts. Processing large volumes of unstructured text. Extracting structured data from documents. Handling repetitive decisions that require pattern recognition. Providing search over knowledge bases that are too large for manual organization.", "In each of these cases, the AI is doing something that would be impossible or prohibitively expensive without it. That is the test."] },
      { body: ["At Studio, we apply intelligence where it solves a real problem. Through Tangison Labs, we connect digital experiences to the agents, integrations, and infrastructure working behind them. But we do not add AI features unless they earn their place."] },
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
    cover: "/images/paintings/blog/blog-05.webp",
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
    cover: "/images/paintings/blog/blog-06.webp",
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
    cover: "/images/paintings/blog/blog-07.webp",
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
    cover: "/images/paintings/blog/blog-08.webp",
    content: [
      { body: ["Accessibility is often treated as a compliance requirement. Something you do because the law says you must, or because a client asked for it in the contract.", "This framing is wrong. Accessibility is part of product quality. A product that excludes users is not a good product, regardless of how it looks or how fast it loads."] },
      { heading: "What accessibility actually means", body: ["Accessibility means your product works for people with disabilities. That includes users who navigate by keyboard, users who read with screen readers, users who need sufficient color contrast, and users who need larger text or longer interaction times.", "It also means your product works for people in constraining contexts. A user on a slow connection. A user in bright sunlight. A user on a small screen. These are accessibility issues too."] },
      { heading: "Why it is part of quality", body: ["Quality is not just about the absence of bugs. It is about the presence of the right characteristics. Performance is quality. Security is quality. Accessibility is quality.", "When accessibility is treated as a separate concern, it becomes something that can be cut from scope. When it is part of quality, it becomes something that is always present, like testing."] },
      { heading: "How we do it", body: ["At Studio, we build accessibility into the process from the start. Semantic HTML. Sufficient color contrast. Keyboard navigation. Screen reader compatibility. Focus management. Reduced motion support.", "We test with automated tools like axe-core and pa11y, but we also test manually. Automated tools catch about 30 percent of accessibility issues. The rest require human judgment.", "We target WCAG 2.2 AA. Not because it is a requirement, but because it is the right standard for products that want to work for everyone."] },
    ],
  },
  // NEW ARTICLES — comprehensive SEO/AEO + Gemsweb Digital history
  {
    slug: "from-gemsweb-digital-to-tangison-studio-our-evolution",
    title: "From Gemsweb Digital to Tangison Studio: Our Evolution",
    excerpt: "How a Windhoek-based digital practice grew from Gemsweb Digital into Tangison Studio, and what that journey taught us about building digital products in Namibia.",
    date: "2026-07-10",
    category: "Studio",
    tags: ["gemsweb-digital", "tangison-studio", "evolution", "namibia"],
    readingTime: 6,
    cover: "/images/paintings/blog/blog-09.webp",
    content: [
      { body: ["Tangison Studio was not always Tangison Studio. Before the current identity, before the expanded capabilities, before the formal partnership with Tangison Technologies, the practice operated under a different name: Gemsweb Digital.", "The evolution from Gemsweb Digital to Tangison Studio was not a rebrand for aesthetics. It was a response to what the work had become. The clients had grown. The scope had expanded. The practice needed an identity that could carry the weight of what it was actually doing."] },
      { heading: "The Gemsweb Digital era", body: ["Gemsweb Digital started as a small web design practice in Windhoek. The focus was narrow: build websites for Namibian businesses that needed a digital presence. The work was good. The clients were happy. But the scope was limited.", "What Gemsweb Digital discovered, working with clients across tourism, skincare, logistics, and financial services, was that the need was never just for a website. Clients needed brand systems. They needed digital products that worked as tools, not just brochures. They needed someone who could think about the entire digital surface of their organization, not just the homepage."] },
      { heading: "Why the name changed", body: ["Gemsweb Digital described what the practice did: digital work. But it did not describe what the practice had become. The work had expanded beyond websites into brand identity, product design, company profiles, policy documentation, and applied intelligence through Tangison Labs.", "The name Tangison Studio connects the practice to Tangison Technologies, the parent company that provides the broader engineering and infrastructure context. This relationship lets the studio stay small and focused while drawing on deeper technical capacity when a project requires it."] },
      { heading: "What stayed the same", body: ["The principles that guided Gemsweb Digital still guide Tangison Studio. Clarity before decoration. Systems over one-offs. Local context, wider ambition. The founder, Tangi Iigonda, still leads the work directly. The commitment to Namibian craft and African market understanding has not changed.", "What changed is the capacity. The studio can now handle integrated engagements that span brand, product, and intelligence. It can serve clients who need more than a website. It can build the systems behind the interface."] },
      { heading: "What this means for clients", body: ["For existing Gemsweb Digital clients, the transition was straightforward. The same team, the same principles, the same direct collaboration. The difference is that the studio can now take on work that would have been beyond Gemsweb Digital's scope.", "For new clients, the evolution means they get a practice with a proven track record in the Namibian market, now equipped with the capabilities of a larger organization. One studio instead of three vendors. Brand, product, and intelligence under one roof."] },
      { heading: "Looking forward", body: ["The evolution from Gemsweb Digital to Tangison Studio is complete, but the journey is not finished. The studio continues to grow its capabilities, take on more complex engagements, and build digital products that matter for organizations across Africa.", "The name changed. The principles did not. We are still the studio that started in Windhoek, building websites for Namibian businesses. We just build more than websites now."] },
    ],
  },
  {
    slug: "aeo-how-ai-search-changes-seo-in-2026",
    title: "AEO: How AI Search Changes SEO in 2026",
    excerpt: "AI Engine Optimization is the next evolution of SEO. Here is what it means, how it differs from traditional SEO, and what Namibian businesses need to do to stay visible.",
    date: "2026-07-08",
    category: "SEO",
    tags: ["aeo", "seo", "ai-search", "optimization"],
    readingTime: 7,
    cover: "/images/paintings/blog/blog-10.webp",
    content: [
      { body: ["Search is changing. For two decades, SEO meant optimizing for Google's keyword-based index. You researched keywords, built content around them, earned backlinks, and climbed the rankings. That world is not gone, but it is no longer the whole picture.", "AI search engines like ChatGPT, Perplexity, and Google's AI Overviews are answering questions directly. They synthesize information from multiple sources and present it as a conversational response. Users are getting answers without clicking through to websites.", "This shift demands a new discipline: AEO, or AI Engine Optimization. It is not a replacement for SEO. It is an evolution."] },
      { heading: "What is AEO", body: ["AEO is the practice of optimizing content so that AI search engines can understand it, trust it, and cite it. Where SEO focuses on ranking in a list of results, AEO focuses on being the source that AI engines reference when they generate answers.", "AI engines do not read content the way Google's crawler does. They look for clear, structured, authoritative information that directly answers questions. They prefer content that is well-organized, factually dense, and easy to parse."] },
      { heading: "How AEO differs from SEO", body: ["Traditional SEO rewards keyword density, backlink profiles, and page authority. AEO rewards clarity, structure, and directness. An AI engine does not care about your keyword density. It cares whether your content answers the question it was asked.", "This means: write for humans first, but structure for machines second. Use clear headings. Answer questions directly. Provide factual information. Use schema markup so machines can understand what your content is about.", "The overlap is significant. Good SEO practices, like clear headings, fast loading times, and structured data, also help with AEO. But AEO adds new requirements: conversational phrasing, question-based headings, and content that works when extracted from its page context."] },
      { heading: "What Namibian businesses should do", body: ["For Namibian businesses, AEO is an opportunity. The African digital landscape is less saturated than European or American markets. Content that is well-structured and directly answers questions about Namibian business, tourism, or services has a strong chance of being cited by AI engines.", "Start with these steps: First, identify the questions your customers actually ask. Not keywords. Questions. Second, write content that answers those questions directly, in plain language, at the top of the page. Third, use schema markup to tell machines what your content is about. Fourth, ensure your content is factually accurate and cite your sources where possible."] },
      { heading: "The future of search", body: ["AI search is not a fad. It is the direction search is moving. The businesses that adapt early will have an advantage. The businesses that ignore it will find themselves invisible in the channels where users are increasingly looking for answers.", "At Studio, we build AEO principles into every website we create. Clear structure. Schema markup. Question-based content organization. Fast, accessible pages that AI engines can parse easily. It is not a separate service. It is part of building a website that works in 2026."] },
    ],
  },
  {
    slug: "seo-best-practices-for-namibian-businesses-2026",
    title: "SEO Best Practices for Namibian Businesses in 2026",
    excerpt: "A practical guide to search engine optimization for businesses operating in Namibia and the broader African market. What works, what does not, and what to prioritize.",
    date: "2026-07-05",
    category: "SEO",
    tags: ["seo", "namibia", "africa", "local-search"],
    readingTime: 8,
    cover: "/images/paintings/blog/blog-11.webp",
    content: [
      { body: ["Search engine optimization for Namibian businesses is different from SEO for businesses in New York or London. The market is smaller. The competition is different. The search behaviors are shaped by local context, language, and infrastructure.", "This guide covers the SEO practices that matter most for Namibian businesses in 2026. It is based on what we have learned building websites for clients across tourism, skincare, logistics, financial services, and public-sector organizations in Namibia."] },
      { heading: "Start with local search", body: ["For most Namibian businesses, local search is the highest-ROI SEO activity. Google Business Profile is free, and it is what appears when someone searches for your business by name or by category in your area.", "Claim your Google Business Profile. Fill out every field. Add photos. Respond to reviews. Post updates. This alone will improve your visibility for local searches more than any on-page optimization.", "If you serve customers across Namibia, make sure your website clearly states your service areas. Use location-based keywords naturally. Create pages for each major city or region you serve if it makes sense for your business."] },
      { heading: "Page speed matters more in Africa", body: ["Many of your users are on mobile networks with limited data and slower speeds. A website that loads in three seconds on fiber might take ten seconds on a 3G connection. Google considers page speed a ranking factor, but more importantly, your users consider it an experience factor.", "Optimize your images. Use modern formats like WebP. Minimize JavaScript. Use a content delivery network. Test your site on a slow connection, not just on your office fiber.", "At Studio, we treat performance as a baseline obligation. Every site we build is optimized for constrained connections because that is the reality of how most users in Namibia access the web."] },
      { heading: "Mobile-first is not optional", body: ["Google indexes the mobile version of your website first. If your mobile site is broken, slow, or missing content, your rankings will suffer.", "More importantly, the majority of Namibian internet users access the web primarily through mobile devices. A website that does not work well on a phone is a website that does not work for most of your audience.", "Test your site on real devices. Not just in a browser's mobile preview. Open it on a mid-range Android phone on a 3G connection and see what the experience is actually like."] },
      { heading: "Schema markup", body: ["Schema markup is structured data that tells search engines what your content is about. It helps Google understand that a page is about a product, a service, an article, or a local business.", "For Namibian businesses, the most valuable schema types are LocalBusiness, Service, Product, and FAQPage. These help your business appear in rich results, which take up more space on the search results page and attract more clicks.", "Implementing schema is technical but straightforward. If your website is built with modern tools like Next.js, schema can be added programmatically. If you are using a CMS, there are plugins that handle it."] },
      { heading: "Content that answers questions", body: ["The most effective SEO content in 2026 answers the questions your customers actually ask. Not the questions you think they should ask. The questions they type into Google or ask an AI assistant.", "Talk to your customers. Read your reviews. Look at the search queries that bring people to your site. Find the questions and write content that answers them clearly and directly.", "For a tour operator, that might be: How do I book a safari in Namibia? What is the best time to visit the Skeleton Coast? Do I need a visa for Namibia? Answer these questions on your website and you will capture search traffic that your competitors are missing."] },
      { heading: "What to avoid", body: ["Do not buy backlinks. Do not stuff keywords. Do not create thin content just to have more pages. Do not copy content from other websites. Do not ignore accessibility.", "These practices worked ten years ago. They do not work now. Google's algorithms are sophisticated enough to detect and penalize them. More importantly, they create a bad experience for your users.", "Focus on creating genuine value. Write content that helps your customers. Build a website that works well. The SEO will follow."] },
    ],
  },
  {
    slug: "why-your-website-needs-structured-data",
    title: "Why Your Website Needs Structured Data",
    excerpt: "Structured data is the language search engines and AI tools use to understand your website. Here is what it is, how it works, and why it matters more in 2026 than ever before.",
    date: "2026-07-03",
    category: "SEO",
    tags: ["structured-data", "schema", "seo", "aeo"],
    readingTime: 5,
    cover: "/images/paintings/blog/blog-12.webp",
    content: [
      { body: ["Structured data is invisible to your website visitors but critical to search engines, AI tools, and other machines that read your site. It is the difference between a machine seeing a block of text and understanding that the text describes a product, a local business, or an article.", "In 2026, structured data matters more than ever. AI search engines rely on it to understand and cite content. Google uses it for rich results. Voice assistants use it to answer questions. Without it, your content is harder for machines to understand, and you lose visibility in the channels that matter."] },
      { heading: "What structured data looks like", body: ["Structured data uses a vocabulary called schema.org. It is written in JSON-LD, a format that sits inside a script tag in your page's HTML. It does not change how your page looks. It only adds machine-readable context.", "For example, a LocalBusiness schema tells search engines your business name, address, phone number, opening hours, and services. An Article schema tells them the title, author, publication date, and description of an article. An FAQPage schema lists questions and answers."] },
      { heading: "Why it matters for SEO", body: ["Google uses structured data to generate rich results. A rich result is a search listing that includes extra information: star ratings, FAQ accordions, breadcrumb navigation, event dates, product prices.", "Rich results take up more space on the search results page. They attract more clicks. They make your listing more useful to searchers before they even visit your site.", "Without structured data, your listing is a blue link with a title and description. With it, your listing can include interactive elements that make it stand out."] },
      { heading: "Why it matters for AEO", body: ["AI search engines like ChatGPT and Perplexity use structured data to understand what your content is about. When a user asks a question, the AI looks for content that matches the question and has clear structured context.", "If your article has Article schema with a clear headline, description, and date, the AI can confidently cite it as a source. If your FAQ page has FAQPage schema, the AI can extract individual questions and answers directly.", "Without structured data, the AI has to guess what your content is about. It might get it wrong. It might skip your content entirely. Structured data removes the guesswork."] },
      { heading: "How to implement it", body: ["If your website is built with a modern framework like Next.js, structured data can be added programmatically. Each page can generate its own schema based on its content. This is the approach we use at Studio.", "If you are using a CMS like WordPress, there are plugins that handle schema automatically. Yoast SEO and Rank Math both generate basic schema. For more advanced schema, you may need custom development.", "The key is to start with the basics: LocalBusiness for your homepage, Article for your blog posts, FAQPage for your FAQ, and BreadcrumbList for navigation. These four cover the majority of use cases for most businesses."] },
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
