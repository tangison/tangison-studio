import type { MetadataRoute } from "next";
import { articles } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";
  const PRIMARY = new Date("2026-08-08");
  const SECONDARY = new Date("2026-08-08");
  const LEGAL = new Date("2026-01-01");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: PRIMARY, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/audit`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/partnership`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/process`, lastModified: PRIMARY, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/studio`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: PRIMARY, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/resources`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/careers`, lastModified: SECONDARY, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/brand`, lastModified: SECONDARY, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/legal/privacy`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: LEGAL, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: PRIMARY,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
