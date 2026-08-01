import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import Index from "@/pages/Index";
import { PLAY_STORE_URL } from "@/config/app";
import { SECTIONS } from "@/data/sections";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * Download CTA smoke verification (Requirements 7.3, 7.4, 7.5, 15.3).
 *
 * Every rendered `download-cta` anchor must point at the same Play Store
 * listing and open in a new tab with the `noopener noreferrer` guard.
 */

vi.mock("@/integrations/supabase/client", async () => {
  const { createSupabaseClientMock } = await import("@/test/supabaseMock");
  return createSupabaseClientMock();
});

const LAST_SECTION_ID = SECTIONS[SECTIONS.length - 1].id;

describe("download CTA smoke", () => {
  it("resolves every CTA to the Play Store listing in a safe new tab", async () => {
    renderWithProviders(<Index />, { theme: "light" });
    await waitFor(() => {
      expect(document.getElementById(LAST_SECTION_ID)).not.toBeNull();
    });

    const ctas = screen.getAllByTestId("download-cta");
    // Header, hero, and closing section at a minimum.
    expect(ctas.length).toBeGreaterThanOrEqual(3);

    expect(PLAY_STORE_URL).toBe(
      "https://play.google.com/store/apps/details?id=com.gupshupgo.app",
    );

    for (const cta of ctas) {
      expect(cta.tagName).toBe("A");
      expect(cta).toHaveAttribute("href", PLAY_STORE_URL);
      expect(cta).toHaveAttribute("target", "_blank");

      const rel = (cta.getAttribute("rel") ?? "").split(/\s+/);
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");

      expect(cta.textContent?.trim()).not.toBe("");
    }
  });
});
