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
const LEGAL_PANEL_ID = "site-header-legal-nav";

/**
 * The section links the desktop pill carries, flat, in this order (Req 8.5).
 *
 * The pill hugs its content rather than stretching to the container, so these
 * six fit in one flat row and the old "More sections" overflow disclosure — a
 * workaround for a full-width bar's cramped middle — is gone.
 *
 * Resolved against `NAV_SECTIONS` rather than duplicated as label/href pairs, so
 * the row stays flag-aware: `pro` is absent from `NAV_SECTIONS` while
 * `PRO_LAUNCHED` is false and simply does not render, and a label edit in the
 * registry cannot drift from the pill.
 *
 * Deliberately not here: Anonymous chat, Trust, Updates, and Download — the
 * last redundant next to the "Get the app" button. All four remain in the
 * below-810px menu, which still lists every section, so nothing is unreachable.
 */
const DESKTOP_SECTION_IDS: readonly SectionId[] = [
  "features",
  "mesh",
  "arcade",
  "privacy",
  "calling",
  "pro",
];

const DESKTOP_SECTIONS: readonly SectionMeta[] = DESKTOP_SECTION_IDS.map((id) =>
  NAV_SECTIONS.find((section) => section.id === id),
).filter((section): section is SectionMeta => section !== undefined);

/**
 * Route links behind the "Legal" disclosure.
 *
 * These are the real routes registered in `App.tsx`. `/privacy-policy` is NOT a
 * route and must never be linked here.
 */
const LEGAL_LINKS: readonly { readonly to: string; readonly label: string }[] = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/delete-account", label: "Delete Account" },
];

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
 * Disclosure behaviour shared by the below-810px menu and the desktop "Legal"
 * popover (Req 8.6, 8.8): opening focuses the first link, Tab is contained
 * inside the panel, Escape closes and restores focus to the trigger.
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
    // `a[href]`, not `a[href^='#']`: the Legal panel holds route links.
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
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

/**
 * Disclosure panels sit on `layer-1` — one step raised above the pill's own
 * `layer-0` surface — so they read as floating above it in both themes, with the
 * inset hairline and the single outer elevation composed in one declaration
 * (Req 4.5). Rows are `text-14 font-medium` at a 44px minimum height via
 * `NAV_LINK_BASE`.
 */
const PANEL_BASE =
  "absolute z-10 rounded-8 bg-layer-1 p-8px shadow-hairline-12-elevated";

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
 * - the pill is `w-fit` and centred above 810px: it hugs its content (~880px)
 *   instead of stretching to the container, which is what makes it read as a
 *   discrete floating object rather than a bar with rounded corners. The three
 *   groups — logo, nav, actions — are separated by real gaps, not
 *   `justify-between`. Below 810px it stays full width, where the collapsed
 *   arrangement needs it.
 * - in-page links derive from `NAV_SECTIONS`, so the registry stays the only
 *   source of nav truth; activation runs `useSectionNavigation()` — scroll,
 *   then move focus into the section (Req 8.7)
 * - a "Legal" disclosure carries the three route links. Unlike the in-page
 *   anchors it must NOT preventDefault: the router navigates and the new route
 *   takes focus, so the panel closes without restoring focus to the trigger.
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
  const legalMenu = useDisclosure();

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
          // Full width below 810px, where the collapsed row needs it; above,
          // `w-fit` sizes the pill to its content and `mx-auto` centres it.
          "pointer-events-auto relative mx-auto flex w-full items-center gap-8px",
          "bp810:w-fit bp810:max-w-full bp810:gap-12px",
          "rounded-pill p-8px bg-layer-0 shadow-hairline-12-elevated",
          "backdrop-blur-[12px]",
          "transition-standard motion-reduce:transition-none",
          FOREGROUND_CLASSES[foreground],
        )}
      >
        <Link
          to="/"
          className={cn(
            // Trailing padding is trimmed: the lockup no longer anchors the
            // left end of a full-width bar, so it only needs breathing room.
            "inline-flex min-h-[44px] shrink-0 items-center gap-8px rounded-pill pl-8px pr-4px",
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

        {/*
          Below 810px `flex-1 justify-end` pushes the hamburger to the right of
          the logo; above it the nav is its own width inside a content-sized
          pill, so it neither grows nor pins to an edge.
        */}
        <nav
          aria-label="Main"
          className="flex flex-1 items-center justify-end gap-4px bp810:flex-none bp810:justify-start bp810:gap-2px"
        >
          {/* Desktop section links (>=810px), flat */}
          <ul className="hidden items-center gap-2px bp810:flex">
            {DESKTOP_SECTIONS.map((section) => (
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

          {/* Desktop "Legal" disclosure — route links, not in-page anchors */}
          <div className="relative hidden bp810:block">
            <button
              ref={legalMenu.triggerRef}
              type="button"
              aria-expanded={legalMenu.isOpen}
              aria-controls={LEGAL_PANEL_ID}
              onClick={() => (legalMenu.isOpen ? legalMenu.close(false) : legalMenu.open())}
              className={cn(linkClasses, "gap-4px")}
            >
              Legal
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>

            <div
              id={LEGAL_PANEL_ID}
              ref={legalMenu.panelRef}
              hidden={!legalMenu.isOpen}
              onKeyDown={legalMenu.onKeyDown}
              className={cn(PANEL_BASE, "right-0 top-[calc(100%+12px)] w-[220px]")}
            >
              <ul className="flex flex-col gap-2px">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      // The router navigates and the new route takes focus, so
                      // this closes without restoring focus to the trigger.
                      onClick={() => legalMenu.close(false)}
                      className={cn(linkClasses, "w-full")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile disclosure (<810px) — every section plus the legal routes */}
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
            {/*
              Two named lists rather than one list split by a rule: the grouping
              is announced to assistive technology, not just drawn.
            */}
            <ul aria-label="Page sections" className="flex flex-col gap-2px">
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
            <ul aria-label="Legal" className="mt-8px flex flex-col gap-2px">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => mobileMenu.close(false)}
                    className={cn(linkClasses, "w-full")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/*
          Hairline rule separating the nav group from the actions. A 1px element
          filled with the hairline token, never the `border` property (Req 4.3),
          and gone below 810px where the row collapses.
        */}
        <span
          aria-hidden="true"
          className="hidden h-6 w-px shrink-0 bg-hairline-12 bp810:block"
        />

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
        {/* Extra breathing room between the toggle and the solid CTA. */}
        <DownloadButton variant="header" className="bp810:ml-4px">
          Get the app
        </DownloadButton>
      </div>
    </header>
  );
}
