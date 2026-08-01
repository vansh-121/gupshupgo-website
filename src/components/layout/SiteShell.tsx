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
 * of flow and contributes no height here. No spacer is added on purpose: the
 * pill is 60px tall inset 12px (72px total) below Breakpoint_Small and 76px
 * total above it, while every page's first block already clears that — the hero
 * at `py-72px bp810:py-164px` and the legal/404 pages at `py-section` (80px).
 * A spacer would also sit between `<main>` and its first child and blunt the
 * skip-link landing.
 */
export default function SiteShell({ children, mainClassName }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-layer-0 text-ink-high">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className={cn("flex-1 focus:outline-none", mainClassName)}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
