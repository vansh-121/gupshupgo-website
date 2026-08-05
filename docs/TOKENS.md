# Token migration map

Slice 1 of `landing-ui-polish` added the Nova surface-band, type and spacing
layer **additively**. Every token name the eleven shipped landing sections
already use still resolves, so nothing had to change in the same commit. This
file is the map the later slices follow when they migrate each section.

## What must not change

`--gsg-*` in `src/index.css` is the Flutter app palette. `DeviceMockup`
reproduces the app screens from it pixel-for-pixel, so those values stay exactly
as they are. The new tokens sit alongside them and never redefine them.

## Surface bands

`--layer-0` is the base page background; each ascending index is one step more
**raised**. The luminance direction is theme-dependent — raised goes darker in
Light_Theme and lighter in Dark_Theme — which is what lets one `bg-layer-2`
class read as raised in both themes. `--layer-tint` is not a step in that ramp;
it is the single Brand_Accent-tinted band and at most one section may use it.

| Token | Light | Dark | Tailwind |
| --- | --- | --- | --- |
| `--layer-0` | `#FFFFFF` | `#07080D` | `bg-layer-0` |
| `--layer-1` | `#F3F3F3` | `#0A0B10` | `bg-layer-1` |
| `--layer-2` | `#E6E6E6` | `#12141D` | `bg-layer-2` |
| `--layer-3` | `#D8D8D8` | `#181A26` | `bg-layer-3` |
| `--layer-tint` | `#E6E2FB` | `#0E0B1E` | `bg-layer-tint` |

## Colour: old name → new name

| Currently used | Replace with | Note |
| --- | --- | --- |
| `bg-surface` | `bg-layer-0` | base page background |
| `bg-surface-alt` | `bg-layer-1` / `bg-layer-2` | pick by how raised the section should read |
| `bg-surface-chat`, `bg-bubble-received` | keep | DeviceMockup internals only |
| `text-ink-high` | keep | passes on every band in both themes |
| `text-ink-mid` | **`text-ink-secondary`** | `ink-mid` measures 4.29:1 on `layer-1`; it is now DeviceMockup-only |
| `text-ink-low` | `text-ink-secondary` | `ink-low` measures 2.56:1 at best; not usable as text on a band |
| `text-brand` (as text) | `text-ink-accent` | `brand` only clears 4.5:1 on `layer-0`; `brand` stays correct for fills and the focus ring |
| `border-hairline` + `border` | `shadow-hairline-12` (no `border` property) | Req 4.2, 4.3 |
| `border-hairline` on a control whose boundary is its only affordance | `shadow-hairline-56` | lightest step clearing 3:1 |
| `bg-brand-light` for badges | `bg-pill-soft` + `text-pill-soft-fg` | Req 11 |
| `shadow-sm` / `shadow-md` / `shadow-xl` | `shadow-elevation` | one outer elevation only |
| `shadow-*` on a phone frame | `shadow-mockup` | the sole exception |
| `shadow-hairline-*` **and** an elevation | `shadow-hairline-12-elevated` | inset + outer in one declaration, Req 4.5 |

Pill tints: pick the tint one step above the band the pill sits on, otherwise
the pill body stops reading as a shape. `pill-soft` on `layer-0`, `pill-mid` on
`layer-1`/`layer-2`, `pill-strong` on `layer-3` and `layer-tint`.

## Type: old name → new name

| Currently used | Replace with |
| --- | --- |
| `text-h1` | already the new 68px composite — pair as `text-h1-sm bp810:text-h1` |
| `text-h2` | already the new 48px composite — pair as `text-h2-sm bp810:text-h2` |
| `text-h3` | already the new 39px composite |
| `leading-relaxed`, `leading-snug`, … | `leading-100/110/120/130/140` only |
| `font-semibold`, `font-bold`, `font-extrabold` | `font-medium` — headings are weight 500, body is 400 |

`text-h1`, `text-h2` and `text-h3` were **redefined** to the Nova composites in
slice 1, so sections still carrying those classes rendered at the new sizes
before their own slice landed. That was intended.

`text-display`, `text-body-lg`, `text-body`, `text-body-sm` and `text-caption`
were retained at their old values through the section migration and have now
been **deleted** from `tailwind.config.ts` — the last references went with the
DeviceMockup retype in slice 6. Their replacements were `text-h1-sm
bp810:text-h1`, `text-lead` (or `text-19`), `text-16 leading-140`, `text-14
leading-140` and `text-12 leading-130` respectively.

The 19-step Type_Scale is exposed as `text-8` … `text-68`, named for its pixel
value: 8, 9, 10, 11, 12, 13, 14, 16, 19, 21, 23, 24, 25, 33, 39, 42, 48, 57, 68.

## Spacing: old name → new name

The 21-step Gap_Scale uses `px`-suffixed keys (`py-128px`, `px-36px`,
`gap-20px`) so it cannot collide with Tailwind's own numeric spacing scale,
where `2` means `0.5rem`. Steps: 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40,
44, 48, 60, 64, 80, 112, 128, 164.

| Currently used | Now resolves to | Replace with |
| --- | --- | --- |
| `py-section` | 80px (was 80px) | `py-64px bp810:py-128px` |
| `py-section-lg` | 128px (was 120px) | `py-72px bp810:py-164px` on the hero only |
| `px-gutter` | 24px (was 24px) | `px-20px bp810:px-36px` |

`section`, `section-lg` and `gutter` are now aliases of ramp steps rather than
independent values. Only `section-lg` moved, 120px → 128px, the nearest step.

## Radius, breakpoints, elevation

- `rounded-8` (8px) and `rounded-pill` (80px) are the only permitted radii, plus
  `rounded-full` for circles. `rounded-pill` changed from `9999px` to `80px`;
  at chip sizes the two are visually identical because the radius is clamped.
- `rounded-lg` / `md` / `sm` / `xl` still resolve for the unmigrated sections.
  `rounded-sm` already computes to 8px.
- Breakpoints: `bp810:` (810px) and `bp1200:` (1200px). Tailwind's `sm md lg xl
  2xl` are untouched, so existing `md:`/`lg:` usages keep compiling.
- `--elevation` (`0 2px 14px rgba(0, 0, 0, 0.05)`) is theme-invariant and is the
  only outer shadow for anything that is not a phone frame. `--elevation-mockup`
  is the layered frame shadow and is the one token that does get a dark variant,
  because the dark bands are near-black.
- The `shadow-hairline-*-elevated` family is defined as `boxShadow` keys rather
  than through `ring` utilities, because Tailwind's ring utilities cannot emit an
  inset hairline and an outer elevation inside a single `box-shadow`
  declaration, which Requirement 4.5 asks for.

## Contrast

`src/lib/contrast.ts` holds the pairing table. Ratios there were computed with
the translucent tokens composited onto their band, which is what the browser
paints; `contrastRatio` on its own would read `rgba(0, 0, 0, 0.6)` as solid
black. Use `pairRatio` / `pairMeetsContrast` for anything table-driven.

Three failures were found and fixed in the token layer rather than in the
sections, per Requirement 16.7:

1. `ink-mid` (`#64748B`) fails as body copy on the light bands — 4.29 / 3.81 /
   3.34 / 3.77 on `layer-1` / `2` / `3` / tint. Fix: body copy uses
   `--text-secondary`; `ink-mid` is now documented as DeviceMockup-only and has
   no band pairing in the table.
2. `brand` as *text* fails on most bands — 4.38 / 3.89 / 3.41 / 3.85 in light and
   4.49 / 4.19 / 3.95 / 4.42 in dark. Fix: the new `--text-accent` token, which
   resolves to `#5246BE` in light (7.05…4.95) and `#8E76FD` in dark (5.87…5.07).
   `brand` itself is unchanged and stays correct for fills and the focus ring,
   where the threshold is 3:1 and it measures 3.41 at worst.
3. **Pre-existing:** the table already asserted `ink-mid` on `surface-alt` at
   4.5:1, and that pairing measures **4.34** in Light_Theme. It had never been
   caught because nothing executed the table yet. Fix: the entry now uses
   `text-secondary` (5.62 light, 9.80 dark). `ink-mid` keeps its `surface`
   entries, which DeviceMockup genuinely renders, at 4.76 light and 5.65 dark.

All 43 entries now pass — 81 assertions once theme scoping is applied.

`--text-secondary` resolves to `rgba(0, 0, 0, 0.6)` in Light_Theme, the literal
value Requirement 3.9 names. The slice brief called for `0.62`; `0.6` was kept
because 3.9 states the value explicitly and both clear 4.5:1 on every band.
