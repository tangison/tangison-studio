import { getProject, getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * text/markdown response for one case study (SquirrelScan
 * ax/markdown-response): agents can request /cases/{slug}.md (rewritten
 * here). Same facts the page renders, as a clean markdown document.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) {
    return new Response("Not found", { status: 404 });
  }

  const section = (title: string, paras: string[]) =>
    [`## ${title}`, "", ...paras.map((x) => x + "\n")].join("\n");

  const craft = p.case.craft.length
    ? ["## What carried the result", "", ...p.case.craft.map((c) => `### ${c.title}\n${c.body}\n`)].join("\n")
    : "";

  const doc = [
    `# ${p.name}`,
    "",
    p.eyebrow,
    "",
    p.description,
    "",
    p.live ? `Live site: ${p.live}` : "Live site: none published.",
    "",
    `Tags: ${p.tags.join(", ")}`,
    `Stack: ${p.tech.join(", ")}`,
    "",
    section("The challenge", p.case.challenge),
    section("The approach", p.case.approach),
    craft,
    section("The outcome", p.case.outcome),
    "---",
    "",
    `Case study index: ${site.url}/cases`,
    "",
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(doc, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamic = "force-static";
