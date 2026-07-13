import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    commit:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
      process.env.NEXT_PUBLIC_BUILD_ID ??
      "local",
    environment: process.env.NODE_ENV ?? "unknown",
    deployedAt: new Date().toISOString(),
  });
}
