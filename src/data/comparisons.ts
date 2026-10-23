import { PACKAGE_NAME, SITE_URL } from '@/config/app';

/**
 * Single source of truth for the SEO comparison pages
 * (`/compare`, `/gupshupgo-vs-whatsapp`, `/gupshupgo-vs-telegram`).
 *
 * ## Accuracy contract
 *
 * Every GupShupGo claim here is already part of App_Feature_Set — offline
 * Bluetooth / Wi-Fi Direct mesh chat with no internet, Signal-protocol
 * end-to-end encryption on by default for chats, media, calls and status,
 * anonymous stranger chat, a PIN-protected Vault, and a built-in Gup AI
 * assistant. No GupShupGo Pro claim appears here: the app's `pro_enabled`
 * flag is off (`PRO_LAUNCHED`), so the site says nothing about tiers or
 * pricing, and GupShupGo's price is simply "Free".
 *
 * Competitor claims are deliberately conservative, current, and
 * non-disparaging. They are summarised below so a reviewer can check them in
 * one place; see `COMPARISONS_LAST_UPDATED` for the stated review date. They
 * MUST be re-verified against each competitor's own documentation before the
 * date is bumped:
 *
 *  - WhatsApp (Meta): personal chats and calls are end-to-end encrypted by
 *    default using the Signal protocol; requires an internet connection;
 *    free; proprietary (closed source); runs on Android, iOS, web and
 *    desktop. Meta AI is integrated in some regions.
 *  - Telegram: only one-to-one "Secret Chats" are end-to-end encrypted and are
 *    device-specific; default cloud chats and group chats are encrypted in
 *    transit and stored on Telegram's servers (not end-to-end encrypted);
 *    requires an internet connection; free with an optional paid Telegram
 *    Premium tier; client apps are open source while the server is proprietary;
 *    runs on Android, iOS, web and desktop; supports third-party bots.
 *
 * The Gup AI brand rule is honoured throughout: GupShupGo's assistant is
 * described only as "our own built-in assistant" and no underlying AI
 * provider or model is ever named.
 */

/** Stated review date for every competitor claim on the comparison pages. */
export const COMPARISONS_LAST_UPDATED = 'October 14, 2026';

/** The Play Store listing, built from the package name (not the CTA constant). */
const PLAY_LISTING_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;

/** One row of a two-column (GupShupGo vs competitor) comparison table. */
export interface CompareRow {
  /** The dimension being compared, used as the row header. */
  readonly label: string;
  /** GupShupGo's cell. Starting with "Yes"/"No" draws a check/cross glyph. */
  readonly gupshupgo: string;
  /** The competitor's cell. Starting with "Yes"/"No" draws a check/cross glyph. */
  readonly competitor: string;
}

/** One row of the three-column highlight table on the `/compare` index. */
export interface HighlightRow {
  readonly label: string;
  readonly gupshupgo: string;
  readonly whatsapp: string;
  readonly telegram: string;
}

export interface CompareFaq {
  readonly q: string;
  readonly a: string;
}

export interface ComparisonVisualFeature {
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly badge: string;
}

export interface ExclusiveFeature {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly whatsappStatus: string;
  readonly telegramStatus: string;
  readonly techDetail: string;
  readonly badge: string;
}

export const EXCLUSIVE_SUPERPOWERS: readonly ExclusiveFeature[] = [
  {
    id: 'mesh',
    title: 'Offline Nearby Chat',
    subtitle: 'Message nearby friends with zero internet, no mobile data, and no SIM',
    description:
      'GupShupGo lets you message nearby friends directly using Bluetooth and local Wi-Fi. Messages hop safely from device to device to reach your friends even during power blackouts, flights, and remote outdoor trips.',
    whatsappStatus: 'Impossible — strictly requires active internet or data',
    telegramStatus: 'Impossible — strictly requires active internet or data',
    techDetail: 'Nearby peer-to-peer messaging over Bluetooth & Wi-Fi',
    badge: '100% Off-Grid',
  },
  {
    id: 'streaks',
    title: 'Chat Streaks & Bonds',
    subtitle: 'Daily messaging streaks with a 24-hour restore window',
    description:
      'Build daily chat streaks called Bonds with your best friends. If life gets busy and you miss a day, GupShupGo gives you a friendly 24-hour restore window so your streak is never lost by accident.',
    whatsappStatus: 'Not available — no chat streaks or bond milestones',
    telegramStatus: 'Not available — no chat streaks or bond milestones',
    techDetail: 'Daily streak counters, friendship bonds & 24h restore window',
    badge: 'Friend Streaks',
  },
  {
    id: 'anonymous',
    title: 'Anonymous Stranger Chat',
    subtitle: 'Meet new people safely with blurred media & zero phone leaks',
    description:
      'Chat 1-on-1 with new friends under a fun random nickname. Photos, videos, and voice notes stay safely blurred until you tap them. Leave anytime with zero trace, or add each other as friends if you hit it off.',
    whatsappStatus: 'Not available — requires phone numbers and existing contacts',
    telegramStatus: 'Not available — no random anonymous stranger matchmaking',
    techDetail: 'Random nickname shield with tap-to-reveal blurred photos',
    badge: 'Anonymous Match',
  },
  {
    id: 'vault',
    title: 'PIN-Protected Secret Vault',
    subtitle: 'Keep chosen private chats locked behind a separate secret PIN',
    description:
      'Keep your most private conversations locked inside a secure vault on your device. Even if someone is holding your unlocked phone, your hidden vault conversations remain completely locked and invisible.',
    whatsappStatus: 'Basic chat lock only — opens with your main phone screen PIN',
    telegramStatus: 'Simple app passcode only — cloud chats stay on company servers',
    techDetail: 'Separate secret PIN lock that keeps private chats hidden on your phone',
    badge: 'Secret Vault',
  },
  {
    id: 'crypto-isolate',
    title: 'Silky-Smooth Speed',
    subtitle: 'Heavy security runs quietly in the background with zero lag',
    description:
      'Powerful security encryption is handled quietly behind the scenes so the app never freezes, drops frames, or stutters — keeping your texting, calling, and scrolling buttery smooth.',
    whatsappStatus: 'Can slow down or drop frames during heavy messaging',
    telegramStatus: 'Can slow down or drop frames during heavy messaging',
    techDetail: 'Runs quietly in the background for smooth, stutter-free chatting',
    badge: 'Zero Lag',
  },
  {
    id: 'arcade',
    title: 'In-Chat Games & Arcade',
    subtitle: 'Play casual mini-games with friends, earn badges & points',
    description:
      'Launch and play fun casual games directly inside your chats without downloading separate apps. Earn points for chatting and calling, complete daily challenges, and unlock cool profile badges.',
    whatsappStatus: 'No games or gamification',
    telegramStatus: 'Third-party web bots only — no native in-chat arcade',
    techDetail: 'Built-in mini-games, daily challenges, points & unlockable badges',
    badge: 'In-Chat Games',
  },
  {
    id: 'carrier-hint',
    title: 'Instant 1-Tap Sign-In',
    subtitle: 'Instant phone verification without waiting for slow SMS codes',
    description:
      'Verifies your phone number directly through your SIM card for instant login, so you never have to sit and wait around for delayed SMS verification codes.',
    whatsappStatus: 'Standard SMS timer with verification delivery delays',
    telegramStatus: 'Standard SMS timer with verification delivery delays',
    techDetail: 'Instant SIM phone number verification',
    badge: '1-Tap Sign-In',
  },
];

export interface Comparison {
  /** Clean URL slug, e.g. `gupshupgo-vs-whatsapp`. */
  readonly slug: string;
  /** Competitor display name, e.g. `WhatsApp`. */
  readonly competitor: string;
  /** `<title>` text. */
  readonly title: string;
  /** Meta description. */
  readonly metaDescription: string;
  /** The single page `<h1>`. */
  readonly h1: string;
  /** One-sentence lead under the h1. */
  readonly intro: string;
  /** Honest narrative paragraphs. */
  readonly narrative: readonly string[];
  /** Feature-comparison rows (GupShupGo vs competitor). */
  readonly rows: readonly CompareRow[];
  /** Page FAQ, mirrored into FAQPage JSON-LD. */
  readonly faq: readonly CompareFaq[];
  /** Intent keywords (no stuffing — used for the keywords meta only). */
  readonly keywords: readonly string[];
  /** Subtitle tagline for competitor. */
  readonly competitorTagline?: string;
  /** Competitor brand accent color. */
  readonly competitorBrandColor?: string;
  /** High-impact hero photo/banner image. */
  readonly coverImage?: string;
  /** Bullet highlights for quick hero scorecard. */
  readonly heroHighlights?: readonly string[];
  /** Visual screenshot showcase breakdown. */
  readonly visualFeatures?: readonly ComparisonVisualFeature[];
  /** Companion in-depth blog post slug. */
  readonly companionBlogSlug?: string;
}

const WHATSAPP: Comparison = {
  slug: 'gupshupgo-vs-whatsapp',
  competitor: 'WhatsApp',
  title: 'GupShupGo vs WhatsApp — Offline, Private Messaging Compared',
  metaDescription:
    'GupShupGo vs WhatsApp: both encrypt chats end-to-end by default, but GupShupGo also works with no internet over an offline Bluetooth mesh. An honest, up-to-date comparison.',
  h1: 'GupShupGo vs WhatsApp',
  intro:
    'Both apps encrypt your personal chats and calls end-to-end by default. The real difference is what happens when the network does not: GupShupGo keeps you chatting with nearby people over an offline Bluetooth mesh, with no internet at all.',
  competitorTagline: "Meta's global messenger with Signal protocol encryption",
  competitorBrandColor: '#25D366',
  coverImage: '/blog/gupshupgo-vs-whatsapp-cover.jpg',
  heroHighlights: [
    'Offline nearby chat that works with no internet, mobile data, or SIM',
    'Automatic end-to-end encryption by default for all chats, calls & status',
    'Smooth, stutter-free performance with zero lag during messaging',
    'PIN-protected Secret Vault to lock your most private chats on your phone',
    'In-chat casual games, chat streaks with friends, and unlockable badges',
    '100% open-source Android app code with nothing hidden',
  ],
  visualFeatures: [
    {
      title: 'Offline Nearby Chat',
      tagline: 'When networks go down, your chats keep going',
      description:
        'WhatsApp strictly requires an active internet connection or mobile data. GupShupGo relays messages directly between nearby Android devices via Bluetooth and local Wi-Fi — keeping friends, family, and teams connected at crowded concerts, treks, flights, or network outages.',
      image: '/website-screenshots/offline_chat_dark.jpeg',
      imageAlt: 'GupShupGo Offline Mesh Chat screen in dark mode',
      badge: 'GupShupGo Exclusive',
    },
    {
      title: 'PIN-Protected Secret Vault',
      tagline: 'Extra layer of defense on your own phone',
      description:
        'Beyond standard encryption, GupShupGo includes a secure Vault on your device. Choose which private chats stay hidden and locked behind a separate secret PIN, protecting your sensitive conversations even if someone holds your unlocked phone.',
      image: '/website-screenshots/vault_dark.jpeg',
      imageAlt: 'GupShupGo PIN-protected Vault screen',
      badge: 'Secret & Locked',
    },
    {
      title: 'Private by Default & Open Source',
      tagline: 'Trusted Signal protocol with verified open code',
      description:
        'Both GupShupGo and WhatsApp build upon the trusted Signal protocol. But GupShupGo goes further with encrypted status updates, smooth background security with zero UI lag, and fully open-source code under the MIT license.',
      image: '/website-screenshots/e2e_dark.jpeg',
      imageAlt: 'GupShupGo Signal Protocol end-to-end encryption confirmation',
      badge: 'Open Source MIT',
    },
  ],
  companionBlogSlug: 'gupshupgo-vs-whatsapp-honest-comparison',
  narrative: [
    'WhatsApp and GupShupGo start from the same privacy foundation. Both use the Signal protocol to end-to-end encrypt personal messages and calls by default, so on the basics of private messaging the two are close.',
    'Where GupShupGo differs is reach without a network. When there is no signal — a crowded stadium, a trek, a power cut, a flight — GupShupGo can still send messages by relaying them directly between nearby phones over Bluetooth and Wi-Fi, with no internet, no mobile data, and no SIM needed to chat. WhatsApp cannot do this because it needs an internet connection to deliver a message.',
    'GupShupGo also runs its security quietly in the background so your phone never stutters or lags, encrypts status updates end-to-end, adds in-chat casual gaming with Gup Arcade, keeps chosen chats hidden in a separate PIN-protected Secret Vault, and ships a built-in Gup AI assistant — and it is open source under the MIT license. In fairness, WhatsApp runs on more platforms today: GupShupGo is Android-only for now, while WhatsApp is also on iOS, web and desktop.',
  ],
  rows: [
    {
      label: 'Chat with no internet (offline Bluetooth / Wi-Fi Direct mesh)',
      gupshupgo: 'Yes — nearby chat with no internet or SIM',
      competitor: 'No — requires an internet connection',
    },
    {
      label: 'End-to-end encryption by default',
      gupshupgo: 'Yes — chats, media, calls & status',
      competitor: 'Yes — personal chats & calls',
    },
    {
      label: 'Encryption standard',
      gupshupgo: 'Signal protocol (trusted gold standard)',
      competitor: 'Signal protocol',
    },
    {
      label: 'Silky-smooth speed (zero lag during encryption)',
      gupshupgo: 'Yes — runs quietly in the background without lag',
      competitor: 'Standard',
    },
    {
      label: 'In-chat casual games & chat streaks',
      gupshupgo: 'Yes — Gup Arcade (games, points & friend streaks)',
      competitor: 'No',
    },
    {
      label: 'Live screen sharing in HD calls',
      gupshupgo: 'Yes — crystal-clear real-time screen sharing',
      competitor: 'Yes',
    },
    {
      label: 'Full-screen incoming calls when locked',
      gupshupgo: 'Yes — rings full-screen even when app is closed',
      competitor: 'Yes',
    },
    {
      label: 'PIN-protected Secret Vault',
      gupshupgo: 'Yes — locked behind a separate secret PIN on your phone',
      competitor: 'Partial — basic Chat Lock only',
    },
    {
      label: '24-hour stories & status replies',
      gupshupgo: 'Yes — photo & text statuses with direct in-chat replies',
      competitor: 'Yes',
    },
    {
      label: 'Instant 1-tap phone sign-in',
      gupshupgo: 'Yes — instant SIM verification without SMS delay',
      competitor: 'No — standard SMS wait code',
    },
    {
      label: 'Fast offline chat search',
      gupshupgo: 'Yes — instant on-device chat search',
      competitor: 'Yes',
    },
    {
      label: 'Anonymous stranger chat (1:1 matchmaking)',
      gupshupgo: 'Yes',
      competitor: 'No',
    },
    {
      label: 'Built-in AI assistant',
      gupshupgo: 'Gup AI (our own built-in assistant)',
      competitor: 'Meta AI (varies by region)',
    },
    {
      label: 'Price',
      gupshupgo: 'Free',
      competitor: 'Free',
    },
    {
      label: 'Open source',
      gupshupgo: 'Yes — MIT licensed',
      competitor: 'No — proprietary',
    },
    {
      label: 'Platforms',
      gupshupgo: 'Android',
      competitor: 'Android, iOS, web, desktop',
    },
    {
      label: 'Sign-up',
      gupshupgo: 'Phone number',
      competitor: 'Phone number',
    },
  ],
  faq: [
    {
      q: 'Is GupShupGo a good WhatsApp alternative?',
      a: 'GupShupGo is a private Android messenger that, like WhatsApp, encrypts your chats and calls end-to-end by default with the Signal protocol. Its standout difference is offline chat: when there is no internet or signal, GupShupGo keeps messaging nearby people over a Bluetooth and Wi-Fi Direct mesh. It is a strong fit if you want privacy by default plus messaging that survives outages, festivals, and dead zones.',
    },
    {
      q: 'Does WhatsApp work without internet?',
      a: 'No. WhatsApp needs an internet connection to send and receive messages. GupShupGo can relay messages directly between nearby phones over Bluetooth and Wi-Fi Direct with no internet, no mobile data, and no Wi-Fi router in between.',
    },
    {
      q: 'Is WhatsApp end-to-end encrypted?',
      a: 'Yes. WhatsApp encrypts personal chats and calls end-to-end by default using the Signal protocol. GupShupGo does the same for messages, media, calls, and status updates, and is open source under the MIT license.',
    },
    {
      q: 'Can I use GupShupGo on an iPhone?',
      a: 'Not yet. GupShupGo is currently available on Android, from Google Play. WhatsApp is available on more platforms today, including iOS, web, and desktop.',
    },
  ],
  keywords: [
    'WhatsApp alternative',
    'offline messaging app',
    'chat without internet',
    'Bluetooth messaging app',
    'encrypted messaging app',
    'private messenger',
  ],
};

const TELEGRAM: Comparison = {
  slug: 'gupshupgo-vs-telegram',
  competitor: 'Telegram',
  title: 'GupShupGo vs Telegram — Default Encryption & Offline Chat',
  metaDescription:
    'GupShupGo vs Telegram: GupShupGo encrypts every chat end-to-end by default and works with no internet over a Bluetooth mesh, while Telegram only encrypts Secret Chats. An honest comparison.',
  h1: 'GupShupGo vs Telegram',
  intro:
    'Telegram is fast and feature-rich, and its Secret Chats are end-to-end encrypted. The difference is the default: GupShupGo encrypts every chat, call and status end-to-end by default — and keeps working with no internet at all over a nearby Bluetooth mesh.',
  competitorTagline: 'Cloud-based messaging with channels and optional Secret Chats',
  competitorBrandColor: '#229ED9',
  coverImage: '/blog/gupshupgo-vs-telegram-cover.jpg',
  heroHighlights: [
    'Automatic end-to-end encryption by default on ALL personal chats, calls & status',
    'Zero cloud message storage — conversations never live on central servers',
    'Offline nearby chat that keeps running during server or network blackouts',
    'PIN-protected Secret Vault plus anonymous 1-on-1 stranger chat',
    'Fun in-chat mini-games with friend streaks, points, and leaderboards',
    'Silky-smooth speed that runs fast and stutter-free on any phone',
  ],
  visualFeatures: [
    {
      title: 'End-to-End Encryption by Default',
      tagline: 'No manual "Secret Chat" required',
      description:
        'Telegram stores default cloud chats on its servers. Only one-to-one "Secret Chats" use end-to-end encryption. GupShupGo makes privacy the unbreakable default for every conversation, call, and status update.',
      image: '/website-screenshots/chat_screen_dark.jpeg',
      imageAlt: 'GupShupGo encrypted chat screen with clean UI',
      badge: 'Privacy by Default',
    },
    {
      title: 'Independent of Central Servers: Offline Mesh',
      tagline: 'Off-grid communication when servers go dark',
      description:
        'If Telegram servers encounter an outage, censorship, or regional block, users are disconnected. GupShupGo can chat seamlessly peer-to-peer over local Bluetooth and Wi-Fi without touching any server or router.',
      image: '/website-screenshots/offline_chat_dark.jpeg',
      imageAlt: 'GupShupGo Offline Mesh chat screen',
      badge: 'Decentralized Mesh',
    },
    {
      title: 'Anonymous Chat & Local Data Sovereignty',
      tagline: 'Connect freely without exposing phone number',
      description:
        'GupShupGo lets you meet and chat with strangers 1-on-1 anonymously, while a secret Vault shields your private chats on your device. Telegram requires phone numbers for all accounts.',
      image: '/website-screenshots/anonymous_chat_dark.jpeg',
      imageAlt: 'GupShupGo Anonymous stranger chat interface',
      badge: 'Identity Shield',
    },
  ],
  companionBlogSlug: 'gupshupgo-vs-telegram-encryption-offline-comparison',
  narrative: [
    'Telegram and GupShupGo both offer slick, modern messaging, but they treat encryption differently by default. On Telegram, only one-to-one Secret Chats are end-to-end encrypted, and they are tied to a single device; the default cloud chats and group chats are stored on Telegram servers. On GupShupGo, every chat, call and status update is end-to-end encrypted by default with the Signal protocol — there is no separate mode to turn on.',
    'GupShupGo also works where Telegram cannot: with no connection at all. When there is no internet or mobile data, GupShupGo relays messages directly between nearby phones over Bluetooth and Wi-Fi, hopping from device to device until they arrive. Telegram needs an internet connection for everything it does.',
    'Both apps are free, and both have open-source roots — Telegram publishes its client apps while keeping its server closed, whereas GupShupGo is fully open source under the MIT license. In fairness, Telegram runs on more platforms and offers very large group features; GupShupGo is Android-only for now and focuses on private one-to-one messaging, calls, and offline reach.',
  ],
  rows: [
    {
      label: 'Chat with no internet (offline Bluetooth / Wi-Fi Direct mesh)',
      gupshupgo: 'Yes — nearby chat with no internet or SIM',
      competitor: 'No — requires an internet connection',
    },
    {
      label: 'End-to-end encryption by default',
      gupshupgo: 'Yes — chats, media, calls & status',
      competitor: 'No — only in one-to-one Secret Chats',
    },
    {
      label: 'Default cloud chats stored on company servers',
      gupshupgo: 'No — messages are not stored on our servers',
      competitor: 'Yes — default cloud chats are server-stored',
    },
    {
      label: 'Encryption standard',
      gupshupgo: 'Signal protocol (trusted gold standard)',
      competitor: 'MTProto (cloud chats not end-to-end encrypted)',
    },
    {
      label: 'Silky-smooth speed (zero lag during encryption)',
      gupshupgo: 'Yes — runs quietly in the background without lag',
      competitor: 'Standard',
    },
    {
      label: 'In-chat casual games & chat streaks',
      gupshupgo: 'Yes — Gup Arcade (games, points & friend streaks)',
      competitor: 'Partial — third-party bots only',
    },
    {
      label: 'Live screen sharing in HD calls',
      gupshupgo: 'Yes — crystal-clear real-time screen sharing',
      competitor: 'Yes',
    },
    {
      label: 'Full-screen incoming calls when locked',
      gupshupgo: 'Yes — rings full-screen even when app is closed',
      competitor: 'Yes',
    },
    {
      label: 'PIN-protected Secret Vault',
      gupshupgo: 'Yes — locked behind a separate secret PIN on your phone',
      competitor: 'Partial — simple app passcode only',
    },
    {
      label: '24-hour stories & status replies',
      gupshupgo: 'Yes — photo & text statuses with direct in-chat replies',
      competitor: 'Yes',
    },
    {
      label: 'Instant 1-tap phone sign-in',
      gupshupgo: 'Yes — instant SIM verification without SMS delay',
      competitor: 'No — standard SMS wait code',
    },
    {
      label: 'Fast offline chat search',
      gupshupgo: 'Yes — instant on-device chat search',
      competitor: 'Yes',
    },
    {
      label: 'Anonymous stranger chat (1:1 matchmaking)',
      gupshupgo: 'Yes',
      competitor: 'No',
    },
    {
      label: 'Built-in AI assistant',
      gupshupgo: 'Gup AI (our own built-in assistant)',
      competitor: 'Third-party bots & AI',
    },
    {
      label: 'Price',
      gupshupgo: 'Free',
      competitor: 'Free (optional Telegram Premium)',
    },
    {
      label: 'Open source',
      gupshupgo: 'Yes — MIT licensed (app)',
      competitor: 'Apps open source; server proprietary',
    },
    {
      label: 'Platforms',
      gupshupgo: 'Android',
      competitor: 'Android, iOS, web, desktop',
    },
    {
      label: 'Sign-up',
      gupshupgo: 'Phone number',
      competitor: 'Phone number',
    },
  ],
  faq: [
    {
      q: 'Is GupShupGo a good Telegram alternative?',
      a: 'GupShupGo is a private Android messenger that encrypts every chat, call, and status update end-to-end by default. If you like Telegram but want encryption on by default — not just in Secret Chats — and messaging that works with no internet over a Bluetooth mesh, GupShupGo is a strong alternative.',
    },
    {
      q: 'Are Telegram chats end-to-end encrypted?',
      a: 'Only Telegram’s Secret Chats are end-to-end encrypted, and they are limited to one-to-one conversations on a single device. Telegram’s default cloud chats and group chats are encrypted in transit and stored on Telegram’s servers, not end-to-end encrypted. GupShupGo encrypts every chat, call, and status update end-to-end by default.',
    },
    {
      q: 'Does Telegram work without internet?',
      a: 'No. Telegram requires an internet connection. GupShupGo can keep chatting with nearby people over an offline Bluetooth and Wi-Fi Direct mesh when there is no connection at all.',
    },
    {
      q: 'Is Telegram free?',
      a: 'Telegram is free, with an optional paid Telegram Premium subscription. GupShupGo is free to download and use on Android.',
    },
  ],
  keywords: [
    'Telegram alternative',
    'end-to-end encryption by default',
    'offline messaging app',
    'chat without internet',
    'encrypted messaging app',
    'private messenger',
  ],
};

export const COMPARISONS: readonly Comparison[] = [WHATSAPP, TELEGRAM];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((comparison) => comparison.slug === slug);
}

/**
 * Headline dimensions for the three-column table on the `/compare` index.
 * Kept here so the index and the per-competitor pages cannot drift apart.
 */
export const COMPARE_HIGHLIGHTS: readonly HighlightRow[] = [
  {
    label: 'Chat with no internet (offline Bluetooth mesh)',
    gupshupgo: 'Yes',
    whatsapp: 'No',
    telegram: 'No',
  },
  {
    label: 'End-to-end encryption by default',
    gupshupgo: 'Yes — all chats, calls & status',
    whatsapp: 'Yes — chats & calls',
    telegram: 'Secret Chats only (1:1)',
  },
  {
    label: 'PIN-protected Secret Vault',
    gupshupgo: 'Yes — separate secret PIN',
    whatsapp: 'Partial (phone PIN only)',
    telegram: 'Partial (app passcode)',
  },
  {
    label: 'In-chat games & chat streaks',
    gupshupgo: 'Yes (Gup Arcade & Bonds)',
    whatsapp: 'No',
    telegram: 'Bots only',
  },
  {
    label: 'Silky-smooth speed (zero lag)',
    gupshupgo: 'Yes — fast & stutter-free',
    whatsapp: 'Standard',
    telegram: 'Standard',
  },
  {
    label: 'Live screen sharing in HD calls',
    gupshupgo: 'Yes (HD real-time)',
    whatsapp: 'Yes',
    telegram: 'Yes',
  },
  {
    label: 'Built-in AI assistant',
    gupshupgo: 'Gup AI',
    whatsapp: 'Meta AI',
    telegram: 'Third-party bots',
  },
  {
    label: 'Price',
    gupshupgo: 'Free',
    whatsapp: 'Free',
    telegram: 'Free (+ Premium)',
  },
  {
    label: 'Open source',
    gupshupgo: 'Yes — MIT',
    whatsapp: 'No',
    telegram: 'Apps only',
  },
  {
    label: 'Platforms',
    gupshupgo: 'Android',
    whatsapp: 'Android, iOS, web, desktop',
    telegram: 'Android, iOS, web, desktop',
  },
];

/**
 * Builds the JSON-LD graph for a comparison page: a `SoftwareApplication`
 * describing GupShupGo (Android, free — no rating is claimed because none is
 * real), a `BreadcrumbList` (Home → Compare → this page), and a `FAQPage`
 * mirroring the visible FAQ.
 */
export function comparisonJsonLd(comparison: Comparison): Array<Record<string, unknown>> {
  const pageUrl = `${SITE_URL}/${comparison.slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'GupShupGo',
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'Android 8.0 and up',
      description:
        'GupShupGo is a private, end-to-end encrypted Android messenger that also works offline over a nearby Bluetooth and Wi-Fi Direct mesh.',
      url: SITE_URL,
      downloadUrl: PLAY_LISTING_URL,
      installUrl: PLAY_LISTING_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      image: `${SITE_URL}/og-image.png`,
      logo: `${SITE_URL}/app_icon.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/compare` },
        { '@type': 'ListItem', position: 3, name: comparison.h1, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: comparison.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];
}
