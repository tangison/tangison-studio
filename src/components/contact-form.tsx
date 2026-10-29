"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";

/**
 * Project-brief form → POST /api/contact → Resend → studio@tangison.com.
 * Falls back gracefully: server returns a readable error when the API key
 * is not configured yet, and the page keeps the mailto/WhatsApp routes.
 *
 * Spam protection (mirrors the Technologies site, owner-approved 2026-09):
 * a honeypot plus one arithmetic human check. Every generated sequence
 * evaluates to 47, and the server re-checks that single invariant.
 */

type MathQuestion = { text: string; answer: 47 };

function makeMathQuestion(): MathQuestion {
  if (Math.random() < 0.5) {
    const a = 2 + Math.floor(Math.random() * 9);
    const bMax = Math.max(2, Math.floor(46 / a));
    const b = 2 + Math.floor(Math.random() * Math.max(1, bMax - 1));
    const c = 47 - a * b;
    if (c > 0) return { text: `${a} × ${b} + ${c}`, answer: 47 };
  }
  const a = 5 + Math.floor(Math.random() * 15);
  const b = 5 + Math.floor(Math.random() * 15);
  const c = 47 - a - b;
  if (c > 0) return { text: `${a} + ${b} + ${c}`, answer: 47 };
  return { text: "20 + 27", answer: 47 };
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  // The question is generated after mount only: a Math.random() question
  // rendered during SSR would never match the client's own render and React
  // would raise a hydration text mismatch (error #418).
  const [math, setMath] = useState<MathQuestion | null>(null);
  useEffect(() => setMath(makeMathQuestion()), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    if (Number(String(payload.mathAnswer ?? "").trim()) !== (math?.answer ?? NaN)) {
      setStatus("error");
      setError("The human check did not add up. Try the sum once more.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("No connection. Check your network and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[20px] bg-teal-mist p-6 md:p-8">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper-raise text-teal"
        >
          <Check className="w-5 h-5" />
        </span>
        <div>
          <h3 className="font-display font-bold text-xl tracking-[-0.01em]">
            Brief received.
          </h3>
          <p className="mt-2 text-ink-muted leading-relaxed">
            Thank you. We reply to every serious enquiry within two working
            days, usually sooner.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium link-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-[14px] border border-line bg-paper-raise px-4 min-h-[52px] text-[15px] " +
    "text-ink placeholder:text-ink-faint focus:outline-none focus:border-teal " +
    "focus:ring-2 focus:ring-teal/25 transition-colors";
  const labelClass = "block eyebrow mb-2.5";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="flex flex-col gap-5">
      {/* honeypot: hidden from humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            enterKeyHint="next"
            className={inputClass}
            placeholder="Tomas Nakale"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            enterKeyHint="next"
            className={inputClass}
            placeholder="tomas@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Timeline <span className="normal-case text-ink-faint">(optional)</span>
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            maxLength={80}
            enterKeyHint="next"
            className={inputClass}
            placeholder="Next 3 months"
          />
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range <span className="normal-case text-ink-faint">(optional)</span>
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            maxLength={80}
            enterKeyHint="next"
            className={inputClass}
            placeholder="N$ 20-40k"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What are you working on?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          enterKeyHint="enter"
          className={inputClass + " py-3.5 min-h-[150px] resize-y"}
          placeholder="The organization or product, the outcome you want, and anything you already have: brand material, a brief, links."
        />
      </div>

      {math && (
        <div>
          <label htmlFor="math" className={labelClass}>
            Human check: what does {math.text} equal?
          </label>
          <input
            id="math"
            name="mathAnswer"
            type="text"
            required
            inputMode="numeric"
            autoComplete="off"
            enterKeyHint="done"
            maxLength={6}
            className={inputClass}
            placeholder="47"
          />
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="form-error flex items-start gap-3 rounded-[14px] px-4 py-3 text-sm"
        >
          <CircleAlert
            aria-hidden="true"
            className="form-error-icon mt-0.5 h-4 w-4 shrink-0"
          />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              Sending
              <LoaderCircle aria-hidden="true" className="w-4 h-4 animate-spin" />
            </>
          ) : (
            "Send the brief"
          )}
        </button>
        <p className="text-sm text-ink-faint">
          Delivered straight to the studio inbox.
        </p>
      </div>
    </form>
  );
}
