import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { bandFor } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Privacy deep dive (design §3.7, Requirement 5.3).
 *
 * Phrase contract: end-to-end encryption (Signal protocol), safety-number
 * verification, PIN-protected Vault.
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

        <RevealGroup
          aria-hidden="true"
          className="grid gap-16px rounded-8 bg-layer-1 p-32px shadow-hairline-12-elevated"
        >
          {[
            { Icon: Lock, label: "End-to-end encrypted" },
            { Icon: ShieldCheck, label: "Safety number verified" },
            { Icon: KeyRound, label: "Vault locked" },
          ].map(({ Icon, label }) => (
            <Reveal
              key={label}
              className="flex items-center gap-16px rounded-8 bg-layer-2 px-16px py-12px shadow-hairline-12"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-14 leading-140 text-ink-high">{label}</span>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
