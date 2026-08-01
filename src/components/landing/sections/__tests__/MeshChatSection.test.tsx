import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import MeshChatSection from "@/components/landing/sections/MeshChatSection";
import { MESH_STEPS } from "@/data/meshSteps";
import { renderWithProviders } from "@/test/renderWithProviders";
import { setMatchingMediaQueries } from "@/test/matchMedia";

/**
 * Sticky_Step_Section coverage (Requirements 12.3, 12.6, 12.7, 18.8).
 */

describe("MeshChatSection", () => {
  it("renders every step title and description from the data module", () => {
    renderWithProviders(<MeshChatSection />, { theme: "light" });

    expect(MESH_STEPS.length).toBeGreaterThanOrEqual(3);

    for (const step of MESH_STEPS) {
      expect(screen.getByRole("heading", { level: 3, name: step.title })).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
      expect(screen.getByText(String(step.ordinal).padStart(2, "0"))).toBeInTheDocument();
    }
  });

  it("keeps the section labelled by its own h2", () => {
    renderWithProviders(<MeshChatSection />, { theme: "light" });

    const section = document.getElementById("mesh");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe("mesh-heading");
    expect(document.getElementById("mesh-heading")?.tagName).toBe("H2");
    expect(screen.queryAllByRole("heading", { level: 1 })).toHaveLength(0);
  });

  it("retains the offline phrase contract", () => {
    renderWithProviders(<MeshChatSection />, { theme: "light" });

    const text = document.getElementById("mesh")?.textContent ?? "";
    expect(text).toContain("Bluetooth");
    expect(text).toContain("Wi-Fi Direct");
    expect(text).toContain("no internet connection");
    expect(text).toMatch(/multi-hop/i);
  });

  it("pins a single swapping visual when motion is allowed", () => {
    setMatchingMediaQueries([]);
    renderWithProviders(<MeshChatSection />, { theme: "light" });

    expect(screen.getByTestId("mesh-pinned-visual")).toBeInTheDocument();
    // First step is active before any scrolling.
    const steps = document.querySelectorAll("[data-step-index]");
    expect(steps[0]?.getAttribute("data-active")).toBe("true");
  });

  it("renders one unpinned column with every step visual under reduced motion", () => {
    setMatchingMediaQueries(["(prefers-reduced-motion: reduce)"]);
    renderWithProviders(<MeshChatSection />, { theme: "light" });

    expect(screen.queryByTestId("mesh-pinned-visual")).toBeNull();
    expect(screen.getAllByTestId("mesh-step-visual")).toHaveLength(MESH_STEPS.length);

    document.querySelectorAll("[data-step-index]").forEach((step) => {
      expect(step.getAttribute("data-active")).toBe("false");
    });
  });
});
