import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { NAV_SECTIONS } from "@/data/sections";
import type { SectionId } from "@/data/sections";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import DownloadButton from "@/components/DownloadButton";
import { cn } from "@/lib/utils";

const MOBILE_PANEL_ID = "site-header-mobile-nav";

const NAV_LINK_CLASSES =
  "inline-flex items-center rounded-pill px-3 py-2 text-body-sm font-medium text-ink-high transition-colors hover:bg-surface-alt";

/**
 * Sticky site header (design §6.2, §6.7).
 *
 * - `banner` landmark with a single `navigation` landmark named "Main"
 *   (Requirement 12.9)
 * - in-page nav links derived from `NAV_SECTIONS`, so the registry is the only
 *   source of nav truth (Requirement 3.5)
 * - link activation runs `useSectionNavigation()`: scroll, then move focus into
 *   the section (Requirement 3.6)
 * - below 768px the nav collapses into a disclosure with `aria-expanded` /
 *   `aria-controls`; opening focuses the first link, Tab is contained inside the
 *   panel, and Escape or a link activation closes it and restores focus to the
 *   trigger (Requirements 11.2, 11.3)
 * - every control is a native `<button>` / `<a>` at 44x44 CSS px or larger
 *   (Requirements 11.5, 12.4)
 */
export default function SiteHeader() {
  const navigateToSection = useSectionNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsMenuOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  // Move focus into the revealed menu (Requirement 11.3).
  useEffect(() => {
    if (!isMenuOpen) return;
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a[href^='#']");
    firstLink?.focus();
  }, [isMenuOpen]);

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeMenu();
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
  };

  const handleMobileLinkClick =
    (sectionId: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
      navigateToSection(sectionId)(event);
      // Focus already moved into the target section, so do not steal it back.
      closeMenu(false);
    };

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-gutter py-3">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-pill pr-2 text-body font-semibold text-ink-high"
        >
          <img
            src="/app_icon.png"
            alt="GupShupGo app icon"
            width={36}
            height={36}
            loading="eager"
            decoding="async"
            className="h-9 w-9 rounded-lg"
          />
          <span>GupShupGo</span>
        </Link>

        <nav aria-label="Main" className="flex flex-1 items-center justify-end gap-1">
          {/* Desktop links (>=768px) */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={navigateToSection(section.id)}
                  className={NAV_LINK_CLASSES}
                >
                  {section.navLabel}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile disclosure (<768px) */}
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_PANEL_ID}
            aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
            onClick={() => (isMenuOpen ? closeMenu(false) : setIsMenuOpen(true))}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill md:hidden",
              "border border-hairline bg-surface text-ink-high transition-colors hover:bg-surface-alt",
            )}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>

          <div
            id={MOBILE_PANEL_ID}
            ref={panelRef}
            hidden={!isMenuOpen}
            onKeyDown={handlePanelKeyDown}
            className={cn(
              "absolute left-0 right-0 top-full md:hidden",
              "border-b border-hairline bg-surface px-gutter pb-4 pt-2 shadow-lg",
            )}
          >
            <ul className="flex flex-col gap-1">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={handleMobileLinkClick(section.id)}
                    className={cn(NAV_LINK_CLASSES, "min-h-[44px] w-full")}
                  >
                    {section.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <ThemeToggle />
        <DownloadButton variant="header">Get the app</DownloadButton>
      </div>
    </header>
  );
}
