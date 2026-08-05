import Pill from "@/components/Pill";
import { cn } from "@/lib/utils";
import { VISIBLE_FEATURES } from "@/data/features";
import type { PillTint } from "@/components/Pill";

/**
 * The Landing_Page's one and only Marquee (Req 13.1).
 *
 * Content is the visible feature *names* read straight from `@/data/features`
 * (Req 13.2) and rendered as Semantic_Pills — `VISIBLE_FEATURES`, so the sweep
 * cannot advertise Pro while `PRO_LAUNCHED` is false. Nothing else lives here: no
 * partner or customer logos, no testimonial text, no rating values (Req 13.7).
 *
 * Motion is entirely CSS, from the `.marquee*` utilities in `src/index.css`
 * (Req 13.4 — no animation library):
 *
 *   - `.marquee-mask`  the 270deg edge fade into the section background (13.3)
 *   - `.marquee-track` the translateX(0 → -50%) loop, which is why the item row
 *                      is rendered TWICE: -50% of a doubled row lands exactly on
 *                      the start of the copy, so the loop is seamless
 *   - `.marquee`       the pause hook — the stylesheet pauses the track on
 *                      `:focus-within`, so keyboard focus entering the marquee
 *                      stops it (13.5)
 *   - reduced motion   the stylesheet kills the animation and the transform, so
 *                      the items render as a static row (13.6)
 *
 * The `-50%` maths needs the two rows to be exactly equal halves of the track:
 * the track itself sets no gap and each row carries its own trailing `pr-12px`,
 * so the inter-row spacing is part of the row rather than of the track.
 *
 * Accessibility: the second row is a visual duplicate, so it is
 * `aria-hidden="true"` and the names are announced once. The first row stays in
 * the accessibility tree — this is decorative motion over real content, not
 * decoration in place of it.
 */

const FEATURE_MARQUEE_NAMES: readonly string[] = VISIBLE_FEATURES.map(
  (feature) => feature.name,
);

function MarqueeRow({
  tint,
  duplicate = false,
}: {
  tint: PillTint;
  duplicate?: boolean;
}) {
  return (
    <ul
      aria-hidden={duplicate ? "true" : undefined}
      className="flex shrink-0 items-center gap-12px pr-12px"
    >
      {FEATURE_MARQUEE_NAMES.map((name) => (
        <li key={name} className="shrink-0">
          <Pill tint={tint} className="whitespace-nowrap">
            {name}
          </Pill>
        </li>
      ))}
    </ul>
  );
}

export interface FeatureMarqueeProps {
  /**
   * Pill tint. Pick one step above the band the marquee sits on
   * (docs/TOKENS.md); defaults to `mid`, which is correct on `layer-1`.
   */
  tint?: PillTint;
  className?: string;
}

export default function FeatureMarquee({ tint = "mid", className }: FeatureMarqueeProps) {
  return (
    <div
      data-testid="feature-marquee"
      className={cn("marquee marquee-mask overflow-hidden", className)}
    >
      <div className="marquee-track flex w-max items-center">
        <MarqueeRow tint={tint} />
        <MarqueeRow tint={tint} duplicate />
      </div>
    </div>
  );
}

export { FeatureMarquee };
