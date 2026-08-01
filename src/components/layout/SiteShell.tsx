import type { ReactNode } from "react";

import SkipLink from "@/components/SkipLink";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { cn } from "@/lib/utils";

interface SiteShellProps {
  children: ReactNode;
  /** Extra classes for the `<main>` element (page-level layout tweaks). */
  mainClassName?: string;
}

/**
 * Shared page chrome for every route (design §3.6, Requirement 10.3).
 *
 * Renders, in order:
 *  1. `SkipLink` — first focusable element on the page (Requirement 12.7)
 *  2. `SiteHeader` — owns its own `<header>` `banner` landmark plus the single
 *     `navigation` landmark named "Main" (Requirement 12.9)
 *  3. `<main id="main-content" tabIndex={-1}>` — the skip-link target, made
 *     programmatically focusable so activation moves focus (Requirement 12.7)
 *  4. `SiteFooter` — owns its own `<footer>` `contentinfo` landmark
 *
 * `SiteHeader` and `SiteFooter` render their own landmark elements, so this
 * shell must not wrap them again.
 *
 * `SiteHeader` is the floating Pill_Nav and is `position: fixed`, so it is out
 * of flow and contributes no height here. No spacer is added on purpose, and the
 * clearance holds in both of the pill's states:
 *
 * The logo icon is a fixed 28px in both states, so only the padding moves:
 *
 *  - at rest (`p-8px`): 28px logo + 2×8px padding = 44px… the 44px minimum
 *    touch targets set the real height, so 44 + 2×8 = **60px**, inset 12px below
 *    Breakpoint_Small (72px total) and 16px above it (76px total);
 *  - condensed (`p-6px`): 28 + 2×6 = 40px… again the 44px minimum control
 *    height wins, so 44 + 2×6 = **56px**, i.e. 68px / 72px total.
 *
 * Every page's first block already clears the larger figure — the hero at
 * `py-72px bp810:py-164px` and the legal/404 pages at `py-section` (80px) — and
 * condensing only makes the pill shorter, so clearance improves rather than
 * degrades. A spacer would also sit between `<main>` and its first child and
 * blunt the skip-link landing.
 *
 * The condense sentinel is the first thing inside `<main>`: a zero-height,
 * absolutely positioned, `aria-hidden` element the header observes to tell "at
 * the top" from "scrolled past the hero" without a scroll handler. Being out of
 * flow it contributes no height and cannot shift the hero, and because
 * `<main>` itself is still the skip-link target with the same id and tabindex,
 * the skip-link contract is untouched.
 */
export default function SiteShell({ children, mainClassName }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-layer-0 text-ink-high">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className={cn("flex-1 focus:outline-none", mainClassName)}>
        <div
          aria-hidden="true"
          data-nav-sentinel=""
          className="pointer-events-none absolute left-0 top-0 h-0 w-full"
        />
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
