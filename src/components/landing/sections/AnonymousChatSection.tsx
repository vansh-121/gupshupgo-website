import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { bandFor } from "@/data/sections";
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
 * ## Column order: DOM is text-first, desktop swaps with `order`
 *
 * Desktop keeps the mockup on the LEFT and the copy on the right, but that is
 * now done with `bp810:order-*` rather than by putting the mockup first in the
 * DOM. Ordering the DOM mockup-first meant that in the single-column layout
 * this section opened with a phone frame directly beneath `calling`'s two-phone
 * pair — three frames stacked with only a band change between them, reading as
 * one undifferentiated strip of mockups rather than two sections.
 *
 * Text-first DOM gives every deep-dive section the same collapsed rhythm
 * (heading → copy → visual), so each section's own copy separates its mockup
 * from the previous section's, and the heading precedes the image it describes
 * for assistive tech and tab order.
 */
export default function AnonymousChatSection() {
  return (
    <Section id="anonymous" band={bandFor("anonymous")}>
      <div className="grid grid-cols-1 items-center gap-48px bp810:grid-cols-2 bp810:gap-64px">
        {/* Copy — first in the DOM, second column on desktop. */}
        <RevealGroup className={cn(MEASURE_CLASSES[644], "bp810:order-2")}>
          <Reveal>
            <SectionHeading sectionId="anonymous">Talk to someone new, anonymously</SectionHeading>
            <p className="mt-20px text-lead text-ink-high">
              Some conversations are easier with a stranger. Anonymous chat lets you chat without
              revealing your identity, so your name, number, and profile stay out of it.
            </p>
          </Reveal>

          <Reveal className="mt-32px space-y-24px">
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
        </RevealGroup>

        {/* Screenshot mockup — anonymous chat. Second in the DOM, first column
            on desktop. The frame carries its own responsive `max-width` ramp,
            so the wrapper only needs to centre it. */}
        <RevealGroup as="div" className="flex justify-center bp810:order-1">
          <Reveal as="div" className="w-full max-w-[320px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/anonymous_chat_light.jpeg"
              darkSrc="/website-screenshots/anonymous_chat_dark.jpeg"
              alt="GupShupGo anonymous chat screen showing a temporary identity in the matching lobby."
              size="md"
              tilt3d
              tiltDirection="left"
            />
          </Reveal>
        </RevealGroup>
      </div>
    </Section>
  );
}
