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
 * If the target section is not in the document the handler does nothing and
 * lets the click fall through to the native anchor behaviour.
 */
export function useSectionNavigation() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useCallback(
    (sectionId: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
      // Let modified clicks (new tab/window) behave natively.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }

      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      target.focus({ preventScroll: true });

      if (typeof window !== "undefined" && window.history?.replaceState) {
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    },
    [prefersReducedMotion],
  );
}

export default useSectionNavigation;
