import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import Index from "@/pages/Index";
import { SECTIONS, VISIBLE_SECTIONS } from "@/data/sections";
import { renderWithProviders } from "@/test/renderWithProviders";
import { setMatchingMediaQueries } from "@/test/matchMedia";

/**
 * Landing page smoke verification (Requirements 3.1, 12.3, 12.9, 15.1, 15.6).
 *
 * Renders the real `Index` composition — eager `Hero` plus the lazy sections
 * behind the shared `Suspense` boundary — and asserts that every section the
 * page is currently allowed to render mounts, that the page emits exactly one
 * `<h1>`, and that each section's `aria-labelledby` resolves to a real heading.
 *
 * The set under test is `VISIBLE_SECTIONS`, not `SECTIONS`: the full registry
 * keeps all eleven entries so re-enabling Pro is a one-constant change, while
 * only the visible subset is actually composed by `Index.tsx`. Counts are
 * derived from the array so they hold in both states of `PRO_LAUNCHED`.
 */

vi.mock("@/integrations/supabase/client", async () => {
  const { createSupabaseClientMock } = await import("@/test/supabaseMock");
  return createSupabaseClientMock();
});

const LAST_SECTION_ID = VISIBLE_SECTIONS[VISIBLE_SECTIONS.length - 1].id;
const VISIBLE_COUNT = VISIBLE_SECTIONS.length;

async function renderLanding(theme: "light" | "dark") {
  const result = renderWithProviders(<Index />, { theme });
  // All lazy chunks have resolved once the final section is in the document.
  await waitFor(() => {
    expect(document.getElementById(LAST_SECTION_ID)).not.toBeNull();
  });
  return result;
}

describe("landing page smoke", () => {
  it(`mounts all ${VISIBLE_COUNT} visible sections in registry order`, async () => {
    await renderLanding("light");

    const rendered = VISIBLE_SECTIONS.map((section) => {
      const element = document.getElementById(section.id);
      expect(element, `missing section #${section.id}`).not.toBeNull();
      expect(element?.tagName).toBe("SECTION");
      return element as HTMLElement;
    });

    expect(rendered).toHaveLength(VISIBLE_COUNT);

    // DOM order must match the registry order.
    for (let i = 1; i < rendered.length; i += 1) {
      const relation = rendered[i - 1].compareDocumentPosition(rendered[i]);
      expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("renders no section that is gated out of the visible registry", async () => {
    await renderLanding("light");

    const visibleIds = new Set<string>(VISIBLE_SECTIONS.map((section) => section.id));
    for (const section of SECTIONS) {
      if (visibleIds.has(section.id)) continue;
      expect(
        document.getElementById(section.id),
        `gated section #${section.id} must not render`,
      ).toBeNull();
    }
  });

  it("labels every visible section with a heading that exists", async () => {
    await renderLanding("light");

    for (const section of VISIBLE_SECTIONS) {
      const element = document.getElementById(section.id) as HTMLElement;
      expect(element.getAttribute("aria-labelledby")).toBe(`${section.id}-heading`);
      expect(document.getElementById(`${section.id}-heading`)).not.toBeNull();
    }
  });

  it("renders exactly one h1", async () => {
    await renderLanding("light");

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveAttribute("id", "hero-heading");
  });

  it("renders the shell landmarks without a lazy-boundary crash", async () => {
    await renderLanding("dark");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    // The Suspense fallback must be gone once the sections resolved.
    expect(screen.queryByTestId("loading-skeleton")).toBeNull();
  });

  it("mounts every visible section with reduced motion preferred", async () => {
    setMatchingMediaQueries(["(prefers-reduced-motion: reduce)"]);
    await renderLanding("light");

    for (const section of VISIBLE_SECTIONS) {
      expect(document.getElementById(section.id)).not.toBeNull();
    }
  });
});
