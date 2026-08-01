import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

/**
 * Privacy deep dive (design §3.7, Requirement 5.3).
 *
 * Phrase contract: end-to-end encryption (Signal protocol), safety-number
 * verification, PIN-protected Vault.
 */
export default function PrivacySection() {
  return (
    <Section id="privacy" background="surface-alt">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-prose">
          <SectionHeading sectionId="privacy">Your conversations stay yours</SectionHeading>
          <p className="mt-4 text-body-lg text-ink-high">
            Privacy is the default, not a setting you have to hunt for. Every chat is protected
            with end-to-end encryption built on the Signal protocol, so only you and the person
            you are talking to can read what is sent.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">
                End-to-end encryption on the Signal protocol
              </h3>
              <p className="mt-2 text-body text-ink-high">
                Messages, voice notes, and calls are encrypted on your device and decrypted on
                theirs. Nobody in between holds the keys.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Safety-number verification</h3>
              <p className="mt-2 text-body text-ink-high">
                Compare safety numbers with a contact to confirm you are talking to the right
                person, and get told when a safety number changes.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">PIN-protected Vault</h3>
              <p className="mt-2 text-body text-ink-high">
                Move sensitive chats and media into the PIN-protected Vault. It stays locked behind
                your PIN and out of the main chat list, even if your phone is unlocked.
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="grid gap-4 rounded-xl border border-hairline bg-surface p-8 shadow-md"
        >
          {[
            { Icon: Lock, label: "End-to-end encrypted" },
            { Icon: ShieldCheck, label: "Safety number verified" },
            { Icon: KeyRound, label: "Vault locked" },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl border border-hairline-divider bg-surface-alt px-4 py-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-brand text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-body-sm text-ink-high">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
