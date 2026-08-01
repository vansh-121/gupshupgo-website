import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Allowed heading levels. `<h1>` is reserved for `Hero` (Req 1.7, 6.3). */
export type HeadingLevel = 2 | 3 | 4;

interface SectionHeadingProps {
  /**
   * Identity of the owning region. The heading always emits
   * `id={`${sectionId}-heading`}` so `Section`'s `aria-labelledby` resolves.
   */
  sectionId: string;
  level?: HeadingLevel;
  className?: string;
  children: ReactNode;
}

/**
 * Level → size (Req 6.5–6.7).
 *
 * 2: 39px below Breakpoint_Small, 48px at and above it, line-height 110%.
 * 3: 39px, line-height 120%.
 * 4: a Type_Scale step below h3 with line-height 120%; the composites stop at
 *    h3, so the step and the line-height are named separately.
 */
const LEVEL_CLASSES: Record<HeadingLevel, string> = {
  2: "text-h2-sm bp810:text-h2",
  3: "text-h3",
  4: "text-25 leading-120",
};

/**
 * The only way a section heading is emitted (Req 1.7, 6.8).
 *
 * Level is a prop rather than a hard-coded tag, which keeps the "no skipped
 * level" invariant checkable by the tree-walking heading test.
 *
 * Every heading is font-weight 500 — `font-medium`, never `font-semibold` or
 * `font-bold` (Req 6.8, 6.9).
 */
export default function SectionHeading({
  sectionId,
  level = 2,
  className,
  children,
}: SectionHeadingProps) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";

  return (
    <Tag
      id={`${sectionId}-heading`}
      className={cn("font-medium text-ink-high", LEVEL_CLASSES[level], className)}
    >
      {children}
    </Tag>
  );
}
