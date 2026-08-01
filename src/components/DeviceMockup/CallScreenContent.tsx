import { Lock, MonitorUp, Mic, Video, PhoneOff } from "lucide-react";
import type { MockupCallScreen } from "@/data/mockupScreens";

interface CallScreenContentProps {
  screen: MockupCallScreen;
}

/**
 * Calling screen rendered in React + CSS (design §4, Requirements 9.2, 9.3, 9.5, 9.6).
 *
 * Caller name, status, duration, screen-share indicator, and encryption label all
 * come from the `screen` prop sourced from `src/data/mockupScreens.ts` (Req 9.3),
 * and no calling vendor or SDK is named or branded anywhere on the screen
 * (Req 9.6). Colours resolve through App_Palette tokens (Req 9.5).
 *
 * Accessibility is handled by `DeviceMockup`, which supplies the single
 * `role="img"` / `aria-label` pairing for the whole mockup.
 */
export default function CallScreenContent({ screen }: CallScreenContentProps) {
  const initials = screen.callerName.trim().charAt(0).toUpperCase();

  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand-dark px-4 pb-5 pt-12">
      {/* Encryption + screen-share indicators */}
      <div className="flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-2.5 py-1">
          <Lock className="h-3 w-3 text-status-success" />
          <span className="text-12 font-medium leading-130 text-white/85">
            {screen.encryptionLabel}
          </span>
        </span>

        {screen.isScreenSharing && (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand px-2.5 py-1">
            <MonitorUp className="h-3 w-3 text-white" />
            <span className="text-12 font-medium leading-130 text-white">
              {screen.screenShareLabel}
            </span>
          </span>
        )}
      </div>

      {/* Caller identity */}
      <div className="flex flex-col items-center gap-3">
        <span className="flex h-20 w-20 items-center justify-center rounded-pill bg-white/15 text-h3 font-medium text-white">
          {initials}
        </span>
        <div className="text-center">
          <p className="text-19 font-medium leading-120 text-white">{screen.callerName}</p>
          <p className="mt-2px text-12 leading-130 text-white/70">{screen.statusLabel}</p>
          <p className="mt-4px text-14 font-medium leading-140 tabular-nums text-white/85">
            {screen.durationLabel}
          </p>
        </div>
      </div>

      {/* Call controls — decorative, no vendor branding */}
      <div className="flex items-center justify-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-white/10">
          <Mic className="h-4 w-4 text-white" />
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-white/10">
          <Video className="h-4 w-4 text-white" />
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-status-error">
          <PhoneOff className="h-4 w-4 text-white" />
        </span>
      </div>
    </div>
  );
}
