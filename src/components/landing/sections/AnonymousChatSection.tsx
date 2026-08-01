import { Shuffle, UserRound, Users } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

/**
 * Anonymous chat deep dive (design §3.7, Requirement 5.5).
 *
 * Phrase contract: chat without revealing your identity, matching lobby.
 */
export default function AnonymousChatSection() {
  return (
    <Section id="anonymous" background="surface-alt">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div
          aria-hidden="true"
          className="rounded-xl border border-hairline bg-surface p-8 shadow-md"
        >
          <div className="flex items-center justify-center gap-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-bubble-received text-ink-high">
              <UserRound className="h-7 w-7" />
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-brand text-white">
              <Shuffle className="h-5 w-5" />
            </span>
            <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-bubble-received text-ink-high">
              <Users className="h-7 w-7" />
            </span>
          </div>
          <p className="mt-6 text-center text-body-sm text-ink-mid">
            Two strangers, one matching lobby
          </p>
        </div>

        <div className="max-w-prose">
          <SectionHeading sectionId="anonymous">Talk to someone new, anonymously</SectionHeading>
          <p className="mt-4 text-body-lg text-ink-high">
            Some conversations are easier with a stranger. Anonymous chat lets you chat without
            revealing your identity, so your name, number, and profile stay out of it.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Matching lobby</h3>
              <p className="mt-2 text-body text-ink-high">
                Join the matching lobby and get paired with another person who is looking for a
                conversation right now. No profiles to browse, no waiting around.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Anonymous by default</h3>
              <p className="mt-2 text-body text-ink-high">
                You appear under a temporary handle. Nothing links the chat back to your real
                account unless you decide to share it yourself.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Leave whenever you like</h3>
              <p className="mt-2 text-body text-ink-high">
                End a match with one tap and get a fresh one, and report anything that crosses the
                line. The same end-to-end encryption applies here too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
