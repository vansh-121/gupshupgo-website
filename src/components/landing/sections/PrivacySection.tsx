import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { bandFor } from "@/data/sections";
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
 */
export default function PrivacySection() {
  return (
    <Section id="privacy" band={bandFor("privacy")}>
      <div className="grid grid-cols-1 items-center gap-48px bp810:grid-cols-2 bp810:gap-64px">
        <RevealGroup className={cn(MEASURE_CLASSES[644])}>
          <Reveal>
            <SectionHeading sectionId="privacy">Your conversations stay yours</SectionHeading>
            <p className="mt-20px text-lead text-ink-high">
              Privacy is the default, not a setting you have to hunt for. Every chat is protected
              with end-to-end encryption built on the Signal protocol, so only you and the person
              you are talking to can read what is sent.
            </p>
          </Reveal>

          <Reveal className="mt-32px space-y-24px">
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
        </RevealGroup>

        {/* Fanned-out two-phone composition — both clearly visible */}
        <RevealGroup
          as="div"
          className="flex flex-col items-center gap-24px bp810:flex-row bp810:justify-center bp810:gap-0"
        >
          {/* E2E encryption screenshot — left, tilted right */}
          <Reveal as="div" className="relative z-10 w-full max-w-[280px] bp810:-mr-12px bp810:max-w-[260px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/e2e_light.jpeg"
              darkSrc="/website-screenshots/e2e_dark.jpeg"
              alt="GupShupGo end-to-end encryption screen showing the Signal protocol safety verification."
              size="md"
              tilt3d
              tiltDirection="right"
            />
          </Reveal>

          {/* Vault screenshot — right, tilted left, slightly pushed down */}
          <Reveal as="div" className="z-0 w-full max-w-[260px] bp810:-ml-12px bp810:translate-y-32px bp810:max-w-[240px]">
            <ScreenshotMockup
              lightSrc="/website-screenshots/vault_light.jpeg"
              darkSrc="/website-screenshots/vault_dark.jpeg"
              alt="GupShupGo PIN-protected Vault screen showing locked private chats and media."
              size="sm"
              tilt3d
              tiltDirection="left"
            />
          </Reveal>
        </RevealGroup>
      </div>
    </Section>
  );
}
