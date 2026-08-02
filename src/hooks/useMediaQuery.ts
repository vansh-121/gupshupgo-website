import { useEffect, useState } from "react";

/**
 * Subscribes to a CSS media query from JS.
 *
 * Exists for the cases where a layout decision cannot be expressed as a
 * Tailwind variant because it changes *behaviour* rather than styling — the
 * clearest example being the phone mockups' 3D tilt, which is only safe to
 * enable where a pointer can actually hover to flatten it again
 * (`ScreenshotMockup`).
 *
 * The initial value is read synchronously in the state initialiser rather than
 * in the effect, so the first paint is already correct and a desktop visitor
 * never sees a flat mockup snap into its tilt one frame later.
 *
 * `fallback` is returned wherever `matchMedia` is unavailable (SSR, older test
 * environments). It defaults to `false`, which makes every caller opt IN to the
 * enhanced behaviour — the same conservative direction as
 * `usePrefersReducedMotion`.
 */
export function useMediaQuery(query: string, fallback = false): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return fallback;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    // Safari < 14 fallback
    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
