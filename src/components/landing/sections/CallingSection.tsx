import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import DeviceMockup from "@/components/DeviceMockup/DeviceMockup";
import { getMockupScreen } from "@/data/mockupScreens";

/**
 * Calling deep dive (design §3.7, Requirement 5.4).
 *
 * Phrase contract: HD video calls, voice calls, incoming calls in the
 * background, screen sharing. Embeds the `call` device mockup screen.
 */
export default function CallingSection() {
  return (
    <Section id="calling">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <DeviceMockup screen={getMockupScreen("call")} className="mx-auto max-w-[320px]" />

        <div className="max-w-prose">
          <SectionHeading sectionId="calling">HD video and voice calls</SectionHeading>
          <p className="mt-4 text-body-lg text-ink-mid">
            Calls feel like being in the same room. HD video calls and voice calls run encrypted
            end to end, and they hold up on ordinary mobile connections.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">HD video calls</h3>
              <p className="mt-2 text-body text-ink-mid">
                Sharp, smooth HD video calls with adaptive quality, so the picture holds together
                when the connection wobbles.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Voice calls</h3>
              <p className="mt-2 text-body text-ink-mid">
                Clear voice calls when video is more than you need, with echo suppression and noise
                handling built in.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">
                Incoming calls in the background
              </h3>
              <p className="mt-2 text-body text-ink-mid">
                You get incoming calls in the background with a full-screen ringing screen, even
                when GupShupGo is closed or your phone is locked. No missed calls because an app
                was not open.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Screen sharing</h3>
              <p className="mt-2 text-body text-ink-mid">
                Turn on screen sharing mid-call to walk someone through a form, a photo, or a
                setting instead of describing it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
