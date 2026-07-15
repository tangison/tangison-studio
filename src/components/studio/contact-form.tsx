"use client";

import React, { useState, useId } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

/**
 * ContactForm — redirects to email (mailto:) with prefilled subject and body.
 * This avoids spam by not exposing a public API endpoint.
 * The form builds a mailto: link with the user's input and opens their email client.
 */

const MAX = { name: 100, email: 200, org: 200, message: 2000 };

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const id = useId();

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Please tell us what you are working on.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }

    // Build a mailto: link with prefilled subject and body
    const subject = `New project enquiry from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.organization ? `Organization: ${form.organization}` : "",
      "",
      "Message:",
      form.message,
      "",
      "---",
      "Sent from studio.tangison.com",
    ].filter(Boolean).join("\n");

    const mailtoLink = `mailto:studio@tangison.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's email client with prefilled content
    window.location.href = mailtoLink;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="p-8 rounded-full bg-signal-white flex flex-col items-center justify-center text-center min-h-[400px]" role="status" aria-live="polite">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-signal-teal-button">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display font-bold text-ink text-xl mb-2">Your email is ready.</h2>
        <p className="text-base text-ink-muted max-w-sm mb-4">
          Your email client should have opened with your message prefilled. If it didn't, email us directly:
        </p>
        <a href="mailto:studio@tangison.com" className="inline-flex items-center gap-2 text-ink font-medium hover:text-signal-teal-text transition-colors">
          <Mail className="w-4 h-4" /> studio@tangison.com
        </a>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-full bg-signal-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-teal transition-shadow min-h-[48px]";

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 md:p-8 rounded-full bg-signal-white space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="block text-sm font-medium mb-1.5">Name *</label>
        <input id={`${id}-name`} type="text" required maxLength={MAX.name} value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} aria-invalid={!!errors.name} className={inputClass} />
        {errors.name && <p role="alert" className="mt-1.5 text-sm text-error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="block text-sm font-medium mb-1.5">Email *</label>
        <input id={`${id}-email`} type="email" required maxLength={MAX.email} value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} aria-invalid={!!errors.email} className={inputClass} />
        {errors.email && <p role="alert" className="mt-1.5 text-sm text-error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-org`} className="block text-sm font-medium mb-1.5">Organization <span className="text-xs text-ink-muted">(optional)</span></label>
        <input id={`${id}-org`} type="text" maxLength={MAX.org} value={form.organization} onChange={(e) => setForm(p => ({ ...p, organization: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${id}-msg`} className="block text-sm font-medium mb-1.5">What are you working on? *</label>
        <textarea id={`${id}-msg`} required rows={5} maxLength={MAX.message} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} aria-invalid={!!errors.message} className={`${inputClass} resize-y`} />
        <div className="mt-1.5 flex justify-between">
          {errors.message ? <p role="alert" className="text-sm text-error">{errors.message}</p> : <span />}
          <p className="text-xs text-ink-muted">{form.message.length} / {MAX.message}</p>
        </div>
      </div>
      <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-atlantic-black text-skeleton-bone font-satoshi font-medium text-sm min-h-[50px] transition-all active:scale-[0.98] hover:bg-deep-ocean w-full">
        Open my email client
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-ink-muted text-center">
        Your email opens with your message prefilled. Nothing is stored on our server.
      </p>
    </form>
  );
}
