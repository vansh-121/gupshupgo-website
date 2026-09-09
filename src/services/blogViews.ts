/**
 * Pure Real-Time Blog Views Service with Multi-Layer Fallback
 *
 * 1. Primary: Real-time counter backed by Abacus cloud key-value store.
 * 2. Fallback: LocalStorage caching preserves the highest known view count
 *    per device if the network drops or the third-party endpoint is unreachable.
 * 3. Non-blocking: All requests use a 4-second timeout with AbortController so
 *    page renders are never delayed.
 */

const NAMESPACE = "gupshupgo-blog";
const API_BASE = "https://abacus.jasoncameron.dev";
const CACHE_PREFIX = "gsg_views_cache_";

/**
 * Reads the last known good view count from local browser storage.
 */
export function getCachedCount(slug: string): number {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  try {
    const val = localStorage.getItem(`${CACHE_PREFIX}${slug}`);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

/**
 * Persists the highest known view count to local browser storage.
 */
function setCachedCount(slug: string, count: number): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const current = getCachedCount(slug);
    if (count > current) {
      localStorage.setItem(`${CACHE_PREFIX}${slug}`, String(count));
    }
  } catch {
    // Ignored in restricted/private browsing modes
  }
}

export function formatViews(count: number, compact = false): string {
  if (compact && count >= 1000) {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toLocaleString();
}

/**
 * Fetches the current live view count for an article slug.
 * If the API is unreachable, seamlessly falls back to the locally cached count.
 */
export async function fetchArticleViews(slug: string): Promise<number> {
  if (!slug) return 0;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE}/get/${NAMESPACE}/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = (await res.json()) as { value?: number };
      if (typeof data.value === "number") {
        setCachedCount(slug, data.value);
        return data.value;
      }
    }
  } catch {
    // API failure: fall through to local cache
  }

  return getCachedCount(slug);
}

/**
 * Records a real live view on the server and returns the updated count.
 * If offline or blocked, increments the local cache so the reader's view still registers locally.
 */
export async function recordArticleView(slug: string): Promise<number> {
  if (!slug) return 0;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE}/hit/${NAMESPACE}/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = (await res.json()) as { value?: number };
      if (typeof data.value === "number") {
        setCachedCount(slug, data.value);
        return data.value;
      }
    }
  } catch {
    // API failure: increment local fallback
  }

  const localNext = getCachedCount(slug) + 1;
  setCachedCount(slug, localNext);
  return localNext;
}
