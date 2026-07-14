"use client";

import React, { useState, useId } from "react";

import { ArrowRight, Check } from "lucide-react";

const MAX = { name: 100, email: 200, org: 200, message: 2000 };

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const id = useId();

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    else if (form.name.length > MAX.name) e.name = `Name must be under ${MAX.name} characters.`;
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Please tell us what you are working on.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || "Something went wrong."); }
      setStatus("success");
      setForm({ name: "", email: "", organization: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 rounded-[24px] border border-card-border bg-signal-white flex flex-col items-center justify-center text-center min-h-[400px]" role="status" aria-live="polite">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-signal-teal-button"><Check className="w-6 h-6 text-white" /></div>
        <h2 className="font-display font-bold text-ink text-xl mb-2">Thank you.</h2>
        <p className="text-base text-ink-muted max-w-sm">Your message has been received. We will reply within two working days.</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-[12px] border border-card-border bg-signal-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-teal focus:border-transparent transition-shadow min-h-[48px]";

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 md:p-8 rounded-[24px] border border-card-border bg-signal-white space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="block text-sm font-medium mb-1.5">Name *</label>
        <input id={`${id}-name`} type="text" required maxLength={MAX.name} value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} className={inputClass} />
        {errors.name && <p id={`${id}-name-err`} role="alert" className="mt-1.5 text-sm text-error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="block text-sm font-medium mb-1.5">Email *</label>
        <input id={`${id}-email`} type="email" required maxLength={MAX.email} value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} className={inputClass} />
        {errors.email && <p id={`${id}-email-err`} role="alert" className="mt-1.5 text-sm text-error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-org`} className="block text-sm font-medium mb-1.5">Organization <span className="text-xs text-ink-muted">(optional)</span></label>
        <input id={`${id}-org`} type="text" maxLength={MAX.org} value={form.organization} onChange={(e) => setForm(p => ({ ...p, organization: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${id}-msg`} className="block text-sm font-medium mb-1.5">What are you working on? *</label>
        <textarea id={`${id}-msg`} required rows={5} maxLength={MAX.message} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-msg-err` : `${id}-msg-count`} className={`${inputClass} resize-y`} />
        <div className="mt-1.5 flex justify-between">
          {errors.message ? <p id={`${id}-msg-err`} role="alert" className="text-sm text-error">{errors.message}</p> : <span />}
          <p id={`${id}-msg-count`} className="text-xs text-ink-muted">{form.message.length} / {MAX.message}</p>
        </div>
      </div>
      {status === "error" && <div role="alert" className="p-3.5 rounded-[12px] bg-error/10 border border-error/30 text-sm text-error">{errorMsg}</div>}
      <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-atlantic-black text-skeleton-bone font-satoshi font-medium text-sm min-h-[48px] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed hover:bg-deep-ocean">
        {status === "submitting" ? "Sending..." : "Send message"}
        {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}
