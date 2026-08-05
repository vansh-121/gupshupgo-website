import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Frame width variants. The hero composes two frames at different sizes. */
export type PhoneFrameSize = "sm" | "md" | "lg";

interface PhoneFrameProps {
  /** Screen content rendered inside the clipped inner viewport. */
  children: ReactNode;
  /**
   * Device width variant (Requirement 9.2, 9.3). Only `max-width` changes; the
   * 9:19.5 aspect ratio is fixed at every size so the frame never distorts.
   */
  size?: PhoneFrameSize;
  /** Classes applied to the outer device shell. */
  className?: string;
}

/** `max-width` per variant. Aspect ratio is shared, so only the cap differs. */
const SIZE_MAX_WIDTH: Record<PhoneFrameSize, string> = {
  sm: "max-w-[232px]",
  md: "max-w-[320px]",
  lg: "max-w-[380px]",
};

/**
 * Pure-CSS phone shell for the device mockup (design §4, Requirements 9.2, 14.3).
 *
 * There is no raster asset: the frame, notch, and screen are all rendered from
 * the shared `--gsg-*` app palette tokens, so the mockup matches the resolved
 * theme with no per-theme image, and there is nothing to size or lazy-load (no
 * CLS). The internals deliberately stay on the app palette rather than the
 * `layer-*` band tokens — that is what keeps the mockup pixel-identical to the
 * real Flutter screens.
 *
 * Elevation: `--elevation-mockup` is the sole permitted exception to the
 * single-elevation rule, and it applies only to phone frames (Requirement 5.3).
 * It is composed with the inset Hairline bezel in ONE `box-shadow` declaration
 * (Requirements 4.2, 4.3, 4.5) — no `border` property is used, so the bezel
 * stays exactly one device pixel at any zoom level. The `shadow-hairline-*-
 * elevated` keys pair the hairline with Standard_Elevation, not with the mockup
 * shadow, hence the arbitrary value here.
 *
 * Accessibility is deliberately not handled here — `DeviceMockup` supplies the
 * `role="img"` / `aria-label` pairing so assistive tech gets one coherent
 * description of the whole mockup rather than one per layer.
 */
export default function PhoneFrame({
  children,
  size = "md",
  className,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        // Device body: 9:19.5 handset proportions at every size.
        "relative mx-auto aspect-[9/19.5] w-full",
        SIZE_MAX_WIDTH[size],
        // Hairline bezel + Mockup_Elevation in a single box-shadow (Req 4.5).
        "rounded-[2.5rem] bg-surface-alt p-[3px]",
        "shadow-[inset_0_0_0_1px_var(--hairline-12),var(--elevation-mockup)]",
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
