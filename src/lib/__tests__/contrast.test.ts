import { describe, expect, it } from "vitest";

import {
  CONTRAST_PAIRS,
  SURFACE_BANDS,
  THEMES,
  WCAG_AA_NORMAL_TEXT,
  contrastRatio,
  pairAppliesTo,
  pairRatio,
  pillNavBackdrop,
  resolveToken,
  type ContrastPair,
  type Theme,
} from "@/lib/contrast";
import { readTokens } from "@/test/readTokens";

/**
 * Executes the Contrast_Pairs_Table (Requirement 18.1).
 *
 * jsdom loads no CSS, so each theme's tokens are parsed out of the stylesheet
 * that actually ships rather than read from `getComputedStyle`.
 */

const THEME_SELECTOR: Record<Theme, string> = {
  light: ":root",
  dark: ".dark",
};

const TOKENS: Record<Theme, Record<string, string>> = {
  light: readTokens(THEME_SELECTOR.light),
  dark: readTokens(THEME_SELECTOR.dark),
};

/** `usage` is long; a short stable label keeps the test names readable. */
function label(pair: ContrastPair, index: number): string {
  return `#${index} ${pair.foreground} on ${pair.background} (>=${pair.minRatio}:1)`;
}

describe("CONTRAST_PAIRS table", () => {
  it("is non-empty", () => {
    expect(CONTRAST_PAIRS.length).toBeGreaterThan(0);
  });

  it("applies every entry to at least one theme", () => {
    for (const pair of CONTRAST_PAIRS) {
      expect(
        THEMES.some((theme) => pairAppliesTo(pair, theme)),
        `${pair.foreground} on ${pair.background} applies to no theme`,
      ).toBe(true);
    }
  });

  it.each(THEMES)("resolves every foreground and background token in %s", (theme) => {
    const tokens = TOKENS[theme];
    for (const pair of CONTRAST_PAIRS) {
      if (!pairAppliesTo(pair, theme)) continue;
      expect(() => resolveToken(pair.foreground, tokens)).not.toThrow();
      expect(() => resolveToken(pair.background, tokens)).not.toThrow();
      expect(resolveToken(pair.foreground, tokens)).toBeTruthy();
      expect(resolveToken(pair.background, tokens)).toBeTruthy();
    }
  });
});

describe.each(THEMES)("contrast in %s theme", (theme) => {
  const tokens = TOKENS[theme];
  const applicable = CONTRAST_PAIRS.map(
    (pair, index) => [label(pair, index), pair] as const,
  ).filter(([, pair]) => pairAppliesTo(pair, theme));

  it("asserts at least one pair", () => {
    expect(applicable.length).toBeGreaterThan(0);
  });

  it.each(applicable)("%s", (_name, pair) => {
    const ratio = pairRatio(pair, tokens);
    expect(
      // 1e-4 slack matches `pairMeetsContrast`: it absorbs float noise only.
      ratio + 1e-4,
      `${pair.foreground} on ${pair.background} in ${theme} theme: expected >=${pair.minRatio}:1, ` +
        `measured ${ratio.toFixed(2)}:1 — ${pair.usage}`,
    ).toBeGreaterThanOrEqual(pair.minRatio);
  });
});

describe("alpha compositing", () => {
  /**
   * Regression guard: `--text-secondary` is `rgba(0, 0, 0, 0.6)`. Measuring it
   * with `contrastRatio` treats it as solid black and overstates the ratio, so
   * `pairRatio` must composite it onto its band first. If these two ever agree,
   * the compositing step has been reverted.
   */
  it("makes pairRatio differ from a naive contrastRatio on a translucent token", () => {
    const tokens = TOKENS.light;
    const pair = CONTRAST_PAIRS.find(
      (candidate) => candidate.foreground === "text-secondary" && candidate.background === "layer-1",
    );
    expect(pair, "expected a text-secondary on layer-1 entry").toBeDefined();

    const background = resolveToken(pair!.background, tokens);
    const foreground = resolveToken(pair!.foreground, tokens);
    expect(foreground).toMatch(/rgba\(/);

    const composited = pairRatio(pair!, tokens);
    const naive = contrastRatio(foreground, background);

    expect(naive).toBeGreaterThan(composited + 1);
    expect(composited).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
});

describe("Pill_Nav translucent backdrop (Requirement 16.6)", () => {
  /**
   * The pill paints `--layer-0` at 72% over whatever band scrolls beneath it,
   * so its effective backdrop is a blend. Both foreground variants must clear
   * 4.5:1 against every one of those blends, not just against `layer-0`.
   */
  const cases = (
    [
      ["light", "ink-high"],
      ["dark", "white"],
    ] as const
  ).flatMap(([theme, foreground]) =>
    SURFACE_BANDS.map((band) => ({ theme, foreground, band })),
  );

  it.each(cases)(
    "$foreground clears 4.5:1 on the pill blend over $band in $theme theme",
    ({ theme, foreground, band }) => {
      const tokens = TOKENS[theme];
      const backdrop = pillNavBackdrop(band, tokens);
      const ratio = contrastRatio(resolveToken(foreground, tokens), backdrop);
      expect(
        ratio + 1e-4,
        `Pill_Nav ${foreground} over layer-0@72% on ${band} in ${theme}: measured ${ratio.toFixed(2)}:1`,
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
    },
  );

  it("blends towards layer-0 rather than returning it unchanged", () => {
    const tokens = TOKENS.dark;
    const overLayer3 = pillNavBackdrop("layer-3", tokens);
    const overLayer0 = pillNavBackdrop("layer-0", tokens);
    expect(overLayer3).not.toEqual(overLayer0);
  });
});
