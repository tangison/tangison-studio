import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";

  const PRIMARY = new Date("2026-07-13");
  const SECONDARY = new Date("2026-07-01");
  const LEGAL = new Date("2026-01-01");

  return [
    // Primary navigation
    { url: baseUrl, lastModified: PRIMARY, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/partnership`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.9 },
    // Secondary pages
    { url: `${baseUrl}/process`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/studio`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: SECONDARY, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/resources`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/careers`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/brand`, lastModified: SECONDARY, changeFrequency: "yearly", priority: 0.4 },
    // Case study pages
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
    // Legal
    { url: `${baseUrl}/legal/privacy`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
  ];
}
