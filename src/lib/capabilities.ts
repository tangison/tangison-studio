/**
 * Studio — Two capability groups and seven outcome-led programs.
 *
 * Brand and Product merged into one unified service.
 * Automation removed from Intelligence entirely.
 *
 * Old mapping:
 *   Brand Systems, Creative Direction,
 *   Website Design, Website Development,
 *   Application Design, Product Design,
 *   Design Systems                             → STUDIO (brand + product combined)
 *   Applied AI, AI agents, custom systems      → INTELLIGENCE (automation removed)
 */

export type CapabilityId = "studio" | "intelligence";

export interface Program {
  id: string;
  name: string;
  capability: CapabilityId;
  situation: string;
  transformation: string;
  outputs: string[];
  exampleSlug?: string;
}

export interface Capability {
  id: CapabilityId;
  number: string;
  name: string;
  shortDescription: string;
  purpose: string;
  includes: string[];
  programs: Program[];
  /** Old service slugs that redirect to this capability */
  relatedServices: string[];
  /** Visual mode: studio (oil-painted) or intelligence (technical) */
  visualMode: "studio" | "intelligence";
}

export const capabilities: Capability[] = [
  {
    id: "studio",
    number: "01",
    name: "Studio",
    shortDescription:
      "Identity, product design, and development. Brand and digital product as one service, not two separate vendors.",
    purpose:
      "Give organizations a coherent brand and a working digital product that carries it.",
    includes: [
      "Brand strategy",
      "Positioning",
      "Visual identity",
      "Verbal direction",
      "Brand systems",
      "Creative direction",
      "Campaign identity",
      "Digital brand application",
      "Website strategy",
      "User experience",
      "User-interface design",
      "Website development",
      "Web applications",
      "Product design",
      "Prototyping",
      "Design systems",
      "Content architecture",
      "Performance and accessibility",
    ],
    relatedServices: [
      "brand-systems",
      "creative-direction",
      "website-design",
      "website-development",
      "application-design",
      "product-design",
      "design-systems",
    ],
    visualMode: "studio",
    programs: [
      {
        id: "find-your-position",
        name: "Find Your Position",
        capability: "studio",
        situation:
          "For organizations that need a clearer market position, message and point of view.",
        transformation:
          "A defined position that every subsequent decision can be measured against.",
        outputs: [
          "Positioning statement",
          "Audience and competitor mapping",
          "Messaging framework",
          "Brand voice direction",
        ],
      },
      {
        id: "build-the-identity",
        name: "Build the Identity",
        capability: "studio",
        situation:
          "For new organizations or brands that need a complete visual and verbal system.",
        transformation:
          "A coherent identity the organization can apply consistently from day one.",
        outputs: [
          "Visual identity",
          "Logo and lockup system",
          "Colour and type system",
          "Brand guidelines",
        ],
      },
      {
        id: "refresh-the-brand",
        name: "Refresh the Brand",
        capability: "studio",
        situation:
          "For established organizations whose identity no longer reflects their value.",
        transformation:
          "An identity that catches up to where the organization has already grown.",
        outputs: [
          "Identity audit",
          "Refined visual system",
          "Updated guidelines",
          "Migration plan",
        ],
      },
      {
        id: "launch-the-platform",
        name: "Launch the Platform",
        capability: "studio",
        situation:
          "For organizations that need a new high-quality website or digital service.",
        transformation:
          "A production website that represents the organization and converts visitors.",
        outputs: [
          "Discovery and strategy",
          "Design and development",
          "Launch and handover",
          "Documentation",
        ],
        exampleSlug: "proavia",
      },
      {
        id: "improve-the-journey",
        name: "Improve the Journey",
        capability: "studio",
        situation:
          "For organizations losing customers through unclear, outdated or inefficient experiences.",
        transformation:
          "A journey that keeps customers moving toward the action that matters.",
        outputs: [
          "UX audit",
          "Journey redesign",
          "Updated interface",
          "Conversion path optimization",
        ],
      },
      {
        id: "build-the-product",
        name: "Build the Product",
        capability: "studio",
        situation:
          "For portals, dashboards, applications and new digital-product ideas.",
        transformation:
          "A working product that real users can use every day.",
        outputs: [
          "Product strategy",
          "UI/UX design",
          "Application development",
          "Design system",
        ],
        exampleSlug: "smefrog",
      },
    ],
  },
  {
    id: "intelligence",
    number: "02",
    name: "Intelligence",
    shortDescription:
      "Applied AI, custom integrations, and self-hosted infrastructure that turn digital products into working systems.",
    purpose: "Build the systems behind the interface.",
    includes: [
      "Applied AI",
      "AI agents",
      "Custom integrations",
      "Knowledge systems",
      "Self-hosted infrastructure",
      "Internal tools",
      "Intelligent product features",
    ],
    relatedServices: [],
    visualMode: "intelligence",
    programs: [
      {
        id: "add-intelligence",
        name: "Add Intelligence",
        capability: "intelligence",
        situation:
          "For products that need AI search, assistants, recommendations or agent-based functionality.",
        transformation:
          "AI features that solve a specific user problem rather than demonstrating a model.",
        outputs: [
          "Feature scoping",
          "Model and provider selection",
          "Integration build",
          "Evaluation framework",
        ],
      },
      {
        id: "own-the-infrastructure",
        name: "Own the Infrastructure",
        capability: "intelligence",
        situation:
          "For organizations that need controlled, self-hosted or privacy-conscious intelligent systems.",
        transformation:
          "Intelligence infrastructure the organization controls directly.",
        outputs: [
          "Infrastructure architecture",
          "Self-hosted deployment",
          "Security and access controls",
          "Operational documentation",
        ],
      },
    ],
  },
];

export function getCapability(id: CapabilityId): Capability | undefined {
  return capabilities.find((c) => c.id === id);
}

/**
 * Maps an old service slug to its new capability.
 * Used by the /services/[slug] redirect route.
 */
export function mapServiceToCapability(slug: string): CapabilityId | null {
  for (const cap of capabilities) {
    if (cap.relatedServices.includes(slug)) {
      return cap.id;
    }
  }
  return null;
}

export const allPrograms: Program[] = capabilities.flatMap((c) => c.programs);

export function getProgram(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id);
}
