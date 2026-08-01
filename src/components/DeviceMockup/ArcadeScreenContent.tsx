import { Flame, Trophy } from "lucide-react";
import type { MockupArcadeScreen } from "@/data/mockupScreens";

interface ArcadeScreenContentProps {
  screen: MockupArcadeScreen;
}

/**
 * Gup Arcade screen rendered in React + CSS (design §4, Requirements 9.2, 9.3, 9.5).
 *
 * Every visible string and number comes from the `screen` prop, which is sourced
 * from `src/data/mockupScreens.ts` — nothing is hard-coded here (Req 9.3).
 * Colours resolve through the App_Palette tokens, so the screen matches the
 * active theme with no per-theme asset (Req 9.5).
 *
 * Accessibility is handled by `DeviceMockup`, which supplies the single
 * `role="img"` / `aria-label` pairing for the whole mockup.
 */
export default function ArcadeScreenContent({ screen }: ArcadeScreenContentProps) {
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      {/* App bar */}
      <header className="flex items-center justify-center border-b border-hairline bg-surface-alt px-4 pb-3 pt-10">
        <span className="text-body-sm font-semibold text-ink-high">{screen.title}</span>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-3 py-3">
        {/* Gup Points card */}
        <section className="rounded-xl bg-brand px-4 py-4 text-center">
          <p className="text-caption font-medium uppercase tracking-wide text-white/80">
            {screen.pointsLabel}
          </p>
          <p className="mt-1 text-h3 font-bold tabular-nums text-white">
            {screen.points.toLocaleString()}
          </p>
        </section>

        {/* Streak card */}
        <section className="flex items-center gap-3 rounded-xl border border-hairline bg-surface-alt px-3 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-status-warning/15">
            <Flame className="h-4 w-4 text-status-warning" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-caption text-ink-mid">{screen.streakLabel}</p>
            <p className="text-body-sm font-semibold tabular-nums text-ink-high">
              {screen.streakDays}
            </p>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="min-h-0 flex-1 rounded-xl border border-hairline bg-surface-alt px-3 py-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 text-brand" />
            <h3 className="text-caption font-semibold uppercase tracking-wide text-ink-mid">
              {screen.leaderboardTitle}
            </h3>
          </div>

          <ul className="mt-2 divide-y divide-hairline-divider">
            {screen.leaderboard.map((row) => (
              <li key={row.rank} className="flex items-center gap-2.5 py-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-brand text-caption font-semibold tabular-nums text-white">
                  {row.rank}
                </span>
                <span className="min-w-0 flex-1 truncate text-body-sm text-ink-high">
                  {row.name}
                </span>
                <span className="shrink-0 text-caption font-medium tabular-nums text-ink-mid">
                  {row.points.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
