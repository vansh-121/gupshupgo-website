import { beforeAll, describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";

import Index from "@/pages/Index";
import { FEATURES, VISIBLE_FEATURES } from "@/data/features";
import { VISIBLE_SECTIONS } from "@/data/sections";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * App_Feature_Set coverage (Requirements 1.3, 18.5).
 *
 * Every feature name the site is currently allowed to show — `VISIBLE_FEATURES`,
 * i.e. all 17 once `PRO_LAUNCHED` is true and the 16 non-Pro capabilities while
 * it is false — must appear in the rendered Landing_Page. The full `FEATURES`
 * registry is asserted separately: it must keep all 17 entries so flipping the
 * flag restores the Pro capability without re-authoring data.
 *
 * The FeatureMarquee renders the name row twice (the duplicate is
 * `aria-hidden`), so names legitimately appear more than once — this asserts
 * presence via a text-content scan rather than uniqueness via `getByText`,
 * which would throw on the multiple matches.
 */

vi.mock("@/integrations/supabase/client", async () => {
  const { createSupabaseClientMock } = await import("@/test/supabaseMock");
  return createSupabaseClientMock();
});

const LAST_SECTION_ID = VISIBLE_SECTIONS[VISIBLE_SECTIONS.length - 1].id;

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
    // The full registry must stay intact for when PRO_LAUNCHED flips.
    expect(FEATURES).toHaveLength(17);
    expect(new Set(FEATURES.map((feature) => feature.name)).size).toBe(17);
  });

  it("renders every visible feature name on the landing page", async () => {
    await renderLanding("light");

    const pageText = normalisedText(document.querySelector("main"));
    const missing = VISIBLE_FEATURES.map((feature) => feature.name).filter(
      (name) => !pageText.includes(name),
    );

    expect(missing, `feature names missing from the page: ${missing.join(", ")}`).toEqual([]);
  });

  it("renders every visible feature name inside the feature overview section", async () => {
    await renderLanding("light");

    const sectionText = normalisedText(document.getElementById("features"));
    const missing = VISIBLE_FEATURES.map((feature) => feature.name).filter(
      (name) => !sectionText.includes(name),
    );

    expect(missing, `feature names missing from #features: ${missing.join(", ")}`).toEqual([]);
  });

  it("renders one grid cell per visible feature and none for the rest", async () => {
    await renderLanding("light");

    const section = document.getElementById("features") as HTMLElement;
    const visibleIds = new Set(VISIBLE_FEATURES.map((feature) => feature.id));

    for (const feature of FEATURES) {
      const card = section.querySelector(`[data-testid="feature-card-${feature.id}"]`);
      if (visibleIds.has(feature.id)) {
        expect(card, `missing card for ${feature.id}`).not.toBeNull();
      } else {
        expect(card, `unexpected card for hidden feature ${feature.id}`).toBeNull();
      }
    }
  });
});
