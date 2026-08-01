import { useEffect, useState } from "react";

import type { SectionId } from "@/data/sections";

/**
 * Scroll-derived state for the floating Pill_Nav, both answers supplied by
 * `IntersectionObserver` rather than by a scroll handler.
 *
 * There is deliberately NO `scroll` listener anywhere in this file. Both
 * questions the pill asks — "am I still near the top of the page?" and "which
 * Landing_Section is under the viewport centre?" — are boundary-crossing
 * questions, which is exactly what `IntersectionObserver` answers off the main
 * thread. A scroll handler would have to measure layout on every frame.
 */

/** Attribute `SiteShell` puts on the condense sentinel. */
export const NAV_SENTINEL_ATTRIBUTE = "data-nav-sentinel";

/** Scroll distance at which the pill flips to its condensed state, in CSS px. */
export const NAV_CONDENSE_THRESHOLD_PX = 120;

/**
 * Root margin for the condense observer — this is the hysteresis mechanism.
 *
 * The sentinel is a zero-height element pinned to the top of the document, so
 * on its own it would leave the observation root after a single pixel of scroll
 * and the state could flip on sub-pixel jitter. The positive top margin grows
 * the root *upward* by {@link NAV_CONDENSE_THRESHOLD_PX}, so the sentinel still
 * counts as intersecting until the visitor has scrolled a full 120px, and the
 * pill condenses from there. Anyone parking their scroll near the top is well
 * clear of the boundary, and the boundary itself is one fixed line rather than
 * a range that can be re-crossed by a pixel of overscroll bounce.
 *
 * Expressed in px rather than as a viewport percentage on purpose: the trigger
 * point should be "the visitor has committed to scrolling", which is a constant
 * distance, not something that moves with the window height.
 */
export const NAV_CONDENSE_ROOT_MARGIN = `${NAV_CONDENSE_THRESHOLD_PX}px 0px 0px 0px`;

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
 * True once the page has scrolled past the hero fold, so the pill should sit in
 * its condensed state (tighter padding, denser surface).
 *
 * Starts `false` — the resting, airy state — which is also the value used when
 * `IntersectionObserver` is unavailable, so the pill simply never condenses
 * rather than getting stuck condensed.
 */
export function useNavCondensed(): boolean {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    if (!hasObserver()) return;

    const sentinel = document.querySelector<HTMLElement>(`[${NAV_SENTINEL_ATTRIBUTE}]`);
    if (!sentinel) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        setCondensed(!entry.isIntersecting);
      },
      { rootMargin: NAV_CONDENSE_ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return condensed;
}

/**
 * The id of the Landing_Section currently crossing the viewport centre, or
 * `null` before any section has (the hero occupies the centre at the top of the
 * page and is not in `ids`).
 *
 * Sections below the hero are lazily mounted, so a `MutationObserver` re-runs
 * the lookup as they appear — the same reconnect strategy `useNavForeground`
 * uses for its band observer.
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
