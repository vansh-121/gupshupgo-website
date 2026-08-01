import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  /** Screen content rendered inside the clipped inner viewport. */
  children: ReactNode;
  /** Classes applied to the outer device shell. */
  className?: string;
}

/**
 * Pure-CSS phone shell for the device mockup (design §4, Requirements 9.2, 14.3).
 *
 * There is no raster asset: the frame, notch, and screen are all rendered from
 * the shared palette tokens, so the mockup matches the resolved theme with no
 * per-theme image, and there is nothing to size or lazy-load (no CLS).
 *
 * Accessibility is deliberately not handled here — `DeviceMockup` supplies the
 * `role="img"` / `aria-label` pairing so assistive tech gets one coherent
 * description of the whole mockup rather than one per layer.
 */
export default function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        // Device body: 9:19.5 handset proportions, hairline bezel, top elevation.
        "relative mx-auto aspect-[9/19.5] w-full max-w-[320px]",
        "rounded-[2.5rem] border border-hairline bg-surface-alt p-[3px] shadow-xl",
        className,
      )}
    >
      {/* Screen: clips content to the rounded bezel radius. */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-surface">
        {/* Notch */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 flex h-6 w-24 -translate-x-1/2 items-center justify-center rounded-pill bg-ink-high/90">
          <span className="h-1.5 w-1.5 rounded-pill bg-ink-low" />
        </div>

        {/* Inner viewport */}
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
