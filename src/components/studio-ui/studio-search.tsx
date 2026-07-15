"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchItem {
  label: string;
  href: string;
  category: string;
  description?: string;
}

interface StudioSearchProps {
  isOpen: boolean;
  onClose: () => void;
  items: SearchItem[];
}

export function StudioSearch({ isOpen, onClose, items }: StudioSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
    : items;

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const flatResults = Object.values(grouped).flat();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatResults[selectedIndex]) {
        window.location.href = flatResults[selectedIndex].href;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex]);

  if (!isOpen) return null;

  let runningIndex = 0;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] px-4" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-atlantic-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-skeleton-bone rounded-3xl border border-card-border shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-card-border">
          <Search className="w-5 h-5 text-ink-muted shrink-0" />
          <input ref={inputRef} type="text" value={query} onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }} placeholder="Search work, capabilities, pages..." className="flex-1 bg-transparent font-satoshi text-lg text-ink placeholder:text-ink-muted/50 focus:outline-none" aria-label="Search" />
          <kbd className="font-jetbrains text-[9px] text-ink-muted border border-card-border px-2 py-1 rounded">ESC</kbd>
        </div>
        <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto p-2">
          {flatResults.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            Object.entries(grouped).map(([category, categoryItems]) => (
              <div key={category} className="mb-2">
                <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em] px-4 py-2">{category}</p>
                {categoryItems.map((item) => {
                  const idx = runningIndex++;
                  const isSelected = idx === selectedIndex;
                  return (
                    <Link key={item.href} href={item.href} onClick={onClose} className={`flex items-center justify-between px-4 py-3 rounded-full transition-colors ${isSelected ? "bg-ocean-mist" : "hover:bg-ocean-mist/50"}`}>
                      <div>
                        <p className="font-satoshi text-sm font-medium text-ink">{item.label}</p>
                        {item.description && <p className="font-satoshi text-xs text-ink-muted">{item.description}</p>}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
