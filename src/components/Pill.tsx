import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Semantic_Pill tint (Req 11.1). Each tint is a Brand_Accent-derived pastel
 * background paired with a darker foreground of the same hue, and every tint has
 * a Dark_Theme variant resolved in the token layer (Req 11.4).
 */
export type PillTint = "soft" | "mid" | "strong";

const TINT_CLASSES: Record<PillTint, string> = {
  soft: "bg-pill-soft text-pill-soft-fg",
  mid: "bg-pill-mid text-pill-mid-fg",
  strong: "bg-pill-strong text-pill-strong-fg",
};

export interface PillProps {
  /** Pastel tint. Defaults to `soft`. */
  tint?: PillTint;
  children: ReactNode;
  className?: string;
}

/**
 * Semantic_Pill — the small rounded label used for Pro badges and category
 * chips (Req 11).
 *
 * Pill border-radius 80px, font-weight 500, and a Type_Scale step at or below
 * 14px (Req 11.2). `text-13` is the default; the step is fixed here rather than
 * exposed as a prop so pills stay a single size across the page.
 *
 * ## Picking the tint
 *
 * Choose the tint one step above the band the pill sits on, otherwise the pill
 * body stops reading as a shape against its background (docs/TOKENS.md):
 *
 * | Band the pill sits on | Tint |
 * | --- | --- |
 * | `layer-0` | `soft` |
 * | `layer-1`, `layer-2` | `mid` |
 * | `layer-3`, `layer-tint` | `strong` |
 *
 * No `border` and no elevation: the tint alone carries the shape (Req 4.3, 5.2).
 */
export default function Pill({ tint = "soft", children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-12px py-4px",
        "text-13 font-medium leading-120",
        TINT_CLASSES[tint],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { Pill };
