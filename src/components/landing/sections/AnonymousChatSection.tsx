import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { bandFor } from "@/data/sections";
import { DEEP_DIVE_MIRRORED } from "./deepDiveLayout";
import { cn } from "@/lib/utils";

/**
 * Anonymous chat deep dive (design §3.7, Requirement 5.5).
 *
 * Phrase contract: chat without revealing your identity, matching lobby.
 *
 * Shows a real app screenshot of the anonymous chat screen in a 3D phone
 * mockup, replacing the previous icon composition (UserRound, Shuffle, Users).
 * The screenshot swaps between light/dark variants based on the site theme.
 *
 * The band comes from `bandFor("anonymous")` — derived from this section's
 * position in `VISIBLE_SECTIONS`, so it differs from both neighbours whatever
 * the Pro flag does to the order (Req 3.8).
 *
 * Layout: the MIRRORED variant of the shared contract in `deepDiveLayout.ts` —
 * desktop keeps the mockup on the LEFT and the copy on the right, applied as
 * grid placement rather than DOM order. Collapsed, the section reads heading →
 * lead → screenshot → detail blocks, so its frame does not land directly under
 * `calling`'s two-phone pair.
 */
export default function AnonymousChatSection() {
  return (
    <Section id="anonymous" band={bandFor("anonymous")}>
      <RevealGroup className={DEEP_DIVE_MIRRORED.container}>
        {/* Text column. `display: contents` below bp810 so the mockup can be
            ordered between the lead and the details — see deepDiveLayout.ts. */}
        <div className={DEEP_DIVE_MIRRORED.textGroup}>
          <Reveal className={cn(MEASURE_CLASSES[644], DEEP_DIVE_MIRRORED.lead)}>
            <SectionHeading sectionId="anonymous">Talk to someone new, anonymously</SectionHeading>
            <p className="mt-20px text-lead text-ink-high">
              Some conversations are easier with a stranger. Anonymous chat lets you chat without
              revealing your identity, so your name, number, and profile stay out of it.
            </p>
          </Reveal>

          <Reveal
            className={cn(MEASURE_CLASSES[644], DEEP_DIVE_MIRRORED.details, "space-y-24px")}
          >
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">Matching lobby</h3>
              <p className="mt-8px text-16 leading-140 text-ink-high">
                Join the matching lobby and get paired with another person who is looking for a
                conversation right now. No profiles to browse, no waiting around.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                Anonymous by default
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-high">
                You appear under a temporary handle. Nothing links the chat back to your real
                account unless you decide to share it yourself.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                Leave whenever you like
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-high">
                End a match with one tap and get a fresh one, and report anything that crosses the
                line. The same end-to-end encryption applies here too.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Screenshot mockup — anonymous chat. The frame carries its own
            responsive `max-width` ramp, so this only has to centre it. */}
        <Reveal
          as="div"
          className={cn("flex justify-center", DEEP_DIVE_MIRRORED.mockup)}
        >
          <div className="w-full max-w-[320px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/anonymous_chat_light.jpeg"
              darkSrc="/website-screenshots/anonymous_chat_dark.jpeg"
              alt="GupShupGo anonymous chat screen showing a temporary identity in the matching lobby."
              size="md"
              tilt3d
              tiltDirection="left"
            />
          </div>
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
