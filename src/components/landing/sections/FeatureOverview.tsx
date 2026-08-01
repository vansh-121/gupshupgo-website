import FeatureMarquee from "@/components/FeatureMarquee";
import Pill from "@/components/Pill";
import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { FEATURES, type Feature } from "@/data/features";
import { cn } from "@/lib/utils";

/**
 * Feature overview section — bento grid (Req 10, 13, 14).
 *
 * Every entry of `FEATURES` — all 17 App_Feature_Set capabilities — renders as
 * one grid cell (Req 1.3, 10.3). The data module stays the only source, so this
 * section cannot drift from the JSON-LD `featureList`.
 *
 * ## Bento composition (Req 10.1)
 *
 * Not a uniform grid: the six capabilities that own a deep-dive section
 * (`detailSectionId`) are the differentiators, so three of them take a cell that
 * spans both more columns AND more rows than a utility cell, and the other three
 * take a wide cell. Layout is an explicit template per breakpoint:
 *
 * | Viewport | Template | Feature cell | Utility cell |
 * | --- | --- | --- | --- |
 * | < 810px | 1 column (Req 10.5) | full row | full row |
 * | ≥ 810px | 4 columns | 2 cols × 2 rows | 2 cols |
 * | ≥ 1200px | 6 columns | 3 cols × 2 rows | 2 cols |
 *
 * `grid-auto-flow: dense` back-fills the single-height gaps the row spans open
 * up, so the composition stays gapless without hand-placing 17 cells.
 *
 * ## Bands
 *
 * Section is band 1; cells are band 0. The cell background therefore differs
 * from the section band and the cells read as raised in both themes (the ramp's
 * luminance direction flips per theme, docs/TOKENS.md). Pills sit on `layer-0`,
 * so they take the `soft` tint; the marquee sits directly on the band, so its
 * pills take `mid`.
 *
 * ## Marquee placement (Req 13.1)
 *
 * The page's single Marquee leads this section in, between the intro paragraph
 * and the grid. It is not a duplicate of the grid: the marquee is an
 * at-a-glance sweep of all 17 capability *names*, the grid is the detail read.
 * Two different reading modes over the same data, which is also why the marquee
 * belongs here rather than floating in a section of its own.
 *
 * ## Heading contract (Req 10.6)
 *
 * The section owns the single `<h2>` via `SectionHeading sectionId="features"`
 * and every cell title is an `<h3>`, so the outline is h2 → h3 with no skipped
 * level. The old per-category `role="group"` wrappers are gone — a bento
 * composition cannot span cells across seven separate grids — and the category
 * labels went with them. They were never headings, so the outline is unchanged.
 */

/** Cell weight in the bento composition. */
type CellSize = "feature" | "wide" | "utility";

/**
 * The three capabilities that carry the page's story get the tall cells; the
 * other three deep-dive capabilities get wide cells; everything else is a
 * utility cell. Ids not listed default to `utility`.
 */
const CELL_SIZES: Readonly<Record<string, CellSize>> = {
  mesh: "feature",
  arcade: "feature",
  pro: "feature",
  encryption: "wide",
  calls: "wide",
  anonymous: "wide",
};

const CELL_SPANS: Record<CellSize, string> = {
  feature: "bp810:col-span-2 bp810:row-span-2 bp1200:col-span-3 bp1200:row-span-2",
  wide: "bp810:col-span-2 bp1200:col-span-2",
  utility: "bp810:col-span-2 bp1200:col-span-2",
};

function cellSize(feature: Feature): CellSize {
  return CELL_SIZES[feature.id] ?? "utility";
}

function FeatureCell({ feature }: { feature: Feature }) {
  const { id, name, description, Icon, isPro } = feature;
  const size = cellSize(feature);
  const isFeatured = size === "feature";

  return (
    <Reveal
      as="li"
      data-testid={`feature-card-${id}`}
      className={cn(
        // Hairline boundary as an inset shadow, never the `border` property
        // (Req 4.2, 4.3), on a band-0 surface with the 8px radius (Req 10.2).
        "flex h-full flex-col rounded-8 bg-layer-0 shadow-hairline-12",
        "transition-standard",
        isFeatured ? "gap-16px p-32px" : "gap-12px p-24px",
        CELL_SPANS[size],
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn("text-ink-accent", isFeatured ? "h-32px w-32px" : "h-24px w-24px")}
      />
      <div className="flex flex-wrap items-center gap-8px">
        <SectionHeading sectionId={`feature-${id}`} level={3}>
          {name}
        </SectionHeading>
        {/* Req 10.4 — only wholly Pro-gated entries get the badge. */}
        {isPro ? (
          <Pill tint="soft">
            <span className="sr-only">Requires GupShupGo </span>Pro
          </Pill>
        ) : null}
        {/* Text statuses are free; photo and video statuses need Pro. */}
        {id === "status" ? <Pill tint="soft">Pro for media</Pill> : null}
      </div>
      <p
        className={cn(
          "text-ink-secondary leading-140",
          isFeatured ? "text-19" : "text-16",
        )}
      >
        {description}
      </p>
    </Reveal>
  );
}

export default function FeatureOverview() {
  return (
    <Section id="features" band={1}>
      <SectionHeading sectionId="features">Everything GupShupGo does</SectionHeading>
      <p className={cn(MEASURE_CLASSES[644], "mt-20px text-lead text-ink-high")}>
        Every capability below ships in the Android app today.
      </p>

      {/* Lead-in sweep of all 17 names before the detail read. */}
      <FeatureMarquee tint="mid" className="mt-40px" />

      {/* One observer staggers all 17 cells (Req 14.1, 14.2). */}
      <RevealGroup
        as="ul"
        className={cn(
          "mt-40px grid grid-cols-1 gap-20px",
          "bp810:grid-cols-4 bp1200:grid-cols-6",
          "[grid-auto-flow:dense]",
        )}
      >
        {FEATURES.map((feature) => (
          <FeatureCell key={feature.id} feature={feature} />
        ))}
      </RevealGroup>
    </Section>
  );
}
