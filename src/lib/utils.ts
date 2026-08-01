import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
  tailwind-merge only knows Tailwind's OWN scales. Every custom scale in
  tailwind.config.ts whose keys don't look like a t-shirt size or a length has
  to be registered here, or tailwind-merge misfiles the utility and either
  deletes a class it shouldn't or keeps two classes that conflict.

  The concrete bug this fixes: `text-19` / `text-h2-sm` etc. don't match a
  t-shirt size or an arbitrary length, so tailwind-merge fell through to
  `text-color` and treated them as COLOURS. `cn('text-white', 'text-19')` then
  looked like two colours and dropped `text-white` — the Download CTA rendered a
  dark label on the brand fill in light theme.

  The lists below mirror `theme.extend.fontSize`, `boxShadow`, `borderRadius`
  and `spacing` in tailwind.config.ts. They are literals rather than imports:
  tailwind.config.ts pulls in `tailwindcss-animate` and the Tailwind `Config`
  type, none of which belong in the client bundle. KEEP IN SYNC WITH
  tailwind.config.ts — if you add a scale key there, add it here.
*/

/** `theme.extend.fontSize` — 19 numeric steps plus the heading composites. */
const FONT_SIZES = [
  "8", "9", "10", "11", "12", "13", "14", "16", "19", "21", "23", "24", "25",
  "33", "39", "42", "48", "57", "68",
  "h1", "h1-sm", "h2", "h2-sm", "h3", "lead",
];

/**
 * `theme.extend.boxShadow`. `shadow-*` carries the same value-vs-colour
 * ambiguity as `text-*`: unregistered, `shadow-elevation` was read as a shadow
 * COLOUR, so `cn('shadow-md', 'shadow-elevation')` kept both and left the
 * winner to stylesheet order.
 */
const BOX_SHADOWS = [
  "elevation", "mockup", "hairline",
  "hairline-08", "hairline-12", "hairline-24", "hairline-56", "hairline-76",
  "hairline-elevated",
  "hairline-08-elevated", "hairline-12-elevated", "hairline-24-elevated",
  "hairline-56-elevated", "hairline-76-elevated",
];

/**
 * `theme.extend.spacing` — the px-suffixed Gap_Scale plus the three aliases.
 * `8px` is neither a bare number nor an arbitrary value, so tailwind-merge
 * didn't recognise `p-8px` at all and left the primitive's `p-4` in place
 * alongside it. Registering under the `spacing` theme key covers every group
 * derived from it: padding, margin, gap, space, inset, translate, width…
 */
const SPACING = [
  "2px", "4px", "6px", "8px", "10px", "12px", "16px", "20px", "24px", "28px",
  "32px", "36px", "40px", "44px", "48px", "60px", "64px", "80px", "112px",
  "128px", "164px",
  "section", "section-lg", "gutter",
];

/** `theme.extend.borderRadius` — the two permitted radii. */
const BORDER_RADII = ["8", "pill"];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: SPACING,
      borderRadius: BORDER_RADII,
    },
    classGroups: {
      "font-size": [{ text: FONT_SIZES }],
      shadow: [{ shadow: BOX_SHADOWS }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
