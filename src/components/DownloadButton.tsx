import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PLAY_STORE_URL } from '@/config/app';

/**
 * The single Download call-to-action component (Req 1.6).
 *
 * This is the ONLY module in the app that imports `PLAY_STORE_URL`; every other
 * consumer renders this component instead, so the store URL cannot drift.
 *
 * All variants are solid `bg-brand` fills. In dark theme the fill switches to
 * `brand-dark` (#6342E8) so the white label keeps a ~6.0:1 contrast ratio —
 * white on the dark-theme `brand` (#7C5CFC) would fail at body size (Req 16.1).
 *
 * Nova styling: pill radius, weight 500, Standard_Elevation as the only outer
 * shadow, and Standard_Transition on every state change (Req 5.2, 6.9, 7.9,
 * 14.5). Every variant is at least 44x44 CSS pixels (Req 8.6).
 */
export type DownloadButtonVariant = 'hero' | 'header' | 'closing';

const VARIANT_CLASSES: Record<DownloadButtonVariant, string> = {
  // Largest; stretches to the full container width below 640px.
  hero: 'h-14 min-h-[44px] w-full px-32px text-19 sm:w-auto',
  // Compact, for the sticky site header.
  header: 'h-11 min-h-[44px] min-w-[44px] px-16px text-14',
  // Large, for the closing download section.
  closing: 'h-[3.25rem] min-h-[44px] px-32px text-19',
};

export interface DownloadButtonProps {
  /** Visual size/placement preset. Defaults to `header`. */
  variant?: DownloadButtonVariant;
  /** Visible label. Defaults to "Download on Google Play". */
  children?: ReactNode;
  /** Extra classes merged onto the anchor. */
  className?: string;
}

export function DownloadButton({
  variant = 'header',
  children = 'Download on Google Play',
  className,
}: DownloadButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        /*
          `py-0 leading-100`: the Button primitive's default size is
          `h-10 px-4 py-2`, and every variant below overrides `h-*` and `px-*`
          but nothing was overriding `py-*` — so 16px of vertical padding was
          being added inside an explicit fixed height, pushing the label off
          optical centre. `py-0` neutralises it and `leading-100` makes the line
          box equal the font size, so the primitive's own
          `items-center justify-center` centres the label exactly.
        */
        'rounded-pill bg-brand py-0 font-medium shadow-elevation',
        // Standard_Transition (Req 14.5); neutralised under reduced motion (Req 15.3).
        'transition duration-200 ease-standard motion-reduce:transition-none',
        'hover:bg-brand-dark',
        VARIANT_CLASSES[variant],
        /*
          Colour and line-height come AFTER the variant so a size utility can
          never beat them. tailwind-merge classifies `text-19` as a font-size
          (see src/lib/utils.ts) and font-size conflicts with `leading-*`, so
          both `text-white` and `leading-100` have to be declared last.
        */
        'leading-100 text-white',
        'dark:bg-brand-dark dark:text-white dark:hover:bg-brand-dark',
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
