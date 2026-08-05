import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { bandFor } from "@/data/sections";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { DEEP_DIVE } from "./deepDiveLayout";
import { cn } from "@/lib/utils";

/**
 * Gup Arcade deep dive (design §3.7, Requirement 5.2).
 *
 * Phrase contract: Gup Points, challenges, leaderboard, chat streaks (bonds)
 * with streak restore. Shows a real app screenshot of the Arcade screen inside
 * a 3D phone mockup.
 *
 * The band comes from `bandFor("arcade")` — derived from this section's position
 * in `VISIBLE_SECTIONS`, so it always differs from its neighbours (Req 3.8).
 *
 * Layout: the shared contract in `deepDiveLayout.ts`. Desktop is the unchanged
 * text-left, mockup-right pair; collapsed it reads heading → lead → screenshot
 * → detail blocks.
 */
export default function ArcadeSection() {
  return (
    <Section id="arcade" band={bandFor("arcade")}>
      <RevealGroup className={DEEP_DIVE.container}>
        {/* Text column. `display: contents` below bp810 so the mockup can be
            ordered between the lead and the details — see deepDiveLayout.ts. */}
        <div className={DEEP_DIVE.textGroup}>
          <Reveal className={cn(MEASURE_CLASSES[644], DEEP_DIVE.lead)}>
            <SectionHeading sectionId="arcade">
              Gup Arcade keeps the conversation going
            </SectionHeading>
            <p className="mt-20px text-lead text-ink-secondary">
              Gup Arcade turns everyday chatting into something you look forward to. Talk, play,
              climb, repeat.
            </p>
          </Reveal>

          <Reveal className={cn(MEASURE_CLASSES[644], DEEP_DIVE.details, "space-y-24px")}>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">Gup Points</h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                Earn Gup Points for staying active with the people you care about. Points add up
                across your chats and follow you everywhere in the app.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">Challenges</h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                Rotating challenges give you a reason to reach out, from reply-speed goals to
                keeping a group buzzing for a week.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">Leaderboard</h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                See where you stand on the leaderboard against your friends, and watch the ranking
                shift as everyone plays.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                Chat streaks and streak restore
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                Chat streaks, called bonds, count every day you and a friend keep talking. Miss a
                day and streak restore brings the bond back so one busy afternoon does not undo
                months of conversation.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className={DEEP_DIVE.mockup}>
          <ScreenshotMockup
            lightSrc="/website-screenshots/gup_arcade_light.jpeg"
            darkSrc="/website-screenshots/gup_arcade_dark.jpeg"
            alt="GupShupGo Gup Arcade screen showing a Gup Points total, a chat streak counter, and the top three leaderboard places."
            size="md"
            tilt3d
            tiltDirection="right"
            className="mx-auto"
          />
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
