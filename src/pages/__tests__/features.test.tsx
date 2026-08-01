import { beforeAll, describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";

import Index from "@/pages/Index";
import { FEATURES } from "@/data/features";
import { SECTIONS } from "@/data/sections";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * App_Feature_Set coverage (Requirements 1.3, 18.5).
 *
 * Every one of the 17 feature names must appear in the rendered Landing_Page.
 * The FeatureMarquee renders the name row twice (the duplicate is
 * `aria-hidden`), so names legitimately appear more than once — this asserts
 * presence via a text-content scan rather than uniqueness via `getByText`,
 * which would throw on the multiple matches.
 */

vi.mock("@/integrations/supabase/client", async () => {
  const { createSupabaseClientMock } = await import("@/test/supabaseMock");
  return createSupabaseClientMock();
});

const LAST_SECTION_ID = SECTIONS[SECTIONS.length - 1].id;

/**
 * Warms the module registry for the ten lazy sections so `React.lazy` resolves
 * from cache rather than the suite racing the chunk transforms.
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

function normalisedText(element: Element | null): string {
  return (element?.textContent ?? "").replace(/\s+/g, " ").trim();
}

describe("landing page feature coverage", () => {
  it("keeps the feature module at the 17 verified capabilities", () => {
    expect(FEATURES).toHaveLength(17);
    expect(new Set(FEATURES.map((feature) => feature.name)).size).toBe(17);
  });

  it("renders every feature name on the landing page", async () => {
    await renderLanding("light");

    const pageText = normalisedText(document.querySelector("main"));
    const missing = FEATURES.map((feature) => feature.name).filter(
      (name) => !pageText.includes(name),
    );

    expect(missing, `feature names missing from the page: ${missing.join(", ")}`).toEqual([]);
  });

  it("renders every feature name inside the feature overview section", async () => {
    await renderLanding("light");

    const sectionText = normalisedText(document.getElementById("features"));
    const missing = FEATURES.map((feature) => feature.name).filter(
      (name) => !sectionText.includes(name),
    );

    expect(missing, `feature names missing from #features: ${missing.join(", ")}`).toEqual([]);
  });
});
