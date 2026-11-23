import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Dummy and RFC 2606 test domains used by crawlers/spambots */
const BLOCKED_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "test.org",
  "sample.com",
  "mailinator.com",
]);

const VALIDATION_MESSAGE = "Enter a valid email address.";
const SUBMIT_ERROR_MESSAGE = "We could not save your email just now. Please try again.";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;
const HCAPTCHA_SITE_KEY =
  (import.meta.env.VITE_HCAPTCHA_SITE_KEY as string) || "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

/**
 * Product-updates subscription form — powered by Web3Forms.
 *
 * Submissions POST to https://api.web3forms.com/submit and are forwarded
 * to the inbox associated with `VITE_WEB3FORMS_KEY`. Includes anti-spam honeypot,
 * test-domain suppression, bot speed checks, and hCaptcha human verification.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const mountTimeRef = useRef<number>(Date.now());
  const captchaRef = useRef<HCaptcha | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      setValidationError(VALIDATION_MESSAGE);
      return;
    }

    const domain = trimmed.split("@")[1]?.toLowerCase();

    // Anti-spam layer 1: Honeypot field checked by bots
    // Anti-spam layer 2: Dummy/placeholder domains (e.g. you@example.com from crawlers/scripts)
    // Anti-spam layer 3: Subhuman submission speed (< 800ms from component mount)
    const isBot =
      botcheck ||
      (domain && BLOCKED_DOMAINS.has(domain)) ||
      Date.now() - mountTimeRef.current < 800;

    if (isBot) {
      // Silently pretend success to deceive spam bots without consuming Web3Forms quota
      setValidationError(null);
      setStatus("success");
      return;
    }

    if (!captchaToken) {
      setValidationError("Please complete the captcha verification.");
      return;
    }

    setValidationError(null);
    setStatus("pending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email: trimmed,
          subject: "New GupShupGo Newsletter Subscriber",
          botcheck: botcheck ? "bot" : "",
          "h-captcha-response": captchaToken,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-12px rounded-8 bg-layer-2 p-24px text-left shadow-hairline-12"
      >
        <CheckCircle2 className="mt-2px size-5 shrink-0 text-status-success" aria-hidden="true" />
        <div>
          <p className="text-16 font-medium leading-140 text-ink-high">You're subscribed.</p>
          <p className="text-14 leading-140 text-ink-secondary">
            We'll email you when new GupShupGo features ship.
          </p>
        </div>
      </div>
    );
  }

  const message = validationError ?? (status === "error" ? SUBMIT_ERROR_MESSAGE : null);

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      {/* Invisible honeypot field for bot trapping */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        style={{ display: "none" }}
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
      />

      <div className="flex flex-col gap-12px sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="newsletter-email"
            className="mb-8px block text-14 font-medium leading-140 text-ink-high"
          >
            Email address
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            placeholder="name@domain.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={message ? true : undefined}
            aria-describedby={message ? "email-error" : undefined}
            className="h-48px rounded-8 border-0 bg-layer-0 text-16 leading-140 text-ink-high shadow-hairline-56 transition-standard placeholder:text-ink-secondary"
          />
        </div>
        <Button
          type="submit"
          disabled={status === "pending"}
          aria-busy={status === "pending"}
          className="h-48px rounded-pill bg-brand px-24px py-0 text-16 font-medium leading-100 text-white shadow-elevation transition-standard hover:bg-brand-dark dark:bg-brand-dark dark:hover:brightness-90"
        >
          {status === "pending" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Subscribing
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      {/* hCaptcha human verification */}
      <div className="mt-16px">
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITE_KEY}
          reCaptchaCompat={false}
          onVerify={(token) => {
            setCaptchaToken(token);
            if (validationError) setValidationError(null);
          }}
          onExpire={() => setCaptchaToken(null)}
        />
      </div>

      {message ? (
        <p id="email-error" role="alert" className="mt-12px text-14 leading-140 text-status-error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
