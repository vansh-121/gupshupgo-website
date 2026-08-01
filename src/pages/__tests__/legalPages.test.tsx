import type { ComponentType } from "react";
import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";

import DeleteAccount from "@/pages/DeleteAccount";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import { renderWithProviders } from "@/test/renderWithProviders";

/**
 * Legal and not-found route contract (Requirements 3.7, 10.1, 10.2, 10.5).
 *
 * Each route keeps a single `<h1>`, renders inside the shared shell landmarks,
 * retains its substantive copy, and renders identically in both themes.
 *
 * `vansh.sethi98760@gmail.com` is the support address; only `DeleteAccount`
 * carries it — the privacy and terms pages route contact through GitHub — so it
 * is asserted where the page actually renders it.
 */

const SUPPORT_EMAIL = "vansh.sethi98760@gmail.com";

/** The four numbered steps of the deletion request (DeleteAccount). */
const DELETION_STEPS = [
  "Send an email to",
  "Use the subject line:",
  "In the body, include your registered phone number and display name",
  "You will receive a confirmation email",
] as const;

type LegalCase = readonly [
  route: string,
  Component: ComponentType,
  headingText: string,
  retainedPhrases: readonly string[],
];

const CASES: readonly LegalCase[] = [
  [
    "/privacy",
    PrivacyPolicy,
    "Privacy Policy",
    [
      "Information We Collect",
      "How We Use Your Information",
      "Third-Party Services",
      "Data Security",
      "Children's Privacy",
      "github.com/vansh-121/GupShupGo",
    ],
  ],
  [
    "/terms",
    TermsOfService,
    "Terms of Service",
    [
      "Acceptance of Terms",
      "Acceptable Use",
      "Limitation of Liability",
      "MIT License",
      "github.com/vansh-121/GupShupGo/issues",
    ],
  ],
  [
    "/delete-account",
    DeleteAccount,
    "Delete Account",
    [
      SUPPORT_EMAIL,
      "permanent and irreversible",
      "Data That Will Be Deleted",
      "Data That May Be Retained",
      "7 business days",
      ...DELETION_STEPS,
    ],
  ],
  [
    "/definitely-not-a-route",
    NotFound,
    "Page not found",
    ["Error 404", "Back to home", "/definitely-not-a-route"],
  ],
];

const THEMES = ["light", "dark"] as const;

function pageText(): string {
  return (document.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

// NotFound logs the unmatched path on mount; keep the run output clean.
vi.spyOn(console, "error").mockImplementation(() => undefined);

describe.each(THEMES)("legal and not-found routes (%s theme)", (theme) => {
  it.each(CASES)(
    "%s renders its single h1, retained copy, and the shell landmarks",
    (route, Component, headingText, retainedPhrases) => {
      renderWithProviders(<Component />, { theme, route });

      const h1s = screen.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent(headingText);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();

      const text = pageText();
      const missing = retainedPhrases.filter((phrase) => !text.includes(phrase));
      expect(missing, `missing copy on ${route}: ${missing.join(" | ")}`).toEqual([]);
    },
  );
});

describe("DeleteAccount specifics", () => {
  it("renders the four deletion steps as an ordered list", () => {
    renderWithProviders(<DeleteAccount />, { theme: "light", route: "/delete-account" });

    const steps = screen.getAllByRole("listitem").filter((item) => item.closest("ol"));
    expect(steps).toHaveLength(DELETION_STEPS.length);

    steps.forEach((step, index) => {
      expect((step.textContent ?? "").replace(/\s+/g, " ")).toContain(DELETION_STEPS[index]);
    });
  });

  it("links to the Privacy Policy route that actually exists", () => {
    renderWithProviders(<DeleteAccount />, { theme: "light", route: "/delete-account" });

    // Regression guard: this previously pointed at `/privacy-policy`, which has
    // no route in `App.tsx` and therefore fell through to the 404 page. Scoped
    // to `main` because the footer carries its own Privacy Policy link.
    const link = within(screen.getByRole("main")).getByRole("link", { name: "Privacy Policy" });
    expect(link).toHaveAttribute("href", "/privacy");
  });
});
