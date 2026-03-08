import { useEffect } from "react";
import { ArrowLeft, Trash2, AlertTriangle, ShieldCheck, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Trash2 className="w-8 h-8 text-destructive" />
          <h1 className="text-4xl font-bold tracking-tight">Delete Account</h1>
        </div>
        <p className="text-muted-foreground mb-12">Last Updated: March 9, 2026</p>

        {/* Warning Banner */}
        <div className="flex gap-3 items-start bg-destructive/10 border border-destructive/30 rounded-xl p-5 mb-12">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-destructive leading-relaxed">
            <strong>Warning:</strong> Account deletion is <strong>permanent and irreversible</strong>. Once your account is deleted, your data cannot be recovered. Please read all sections carefully before submitting a request.
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">

          {/* Steps to Request Deletion */}
          <Section title="How to Request Account Deletion">
            <p>
              To delete your GupShupGo account and all associated data, send us an email request using the steps below. We will process your request and permanently delete your account within <strong className="text-foreground">7 business days</strong>.
            </p>

            <div className="mt-4">
              <div className="border border-border rounded-xl p-5">
                <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Request Deletion via Email
                </h3>
                <ol className="list-decimal pl-5 space-y-3 text-sm">
                  <li>
                    Send an email to{" "}
                    <a href="mailto:vansh.sethi98760@gmail.com" className="text-primary underline underline-offset-2">
                      vansh.sethi98760@gmail.com
                    </a>
                  </li>
                  <li>
                    Use the subject line:{" "}
                    <strong className="text-foreground">"Account Deletion Request — GupShupGo"</strong>
                  </li>
                  <li>
                    In the body, include your registered <strong className="text-foreground">phone number</strong> and{" "}
                    <strong className="text-foreground">display name</strong> so we can locate and verify your account.
                  </li>
                  <li>
                    You will receive a <strong className="text-foreground">confirmation email</strong> once your account and data have been fully deleted.
                  </li>
                </ol>

                <a
                  href="mailto:vansh.sethi98760@gmail.com?subject=Account%20Deletion%20Request%20%E2%80%94%20GupShupGo"
                  className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Send Deletion Request
                </a>
              </div>
            </div>
          </Section>

          {/* Data Deleted */}
          <Section title="Data That Will Be Deleted">
            <p>Upon confirmed account deletion, the following data is <strong className="text-foreground">permanently and irreversibly deleted</strong>:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong className="text-foreground">Account profile:</strong> Your display name, profile photo, and phone number association.</li>
              <li><strong className="text-foreground">Messages:</strong> All one-on-one and group messages you sent or received.</li>
              <li><strong className="text-foreground">Media files:</strong> All images, videos, and files you shared in chats.</li>
              <li><strong className="text-foreground">Status updates:</strong> All status posts you have published (note: statuses auto-expire after 24 hours regardless).</li>
              <li><strong className="text-foreground">Call logs:</strong> All call history records associated with your account.</li>
              <li><strong className="text-foreground">Contacts list:</strong> Your in-app contacts and any linked contact data.</li>
              <li><strong className="text-foreground">Push notification token (FCM):</strong> Removed immediately upon deletion.</li>
              <li><strong className="text-foreground">Online/offline status:</strong> Your presence data is removed from our systems.</li>
              <li><strong className="text-foreground">Firebase Authentication record:</strong> Your authentication entry is deleted from Firebase.</li>
            </ul>
          </Section>

          {/* Data Retained */}
          <Section title="Data That May Be Retained">
            <div className="flex gap-3 items-start bg-muted/40 border border-border rounded-xl p-4 mb-4">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm">
                In limited circumstances, some non-personal, aggregated, or legally required data may be retained for a defined period after account deletion.
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Aggregated analytics data:</strong> Non-identifiable usage statistics (e.g., total active users) may be retained indefinitely as they cannot be tied back to any individual.
              </li>
              <li>
                <strong className="text-foreground">Legal compliance logs:</strong> If required by applicable law or an ongoing legal process, certain records may be retained for up to <strong className="text-foreground">90 days</strong> before permanent deletion.
              </li>
              <li>
                <strong className="text-foreground">Abuse prevention records:</strong> If your account was flagged for abuse, fraud, or policy violations, a minimal record may be retained for up to <strong className="text-foreground">1 year</strong> solely to prevent re-registration abuse.
              </li>
              <li>
                <strong className="text-foreground">Backup snapshots:</strong> Our automated backups are purged on a rolling <strong className="text-foreground">30-day</strong> schedule. Any residual backup data containing your information will be fully purged within 30 days of your deletion request.
              </li>
            </ul>
          </Section>

          {/* After Deletion */}
          <Section title="What Happens After Deletion">
            <ul className="list-disc pl-5 space-y-2">
              <li>You will be <strong className="text-foreground">immediately logged out</strong> of all active sessions.</li>
              <li>Your profile, messages, and media will no longer be visible to other users.</li>
              <li>Your phone number will be <strong className="text-foreground">disassociated</strong> from GupShupGo and can be used to create a new account in the future.</li>
              <li>Any open group chats you were part of will show your name as <strong className="text-foreground">"Deleted User"</strong>.</li>
              <li>You will <strong className="text-foreground">not receive</strong> a data export before deletion unless you request one separately (see below).</li>
            </ul>
          </Section>

          {/* Data Export */}
          <Section title="Request a Data Export Before Deleting">
            <p>
              Before deleting your account, you have the right to request a copy of your personal data. To do so, email us at{" "}
              <a href="mailto:vansh.sethi98760@gmail.com" className="text-primary underline underline-offset-2">
                vansh.sethi98760@gmail.com
              </a>{" "}
              with the subject <strong className="text-foreground">"Data Export Request — GupShupGo"</strong>. We will provide your data within <strong className="text-foreground">14 business days</strong>.
            </p>
          </Section>

          {/* Contact */}
          <Section title="Contact Us">
            <div className="flex gap-3 items-start bg-muted/40 border border-border rounded-xl p-5">
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="space-y-1 text-sm">
                <p className="text-foreground font-medium">GupShupGo Support</p>
                <p>
                  Email:{" "}
                  <a href="mailto:vansh.sethi98760@gmail.com" className="text-primary underline underline-offset-2">
                    vansh.sethi98760@gmail.com
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  We respond to all account-related requests within 7 business days. For urgent matters, please include "URGENT" in your email subject line.
                </p>
              </div>
            </div>
          </Section>

          {/* Privacy Link */}
          <div className="flex items-start gap-3 pt-4 border-t border-border">
            <ShieldCheck className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-sm">
              For full details on how we collect and handle your data, please read our{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
