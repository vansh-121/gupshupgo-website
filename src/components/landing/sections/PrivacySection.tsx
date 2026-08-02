import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { bandFor } from "@/data/sections";
import { DEEP_DIVE } from "./deepDiveLayout";
import { cn } from "@/lib/utils";

/**
 * Privacy deep dive (design §3.7, Requirement 5.3).
 *
 * Phrase contract: end-to-end encryption (Signal protocol), safety-number
 * verification, PIN-protected Vault.
 *
 * Shows two overlapping real app screenshots — the E2E encryption screen
 * in front and the Vault screen behind — replacing the previous icon grid.
 * Both swap between light/dark variants based on site theme.
 *
 * The band comes from `bandFor("privacy")` — derived from this section's position
 * in `VISIBLE_SECTIONS`, so it always differs from its neighbours (Req 3.8).
 *
 * Layout: the shared contract in `deepDiveLayout.ts`. Desktop is the unchanged
 * text-left, mockup-right pair; collapsed it reads heading → lead → screenshots
 * → detail blocks, which is what stops this section's two-phone pair from
 * landing directly against `calling`'s pair.
 */
export default function PrivacySection() {
  return (
    <Section id="privacy" band={bandFor("privacy")}>
      <RevealGroup className={DEEP_DIVE.container}>
        {/* Text column. `display: contents` below bp810 so the mockup can be
            ordered between the lead and the details — see deepDiveLayout.ts. */}
        <div className={DEEP_DIVE.textGroup}>
          <Reveal className={cn(MEASURE_CLASSES[644], DEEP_DIVE.lead)}>
            <SectionHeading sectionId="privacy">Your conversations stay yours</SectionHeading>
            <p className="mt-20px text-lead text-ink-high">
              Privacy is the default, not a setting you have to hunt for. Every chat is protected
              with end-to-end encryption built on the Signal protocol, so only you and the person
              you are talking to can read what is sent.
            </p>
          </Reveal>

          <Reveal className={cn(MEASURE_CLASSES[644], DEEP_DIVE.details, "space-y-24px")}>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                End-to-end encryption on the Signal protocol
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-high">
                Messages, voice notes, and calls are encrypted on your device and decrypted on
                theirs. Nobody in between holds the keys.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                Safety-number verification
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-high">
                Compare safety numbers with a contact to confirm you are talking to the right
                person, and get told when a safety number changes.
              </p>
            </div>
            <div>
              <h3 className="text-25 font-medium leading-120 text-ink-high">
                PIN-protected Vault
              </h3>
              <p className="mt-8px text-16 leading-140 text-ink-high">
                Move sensitive chats and media into the PIN-protected Vault. It stays locked behind
                your PIN and out of the main chat list, even if your phone is unlocked.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Two-phone composition — both clearly visible, and fanned at EVERY
            width. The pair scales as one object (55% front, 50% rear, 5%
            overlap) so it fits the ~337px tablet column and a 320px phone
            without splitting into two separate stacked screenshots. */}
        <Reveal
          as="div"
          className={cn(
            "mx-auto flex w-full max-w-[500px] items-start justify-center",
            DEEP_DIVE.mockup,
          )}
        >
          {/* E2E encryption screenshot — left, tilted right */}
          <div className="relative z-10 -mr-[5%] w-[55%] max-w-[260px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/e2e_light.jpeg"
              darkSrc="/website-screenshots/e2e_dark.jpeg"
              alt="GupShupGo end-to-end encryption screen showing the Signal protocol safety verification."
              size="md"
              tilt3d
              tiltDirection="right"
            />
          </div>

          {/* Vault screenshot — right, tilted left, pushed down by a percentage
              of the group width so the drop scales with the pair. */}
          <div className="pointer-events-none z-0 mt-[7%] w-[50%] max-w-[240px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/vault_light.jpeg"
              darkSrc="/website-screenshots/vault_dark.jpeg"
              alt="GupShupGo PIN-protected Vault screen showing locked private chats and media."
              size="sm"
              tilt3d
              tiltDirection="left"
            />
          </div>
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
