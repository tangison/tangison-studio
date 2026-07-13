import { describe, it, expect } from "vitest";
import { capabilities, mapServiceToCapability, allPrograms } from "@/lib/capabilities";
import { socialLinks, googleBusinessProfile } from "@/config/social";
import { caseStudies } from "@/lib/case-studies";
import fs from "fs";
import path from "path";

describe("Social links configuration", () => {
  it("has exactly Facebook, Instagram, Threads", () => {
    const platforms = Object.keys(socialLinks);
    expect(platforms).toHaveLength(3);
    expect(platforms).toContain("facebook");
    expect(platforms).toContain("instagram");
    expect(platforms).toContain("threads");
  });

  it("does NOT have LinkedIn or X", () => {
    const platforms = Object.keys(socialLinks);
    expect(platforms).not.toContain("linkedin");
    expect(platforms).not.toContain("x");
    expect(platforms).not.toContain("twitter");
  });

  it("Facebook URL contains namibia.digital", () => {
    expect(socialLinks.facebook).toContain("namibia.digital");
  });

  it("Instagram handle is tangison_studio", () => {
    expect(socialLinks.instagram).toContain("tangison_studio");
  });

  it("Threads handle is tangison_studio", () => {
    expect(socialLinks.threads).toContain("tangison_studio");
  });

  it("Google Business Profile has a maps URL", () => {
    expect(googleBusinessProfile.mapsUrl).toContain("google.com/maps");
  });
});

describe("Capabilities (3 groups, 9 programs)", () => {
  it("has exactly 3 capabilities", () => {
    expect(capabilities).toHaveLength(3);
  });

  it("capabilities are Brand, Product, Intelligence", () => {
    const ids = capabilities.map((c) => c.id);
    expect(ids).toEqual(["brand", "product", "intelligence"]);
  });

  it("each capability has exactly 3 programs", () => {
    capabilities.forEach((cap) => {
      expect(cap.programs).toHaveLength(3);
    });
  });

  it("total of 9 programs", () => {
    expect(allPrograms).toHaveLength(9);
  });

  it("maps old services to correct capabilities", () => {
    expect(mapServiceToCapability("website-design")).toBe("product");
    expect(mapServiceToCapability("website-development")).toBe("product");
    expect(mapServiceToCapability("brand-systems")).toBe("brand");
    expect(mapServiceToCapability("creative-direction")).toBe("brand");
  });
});

describe("Case studies", () => {
  it("has 11 case studies", () => {
    expect(caseStudies).toHaveLength(11);
  });

  it("includes the 3 priority projects", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(slugs).toContain("proavia");
    expect(slugs).toContain("nalago");
    expect(slugs).toContain("clusterleaf");
  });

  it("each case study has a URL", () => {
    caseStudies.forEach((cs) => {
      expect(cs.url).toBeDefined();
      expect(cs.url).toMatch(/^https?:\/\//);
    });
  });

  it("each case study has required fields", () => {
    caseStudies.forEach((cs) => {
      expect(cs.name).toBeTruthy();
      expect(cs.industry).toBeTruthy();
      expect(cs.challengeBody).toBeDefined();
      expect(cs.approachBody).toBeDefined();
      expect(cs.outcomeBody).toBeDefined();
    });
  });
});

describe("Build marker exists", () => {
  it("layout.tsx has data-build attribute", () => {
    const layout = fs.readFileSync(
      path.resolve(process.cwd(), "src/app/layout.tsx"),
      "utf-8"
    );
    expect(layout).toContain("data-build");
  });

  it("/api/version route exists", () => {
    expect(
      fs.existsSync(path.resolve(process.cwd(), "src/app/api/version/route.ts"))
    ).toBe(true);
  });
});

describe("Official icon exists", () => {
  it("favicon.webp exists in public/brand", () => {
    expect(
      fs.existsSync(path.resolve(process.cwd(), "public/brand/favicon.webp"))
    ).toBe(true);
  });

  it("favicon.webp is a valid WebP file (not empty)", () => {
    const stat = fs.statSync(
      path.resolve(process.cwd(), "public/brand/favicon.webp")
    );
    expect(stat.size).toBeGreaterThan(1000); // at least 1KB
  });
});

describe("Oil paintings exist", () => {
  const paintings = [
    "atlantic-signal-hero",
    "windhoek-studio-window",
    "interface-sketch",
    "night-signal",
    "identity-table",
    "digital-journey",
    "product-workshop",
    "windhoek-working-city",
  ];

  paintings.forEach((name) => {
    it(`${name}.webp exists`, () => {
      const p = path.resolve(
        process.cwd(),
        `public/images/paintings/${name}.webp`
      );
      expect(fs.existsSync(p)).toBe(true);
    });
  });
});

describe("Intelligence diagrams exist", () => {
  const diagrams = [
    "connected-systems",
    "agent-infrastructure",
    "private-intelligence",
    "workflow-automation",
  ];

  diagrams.forEach((name) => {
    it(`${name}.webp exists`, () => {
      const p = path.resolve(
        process.cwd(),
        `public/images/intelligence/${name}.webp`
      );
      expect(fs.existsSync(p)).toBe(true);
    });
  });
});

describe("Accessibility: color contrast tokens", () => {
  it("globals.css has accessible teal-text variant", () => {
    const css = fs.readFileSync(
      path.resolve(process.cwd(), "src/app/globals.css"),
      "utf-8"
    );
    expect(css).toContain("--color-signal-teal-text");
    expect(css).toContain("#157372");
  });

  it("globals.css has accessible teal-button variant", () => {
    const css = fs.readFileSync(
      path.resolve(process.cwd(), "src/app/globals.css"),
      "utf-8"
    );
    expect(css).toContain("--color-signal-teal-button");
    expect(css).toContain("#0F5C5B");
  });

  it("globals.css has prefers-reduced-motion", () => {
    const css = fs.readFileSync(
      path.resolve(process.cwd(), "src/app/globals.css"),
      "utf-8"
    );
    expect(css).toContain("prefers-reduced-motion");
  });
});

describe("StudioLogo component", () => {
  it("has perfect circle container (border-radius: 50%)", () => {
    const css = fs.readFileSync(
      path.resolve(process.cwd(), "src/app/globals.css"),
      "utf-8"
    );
    expect(css).toContain("border-radius: 50%");
    expect(css).toContain("aspect-ratio: 1 / 1");
    expect(css).toContain("flex-shrink: 0");
  });

  it("supports light wordmark color for dark backgrounds", () => {
    const logo = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/studio/studio-logo.tsx"),
      "utf-8"
    );
    expect(logo).toContain('wordmarkColor');
    expect(logo).toContain('"light"');
    expect(logo).toContain("#E6F2F1");
  });
});

describe("Security headers", () => {
  it("next.config.ts has security headers", () => {
    const config = fs.readFileSync(
      path.resolve(process.cwd(), "next.config.ts"),
      "utf-8"
    );
    expect(config).toContain("X-Frame-Options");
    expect(config).toContain("X-Content-Type-Options");
    expect(config).toContain("Referrer-Policy");
  });
});

describe("SEO infrastructure", () => {
  it("sitemap.ts exists", () => {
    expect(
      fs.existsSync(path.resolve(process.cwd(), "src/app/sitemap.ts"))
    ).toBe(true);
  });

  it("robots.ts exists", () => {
    expect(
      fs.existsSync(path.resolve(process.cwd(), "src/app/robots.ts"))
    ).toBe(true);
  });

  it("OG image exists", () => {
    expect(
      fs.existsSync(path.resolve(process.cwd(), "public/og.png"))
    ).toBe(true);
  });
});
