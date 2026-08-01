import type { ReactNode } from "react";
import { KeyRound, ShieldCheck, SlidersHorizontal, Store, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PLATFORM_LABEL } from "@/config/app";

/**
 * Social-proof-and-trust section (design §3.6/§3.7, Requirement 3.1).
 *
 * There is no verified social proof for GupShupGo yet — no ratings, install
 * counts, reviews, or testimonials. So trust here is built only from facts that
 * App_Feature_Set supports (end-to-end encryption on the Signal protocol, the
 * PIN-protected Vault, last-seen and read-receipt privacy controls, device
 * session management, publication on Google Play) plus an FAQ answering real
 * questions. Nothing in this file claims a number, a quote, or an award.
 *
 * The FAQ uses the retained Radix Accordion (design §5, `accordion-down` /
 * `accordion-up` keyframes). `AccordionTrigger` wraps its button in Radix's
 * `Accordion.Header`, which renders an `<h3>`, so the outline stays
 * h2 → h3 with no skipped level (Requirement 12.3).
 *
 * Requirements: 3.1, 12.8 (no informative image is rendered; the pillar icons
 * are `aria-hidden` glyphs, not images), 14.3 / 14.4 (no raster asset is
 * introduced below the hero, so there is nothing to size or lazy-load).
 */

interface TrustPillar {
  readonly id: string;
  readonly Icon: typeof ShieldCheck;
  readonly title: string;
  readonly body: string;
}

const TRUST_PILLARS: readonly TrustPillar[] = [
  {
    id: "encryption",
    Icon: ShieldCheck,
    title: "End-to-end encrypted by default",
    body: "Messages, media, and calls are encrypted with the Signal protocol, and you can verify a contact's safety number to confirm who you are talking to.",
  },
  {
    id: "vault",
    Icon: KeyRound,
    title: "Vault for your private chats",
    body: "Sensitive conversations and media live in an encrypted local store behind a PIN, separate from your main chat list.",
  },
  {
    id: "controls",
    Icon: SlidersHorizontal,
    title: "Privacy controls you own",
    body: "Decide who sees your last-seen time and whether read receipts are sent, and review or sign out the devices on your account.",
  },
  {
    id: "deletion",
    Icon: UserX,
    title: "Leave whenever you want",
    body: "Account deletion is available, and the steps are published on this site rather than buried in a support queue.",
  },
  {
    id: "store",
    Icon: Store,
    title: "Published on Google Play",
    body: "GupShupGo ships through Google Play as com.gupshupgo.app, so installs and updates come through the store's review process.",
  },
] as const;

interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: ReactNode;
}

const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    id: "free",
    question: "Is GupShupGo free to use?",
    answer:
      "Yes. Messaging, voice notes, HD voice and video calls, offline nearby chat, anonymous chat, Gup Arcade, and text statuses are all free. GupShupGo Pro is optional and lifts limits such as upload size and voice-message length.",
  },
  {
    id: "platforms",
    question: "Which platforms is it available on?",
    answer: `${PLATFORM_LABEL}. GupShupGo is an Android app installed from Google Play, and you sign in with your phone number.`,
  },
  {
    id: "data",
    question: "How is my data protected?",
    answer:
      "Chats, media, and calls are end-to-end encrypted using the Signal protocol, so they are encrypted on your device and decrypted on your contact's. Safety-number verification lets you confirm a contact's identity, and the PIN-protected Vault keeps chosen chats and media encrypted on your device.",
  },
  {
    id: "pro",
    question: "What does GupShupGo Pro add?",
    answer:
      "Photo and video statuses, screen sharing, the exclusive AMOLED, Ocean, Sunset, and Emerald themes, 5-minute voice messages, 50 MB uploads, one free bond restore each week, a Pro badge, and chat export. Pro is sold as a monthly or yearly plan inside the Android app.",
  },
  {
    id: "delete",
    question: "How do I delete my account?",
    answer: (
      <>
        You can request deletion at any time. The full steps, and what happens to
        your data afterwards, are on the{" "}
        <Link
          to="/delete-account"
          className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand"
        >
          delete your account
        </Link>{" "}
        page.
      </>
    ),
  },
] as const;

const INTRO =
  "No inflated numbers here. Just what the app actually does with your data, and straight answers to the questions people ask before installing.";

export default function TrustSection() {
  return (
    <Section id="trust" background="surface-alt">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading sectionId="trust">Built to be trusted</SectionHeading>
        <p className="mt-4 text-body-lg text-ink-high">{INTRO}</p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TRUST_PILLARS.map(({ id, Icon, title, body }) => (
          <li
            key={id}
            data-pillar={id}
            className="rounded-xl border border-hairline bg-surface p-6"
          >
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-pill bg-brand text-white"
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-h3 font-semibold text-ink-high">{title}</h3>
            <p className="mt-2 text-body text-ink-high">{body}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-16 max-w-3xl">
        <h3 className="text-h3 font-semibold text-ink-high">Frequently asked questions</h3>
        <Accordion type="single" collapsible className="mt-4">
          {FAQ_ENTRIES.map((entry) => (
            <AccordionItem
              key={entry.id}
              value={entry.id}
              data-faq={entry.id}
              className="border-b border-hairline-divider last:border-b-0"
            >
              <AccordionTrigger className="min-h-[44px] gap-4 text-left text-body-lg font-semibold text-ink-high hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                {entry.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-prose text-body text-ink-high">
                {entry.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
