import FeatureMarquee from "@/components/FeatureMarquee";
import Pill from "@/components/Pill";
import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { PRO_LAUNCHED } from "@/config/app";
import { VISIBLE_FEATURES, showProLabel, type Feature } from "@/data/features";
import { bandFor } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Feature overview section — bento grid (Req 10, 13, 14).
 *
 * Every entry of `VISIBLE_FEATURES` renders as one grid cell (Req 1.3, 10.3):
 * all 17 App_Feature_Set capabilities once `PRO_LAUNCHED` is true, and the 16
 * non-Pro capabilities while it is false. The data module stays the only source,
 * so this section cannot drift from the JSON-LD `featureList`.
 *
 * ## Composition: rows, not spans (Req 10.1)
 *
 * The grid varies **width only**. There is no `row-span-*` and no
 * `grid-auto-flow: dense` anywhere here, and that is deliberate: a row span
 * punches a single-height hole that dense auto-placement back-fills with
 * whatever cell happens to fit, and a span that does not divide the track
 * evenly leaves rows that never close. The result was a ragged grid with
 * mismatched cell heights and holes.
 *
 * Instead the composition is an explicit, ordered list of ROWS per track — see
 * `ROWS_BP1200` / `ROWS_BP810`. Every row's spans sum to exactly the track
 * width, so every row closes, and cells that share a CSS grid row share their
 * height automatically. That equal-height banding is what reads as intentional.
 *
 * | Viewport | Track | Plan |
 * | --- | --- | --- |
 * | < 810px | 1 column (Req 10.5) | one cell per row, DOM order |
 * | ≥ 810px | 6 columns | `ROWS_BP810` |
 * | ≥ 1200px | 12 columns | `ROWS_BP1200` |
 *
 * DOM render order is *derived* from `ROWS_BP1200` (`CELLS`), so markup and
 * layout cannot disagree. Both plans are validated in development: rows must sum
 * to the track width, both plans must be exhaustive over `VISIBLE_FEATURES`, and
 * their flattened orders must match — a single DOM order has to satisfy both
 * tracks.
 *
 * Order is editorial rather than interactive (these cells are not links):
 * differentiators lead — encryption, offline mesh, arcade, anonymous chat,
 * calling — and account/utility capabilities trail.
 *
 * ## Size carries weight (Req 10.1)
 *
 * A wide cell with small type reads as an empty box, so the size tier is derived
 * from the bp1200 span (`tierFor`) and drives type, padding and the icon
 * treatment: hero cells (span ≥ 6) take 25px headings, 19px copy and a
 * brand-tinted icon chip; medium (span 4) and compact (span ≤ 3) step down the
 * ramp. Each cell is a flex column whose description `grow`s, so a hero cell
 * with short copy has no pool of dead space under the text.
 *
 * ## Bands
 *
 * The section band comes from `bandFor("features")`, which is 1 in both flag
 * states; cells are band 0, so they read as raised in both themes (the ramp's
 * luminance direction flips per theme, docs/TOKENS.md). `layer-tint` is
 * reserved for one section elsewhere and is never used on a cell. Pills on a
 * cell sit on `layer-0` and take the `soft` tint; the marquee sits directly on
 * the band, so its pills take `mid`.
 *
 * ## Colour vs. type in `cn`
 *
 * `tailwind-merge` classifies the numeric ramp steps (`text-19`, `text-25`, …)
 * in the same group as `text-*` colours, so a size class and a colour class in
 * one `cn` call silently drop one of the two. Colour is therefore set on
 * non-sized wrapper elements and inherited: the cell carries
 * `text-ink-secondary` for the copy, the title row carries `text-ink-high` for
 * the `<h3>`, and only sizes are passed to the sized elements.
 *
 * ## Marquee placement (Req 13.1)
 *
 * The page's single Marquee leads this section in, between the intro paragraph
 * and the grid — an at-a-glance sweep of every visible capability *name* against
 * the grid's detail read.
 *
 * ## Heading contract (Req 10.6)
 *
 * The section owns the single `<h2>` via `SectionHeading sectionId="features"`
 * and every cell title is an `<h3>` through `SectionHeading level={3}`, so the
 * outline is h2 → h3 with no skipped level.
 */

/** One planned cell: which feature, and how many columns it takes. */
interface PlannedCell {
  readonly featureId: string;
  readonly span: number;
}

/** An ordered list of rows; each row an ordered list of cells. */
type GridPlan = readonly (readonly PlannedCell[])[];

const c = (featureId: string, span: number): PlannedCell => ({ featureId, span });

/** 12-column track, ≥ 1200px. Every row sums to 12. */
const ROWS_BP1200: GridPlan = PRO_LAUNCHED
  ? [
    [c("encryption", 6), c("mesh", 6)],
    [c("pro", 6), c("arcade", 6)],
    [c("calls", 4), c("anonymous", 4), c("messaging", 4)],
    [c("vault", 3), c("status", 3), c("screen-share", 3), c("call-logs", 3)],
    [c("qr-add", 3), c("public-profile", 3), c("contacts", 3), c("phone-auth", 3)],
    [c("notifications", 6), c("themes", 6)],
  ]
  : [
    [c("encryption", 6), c("mesh", 6)],
    [c("calls", 4), c("arcade", 4), c("anonymous", 4)],
    [c("messaging", 6), c("vault", 3), c("status", 3)],
    [c("screen-share", 4), c("call-logs", 4), c("qr-add", 4)],
    [c("public-profile", 3), c("contacts", 3), c("phone-auth", 3), c("notifications", 3)],
    [c("themes", 12)],
  ];

/**
 * 6-column track, ≥ 810px. Every row sums to 6.
 *
 * The Pro-launched plan pairs `mesh` with `pro` in row 2 in that order — not
 * `pro, mesh` — because there is only one DOM order and `ROWS_BP1200` places
 * `mesh` first. Both cells span 3, so the row is unchanged otherwise.
 */
const ROWS_BP810: GridPlan = PRO_LAUNCHED
  ? [
    [c("encryption", 6)],
    [c("mesh", 3), c("pro", 3)],
    [c("arcade", 3), c("calls", 3)],
    [c("anonymous", 3), c("messaging", 3)],
    [c("vault", 2), c("status", 2), c("screen-share", 2)],
    [c("call-logs", 2), c("qr-add", 2), c("public-profile", 2)],
    [c("contacts", 3), c("phone-auth", 3)],
    [c("notifications", 3), c("themes", 3)],
  ]
  : [
    [c("encryption", 6)],
    [c("mesh", 3), c("calls", 3)],
    [c("arcade", 3), c("anonymous", 3)],
    [c("messaging", 6)],
    [c("vault", 2), c("status", 2), c("screen-share", 2)],
    [c("call-logs", 2), c("qr-add", 2), c("public-profile", 2)],
    [c("contacts", 3), c("phone-auth", 3)],
    [c("notifications", 3), c("themes", 3)],
  ];

function flatten(plan: GridPlan): readonly PlannedCell[] {
  return plan.flat();
}

/**
 * Development-only guards. A plan that does not sum, is not exhaustive over
 * `VISIBLE_FEATURES`, or disagrees with the other plan's order is a layout bug
 * that must fail loudly rather than silently drop or misplace a card.
 */
function assertPlans() {
  const check = (plan: GridPlan, track: number, label: string) => {
    plan.forEach((row, index) => {
      const sum = row.reduce((total, entry) => total + entry.span, 0);
      if (sum !== track) {
        throw new Error(
          `FeatureOverview: ${label} row ${index + 1} sums to ${sum}, expected ${track} ` +
          `(${row.map((entry) => `${entry.featureId} ${entry.span}`).join(", ")})`,
        );
      }
    });

    const planned = flatten(plan).map((entry) => entry.featureId);
    const visible = VISIBLE_FEATURES.map((feature) => feature.id);
    const missing = visible.filter((id) => !planned.includes(id));
    const unknown = planned.filter((id) => !visible.includes(id));
    if (missing.length > 0 || unknown.length > 0) {
      throw new Error(
        `FeatureOverview: ${label} is not exhaustive over VISIBLE_FEATURES ` +
        `(missing: ${missing.join(", ") || "none"}; unknown: ${unknown.join(", ") || "none"})`,
      );
    }
    if (planned.length !== visible.length) {
      throw new Error(
        `FeatureOverview: ${label} plans ${planned.length} cells for ${visible.length} features`,
      );
    }
  };

  check(ROWS_BP1200, 12, "bp1200 plan");
  check(ROWS_BP810, 6, "bp810 plan");

  const wide = flatten(ROWS_BP1200).map((entry) => entry.featureId).join(",");
  const mid = flatten(ROWS_BP810).map((entry) => entry.featureId).join(",");
  if (wide !== mid) {
    throw new Error(
      "FeatureOverview: bp1200 and bp810 plans disagree on order; one DOM order must satisfy both",
    );
  }
}

if (import.meta.env.DEV) {
  assertPlans();
}

/** A cell ready to render: its feature plus its span on each track. */
interface ResolvedCell {
  readonly feature: Feature;
  readonly wideSpan: number;
  readonly midSpan: number;
}

const FEATURES_BY_ID = new Map(VISIBLE_FEATURES.map((feature) => [feature.id, feature]));
const MID_SPANS_BY_ID = new Map(
  flatten(ROWS_BP810).map((entry) => [entry.featureId, entry.span]),
);

/**
 * DOM order derived from the bp1200 plan — the single source for markup order,
 * so layout and markup cannot disagree. Entries whose id is not in
 * `VISIBLE_FEATURES` are impossible (the dev guard above throws first) and are
 * dropped rather than rendered as a blank cell.
 */
const CELLS: readonly ResolvedCell[] = flatten(ROWS_BP1200).flatMap((entry) => {
  const feature = FEATURES_BY_ID.get(entry.featureId);
  if (!feature) return [];
  return [
    {
      feature,
      wideSpan: entry.span,
      midSpan: MID_SPANS_BY_ID.get(entry.featureId) ?? entry.span,
    },
  ];
});

/** Static class strings, so Tailwind's content scan sees every span used. */
const WIDE_SPAN_CLASSES: Readonly<Record<number, string>> = {
  3: "bp1200:col-span-3",
  4: "bp1200:col-span-4",
  6: "bp1200:col-span-6",
  12: "bp1200:col-span-12",
};

const MID_SPAN_CLASSES: Readonly<Record<number, string>> = {
  2: "bp810:col-span-2",
  3: "bp810:col-span-3",
  6: "bp810:col-span-6",
};

/** Visual weight, derived from the bp1200 span so width and type agree. */
type CellTier = "hero" | "medium" | "compact";

function tierFor(wideSpan: number): CellTier {
  if (wideSpan >= 6) return "hero";
  if (wideSpan === 4) return "medium";
  return "compact";
}

interface TierStyle {
  /** Padding + internal rhythm. */
  readonly cell: string;
  /** Heading step + line-height only — colour is inherited, see the note above. */
  readonly heading: string;
  /** Body step + line-height only. */
  readonly body: string;
  /** Icon box. */
  readonly icon: string;
}

const TIER_STYLES: Record<CellTier, TierStyle> = {
  hero: {
    // Mobile: compact sizing; hero sizing kicks in at the wide breakpoint.
    cell: "gap-12px p-24px bp1200:gap-16px bp1200:p-32px",
    heading: "text-19 leading-130 bp1200:text-25 bp1200:leading-120",
    body: "text-16 leading-140 bp1200:text-19",
    icon: "h-20px w-20px bp1200:h-24px bp1200:w-24px",
  },
  medium: {
    // Mobile: compact sizing; medium sizing kicks in at the mid breakpoint.
    cell: "gap-12px p-24px",
    heading: "text-19 leading-130 bp810:text-21 bp810:leading-130",
    body: "text-16 leading-140",
    icon: "h-20px w-20px bp810:h-24px bp810:w-24px",
  },
  compact: {
    cell: "gap-12px p-24px",
    heading: "text-19 leading-130",
    body: "text-16 leading-140",
    icon: "h-20px w-20px",
  },
};

function FeatureCell({ cell }: { cell: ResolvedCell }) {
  const { feature, wideSpan, midSpan } = cell;
  const { id, name, description, Icon, proNote } = feature;
  const tier = tierFor(wideSpan);
  const style = TIER_STYLES[tier];

  return (
    <Reveal
      as="li"
      data-testid={`feature-card-${id}`}
      className={cn(
        // Hairline boundary as an inset shadow, never the `border` property
        // (Req 4.2, 4.3), on a band-0 surface with the 8px radius (Req 10.2).
        "flex h-full flex-col rounded-8 bg-layer-0 shadow-hairline-12",
        "text-ink-secondary transition-standard",
        style.cell,
        MID_SPAN_CLASSES[midSpan],
        WIDE_SPAN_CLASSES[wideSpan],
      )}
    >
      {/* Hero cells get a brand-tinted chip as their visual anchor at bp1200+;
          on mobile/tablet they use the plain accent glyph like other tiers. */}
      {tier === "hero" ? (
        <span
          aria-hidden="true"
          className="inline-flex h-40px w-40px shrink-0 items-center justify-center rounded-8 bg-pill-soft text-pill-soft-fg bp1200:h-48px bp1200:w-48px"
        >
          <Icon className={style.icon} />
        </span>
      ) : (
        <Icon aria-hidden="true" className={cn("shrink-0 text-ink-accent", style.icon)} />
      )}

      <div className="flex flex-wrap items-center gap-8px text-ink-high">
        <SectionHeading sectionId={`feature-${id}`} level={3} className={style.heading}>
          {name}
        </SectionHeading>
        {/* Req 10.4 — only wholly Pro-gated entries get the badge, and only
            once Pro has launched. `showProLabel` is the only permitted read, so
            `screen-share` carries no badge while the flag is false. */}
        {showProLabel(feature) ? (
          <Pill tint="soft">
            <span className="sr-only">Requires GupShupGo </span>Pro
          </Pill>
        ) : null}
        {/* Partly Pro-gated entries (today: statuses) surface their `proNote`
            as a pill, again only once Pro has launched. */}
        {PRO_LAUNCHED && proNote ? (
          <Pill tint="soft">
            <span className="sr-only">{proNote}</span>
            <span aria-hidden="true">Pro for media</span>
          </Pill>
        ) : null}
      </div>

      {/* `grow` absorbs the leftover height, so short copy in a wide cell does
          not leave a pool of dead space beneath the text. */}
      <p className={cn("grow", style.body)}>{description}</p>
    </Reveal>
  );
}

export default function FeatureOverview() {
  return (
    <Section id="features" band={bandFor("features")}>
      <SectionHeading sectionId="features">Everything GupShupGo does</SectionHeading>
      <p className={cn(MEASURE_CLASSES[644], "mt-20px text-lead text-ink-high")}>
        Every capability below ships in the Android app today.
      </p>

      {/* Lead-in sweep of every visible name before the detail read. */}
      <FeatureMarquee tint="mid" className="mt-40px" />

      {/* One observer staggers every cell (Req 14.1, 14.2). Width-only spans on
          a 6- then 12-column track: no row spans, no dense flow. */}
      <RevealGroup
        as="ul"
        className={cn("mt-40px grid grid-cols-1 gap-20px", "bp810:grid-cols-6 bp1200:grid-cols-12")}
      >
        {CELLS.map((cell) => (
          <FeatureCell key={cell.feature.id} cell={cell} />
        ))}
      </RevealGroup>
    </Section>
  );
}
