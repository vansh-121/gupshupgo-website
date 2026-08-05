import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";

type Listener = (event: MediaQueryListEvent) => void;

function installMatchMedia(initialMatches: boolean) {
  const listeners = new Set<Listener>();

  const matchMedia = vi.fn((query: string) => ({
    media: query,
    matches: initialMatches,
    onchange: null,
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    addListener: (listener: Listener) => listeners.add(listener),
    removeListener: (listener: Listener) => listeners.delete(listener),
    dispatchEvent: () => false,
  }));

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: matchMedia,
  });

  return {
    matchMedia,
    emit(matches: boolean) {
      listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
    },
    get listenerCount() {
      return listeners.size;
    },
  };
}

afterEach(() => {
  Reflect.deleteProperty(window, "matchMedia");
  vi.restoreAllMocks();
});

describe("usePrefersReducedMotion", () => {
  it("reports false when the reduce query does not match", () => {
    installMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("reports true when the reduce query matches", () => {
    installMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("queries prefers-reduced-motion: reduce", () => {
    const mm = installMatchMedia(false);
    renderHook(() => usePrefersReducedMotion());
    expect(mm.matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("updates when the preference changes", () => {
    const mm = installMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => mm.emit(true));
    expect(result.current).toBe(true);

    act(() => mm.emit(false));
    expect(result.current).toBe(false);
  });

  it("removes its listener on unmount", () => {
    const mm = installMatchMedia(false);
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    expect(mm.listenerCount).toBe(1);
    unmount();
    expect(mm.listenerCount).toBe(0);
  });

  it("defaults to reduced motion when matchMedia is unavailable", () => {
    Reflect.deleteProperty(window, "matchMedia");
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });
});
