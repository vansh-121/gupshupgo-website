import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { bandFor } from "@/data/sections";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Calling deep dive (design §3.7, Requirement 5.4).
 *
 * Phrase contract: HD video calls, voice calls, incoming calls in the
 * background, screen sharing. Shows two real app screenshots in overlapping
 * 3D phone frames — the call screen in front and the screen-sharing view
 * behind it.
 *
 * Both screenshots use the same image for light and dark modes (exception
 * requested by the user for calling/screen-sharing content).
 *
 * The band comes from `bandFor("calling")` — derived from this section's position
 * in `VISIBLE_SECTIONS`, so it always differs from its neighbours (Req 3.8).
 */
export default function CallingSection() {
  return (
    <Section id="calling" band={bandFor("calling")}>
      <RevealGroup className="grid grid-cols-1 items-center gap-48px bp810:grid-cols-2 bp810:gap-64px">
        {/* Two-phone composition — call screen in front, screen sharing behind.
            The pair stays fanned at EVERY width rather than splitting into two
            separate stacked screenshots on a phone: the overlap is the visual.

            It fits a ~337px tablet column and a 320px phone because it is sized
            in percentages of the group, not in pixels — 55% front, 50% rear,
            overlapping by 5% — so the whole composition scales as one object
            and the rear frame can never be pushed out of the column. */}
        <Reveal
          as="div"
          className="mx-auto flex w-full max-w-[500px] items-start justify-center"
        >
          {/* Call screen — left, tilted left */}
          <div className="relative z-10 -mr-[5%] w-[55%] max-w-[260px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/call_screen_both_light_dark.jpeg"
              alt="GupShupGo call screen showing an end-to-end encrypted HD video call with screen sharing active."
              size="md"
              tilt3d
              tiltDirection="left"
            />
          </div>

          {/* Screen sharing — right, tilted right, pushed down by a percentage
              of the group width so the drop scales with the pair. */}
          <div className="pointer-events-none z-0 mt-[7%] w-[50%] max-w-[240px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/screen_sharing_both_light_dark.jpeg"
              alt="GupShupGo screen sharing view during a video call."
              size="sm"
              tilt3d
              tiltDirection="right"
            />
          </div>
        </Reveal>


        <Reveal className={cn(MEASURE_CLASSES[644])}>
          <SectionHeading sectionId="calling">HD video and voice calls</SectionHeading>
          <p className="mt-20px text-lead text-ink-secondary">
            Calls feel like being in the same room. HD video calls and voice calls run encrypted
            end to end, and they hold up on ordinary mobile connections.
          </p>

          <div className="mt-32px space-y-24px">
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">HD video calls</h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                Sharp, smooth HD video calls with adaptive quality, so the picture holds together
                when the connection wobbles.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">Voice calls</h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                Clear voice calls when video is more than you need, with echo suppression and noise
                handling built in.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                Incoming calls in the background
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                You get incoming calls in the background with a full-screen ringing screen, even
                when GupShupGo is closed or your phone is locked. No missed calls because an app
                was not open.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">Screen sharing</h3>
              <p className="mt-8px text-16 leading-140 text-ink-secondary">
                Turn on screen sharing mid-call to walk someone through a form, a photo, or a
                setting instead of describing it.
              </p>
            </div>
          </div>
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
