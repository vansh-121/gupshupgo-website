import type { LucideIcon } from 'lucide-react';
// Per-icon named imports so Rollup can tree-shake the rest of the icon set.
import {
  Bell,
  CircleDashed,
  CirclePlay,
  Crown,
  Link,
  Lock,
  MessageSquare,
  PhoneOutgoing,
  QrCode,
  Radio,
  ScreenShare,
  ShieldCheck,
  Smartphone,
  SunMoon,
  UserX,
  Users,
  Video,
} from 'lucide-react';

import type { SectionId } from '@/data/sections';

/**
 * Feature content module — the single source of truth for the 17 shipped app
 * capabilities (Requirements 4.1, 4.2, 4.3, 4.4, 4.5).
 *
 * Every description states only capabilities that the Android app ships today.
 * No claim here may go beyond App_Feature_Set.
 */

export type FeatureCategory =
  | 'messaging'
  | 'privacy'
  | 'calling'
  | 'social'
  | 'arcade'
  | 'connectivity'
  | 'account';

export interface Feature {
  /** Stable slug, used as the React key and as a test selector. */
  readonly id: string;
  /** Rendered heading text. */
  readonly name: string;
  /** Exactly one sentence. */
  readonly description: string;
  /** Requirement 4.2 — every entry carries an icon. */
  readonly Icon: LucideIcon;
  readonly category: FeatureCategory;
  /** Requirement 4.4 — true only when the whole feature is Pro-gated. */
  readonly isPro: boolean;
  /** Links the card to its deep-dive section (Requirement 5). */
  readonly detailSectionId?: SectionId;
}

export const FEATURES: readonly Feature[] = [
  {
    id: 'messaging',
    name: 'Real-time messaging',
    description:
      'Send text, image, video, and voice-note messages one to one, with delivery and read status and replies to status updates.',
    Icon: MessageSquare,
    category: 'messaging',
    isPro: false,
  },
  {
    id: 'encryption',
    name: 'End-to-end encryption',
    description:
      'Messages, media, and calls are end-to-end encrypted with the Signal protocol, and you can verify a contact by safety number.',
    Icon: ShieldCheck,
    category: 'privacy',
    isPro: false,
    detailSectionId: 'privacy',
  },
  {
    id: 'vault',
    name: 'Vault',
    description: 'Keep chosen messages in a PIN-protected encrypted store on your device.',
    Icon: Lock,
    category: 'privacy',
    isPro: false,
    detailSectionId: 'privacy',
  },
  {
    id: 'calls',
    name: 'HD video & voice calls',
    description:
      'Place HD video and voice calls, and take incoming calls even while the app is in the background.',
    Icon: Video,
    category: 'calling',
    isPro: false,
    detailSectionId: 'calling',
  },
  {
    id: 'call-logs',
    name: 'Call history',
    description: 'Review your call logs and past call history in one place.',
    Icon: PhoneOutgoing,
    category: 'calling',
    isPro: false,
    detailSectionId: 'calling',
  },
  {
    id: 'screen-share',
    name: 'Screen sharing',
    description:
      'Share your screen during a session, with a presenter view for you and a viewer view for the other side.',
    Icon: ScreenShare,
    category: 'calling',
    isPro: true,
    detailSectionId: 'calling',
  },
  {
    id: 'status',
    name: 'Status updates',
    description:
      'Post text statuses and watch updates in the status viewer, with Pro for media because photo and video statuses require GupShupGo Pro.',
    Icon: CirclePlay,
    category: 'social',
    isPro: false,
  },
  {
    id: 'arcade',
    name: 'Gup Arcade',
    description:
      'Earn Gup Points, take on challenges, climb the leaderboard, and keep chat streaks called bonds alive with streak restore.',
    Icon: CircleDashed,
    category: 'arcade',
    isPro: false,
    detailSectionId: 'arcade',
  },
  {
    id: 'pro',
    name: 'GupShupGo Pro',
    description:
      'Subscribe monthly or yearly, with purchase restore, to unlock media statuses, screen sharing, exclusive themes, longer voice messages, larger uploads, a weekly free bond restore, a Pro badge, and chat export.',
    Icon: Crown,
    category: 'account',
    isPro: false,
    detailSectionId: 'pro',
  },
  {
    id: 'mesh',
    name: 'Offline nearby chat',
    description:
      'Chat with nearby devices over Bluetooth and Wi-Fi Direct with no internet connection, using multi-hop store-and-forward relaying.',
    Icon: Radio,
    category: 'connectivity',
    isPro: false,
    detailSectionId: 'mesh',
  },
  {
    id: 'anonymous',
    name: 'Anonymous chat',
    description: 'Match in a lobby and chat without revealing your identity.',
    Icon: UserX,
    category: 'social',
    isPro: false,
    detailSectionId: 'anonymous',
  },
  {
    id: 'qr-add',
    name: 'QR contact adding',
    description: 'Add a contact by scanning their QR code with the in-app scanner.',
    Icon: QrCode,
    category: 'social',
    isPro: false,
  },
  {
    id: 'public-profile',
    name: 'Public profiles',
    description: 'Share a public profile that anyone can open from a link.',
    Icon: Link,
    category: 'social',
    isPro: false,
  },
  {
    id: 'contacts',
    name: 'Contacts & requests',
    description: 'Manage your contacts, friend requests, and blocked contacts.',
    Icon: Users,
    category: 'social',
    isPro: false,
  },
  {
    id: 'phone-auth',
    name: 'Phone-number sign-in',
    description:
      'Sign in with your phone number, link additional sign-in methods, and manage your device sessions.',
    Icon: Smartphone,
    category: 'account',
    isPro: false,
  },
  {
    id: 'notifications',
    name: 'Notifications & presence',
    description:
      'Get push notifications and show online presence, with privacy controls for last seen and read receipts.',
    Icon: Bell,
    category: 'account',
    isPro: false,
  },
  {
    id: 'themes',
    name: 'Light & dark themes',
    description: 'Switch the app between light and dark themes.',
    Icon: SunMoon,
    category: 'account',
    isPro: false,
  },
];

/** Requirement 4.4 — wholly Pro-gated features. */
export const PRO_FEATURES: readonly Feature[] = FEATURES.filter((f) => f.isPro);

/** Consumed by the JSON-LD `featureList` consistency check (Requirement 13.5). */
export const FEATURE_NAMES: readonly string[] = FEATURES.map((f) => f.name);
