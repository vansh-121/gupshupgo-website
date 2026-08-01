import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { FEATURES, type Feature, type FeatureCategory } from "@/data/features";

/**
 * Feature overview section (design §3.4, Requirements 4.1, 4.2, 4.4, 11.4, 12.3).
 *
 * Renders every entry of `FEATURES` — all 17 App_Feature_Set capabilities —
 * as a responsive card grid grouped by `category`. The data module is the only
 * source, so this section cannot drift from the JSON-LD `featureList`.
 *
 * Heading contract (design §6.3): the section owns the single `<h2>` via
 * `SectionHeading sectionId="features"`, and every card title is an `<h3>`.
 * Category group labels are deliberately *not* headings — they are plain text
 * wired to a `role="group"` via `aria-labelledby`, which keeps the outline at
 * h2 → h3 with no skipped level.
 */

/** Group render order, with the label shown above each group. */
const CATEGORY_LABELS: ReadonlyArray<readonly [FeatureCategory, string]> = [
  ["messaging", "Messaging"],
  ["privacy", "Privacy & security"],
  ["calling", "Calls"],
  ["connectivity", "Connectivity"],
  ["social", "Social"],
  ["arcade", "Gup Arcade"],
  ["account", "Account & app"],
];

/**
 * Requirement 4.4 — rendered if and only if `feature.isPro` is true, i.e. only
 * for wholly Pro-gated capabilities.
 */
function ProBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-pill bg-brand px-2.5 py-0.5 text-caption font-semibold text-white">
      <span className="sr-only">Requires GupShupGo </span>Pro
    </span>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { id, name, description, Icon, isPro } = feature;

  return (
    <li
      data-testid={`feature-card-${id}`}
      className="flex h-full flex-col gap-3 rounded-xl border border-hairline bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <Icon aria-hidden="true" className="h-6 w-6 text-brand" />
      <div className="flex flex-wrap items-center gap-2">
        <SectionHeading sectionId={`feature-${id}`} level={3} className="text-h3">
          {name}
        </SectionHeading>
        {isPro ? <ProBadge /> : null}
        {/* Status updates are free for text; only photo/video statuses need Pro (design §3.4). */}
        {id === "status" ? (
          <span className="inline-flex shrink-0 items-center rounded-pill border border-hairline px-2.5 py-0.5 text-caption font-medium text-ink-mid">
            Pro for media
          </span>
        ) : null}
      </div>
      <p className="text-body-sm text-ink-mid">{description}</p>
    </li>
  );
}

export default function FeatureOverview() {
  return (
    <Section id="features" background="surface-alt">
      <SectionHeading sectionId="features">Everything GupShupGo does</SectionHeading>
      <p className="mt-4 max-w-2xl text-body-lg text-ink-high">
        Every capability below ships in the Android app today.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {CATEGORY_LABELS.map(([category, label]) => {
          const group = FEATURES.filter((feature) => feature.category === category);
          if (group.length === 0) return null;

          const labelId = `features-${category}-label`;

          return (
            <div key={category} role="group" aria-labelledby={labelId}>
              <p
                id={labelId}
                className="text-caption font-semibold uppercase tracking-wide text-ink-high"
              >
                {label}
              </p>
              {/* Single column below md (Requirement 11.4). */}
              <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
