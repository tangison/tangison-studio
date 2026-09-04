import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/cases`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${site.url}/blog/one-studio-instead-of-three-vendors`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
  const casePages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/cases/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...casePages];
}
