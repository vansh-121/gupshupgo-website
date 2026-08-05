import { useCallback } from "react";
import type { MouseEvent } from "react";

import type { SectionId } from "@/data/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Shared in-page navigation behaviour for header nav links (design §6.2).
 *
 * Sequence, per Requirement 3.6:
 *  1. `preventDefault()` so the browser's default hash jump does not fight us
 *  2. `scrollIntoView` — `smooth` normally, `auto` when the visitor prefers
 *     reduced motion (Requirement 12.6)
 *  3. `focus({ preventScroll: true })` on the `tabIndex={-1}` section so the
 *     section's accessible name is announced and Tab continues inside it
 *  4. `history.replaceState` so the hash stays shareable without pushing a
 *     new history entry per nav click
 *
 * If the target section is not in the document yet (lazy chunk still loading),
 * the handler writes the hash immediately and installs a MutationObserver on
 * the app root that retries scroll+focus once the element appears. The observer
 * disconnects after the first hit or after 5 seconds to prevent leaking.
 */

function scrollToSection(target: HTMLElement, smooth: boolean) {
  target.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
  });
  target.focus({ preventScroll: true });
}

export function useSectionNavigation() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useCallback(
    (sectionId: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
      // Let modified clicks (new tab/window) behave natively.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }

      event.preventDefault();

      // Update the hash immediately so the URL is shareable whether or not
      // the target has mounted yet.
      if (typeof window !== "undefined" && window.history?.replaceState) {
        window.history.replaceState(null, "", `#${sectionId}`);
      }

      const target = document.getElementById(sectionId);
      if (target) {
        scrollToSection(target, !prefersReducedMotion);
        return;
      }

      // Target is not yet in the DOM (lazy chunk still loading behind Suspense).
      // Observe the app root for the element appearing and retry once it does.
      const root = document.getElementById("root") ?? document.body;
      const observer = new MutationObserver(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          observer.disconnect();
          scrollToSection(el, !prefersReducedMotion);
        }
      });

      observer.observe(root, { childList: true, subtree: true });

      // Safety valve: disconnect after 5s even if the element never appears
      // (e.g. network error prevented the chunk from loading).
      setTimeout(() => observer.disconnect(), 5_000);
    },
    [prefersReducedMotion],
  );
}

export default useSectionNavigation;
