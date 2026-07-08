import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";

  // Stable dates — using new Date() makes every deploy regenerate the sitemap
  // with new timestamps, which signals churn to crawlers and can hurt crawl
  // prioritization. These dates reflect the last meaningful content update.
  // Update them manually when content actually changes.
  const PRIMARY_NAV = new Date("2026-07-01"); // homepage, work, services, about, contact, partnership
  const SECONDARY = new Date("2026-07-01"); // process, brand, blog, resources, faq, studio, careers
  const SERVICES = new Date("2026-07-01"); // service sub-pages
  const INDUSTRIES = new Date("2026-06-15"); // work industry pages
  const LEGAL = new Date("2026-01-01"); // legal pages — change rarely

  return [
    // Primary navigation
    { url: baseUrl, lastModified: PRIMARY_NAV, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: PRIMARY_NAV, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: PRIMARY_NAV, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: PRIMARY_NAV, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: PRIMARY_NAV, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/partnership`, lastModified: PRIMARY_NAV, changeFrequency: "monthly", priority: 0.9 },
    // Secondary pages
    { url: `${baseUrl}/process`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/brand`, lastModified: SECONDARY, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: SECONDARY, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/resources`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/studio`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.5 },
    // Service sub-pages
    { url: `${baseUrl}/services/website-design`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/website-development`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/application-design`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/product-design`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/brand-systems`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/design-systems`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/creative-direction`, lastModified: SERVICES, changeFrequency: "monthly", priority: 0.6 },
    // Case study pages — highest content priority
    { url: `${baseUrl}/work/proavia`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/nalago`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/clusterleaf`, lastModified: new Date("2026-04-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/smefrog`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/petrocor`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/tangison-systems`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/crescendo`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/feorm`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/lrclearing`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/reviveautoworks`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/miway`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.9 },
    // Work industry pages
    { url: `${baseUrl}/work/smes`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/mining`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/government`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/tourism`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/agriculture`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/finance`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/education`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/healthcare`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/energy`, lastModified: INDUSTRIES, changeFrequency: "monthly", priority: 0.5 },
    // Legal
    { url: `${baseUrl}/legal/privacy`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
  ];
}
