import { Shuffle, UserRound, Users } from "lucide-react";
import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Anonymous chat deep dive (design §3.7, Requirement 5.5).
 *
 * Phrase contract: chat without revealing your identity, matching lobby.
 *
 * Band 0 — its neighbours (`calling` before on band 1, `pro` after on the tint
 * band) both differ, so adjacent sections never share a band (Req 3.8).
 */
export default function AnonymousChatSection() {
  return (
    <Section id="anonymous" band={0}>
      <div className="grid grid-cols-1 items-center gap-48px bp810:grid-cols-2 bp810:gap-64px">
        <RevealGroup
          aria-hidden="true"
          className="rounded-8 bg-layer-1 p-32px shadow-hairline-12-elevated"
        >
          <Reveal className="flex items-center justify-center gap-24px">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-layer-2 text-ink-high shadow-hairline-12">
              <UserRound className="h-7 w-7" />
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
              <Shuffle className="h-5 w-5" />
            </span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-layer-2 text-ink-high shadow-hairline-12">
              <Users className="h-7 w-7" />
            </span>
          </Reveal>
          <Reveal as="p" className="mt-24px text-center text-14 leading-140 text-ink-secondary">
            Two strangers, one matching lobby
          </Reveal>
        </RevealGroup>

        <RevealGroup className={cn(MEASURE_CLASSES[644])}>
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
      </div>
    </Section>
  );
}
