"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";

/**
 * useFocusTrap — traps focus within a container when active.
 * Moves focus to first interactive element on mount.
 * Restores focus to trigger element on deactivate.
 *
 * Usage:
 *   const trapRef = useFocusTrap(isOpen, triggerRef);
 *   <div ref={trapRef}>...</div>
 */

const INTERACTIVE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  active: boolean,
  triggerRef?: RefObject<HTMLElement | null>
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll(INTERACTIVE_SELECTOR)
    ).filter((el) => !el.hasAttribute("aria-hidden")) as HTMLElement[];
  }, []);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // Focus first interactive element
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    const trigger = triggerRef?.current;
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Restore focus to trigger
      if (trigger) {
        trigger.focus();
      }
    };
  }, [active, triggerRef, getFocusableElements]);

  return containerRef;
}
