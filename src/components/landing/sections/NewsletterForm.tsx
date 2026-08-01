import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALIDATION_MESSAGE = "Enter a valid email address, like you@example.com.";
const SUBMIT_ERROR_MESSAGE = "We could not save your email just now. Please try again.";

/** Postgres unique-violation: the address is already subscribed, which is a success for the visitor. */
const DUPLICATE_EMAIL_CODE = "23505";

/**
 * Product-updates subscription form (design §3.8, Requirements 8.1–8.7).
 *
 * The Supabase call is preserved verbatim from the previous implementation
 * (`waitlist` insert) because Req 8.2 requires the same endpoint; only the
 * visitor-facing copy changed. The client is imported lazily inside the
 * mutation so the Supabase chunk stays off the critical path (design §5).
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const subscription = useMutation({
    mutationFn: async (trimmed: string) => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("waitlist").insert({ email: trimmed });

      if (error) {
        // Already subscribed — treat as success rather than an error (design §3.8).
        if (error.code === DUPLICATE_EMAIL_CODE) {
          return;
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("You're subscribed to GupShupGo product updates.");
    },
    onError: () => {
      toast.error(SUBMIT_ERROR_MESSAGE);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      // Req 8.4: report inline against the field and keep what the visitor typed.
      setValidationError(VALIDATION_MESSAGE);
      subscription.reset();
      return;
    }

    setValidationError(null);
    subscription.mutate(trimmed);
  };

  if (subscription.isSuccess) {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-hairline bg-surface p-6 text-left"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-status-success" aria-hidden="true" />
        <div>
          <p className="text-body font-semibold text-ink-high">You're subscribed.</p>
          <p className="text-body-sm text-ink-high">
            We'll email you when new GupShupGo features ship.
          </p>
        </div>
      </div>
    );
  }

  const submitError = subscription.isError ? SUBMIT_ERROR_MESSAGE : null;
  const message = validationError ?? submitError;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="newsletter-email"
            className="mb-2 block text-body-sm font-medium text-ink-high"
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
            className="h-12 rounded-xl border-hairline bg-surface text-ink-high placeholder:text-ink-low"
          />
        </div>
        <Button
          type="submit"
          disabled={subscription.isPending}
          aria-busy={subscription.isPending}
          className="h-12 rounded-xl bg-brand px-6 text-body font-semibold text-white hover:bg-brand-dark"
        >
          {subscription.isPending ? (
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
        <p id="email-error" role="alert" className="mt-3 text-body-sm text-status-error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
