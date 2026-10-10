import { Link } from "react-router-dom";
import {
  ArrowLeft,
  LifeBuoy,
  HelpCircle,
  Mail,
  BookOpen,
  Radio,
  Lock,
  Video,
  UserX,
  Trash2,
  Settings,
  ArrowRight,
} from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";
import { SUPPORT_EMAIL } from "@/config/app";

/**
 * Support / Help Centre route.
 *
 * A hub, not a duplicate: it routes people to the right resource (FAQ, contact,
 * guides, account tools) instead of restating them, so there is one canonical
 * answer per topic. Links point at real routes.
 */
interface HelpLink {
  Icon: typeof Radio;
  title: string;
  body: string;
  to: string;
  cta: string;
  external?: boolean;
}

const HELP_CARDS: HelpLink[] = [
  {
    Icon: HelpCircle,
    title: "Frequently Asked Questions",
    body: "Fast answers on encryption, the Vault, calls, offline chat, and account data.",
    to: "/faq",
    cta: "Browse FAQ",
  },
  {
    Icon: Radio,
    title: "Offline & mesh chat",
    body: "How to text with no internet or cell signal using Bluetooth and Wi-Fi Direct.",
    to: "/blog/how-to-text-without-internet-offline-mesh-messaging",
    cta: "Read the guide",
  },
  {
    Icon: Lock,
    title: "Privacy & encryption",
    body: "What end-to-end encryption protects, and how metadata affects your privacy.",
    to: "/blog/signal-protocol-explained-messaging-privacy-guide",
    cta: "Read the guide",
  },
  {
    Icon: Video,
    title: "Calls & video quality",
    body: "Fix stuttering or dropped calls and get clear HD video on weak connections.",
    to: "/blog/low-bandwidth-hd-video-calling-guide",
    cta: "Read the guide",
  },
  {
    Icon: UserX,
    title: "Anonymous chat safety",
    body: "Chat with strangers safely without leaking your phone number or identity.",
    to: "/blog/anonymous-chat-online-safety-guide",
    cta: "Read the guide",
  },
  {
    Icon: Trash2,
    title: "Delete your account",
    body: "Permanently remove your account and data, or request an export first.",
    to: "/delete-account",
    cta: "Account deletion",
  },
];

export default function Support() {
  const supportCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GupShupGo Support & Help Centre",
    description:
      "Help for GupShupGo: FAQ, contact, and guides on offline chat, encryption, calling, anonymous chat, and account management.",
    url: "https://www.gupshupgo.app/support",
  };

  return (
    <SiteShell>
      <SEOHead
        title="GupShupGo Support & Help Centre — Guides, FAQ & Contact"
        description="Get help with GupShupGo. Find answers on encryption, offline chat, HD calls, anonymous chat, and account deletion, or contact our support team directly."
        canonicalPath="/support"
        jsonLd={supportCollectionSchema}
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
          <LifeBuoy className="h-8 w-8 text-ink-accent" aria-hidden="true" />
          <h1 className="text-h2-xs font-medium text-ink-high bp480:text-h2-sm bp810:text-h2">
            Support &amp; Help Centre
          </h1>
        </div>
        <p className={`mb-40px text-16 leading-145 text-ink-secondary ${MEASURE_CLASSES[644]}`}>
          Find answers fast, or reach the team directly. Pick a topic below or start with the{" "}
          <Link to="/faq" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
            FAQ
          </Link>
          .
        </p>

        {/* Quick contact strip */}
        <div className="mb-40px flex flex-col gap-16px rounded-8 bg-layer-1 p-20px shadow-hairline-12-elevated bp480:flex-row bp480:items-center bp480:justify-between">
          <div className="flex items-start gap-12px">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ink-accent" aria-hidden="true" />
            <div>
              <p className="text-16 font-medium leading-130 text-ink-high">Email support</p>
              <p className="text-14 leading-140 text-ink-secondary">
                Replies to support requests within 2 business days.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-12px">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex min-h-44px items-center rounded-8 bg-layer-2 px-20px py-8px text-14 font-medium leading-140 text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-3"
            >
              {SUPPORT_EMAIL}
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-44px items-center gap-8px rounded-8 bg-brand px-20px py-8px text-14 font-medium leading-140 text-white shadow-elevation transition-standard hover:bg-brand-dark"
            >
              Contact form
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Help grid */}
        <h2 className="mb-20px text-25 font-medium leading-120 text-ink-high">Browse help topics</h2>
        <div className="grid gap-16px bp480:grid-cols-2">
          {HELP_CARDS.map(({ Icon, title, body, to, cta }) => (
            <Link
              key={title}
              to={to}
              className="group flex flex-col rounded-8 bg-layer-1 p-20px shadow-hairline-12 transition-standard hover:-translate-y-1 hover:shadow-hairline-12-elevated"
            >
              <Icon className="mb-12px h-6 w-6 text-ink-accent" aria-hidden="true" />
              <h3 className="mb-6px text-17 font-medium leading-130 text-ink-high">{title}</h3>
              <p className="mb-16px flex-1 text-14 leading-140 text-ink-secondary">{body}</p>
              <span className="inline-flex items-center gap-6px text-14 font-medium text-ink-accent">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        {/* Common quick fixes */}
        <section className="mt-48px">
          <h2 className="mb-16px flex items-center gap-8px text-25 font-medium leading-120 text-ink-high">
            <Settings className="h-5 w-5 text-ink-secondary" aria-hidden="true" />
            Quick fixes for common issues
          </h2>
          <div className="space-y-12px">
            <div className="rounded-8 bg-layer-1 p-16px shadow-hairline-12">
              <p className="text-15 font-medium leading-140 text-ink-high">I'm not receiving messages or calls</p>
              <p className="mt-4px text-14 leading-140 text-ink-secondary">
                Check that GupShupGo is allowed to run in the background and has battery optimisation
                disabled for it, so notifications and incoming calls can reach you.
              </p>
            </div>
            <div className="rounded-8 bg-layer-1 p-16px shadow-hairline-12">
              <p className="text-15 font-medium leading-140 text-ink-high">Offline chat isn't finding anyone</p>
              <p className="mt-4px text-14 leading-140 text-ink-secondary">
                Make sure Bluetooth and Local Wi-Fi are switched on for both phones, and that both
                have Off-Grid Mesh Chat discovery enabled. Devices need to be within range.
              </p>
            </div>
            <div className="rounded-8 bg-layer-1 p-16px shadow-hairline-12">
              <p className="text-15 font-medium leading-140 text-ink-high">My video call is stuttering</p>
              <p className="mt-4px text-14 leading-140 text-ink-secondary">
                Move closer to the router, close other downloads, or turn your camera off briefly so
                audio is prioritised. See{" "}
                <Link to="/blog/low-bandwidth-hd-video-calling-guide" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                  the calling guide
                </Link>{" "}
                for more.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-40px flex items-start gap-12px rounded-8 p-16px shadow-hairline-12">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-ink-secondary" aria-hidden="true" />
          <p className="text-14 leading-140">
            Prefer to read? Browse all{" "}
            <Link to="/blog" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
              guides and tutorials
            </Link>{" "}
            for in-depth, step-by-step help.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
