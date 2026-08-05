/**
 * Pro benefit content module — the single source of truth for the free-versus-Pro
 * comparison rendered by `ProSection` (Requirements 6.1, 6.2, 6.5).
 *
 * The eight rows mirror App_Feature_Set item 9 exactly. Every `free` and `pro`
 * value is a prose limit, never a price: no currency symbols, currency codes, or
 * monetary amounts appear anywhere in this module (Requirement 6.5).
 */

export interface ProBenefit {
  /** Stable slug, used as the React key and as a test selector. */
  readonly id: string;
  /** Row label rendered in the `scope="row"` header cell. */
  readonly label: string;
  /** Prose statement of the free-tier limit for this benefit. */
  readonly free: string;
  /** Prose statement of what Pro gives for this benefit. */
  readonly pro: string;
}

export const PRO_BENEFITS: readonly ProBenefit[] = [
  {
    id: 'media-statuses',
    label: 'Status updates',
    free: 'Text statuses only',
    pro: 'Photo and video statuses as well as text',
  },
  {
    id: 'screen-sharing',
    label: 'Screen sharing',
    free: 'Not available',
    pro: 'Share your screen during a session',
  },
  {
    id: 'exclusive-themes',
    label: 'Themes',
    free: 'Light and dark themes',
    pro: 'Exclusive AMOLED, Ocean, Sunset, and Emerald themes',
  },
  {
    id: 'voice-messages',
    label: 'Voice messages',
    free: 'Up to one minute per message',
    pro: 'Up to five minutes per message',
  },
  {
    id: 'uploads',
    label: 'File uploads',
    free: 'Up to 10 MB per file',
    pro: 'Up to 50 MB per file',
  },
  {
    id: 'bond-restore',
    label: 'Bond restore',
    free: 'No free restores, each restore costs Gup Points',
    pro: 'One free bond restore every week',
  },
  {
    id: 'pro-badge',
    label: 'Pro badge',
    free: 'Not available',
    pro: 'A Pro badge on your profile',
  },
  {
    id: 'chat-export',
    label: 'Chat export',
    free: 'Not available',
    pro: 'Export a chat from your device',
  },
];

/** Requirement 6.1 — the comparison always shows exactly eight benefits. */
export const PRO_BENEFIT_COUNT = 8;
