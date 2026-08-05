import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, RefObject } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";

import { NAV_SECTIONS } from "@/data/sections";
import type { SectionId, SectionMeta } from "@/data/sections";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "@/components/ThemeToggle";
import DownloadButton from "@/components/DownloadButton";
import { PILL_NAV_SURFACE_ALPHA } from "@/lib/contrast";
import { cn } from "@/lib/utils";

const MOBILE_PANEL_ID = "site-header-mobile-nav";

/**
 * Viewport at which the nav switches from the collapsed disclosure to the flat
 * desktop row.
 *
 * This is `bp1024`, not `bp810`. The flat row is logo + wordmark + six section
 * links + divider + theme toggle + "Get the app", which measures roughly 850px
 * of content: between 810px and 1024px it was wider than the viewport, so the
 * pill stopped hugging its content and the CTA was pushed past the right edge.
 * Portrait tablets therefore keep the disclosure — which lists every section
 * anyway — and the flat row only appears once there is room for it.
 *
 * Kept as a comment-level constant rather than a JS value because Tailwind
 * needs the literal `bp1024:` prefix in the class strings to compile them.
 */


/**
 * The section links the desktop pill carries, flat, in this order (Req 8.5).
 *
 * Resolved against `NAV_SECTIONS` rather than duplicated as label/href pairs, so
 * the row stays flag-aware: `pro` is absent from `NAV_SECTIONS` while
 * `PRO_LAUNCHED` is false and simply does not render.
 */
const DESKTOP_SECTION_IDS: readonly SectionId[] = [
  "features",
  "mesh",
  "arcade",
  "privacy",
  "calling",
  "anonymous",
  "pro",
];

const DESKTOP_SECTIONS: readonly SectionMeta[] = DESKTOP_SECTION_IDS.map((id) =>
  NAV_SECTIONS.find((section) => section.id === id),
).filter((section): section is SectionMeta => section !== undefined);

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
 * The same wash as `HOVER_CLASSES`, applied persistently, marking the section
 * currently in view (Req 8.5).
 *
 * Deliberately the hover wash and nothing else: it is contrast-safe by
 * construction — the label keeps whichever `FOREGROUND_CLASSES` variant the pill
 * resolved, and the wash is the alpha already verified for hover — and it
 * inverts with the pill for free. A dedicated colour such as `text-ink-accent`
 * would be an unverified pairing: `CONTRAST_PAIRS` only declares the pill's
 * foreground for `ink-high` (light) and `white` (dark) against the pill's
 * translucent blend.
 *
 * The wash is never the only signal — the active link also carries
 * `aria-current="location"`, which is what assistive tech and anyone who cannot
 * pick the wash out actually rely on.
 */
const ACTIVE_CLASSES: Record<NavForeground, string> = {
  "on-light": "bg-black/[0.06]",
  "on-dark": "bg-white/[0.12]",
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
 * The pill's own surface: the base layer token at 72% alpha, so the
 * `backdrop-filter` blur stays visible through it (Req 8.1, 5.5). Applied inline
 * rather than as a utility because Tailwind's `/opacity` modifier cannot add
 * alpha to a bare `var()` colour, and because an inline value the browser cannot
 * parse is dropped, leaving the opaque `bg-layer-0` class as the fallback. No new
 * colour is introduced — the hue is whatever `--layer-0` resolves to in the
 * active theme.
 *
 * The alpha lives in `src/lib/contrast.ts` as `PILL_NAV_SURFACE_ALPHA`, next to
 * the pairing table that measures label text against the resulting blend, so the
 * component and the contrast assertion cannot drift apart.
 */
const PILL_BACKGROUND = `color-mix(in srgb, var(--layer-0) ${PILL_NAV_SURFACE_ALPHA * 100
  }%, transparent)`;

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
 * Disclosure behaviour for the below-810px menu (Req 8.6, 8.8): opening focuses
 * the first link, Tab is contained inside the panel, Escape closes and restores
 * focus to the trigger, and a pointer press outside dismisses it.
 *
 * It stays a hook rather than being inlined: it is the only place the focus
 * contract lives, and the desktop row is now flat, so this is its sole consumer.
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
 * The mobile disclosure panel sits on `layer-1` — one step raised above the
 * pill's own `layer-0` surface — so it reads as floating above it, with the
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
 * - the pill is `w-fit` and centred above 810px: it hugs its content (~850px)
 *   instead of stretching to the container, which is what makes it read as a
 *   discrete floating object rather than a bar with rounded corners. The three
 *   groups — logo, nav, actions — are separated by real gaps, not
 *   `justify-between`. Below 810px it stays full width, where the collapsed
 *   arrangement needs it.
 * - in-page links derive from `NAV_SECTIONS`, so the registry stays the only
 *   source of nav truth; activation runs `useSectionNavigation()` — scroll,
 *   then move focus into the section (Req 8.7)
 * - no legal/route links live here at all: `SiteFooter` renders them on every
 *   route, and a second copy in the header would only split where they live.
 * - below 810px the links collapse into a disclosure with `aria-expanded` /
 *   `aria-controls`, a 44x44 trigger, focus-first-link on open, Tab
 *   containment, and Escape restoring focus to the trigger (Req 8.6)
 * - every control is a native `<button>` / `<a>` at 44x44 CSS px or larger and
 *   inherits the global `:focus-visible` outline (Req 8.8)
 *
 * The pill has ONE appearance: it does not resize, condense or otherwise react
 * to scroll position. It is a single 60px-tall object — the 44px minimum control
 * height plus 2×8px of padding; the 28px logo sits well inside that — inset 12px
 * from the top below 810px, so 72px total, which clears the hero's `py-72px` top
 * padding exactly. No shell spacer is needed — `main#main-content` stays the
 * untouched skip-link target.
 *
 * One scroll-derived behaviour, and it changes no geometry: the desktop link for
 * the section under the viewport centre is marked `aria-current="location"` and
 * carries the pill's own hover wash (`useActiveSection`).
 */
export default function SiteHeader() {
  const navigateToSection = useSectionNavigation();
  const navRef = useRef<HTMLDivElement>(null);
  const foreground = useNavForeground(navRef);

  /*
    IntersectionObserver-driven (see `useActiveSection`); the header adds no
    scroll event listener.
  */
  const activeSection = useActiveSection(DESKTOP_SECTION_IDS);

  const mobileMenu = useDisclosure();

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
          // Full width below bp1024, where the collapsed row needs it; above,
          // `w-fit` sizes the pill to its content and `mx-auto` centres it.
          "pointer-events-auto relative mx-auto flex w-full items-center gap-8px",
          "bp1024:w-fit bp1024:max-w-full bp1024:gap-12px",

          "rounded-pill bg-layer-0",
          "backdrop-blur-[12px]",
          // One static appearance: 8px padding and the composed inset hairline +
          // elevation shadow. Nothing here changes with scroll position.
          "p-8px shadow-hairline-12-elevated",
          // The transition is only for the theme/foreground swap now.
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
            width={28}
            height={28}
            loading="eager"
            decoding="async"
            /*
              A fixed 28px painted box, matching the `width` / `height`
              attributes above, so the box reserved before the bitmap decodes is
              the box it lands in and there is no layout shift (Req 17.4). No
              transition on the icon: nothing about it ever changes. The 44px tap
              target comes from the wrapping link's `min-h-[44px]`, and that
              minimum — not the icon — is what sets the pill's height.
            */
            className="h-7 w-7 rounded-8"
          />
          {/* Wordmark shows once the flat nav does, so the collapsed pill spends
              its width on the controls instead. */}
          <span className="hidden bp1024:inline">GupShupGo</span>

        </Link>

        {/*
          Below bp1024 `flex-1 justify-end` pushes the hamburger to the right of
          the logo; above it the nav is its own width inside a content-sized
          pill, so it neither grows nor pins to an edge.

          `bp1024:ml-8px` widens only the logo-to-nav boundary — the pill's shared
          `bp1024:gap-12px` stays put, so nav / divider / toggle / CTA keep their
          existing rhythm. Total desktop logo-to-first-link gap: 4 + 12 + 8 = 24px.
        */}
        <nav
          aria-label="Main"
          className="flex flex-1 items-center justify-end gap-4px bp1024:ml-8px bp1024:flex-none bp1024:justify-start bp1024:gap-2px"
        >
          {/* Desktop section links (>=1024px), flat */}
          <ul className="hidden items-center gap-2px bp1024:flex">

            {DESKTOP_SECTIONS.map((section) => {
              const isActive = section.id === activeSection;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={handleLinkClick(section.id)}
                    /*
                      `location` rather than `page`: these are in-page anchors
                      into the current document, not links to the current route.
                      This is the primary signal — the wash below is the visual
                      echo of it, never a colour-only indicator.
                    */
                    aria-current={isActive ? "location" : undefined}
                    className={cn(linkClasses, isActive && ACTIVE_CLASSES[foreground])}
                  >
                    {section.navLabel}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle — visible on mobile/tablet (<1024px) only.
              On desktop it renders outside the nav (after the hairline divider)
              to preserve the logo → links → divider → toggle → CTA desktop rhythm. */}
          <ThemeToggle
            className={cn(
              "bg-transparent shadow-none transition-standard motion-reduce:transition-none bp1024:hidden",
              FOREGROUND_CLASSES[foreground],
              HOVER_CLASSES[foreground],
            )}
          />

          {/* Collapsed disclosure (<1024px) — every section anchor.
              This MUST hide at the same breakpoint the flat list appears at
              (bp1024). Hiding it at bp810 while the list only appeared at
              bp1024 would leave 810–1024px with no navigation at all. */}
          <button
            ref={mobileMenu.triggerRef}
            type="button"
            aria-expanded={mobileMenu.isOpen}
            aria-controls={MOBILE_PANEL_ID}
            aria-label={mobileMenu.isOpen ? "Close main menu" : "Open main menu"}
            onClick={() => (mobileMenu.isOpen ? mobileMenu.close(false) : mobileMenu.open())}
            className={cn(iconButtonClasses, "bp1024:hidden")}
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
            className={cn(PANEL_BASE, "left-0 right-0 top-[calc(100%+12px)] bp1024:hidden")}

          >
            {/*
              Every section the page renders, in registry order. No legal links:
              the footer carries those on every route, so duplicating them here
              would only add a second, competing place to find them.
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
          </div>
        </nav>

        {/*
          Hairline rule separating the nav group from the actions. A 1px element
          filled with the hairline token, never the `border` property (Req 4.3),
          and gone below bp1024 where the row collapses — with no flat link row
          to divide, the rule would be separating the logo from the hamburger.


          Kept short at 20px — well under the 44px controls it sits between — so
          it recedes into a boundary instead of competing as a third mark.

          `bg-hairline-12` reads `--hairline-12`, which is black-on-light and
          white-on-dark, so the rule inverts with the pill on the theme signal
          that drives the pill's own foreground.
        */}
        <span
          aria-hidden="true"
          className="hidden h-20px w-px shrink-0 bg-hairline-12 bp1024:block"
        />


        {/* Desktop-only theme toggle — hidden on mobile/tablet where the one
            inside the nav handles it, so the toggle is never rendered twice. */}
        <ThemeToggle
          className={cn(
            // The pill already carries the hairline and elevation, so the toggle
            // drops its own inset hairline and fill inside the nav.
            "hidden bg-transparent shadow-none transition-standard motion-reduce:transition-none bp1024:inline-flex",
            // Wins over the toggle's own `text-ink-high` so it inverts with the pill.
            FOREGROUND_CLASSES[foreground],
            HOVER_CLASSES[foreground],
          )}
        />
        {/* Extra breathing room between the toggle and the solid CTA. */}
        <DownloadButton variant="header" className="bp1024:ml-4px">
          Get the app
        </DownloadButton>

      </div>
    </header>
  );
}
