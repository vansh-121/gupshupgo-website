import type { ReactNode } from "react";
import { KeyRound, ShieldCheck, SlidersHorizontal, Store, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PLATFORM_LABEL, PRO_LAUNCHED } from "@/config/app";
import { bandFor } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Social-proof-and-trust section (design §3.6/§3.7, Requirement 3.1).
 *
 * There is no verified social proof for GupShupGo yet — no ratings, install
 * counts, reviews, or testimonials. So trust here is built only from facts that
 * App_Feature_Set supports (end-to-end encryption on the Signal protocol, the
 * PIN-protected Vault, last-seen and read-receipt privacy controls, device
 * session management, publication on Google Play) plus an FAQ answering real
 * questions. Nothing in this file claims a number, a quote, or an award
 * (Req 1.4).
 *
 * The band comes from `bandFor("trust")` — derived from this section's position
 * in `VISIBLE_SECTIONS`, so it always differs from its neighbours (Req 3.8). It
 * resolves to band 0 with the `pro` section present and band 1 without it, so
 * the pillar and FAQ cards pick the layer one step above the resolved band to
 * keep reading as raised, with a Hairline inset shadow and never a `border`
 * (Req 4.2, 4.3).
 *
 * Pro copy: the "What does GupShupGo Pro add?" entry and the Pro clause of the
 * pricing answer are gated on `PRO_LAUNCHED` (`src/config/app.ts`). While the
 * app's `pro_enabled` flag is false the FAQ says only that the app is free to
 * download from Google Play and makes no tier claim at all.
 *
 * The FAQ uses the retained Radix Accordion (design §5, `accordion-down` /
 * `accordion-up` keyframes). `AccordionTrigger` wraps its button in Radix's
 * `Accordion.Header`, which renders an `<h3>`, so the outline stays
 * h2 → h3 with no skipped level (Requirement 12.3). The trigger keeps
 * `ring-brand` as its focus indicator: `brand` measures 3.41:1 at worst against
 * the bands, clearing the 3:1 of Req 16.8.
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

/**
 * The opening FAQ entry, in two variants selected by `PRO_LAUNCHED`.
 *
 * The launched variant is the original answer and stays here untouched so
 * flipping the flag restores it. The pre-launch variant states only that the app
 * is free to download from Google Play — a fact about the store listing — plus
 * what you get once you are in. It makes no claim about tiers, prices, or what
 * any capability costs, because a paid tier is coming and a free promise could
 * not be walked back.
 */
const PRICING_FAQ: FaqEntry = PRO_LAUNCHED
  ? {
    id: "free",
    question: "Is GupShupGo free to use?",
    answer:
      "Yes. Messaging, voice notes, HD voice and video calls, offline nearby chat, anonymous chat, Gup Arcade, and text statuses are all free. GupShupGo Pro is optional and lifts limits such as upload size and voice-message length.",
  }
  : {
    id: "getting-started",
    question: "How do I get GupShupGo?",
    answer:
      "GupShupGo is free to download from Google Play. Sign in with your phone number and you get end-to-end encrypted messaging, voice notes, HD voice and video calls, offline nearby chat, anonymous chat, Gup Arcade, and text statuses.",
  };

/** The Pro explainer, rendered only once Pro has launched. */
const PRO_FAQ: FaqEntry = {
  id: "pro",
  question: "What does GupShupGo Pro add?",
  answer:
    "Photo and video statuses, screen sharing, the exclusive AMOLED, Ocean, Sunset, and Emerald themes, 5-minute voice messages, 50 MB uploads, one free bond restore each week, a Pro badge, and chat export. Pro is sold as a monthly or yearly plan inside the Android app.",
};

const FAQ_ENTRIES: readonly FaqEntry[] = [
  PRICING_FAQ,
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
  ...(PRO_LAUNCHED ? [PRO_FAQ] : []),
  {
    id: "delete",
    question: "How do I delete my account?",
    answer: (
      <>
        You can request deletion at any time. The full steps, and what happens to
        your data afterwards, are on the{" "}
        <Link
          to="/delete-account"
          className="font-medium text-ink-accent underline underline-offset-4 transition-standard hover:text-ink-high"
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
  const band = bandFor("trust");
  /** One layer above the resolved band, so the cards always read as raised. */
  const cardSurface = band === 1 ? "bg-layer-2" : "bg-layer-1";

  return (
    <Section id="trust" band={band}>
      <div className={cn(MEASURE_CLASSES[644], "mx-auto text-center")}>
        <SectionHeading sectionId="trust">Built to be trusted</SectionHeading>
        <p className="mt-20px text-lead text-ink-high">{INTRO}</p>
      </div>

      <RevealGroup
        as="ul"
        className="mt-48px grid grid-cols-1 gap-24px bp810:grid-cols-2 bp1200:grid-cols-3"
      >
        {TRUST_PILLARS.map(({ id, Icon, title, body }) => (
          <Reveal
            as="li"
            key={id}
            data-pillar={id}
            className={cn("rounded-8 p-24px shadow-hairline-12", cardSurface)}
          >
            <span
              aria-hidden="true"
              className="flex h-44px w-44px items-center justify-center rounded-full bg-brand text-white"
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-16px text-25 font-medium leading-120 text-ink-high">{title}</h3>
            <p className="mt-8px text-16 leading-140 text-ink-secondary">{body}</p>
          </Reveal>
        ))}
      </RevealGroup>

      <div className={cn(MEASURE_CLASSES[809], "mx-auto mt-64px")}>
        <h3 className="text-25 font-medium leading-120 text-ink-high">
          Frequently asked questions
        </h3>
        <Accordion type="single" collapsible className="mt-20px space-y-12px">
          {FAQ_ENTRIES.map((entry) => (
            <AccordionItem
              key={entry.id}
              value={entry.id}
              data-faq={entry.id}
              className={cn("border-b-0 rounded-8 px-20px shadow-hairline-12", cardSurface)}
            >
              <AccordionTrigger className="min-h-[44px] gap-16px py-16px text-left text-19 font-medium leading-130 text-ink-high transition-standard hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                {entry.question}
              </AccordionTrigger>
              <AccordionContent
                className={cn(MEASURE_CLASSES[644], "pb-16px text-16 leading-140 text-ink-secondary")}
              >
                {entry.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
