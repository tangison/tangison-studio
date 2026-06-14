import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "./page-client";
import { getCaseStudy, getAllCaseStudySlugs, caseStudies } from "@/lib/case-studies";

/* ──────────────────────────────────────────────
   STATIC PARAMS
   ────────────────────────────────────────────── */

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

/* ──────────────────────────────────────────────
   SEO METADATA PER CASE STUDY
   ────────────────────────────────────────────── */

const titleMap: Record<string, string> = {
  proavia: "ProAvia Case Study",
  nalago: "Nalago Case Study",
  clusterleaf: "Cluster Leaf Case Study",
  smefrog: "SMEFrog Case Study",
  petrocor: "Petrocor Case Study",
  "tangison-systems": "Tangison Systems Case Study",
  crescendo: "Crescendo Case Study",
  feorm: "Feorm Case Study",
};

const descriptionMap: Record<string, string> = {
  proavia:
    "Tangison built ProAvia's travel website, a Namibian tour operator site built around trust signals, real photography, and WhatsApp conversion.",
  nalago:
    "Tangison built Nalago Skincare's e-commerce site, an organic skincare brand powered by Kalahari ingredient stories and confident pricing.",
  clusterleaf:
    "Tangison built Cluster Leaf Safaris' website, a premium safari operator site built on photography, pricing transparency, and owner-operated trust.",
  smefrog:
    "Tangison built SMEFrog's LegalTech platform, a Namibian business registration site built around 2X cheaper pricing and WhatsApp conversion.",
  petrocor:
    "Tangison built Petrocor's B2B energy site, a corporate platform designed for procurement decision-makers with a single Get Quote CTA.",
  "tangison-systems":
    "Tangison built its own company site as sovereign intelligence infrastructure, positioned with precision from Windhoek, Namibia for the African market.",
  crescendo:
    "Tangison built Crescendo Namibia's music platform, a 16-year Windhoek institution with Shop and Academy as equal pillars for music education.",
  feorm:
    "Tangison built Feorm, a farm stay discovery platform for Namibia, from brand identity to Python backend, as an internal product.",
};

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const cs = getCaseStudy(slug);
    if (!cs) return {};

    const title = titleMap[slug] || `${cs.name} Case Study`;
    const description = descriptionMap[slug] || `${cs.name} case study from Tangison Studio.`;
    const canonical = `https://studio.tangison.com/work/${slug}`;
    const ogImage = `/images/work/screenshots/${cs.screenshotSlug}-screenshot.webp`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title: `${title} | TANGISON STUDIO`,
        description,
        url: canonical,
        siteName: "Tangison Studio",
        images: [{ url: ogImage, width: 1200, height: 800, alt: `${cs.name} website` }],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | TANGISON STUDIO`,
        description,
        images: [ogImage],
      },
    };
  });
}

/* ──────────────────────────────────────────────
   SERVER PAGE COMPONENT
   ────────────────────────────────────────────── */

export default async function CaseStudyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  // JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: cs.name,
    headline: cs.challengeH2,
    image: `https://studio.tangison.com/images/work/screenshots/${cs.screenshotSlug}-screenshot.webp`,
    author: {
      "@type": "Organization",
      name: "Tangison Studio",
      url: "https://studio.tangison.com",
    },
    datePublished: `${cs.year}-01-01`,
    url: `https://studio.tangison.com/work/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://studio.tangison.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: "https://studio.tangison.com/work",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cs.name,
        item: `https://studio.tangison.com/work/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CaseStudyPage caseStudy={cs} />
    </>
  );
}
