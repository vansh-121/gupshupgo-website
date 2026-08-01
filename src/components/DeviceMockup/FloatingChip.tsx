import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingChipProps {
  /**
   * Chip label. Requirement 9.5 requires this text to come from a typed module
   * in `src/data/`, so the component hardcodes no copy of its own.
   */
  children: ReactNode;
  /** Optional decorative leading icon. */
  icon?: ReactNode;
  /**
   * Positioning classes from the parent. Absolute-positioning utilities are
   * expected here (`absolute -left-6 top-24`, …) — the chip declares no
   * position of its own so the composing section owns the layout.
   */
  className?: string;
}

/**
 * Small overlay chip for floating over a phone frame (Requirements 9.4, 9.5).
 *
 * Boundary is an inset Hairline composed with Standard_Elevation in a single
 * `box-shadow` (Requirements 4.2, 4.3, 4.5) — no `border` property. The
 * `backdrop-filter` blur is 10px, one of the four permitted radii, and overlay
 * chips are one of the only two places `backdrop-filter` is allowed at all
 * (Requirement 5.5).
 *
 * The background is `--layer-0` mixed down to 72% alpha rather than a new
 * hardcoded colour, so it tracks the theme's base band and stays translucent
 * enough for the blur to be visible against the frame underneath.
 *
 * The chip is NOT decorative: it carries meaningful text, so it must be
 * rendered outside any `role="img"` or `aria-hidden` wrapper. `DeviceMockup`
 * places its `chips` slot accordingly.
 */
export default function FloatingChip({
  children,
  icon,
  className,
}: FloatingChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-8px rounded-pill px-12px py-8px",
        "text-14 font-medium leading-130 text-ink-high",
        "bg-[color:color-mix(in_srgb,var(--layer-0)_72%,transparent)]",
        "shadow-hairline-12-elevated backdrop-blur-[10px]",
        className,
      )}
    >
      {icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </div>
  );
}
