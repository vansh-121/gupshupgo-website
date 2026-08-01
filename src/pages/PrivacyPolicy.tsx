import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import SiteShell from "@/components/layout/SiteShell";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy — GupShupGo";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "GupShupGo Privacy Policy. Learn how we collect, use, and protect your data in our open-source communication app.");
  }, []);

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-3xl px-gutter py-section">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-body-sm text-ink-mid transition-colors hover:text-ink-high"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <h1 className="mb-2 text-h1 font-bold tracking-tight text-ink-high">Privacy Policy</h1>
        <p className="mb-12 text-body-sm text-ink-mid">Last Updated: February 20, 2026</p>

        <div className="space-y-10 text-body text-ink-mid">
          <Section title="1. Introduction">
            <p>
              GupShupGo ("we", "our", or "us") is an open-source, production-ready Flutter communication application. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the GupShupGo mobile application ("App").
            </p>
            <p>
              By using GupShupGo, you agree to the terms outlined in this Privacy Policy. If you do not agree, please discontinue use of the App.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 className="mb-2 mt-4 text-h3 font-medium text-ink-high">2.1 Information You Provide</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong className="text-ink-high">Phone Number:</strong> Used for OTP-based authentication via Firebase.</li>
              <li><strong className="text-ink-high">Display Name & Profile Photo:</strong> Shown to other users within the app.</li>
              <li><strong className="text-ink-high">Messages:</strong> Text messages and media you send to other users.</li>
              <li><strong className="text-ink-high">Status Updates:</strong> Text, images, or videos you post as statuses.</li>
            </ul>

            <h3 className="mb-2 mt-4 text-h3 font-medium text-ink-high">2.2 Information Collected Automatically</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong className="text-ink-high">Device Token (FCM):</strong> Used to deliver push notifications for incoming calls and messages.</li>
              <li><strong className="text-ink-high">Online/Offline Status:</strong> Updated in real-time to allow other users to see your availability.</li>
              <li><strong className="text-ink-high">Call Logs:</strong> Type of call, duration, timestamp, and call status are stored per user.</li>
              <li><strong className="text-ink-high">Read Receipts:</strong> Message delivery and read timestamps are stored to display seen/delivered indicators.</li>
            </ul>

            <h3 className="mb-2 mt-4 text-h3 font-medium text-ink-high">2.3 Media & Files</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Images, videos, and files you share in chats are uploaded to Firebase Storage and linked within Firestore messages.</li>
              <li>Status media is stored in Firebase Storage and automatically expires after 24 hours.</li>
            </ul>

            <h3 className="mb-2 mt-4 text-h3 font-medium text-ink-high">2.4 Guest Login</h3>
            <p>If you sign in as a Guest, Firebase creates an anonymous UID. No phone number or personal data is collected in this mode.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc space-y-1 pl-5">
              <li>Authenticate your identity and maintain your session.</li>
              <li>Deliver messages, calls, and notifications to you and recipients.</li>
              <li>Display your profile, online status, and statuses to other users.</li>
              <li>Maintain call log history for your reference.</li>
              <li>Enable real-time communication features via Agora RTC Engine.</li>
              <li>Provide technical support and resolve issues.</li>
            </ul>
            <p className="mt-3">We do <strong className="text-ink-high">NOT</strong> use your data for advertising, analytics profiling, or sell it to any third parties.</p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>GupShupGo integrates the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong className="text-ink-high">Firebase (Google LLC)</strong> — Auth, Firestore, Storage, Cloud Messaging</li>
              <li><strong className="text-ink-high">Agora.io</strong> — Real-time audio/video transmission</li>
            </ul>
            <p className="mt-2">By using GupShupGo, you also agree to the policies of these services.</p>
          </Section>

          <Section title="5. Data Storage & Retention">
            <ul className="list-disc space-y-1 pl-5">
              <li>All data is stored on Firebase infrastructure (Google Cloud).</li>
              <li>Messages and call logs are retained until you delete them or your account is deleted.</li>
              <li>Status updates are automatically deleted after 24 hours.</li>
              <li>Guest accounts may be deleted after prolonged inactivity.</li>
            </ul>
          </Section>

          <Section title="6. Data Security">
            <ul className="list-disc space-y-1 pl-5">
              <li>Firestore security rules restrict data access to authenticated users.</li>
              <li>Firebase Storage rules restrict file access to intended sender and recipient.</li>
              <li>All data in transit is protected by TLS/HTTPS encryption.</li>
              <li>Agora RTC channels use encrypted audio/video streams.</li>
            </ul>
            <p className="mt-2">Despite these measures, no system is 100% secure. Use the App at your own risk.</p>
          </Section>

          <Section title="7. Permissions Requested">
            <div className="mt-2 overflow-x-auto rounded-xl border border-hairline shadow-sm">
              <table className="w-full text-body-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="px-4 py-2 text-left font-medium text-ink-high">Permission</th>
                    <th className="px-4 py-2 text-left font-medium text-ink-high">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-divider">
                  {[
                    ["Camera", "Video calls and capturing status media"],
                    ["Microphone", "Voice/audio calls"],
                    ["Storage", "Selecting and saving media files"],
                    ["Notifications", "Incoming call and message notifications"],
                    ["Foreground Service", "Handling calls while app is in background"],
                    ["Internet", "Connect to Firebase and Agora servers"],
                    ["Wake Lock", "Keep device active during active calls"],
                  ].map(([perm, purpose]) => (
                    <tr key={perm}>
                      <td className="px-4 py-2 font-medium text-ink-high">{perm}</td>
                      <td className="px-4 py-2">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="8. Children's Privacy">
            <p>GupShupGo is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.</p>
          </Section>

          <Section title="9. Your Rights">
            <ul className="list-disc space-y-1 pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Withdraw consent for specific data processing activities.</li>
            </ul>
          </Section>

          <Section title="10. Open Source Disclosure">
            <p>
              GupShupGo is open-source software licensed under the MIT License. The source code is publicly available at{" "}
              <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                github.com/vansh-121/GupShupGo
              </a>.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect the most recent revision. Continued use of the App after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="12. Contact">
            <p>For privacy-related inquiries, data deletion requests, or concerns:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                GitHub:{" "}
                <a href="https://github.com/vansh-121" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                  github.com/vansh-121
                </a>
              </li>
              <li>
                Issues:{" "}
                <a href="https://github.com/vansh-121/GupShupGo/issues" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                  github.com/vansh-121/GupShupGo/issues
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-h2 font-semibold text-ink-high">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
