import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";

/**
 * Contact endpoint: delivers project briefs to the studio inbox via Resend.
 *
 * Setup (.env locally, and Project → Settings → Environment Variables on Vercel):
 *     RESEND_API_KEY=re_xxxxxxxxx     <- your real Resend API key
 *     CONTACT_TO=studio@tangison.com  <- optional override
 *     CONTACT_FROM=Studio <briefs@studio.tangison.com>
 *
 * Note: studio.tangison.com is verified in Resend (sending enabled), so the
 * default sender already delivers to any inbox. Only override CONTACT_FROM
 * if you want briefs to appear from a different address.
 *
 * While email is unconfigured, briefs are stored durably in Vercel Blob
 * (store: tangison-applications, prefix briefs/) so nothing is lost; they
 * are readable via GET /api/inbox with the APPLICATIONS_TOKEN. A brief
 * succeeds if EITHER path works.
 */

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "studio@tangison.com";
// One sender for the whole estate: the tangison.com domain is the only
// Resend-verified sending domain (contact@tangison.com). A
// briefs@studio.tangison.com sender would be rejected by Resend with a
// domain-not-verified error, so the form would silently break.
const FROM =
  process.env.CONTACT_FROM ?? "Tangison Studio <contact@tangison.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const timeline = str(body.timeline);
  const budget = str(body.budget);
  const company = str(body.company); // honeypot
  const mathAnswer = str(body.mathAnswer); // human check, always 47

  // honeypot: bots fill hidden fields: pretend success, send nothing
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || name.length > 120) {
    return NextResponse.json(
      { error: "Please tell us your name." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Tell us a little about the project (10+ characters)." },
      { status: 400 }
    );
  }

  // Human check: every generated sequence sums to 47, so the server
  // validates that single invariant without carrying question state.
  if (Number(mathAnswer) !== 47) {
    return NextResponse.json(
      { error: "The human check did not add up. Try the sum once more." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  let emailSent = false;

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    timeline && `Timeline: ${timeline}`,
    budget && `Budget range: ${budget}`,
    "",
    message,
  ].filter((l): l is string => typeof l === "string");

  if (apiKey && !apiKey.startsWith("re_xxxxx")) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Project brief: ${name}`,
      text: lines.join("\n"),
      html: [
        `<div style="font-family:Georgia,serif;color:#111315;font-size:16px;line-height:1.6">`,
        `<p style="font-size:18px"><strong>New project brief from ${escapeHtml(name)}</strong></p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        timeline && `<p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>`,
        budget && `<p><strong>Budget range:</strong> ${escapeHtml(budget)}</p>`,
        `<hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />`,
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        `</div>`,
      ]
        .filter((l): l is string => typeof l === "string")
        .join(""),
    });
    if (error) {
      console.error("[contact] resend error:", error);
    } else {
      emailSent = true;
    }
  }

  // Durable fallback: keep the brief in Vercel Blob until email works.
  const blobToken =
    process.env.BLOB_READ_WRITE_TOKEN ?? process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
  if (!emailSent) {
    if (!blobToken) {
      return NextResponse.json(
        { error: "Email delivery is not configured yet. Use WhatsApp or email for now." },
        { status: 503 }
      );
    }
    const reference = `BRF-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1296)
      .toString(36)
      .toUpperCase()
      .padStart(2, "0")}`;
    try {
      const record = {
        reference,
        submittedAt: new Date().toISOString(),
        name,
        email,
        timeline,
        budget,
        message,
        delivery: { email: apiKey ? "failed" : "no-key", stored: true },
      };
      await put(`briefs/${reference}/brief.json`, JSON.stringify(record, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
      });
      return NextResponse.json({ ok: true, reference, delivered: "stored" });
    } catch (err) {
      console.error("[contact] blob error:", err);
      return NextResponse.json(
        { error: "The message could not be sent right now. Please try email or WhatsApp." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true, delivered: "email" });
}
