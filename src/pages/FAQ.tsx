import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";
import { cn } from "@/lib/utils";

/**
 * Standalone FAQ route.
 *
 * A dedicated URL for the questions users and Google ask most, with a `FAQPage`
 * JSON-LD block so answers can surface as rich results. Copy only states
 * capabilities the Android app ships today (see `src/data/features.ts`).
 */
interface FaqItem {
  q: string;
  a: string;
}

const FAQ_GROUPS: { group: string; items: FaqItem[] }[] = [
  {
    group: "Getting started",
    items: [
      {
        q: "Is GupShupGo free to use?",
        a: "Yes. GupShupGo is free to download and use, including messaging, HD voice and video calls, offline nearby chat, and anonymous chat. There is nothing you need to pay to start chatting.",
      },
      {
        q: "Which platforms is GupShupGo available on?",
        a: "GupShupGo is available on Android, downloadable from Google Play. Sign in with your phone number to get started.",
      },
      {
        q: "Do I need a phone number to use GupShupGo?",
        a: "Yes, a phone number is used once for sign-in verification. It is never exposed in anonymous chats or shared with other users, so you can meet new people without revealing it.",
      },
    ],
  },
  {
    group: "Privacy & security",
    items: [
      {
        q: "Are my messages really end-to-end encrypted?",
        a: "Yes. Every message, photo, video, and call is end-to-end encrypted with the Signal protocol by default — there is no separate mode to enable. You can verify a contact by safety number, just as you can on Signal.",
      },
      {
        q: "Can GupShupGo read my messages or see my contacts?",
        a: "No. Messages are end-to-end encrypted, so we cannot read them, and GupShupGo does not build an advertising profile from your contacts or message metadata.",
      },
      {
        q: "What is the Vault and how does it protect my chats?",
        a: "The Vault is a PIN-protected, encrypted store on your device. You move chosen chats and media into it, and they stay locked behind your PIN (or an optional fingerprint) using Argon2id key derivation. Because it is zero-knowledge, no one — including us — can recover it without your PIN.",
      },
      {
        q: "What happens if I forget my Vault PIN?",
        a: "Because the Vault is zero-knowledge, there is no reset or backdoor on our servers. Only your PIN can unlock it, so keep it somewhere safe.",
      },
      {
        q: "Is GupShupGo safe for anonymous chat?",
        a: "Yes. Anonymous chat matches you with a pseudonym and never exposes your phone number or real profile. Sessions are ephemeral and clear the moment either person ends the chat, and you can send a friend request only if you both choose to keep talking.",
      },
    ],
  },
  {
    group: "Messaging & calls",
    items: [
      {
        q: "Can I text without internet or a cell signal?",
        a: "Yes. GupShupGo's offline nearby chat works with no internet or cellular service by relaying messages directly between phones over Bluetooth and Wi-Fi Direct — ideal for festivals, stadiums, travel, and outages.",
      },
      {
        q: "How clear are video calls on a slow connection?",
        a: "GupShupGo's calls adapt to your network, scaling quality and prioritising audio when bandwidth is tight. A crisp 720p call needs only about 0.8 to 1.2 Mbps, so calls stay smooth even on weak Wi-Fi or congested 3G.",
      },
      {
        q: "Can I receive calls when the app is closed?",
        a: "Yes. Incoming calls ring with a full-screen receiver even when GupShupGo is in the background or has been closed, thanks to native lock-screen call integration.",
      },
      {
        q: "Does GupShupGo support group video calls?",
        a: "GupShupGo focuses on high-quality one-to-one HD voice and video calls with screen sharing. For group conversations, chat and messages work as expected.",
      },
    ],
  },
  {
    group: "Account & data",
    items: [
      {
        q: "How do I delete my account and data?",
        a: "You can request permanent deletion from our Delete Account page. Send the request using the on-page steps and it is processed within 7 business days, or 14 business days for a data export.",
      },
      {
        q: "Can I export my data before deleting?",
        a: "Yes. Email us with the subject 'Data Export Request — GupShupGo' and we provide a copy of your personal data before deletion.",
      },
      {
        q: "How do I add a contact?",
        a: "Add a contact by typing their phone number or scanning their QR code with the in-app scanner, then send a friend request.",
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>("0-0");

  const allItems: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <SiteShell>
      <SEOHead
        title="GupShupGo FAQ — Privacy, Encryption, Calls & Offline Chat"
        description="Answers to the most common questions about GupShupGo: end-to-end encryption, the Vault, offline nearby chat, HD video calls, anonymous chat, and account deletion."
        canonicalPath="/faq"
        jsonLd={faqSchema}
      />

      <div className={`mx-auto w-full ${MEASURE_CLASSES[809]} px-20px py-80px bp810:px-36px bp810:py-128px`}>
        <Link
          to="/"
          className="mb-40px inline-flex items-center gap-8px text-14 leading-140 text-ink-secondary transition-standard hover:text-ink-high"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="mb-8px flex items-center gap-12px">
          <HelpCircle className="h-8 w-8 text-ink-accent" aria-hidden="true" />
          <h1 className="text-h2-xs font-medium text-ink-high bp480:text-h2-sm bp810:text-h2">
            Frequently Asked Questions
          </h1>
        </div>
        <p className={`mb-40px text-16 leading-145 text-ink-secondary ${MEASURE_CLASSES[644]}`}>
          Quick answers about privacy, encryption, calling, offline chat, and your account. Can't
          find what you need? Head to the{" "}
          <Link to="/support" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
            Support Centre
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
            contact us
          </Link>
          .
        </p>

        <div className="space-y-40px">
          {FAQ_GROUPS.map((group, gIdx) => (
            <section key={group.group} aria-label={group.group}>
              <h2 className="mb-16px text-22 font-medium leading-125 text-ink-high">
                {group.group}
              </h2>
              <div className="space-y-12px">
                {group.items.map((item, iIdx) => {
                  const id = `${gIdx}-${iIdx}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="rounded-8 bg-layer-1 p-16px shadow-hairline-12 transition-standard">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-12px text-left text-16 font-medium leading-140 text-ink-high"
                        >
                          <span>{item.q}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-ink-secondary" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-ink-secondary" aria-hidden="true" />
                          )}
                        </button>
                      </h3>
                      <div
                        className={cn(
                          "overflow-hidden text-14 leading-145 text-ink-secondary transition-standard",
                          isOpen ? "mt-12px border-t border-hairline-12 pt-12px" : "hidden",
                        )}
                      >
                        {item.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Still stuck */}
        <div className="mt-48px flex flex-col items-start gap-16px rounded-8 bg-layer-1 p-24px shadow-hairline-12-elevated bp480:flex-row bp480:items-center bp480:justify-between">
          <div className="flex items-start gap-12px">
            <MessageCircleQuestion className="mt-0.5 h-6 w-6 shrink-0 text-ink-accent" aria-hidden="true" />
            <div>
              <p className="text-16 font-medium leading-130 text-ink-high">Still have a question?</p>
              <p className="text-14 leading-140 text-ink-secondary">
                The support centre and our inbox are both one click away.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-12px">
            <Link
              to="/support"
              className="inline-flex min-h-44px items-center rounded-8 bg-layer-2 px-20px py-8px text-14 font-medium leading-140 text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-3"
            >
              Support Centre
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-44px items-center rounded-8 bg-brand px-20px py-8px text-14 font-medium leading-140 text-white shadow-elevation transition-standard hover:bg-brand-dark"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
