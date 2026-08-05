import { beforeAll, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import Index from "@/pages/Index";
import { FEATURES } from "@/data/features";
import { SECTIONS } from "@/data/sections";
import { renderWithProviders } from "@/test/renderWithProviders";
import { setMatchingMediaQueries } from "@/test/matchMedia";

/**
 * Reduced-motion neutralisation (Requirements 15.1, 15.4, 18.7).
 *
 * `.reveal` is the Appear_Animation *initial* state (`opacity: 0.001`,
 * `translateY(10px)`); `.reveal-in` is the revealed state. While
 * `prefers-reduced-motion: reduce` matches, no element may be left carrying
 * `.reveal` without `.reveal-in` — anything that is would be invisible content
 * behind a scroll gate, the worst regression this system can produce.
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

async function renderLandingWithReducedMotion(theme: "light" | "dark") {
  setMatchingMediaQueries(["(prefers-reduced-motion: reduce)"]);
  const result = renderWithProviders(<Index />, { theme });
  await waitFor(
    () => {
      expect(document.getElementById(LAST_SECTION_ID)).not.toBeNull();
    },
    { timeout: 10_000 },
  );
  return result;
}

function describeElement(el: Element): string {
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
  return `<${el.tagName.toLowerCase()}> "${text}"`;
}

describe("landing page under reduced motion", () => {
  it("leaves no element stuck in the Appear_Animation initial state", async () => {
    await renderLandingWithReducedMotion("light");

    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    // Sanity check: the assertion below is only meaningful if the system is live.
    expect(revealElements.length).toBeGreaterThan(0);

    const stuck = revealElements
      .filter((el) => !el.classList.contains("reveal-in"))
      .map(describeElement);

    expect(stuck, `elements left un-revealed: ${stuck.join("; ")}`).toEqual([]);
  });

  it("leaves no element stuck in the initial state in dark theme either", async () => {
    await renderLandingWithReducedMotion("dark");

    const stuck = Array.from(document.querySelectorAll(".reveal"))
      .filter((el) => !el.classList.contains("reveal-in"))
      .map(describeElement);

    expect(stuck, `elements left un-revealed: ${stuck.join("; ")}`).toEqual([]);
  });

  it("keeps the marquee present with its content reachable", async () => {
    await renderLandingWithReducedMotion("light");

    const marquee = screen.getByTestId("feature-marquee");
    expect(marquee).toBeInTheDocument();

    const marqueeText = (marquee.textContent ?? "").replace(/\s+/g, " ");
    for (const feature of FEATURES) {
      expect(marqueeText).toContain(feature.name);
    }
  });

  it("keeps every section's content readable without a scroll-dependent reveal", async () => {
    await renderLandingWithReducedMotion("light");

    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      expect(element, `missing section #${section.id}`).not.toBeNull();
      expect(
        (element?.textContent ?? "").trim().length,
        `section #${section.id} rendered no text`,
      ).toBeGreaterThan(0);
    }
  });
});
