import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import PhoneFrame, { type PhoneFrameSize } from "./PhoneFrame";
import ChatScreenContent from "./ChatScreenContent";
import ArcadeScreenContent from "./ArcadeScreenContent";
import CallScreenContent from "./CallScreenContent";
import type { MockupScreen } from "@/data/mockupScreens";

interface DeviceMockupProps {
  /**
   * Screen to render, sourced from `src/data/mockupScreens.ts`. Every visible
   * string — and the accessible name — originates there (Requirements 9.1, 9.3).
   */
  screen: MockupScreen;
  /** Device width variant, forwarded to `PhoneFrame` (Requirement 9.2, 9.3). */
  size?: PhoneFrameSize;
  /**
   * Overlay chips positioned over the frame (Requirements 9.4, 9.5). Rendered
   * ABOVE the frame in z-order and OUTSIDE the `role="img"` node, because chips
   * carry meaningful text — see the accessibility note below. Pass
   * `FloatingChip` elements carrying their own absolute-positioning classes.
   */
  chips?: ReactNode;
  /** Classes applied to the mockup's outer positioning wrapper. */
  className?: string;
}

/**
 * Renders the CSS device mockup for a given screen (design §4).
 *
 * The `screen.id` discriminant selects the matching content component, so
 * adding a screen variant is a data + content-component change rather than a
 * change here.
 *
 * Accessibility (Requirements 9.4, 9.5): the phone frame and its fake screen
 * content are exposed as a single `role="img"` node labelled with
 * `screen.altText`, and everything inside that node is `aria-hidden` —
 * assistive tech gets one coherent description instead of a fake conversation
 * read out as real content.
 *
 * Chips are deliberately NOT inside that node. `role="img"` makes all of its
 * descendants presentational, so a chip nested inside it would be silently
 * dropped from the accessibility tree; and Requirement 9.5 says chip text comes
 * from `src/data/`, i.e. it is real content that should be reachable. So the
 * root here is a plain positioning wrapper holding two siblings: the labelled
 * `role="img"` frame, and the chip layer, which stays in the accessibility tree
 * and is read as ordinary text after the image. Chips are therefore NOT folded
 * into `altText`.
 *
 * Colours come from the `--gsg-*` App_Palette tokens inside `PhoneFrame` and the
 * content components, so the mockup tracks the resolved theme with no per-theme
 * asset.
 */
export default function DeviceMockup({
  screen,
  size = "md",
  chips,
  className,
}: DeviceMockupProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div role="img" aria-label={screen.altText} className="w-full">
        <div aria-hidden="true">
          <PhoneFrame size={size}>
            {screen.id === "chat" && <ChatScreenContent screen={screen} />}
            {screen.id === "arcade" && <ArcadeScreenContent screen={screen} />}
            {screen.id === "call" && <CallScreenContent screen={screen} />}
          </PhoneFrame>
        </div>
      </div>

      {/* Chip layer: above the frame in z-order, inside the accessibility tree.
          `pointer-events-none` so chips never intercept clicks meant for the
          section; individual chips are not interactive. */}
      {chips ? (
        <div className="pointer-events-none absolute inset-0 z-10">{chips}</div>
      ) : null}
    </div>
  );
}
