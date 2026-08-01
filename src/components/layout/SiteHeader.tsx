import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, RefObject } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ChevronDown, Menu, X } from "lucide-react";

import { NAV_SECTIONS } from "@/data/sections";
import type { SectionId, SectionMeta } from "@/data/sections";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import DownloadButton from "@/components/DownloadButton";
import { cn } from "@/lib/utils";

const MOBILE_PANEL_ID = "site-header-mobile-nav";
const OVERFLOW_PANEL_ID = "site-header-more-nav";

/**
 * The links the desktop pill carries directly (Req 8.5).
 *
 * Nova's pill nav holds a handful of links; the registry holds ten. Rather than
 * dropping six sections from navigation, the pill shows these five and the
 * remaining five live behind the "More sections" disclosure next to them, so
 * every section that has a heading is still reachable from the desktop pill in
 * at most two interactions — and all ten stay in one flat list in the
 * below-810px menu. The subset is derived from `NAV_SECTIONS`, never hand
 * listed, so a new section can never be silently lost: anything not named here
 * lands in the overflow panel automatically.
 */
const DESKTOP_PRIMARY_IDS: readonly SectionId[] = ["features", "mesh", "calling", "privacy", "pro"];

/**
 * Pill_Nav foreground variants (Req 8.3).
 *
 * `on-light` is the dark-label variant for a near-white band, `on-dark` the
 * light-label variant for a near-black band.
 */
type NavForeground = "on-light" | "on-dark";

const FOREGROUND_CLASSES: Record<NavForeground, string> = {
  // `ink-high` resolves to #1E293B in Light_Theme: >=12:1 on every light band.
  "on-light": "text-ink-high",
  // Plain white: >=17:1 on every dark band.
  "on-dark": "text-white",
};

/** Hover/focus wash for the controls inside the pill, per variant. */
const HOVER_CLASSES: Record<NavForeground, string> = {
  "on-light": "hover:bg-black/[0.06] focus-visible:bg-black/[0.06]",
  "on-dark": "hover:bg-white/[0.12] focus-visible:bg-white/[0.12]",
};

/**
 * Band → foreground variant (Req 8.4).
 *
 * The table is intentionally exhaustive and intentionally uniform per theme:
 * in Light_Theme all five Surface_Bands are near-white and in Dark_Theme all
 * five are near-black (see the `data-band` note in `Section.tsx`), so today
 * every band in a theme resolves to the same variant and the band lookup always
 * agrees with the resolved theme. It is written as a table anyway so the one
 * future case the docs call out — a section rendering a deliberately inverted
 * panel — has somewhere to land: such a section sets
 * `data-nav-foreground="on-dark" | "on-light"` on the element carrying
 * `data-band`, which wins over this table.
 */
const BAND_FOREGROUND: Record<"light" | "dark", Record<string, NavForeground>> = {
  light: { "0": "on-light", "1": "on-light", "2": "on-light", "3": "on-light", tint: "on-light" },
  dark: { "0": "on-dark", "1": "on-dark", "2": "on-dark", "3": "on-dark", tint: "on-dark" },
};

/**
 * The pill's own surface: the base layer token at 72% alpha so the
 * `backdrop-filter` blur is actually visible (Req 8.1, 5.5). Applied inline
 * rather than as a utility because Tailwind's `/opacity` modifier cannot add
 * alpha to a bare `var()` colour, and because an inline value the browser
 * cannot parse is dropped, leaving the opaque `bg-layer-0` class as the
 * fallback. No new colour is introduced — the hue is whatever `--layer-0`
 * resolves to in the active theme.
 */
const PILL_BACKGROUND = "color-mix(in srgb, var(--layer-0) 72%, transparent)";

function readForegroundOverride(value: string | undefined): NavForeground | null {
  return value === "on-dark" || value === "on-light" ? value : null;
}

/**
 * Resolves the Pill_Nav foreground variant (Req 8.3, 8.4).
 *
 * Primary signal is next-themes' `resolvedTheme`. The defensive signal is the
 * `data-band` of the section currently under the pill, found with a single
 * `IntersectionObserver` whose root is collapsed to a 1px strip at the pill's
 * vertical centre — so the "which section am I over" question is answered by
 * the browser when a boundary crosses that line, never by layout work on a
 * scroll frame.
 */
function useNavForeground(navRef: RefObject<HTMLElement>): NavForeground {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const [band, setBand] = useState<string | null>(null);
  const [bandOverride, setBandOverride] = useState<NavForeground | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const connect = () => {
      const nav = navRef.current;
      const viewport = window.innerHeight;
      if (!nav || !viewport) return;

      observer?.disconnect();

      const rect = nav.getBoundingClientRect();
      const probe = rect.top + rect.height / 2;

      observer = new IntersectionObserver(
        (entries) => {
          const hit = entries.find((entry) => entry.isIntersecting);
          if (!hit) return;
          const target = hit.target as HTMLElement;
          setBand(target.dataset.band ?? null);
          setBandOverride(readForegroundOverride(target.dataset.navForeground));
        },
        {
          // Collapse the root to the 1px line the pill sits on.
          rootMargin: `${-probe}px 0px ${-Math.max(viewport - probe - 1, 0)}px 0px`,
          threshold: 0,
        },
      );

      document
        .querySelectorAll<HTMLElement>("[data-band]")
        .forEach((element) => observer?.observe(element));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        connect();
      });
    };

    connect();
    window.addEventListener("resize", schedule);

    // The sections below the hero are lazy; re-observe as they mount.
    const mutation =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(schedule);
    mutation?.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      mutation?.disconnect();
      observer?.disconnect();
    };
  }, [navRef]);

  return useMemo(() => {
    if (bandOverride) return bandOverride;
    if (band && BAND_FOREGROUND[theme][band]) return BAND_FOREGROUND[theme][band];
    return theme === "dark" ? "on-dark" : "on-light";
  }, [band, bandOverride, theme]);
}

interface Disclosure {
  isOpen: boolean;
  open: () => void;
  /** `restoreFocus` false when focus has already moved somewhere deliberate. */
  close: (restoreFocus?: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
  panelRef: RefObject<HTMLDivElement>;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Disclosure behaviour shared by the below-810px menu and the desktop "More
 * sections" popover (Req 8.6, 8.8): opening focuses the first link, Tab is
 * contained inside the panel, Escape closes and restores focus to the trigger.
 */
function useDisclosure(): Disclosure {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  // Move focus into the revealed panel.
  useEffect(() => {
    if (!isOpen) return;
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a[href^='#']");
    firstLink?.focus();
  }, [isOpen]);

  // A pointer press outside dismisses without stealing focus back.
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: globalThis.MouseEvent) => {
      const node = event.target as Node | null;
      if (!node) return;
      if (panelRef.current?.contains(node) || triggerRef.current?.contains(node)) return;
      setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Contain Tab within the panel.
      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [close],
  );

  return {
    isOpen,
    open: useCallback(() => setIsOpen(true), []),
    close,
    triggerRef,
    panelRef,
    onKeyDown,
  };
}

const NAV_LINK_BASE =
  "inline-flex min-h-[44px] items-center rounded-pill px-12px text-14 font-medium leading-100 " +
  "transition-standard motion-reduce:transition-none";

const ICON_BUTTON_BASE =
  "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-pill " +
  "transition-standard motion-reduce:transition-none";

const PANEL_BASE =
  "absolute z-10 rounded-8 bg-layer-0 p-8px shadow-hairline-12-elevated";

/**
 * Floating blurred pill navigation (Req 8).
 *
 * - `banner` landmark with a single `navigation` landmark named "Main"
 * - fixed in the viewport, centred, inset from the top (Req 8.2); 80px pill
 *   radius, inset Hairline + Standard_Elevation composed in one `box-shadow`
 *   via `shadow-hairline-12-elevated` (Req 4.5, 8.1), and a 12px
 *   `backdrop-filter` blur, which the pill nav is one of only two places
 *   permitted to use (Req 5.5)
 * - foreground inverts between a light and a dark variant (Req 8.3, 8.4); see
 *   `useNavForeground`
 * - in-page links derive from `NAV_SECTIONS`, so the registry stays the only
 *   source of nav truth; activation runs `useSectionNavigation()` — scroll,
 *   then move focus into the section (Req 8.7)
 * - below 810px the links collapse into a disclosure with `aria-expanded` /
 *   `aria-controls`, a 44x44 trigger, focus-first-link on open, Tab
 *   containment, and Escape restoring focus to the trigger (Req 8.6)
 * - every control is a native `<button>` / `<a>` at 44x44 CSS px or larger and
 *   inherits the global `:focus-visible` outline (Req 8.8)
 *
 * The pill is 60px tall and inset 12px below 810px, so it clears the hero's
 * 72px top padding exactly and no shell spacer is needed — `main#main-content`
 * stays the untouched skip-link target.
 */
export default function SiteHeader() {
  const navigateToSection = useSectionNavigation();
  const navRef = useRef<HTMLDivElement>(null);
  const foreground = useNavForeground(navRef);

  const mobileMenu = useDisclosure();
  const overflowMenu = useDisclosure();

  const [primaryLinks, overflowLinks] = useMemo(() => {
    const primary: SectionMeta[] = [];
    const overflow: SectionMeta[] = [];
    for (const section of NAV_SECTIONS) {
      (DESKTOP_PRIMARY_IDS.includes(section.id) ? primary : overflow).push(section);
    }
    return [primary, overflow] as const;
  }, []);

  const handleLinkClick =
    (sectionId: SectionId, disclosure?: Disclosure) => (event: MouseEvent<HTMLAnchorElement>) => {
      navigateToSection(sectionId)(event);
      // Focus already moved into the target section, so do not steal it back.
      disclosure?.close(false);
    };

  const linkClasses = cn(NAV_LINK_BASE, HOVER_CLASSES[foreground]);
  const iconButtonClasses = cn(ICON_BUTTON_BASE, HOVER_CLASSES[foreground]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-12px z-50 px-20px bp810:top-16px bp810:px-36px">
      <div
        ref={navRef}
        style={{ backgroundColor: PILL_BACKGROUND }}
        className={cn(
          "pointer-events-auto relative mx-auto flex w-full max-w-[1320px] items-center gap-8px",
          "rounded-pill p-8px bg-layer-0 shadow-hairline-12-elevated",
          "backdrop-blur-[12px]",
          "transition-standard motion-reduce:transition-none",
          FOREGROUND_CLASSES[foreground],
        )}
      >
        <Link
          to="/"
          className={cn(
            "inline-flex min-h-[44px] shrink-0 items-center gap-8px rounded-pill px-8px",
            "text-16 font-medium leading-100 transition-standard motion-reduce:transition-none",
            HOVER_CLASSES[foreground],
          )}
        >
          <img
            src="/app_icon.png"
            alt="GupShupGo app icon"
            width={36}
            height={36}
            loading="eager"
            decoding="async"
            className="h-9 w-9 rounded-8"
          />
          <span className="hidden bp810:inline">GupShupGo</span>
        </Link>

        <nav aria-label="Main" className="flex flex-1 items-center justify-end gap-4px">
          {/* Desktop primary links (>=810px) */}
          <ul className="hidden items-center gap-2px bp810:flex">
            {primaryLinks.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={handleLinkClick(section.id)}
                  className={linkClasses}
                >
                  {section.navLabel}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop overflow disclosure — the remaining registry sections */}
          <div className="relative hidden bp810:block">
            <button
              ref={overflowMenu.triggerRef}
              type="button"
              aria-expanded={overflowMenu.isOpen}
              aria-controls={OVERFLOW_PANEL_ID}
              onClick={() =>
                overflowMenu.isOpen ? overflowMenu.close(false) : overflowMenu.open()
              }
              className={cn(linkClasses, "gap-4px")}
            >
              More sections
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>

            <div
              id={OVERFLOW_PANEL_ID}
              ref={overflowMenu.panelRef}
              hidden={!overflowMenu.isOpen}
              onKeyDown={overflowMenu.onKeyDown}
              className={cn(PANEL_BASE, "right-0 top-[calc(100%+12px)] w-[220px]")}
            >
              <ul className="flex flex-col gap-2px">
                {overflowLinks.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={handleLinkClick(section.id, overflowMenu)}
                      className={cn(linkClasses, "w-full")}
                    >
                      {section.navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile disclosure (<810px) — carries all ten sections */}
          <button
            ref={mobileMenu.triggerRef}
            type="button"
            aria-expanded={mobileMenu.isOpen}
            aria-controls={MOBILE_PANEL_ID}
            aria-label={mobileMenu.isOpen ? "Close main menu" : "Open main menu"}
            onClick={() => (mobileMenu.isOpen ? mobileMenu.close(false) : mobileMenu.open())}
            className={cn(iconButtonClasses, "bp810:hidden")}
          >
            {mobileMenu.isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>

          <div
            id={MOBILE_PANEL_ID}
            ref={mobileMenu.panelRef}
            hidden={!mobileMenu.isOpen}
            onKeyDown={mobileMenu.onKeyDown}
            className={cn(PANEL_BASE, "left-0 right-0 top-[calc(100%+12px)] bp810:hidden")}
          >
            <ul className="flex flex-col gap-2px">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={handleLinkClick(section.id, mobileMenu)}
                    className={cn(linkClasses, "w-full")}
                  >
                    {section.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <ThemeToggle
          className={cn(
            // The pill already carries the hairline and elevation, so the toggle
            // drops its own inset hairline and fill inside the nav.
            "bg-transparent shadow-none transition-standard motion-reduce:transition-none",
            // Wins over the toggle's own `text-ink-high` so it inverts with the pill.
            FOREGROUND_CLASSES[foreground],
            HOVER_CLASSES[foreground],
          )}
        />
        <DownloadButton variant="header">Get the app</DownloadButton>
      </div>
    </header>
  );
}
