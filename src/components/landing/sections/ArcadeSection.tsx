import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import DeviceMockup from "@/components/DeviceMockup/DeviceMockup";
import { getMockupScreen } from "@/data/mockupScreens";

/**
 * Gup Arcade deep dive (design §3.7, Requirement 5.2).
 *
 * Phrase contract: Gup Points, challenges, leaderboard, chat streaks (bonds)
 * with streak restore. Embeds the `arcade` device mockup screen.
 */
export default function ArcadeSection() {
  return (
    <Section id="arcade">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-prose">
          <SectionHeading sectionId="arcade">
            Gup Arcade keeps the conversation going
          </SectionHeading>
          <p className="mt-4 text-body-lg text-ink-mid">
            Gup Arcade turns everyday chatting into something you look forward to. Talk, play,
            climb, repeat.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Gup Points</h3>
              <p className="mt-2 text-body text-ink-mid">
                Earn Gup Points for staying active with the people you care about. Points add up
                across your chats and follow you everywhere in the app.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Challenges</h3>
              <p className="mt-2 text-body text-ink-mid">
                Rotating challenges give you a reason to reach out, from reply-speed goals to
                keeping a group buzzing for a week.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Leaderboard</h3>
              <p className="mt-2 text-body text-ink-mid">
                See where you stand on the leaderboard against your friends, and watch the ranking
                shift as everyone plays.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">
                Chat streaks and streak restore
              </h3>
              <p className="mt-2 text-body text-ink-mid">
                Chat streaks, called bonds, count every day you and a friend keep talking. Miss a
                day and streak restore brings the bond back so one busy afternoon does not undo
                months of conversation.
              </p>
            </div>
          </div>
        </div>

        <DeviceMockup
          screen={getMockupScreen("arcade")}
          className="mx-auto max-w-[320px]"
        />
      </div>
    </Section>
  );
}
