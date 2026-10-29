import { getArticle, getArticles } from "@/lib/articles";
import { site } from "@/lib/site";

/**
 * text/markdown response for one article (SquirrelScan ax/markdown-response):
 * agents can request the raw markdown with Accept: text/markdown or the
 * /blog/{slug}.md URL (rewritten here). Serves the same words the page
 * renders: a small frontmatter, then the article body verbatim.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return new Response("Not found", { status: 404 });
  }
  const frontmatter = [
    "---",
    `title: "${article.title}"`,
    `description: "${article.description.replace(/"/g, "'")}"`,
    `category: "${article.category}"`,
    `date: "${article.date}"`,
    `author: "${article.author}"`,
    `url: ${site.url}/blog/${article.slug}`,
    "---",
    "",
  ].join("\n");
  return new Response(frontmatter + article.body + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

/** Static generation: one markdown document per article. */
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export const dynamic = "force-static";
