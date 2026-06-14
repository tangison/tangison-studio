import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";

/* ── Organization Schema (use on homepage) ── */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tangison Studio",
    alternateName: "TANGISON STUDIO",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/favicon.webp`,
    description:
      "Tangison Studio is a creative digital agency that designs and builds digital experiences that move ideas forward.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Windhoek",
      addressCountry: "NA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "studio@tangison.com",
      contactType: "customer service",
    },
    sameAs: [
      "https://linkedin.com/company/tangison",
      "https://github.com/tangison",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── LocalBusiness Schema (use on contact page) ── */
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tangison Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/favicon.webp`,
    description:
      "Creative digital agency in Windhoek, Namibia. Website design, development, brand systems, and creative direction.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Windhoek",
      addressRegion: "Khomas",
      addressCountry: "NA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.5609,
      longitude: 17.0658,
    },
    telephone: "+264 85 341 1522",
    email: "studio@tangison.com",
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-17:00",
    areaServed: {
      "@type": "Country",
      name: "Namibia",
    },
    serviceType: [
      "Website Design",
      "Website Development",
      "Brand Systems",
      "Application Design",
      "Product Design",
      "Design Systems",
      "Creative Direction",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Service Schema (use on individual service pages) ── */
interface ServiceJsonLdProps {
  name: string;
  description: string;
  slug: string;
}

export function ServiceJsonLd({ name, description, slug }: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Tangison Studio",
      url: SITE_URL,
    },
    url: `${SITE_URL}/services/${slug}`,
    areaServed: {
      "@type": "Country",
      name: "Namibia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── FAQPage Schema (use on /faq page) ── */
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── BreadcrumbList Schema (use on sub-pages) ── */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── WebPage Schema (use on any page) ── */
interface WebPageJsonLdProps {
  title: string;
  description: string;
  url: string;
}

export function WebPageJsonLd({ title, description, url }: WebPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    publisher: {
      "@type": "Organization",
      name: "Tangison Studio",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
