import { NextRequest, NextResponse } from "next/server";

/* ──────────────────────────────────────────────
   RATE LIMITING — in-memory, per IP
   Max 5 submissions per IP per hour
   ────────────────────────────────────────────── */

const submissionCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  submissionCounts.forEach((entry, ip) => {
    if (now > entry.resetAt) {
      keysToDelete.push(ip);
    }
  });
  keysToDelete.forEach((ip) => submissionCounts.delete(ip));
}, 10 * 60 * 1000);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissionCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    submissionCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

/* ──────────────────────────────────────────────
   POST /api/contact
   ────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await req.json();
    const { name, email, organization, message } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (
      !organization ||
      typeof organization !== "string" ||
      organization.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Organization is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Log the submission
    console.info("[Contact Form Submission]", {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
