import { permanentRedirect } from "next/navigation";
import { mapServiceToCapability } from "@/lib/capabilities";

/**
 * /services/brand-systems → /services#<capability>
 *
 * The flat seven-service presentation has been collapsed into three
 * outcome-led capabilities: Brand, Product, Intelligence.
 * This redirect preserves SEO equity (308 permanent) and routes
 * visitors to the relevant capability section.
 */
export default async function ServiceRedirect() {
  const capabilityId = mapServiceToCapability("brand-systems");
  if (capabilityId) {
    permanentRedirect(`/services#${capabilityId}`);
  }
  permanentRedirect("/services");
}
