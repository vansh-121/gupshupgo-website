import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Allowed heading levels. `<h1>` is reserved for `Hero` (design §6.3). */
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

const LEVEL_CLASSES: Record<HeadingLevel, string> = {
  2: "text-h2",
  3: "text-h3",
  4: "text-body-lg",
};

/**
 * The only way a section heading is emitted (design §6.3, Requirement 12.3).
 *
 * Level is a prop rather than a hard-coded tag, which keeps the "no skipped
 * level" invariant checkable by the tree-walking heading test.
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
      className={cn("font-semibold text-ink-high", LEVEL_CLASSES[level], className)}
    >
      {children}
    </Tag>
  );
}
