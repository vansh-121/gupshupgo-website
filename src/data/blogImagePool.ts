/**
 * Curated Pool of High-Quality Unsplash Images & Smart Keyword Matching
 * Adapted from the production-grade image configuration in locksy-website.
 *
 * Provides:
 *  - Categorized, high-resolution Unsplash images with exact w=1200&h=630&fit=crop parameters
 *  - Smart tokenized keyword scoring (scoreImageByKeywords)
 *  - Automatic anti-duplication tracking so every blog post gets a distinct, relevant image
 *  - Domain-specific coverage for Offline Mesh, Signal Protocol, On-Device Vault, HD Calling,
 *    Chat Streaks, Anonymous Chat, and Messenger Comparisons.
 */

export interface PoolImage {
  readonly url: string;
  readonly alt: string;
  readonly tags: readonly string[];
}

export const COVER_IMAGE_POOL: readonly PoolImage[] = [
  // ─── 1. Offline Mesh, Wilderness, Off-Grid & Bluetooth ─────────────────────
  {
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Hiker with backpack trekking across scenic mountain range with no cellular reception",
    tags: ["offline", "mesh", "hiking", "mountains", "trekking", "off-grid", "wilderness", "adventure", "remote", "no-signal"],
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Packed music festival crowd holding up smartphones in a congested cellular network",
    tags: ["festival", "concert", "crowd", "stadium", "phones", "congested", "offline-chat", "mesh-network", "bluetooth", "events"],
  },
  {
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Camping tent illuminated under starry night sky away from cellular infrastructure",
    tags: ["camping", "tent", "stars", "night", "off-grid", "wilderness", "survival", "emergency", "mesh", "bluetooth-low-energy"],
  },
  {
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Road trip through open desert canyon where cell towers are out of reach",
    tags: ["travel", "roadtrip", "desert", "flight", "airplane", "disconnected", "offline-messaging", "remote-area", "dead-zone"],
  },
  {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Travelers in a boat on a serene mountain lake surrounded by pine forests",
    tags: ["lake", "nature", "outdoor", "hiking", "travel", "no-internet", "offgrid", "p2p", "local-mesh"],
  },
  {
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Massive stadium crowd enjoying live event with bright lights and smartphones",
    tags: ["stadium", "sports", "fans", "crowded", "network-congestion", "cell-tower", "bottleneck", "nearby-chat"],
  },
  {
    url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Emergency flashlight beam cutting through darkness during power outage",
    tags: ["emergency", "blackout", "power-outage", "storm", "disaster", "resilience", "flood", "offline-communication", "survivability"],
  },

  // ─── 2. Privacy, Cryptography, Signal Protocol & Metadata ───────────────────
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Encrypted matrix data streams glowing on a dark terminal screen",
    tags: ["encryption", "cryptography", "signal-protocol", "matrix", "code", "double-ratchet", "mathematical-privacy", "forward-secrecy"],
  },
  {
    url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Futuristic digital security shield protecting confidential data",
    tags: ["security", "shield", "digital", "protection", "firewall", "cybersecurity", "zero-knowledge", "audit", "open-source"],
  },
  {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Abstract blue and cyan data network lines representing peer-to-peer encryption",
    tags: ["network", "protocol", "metadata", "e2e", "signal", "transit", "packets", "nodes", "decentralized"],
  },
  {
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Fiber optic cables with glowing data light streams representing private channels",
    tags: ["fiber", "cables", "speed", "data-protection", "bandwidth", "telecom", "infrastructure", "wiretap-defense"],
  },
  {
    url: "https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Close-up of human eye reflecting digital surveillance and online tracking",
    tags: ["surveillance", "tracking", "metadata", "privacy-leaks", "big-tech", "telemetry", "watcher", "eye", "spyware"],
  },
  {
    url: "https://images.unsplash.com/photo-1609763418275-e0ff6edba5af?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Antique brass key turning inside an intricate mechanical lock",
    tags: ["key", "lock", "public-key", "private-key", "cryptographic-keys", "credentials", "access-control", "handshake"],
  },

  // ─── 3. App Locker, On-Device Vault & Biometric Security ────────────────────
  {
    url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Heavy steel padlock resting on a modern laptop keyboard",
    tags: ["padlock", "lock", "laptop", "security", "passcode", "protection", "hardware-security", "lock-screen"],
  },
  {
    url: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Biometric fingerprint scanner glowing blue on smartphone screen",
    tags: ["fingerprint", "biometrics", "vault", "argon2id", "pin", "unlock", "passcode", "fingerprint-lock", "on-device"],
  },
  {
    url: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Sleek smartphone with black screen lying on dark desk",
    tags: ["smartphone", "mobile", "locked-phone", "screen-lock", "app-locker", "hide-chats", "vault-app", "unlocked-phone"],
  },
  {
    url: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Person carefully entering confidential PIN code on smartphone",
    tags: ["pin-code", "password", "confidential", "secret-chat", "shoulder-surfing", "privacy-screen", "hidden-chats"],
  },
  {
    url: "https://images.unsplash.com/photo-1584433144859-1ea3ab64a082?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "High-security bank vault door with heavy steel locking bolts",
    tags: ["vault", "safe", "secure-storage", "argon2id", "zero-knowledge", "unhackable", "bank-grade", "local-storage"],
  },

  // ─── 4. HD Video & Audio Calling, WebRTC, Noise Suppression ────────────────
  {
    url: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Smiling person having an HD video call on their mobile screen",
    tags: ["video-call", "hd-calling", "mobile-call", "screen-sharing", "webrtc", "unlimited-calls", "free-calls", "crystal-clear"],
  },
  {
    url: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Laptop screen displaying a multi-person video conference call",
    tags: ["video-conference", "group-call", "team-meeting", "screen-sharing", "adaptive-bitrate", "callkit"],
  },
  {
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Studio headphones close-up representing high-fidelity noise cancellation",
    tags: ["audio", "headphones", "noise-suppression", "voice-clarity", "acoustic", "mic", "low-latency", "3g-calling"],
  },
  {
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Audio mixing console with equalizer levels and sound waves",
    tags: ["sound-waves", "equalizer", "audio-priority", "bitrate", "streaming", "packet-loss", "calling-engine"],
  },
  {
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Professional smiling while walking through city on video call",
    tags: ["walking", "city", "cellular-data", "4g", "5g", "adaptive-video", "mobile-freedom"],
  },

  // ─── 5. Chat Streaks, Friendship, Café Texting & Micro-Habits ──────────────
  {
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Two close friends laughing outdoors while checking their mobile phones",
    tags: ["friends", "friendship", "chat-streaks", "chat-bonds", "laughing", "social", "connection", "messaging-habits", "youth"],
  },
  {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Young woman happily chatting on smartphone in bright natural light",
    tags: ["texting", "chatting", "happy", "daily-bonds", "gamification", "arcade", "streaks", "community"],
  },
  {
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Group of diverse friends laughing and talking together at sunset",
    tags: ["group-chat", "friends-hangout", "sunset", "social-life", "healthy-habits", "relationship-building"],
  },
  {
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Cozy café wooden table with coffee cup and smartphone displaying chat",
    tags: ["cafe", "coffee", "cozy", "quiet-texting", "relaxation", "calm", "notification-stress", "mindful-chat"],
  },

  // ─── 6. Anonymous Stranger Chat & Safe Online Identity ──────────────────────
  {
    url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Silhouette of person behind frosted glass symbolizing anonymous identity",
    tags: ["anonymity", "anonymous-chat", "incognito", "silhouette", "stranger-chat", "identity-protection", "no-phone-number"],
  },
  {
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Cyberpunk neon city street at night representing private digital corridors",
    tags: ["neon", "cyberpunk", "night-city", "mystery", "strangers", "digital-privacy", "shield"],
  },
  {
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Person sitting at desk with notebook and smartphone in thoughtful reflection",
    tags: ["venting", "mental-health", "safe-space", "confide", "conversations", "non-judgmental", "wellness"],
  },
  {
    url: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Artistic theatrical mask symbolizing digital persona vs real identity",
    tags: ["mask", "persona", "alias", "avatar", "no-real-name", "dating-safety", "online-safety"],
  },

  // ─── 7. Messenger Comparisons & WhatsApp / Telegram Showdowns ───────────────
  {
    url: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Multiple smartphones side by side showing app comparison interface",
    tags: ["comparison", "vs", "whatsapp", "telegram", "apps-comparison", "alternatives", "showdown", "best-apps"],
  },
  {
    url: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Massive modern cloud server rack with glowing status LEDs representing server-stored cloud chats",
    tags: ["server", "cloud-storage", "telegram-servers", "centralized", "data-centers", "server-outage", "subpoena"],
  },
  {
    url: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Smartphones displaying messaging app chat bubbles and notification badges",
    tags: ["chat-app", "messaging-apps", "whatsapp-alternative", "telegram-alternative", "india-privacy", "switch-apps"],
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Digital padlock and cyber security network visualization",
    tags: ["security-comparison", "encryption-standards", "audit", "privacy-policy", "terms-of-service", "data-sharing"],
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop&auto=format&q=80",
    alt: "Clean modern desk setup with developer laptop and tablet displaying code",
    tags: ["open-source", "mit-license", "code-audit", "developer", "inspect-code", "technology", "client-app"],
  },
];

/**
 * Curated Pool of Inline Section Images for Article Bodies
 */
export const INLINE_IMAGE_POOL: readonly PoolImage[] = [
  {
    url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Padlock resting securely on a modern laptop keyboard",
    tags: ["security", "padlock", "encryption", "vault", "lock"],
  },
  {
    url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Digital shield protecting private data in real time",
    tags: ["shield", "protection", "firewall", "safety"],
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Encrypted code stream flowing across a terminal",
    tags: ["matrix", "encryption", "signal-protocol", "code"],
  },
  {
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Hiker navigating wilderness mountain trail with smartphone",
    tags: ["mesh", "offline", "hiking", "offgrid", "outdoor"],
  },
  {
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Two friends laughing while sending messages in a cafe",
    tags: ["friends", "chat", "streaks", "social", "texting"],
  },
  {
    url: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Person smiling during an HD video call",
    tags: ["video-call", "calling", "hd", "screen-sharing"],
  },
  {
    url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Anonymity silhouette behind frosted privacy glass",
    tags: ["anonymous", "identity", "incognito", "stranger"],
  },
  {
    url: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&h=450&fit=crop&auto=format&q=80",
    alt: "Smartphones side-by-side comparing applications",
    tags: ["comparison", "vs", "whatsapp", "telegram", "apps"],
  },
];

/**
 * Score an image against a combined keyword string (title, tags, categories).
 * Word-token matching: exact match = 3 pts, substring = 1 pt.
 */
export function scoreImageByKeywords(img: PoolImage, keywordString: string): number {
  if (!keywordString || !img.tags) return 0;
  const normalize = (s: string) => s.toLowerCase().replace(/[-_,]/g, " ");
  const tokens = normalize(keywordString)
    .split(/\s+/)
    .filter((t) => t.length > 2);
  const tagNorm = img.tags.map(normalize);

  let score = 0;
  for (const token of tokens) {
    for (const tag of tagNorm) {
      if (tag === token) {
        score += 3;
        break;
      }
      if (tag.includes(token) || token.includes(tag)) {
        score += 1;
        break;
      }
    }
  }
  return score;
}

/**
 * Returns the best-matching, non-duplicated cover image for a blog topic.
 * Avoids any image already in `usedUrls` whenever possible.
 */
export function getContentRelatedCoverImage(
  keywordString: string,
  usedUrls: Set<string> = new Set(),
): PoolImage {
  // Filter out already used images to prevent repetition
  const availableImages = COVER_IMAGE_POOL.filter((img) => !usedUrls.has(img.url));
  const pool = availableImages.length > 0 ? availableImages : COVER_IMAGE_POOL;

  if (keywordString) {
    const scored = pool
      .map((img) => ({ img, score: scoreImageByKeywords(img, keywordString) }))
      .sort((a, b) => b.score - a.score);

    const topScore = scored[0]?.score ?? 0;
    if (topScore > 0) {
      // Pick top-scoring candidate
      const candidates = scored.filter((s) => s.score >= Math.max(1, topScore - 1)).map((s) => s.img);
      return candidates[0] || pool[0];
    }
  }

  // Fallback to first available pool image
  return pool[0];
}

/**
 * Returns a contextual inline image for article sections.
 */
export function getContentRelatedInlineImage(
  keywordString: string,
  usedUrls: Set<string> = new Set(),
): PoolImage {
  const available = INLINE_IMAGE_POOL.filter((img) => !usedUrls.has(img.url));
  const pool = available.length > 0 ? available : INLINE_IMAGE_POOL;

  if (keywordString) {
    const scored = pool
      .map((img) => ({ img, score: scoreImageByKeywords(img, keywordString) }))
      .sort((a, b) => b.score - a.score);

    if (scored[0] && scored[0].score > 0) {
      return scored[0].img;
    }
  }

  return pool[0];
}
