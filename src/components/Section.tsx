import type { ReactNode } from "react";
import type { SectionId } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Surface band index (Req 3.1, 3.7). `0` is the base page background and each
 * ascending index reads as one step more *raised* in BOTH themes — the
 * luminance direction flips per theme, which is the whole point of the ramp.
 * `"tint"` is not a step: it is the single Brand_Accent-tinted band and at most
 * one section on the page may use it (Req 3.10).
 */
export type SectionBand = 0 | 1 | 2 | 3 | "tint";

/**
 * @deprecated Use {@link SectionBand} via the `band` prop. Retained only so the
 * eleven unmigrated landing sections keep compiling until their own slice
 * lands; `surface` maps to band 0 and `surface-alt` to band 1.
 */
export type SectionBackground = "surface" | "surface-alt";

/**
 * Permitted text-block widths (Req 7.2). Every text block in a section must be
 * constrained to one of these five measures.
 */
export type TextMeasure = 872 | 809 | 644 | 500 | 448;

/**
 * Measure utility classes, exported so sections can constrain individual text
 * blocks directly instead of routing everything through the `measure` prop.
 *
 * Usage: `<p className={cn(MEASURE_CLASSES[644], "text-16 leading-140")}>`
 */
export const MEASURE_CLASSES: Record<TextMeasure, string> = {
  872: "max-w-[872px]",
  809: "max-w-[809px]",
  644: "max-w-[644px]",
  500: "max-w-[500px]",
  448: "max-w-[448px]",
};

const BAND_CLASSES: Record<string, string> = {
  "0": "bg-layer-0",
  "1": "bg-layer-1",
  "2": "bg-layer-2",
  "3": "bg-layer-3",
  tint: "bg-layer-tint",
};

const DEPRECATED_BACKGROUND_TO_BAND: Record<SectionBackground, SectionBand> = {
  surface: 0,
  "surface-alt": 1,
};

/**
 * Nova vertical rhythm (Req 7.3–7.6).
 *
 * Non-hero: 64/20 below Breakpoint_Small, 128/36 at and above it.
 * Hero:     72/20 below Breakpoint_Small, 164/36 at and above it.
 */
const RHYTHM_CLASSES = {
  default: "py-64px px-20px bp810:py-128px bp810:px-36px",
  hero: "py-72px px-20px bp810:py-164px bp810:px-36px",
} as const;

interface SectionProps {
  /** Section identity from the shared registry; also drives the heading id. */
  id: SectionId;
  /** Surface band for this section. Defaults to the base band, `0`. */
  band?: SectionBand;
  /**
   * @deprecated Pass `band` instead. Mapped onto `band` for backwards
   * compatibility with the not-yet-migrated sections. Ignored when `band` is
   * given explicitly.
   */
  background?: SectionBackground;
  /** Applies the hero rhythm (72/164 vertical padding) instead of the default. */
  hero?: boolean;
  /** Constrains children to one of the permitted Text_Measures widths. */
  measure?: TextMeasure;
  /** Classes applied to the `<section>` element. */
  className?: string;
  /** Classes applied to the inner 1199px container. */
  containerClassName?: string;
  children: ReactNode;
}

/**
 * Shared section wrapper (Req 3.7, 7.1, 7.3–7.6, 8.7).
 *
 * Renders `<section id aria-labelledby={`${id}-heading`} tabIndex={-1}>` so
 * in-page navigation can move focus into the section and have its accessible
 * name announced. The heading with the matching id must be supplied by
 * `SectionHeading` with the same `sectionId`. Those three attributes are load
 * bearing — the Pill_Nav focus behaviour depends on all of them.
 *
 * Container: outer wrapper at Container_Width (1320px), inner wrapper at
 * 1199px (Req 7.1).
 *
 * Body copy colour is `text-ink-secondary` and is no longer coupled to the
 * background. `text-ink-mid` is not used here at all: it measures 4.29:1 on
 * `layer-1` and is now DeviceMockup-only (docs/TOKENS.md). Headings opt into
 * `text-ink-high`, which passes on every band in both themes.
 *
 * ## `data-band` and nav inversion
 *
 * `data-band` carries the resolved band so the Pill_Nav (and anything else that
 * needs to reason about what it is sitting over) can read it from the DOM.
 *
 * There is deliberately no `data-nav-variant`: in Light_Theme all five bands are
 * near-white and in Dark_Theme all five are near-black, so the variant that
 * keeps Pill_Nav labels at 4.5:1 (Req 8.4) is a function of the resolved
 * *theme*, not of the band. Emitting a per-section nav variant would encode a
 * decision the server cannot make and the client already knows. The one future
 * exception is a section that renders a deliberately inverted dark panel in
 * Light_Theme; such a section should mark that panel itself rather than have
 * `Section` guess, and `data-band` is the hook for it.
 */
export default function Section({
  id,
  band,
  background,
  hero = false,
  measure,
  className,
  containerClassName,
  children,
}: SectionProps) {
  const resolvedBand: SectionBand =
    band ?? (background ? DEPRECATED_BACKGROUND_TO_BAND[background] : 0);

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-heading`}
      data-band={String(resolvedBand)}
      className={cn(
        "scroll-mt-20",
        hero ? RHYTHM_CLASSES.hero : RHYTHM_CLASSES.default,
        "focus-visible:outline-none",
        BAND_CLASSES[String(resolvedBand)],
        "text-ink-secondary",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div
          className={cn(
            "mx-auto w-full max-w-[1199px]",
            measure && MEASURE_CLASSES[measure],
            containerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
