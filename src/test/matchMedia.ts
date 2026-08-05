import { vi } from "vitest";

type ChangeListener = (event: MediaQueryListEvent) => void;

/**
 * Queries that currently "match". Mutable so tests can flip system
 * preferences (e.g. `(prefers-color-scheme: dark)`) at runtime and have
 * subscribers such as next-themes react to the change.
 */
const matching = new Set<string>();

interface TrackedMediaQueryList extends MediaQueryList {
  __listeners: Set<ChangeListener>;
}

const created = new Set<TrackedMediaQueryList>();

function normalise(query: string): string {
  return query.trim().replace(/\s+/g, " ").toLowerCase();
}

function createMediaQueryList(query: string): TrackedMediaQueryList {
  const listeners = new Set<ChangeListener>();
  const key = normalise(query);

  const mql = {
    media: query,
    onchange: null as ChangeListener | null,
    get matches() {
      return matching.has(key);
    },
    addEventListener: (type: string, listener: ChangeListener) => {
      if (type === "change") listeners.add(listener);
    },
    removeEventListener: (type: string, listener: ChangeListener) => {
      if (type === "change") listeners.delete(listener);
    },
    // Deprecated API, still used by some libraries.
    addListener: (listener: ChangeListener) => listeners.add(listener),
    removeListener: (listener: ChangeListener) => listeners.delete(listener),
    dispatchEvent: (event: Event) => {
      listeners.forEach((listener) => listener(event as MediaQueryListEvent));
      return true;
    },
    __listeners: listeners,
  } as unknown as TrackedMediaQueryList;

  created.add(mql);
  return mql;
}

/**
 * Installs the controllable `window.matchMedia` implementation. Safe to call
 * repeatedly; each call resets the tracked list registry.
 */
export function installMatchMedia() {
  created.clear();
  const matchMedia = vi.fn((query: string) => createMediaQueryList(query));

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: matchMedia,
  });

  return matchMedia;
}

/**
 * Replaces the set of matching media queries and notifies every live
 * `MediaQueryList` whose `matches` value changed.
 */
export function setMatchingMediaQueries(queries: string[]) {
  const next = new Set(queries.map(normalise));
  const before = new Map<TrackedMediaQueryList, boolean>();
  created.forEach((mql) => before.set(mql, mql.matches));

  matching.clear();
  next.forEach((query) => matching.add(query));

  created.forEach((mql) => {
    const wasMatching = before.get(mql) ?? false;
    if (wasMatching === mql.matches) return;
    const event = { matches: mql.matches, media: mql.media } as MediaQueryListEvent;
    mql.onchange?.(event);
    mql.__listeners.forEach((listener) => listener(event));
  });
}

/** Current matching queries, mainly useful for assertions. */
export function getMatchingMediaQueries(): string[] {
  return [...matching];
}

export function resetMatchMedia() {
  matching.clear();
  created.clear();
  installMatchMedia();
}
