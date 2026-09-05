"use client";

import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";

/**
 * Project-brief form → POST /api/contact → Resend → studio@tangison.com.
 * Falls back gracefully: server returns a readable error when the API key
 * is not configured yet, and the page keeps the mailto/WhatsApp routes.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

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
      {/* honeypot — hidden from humans, irresistible to bots */}
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
            className={inputClass}
            placeholder="N$ 20–40k"
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
          className={inputClass + " py-3.5 min-h-[150px] resize-y"}
          placeholder="The organization or product, the outcome you want, and anything you already have: brand material, a brief, links."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-[14px] border border-line bg-teal-mist px-4 py-3 text-sm text-ink">
          {error}
        </p>
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
