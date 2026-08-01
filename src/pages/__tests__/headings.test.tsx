import { beforeAll, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import Index from "@/pages/Index";
import { SECTIONS } from "@/data/sections";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * Heading hierarchy (Requirements 1.7, 18.4).
 *
 * The Landing_Page must expose exactly one level-1 heading and must not skip a
 * heading level: walking every heading in document order, no heading's level may
 * exceed the previous heading's level by more than one. Going back *up* the
 * outline (h3 → h2, as the footer columns do) is always legal.
 */

vi.mock("@/integrations/supabase/client", async () => {
  const { createSupabaseClientMock } = await import("@/test/supabaseMock");
  return createSupabaseClientMock();
});

const LAST_SECTION_ID = SECTIONS[SECTIONS.length - 1].id;
const THEMES = ["light", "dark"] as const;

/**
 * Warms the module registry for the ten lazy sections so `React.lazy` resolves
 * from cache. Without this the suite races the chunk transforms rather than the
 * behaviour under test.
 */
beforeAll(async () => {
  await Promise.all([
    import("@/components/landing/sections/FeatureOverview"),
    import("@/components/landing/sections/MeshChatSection"),
    import("@/components/landing/sections/ArcadeSection"),
    import("@/components/landing/sections/PrivacySection"),
    import("@/components/landing/sections/CallingSection"),
    import("@/components/landing/sections/AnonymousChatSection"),
    import("@/components/landing/sections/ProSection"),
    import("@/components/landing/sections/TrustSection"),
    import("@/components/landing/sections/NewsletterSection"),
    import("@/components/landing/sections/DownloadClose"),
  ]);
});

async function renderLanding(theme: "light" | "dark") {
  const result = renderWithProviders(<Index />, { theme });
  await waitFor(
    () => {
      expect(document.getElementById(LAST_SECTION_ID)).not.toBeNull();
    },
    { timeout: 10_000 },
  );
  return result;
}

interface HeadingRecord {
  level: number;
  tag: string;
  text: string;
}

function headingsInDocumentOrder(): HeadingRecord[] {
  return Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((el) => ({
    level: Number(el.tagName.slice(1)),
    tag: el.tagName.toLowerCase(),
    text: (el.textContent ?? "").replace(/\s+/g, " ").trim(),
  }));
}

describe.each(THEMES)("landing page heading hierarchy (%s theme)", (theme) => {
  it("exposes exactly one level-1 heading", async () => {
    await renderLanding(theme);

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);

    const headings = headingsInDocumentOrder();
    expect(headings.length).toBeGreaterThan(1);
    // The single h1 must also be the first heading in the document.
    expect(headings[0].level).toBe(1);
  });

  it("skips no heading level in document order", async () => {
    await renderLanding(theme);

    const headings = headingsInDocumentOrder();
    const skips: string[] = [];

    for (let i = 1; i < headings.length; i += 1) {
      const previous = headings[i - 1];
      const current = headings[i];
      if (current.level - previous.level > 1) {
        skips.push(
          `<${previous.tag}> "${previous.text}" is followed by <${current.tag}> "${current.text}"`,
        );
      }
    }

    expect(skips, `skipped heading levels: ${skips.join("; ")}`).toEqual([]);
  });
});
