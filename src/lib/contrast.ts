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
  | 'white';

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
};

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
  /** Minimum acceptable WCAG contrast ratio in every theme. */
  readonly minRatio: number;
  /** Why this threshold applies — kept for test failure messages. */
  readonly usage: string;
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
    foreground: 'ink-mid',
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
];

export type Rgb = readonly [number, number, number];

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
const RGB_PATTERN = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i;

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
