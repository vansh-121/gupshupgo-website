import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALIDATION_MESSAGE = "Enter a valid email address, like you@example.com.";
const SUBMIT_ERROR_MESSAGE = "We could not save your email just now. Please try again.";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

/**
 * Product-updates subscription form — powered by Web3Forms.
 *
 * Submissions POST to https://api.web3forms.com/submit and are forwarded
 * to the inbox associated with `VITE_WEB3FORMS_KEY`. No backend or RLS
 * setup required.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      setValidationError(VALIDATION_MESSAGE);
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
            placeholder="you@example.com"
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

      {message ? (
        <p id="email-error" role="alert" className="mt-12px text-14 leading-140 text-status-error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
