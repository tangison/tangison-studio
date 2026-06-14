import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";

  return [
    // Primary navigation
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/partnership`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // Secondary pages
    { url: `${baseUrl}/process`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/brand`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/studio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Service sub-pages
    { url: `${baseUrl}/services/website-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/website-development`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/application-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/product-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/brand-systems`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/design-systems`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/creative-direction`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Case study pages — highest content priority
    { url: `${baseUrl}/work/proavia`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/nalago`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/clusterleaf`, lastModified: new Date("2026-04-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/smefrog`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/petrocor`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/tangison-systems`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/crescendo`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work/feorm`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    // Work industry pages
    { url: `${baseUrl}/work/smes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/mining`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/government`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/tourism`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/agriculture`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/finance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/education`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/healthcare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/work/energy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Legal
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
