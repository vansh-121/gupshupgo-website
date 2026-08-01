import { cn } from "@/lib/utils";

interface SkipLinkProps {
  className?: string;
}

/**
 * Skip-to-content link (design §6.1, Requirements 11.1, 12.7).
 *
 * Rendered as the first child of `SiteShell`, so it is the first focusable
 * element on every route. Visually hidden until it receives keyboard focus,
 * at which point it becomes a fixed, high-contrast target.
 *
 * Its target `<main id="main-content" tabIndex={-1}>` is programmatically
 * focusable, so activation moves focus rather than only scrolling.
 */
export default function SkipLink({ className }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only",
        "focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100]",
        "focus-visible:rounded-lg focus-visible:bg-brand focus-visible:px-4 focus-visible:py-3",
        "focus-visible:text-body-sm focus-visible:font-medium focus-visible:text-white",
        "focus-visible:shadow-lg",
        className,
      )}
    >
      Skip to main content
    </a>
  );
}
