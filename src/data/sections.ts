/**
 * Ordered registry of Landing_Page sections.
 *
 * Single source of truth for three consumers (design §3.6):
 *  - `Index.tsx` composition order
 *  - `SiteHeader` in-page navigation links (via `NAV_SECTIONS`)
 *  - the section-order / landmark tests
 *
 * Requirements: 3.1 (render order), 3.5 (nav links for every section that has a heading).
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
    navLabel: 'Privacy',
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

/** Sections that carry a heading and therefore appear in the header nav (Requirement 3.5). */
export const NAV_SECTIONS: readonly SectionMeta[] = SECTIONS.filter(
  (section) => section.navLabel !== null,
);
