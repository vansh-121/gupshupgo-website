import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import ThemeToggle from "@/components/ThemeToggle";
import { renderWithProviders } from "@/test/renderWithProviders";
import { setMatchingMediaQueries } from "@/test/matchMedia";

/**
 * Theme toggle smoke verification (Requirements 2.3, 2.4, 2.6, 15.4).
 *
 * Uses the real next-themes provider from `renderWithProviders`, so the
 * assertions cover the actual `documentElement` class write and the
 * `gsg-theme` localStorage persistence rather than a stub.
 */

const THEME_STORAGE_KEY = "gsg-theme";

async function renderToggle() {
  renderWithProviders(<ThemeToggle />, { theme: "system" });
  // The `mounted` guard renders a placeholder on the first pass.
  return screen.findByRole("button");
}

describe("theme toggle smoke", () => {
  it("flips documentElement.className and persists the choice", async () => {
    setMatchingMediaQueries([]); // system resolves to light
    const button = await renderToggle();

    await waitFor(() => {
      expect(document.documentElement.className).toContain("light");
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(document.documentElement.className).toContain("dark");
    });
    expect(document.documentElement.className).not.toContain("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    fireEvent.click(await screen.findByRole("button"));

    await waitFor(() => {
      expect(document.documentElement.className).toContain("light");
    });
    expect(document.documentElement.className).not.toContain("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("names the action and the current theme", async () => {
    setMatchingMediaQueries([]);
    const button = await renderToggle();

    await waitFor(() => {
      expect(button).toHaveAccessibleName("Switch to dark theme (currently light)");
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveAccessibleName(
        "Switch to light theme (currently dark)",
      );
    });
  });

  it("starts from the dark system preference", async () => {
    setMatchingMediaQueries(["(prefers-color-scheme: dark)"]);
    const button = await renderToggle();

    await waitFor(() => {
      expect(document.documentElement.className).toContain("dark");
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    });
    expect(document.documentElement.className).toContain("light");
  });
});
