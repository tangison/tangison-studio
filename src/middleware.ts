import { NextRequest, NextResponse } from "next/server";

/**
 * Agent negotiation: an agent that asks for text/markdown gets the markdown
 * variant of a case study or article directly at the canonical URL, no .md
 * suffix needed (SquirrelScan ax/markdown-response). Browsers are untouched:
 * their Accept never carries text/markdown.
 */
export function middleware(req: NextRequest) {
  const accept = req.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) return NextResponse.next();

  const { pathname } = req.nextUrl;
  const m = pathname.match(/^\/(cases|blog)\/([^/]+)$/);
  if (!m) return NextResponse.next();

  return NextResponse.rewrite(new URL(`/md/${m[1]}/${m[2]}`, req.url));
}

export const config = {
  matcher: ["/cases/:path*", "/blog/:path*"],
};
