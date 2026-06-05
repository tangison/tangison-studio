/**
 * Social media URLs for Tangison Studio.
 * Update these placeholder URLs with real profile links.
 * All social references across the site import from this single file.
 */

export const socialLinks = {
  instagram: "https://instagram.com/tangisonstudio",  // TODO: Replace with real URL
  linkedin: "https://linkedin.com/company/tangisonstudio",  // TODO: Replace with real URL
  x: "https://x.com/tangisonstudio",  // TODO: Replace with real URL
  youtube: "https://youtube.com/@tangisonstudio",  // TODO: Replace with real URL
} as const;

export type SocialPlatform = keyof typeof socialLinks;
