import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 10;

/* ──────────────────────────────────────────────
   POST /api/contact
   Serverless-compatible: no in-memory state.
   Relies on honeypot field + validation for spam protection.
   ────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization, message, website } = body;

    // Honeypot check — if filled, it's a bot
    if (website) {
      // Pretend success to confuse bots
      return NextResponse.json({ success: true, message: "Message received" });
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!organization || typeof organization !== "string" || organization.trim().length === 0) {
      return NextResponse.json({ error: "Organization is required" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Log the submission (serverless-safe: console, not in-memory)
    console.info("[Contact Form Submission]", {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim(),
      messageLength: message.trim().length,
    });

    // TODO: Integrate email service (Resend, SendGrid, etc.) for production
    // For now, submissions are logged to Vercel function logs

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
