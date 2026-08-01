import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Reveal_Observer for the Appear_Animation (Requirements 14.1, 14.3, 14.7, 15.1).
 *
 * The visual half of the system lives in the motion section of `src/index.css`:
 * `.reveal` holds the initial state (`opacity: 0.001`, `translateY(10px)`) and
 * `.reveal-in` is the revealed state. This hook only decides *when* to add
 * `.reveal-in`; it never sets inline opacity, so the CSS
 * `@media (prefers-reduced-motion: reduce)` override can neutralise the whole
 * system on its own even before this hook has run (Requirement 15.1).
 *
 * Correctness rules that matter more than the animation itself:
 *
 * 1. The below-hero sections mount inside a `React.lazy` + `Suspense` boundary,
 *    often mid-scroll and often ALREADY inside — or already scrolled past — the
 *    viewport. An `IntersectionObserver` attached on mount does deliver an
 *    initial record for a target that is currently intersecting, but it reports
 *    `isIntersecting: false` for a target that sits ABOVE the viewport, which
 *    would leave that content invisible for the rest of the session. So before
 *    observing we measure the element: if it is laid out and its top edge is at
 *    or above the bottom of the viewport, it reveals synchronously and no
 *    observer is ever created.
 * 2. If `IntersectionObserver` is missing, the element reveals immediately.
 * 3. Under `prefers-reduced-motion: reduce` the observer is not created at all
 *    and the element starts revealed (Requirement 15.4).
 * 4. Once revealed, an element stays revealed: the observer is unobserved and
 *    disconnected on the first trigger (Requirement 14.7).
 *
 * A zero-sized rect (no layout box yet) is deliberately NOT treated as "already
 * in view" — such an element paints nothing anyway, and the observer will pick
 * it up once it has a box.
 */
export interface UseRevealOptions {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
  /** Observer root margin, e.g. `"0px 0px -10% 0px"` to trigger slightly late. */
  rootMargin?: string;
  /**
   * Set to `false` when something else owns the reveal decision — a
   * `RevealGroup` parent, for instance. No observer is created and `revealed`
   * stays `false`, so the caller must supply its own value.
   */
  enabled?: boolean;
}

export interface UseRevealResult<T extends Element> {
  ref: (node: T | null) => void;
  revealed: boolean;
}

/** True when the element has a layout box and is not still below the fold. */
function isAtOrAboveFold(el: Element): boolean {
  if (typeof window === "undefined" || typeof el.getBoundingClientRect !== "function") {
    return false;
  }
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  return rect.top < viewportHeight;
}

export function useReveal<T extends Element = HTMLElement>(
  options: UseRevealOptions = {},
): UseRevealResult<T> {
  const { threshold = 0.1, rootMargin = "0px", enabled = true } = options;
  const prefersReducedMotion = usePrefersReducedMotion();

  const [revealed, setRevealed] = useState(false);
  const nodeRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // Survives re-renders so a revealed element is never re-gated (Req 14.7).
  const revealedRef = useRef(false);

  // Render-time mirrors, so the ref callback below can stay referentially
  // stable. A ref callback that changes identity between renders is detached
  // and re-attached by React on every render; if it also set state we would
  // re-render on every attach, which is an infinite loop.
  const settingsRef = useRef({ threshold, rootMargin, enabled, prefersReducedMotion });
  settingsRef.current = { threshold, rootMargin, enabled, prefersReducedMotion };

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
  }, []);

  const teardown = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  const ref = useCallback(
    (node: T | null) => {
      if (node === nodeRef.current) return;

      teardown();
      nodeRef.current = node;
      if (!node) return;

      const { threshold: ratio, rootMargin: margin, enabled: on, prefersReducedMotion: reduce } =
        settingsRef.current;

      if (!on) return;
      // Already revealed: never observe again (Req 14.7).
      if (revealedRef.current) return;

      // Reduced motion: nothing is ever gated on scrolling (Req 15.1, 15.4).
      if (reduce) {
        reveal();
        return;
      }

      // Already inside, or already scrolled past, the viewport at mount time.
      if (isAtOrAboveFold(node)) {
        reveal();
        return;
      }

      const ObserverCtor = typeof window !== "undefined" ? window.IntersectionObserver : undefined;
      if (typeof ObserverCtor !== "function") {
        reveal();
        return;
      }

      const observer = new ObserverCtor(
        (entries) => {
          const hit = entries.some(
            (entry) => entry.isIntersecting || entry.intersectionRatio > 0,
          );
          if (!hit) return;
          observer.unobserve(node);
          observer.disconnect();
          observerRef.current = null;
          reveal();
        },
        { threshold: ratio, rootMargin: margin },
      );

      observerRef.current = observer;
      observer.observe(node);
    },
    [reveal, teardown],
  );

  // The preference can flip mid-session; when it turns to `reduce`, drop the
  // gate immediately rather than waiting for a scroll.
  useEffect(() => {
    if (!enabled || !prefersReducedMotion) return;
    teardown();
    reveal();
  }, [enabled, prefersReducedMotion, reveal, teardown]);

  useEffect(() => teardown, [teardown]);

  return { ref, revealed: revealed || prefersReducedMotion };
}

export default useReveal;
