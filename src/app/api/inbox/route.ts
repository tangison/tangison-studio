import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

/**
 * Admin retrieval for studio project briefs (owner only).
 *
 * While email is unconfigured, briefs land in Vercel Blob under
 * briefs/<reference>/brief.json (store: tangison-applications).
 *
 * Auth: header `x-admin-token: <APPLICATIONS_TOKEN>` (or ?token=).
 * The token lives in the Vercel project's environment variables.
 */

export const runtime = "nodejs";

function authorized(req: Request): "ok" | "unconfigured" | "denied" {
  const expected = process.env.APPLICATIONS_TOKEN;
  if (!expected) return "unconfigured";
  const given =
    req.headers.get("x-admin-token") ??
    new URL(req.url).searchParams.get("token") ??
    "";
  return given === expected ? "ok" : "denied";
}

export async function GET(req: Request) {
  const auth = authorized(req);
  if (auth === "unconfigured") {
    return NextResponse.json(
      { error: "Admin access is not configured yet (APPLICATIONS_TOKEN missing)." },
      { status: 503 }
    );
  }
  if (auth === "denied") {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const out: Record<string, unknown>[] = [];
  let cursor: string | undefined = undefined;
  do {
    const page = await list({ prefix: "briefs/", cursor, limit: 1000 });
    for (const b of page.blobs) {
      if (!b.pathname.endsWith("/brief.json")) continue;
      try {
        const res = await fetch(b.url, { cache: "no-store" });
        if (!res.ok) continue;
        out.push((await res.json()) as Record<string, unknown>);
      } catch {
        // skip unreadable records rather than failing the whole listing
      }
    }
    cursor = page.hasNextMore ? page.cursor : undefined;
  } while (cursor);

  out.sort((a, b) =>
    String(b.submittedAt ?? "").localeCompare(String(a.submittedAt ?? ""))
  );

  return NextResponse.json(
    { count: out.length, briefs: out.slice(0, 100) },
    { headers: { "Cache-Control": "no-store" } }
  );
}
