import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  LifeBuoy,
  ArrowLeft,
  Send,
  Check,
  Copy,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";
import { SUPPORT_EMAIL } from "@/config/app";

const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string) || "";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact route.
 *
 * Contact form submissions POST directly to Web3Forms API
 * and forward to the configured inbox, with full loading and success states.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General question");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable — the email is visible on screen regardless.
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address (e.g. you@example.com).");
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setErrorMessage(null);
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: trimmedName,
          email: trimmedEmail,
          topic,
          message: trimmedMessage,
          subject: `[GupShupGo Contact] ${topic} from ${trimmedName}`,
          from_name: `${trimmedName} (via GupShupGo)`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMessage(data.message || "Failed to send message. Please try again or email us directly.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection or email us directly.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setTopic("General question");
    setStatus("idle");
    setErrorMessage(null);
  };

  const inputClasses =
    "h-44px w-full rounded-8 bg-layer-1 px-16px text-15 text-ink-high shadow-hairline-12 placeholder:text-ink-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-standard";

  return (
    <SiteShell>
      <SEOHead
        title="Contact GupShupGo — Support, Feedback & Press"
        description="Get in touch with the GupShupGo team. Contact us for support, account help, privacy questions, bug reports, or partnership and press enquiries."
        canonicalPath="/contact"
      />

      <div className="mx-auto w-full max-w-[1024px] px-20px py-80px bp810:px-36px bp810:py-128px">
        <Link
          to="/"
          className="mb-40px inline-flex items-center gap-8px text-14 leading-140 text-ink-secondary transition-standard hover:text-ink-high"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="mb-8px flex items-center gap-12px">
          <Mail className="h-8 w-8 text-ink-accent" aria-hidden="true" />
          <h1 className="text-h2-xs font-medium text-ink-high bp480:text-h2-sm bp810:text-h2">
            Contact Us
          </h1>
        </div>
        <p className={`mb-48px text-16 leading-140 text-ink-secondary ${MEASURE_CLASSES[644]}`}>
          Questions, bug reports, feedback, or press and partnership enquiries — we read every
          message. Use the form below or email us directly and we'll get back to you.
        </p>

        <div className="space-y-24px bp810:space-y-32px">
          {/* Contact form (broad rectangle) */}
          <div className="rounded-8 bg-layer-1 p-24px shadow-hairline-12-elevated bp810:p-32px">
            <h2 className="mb-8px flex items-center gap-8px text-19 font-medium leading-130 text-ink-high">
              <MessageSquare className="h-4 w-4 text-ink-accent" aria-hidden="true" />
              Send a message
            </h2>
            <p className="mb-20px text-14 leading-140 text-ink-secondary">
              Send our team a message directly and we'll reply to your email.
            </p>

            {status === "success" ? (
              <div
                role="status"
                className="py-24px text-center bp810:py-36px"
              >
                <div className="mx-auto mb-16px flex h-12 w-12 items-center justify-center rounded-full bg-status-success/15 text-status-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-8px text-21 font-medium leading-130 text-ink-high">
                  Message sent successfully!
                </h3>
                <p className="mx-auto mb-24px max-w-[480px] text-15 leading-140 text-ink-secondary">
                  Thank you for reaching out. We've received your note and will get back to you at{" "}
                  <span className="font-medium text-ink-high">{email}</span> within 2 business days.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-40px items-center gap-6px rounded-8 bg-layer-2 px-16px py-8px text-14 font-medium text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-3"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-16px" onSubmit={handleSubmit} noValidate>
                {/* Anti-spam honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-center gap-8px rounded-8 bg-status-error/10 px-16px py-10px text-13 text-status-error shadow-hairline-12"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid gap-16px bp480:grid-cols-2">
                  <div className="space-y-6px">
                    <label htmlFor="contact-name" className="text-14 font-medium text-ink-high">
                      Your name <span className="text-status-error">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="e.g. Aarav Sharma"
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-6px">
                    <label htmlFor="contact-email" className="text-14 font-medium text-ink-high">
                      Your email <span className="text-status-error">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="you@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="space-y-6px">
                  <label htmlFor="contact-topic" className="text-14 font-medium text-ink-high">
                    What is this about?
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`${inputClasses} appearance-none pr-40px`}
                  >
                    <option>General question</option>
                    <option>Bug report</option>
                    <option>Account or login help</option>
                    <option>Privacy or data request</option>
                    <option>Feature suggestion</option>
                    <option>Press or partnership</option>
                  </select>
                </div>

                <div className="space-y-6px">
                  <label htmlFor="contact-message" className="text-14 font-medium text-ink-high">
                    Message <span className="text-status-error">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Tell us what's going on. If it's a bug, your device model and Android version help a lot."
                    className="w-full rounded-8 bg-layer-1 px-16px py-12px text-15 leading-140 text-ink-high shadow-hairline-12 placeholder:text-ink-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-standard"
                  />
                </div>

                <div className="flex flex-col gap-16px pt-4px bp480:flex-row bp480:items-center bp480:justify-between">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex min-h-44px items-center justify-center gap-8px rounded-8 bg-brand px-24px py-8px text-15 font-medium leading-140 text-white shadow-elevation transition-standard hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>

                  <p className="flex items-start gap-8px text-12 leading-130 text-ink-secondary bp480:items-center">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 bp480:mt-0" aria-hidden="true" />
                    <span>
                      We never ask for your password, PIN, or one-time codes. Never share those in an email.
                    </span>
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Other info channels in squares after */}
          <div className="grid gap-20px bp810:grid-cols-3">
            <div className="flex flex-col justify-between rounded-8 bg-layer-1 p-20px shadow-hairline-12 bp810:p-24px">
              <div>
                <h2 className="mb-12px flex items-center gap-8px text-19 font-medium leading-130 text-ink-high">
                  <Mail className="h-4 w-4 text-ink-accent" aria-hidden="true" />
                  Email us
                </h2>
                <p className="text-14 leading-140 text-ink-secondary">
                  The fastest way to reach the team. We reply to support requests within 2 business
                  days.
                </p>
              </div>
              <div className="mt-20px flex flex-col gap-10px">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="block truncate text-13 font-medium text-ink-accent underline underline-offset-2 transition-standard hover:no-underline bp480:text-14"
                  title={SUPPORT_EMAIL}
                >
                  {SUPPORT_EMAIL}
                </a>
                <div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy support email address"
                    className="inline-flex h-8 items-center gap-6px rounded-pill bg-layer-2 px-12px text-12 font-medium text-ink-high transition-standard hover:bg-brand hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-status-success" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span>{copied ? "Copied" : "Copy email"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-8 bg-layer-1 p-20px shadow-hairline-12 bp810:p-24px">
              <div>
                <h2 className="mb-12px flex items-center gap-8px text-19 font-medium leading-130 text-ink-high">
                  <Clock className="h-4 w-4 text-ink-secondary" aria-hidden="true" />
                  Response times
                </h2>
                <ul className="space-y-12px text-13 leading-140 text-ink-secondary bp480:text-14">
                  <li className="flex items-center justify-between gap-8px">
                    <span className="whitespace-nowrap">Support &amp; bugs</span>
                    <span className="font-medium text-ink-high whitespace-nowrap">within 2 days</span>
                  </li>
                  <li className="flex items-center justify-between gap-8px">
                    <span className="whitespace-nowrap">Account deletion</span>
                    <span className="font-medium text-ink-high whitespace-nowrap">within 7 days</span>
                  </li>
                  <li className="flex items-center justify-between gap-8px">
                    <span className="whitespace-nowrap">Privacy requests</span>
                    <span className="font-medium text-ink-high whitespace-nowrap">within 14 days</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-8 bg-layer-1 p-20px shadow-hairline-12 bp810:p-24px">
              <div>
                <h2 className="mb-12px flex items-center gap-8px text-19 font-medium leading-130 text-ink-high">
                  <LifeBuoy className="h-4 w-4 text-ink-secondary" aria-hidden="true" />
                  Faster answers
                </h2>
                <ul className="space-y-8px text-13 leading-140 text-ink-secondary bp480:text-14">
                  <li>
                    <Link
                      to="/faq"
                      className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline"
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline"
                    >
                      Support &amp; Help Centre
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline"
                    >
                      Guides &amp; Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/delete-account"
                      className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline"
                    >
                      Delete your account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
