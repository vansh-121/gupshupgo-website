import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";
import { installMatchMedia, resetMatchMedia } from "./matchMedia";

export {
  installMatchMedia,
  setMatchingMediaQueries,
  getMatchingMediaQueries,
  resetMatchMedia,
} from "./matchMedia";

installMatchMedia();

// jsdom implements neither of these; Radix primitives and the in-page
// navigation both rely on them.
Element.prototype.scrollIntoView = vi.fn();

class StubObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: StubObserver,
});
Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: StubObserver,
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: StubObserver,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: StubObserver,
});

beforeEach(() => {
  resetMatchMedia();
});

afterEach(() => {
  // Theme state must not leak between tests.
  window.localStorage.clear();
  window.sessionStorage.clear();
  document.documentElement.className = "";
  document.documentElement.removeAttribute("style");
  resetMatchMedia();
});
