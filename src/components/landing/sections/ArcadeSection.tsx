import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import DeviceMockup from "@/components/DeviceMockup/DeviceMockup";
import { getMockupScreen } from "@/data/mockupScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Gup Arcade deep dive (design §3.7, Requirement 5.2).
 *
 * Phrase contract: Gup Points, challenges, leaderboard, chat streaks (bonds)
 * with streak restore. Embeds the `arcade` device mockup screen.
 *
 * Band 1 — its neighbours (`mesh` before, `privacy` after) sit on band 0, so
 * adjacent sections differ (Req 3.8).
 */
export default function ArcadeSection() {
  return (
    <Section id="arcade" band={1}>
      <RevealGroup className="grid grid-cols-1 items-center gap-48px bp810:grid-cols-2 bp810:gap-64px">
        <Reveal className={cn(MEASURE_CLASSES[644])}>
          <SectionHeading sectionId="arcade">
            Gup Arcade keeps the conversation going
          </SectionHeading>
          <p className="mt-20px text-lead text-ink-secondary">
            Gup Arcade turns everyday chatting into something you look forward to. Talk, play,
            climb, repeat.
          </p>

          <div className="mt-32px space-y-24px">
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
          </div>
        </Reveal>

        <Reveal>
          <DeviceMockup
            screen={getMockupScreen("arcade")}
            size="md"
            className="mx-auto max-w-[320px]"
          />
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
