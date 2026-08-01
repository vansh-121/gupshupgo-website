import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { setMatchingMediaQueries } from "@/test/matchMedia";
import { useReveal } from "../useReveal";

/**
 * jsdom has no IntersectionObserver and `src/test/setup.ts` installs a shared
 * no-op stub. That stub cannot deliver records, so this suite swaps in a
 * controllable one for its own duration only — setup.ts stays untouched.
 */
class FakeIntersectionObserver implements IntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  readonly root: Element | null = null;
  readonly rootMargin: string;
  readonly thresholds: number[];
  readonly elements = new Set<Element>();
  disconnectCount = 0;

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.rootMargin = options?.rootMargin ?? "0px";
    const threshold = options?.threshold ?? 0;
    this.thresholds = Array.isArray(threshold) ? threshold : [threshold];
    FakeIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.elements.add(el);
  }

  unobserve(el: Element) {
    this.elements.delete(el);
  }

  disconnect() {
    this.disconnectCount += 1;
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Delivers a record for every currently observed element. */
  emit(isIntersecting: boolean, targets?: Element[]) {
    const list = targets ?? [...this.elements];
    const entries = list.map(
      (target) =>
        ({
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
        }) as unknown as IntersectionObserverEntry,
    );
    if (entries.length === 0) return;
    act(() => {
      this.callback(entries, this);
    });
  }
}

const originalObserver = window.IntersectionObserver;

function installFakeObserver() {
  FakeIntersectionObserver.instances = [];
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: FakeIntersectionObserver,
  });
}

function rect(top: number): DOMRect {
  return { top, bottom: top + 200, left: 0, right: 300, width: 300, height: 200 } as DOMRect;
}

interface ProbeProps {
  /** Bounding rect the element reports at mount. Omit for jsdom's zero rect. */
  boundingRect?: DOMRect;
}

function Probe({ boundingRect }: ProbeProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <div
      data-testid="target"
      data-revealed={revealed ? "true" : "false"}
      className={revealed ? "reveal reveal-in" : "reveal"}
      ref={(node) => {
        if (node && boundingRect) {
          node.getBoundingClientRect = () => boundingRect;
        }
        ref(node);
      }}
    />
  );
}

const BELOW_FOLD = 5000;

beforeEach(() => {
  installFakeObserver();
});

afterEach(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: originalObserver,
  });
});

describe("useReveal", () => {
  it("stays unrevealed until the element intersects, then reveals (Req 14.1)", () => {
    render(<Probe boundingRect={rect(BELOW_FOLD)} />);
    const target = screen.getByTestId("target");

    expect(target).toHaveAttribute("data-revealed", "false");
    expect(target.className).not.toContain("reveal-in");

    const observer = FakeIntersectionObserver.instances[0];
    expect(observer.elements.has(target)).toBe(true);

    observer.emit(true);

    expect(target).toHaveAttribute("data-revealed", "true");
    expect(target.className).toContain("reveal-in");
  });

  it("reveals immediately when it mounts already inside the viewport", () => {
    render(<Probe boundingRect={rect(100)} />);

    expect(screen.getByTestId("target")).toHaveAttribute("data-revealed", "true");
    // No observer needed: the element was measured as visible at mount.
    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });

  it("reveals immediately when it mounts already scrolled past the viewport", () => {
    // An element above the fold reports isIntersecting: false, so the observer
    // alone would leave this content invisible for the whole session.
    render(<Probe boundingRect={rect(-4000)} />);

    expect(screen.getByTestId("target")).toHaveAttribute("data-revealed", "true");
    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });

  it("stays revealed after leaving the viewport again (Req 14.7)", () => {
    render(<Probe boundingRect={rect(BELOW_FOLD)} />);
    const target = screen.getByTestId("target");
    const observer = FakeIntersectionObserver.instances[0];

    observer.emit(true);
    expect(target).toHaveAttribute("data-revealed", "true");

    // First trigger unobserves and disconnects, so nothing can re-gate it.
    expect(observer.elements.size).toBe(0);
    expect(observer.disconnectCount).toBeGreaterThan(0);

    observer.emit(false, [target]);
    expect(target).toHaveAttribute("data-revealed", "true");
    expect(target.className).toContain("reveal-in");
  });

  it("renders unhidden and ungated under reduced motion (Req 15.1, 15.4)", () => {
    setMatchingMediaQueries(["(prefers-reduced-motion: reduce)"]);

    render(<Probe boundingRect={rect(BELOW_FOLD)} />);

    expect(screen.getByTestId("target")).toHaveAttribute("data-revealed", "true");
    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });

  it("reveals immediately when IntersectionObserver is unavailable", () => {
    Reflect.deleteProperty(window, "IntersectionObserver");
    render(<Probe boundingRect={rect(BELOW_FOLD)} />);
    expect(screen.getByTestId("target")).toHaveAttribute("data-revealed", "true");
  });
});
