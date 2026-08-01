import { PRO_LAUNCHED } from '@/config/app';

/**
 * Ordered registry of Landing_Page sections.
 *
 * Single source of truth for three consumers (design §3.6):
 *  - `Index.tsx` composition order
 *  - `SiteHeader` in-page navigation links (via `NAV_SECTIONS`)
 *  - the section-order / landmark tests
 *  - the surface band each section renders on (via `bandFor`)
 *
 * Requirements: 3.1 (render order), 3.5 (nav links for every section that has a
 * heading), 3.8 (adjacent sections never share a band), 3.10 (one tinted band).
 */

export type SectionId =
  | 'hero'
  | 'features'
  | 'mesh'
  | 'arcade'
  | 'privacy'
  | 'calling'
  | 'anonymous'
  | 'pro'
  | 'trust'
  | 'newsletter'
  | 'download';

export interface SectionMeta {
  readonly id: SectionId;
  /** `null` excludes the section from the in-page nav — the hero has no section heading. */
  readonly navLabel: string | null;
  readonly headingText: string;
}

/** In render order, top to bottom (Requirement 3.1). */
export const SECTIONS: readonly SectionMeta[] = [
  {
    id: 'hero',
    navLabel: null,
    headingText: 'Private messaging, HD calls, and offline chat for Android',
  },
  {
    id: 'features',
    navLabel: 'Features',
    headingText: 'Everything GupShupGo does',
  },
  {
    id: 'mesh',
    navLabel: 'Offline chat',
    headingText: 'Chat with no internet at all',
  },
  {
    id: 'arcade',
    navLabel: 'Gup Arcade',
    headingText: 'Gup Arcade keeps the conversation going',
  },
  {
    id: 'privacy',
    navLabel: 'Security',
    headingText: 'Your conversations stay yours',
  },
  {
    id: 'calling',
    navLabel: 'Calling',
    headingText: 'HD video and voice calls',
  },
  {
    id: 'anonymous',
    navLabel: 'Anonymous chat',
    headingText: 'Talk to someone new, anonymously',
  },
  {
    id: 'pro',
    navLabel: 'Pro',
    headingText: 'GupShupGo Pro',
  },
  {
    id: 'trust',
    navLabel: 'Trust',
    headingText: 'Built to be trusted',
  },
  {
    id: 'newsletter',
    navLabel: 'Updates',
    headingText: 'Get GupShupGo product updates',
  },
  {
    id: 'download',
    navLabel: 'Download',
    headingText: 'Get GupShupGo on Android',
  },
] as const;

/**
 * The sections actually rendered right now: all eleven once Pro has launched,
 * otherwise every section except `pro` (see `PRO_LAUNCHED` in
 * `src/config/app.ts`). `SECTIONS` keeps the full registry so re-enabling Pro
 * stays a one-constant change.
 */
export const VISIBLE_SECTIONS: readonly SectionMeta[] = PRO_LAUNCHED
  ? SECTIONS
  : SECTIONS.filter((section) => section.id !== 'pro');

/**
 * Sections that carry a heading and therefore appear in the header nav
 * (Requirement 3.5). Derived from `VISIBLE_SECTIONS`, so the nav can never link
 * to a section the page does not render.
 */
export const NAV_SECTIONS: readonly SectionMeta[] = VISIBLE_SECTIONS.filter(
  (section) => section.navLabel !== null,
);

/**
 * Surface band for a section, derived from its POSITION in `VISIBLE_SECTIONS`:
 * even index → band 0, odd index → band 1. `pro` is the single exception, taking
 * the one Tinted_Band the page is allowed (Req 3.10).
 *
 * The bands used to be hardcoded in each section file, which silently broke
 * Requirement 3.8 (no two adjacent sections may share a band) whenever a section
 * was removed from the middle of the order: with `pro` hidden, `anonymous` and
 * `trust` would both have sat on band 0. Deriving from position makes 3.8
 * structurally guaranteed in both states of `PRO_LAUNCHED`.
 *
 * A section that is not visible falls back to band 0 — it is not rendered, so
 * the value only matters for tests that ask about it.
 */
export function bandFor(sectionId: SectionId): 0 | 1 | 'tint' {
  if (sectionId === 'pro') return 'tint';
  const index = VISIBLE_SECTIONS.findIndex((section) => section.id === sectionId);
  if (index < 0) return 0;
  return index % 2 === 0 ? 0 : 1;
}
