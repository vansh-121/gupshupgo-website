import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";

import FeatureMarquee from "@/components/FeatureMarquee";
import { FEATURES } from "@/data/features";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * Marquee content contract (Requirements 13.1, 13.2, 18.9).
 *
 * Items come from `src/data/features.ts`. The row is rendered twice so the
 * CSS `translateX(0 → -50%)` loop is seamless; the duplicate is `aria-hidden`,
 * so the accessible tree exposes each name exactly once.
 */

function rows(): HTMLElement[] {
  const marquee = screen.getByTestId("feature-marquee");
  return Array.from(marquee.querySelectorAll("ul"));
}

describe("FeatureMarquee", () => {
  it("renders the feature names from the data module", () => {
    renderWithProviders(<FeatureMarquee />, { theme: "light" });

    const text = (screen.getByTestId("feature-marquee").textContent ?? "").replace(/\s+/g, " ");
    for (const feature of FEATURES) {
      expect(text).toContain(feature.name);
    }
  });

  it("renders exactly two rows with the duplicate hidden from assistive tech", () => {
    renderWithProviders(<FeatureMarquee />, { theme: "light" });

    const [accessible, duplicate, ...extra] = rows();
    expect(extra).toHaveLength(0);
    expect(accessible).toBeDefined();
    expect(duplicate).toBeDefined();
    expect(accessible).not.toHaveAttribute("aria-hidden");
    expect(duplicate).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes each feature name exactly once in the accessible row", () => {
    renderWithProviders(<FeatureMarquee />, { theme: "light" });

    const [accessible] = rows();
    const scope = within(accessible);

    expect(scope.getAllByRole("listitem")).toHaveLength(FEATURES.length);

    for (const feature of FEATURES) {
      expect(scope.getAllByText(feature.name)).toHaveLength(1);
    }

    // The hidden duplicate must not add names to the accessible tree.
    expect(screen.getAllByRole("listitem")).toHaveLength(FEATURES.length);
  });
});
