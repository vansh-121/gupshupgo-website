import { cn } from "@/lib/utils";
import PhoneFrame from "./PhoneFrame";
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
  /** Classes applied to the accessible wrapper around the device shell. */
  className?: string;
}

/**
 * Renders the CSS device mockup for a given screen (design §4).
 *
 * The `screen.id` discriminant selects the matching content component, so
 * adding a screen variant is a data + content-component change rather than a
 * change here.
 *
 * Accessibility (Requirement 9.4, 9.5): the whole mockup is exposed as a single
 * `role="img"` node labelled with `screen.altText`, and everything inside is
 * `aria-hidden` — assistive tech gets one coherent description instead of a
 * fake conversation read out as real content. Colours come from the App_Palette
 * tokens inside `PhoneFrame` and the content components, so the mockup tracks
 * the resolved theme with no per-theme asset.
 */
export default function DeviceMockup({ screen, className }: DeviceMockupProps) {
  return (
    <div role="img" aria-label={screen.altText} className={cn("w-full", className)}>
      <div aria-hidden="true">
        <PhoneFrame>
          {screen.id === "chat" && <ChatScreenContent screen={screen} />}
          {screen.id === "arcade" && <ArcadeScreenContent screen={screen} />}
          {screen.id === "call" && <CallScreenContent screen={screen} />}
        </PhoneFrame>
      </div>
    </div>
  );
}
