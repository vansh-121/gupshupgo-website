import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Accessible light/dark theme toggle.
 *
 * Design §2.3:
 * - 44x44 native button (Requirement 11.5)
 * - `mounted` guard renders a same-size placeholder so layout never shifts
 * - accessible name states both the action and the current theme (Requirement 2.6)
 * - a visually hidden polite live region announces the new state after activation
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClasses = cn(
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill",
    // The boundary is this control's sole visual affordance, so it takes the
    // lightest hairline step that clears 3:1 (Req 4.4) as an inset shadow —
    // never the `border` property (Req 4.3).
    "bg-layer-0 text-ink-high shadow-hairline-56",
    "transition-standard hover:bg-layer-1 motion-reduce:transition-none",
    className,
  );

  // Until mounted, `resolvedTheme` is undefined, so render an inert placeholder
  // of identical dimensions rather than guessing the current theme.
  if (!mounted) {
    return <div aria-hidden="true" className={buttonClasses} />;
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark
    ? "Switch to light theme (currently dark)"
    : "Switch to dark theme (currently light)";

  return (
    <>
      <button
        type="button"
        aria-label={label}
        className={buttonClasses}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <Sun aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Moon aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {isDark ? "Dark theme active" : "Light theme active"}
      </span>
    </>
  );
}
