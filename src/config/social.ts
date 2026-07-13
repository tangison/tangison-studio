/**
 * Social media URLs for Studio.
 *
 * Studio currently operates:
 * - Facebook
 * - Instagram
 * - Threads
 *
 * Studio does NOT currently operate:
 * - LinkedIn  (architecture supports adding it later; do not render until URL is verified)
 * - X/Twitter  (architecture supports adding it later; do not render until URL is verified)
 *
 * The intended social handle is: business_tangison_studio
 * Profile URLs below are placeholders pending owner verification.
 * UPDATE THESE URLS with the exact verified profile links before going live.
 *
 * Source: Follow-up directive section 1 (SOCIAL-MEDIA CORRECTION)
 */

export const socialLinks = {
  facebook: "https://www.facebook.com/business_tangison_studio",
  instagram: "https://www.instagram.com/business_tangison_studio",
  threads: "https://www.threads.net/@business_tangison_studio",
} as const;

export type SocialPlatform = keyof typeof socialLinks;

/**
 * Future-ready slots. Do NOT render these in the UI until a verified URL is
 * provided. Kept here so adding them later is a one-line change.
 */
export const pendingSocialLinks = {
  linkedin: null as string | null,
  x: null as string | null,
} as const;
