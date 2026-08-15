"use client";

import React, { useState, useId } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

/**
 * AuditRequestForm — free digital presence audit request.
 *
 * Follows the same pattern as ContactForm: builds a mailto: link and hands the
 * message to the visitor's own email client. No public API endpoint, so there
 * is no new spam surface and nothing is stored on our server.
 *
 * The one meaningful difference from ContactForm is the website field, which is
 * required. Without a URL there is nothing to audit.
 */

const MAX = { name: 100, email: 200, org: 200, website: 300, notes: 1000 };

export function AuditRequestForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    website: "",
    notes: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    website?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const id = useId();

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.website.trim())
      e.website = "Please enter the website address you want audited.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) {
      setErrors(ve);
      return;
    }

    const subject = `Free audit request: ${form.website.trim()}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.organization ? `Organization: ${form.organization}` : "",
      `Website to audit: ${form.website}`,
      "",
      form.notes ? "What they want us to look at:" : "",
      form.notes,
      "",
      "---",
      "Free digital presence audit request from studio.tangison.com",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:studio@tangison.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="p-8 rounded-[25px] bg-signal-white flex flex-col items-center justify-center text-center min-h-[400px]"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-signal-teal-button">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display font-bold text-ink text-xl mb-2">
          Your audit request is ready.
        </h2>
        <p className="text-base text-ink-muted max-w-sm mb-4">
          Your email client should have opened with the request prefilled. Send
          it and we will reply within two working days. If it did not open,
          email us directly:
        </p>
        <a
          href="mailto:studio@tangison.com"
          className="inline-flex items-center gap-2 text-ink font-medium hover:text-signal-teal-text transition-colors"
        >
          <Mail className="w-4 h-4" /> studio@tangison.com
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-[25px] bg-signal-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-teal transition-shadow min-h-[48px]";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 md:p-8 rounded-[25px] bg-signal-white space-y-5"
      aria-live="polite"
    >
      <div>
        <label
          htmlFor={`${id}-name`}
          className="block text-sm font-medium mb-1.5"
        >
          Name *
        </label>
        <input
          id={`${id}-name`}
          type="text"
          required
          maxLength={MAX.name}
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          aria-invalid={!!errors.name}
          aria-errormessage={errors.name ? `${id}-name-error` : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p
            id={`${id}-name-error`}
            role="alert"
            className="mt-1.5 text-sm text-error"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${id}-email`}
          className="block text-sm font-medium mb-1.5"
        >
          Email *
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          maxLength={MAX.email}
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          aria-invalid={!!errors.email}
          aria-errormessage={errors.email ? `${id}-email-error` : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p
            id={`${id}-email-error`}
            role="alert"
            className="mt-1.5 text-sm text-error"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${id}-org`}
          className="block text-sm font-medium mb-1.5"
        >
          Organization{" "}
          <span className="text-xs text-ink-muted">(optional)</span>
        </label>
        <input
          id={`${id}-org`}
          type="text"
          maxLength={MAX.org}
          value={form.organization}
          onChange={(e) =>
            setForm((p) => ({ ...p, organization: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-website`}
          className="block text-sm font-medium mb-1.5"
        >
          Website address *
        </label>
        <input
          id={`${id}-website`}
          type="text"
          inputMode="url"
          required
          placeholder="yourbusiness.com.na"
          maxLength={MAX.website}
          value={form.website}
          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
          aria-invalid={!!errors.website}
          aria-errormessage={errors.website ? `${id}-website-error` : undefined}
          aria-describedby={`${id}-website-hint`}
          className={inputClass}
        />
        <p id={`${id}-website-hint`} className="mt-1.5 text-xs text-ink-muted">
          No website yet? Enter your Facebook or Instagram page instead and we
          will audit that.
        </p>
        {errors.website && (
          <p
            id={`${id}-website-error`}
            role="alert"
            className="mt-1.5 text-sm text-error"
          >
            {errors.website}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${id}-notes`}
          className="block text-sm font-medium mb-1.5"
        >
          Anything specific you want us to look at?{" "}
          <span className="text-xs text-ink-muted">(optional)</span>
        </label>
        <textarea
          id={`${id}-notes`}
          rows={4}
          maxLength={MAX.notes}
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          className={`${inputClass} resize-y`}
        />
        <div className="mt-1.5 flex justify-end">
          <p className="text-xs text-ink-muted">
            {form.notes.length} / {MAX.notes}
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[25px] bg-atlantic-black text-skeleton-bone font-satoshi font-medium text-sm min-h-[50px] transition-all active:scale-[0.98] hover:bg-deep-ocean w-full"
      >
        Request my free audit
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-ink-muted text-center">
        Your email opens with the request prefilled. Nothing is stored on our
        server, and we do not add you to a mailing list.
      </p>
    </form>
  );
}
