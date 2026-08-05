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
 * The palette stays on `--gsg-*` for app parity (docs/TOKENS.md), but type,
 * weight, radius and elevation follow the site system: weights are 400/500 only
 * (Req 6.9), line-heights are 100–140 (Req 6.10), radii are `rounded-8` /
 * `rounded-pill` (Req 7.9), and boundaries are inset hairlines, not `border`
 * (Req 4.3).
 *
 * Accessibility is handled by `DeviceMockup`, which supplies the single
 * `role="img"` / `aria-label` pairing for the whole mockup.
 */
export default function ArcadeScreenContent({ screen }: ArcadeScreenContentProps) {
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      {/* App bar */}
      <header className="flex items-center justify-center bg-surface-alt px-16px pb-12px pt-40px shadow-hairline-12">
        <span className="text-14 font-medium leading-140 text-ink-high">{screen.title}</span>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-12px overflow-hidden px-12px py-12px">
        {/* Gup Points card */}
        <section className="rounded-8 bg-brand px-16px py-16px text-center">
          <p className="text-12 font-medium uppercase leading-130 tracking-wide text-white/80">
            {screen.pointsLabel}
          </p>
          <p className="mt-4px text-h3 font-medium tabular-nums text-white">
            {screen.points.toLocaleString()}
          </p>
        </section>

        {/* Streak card */}
        <section className="flex items-center gap-12px rounded-8 bg-surface-alt px-12px py-12px shadow-hairline-12">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-status-warning/15">
            <Flame className="h-4 w-4 text-status-warning" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-12 leading-130 text-ink-mid">{screen.streakLabel}</p>
            <p className="text-14 font-medium leading-140 tabular-nums text-ink-high">
              {screen.streakDays}
            </p>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="min-h-0 flex-1 rounded-8 bg-surface-alt px-12px py-12px shadow-hairline-12">
          <div className="flex items-center gap-8px">
            <Trophy className="h-3.5 w-3.5 text-brand" />
            <h3 className="text-12 font-medium uppercase leading-130 tracking-wide text-ink-mid">
              {screen.leaderboardTitle}
            </h3>
          </div>

          <ul className="mt-8px divide-y divide-hairline-divider">
            {screen.leaderboard.map((row) => (
              <li key={row.rank} className="flex items-center gap-10px py-8px">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-brand text-12 font-medium leading-100 tabular-nums text-white">
                  {row.rank}
                </span>
                <span className="min-w-0 flex-1 truncate text-14 leading-140 text-ink-high">
                  {row.name}
                </span>
                <span className="shrink-0 text-12 font-medium leading-130 tabular-nums text-ink-mid">
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
