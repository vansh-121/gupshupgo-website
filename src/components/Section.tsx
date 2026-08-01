import type { ReactNode } from "react";
import type { SectionId } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Background surface for a section.
 *
 * Body copy colour is bound to the background here on purpose: `text-ink-mid`
 * only clears WCAG AA on `bg-surface`. On `bg-surface-alt` it measures 4.34:1
 * in the light theme, so alternating sections default their body copy to
 * `text-ink-high` (design §6.5).
 */
export type SectionBackground = "surface" | "surface-alt";

interface SectionProps {
  /** Section identity from the shared registry; also drives the heading id. */
  id: SectionId;
  background?: SectionBackground;
  /** Classes applied to the `<section>` element. */
  className?: string;
  /** Classes applied to the inner centred container. */
  containerClassName?: string;
  children: ReactNode;
}

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  surface: "bg-surface text-ink-mid",
  "surface-alt": "bg-surface-alt text-ink-high",
};

/**
 * Shared section wrapper (design §6.2, Requirements 3.6, 12.7, 12.9).
 *
 * Renders `<section id aria-labelledby={`${id}-heading`} tabIndex={-1}>` so
 * in-page navigation can move focus into the section and have its accessible
 * name announced. The heading with the matching id must be supplied by
 * `SectionHeading` with the same `sectionId`.
 *
 * Vertical rhythm and gutters come from the shared spacing scale:
 * `py-section` / `md:py-section-lg` and `px-gutter`.
 */
export default function Section({
  id,
  background = "surface",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-20 py-section md:py-section-lg",
        "focus-visible:outline-none",
        BACKGROUND_CLASSES[background],
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-[1400px] px-gutter", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
