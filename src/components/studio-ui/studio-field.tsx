"use client";

import React from "react";

/**
 * StudioField — accessible form field wrapping Astryx Field semantics.
 * Studio owns the visual identity; Astryx owns accessible labeling.
 */

interface StudioFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

export function StudioField({ label, required, optional, error, hint, children, htmlFor }: StudioFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium mb-1.5 text-ink">
        {label}
        {required && <span className="text-signal-teal-text ml-1">*</span>}
        {optional && <span className="text-xs text-ink-muted ml-1">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * StudioTextInput — accessible text input with Studio styling.
 */
export function StudioTextInput({
  id,
  value,
  onChange,
  placeholder,
  maxLength,
  required,
  type = "text",
  autoComplete,
  ariaInvalid,
  ariaDescribedBy,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      required={required}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className="w-full px-4 py-3 rounded-[25px] border border-card-border bg-signal-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-teal focus:border-transparent transition-shadow min-h-[48px]"
    />
  );
}

/**
 * StudioTextArea — accessible textarea with Studio styling.
 */
export function StudioTextArea({
  id,
  value,
  onChange,
  placeholder,
  maxLength,
  required,
  rows = 5,
  ariaInvalid,
  ariaDescribedBy,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  rows?: number;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}) {
  return (
    <textarea
      id={id}
      required={required}
      maxLength={maxLength}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className="w-full px-4 py-3 rounded-[25px] border border-card-border bg-signal-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-teal focus:border-transparent transition-shadow resize-y min-h-[48px]"
    />
  );
}
