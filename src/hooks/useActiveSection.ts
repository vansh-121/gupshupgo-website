import { useEffect, useState } from "react";

import type { SectionId } from "@/data/sections";

/**
 * Which Landing_Section the floating Pill_Nav should mark as current, answered
 * by `IntersectionObserver` rather than by a scroll handler.
 *
 * There is deliberately NO `scroll` listener in this file. "Which section is
 * under the viewport centre?" is a boundary-crossing question, which is exactly
 * what `IntersectionObserver` answers off the main thread; a scroll handler
 * would have to measure layout on every frame.
 */

/**
 * Root margin for the active-section observer: a band across the middle of the
 * viewport, matching the Sticky_Step_Section pattern in `MeshChatSection`. A
 * section becomes active as it crosses the centre line, so exactly one section
 * is active at a time in normal reading flow.
 */
export const NAV_ACTIVE_SECTION_ROOT_MARGIN = "-45% 0px -45% 0px";

function hasObserver(): boolean {
  return (
    typeof window !== "undefined" && typeof window.IntersectionObserver === "function"
  );
}

/**
 * The id of the Landing_Section currently crossing the viewport centre, or
 * `null` before any section has (the hero occupies the centre at the top of the
 * page and is not in `ids`). `null` is also what a caller gets when
 * `IntersectionObserver` is unavailable or when none of `ids` is in the DOM —
 * an absent section is skipped, never thrown on.
 *
 * Sections below the hero are lazily mounted, so a `MutationObserver` re-runs
 * the lookup as they appear — the same `requestAnimationFrame`-debounced
 * reconnect strategy `useNavForeground` uses for its band observer. Every
 * observer is disconnected and every pending frame cancelled on unmount.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  // `ids` is a module-level constant at the call site; joined so the effect
  // does not re-run on every render if a caller passes a fresh array.
  const key = ids.join(",");

  useEffect(() => {
    if (!hasObserver()) return;

    const wanted = key ? (key.split(",") as SectionId[]) : [];
    if (wanted.length === 0) return;

    let observer: IntersectionObserver | null = null;
    let observed = 0;
    let frame = 0;

    const connect = () => {
      const nodes = wanted
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => node !== null);
      if (nodes.length === observed) return;

      observer?.disconnect();
      observed = nodes.length;

      observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setActiveId(entry.target.id as SectionId);
          });
        },
        { rootMargin: NAV_ACTIVE_SECTION_ROOT_MARGIN, threshold: 0 },
      );

      nodes.forEach((node) => observer?.observe(node));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        connect();
      });
    };

    connect();

    const mutation =
      typeof MutationObserver === "undefined" ? null : new MutationObserver(schedule);
    mutation?.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      mutation?.disconnect();
      observer?.disconnect();
    };
  }, [key]);

  return activeId;
}

export default useActiveSection;
