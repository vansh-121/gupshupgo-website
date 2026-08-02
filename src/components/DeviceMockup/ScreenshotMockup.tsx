import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";


export type ScreenshotFrameSize = "sm" | "md" | "lg";

interface ScreenshotMockupProps {
  /**
   * Light-mode screenshot path (relative to `public/`).
   * If `darkSrc` is not provided, this image is used in both modes.
   */
  lightSrc: string;
  /**
   * Dark-mode screenshot path. When omitted the `lightSrc` is used for both
   * themes — used for calling / screen-sharing which share one image.
   */
  darkSrc?: string;
  /** Accessible alt text describing the screenshot. */
  alt: string;
  /** Device width variant. */
  size?: ScreenshotFrameSize;
  /**
   * Enable the 3D perspective tilt showcase effect.
   * Defaults to `true`. Automatically disabled under `prefers-reduced-motion`.
   */
  tilt3d?: boolean;
  /**
   * Direction of the default tilt. `"left"` tilts the top-edge towards the
   * left (positive rotateY), `"right"` towards the right (negative rotateY).
   */
  tiltDirection?: "left" | "right";
  /** Classes applied to the outermost positioning wrapper. */
  className?: string;
}

/**
 * `max-width` per size variant, as a mobile → tablet → desktop ramp.
 *
 * The frame is `w-full` inside its column, so these caps are what stop a phone
 * mockup from rendering larger than the column that holds it. They step up
 * rather than being one fixed value because these frames appear both alone in a
 * full-width mobile column AND two-at-a-time inside a ~340px half-column at
 * Breakpoint_Small, where the desktop cap would overlap its sibling.
 */
const SIZE_MAX_WIDTH: Record<ScreenshotFrameSize, string> = {
  sm: "max-w-[184px] bp480:max-w-[208px] bp810:max-w-[232px]",
  md: "max-w-[248px] bp480:max-w-[288px] bp810:max-w-[320px]",
  // `lg`'s middle step is 340px, not 320px, so it clears the Hero front frame's
  // 336px wrapper. A 320px cap there would leave the frame 8px narrower than
  // the wrapper its floating chips are positioned against, pulling the chips
  // off the frame's edge in the 480–810px band.
  lg: "max-w-[272px] bp480:max-w-[340px] bp810:max-w-[380px]",
};


/**
 * The tilt is only enabled where a pointer can actually hover.
 *
 * The effect's rest state is a rotated frame that flattens on `mouseenter`. A
 * touch screen fires no `mouseenter`, so on a phone or tablet the mockup would
 * be stuck in its skewed rest state permanently with no way to see the
 * screenshot straight on — the tilt stops being a showcase and just reads as a
 * distorted image. Gating on `hover: hover` and `pointer: fine` means touch
 * devices get the frame flat and face-on, which is the point of a screenshot.
 */
const HOVER_CAPABLE_QUERY = "(hover: hover) and (pointer: fine)";


/** Rest-state transforms per tilt direction. */
const REST_TRANSFORM: Record<"left" | "right", string> = {
  left: "rotateY(8deg) rotateX(3deg)",
  right: "rotateY(-8deg) rotateX(3deg)",
};

const FLAT_TRANSFORM = "rotateY(0deg) rotateX(0deg) scale(1.02)";

/**
 * Premium phone-device mockup that renders a **real app screenshot** inside
 * a realistic CSS-only smartphone frame.
 *
 * The device is styled to look like a modern flagship phone (iPhone/Pixel
 * class) with:
 * - Titanium/aluminium chassis with gradient sheen
 * - Side buttons (volume rocker, power)
 * - Dynamic Island camera cutout
 * - Realistic inner-bezel glow and screen reflections
 * - Subtle glass-like edge highlight
 *
 * ## Theme-aware image swapping
 *
 * When both `lightSrc` and `darkSrc` are provided the component reads the
 * resolved theme from `next-themes` and renders the matching image.
 *
 * ## 3D Showcase
 *
 * When `tilt3d` is true (default) the frame starts with a subtle perspective
 * tilt that flattens on hover, creating a premium showcase feel. The effect
 * is disabled under `prefers-reduced-motion: reduce`, and also on any device
 * that cannot hover (see `HOVER_CAPABLE_QUERY`) — there the frame renders flat
 * and face-on, because the flatten gesture is unreachable by touch.
 *
 * ## Sizing
 *
 * The frame is fluid (`w-full`) and capped by a responsive `max-width` ramp per
 * `size`, so the same mockup fits a full-width phone column and a half-width
 * tablet column without a per-section override.
 */

export default function ScreenshotMockup({
  lightSrc,
  darkSrc,
  alt,
  size = "md",
  tilt3d = true,
  tiltDirection = "left",
  className,
}: ScreenshotMockupProps) {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const canHover = useMediaQuery(HOVER_CAPABLE_QUERY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark && darkSrc ? darkSrc : lightSrc;

  // `canHover` is the responsiveness gate: a touch device fires no
  // `mouseenter`, so an enabled tilt there could never be flattened again.
  const enable3d = tilt3d && !prefersReducedMotion && canHover;

  const restTransform = REST_TRANSFORM[tiltDirection];

  // Chassis colour varies by theme for realism
  const chassisGradient = isDark
    ? "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%)"
    : "linear-gradient(145deg, #e8e8ec 0%, #c8c8cc 50%, #d8d8dc 100%)";

  // Edge highlight — simulates light catching the chamfered edge
  const edgeHighlight = isDark
    ? "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 0 rgba(255,255,255,0.12)"
    : "inset 0 0 0 1px rgba(0,0,0,0.08), inset 0 1px 0 0 rgba(255,255,255,0.5)";

  // Outer shadow — device drop shadow + elevation
  const outerShadow = isDark
    ? "0 25px 60px -12px rgba(0,0,0,0.6), 0 8px 24px -4px rgba(0,0,0,0.4)"
    : "0 25px 60px -12px rgba(0,0,0,0.25), 0 8px 24px -4px rgba(0,0,0,0.12)";

  return (
    <div
      className={cn("group/mockup relative w-full", className)}
      style={enable3d ? { perspective: "1200px" } : undefined}
    >
      {/* Device body with 3D transform */}
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative mx-auto aspect-[9/19.5] w-full",
          SIZE_MAX_WIDTH[size],
        )}
        style={{
          background: chassisGradient,
          borderRadius: "2.8rem",
          padding: "4px",
          boxShadow: `${edgeHighlight}, ${outerShadow}`,
          ...(enable3d
            ? {
                transform: restTransform,
                transformStyle: "preserve-3d" as const,
                transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "transform",
              }
            : {}),
        }}
        onMouseEnter={(e) => {
          if (enable3d) {
            (e.currentTarget as HTMLElement).style.transform = FLAT_TRANSFORM;
          }
        }}
        onMouseLeave={(e) => {
          if (enable3d) {
            (e.currentTarget as HTMLElement).style.transform = restTransform;
          }
        }}
      >
        {/* ── Side buttons (pure CSS, aria-hidden) ── */}

        {/* Power button — right side */}
        <div
          aria-hidden="true"
          className="absolute -right-[3px] top-[28%] z-20"
          style={{
            width: "3px",
            height: "14%",
            borderRadius: "0 2px 2px 0",
            background: isDark
              ? "linear-gradient(180deg, #3a3a3e, #2a2a2e, #3a3a3e)"
              : "linear-gradient(180deg, #d0d0d4, #b8b8bc, #d0d0d4)",
            boxShadow: isDark
              ? "1px 0 2px rgba(0,0,0,0.4)"
              : "1px 0 2px rgba(0,0,0,0.1)",
          }}
        />

        {/* Volume Up — left side */}
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-[22%] z-20"
          style={{
            width: "3px",
            height: "8%",
            borderRadius: "2px 0 0 2px",
            background: isDark
              ? "linear-gradient(180deg, #3a3a3e, #2a2a2e, #3a3a3e)"
              : "linear-gradient(180deg, #d0d0d4, #b8b8bc, #d0d0d4)",
            boxShadow: isDark
              ? "-1px 0 2px rgba(0,0,0,0.4)"
              : "-1px 0 2px rgba(0,0,0,0.1)",
          }}
        />

        {/* Volume Down — left side */}
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-[32%] z-20"
          style={{
            width: "3px",
            height: "8%",
            borderRadius: "2px 0 0 2px",
            background: isDark
              ? "linear-gradient(180deg, #3a3a3e, #2a2a2e, #3a3a3e)"
              : "linear-gradient(180deg, #d0d0d4, #b8b8bc, #d0d0d4)",
            boxShadow: isDark
              ? "-1px 0 2px rgba(0,0,0,0.4)"
              : "-1px 0 2px rgba(0,0,0,0.1)",
          }}
        />

        {/* ── Inner bezel (the gap between chassis and screen) ── */}
        <div
          aria-hidden="true"
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: "2.5rem",
            background: isDark ? "#111113" : "#1a1a1e",
            padding: "3px",
          }}
        >
          {/* ── Screen viewport ── */}
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "2.3rem" }}
          >
            {/* Screenshot image */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />

            {/* Screen reflection overlay — subtle glass sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
                borderRadius: "2.3rem",
              }}
            />
          </div>
        </div>

        {/* Bottom bar indicator (home gesture) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
          style={{
            bottom: "6px",
            width: "36%",
            height: "4px",
            borderRadius: "80px",
            background: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {/* Ground shadow for 3D depth */}
      {enable3d && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 h-10 w-[65%] -translate-x-1/2 rounded-[50%] blur-2xl transition-standard group-hover/mockup:w-[75%]"
          style={{
            background: isDark
              ? "rgba(0,0,0,0.4)"
              : "rgba(0,0,0,0.12)",
          }}
        />
      )}
    </div>
  );
}
