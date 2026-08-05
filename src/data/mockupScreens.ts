/**
 * Device_Mockup content module (design §4).
 *
 * `public/` holds no app screenshots, so the mockup is rendered in React + CSS
 * from this module. Every visible string inside a mockup — plus the `altText`
 * used as the frame's accessible name — originates here and nowhere else
 * (Requirement 9.3). No entry references any calling vendor or SDK
 * (Requirement 9.6).
 *
 * Colours are never declared here: the mockup components resolve them through
 * App_Palette tokens, which is what makes the screens theme-matched
 * (Requirement 9.5).
 */

export type MockupScreenId = 'chat' | 'arcade' | 'call';

export interface MockupMessage {
  readonly id: string;
  readonly author: 'self' | 'peer';
  readonly kind: 'text' | 'voice' | 'image';
  /** Rendered bubble text, or the caption for a voice / image bubble. */
  readonly body: string;
  /** e.g. "9:41" */
  readonly timeLabel: string;
  /** Delivery state — self messages only. */
  readonly status?: 'sent' | 'delivered' | 'read';
}

export interface MockupChatScreen {
  readonly id: 'chat';
  /** Contact display name shown in the app bar. */
  readonly title: string;
  /** "online" / "last seen …" line under the title. */
  readonly subtitle: string;
  /** Accessible description of the whole screen (Requirement 9.4 intent). */
  readonly altText: string;
  /** Gup Arcade bond indicator shown as a chip in the app bar. */
  readonly streakLabel: string;
  readonly messages: readonly MockupMessage[];
}

export interface MockupArcadeLeaderboardRow {
  readonly rank: number;
  readonly name: string;
  readonly points: number;
}

export interface MockupArcadeScreen {
  readonly id: 'arcade';
  readonly altText: string;
  readonly title: string;
  readonly pointsLabel: string;
  readonly points: number;
  readonly streakLabel: string;
  readonly streakDays: number;
  readonly leaderboardTitle: string;
  readonly leaderboard: readonly MockupArcadeLeaderboardRow[];
}

export interface MockupCallScreen {
  readonly id: 'call';
  readonly altText: string;
  readonly callerName: string;
  readonly statusLabel: string;
  readonly durationLabel: string;
  readonly isScreenSharing: boolean;
  readonly screenShareLabel: string;
  readonly encryptionLabel: string;
}

export type MockupScreen = MockupChatScreen | MockupArcadeScreen | MockupCallScreen;

const CHAT_SCREEN: MockupChatScreen = {
  id: 'chat',
  title: 'Aditi',
  subtitle: 'online',
  altText:
    'GupShupGo chat screen showing an end-to-end encrypted conversation with delivery ticks and a 12-day bond streak.',
  streakLabel: '12-day bond',
  messages: [
    {
      id: 'chat-1',
      author: 'peer',
      kind: 'text',
      body: 'Signal is patchy up here, but the app still found you.',
      timeLabel: '9:38',
    },
    {
      id: 'chat-2',
      author: 'self',
      kind: 'text',
      body: 'Nearby chat kicked in — no internet needed.',
      timeLabel: '9:39',
      status: 'read',
    },
    {
      id: 'chat-3',
      author: 'peer',
      kind: 'voice',
      body: 'Voice note · 0:14',
      timeLabel: '9:40',
    },
    {
      id: 'chat-4',
      author: 'self',
      kind: 'text',
      body: 'Saved it to the Vault. Our bond is 12 days now.',
      timeLabel: '9:41',
      status: 'delivered',
    },
  ],
};

const ARCADE_SCREEN: MockupArcadeScreen = {
  id: 'arcade',
  altText:
    'GupShupGo Gup Arcade screen showing a Gup Points total, a chat streak counter, and the top three leaderboard places.',
  title: 'Gup Arcade',
  pointsLabel: 'Gup Points',
  points: 2480,
  streakLabel: 'Longest bond',
  streakDays: 12,
  leaderboardTitle: 'Leaderboard',
  leaderboard: [
    { rank: 1, name: 'Aditi', points: 3120 },
    { rank: 2, name: 'You', points: 2480 },
    { rank: 3, name: 'Rohan', points: 2050 },
  ],
};

const CALL_SCREEN: MockupCallScreen = {
  id: 'call',
  altText:
    'GupShupGo call screen showing an end-to-end encrypted HD video call with screen sharing active.',
  callerName: 'Rohan',
  statusLabel: 'HD video call',
  durationLabel: '04:37',
  isScreenSharing: true,
  screenShareLabel: 'Sharing your screen',
  encryptionLabel: 'End-to-end encrypted',
};

/**
 * Index 0 is the chat screen — the hero renders `MOCKUP_SCREENS[0]` eagerly
 * (design §4).
 */
export const MOCKUP_SCREENS: readonly MockupScreen[] = [
  CHAT_SCREEN,
  ARCADE_SCREEN,
  CALL_SCREEN,
];

/** Convenience lookup for the sections that embed a specific screen. */
export const getMockupScreen = (id: MockupScreenId): MockupScreen => {
  const screen = MOCKUP_SCREENS.find((s) => s.id === id);
  if (!screen) {
    throw new Error(`Unknown mockup screen id: ${id}`);
  }
  return screen;
};
