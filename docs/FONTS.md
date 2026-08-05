# Display typeface

Records the Requirement 2 decision for the `landing-ui-polish` spec.

## Decision

General Sans is **not** used. The site ships **Geist**, self-hosted, as the
Display_Typeface, with Inter retained as the fallback family.

| | |
| --- | --- |
| Typeface | Geist |
| Designer / publisher | Vercel |
| Licence | SIL Open Font License 1.1 |
| Licence text in repo | `public/fonts/Geist-OFL.txt` |
| Source | <https://github.com/google/fonts/tree/main/ofl/geist> (served to the browser from this origin) |
| File | `public/fonts/geist-latin-400-500.woff2` |
| Subset | Latin (`U+0000-00FF` plus the punctuation, currency and symbol ranges Google Fonts groups as `latin`) |
| Weights | 400 and 500, via a single `wght`-axis variable file declared `font-weight: 400 500` |
| Measured total transferred size | **29,400 bytes = 28.7 KB** (budget: 120 KB) |
| `font-display` | `swap` |
| OpenType features enabled | none |

## Why General Sans could not be self-hosted

General Sans is an Indian Type Foundry family distributed through Fontshare.
Fontshare splits its catalogue into open-source families under the SIL OFL and
closed-source families under the **ITF Free Font License (FFL)**. General Sans is
in the closed-source group.

The FFL is free for personal and commercial use, including webfont use, but its
[terms](https://www.fontshare.com/licenses/itf-ffl) reserve redistribution,
font-serving and modification of the font software. Committing the `.woff2`
binaries to this repository is redistribution of the font software, and serving
them from `public/fonts/` is font serving. Neither is clearly granted, so
Requirement 2.7 applies and a substitute was selected.

Contrast with the fallback: Inter is already loaded from Google Fonts under the
SIL OFL, which is why that arrangement was never in question.

## How the substitute was chosen

Requirement 2.7 caps the substitute's deviation from General Sans at 3 percent on
x-height, cap-height and advance widths. Every candidate was measured
programmatically against General Sans, per weight:

- Reference: `GeneralSans-Regular.otf` and `GeneralSans-Medium.otf` from the
  official Fontshare download, both at 1000 units/em.
- Candidates: the upstream variable font from `google/fonts`, instanced at
  `wght` 400 and 500 so each is compared against the *same* General Sans weight.
  Instancing matters: several Google variable fonts default to `wght` 100, so
  reading `hmtx` without instancing measures the Thin master.
- Advance widths were measured as shaped advance (kerning and `liga` applied) for
  a lowercase alphabet, an uppercase alphabet, a 122-character body sentence and
  a short headline, then expressed as a percentage of the General Sans total.

Worst deviation across both weights and all six measures:

| Candidate | Worst deviation | Verdict |
| --- | --- | --- |
| **Geist** | **2.58%** | **selected** |
| Instrument Sans | 3.77% | over budget (x-height −3.23/−3.77%) |
| Schibsted Grotesk | 4.58% | over budget |
| Public Sans | 5.47% | over budget (headline advance +5.47% at 400) |
| Inter Tight | 5.55% | over budget |
| Manrope | 5.58% | over budget (uppercase −4.60/−5.58%) |
| Figtree | 5.66% | over budget |
| Albert Sans | 5.66% | over budget |
| Plus Jakarta Sans | 6.04% | over budget (cap-height +3.76%) |
| Rethink Sans | 6.42% | over budget |
| Wix Madefor Text | 7.17% | over budget |
| Onest | 7.18% | over budget |
| Inter (current fallback) | 8.23% | over budget |
| Golos Text | 9.47% | over budget |
| Be Vietnam Pro | 12.63% | over budget |

Satoshi was excluded without measurement: it is also an ITF closed-source family
on Fontshare, so it carries the same licence problem as General Sans.

Geist in detail, as a percentage of the same-weight General Sans value:

| Measure | Geist 400 | Geist 500 |
| --- | --- | --- |
| x-height | +0.57% | 0.00% |
| cap-height | −1.11% | −1.11% |
| lowercase alphabet advance | +1.29% | +0.80% |
| uppercase alphabet advance | −1.70% | −2.58% |
| body sentence advance | +1.26% | +0.99% |
| headline advance | +2.40% | +1.85% |

Absolute values at 1000 units/em: General Sans x-height 527, cap-height 718;
Geist x-height 530, cap-height 710.

For scale, General Sans Medium deviates from General Sans Regular by up to 3.69%
on these same measures, so Geist tracks General Sans more closely than General
Sans's own two weights track each other.

## Implementation notes

- One file covers both weights. Google Fonts serves the same latin `.woff2` URL
  for `wght@400` and `wght@500` because the file is variable — it carries
  `fvar`, `gvar`, `HVAR`, `MVAR` and `STAT`, with a `wght` axis of 100–900 and a
  default of 400. Requirement 2.5's "at most the 400 and 500 weights" is enforced
  by the `font-weight: 400 500` range in the `@font-face` rule; weight 500 is a
  real interpolated master, not a synthesised bold.
- `index.html` preloads the file and leaves the single existing Inter stylesheet
  link untouched (Requirement 2.4).
- Font stack: `Geist, Inter, ui-sans-serif, system-ui, …` — declared once in
  `--font-sans` in `src/index.css` and mirrored in `theme.fontFamily.sans`.
- No `font-feature-settings`. Nova's `cv09` / `cv03` / `cv04` / `cv11` are Inter
  character variants. Geist's `GSUB` exposes `aalt case ccmp dlig dnom frac liga
  numr ordn pnum sinf ss01–ss11 subs sups tnum kern mark mkmk` and no `cvNN`
  features at all, so the declaration is omitted rather than shipped as a no-op.
- `public/fonts/Geist-OFL.txt` travels with the font as the OFL requires. It is
  never requested by the page.
