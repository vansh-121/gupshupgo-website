import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { relativeLuminance } from "@/lib/contrast";
import { readDarkTokens, readLightTokens } from "@/test/readTokens";

/**
 * Design_Token_Layer assertions (Requirement 18.2, covering Requirements 3, 4,
 * 5 and 11.4). jsdom loads no CSS, so both the parsed tokens and the raw
 * stylesheet text come straight from `src/index.css`.
 */

/** Walks up from the working directory to the stylesheet, as `readTokens` does. */
function locateCss(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    const candidate = resolve(dir, "src/index.css");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("tokens.test: could not locate src/index.css");
}

const RAW_CSS = readFileSync(locateCss(), "utf8");

const light = readLightTokens();
const dark = readDarkTokens();

const BANDS = ["--layer-0", "--layer-1", "--layer-2", "--layer-3", "--layer-tint"] as const;

const HAIRLINE_STEPS = [
  ["--hairline-08", "0.08"],
  ["--hairline-12", "0.12"],
  ["--hairline-24", "0.24"],
  ["--hairline-56", "0.56"],
  ["--hairline-76", "0.76"],
] as const;

/** Hex casing is not normalised in the stylesheet, so compare case-insensitively. */
function hex(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

describe("Surface_Bands definitions (Requirement 3.1, 18.2)", () => {
  it.each(BANDS)("%s is defined in Light_Theme", (token) => {
    expect(light[token], `${token} missing from :root`).toBeTruthy();
  });

  it.each(BANDS)("%s is defined in Dark_Theme", (token) => {
    expect(dark[token], `${token} missing from .dark`).toBeTruthy();
  });
});

describe("Surface_Bands values", () => {
  it("resolves the exact Light_Theme greyscale ramp (Requirement 3.2)", () => {
    expect(hex(light["--layer-0"])).toBe("#ffffff");
    expect(hex(light["--layer-1"])).toBe("#f3f3f3");
    expect(hex(light["--layer-2"])).toBe("#e6e6e6");
    expect(hex(light["--layer-3"])).toBe("#d8d8d8");
  });

  it("resolves the exact Dark_Theme ramp (Requirement 3.4)", () => {
    expect(hex(dark["--layer-0"])).toBe("#07080d");
    expect(hex(dark["--layer-1"])).toBe("#0a0b10");
    expect(hex(dark["--layer-2"])).toBe("#12141d");
    expect(hex(dark["--layer-3"])).toBe("#181a26");
  });

  it("keeps the light tint within 0.05 luminance of #E2E4F6 (Requirement 3.3)", () => {
    const tint = relativeLuminance(light["--layer-tint"]);
    const nova = relativeLuminance("#E2E4F6");
    expect(Math.abs(tint - nova)).toBeLessThanOrEqual(0.05);
  });

  it("keeps the dark tint darker than layer-2 (Requirement 3.4)", () => {
    expect(relativeLuminance(dark["--layer-tint"])).toBeLessThan(
      relativeLuminance(dark["--layer-2"]),
    );
  });
});

describe("Brand_Accent and text tokens", () => {
  it("retains Brand_Accent in both themes (Requirement 3.5)", () => {
    expect(hex(light["--gsg-primary"])).toBe("#6c5ce7");
    expect(hex(dark["--gsg-primary"])).toBe("#7c5cfc");
  });

  it("defines the secondary text token per theme (Requirement 3.9)", () => {
    expect(light["--text-secondary"]).toBe("rgba(0, 0, 0, 0.6)");
    expect(dark["--text-secondary"]).toMatch(/^rgba\(255,\s*255,\s*255,\s*[\d.]+\)$/);
  });
});

describe("Hairline alpha steps (Requirement 4.1)", () => {
  it.each(HAIRLINE_STEPS)("%s exists in both themes", (token) => {
    expect(light[token], `${token} missing from :root`).toBeTruthy();
    expect(dark[token], `${token} missing from .dark`).toBeTruthy();
  });

  it.each(HAIRLINE_STEPS)("%s uses alpha %s in Dark_Theme", (token, alpha) => {
    expect(dark[token]).toBe(`rgba(255, 255, 255, ${alpha})`);
  });
});

describe("Standard_Elevation (Requirement 5.1)", () => {
  it("is the exact single shadow value", () => {
    expect(light["--elevation"]).toBe("0 2px 14px rgba(0, 0, 0, 0.05)");
  });
});

describe("Semantic_Pill palette (Requirement 11.4)", () => {
  const tints = Object.keys(light)
    .map((token) => /^--pill-(.+)-bg$/.exec(token)?.[1])
    .filter((name): name is string => Boolean(name));

  it("defines at least three tints", () => {
    expect(tints.length).toBeGreaterThanOrEqual(3);
  });

  it.each(tints)("pill-%s has a light and a dark definition", (tint) => {
    for (const token of [`--pill-${tint}-bg`, `--pill-${tint}-fg`]) {
      expect(light[token], `${token} missing from :root`).toBeTruthy();
      expect(dark[token], `${token} missing from .dark`).toBeTruthy();
    }
  });
});

describe("Excluded values", () => {
  it("omits Nova's indigo accent (Requirement 3.6)", () => {
    expect(RAW_CSS.toLowerCase()).not.toContain("#1b2bb8");
    expect(RAW_CSS.toLowerCase()).not.toContain("#3042e6");
  });

  it("omits radial gradients (Requirement 3.11)", () => {
    expect(RAW_CSS.toLowerCase()).not.toContain("radial-gradient");
  });
});
