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
 *
 * Nova pass is presentation-only: no logic, no ARIA wiring and no request shape
 * changed. The field's boundary is its sole affordance, so it is a
 * `shadow-hairline-56` inset hairline with the primitive's CSS `border`
 * neutralised (Req 4.2–4.4); the placeholder is `ink-secondary` because
 * `ink-low` measures 2.56:1 at best. The submit fill stays `brand-dark` in
 * Dark_Theme — white on `brand` reads 4.37:1 there — and its hover darkens
 * rather than lightens so the label keeps 4.5:1 in every state (Req 16.1).
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

  const submitError = subscription.isError ? SUBMIT_ERROR_MESSAGE : null;
  const message = validationError ?? submitError;

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
          disabled={subscription.isPending}
          aria-busy={subscription.isPending}
          /*
            `py-0 leading-100`: the primitive's default size adds `py-2` on top
            of this fixed `h-48px`, which shrank the box the label centres in.
          */
          className="h-48px rounded-pill bg-brand px-24px py-0 text-16 font-medium leading-100 text-white shadow-elevation transition-standard hover:bg-brand-dark dark:bg-brand-dark dark:hover:brightness-90"
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
        <p id="email-error" role="alert" className="mt-12px text-14 leading-140 text-status-error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
