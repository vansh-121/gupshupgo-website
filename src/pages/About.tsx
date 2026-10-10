import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Radio,
  Video,
  Sparkles,
  Lock,
  Heart,
  Users,
  Github,
  Mail,
} from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";
import { SUPPORT_EMAIL } from "@/config/app";

/**
 * About route — who is behind GupShupGo and what the product stands for.
 *
 * Trust and E-E-A-T page: states the mission, the privacy principles the app is
 * actually built on (mirroring `src/data/features.ts`), and a way to reach the
 * team. No claim here goes beyond what the app ships today.
 */
const PRINCIPLES = [
  {
    Icon: ShieldCheck,
    title: "Private by default",
    body: "Every message, photo, and call is end-to-end encrypted with the Signal protocol — not as an optional mode, but always on.",
  },
  {
    Icon: Lock,
    title: "Your data stays yours",
    body: "We don't build an advertising profile from your contacts or sell your conversations. A PIN-protected Vault keeps sensitive chats sealed on your device.",
  },
  {
    Icon: Radio,
    title: "Built to work anywhere",
    body: "Offline nearby chat over Bluetooth and Wi-Fi Direct keeps conversations alive at festivals, on trails, and during outages.",
  },
  {
    Icon: Video,
    title: "Clear calls, even on weak networks",
    body: "HD voice and video calls adapt to your connection, so a shaky signal never means a dropped conversation.",
  },
];

export default function About() {
  return (
    <SiteShell>
      <SEOHead
        title="About GupShupGo — Private Messaging, Built in India"
        description="GupShupGo is a private, end-to-end encrypted messaging app for Android. Learn who builds it, the privacy principles behind it, and why offline chat matters."
        canonicalPath="/about"
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
          <Heart className="h-8 w-8 text-ink-accent" aria-hidden="true" />
          <h1 className="text-h2-xs font-medium text-ink-high bp480:text-h2-sm bp810:text-h2">
            About GupShupGo
          </h1>
        </div>

        <p className={`mb-48px text-18 leading-145 text-ink-secondary ${MEASURE_CLASSES[644]}`}>
          GupShupGo is a private messaging app for Android, built on a simple belief: staying in
          touch with the people you care about should never cost you your privacy.
        </p>

        <div className="space-y-40px text-16 leading-145 text-ink-secondary">
          <section>
            <h2 className="mb-16px text-25 font-medium leading-120 text-ink-high">Our story</h2>
            <div className="space-y-12px">
              <p>
                GupShupGo started from a frustration many people share. The apps we use to talk to
                friends and family know an enormous amount about us — who we message, when, and how
                often — even when the words themselves stay encrypted. And when the network fails,
                which in a crowded stadium or a power cut it always does, so does the conversation.
              </p>
              <p>
                So we built the app we wanted to use: one that encrypts everything by default with
                the Signal protocol, learns as little about you as possible, keeps working when the
                internet does not, and protects your chats on the device itself. No ad profile, no
                dark patterns, no reason to read your messages.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-20px text-25 font-medium leading-120 text-ink-high">
              What we stand for
            </h2>
            <div className="grid gap-16px bp480:grid-cols-2">
              {PRINCIPLES.map(({ Icon, title, body }) => (
                <div key={title} className="rounded-8 bg-layer-1 p-20px shadow-hairline-12">
                  <Icon className="mb-12px h-6 w-6 text-ink-accent" aria-hidden="true" />
                  <h3 className="mb-6px text-17 font-medium leading-130 text-ink-high">{title}</h3>
                  <p className="text-14 leading-140 text-ink-secondary">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-16px text-25 font-medium leading-120 text-ink-high">
              What you get today
            </h2>
            <ul className="list-disc space-y-8px pl-20px">
              <li>End-to-end encrypted messaging with text, photos, videos, voice notes, and files.</li>
              <li>HD voice and video calls with screen sharing, encrypted end to end.</li>
              <li>Offline nearby chat over Bluetooth and Wi-Fi Direct — no internet required.</li>
              <li>Anonymous chat to meet new people without revealing your identity.</li>
              <li>A PIN-protected Vault, view-once media, and chat bonds that make connecting fun.</li>
            </ul>
            <p className="mt-16px">
              For a full breakdown of every feature, see the{" "}
              <Link to="/" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                home page
              </Link>{" "}
              or browse the{" "}
              <Link to="/blog" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                blog and guides
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-16px text-25 font-medium leading-120 text-ink-high">
              Built by a small team
            </h2>
            <p>
              GupShupGo is designed and engineered by a small, independent team that uses the app
              every day. That means feedback actually reaches the people who build the product —
              and it means we answer our own support email.
            </p>
          </section>

          {/* Contact block */}
          <section className="rounded-8 bg-layer-1 p-20px shadow-hairline-12-elevated">
            <h2 className="mb-12px flex items-center gap-8px text-19 font-medium leading-130 text-ink-high">
              <Users className="h-4 w-4 text-ink-accent" aria-hidden="true" />
              Get in touch
            </h2>
            <p className="text-14 leading-140 text-ink-secondary">
              We'd love to hear from you — questions, ideas, or just to say hello.
            </p>
            <div className="mt-16px flex flex-wrap gap-12px">
              <Link
                to="/contact"
                className="inline-flex min-h-44px items-center gap-8px rounded-8 bg-brand px-20px py-8px text-14 font-medium leading-140 text-white shadow-elevation transition-standard hover:bg-brand-dark"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact us
              </Link>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex min-h-44px items-center gap-8px rounded-8 bg-layer-2 px-20px py-8px text-14 font-medium leading-140 text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-3"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </section>

          <div className="flex items-start gap-12px rounded-8 p-16px shadow-hairline-12">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-ink-secondary" aria-hidden="true" />
            <p className="text-14 leading-140">
              GupShupGo is available on Android. Read our{" "}
              <Link to="/privacy" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                Terms of Service
              </Link>
              , or check the{" "}
              <Link to="/faq" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                FAQ
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
