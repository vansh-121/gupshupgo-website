import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { MockupChatScreen, MockupMessage } from "@/data/mockupScreens";

interface ChatScreenContentProps {
  /** Every visible string comes from here — nothing is hard-coded (Requirement 9.3). */
  screen: MockupChatScreen;
}

/** First letter of the contact name, used for the app-bar avatar. */
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/**
 * Delivery ticks for own messages. `read` uses the success status token; the
 * pending states stay on the brand bubble's own foreground so only a genuine
 * read receipt draws colour (design §4).
 */
function StatusTicks({ status }: { status: NonNullable<MockupMessage["status"]> }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center",
        status === "read" ? "text-status-success" : "text-white/70",
      )}
    >
      <svg viewBox="0 0 20 12" className="h-3 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M1 6.5 4.5 10 11 3" strokeLinecap="round" strokeLinejoin="round" />
        {status !== "sent" && (
          <path d="M8 6.5 11.5 10 18 3" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}

/** Compact voice-note affordance — the caption text still comes from the data module. */
function VoiceGlyph() {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-[2px]">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
      {[6, 10, 7, 12, 8].map((height, index) => (
        <span
          key={index}
          className="w-[2px] rounded-pill bg-current opacity-60"
          style={{ height: `${height}px` }}
        />
      ))}
    </span>
  );
}

function MessageBubble({ message }: { message: MockupMessage }) {
  const isSelf = message.author === "self";

  return (
    <li className={cn("flex", isSelf ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[78%] rounded-8 px-10px py-6px text-12 leading-130",
          isSelf ? "bg-brand text-white" : "bg-bubble-received text-ink-high",
        )}
      >
        <span className="flex items-center gap-1.5">
          {message.kind === "voice" && <VoiceGlyph />}
          {message.kind === "image" && (
            <span
              aria-hidden="true"
              className={cn(
                // Filled rather than outlined: the hairline steps are black in
                // Light_Theme, which would read as a dark notch on the brand
                // bubble. Inside a mockup the glyph is decoration either way.
                "h-3.5 w-3.5 shrink-0 rounded-8",
                isSelf ? "bg-white/50" : "shadow-hairline-24",
              )}
            />
          )}
          <span className="leading-130">{message.body}</span>
        </span>

        <span
          className={cn(
            "mt-2px flex items-center justify-end gap-4px text-8 leading-100",
            isSelf ? "text-white/75" : "text-ink-low",
          )}
        >
          {message.timeLabel}
          {isSelf && message.status && <StatusTicks status={message.status} />}
        </span>
      </div>
    </li>
  );
}

/**
 * Chat screen rendered from the mockup data module (design §4, Requirements
 * 9.2, 9.3, 9.5). Only App_Palette tokens are used, so the screen tracks the
 * resolved theme with no per-theme asset.
 *
 * The frame, and the `role="img"` / `aria-label` pairing, are supplied by
 * `PhoneFrame` and `DeviceMockup` — this component renders screen content only.
 */
export default function ChatScreenContent({ screen }: ChatScreenContentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex h-full w-full flex-col bg-surface-chat">
      {/* App bar */}
      <header className="flex shrink-0 items-center gap-8px bg-brand px-12px pb-8px pt-36px">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-white/20 text-12 font-medium leading-100 text-white"
        >
          {initials(screen.title)}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-12 font-medium leading-130 text-white">
            {screen.title}
          </span>
          <span className="block truncate text-8 leading-130 text-white/75">
            {screen.subtitle}
          </span>
        </span>

        <span className="shrink-0 rounded-pill bg-white/20 px-8px py-2px text-8 font-medium leading-130 text-white">
          {screen.streakLabel}
        </span>
      </header>

      {/* Message list */}
      <ul className="flex flex-1 flex-col justify-end gap-6px overflow-hidden px-10px py-12px">
        {screen.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing indicator: animated dots are suppressed under reduced motion
            (Requirement 12.6). */}
        {!prefersReducedMotion && (
          <li className="flex justify-start">
            <span
              aria-hidden="true"
              className="flex items-center gap-4px rounded-8 bg-bubble-received px-10px py-8px"
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="h-1 w-1 rounded-pill bg-ink-low motion-safe:animate-pulse"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
          </li>
        )}
      </ul>

      {/* Composer */}
      <div className="flex shrink-0 items-center gap-8px bg-surface px-10px py-8px shadow-hairline-12">
        <span className="h-5 flex-1 rounded-pill bg-surface-alt" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-brand text-white"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
            <path d="M3 20.5 21 12 3 3.5l3.6 7.1H14l-7.4.9z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
