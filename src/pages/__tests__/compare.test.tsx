import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";

import CompareIndex from "@/pages/CompareIndex";
import CompareWhatsApp from "@/pages/CompareWhatsApp";
import CompareTelegram from "@/pages/CompareTelegram";
import {
  COMPARE_HIGHLIGHTS,
  COMPARISONS,
  COMPARISONS_LAST_UPDATED,
  getComparison,
} from "@/data/comparisons";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * SEO comparison pages contract.
 *
 * Each page keeps a single <h1>, renders inside the shared shell landmarks,
 * shows every comparison row and FAQ question from the data module, exposes a
 * Download CTA and a visible "last updated" date, and injects JSON-LD with the
 * expected @types. The index links to every full comparison.
 */

function readJsonLd(): Array<Record<string, unknown>> {
  const el = document.querySelector('script[data-dynamic-seo="true"]');
  if (!el?.textContent) return [];
  const parsed = JSON.parse(el.textContent);
  return Array.isArray(parsed) ? parsed : [parsed];
}

function jsonLdTypes(): string[] {
  return readJsonLd().map((node) => String(node["@type"]));
}

function mainText(): string {
  return (document.querySelector("main")?.textContent ?? "").replace(/\s+/g, " ").trim();
}

const DETAIL_CASES = [
  ["/gupshupgo-vs-whatsapp", CompareWhatsApp, "gupshupgo-vs-whatsapp"],
  ["/gupshupgo-vs-telegram", CompareTelegram, "gupshupgo-vs-telegram"],
] as const;

describe.each(DETAIL_CASES)("comparison page %s", (route, Component, slug) => {
  const comparison = getComparison(slug)!;

  it("renders exactly one h1 with the comparison title", () => {
    renderWithProviders(<Component />, { route });
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(comparison.h1);
  });

  it("renders inside the shell landmarks", () => {
    renderWithProviders(<Component />, { route });
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows every comparison row label, both product columns, and the last-updated date", () => {
    renderWithProviders(<Component />, { route });
    const text = mainText();

    for (const row of comparison.rows) {
      expect(text, `missing row: ${row.label}`).toContain(row.label);
    }
    // Column headers for both products.
    expect(within(screen.getByRole("main")).getAllByText("GupShupGo").length).toBeGreaterThan(0);
    expect(text).toContain(comparison.competitor);
    expect(text).toContain(`Last updated: ${COMPARISONS_LAST_UPDATED}`);
  });

  it("renders every FAQ question", () => {
    renderWithProviders(<Component />, { route });
    const text = mainText();
    for (const item of comparison.faq) {
      expect(text, `missing FAQ: ${item.q}`).toContain(item.q);
    }
  });

  it("exposes a Google Play download CTA", () => {
    renderWithProviders(<Component />, { route });
    const ctas = screen.getAllByTestId("download-cta");
    expect(ctas.length).toBeGreaterThan(0);
    expect(
      ctas.some((cta) => cta.getAttribute("href")?.includes("play.google.com")),
    ).toBe(true);
  });

  it("injects SoftwareApplication, BreadcrumbList and FAQPage JSON-LD", () => {
    renderWithProviders(<Component />, { route });
    const types = jsonLdTypes();
    expect(types).toContain("SoftwareApplication");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
  });
});

describe("compare index /compare", () => {
  it("renders a single h1 and links to every full comparison", () => {
    renderWithProviders(<CompareIndex />, { route: "/compare" });

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    for (const comparison of COMPARISONS) {
      const links = screen.getAllByRole("link", {
        name: new RegExp(`GupShupGo vs ${comparison.competitor}`, "i"),
      });
      expect(
        links.some((link) => link.getAttribute("href") === `/${comparison.slug}`),
        `missing link to /${comparison.slug}`,
      ).toBe(true);
    }
  });

  it("shows every highlight row and all three product columns", () => {
    renderWithProviders(<CompareIndex />, { route: "/compare" });
    const text = mainText();

    for (const row of COMPARE_HIGHLIGHTS) {
      expect(text, `missing highlight: ${row.label}`).toContain(row.label);
    }
    expect(text).toContain("WhatsApp");
    expect(text).toContain("Telegram");
  });

  it("injects BreadcrumbList and ItemList JSON-LD", () => {
    renderWithProviders(<CompareIndex />, { route: "/compare" });
    const types = jsonLdTypes();
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("ItemList");
  });
});
