/**
 * WCAG 2.1 contrast utilities and the single declaration of the site's
 * palette pairing rules (design §6.5, Requirements 12.1 and 12.2).
 *
 * The `CONTRAST_PAIRS` table is the source of truth: the contrast test
 * resolves each token to its concrete value in both themes and asserts the
 * computed ratio clears `minRatio`.
 */

/** Semantic palette token names, mirroring the Tailwind colour groups. */
export type ContrastToken =
  | 'ink-high'
  | 'ink-mid'
  | 'ink-low'
  | 'surface'
  | 'surface-alt'
  | 'surface-chat'
  | 'bubble-received'
  | 'brand'
  | 'brand-dark'
  | 'brand-light'
  | 'hairline'
  | 'white'
  // Surface bands (landing-ui-polish Requirement 3.1)
  | 'layer-0'
  | 'layer-1'
  | 'layer-2'
  | 'layer-3'
  | 'layer-tint'
  // Text on bands (Requirement 3.9, 16.7)
  | 'text-secondary'
  | 'text-accent'
  // Hairline alpha steps (Requirement 4.1)
  | 'hairline-08'
  | 'hairline-12'
  | 'hairline-24'
  | 'hairline-56'
  | 'hairline-76'
  // Semantic pill palette (Requirement 11.1)
  | 'pill-soft-bg'
  | 'pill-soft-fg'
  | 'pill-mid-bg'
  | 'pill-mid-fg'
  | 'pill-strong-bg'
  | 'pill-strong-fg';

/** The two shipped colour schemes. */
export type Theme = 'light' | 'dark';

export const THEMES: readonly Theme[] = ['light', 'dark'];

/**
 * Maps each themed token to the `--gsg-*` custom property that backs it in
 * `src/index.css`. `white` is theme-invariant and therefore absent here.
 */
export const TOKEN_CSS_VARS: Record<Exclude<ContrastToken, 'white'>, string> = {
  'ink-high': '--gsg-text-high',
  'ink-mid': '--gsg-text-mid',
  'ink-low': '--gsg-text-low',
  surface: '--gsg-surface',
  'surface-alt': '--gsg-surface-alt',
  'surface-chat': '--gsg-chat-background',
  'bubble-received': '--gsg-received-bubble',
  brand: '--gsg-primary',
  'brand-dark': '--gsg-primary-dark',
  'brand-light': '--gsg-primary-light',
  hairline: '--gsg-border',
  'layer-0': '--layer-0',
  'layer-1': '--layer-1',
  'layer-2': '--layer-2',
  'layer-3': '--layer-3',
  'layer-tint': '--layer-tint',
  'text-secondary': '--text-secondary',
  'text-accent': '--text-accent',
  'hairline-08': '--hairline-08',
  'hairline-12': '--hairline-12',
  'hairline-24': '--hairline-24',
  'hairline-56': '--hairline-56',
  'hairline-76': '--hairline-76',
  'pill-soft-bg': '--pill-soft-bg',
  'pill-soft-fg': '--pill-soft-fg',
  'pill-mid-bg': '--pill-mid-bg',
  'pill-mid-fg': '--pill-mid-fg',
  'pill-strong-bg': '--pill-strong-bg',
  'pill-strong-fg': '--pill-strong-fg',
};

/** The five Surface_Bands, in raised order. `layer-tint` sits outside it. */
export const SURFACE_BANDS: readonly ContrastToken[] = [
  'layer-0',
  'layer-1',
  'layer-2',
  'layer-3',
  'layer-tint',
];

/** Tokens whose value is fixed regardless of theme. */
export const LITERAL_TOKENS: Partial<Record<ContrastToken, string>> = {
  white: '#FFFFFF',
};

/** WCAG minimum ratios. */
export const WCAG_AA_NORMAL_TEXT = 4.5;
/** Text ≥ 24px (or ≥ 18.66px bold) and non-text boundaries. */
export const WCAG_AA_LARGE_TEXT = 3;

export interface ContrastPair {
  /** Foreground (text or boundary) token. */
  readonly foreground: ContrastToken;
  /** Background token the foreground is painted on. */
  readonly background: ContrastToken;
  /** Minimum acceptable WCAG contrast ratio in every theme it applies to. */
  readonly minRatio: number;
  /** Why this threshold applies — kept for test failure messages. */
  readonly usage: string;
  /**
   * Themes the pair applies to. Omitted means both. Needed because some
   * pairings only exist in one scheme: white text is rendered on the dark
   * bands and never on the light ones, where it would measure 1.00.
   */
  readonly themes?: readonly Theme[];
}

/** True when `pair` is asserted for `theme`. */
export function pairAppliesTo(pair: ContrastPair, theme: Theme): boolean {
  return pair.themes === undefined || pair.themes.includes(theme);
}

/**
 * The declared pairing rules from design §6.5.
 *
 * Not represented here, because they are enforced by convention plus a
 * lint-style test rather than by a ratio assertion:
 * - `ink-low` is reserved for text ≥ 24px and decorative boundaries.
 * - decorative `hairline` borders; where a border is the sole affordance the
 *   component uses `ink-mid` instead, which is covered by the pairs below.
 */
export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  {
    foreground: 'ink-high',
    background: 'surface',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'headings and emphasised body text on page surfaces',
  },
  {
    foreground: 'ink-high',
    background: 'surface-alt',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'headings and emphasised body text on alternating sections',
  },
  {
    foreground: 'ink-high',
    background: 'surface-chat',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'mockup chat transcript text',
  },
  {
    foreground: 'ink-high',
    background: 'bubble-received',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'received message bubble text',
  },
  {
    foreground: 'ink-high',
    background: 'brand-light',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'text on tinted brand chips and badges',
  },
  {
    foreground: 'ink-mid',
    background: 'surface',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'body copy on page surfaces',
  },
  {
    /*
     * Was `ink-mid` on `surface-alt`, which measures 4.34 in Light_Theme and so
     * never met its own threshold — the pairing predates this table having a
     * test. Requirement 16.7 puts the fix in the token layer, not the section:
     * body copy on the alternating surface now resolves to `text-secondary`
     * (5.62 light, 9.80 dark). `ink-mid` keeps its `surface` entries below
     * because DeviceMockup renders it there, at 4.76 light and 5.65 dark.
     */
    foreground: 'text-secondary',
    background: 'surface-alt',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'body copy on alternating sections',
  },
  {
    foreground: 'white',
    background: 'brand-dark',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'default solid CTA label',
  },
  {
    foreground: 'white',
    background: 'brand',
    minRatio: WCAG_AA_LARGE_TEXT,
    usage: 'solid brand surfaces limited to ≥18.66px bold text and boundaries',
  },
  {
    foreground: 'ink-mid',
    background: 'surface',
    minRatio: WCAG_AA_LARGE_TEXT,
    usage: 'borders where the boundary is the sole affordance (inputs, toggle)',
  },

  /* =====================================================================
     Surface_Bands pairings (landing-ui-polish Requirement 16.3–16.5).
     Every ratio below was computed, not estimated; the figures quoted in
     `usage` are the measured values in the order layer-0, 1, 2, 3, tint.

     Deliberately absent: `ink-mid` against any band. In Light_Theme it
     measures 4.76 on layer-0 but only 4.29 / 3.81 / 3.34 / 3.77 on
     layer-1 / 2 / 3 / tint, so it fails Requirement 16.1. Per Requirement
     16.7 the fix lives in the token layer rather than in the sections:
     body copy on a band uses `text-secondary`, and `ink-mid` is retained
     for DeviceMockup internals only, where it is paired with the
     `--gsg-*` app surfaces asserted higher up in this table.
     ===================================================================== */

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'ink-high' as const,
    background: band,
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'headings and primary body text on a surface band (light 14.63/13.18/11.72/10.26/11.59, dark 18.03/17.72/16.55/15.58/17.44)',
  })),

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'text-secondary' as const,
    background: band,
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'secondary body copy on a surface band (light 5.74/5.56/5.36/5.12/5.34, dark 10.30/10.21/9.80/9.40/10.11)',
  })),

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'text-accent' as const,
    background: band,
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'accent-coloured text and links on a surface band (light 7.05/6.35/5.65/4.95/5.59, dark 5.87/5.77/5.39/5.07/5.68)',
  })),

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'white' as const,
    background: band,
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'white text on a dark band (20.01/19.66/18.36/17.29/19.35); in Light_Theme the bands are near-white and carry no white text',
    themes: ['dark'] as const,
  })),

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'hairline-56' as const,
    background: band,
    minRatio: WCAG_AA_LARGE_TEXT,
    usage: "boundary where it is a control's sole affordance (light 4.94/4.81/4.66/4.48, tint 4.64; dark 6.46/6.46/6.34/6.18, tint 6.42)",
  })),

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'brand' as const,
    background: band,
    minRatio: WCAG_AA_LARGE_TEXT,
    usage: 'focus indicator ring on a surface band (light 4.86/4.38/3.89/3.41/3.85, dark 4.57/4.49/4.19/3.95/4.42)',
  })),

  /* =====================================================================
     Pill_Nav foreground variants (Requirement 16.6).

     `SiteHeader` ships exactly two foreground variants and picks between
     them from the resolved theme (with a `data-nav-foreground` override):
       on-light → `text-ink-high`
       on-dark  → `text-white`
     The pill is fixed, so it overlaps every Landing_Section in turn and
     therefore every Surface_Band. These entries are declared separately
     from the generic band entries above rather than by widening those
     `usage` strings, so a future change to the generic body-text pairing
     cannot silently drop the nav's own guarantee.

     The pill is also translucent — `color-mix(in srgb, var(--layer-0) 72%,
     transparent)` — so its painted backdrop is a BLEND of `layer-0` and
     whichever band is beneath it, not `layer-0` itself. A `ContrastPair`
     background must be a single token, so the blend is asserted separately via
     `pillNavBackdrop` (see the contrast test). 72% is the lowest alpha the pill
     paints, and every extra percent of `layer-0` would only push the backdrop
     toward the end of the ramp furthest from the label colour.
     ===================================================================== */

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'ink-high' as const,
    background: band,
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'Pill_Nav light foreground variant (on-light, text-ink-high) over a surface band it overlaps',
    themes: ['light'] as const,
  })),

  ...SURFACE_BANDS.map((band) => ({
    foreground: 'white' as const,
    background: band,
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'Pill_Nav dark foreground variant (on-dark, text-white) over a surface band it overlaps',
    themes: ['dark'] as const,
  })),

  /* Semantic_Pill pairings (Requirement 11.3, 16.5). */
  {
    foreground: 'pill-soft-fg',
    background: 'pill-soft-bg',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'soft pill label (light 7.01, dark 9.15)',
  },
  {
    foreground: 'pill-mid-fg',
    background: 'pill-mid-bg',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'mid pill label (light 7.08, dark 9.17)',
  },
  {
    foreground: 'pill-strong-fg',
    background: 'pill-strong-bg',
    minRatio: WCAG_AA_NORMAL_TEXT,
    usage: 'strong pill label (light 6.73, dark 8.99)',
  },
];

export type Rgb = readonly [number, number, number];

/** A colour with its alpha channel preserved, alpha in the range 0–1. */
export type Rgba = readonly [number, number, number, number];

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
const RGB_PATTERN = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i;
const ALPHA_PATTERN = /^rgba?\(\s*[\d.]+[\s,]+[\d.]+[\s,]+[\d.]+[\s,/]+([\d.]+)\s*\)$/i;

/**
 * Parses a CSS colour into 0–255 channels. Accepts `#rgb`, `#rrggbb`, and
 * `rgb()`/`rgba()` notation, which is what `getComputedStyle` may return.
 */
export function parseColor(value: string): Rgb {
  const input = value.trim();

  const hex = HEX_PATTERN.exec(input);
  if (hex) {
    const digits = hex[1];
    const full =
      digits.length === 3
        ? digits
          .split('')
          .map((d) => d + d)
          .join('')
        : digits;
    return [
      Number.parseInt(full.slice(0, 2), 16),
      Number.parseInt(full.slice(2, 4), 16),
      Number.parseInt(full.slice(4, 6), 16),
    ];
  }

  const rgb = RGB_PATTERN.exec(input);
  if (rgb) {
    return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  }

  throw new Error(`Unsupported colour value: "${value}"`);
}

/**
 * Parses a CSS colour and keeps its alpha channel. Opaque notations return an
 * alpha of 1. `--text-secondary` and the `--hairline-*` steps are declared with
 * alpha so they composite onto whichever Surface_Band they land on, so their
 * ratios cannot be computed from the channels alone.
 */
export function parseColorWithAlpha(value: string): Rgba {
  const [r, g, b] = parseColor(value);
  const alpha = ALPHA_PATTERN.exec(value.trim());
  return [r, g, b, alpha ? Number(alpha[1]) : 1];
}

/**
 * Flattens a possibly translucent foreground onto an opaque background, which
 * is what the browser paints and therefore what WCAG measures.
 */
export function compositeOver(foreground: string | Rgba, background: string | Rgb): Rgb {
  const [fr, fg, fb, fa] =
    typeof foreground === 'string' ? parseColorWithAlpha(foreground) : foreground;
  const [br, bg, bb] = typeof background === 'string' ? parseColor(background) : background;
  return [fr * fa + br * (1 - fa), fg * fa + bg * (1 - fa), fb * fa + bb * (1 - fa)];
}

/** Linearises one sRGB channel per WCAG 2.1. */
function linearise(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance (0–1) of a CSS colour, per WCAG 2.1. */
export function relativeLuminance(color: string | Rgb): number {
  const [r, g, b] = typeof color === 'string' ? parseColor(color) : color;
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

/**
 * WCAG contrast ratio between two colours, in the range 1–21. The order of
 * the arguments does not matter.
 */
export function contrastRatio(a: string | Rgb, b: string | Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/** True when two colours meet or exceed the required ratio. */
export function meetsContrast(
  foreground: string | Rgb,
  background: string | Rgb,
  minRatio: number,
): boolean {
  return contrastRatio(foreground, background) + 1e-4 >= minRatio;
}

/**
 * Resolves a token to a concrete colour using a map of `--gsg-*` values read
 * from a theme block (see the `readTokens` test helper).
 */
export function resolveToken(
  token: ContrastToken,
  tokens: Readonly<Record<string, string>>,
): string {
  const literal = LITERAL_TOKENS[token];
  if (literal) return literal;

  const cssVar = TOKEN_CSS_VARS[token as Exclude<ContrastToken, 'white'>];
  const value = tokens[cssVar];
  if (!value) {
    throw new Error(`Token "${token}" (${cssVar}) is not defined in this theme`);
  }
  return value;
}

/**
 * The measured ratio for a `CONTRAST_PAIRS` entry, with the foreground
 * composited onto its background first. This is the function the contrast test
 * should use: calling `contrastRatio` directly on a translucent token would
 * treat `rgba(0, 0, 0, 0.6)` as solid black and overstate the ratio.
 *
 * The background must be opaque — every Surface_Band and pill tint is a hex
 * value — because there is no further backdrop to flatten it against.
 */
export function pairRatio(
  pair: ContrastPair,
  tokens: Readonly<Record<string, string>>,
): number {
  const background = resolveToken(pair.background, tokens);
  const [, , , backgroundAlpha] = parseColorWithAlpha(background);
  if (backgroundAlpha !== 1) {
    throw new Error(
      `Background token "${pair.background}" is translucent; contrast needs an opaque backdrop`,
    );
  }
  const foreground = compositeOver(resolveToken(pair.foreground, tokens), background);
  return contrastRatio(foreground, parseColor(background));
}

/**
 * Alpha of the Pill_Nav's own surface. The pill has ONE appearance, so one
 * alpha: `SiteHeader` paints `color-mix(in srgb, var(--layer-0) 72%,
 * transparent)` so the `backdrop-filter` blur stays visible, which means 28% of
 * whatever band sits beneath the pill shows through. Kept here, next to the
 * pairing table, so the contrast assertion and the component cannot drift apart
 * silently.
 *
 * Raising the alpha is monotonically *safe* for label contrast: it moves the
 * blend further toward `layer-0`, which is the extreme end of the ramp in both
 * themes — the whitest band in Light_Theme and the blackest in Dark_Theme — so
 * the backdrop moves away from the label colour, never toward it. Measured, with
 * `layer-3` the binding band in both themes because it is the band furthest from
 * `layer-0`:
 *
 *   Light_Theme, `ink-high` on the blend over layer-0/1/2/3/tint
 *     14.63 / 14.21 / 13.77 / 13.31 / 13.73  → worst 13.31:1
 *   Dark_Theme, `white` on the same blends
 *     20.01 / 19.91 / 19.61 / 19.39 / 19.84  → worst 19.39:1
 */
export const PILL_NAV_SURFACE_ALPHA = 0.72;

/**
 * The colour the Pill_Nav's backdrop actually resolves to over `band`:
 * `layer-0` at {@link PILL_NAV_SURFACE_ALPHA} composited onto that band.
 *
 * This is the backdrop the nav's label text is measured against — measuring
 * against `layer-0` alone would be wrong on every band except `layer-0`.
 * `backdrop-filter: blur()` only redistributes the backdrop's own colour, so
 * it cannot push the blend outside the range spanned by the two inputs.
 */
export function pillNavBackdrop(
  band: ContrastToken,
  tokens: Readonly<Record<string, string>>,
): Rgb {
  const [r, g, b] = parseColor(resolveToken('layer-0', tokens));
  const beneath = parseColor(resolveToken(band, tokens));
  const translucent: Rgba = [r, g, b, PILL_NAV_SURFACE_ALPHA];
  return compositeOver(translucent, beneath);
}

/** True when a pair meets its own `minRatio` in the given theme's tokens. */
export function pairMeetsContrast(
  pair: ContrastPair,
  tokens: Readonly<Record<string, string>>,
): boolean {
  return pairRatio(pair, tokens) + 1e-4 >= pair.minRatio;
}
