import { useEffect } from "react";
import { ArrowLeft, Trash2, AlertTriangle, ShieldCheck, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";

/**
 * Account-deletion route, migrated onto the Nova token layer (Req 2.1, 3, 4, 6, 7).
 *
 * Status colour is retained where it is doing semantic work: the warning banner
 * and the deletion call-to-action stay on `status-error`, with white label text
 * on the solid fill. The banner boundary is the one place a tinted `status`
 * hairline would be lost, so it is carried by the tinted background instead of
 * a `border`.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-16px text-25 font-medium leading-120 text-ink-high">{title}</h2>
      <div className="space-y-12px">{children}</div>
    </section>
  );
}

export default function DeleteAccount() {
  useEffect(() => {
    document.title = "Delete Account — GupShupGo";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Request deletion of your GupShupGo account and associated data. Learn what data is deleted, what is retained, and how to submit a deletion request."
    );
  }, []);

  return (
    <SiteShell>
      <div className={`mx-auto w-full ${MEASURE_CLASSES[809]} px-20px py-80px bp810:px-36px bp810:py-128px`}>
        <Link
          to="/"
          className="mb-40px inline-flex items-center gap-8px text-14 leading-140 text-ink-secondary transition-standard hover:text-ink-high"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="mb-8px flex items-center gap-12px">
          <Trash2 className="h-8 w-8 text-status-error" aria-hidden="true" />
          <h1 className="text-h2-sm font-medium text-ink-high bp810:text-h2">Delete Account</h1>
        </div>
        <p className="mb-48px text-14 leading-140 text-ink-secondary">Last Updated: March 9, 2026</p>

        {/* Warning Banner — status-error tint carries the boundary, no `border` (Req 4.3). */}
        <div className="mb-48px flex items-start gap-12px rounded-8 bg-status-error/10 p-20px">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-status-error" aria-hidden="true" />
          <p className="text-14 leading-140 text-ink-high">
            <strong className="font-medium">Warning:</strong> Account deletion is <strong className="font-medium">permanent and irreversible</strong>. Once your account is deleted, your data cannot be recovered. Please read all sections carefully before submitting a request.
          </p>
        </div>

        <div className="space-y-40px text-16 leading-140 text-ink-secondary">

          {/* Steps to Request Deletion */}
          <Section title="How to Request Account Deletion">
            <p>
              To delete your GupShupGo account and all associated data, send us an email request using the steps below. We will process your request and permanently delete your account within <strong className="font-medium text-ink-high">7 business days</strong>.
            </p>

            <div className="mt-16px">
              <div className="rounded-8 bg-layer-1 p-20px shadow-hairline-12-elevated">
                <h3 className="mb-16px flex items-center gap-8px text-19 font-medium leading-130 text-ink-high">
                  <Mail className="h-4 w-4 text-ink-accent" aria-hidden="true" />
                  Request Deletion via Email
                </h3>
                <ol className="list-decimal space-y-12px pl-20px text-14 leading-140 text-ink-high">
                  <li>
                    Send an email to{" "}
                    <a href="mailto:vansh.sethi98760@gmail.com" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                      vansh.sethi98760@gmail.com
                    </a>
                  </li>
                  <li>
                    Use the subject line:{" "}
                    <strong className="font-medium text-ink-high">"Account Deletion Request — GupShupGo"</strong>
                  </li>
                  <li>
                    In the body, include your registered <strong className="font-medium text-ink-high">phone number</strong> and{" "}
                    <strong className="font-medium text-ink-high">display name</strong> so we can locate and verify your account.
                  </li>
                  <li>
                    You will receive a <strong className="font-medium text-ink-high">confirmation email</strong> once your account and data have been fully deleted.
                  </li>
                </ol>

                <a
                  href="mailto:vansh.sethi98760@gmail.com?subject=Account%20Deletion%20Request%20%E2%80%94%20GupShupGo"
                  className="mt-20px inline-flex min-h-11 items-center gap-8px rounded-8 bg-status-error px-16px py-8px text-14 font-medium leading-140 text-white shadow-elevation transition-standard hover:opacity-90"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Send Deletion Request
                </a>
              </div>
            </div>
          </Section>

          {/* Data Deleted */}
          <Section title="Data That Will Be Deleted">
            <p>Upon confirmed account deletion, the following data is <strong className="font-medium text-ink-high">permanently and irreversibly deleted</strong>:</p>
            <ul className="mt-8px list-disc space-y-8px pl-20px">
              <li><strong className="font-medium text-ink-high">Account profile:</strong> Your display name, profile photo, and phone number association.</li>
              <li><strong className="font-medium text-ink-high">Messages:</strong> All one-on-one and group messages you sent or received.</li>
              <li><strong className="font-medium text-ink-high">Media files:</strong> All images, videos, and files you shared in chats.</li>
              <li><strong className="font-medium text-ink-high">Status updates:</strong> All status posts you have published (note: statuses auto-expire after 24 hours regardless).</li>
              <li><strong className="font-medium text-ink-high">Call logs:</strong> All call history records associated with your account.</li>
              <li><strong className="font-medium text-ink-high">Contacts list:</strong> Your in-app contacts and any linked contact data.</li>
              <li><strong className="font-medium text-ink-high">Push notification token (FCM):</strong> Removed immediately upon deletion.</li>
              <li><strong className="font-medium text-ink-high">Online/offline status:</strong> Your presence data is removed from our systems.</li>
              <li><strong className="font-medium text-ink-high">Firebase Authentication record:</strong> Your authentication entry is deleted from Firebase.</li>
            </ul>
          </Section>

          {/* Data Retained */}
          <Section title="Data That May Be Retained">
            <div className="mb-16px flex items-start gap-12px rounded-8 bg-layer-1 p-16px shadow-hairline-12">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ink-secondary" aria-hidden="true" />
              <p className="text-14 leading-140 text-ink-high">
                In limited circumstances, some non-personal, aggregated, or legally required data may be retained for a defined period after account deletion.
              </p>
            </div>
            <ul className="list-disc space-y-8px pl-20px">
              <li>
                <strong className="font-medium text-ink-high">Aggregated analytics data:</strong> Non-identifiable usage statistics (e.g., total active users) may be retained indefinitely as they cannot be tied back to any individual.
              </li>
              <li>
                <strong className="font-medium text-ink-high">Legal compliance logs:</strong> If required by applicable law or an ongoing legal process, certain records may be retained for up to <strong className="font-medium text-ink-high">90 days</strong> before permanent deletion.
              </li>
              <li>
                <strong className="font-medium text-ink-high">Abuse prevention records:</strong> If your account was flagged for abuse, fraud, or policy violations, a minimal record may be retained for up to <strong className="font-medium text-ink-high">1 year</strong> solely to prevent re-registration abuse.
              </li>
              <li>
                <strong className="font-medium text-ink-high">Backup snapshots:</strong> Our automated backups are purged on a rolling <strong className="font-medium text-ink-high">30-day</strong> schedule. Any residual backup data containing your information will be fully purged within 30 days of your deletion request.
              </li>
            </ul>
          </Section>

          {/* After Deletion */}
          <Section title="What Happens After Deletion">
            <ul className="list-disc space-y-8px pl-20px">
              <li>You will be <strong className="font-medium text-ink-high">immediately logged out</strong> of all active sessions.</li>
              <li>Your profile, messages, and media will no longer be visible to other users.</li>
              <li>Your phone number will be <strong className="font-medium text-ink-high">disassociated</strong> from GupShupGo and can be used to create a new account in the future.</li>
              <li>Any open group chats you were part of will show your name as <strong className="font-medium text-ink-high">"Deleted User"</strong>.</li>
              <li>You will <strong className="font-medium text-ink-high">not receive</strong> a data export before deletion unless you request one separately (see below).</li>
            </ul>
          </Section>

          {/* Data Export */}
          <Section title="Request a Data Export Before Deleting">
            <p>
              Before deleting your account, you have the right to request a copy of your personal data. To do so, email us at{" "}
              <a href="mailto:vansh.sethi98760@gmail.com" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                vansh.sethi98760@gmail.com
              </a>{" "}
              with the subject <strong className="font-medium text-ink-high">"Data Export Request — GupShupGo"</strong>. We will provide your data within <strong className="font-medium text-ink-high">14 business days</strong>.
            </p>
          </Section>

          {/* Contact */}
          <Section title="Contact Us">
            <div className="flex items-start gap-12px rounded-8 bg-layer-1 p-20px shadow-hairline-12-elevated">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ink-secondary" aria-hidden="true" />
              <div className="space-y-4px text-14 leading-140 text-ink-high">
                <p className="font-medium text-ink-high">GupShupGo Support</p>
                <p>
                  Email:{" "}
                  <a href="mailto:vansh.sethi98760@gmail.com" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                    vansh.sethi98760@gmail.com
                  </a>
                </p>
                <p className="mt-8px text-12 leading-130 text-ink-high">
                  We respond to all account-related requests within 7 business days. For urgent matters, please include "URGENT" in your email subject line.
                </p>
              </div>
            </div>
          </Section>

          {/*
            Privacy Link — was a decorative `border-t` rule. The inset Hairline
            cannot draw a single edge, so this becomes a fully-bounded block
            rather than keeping a `border` (Req 4.3).
          */}
          <div className="flex items-start gap-12px rounded-8 p-16px shadow-hairline-12">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink-secondary" aria-hidden="true" />
            <p className="text-14 leading-140">
              For full details on how we collect and handle your data, please read our{" "}
              <Link to="/privacy" className="text-ink-accent underline underline-offset-2 transition-standard hover:no-underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

        </div>
      </div>
    </SiteShell>
  );
}
