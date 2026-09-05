import { NextResponse } from "next/server";
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
 */

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "studio@tangison.com";
const FROM =
  process.env.CONTACT_FROM ?? "Studio <briefs@studio.tangison.com>";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_xxxxx")) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Use WhatsApp or email for now." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    timeline && `Timeline: ${timeline}`,
    budget && `Budget range: ${budget}`,
    "",
    message,
  ].filter((l): l is string => typeof l === "string");

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
    return NextResponse.json(
      { error: "The message could not be sent right now. Please try email or WhatsApp." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
