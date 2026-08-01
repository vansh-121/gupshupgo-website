import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PLAY_STORE_URL } from '@/config/app';

/**
 * The single Download call-to-action component (design §3.5).
 *
 * This is the ONLY module in the app that imports `PLAY_STORE_URL`; every other
 * consumer renders this component instead, so the store URL cannot drift.
 *
 * All variants are solid `bg-brand` fills. In dark theme the fill switches to
 * `brand-dark` (#6342E8) so the white label keeps a ~6.0:1 contrast ratio —
 * white on the dark-theme `brand` (#7C5CFC) would fail at body size (design §6.5).
 *
 * Every variant is at least 44x44 CSS pixels (Requirement 11.5).
 */
export type DownloadButtonVariant = 'hero' | 'header' | 'closing';

const VARIANT_CLASSES: Record<DownloadButtonVariant, string> = {
  // Largest; stretches to the full container width below 640px.
  hero: 'h-14 min-h-[44px] w-full px-8 text-body-lg sm:w-auto',
  // Compact, for the sticky site header.
  header: 'h-11 min-h-[44px] min-w-[44px] px-4 text-body-sm',
  // Large, for the closing download section.
  closing: 'h-[3.25rem] min-h-[44px] px-8 text-body-lg',
};

export interface DownloadButtonProps {
  /** Visual size/placement preset. Defaults to `header`. */
  variant?: DownloadButtonVariant;
  /** Visible label. Defaults to "Get GupShupGo on Google Play". */
  children?: ReactNode;
  /** Extra classes merged onto the anchor. */
  className?: string;
}

export function DownloadButton({
  variant = 'header',
  children = 'Get GupShupGo on Google Play',
  className,
}: DownloadButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        'rounded-pill bg-brand font-semibold text-white shadow-sm transition-colors',
        'hover:bg-brand-dark',
        'dark:bg-brand-dark dark:text-white dark:hover:bg-brand-dark dark:hover:shadow-md',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="download-cta"
      >
        {children}
      </a>
    </Button>
  );
}

export default DownloadButton;
