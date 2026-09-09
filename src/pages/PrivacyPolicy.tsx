import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";

/**
 * Privacy policy route, migrated onto the Nova token layer (Req 2.1, 3, 4, 6, 7).
 *
 * The `<h1>` carries the 48px h2 composite rather than the 68px h1 composite:
 * the tag is the document's single level-1 heading, but 68px is a display size
 * and reads wrong at the top of a legal document. Body copy runs at
 * `leading-140`, the loosest permitted line-height (Req 6.10), because dense
 * legal prose needs the extra leading.
 *
 * No scroll reveals here on purpose — policy text must never sit behind a JS
 * gate.
 */
export default function PrivacyPolicy() {
  return (
    <SiteShell>
      <SEOHead
        title="Privacy Policy — GupShupGo | How We Protect Your Data"
        description="See how GupShupGo protects your data with Signal-protocol end-to-end encryption, local vault storage, and zero message tracking on Android."
        canonicalPath="/privacy"
      />

      <div className={`mx-auto w-full ${MEASURE_CLASSES[809]} px-20px py-80px bp810:px-36px bp810:py-128px`}>
        <Link
          to="/"
          className="mb-40px inline-flex items-center gap-8px text-14 leading-140 text-ink-secondary transition-standard hover:text-ink-high"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <h1 className="mb-8px text-h2-xs font-medium text-ink-high bp480:text-h2-sm bp810:text-h2">
          Privacy Policy
        </h1>

        <p className="mb-48px text-14 leading-140 text-ink-secondary">Last Updated: February 20, 2026</p>

        <div className="space-y-40px text-16 leading-140 text-ink-secondary">
          <Section title="1. Introduction">
            <p>
              GupShupGo ("we", "our", or "us") is an open-source, production-ready Flutter communication application. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the GupShupGo mobile application ("App").
            </p>
            <p>
              By using GupShupGo, you agree to the terms outlined in this Privacy Policy. If you do not agree, please discontinue use of the App.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">2.1 Information You Provide</h3>
            <ul className="list-disc space-y-4px pl-20px">
              <li><strong className="font-medium text-ink-high">Phone Number:</strong> Used for OTP-based authentication via Firebase.</li>
              <li><strong className="font-medium text-ink-high">Display Name & Profile Photo:</strong> Shown to other users within the app.</li>
              <li><strong className="font-medium text-ink-high">Messages:</strong> Text messages and media you send to other users.</li>
              <li><strong className="font-medium text-ink-high">Status Updates:</strong> Text, images, or videos you post as statuses.</li>
            </ul>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">2.2 Information Collected Automatically</h3>
            <ul className="list-disc space-y-4px pl-20px">
              <li><strong className="font-medium text-ink-high">Device Token (FCM):</strong> Used to deliver push notifications for incoming calls and messages.</li>
              <li><strong className="font-medium text-ink-high">Online/Offline Status:</strong> Updated in real-time to allow other users to see your availability.</li>
              <li><strong className="font-medium text-ink-high">Call Logs:</strong> Type of call, duration, timestamp, and call status are stored per user.</li>
              <li><strong className="font-medium text-ink-high">Read Receipts:</strong> Message delivery and read timestamps are stored to display seen/delivered indicators.</li>
            </ul>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">2.3 Media & Files</h3>
            <ul className="list-disc space-y-4px pl-20px">
              <li>Images, videos, and files you share in chats are uploaded to Firebase Storage and linked within Firestore messages.</li>
              <li>Status media is stored in Firebase Storage and automatically expires after 24 hours.</li>
            </ul>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">2.4 Guest Login</h3>
            <p>If you sign in as a Guest, Firebase creates an anonymous UID. No phone number or personal data is collected in this mode.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc space-y-4px pl-20px">
              <li>Authenticate your identity and maintain your session.</li>
              <li>Deliver messages, calls, and notifications to you and recipients.</li>
              <li>Display your profile, online status, and statuses to other users.</li>
              <li>Maintain call log history for your reference.</li>
              <li>Enable real-time communication features via Agora RTC Engine.</li>
              <li>Provide technical support and resolve issues.</li>
            </ul>
            <p className="mt-12px">We do <strong className="font-medium text-ink-high">NOT</strong> use your data for advertising, analytics profiling, or sell it to any third parties.</p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>GupShupGo integrates the following third-party services:</p>
            <ul className="mt-8px list-disc space-y-4px pl-20px">
              <li><strong className="font-medium text-ink-high">Firebase (Google LLC)</strong> — Auth, Firestore, Storage, Cloud Messaging</li>
              <li><strong className="font-medium text-ink-high">Agora.io</strong> — Real-time audio/video transmission</li>
              <li>
                <strong className="font-medium text-ink-high">Abacus Counter API</strong> — Anonymous, aggregate view counts for public blog articles on our website. All requests omit HTTP referrers and cookies. We actively respect browser <code className="text-12 font-mono">Do Not Track</code> (DNT) and <code className="text-12 font-mono">Global Privacy Control</code> (GPC) signals to prevent tracking visitor reading habits.
              </li>
            </ul>
            <p className="mt-8px">By using GupShupGo, you also agree to the policies of these services.</p>
          </Section>

          <Section title="5. Data Storage & Retention">
            <ul className="list-disc space-y-4px pl-20px">
              <li>All data is stored on Firebase infrastructure (Google Cloud).</li>
              <li>Messages and call logs are retained until you delete them or your account is deleted.</li>
              <li>Status updates are automatically deleted after 24 hours.</li>
              <li>Guest accounts may be deleted after prolonged inactivity.</li>
            </ul>
          </Section>

          <Section title="6. Data Security">
            <ul className="list-disc space-y-4px pl-20px">
              <li>Firestore security rules restrict data access to authenticated users.</li>
              <li>Firebase Storage rules restrict file access to intended sender and recipient.</li>
              <li>All data in transit is protected by TLS/HTTPS encryption.</li>
              <li>Agora RTC channels use encrypted audio/video streams.</li>
            </ul>
            <p className="mt-8px">Despite these measures, no system is 100% secure. Use the App at your own risk.</p>
          </Section>

          <Section title="7. Permissions Requested">
            {/*
              The wrapper boundary is decorative, so it is the inset Hairline
              composed with the elevation in one declaration (Req 4.3, 4.5).
              The `border-b` on the header row and the `divide-y` between body
              rows are NOT decorative: they are the row structure of a real
              two-column data table, which Req 4.3 scopes to *decorative*
              boundaries only. They stay as `border`/`divide`.
            */}
            <div className="mt-8px overflow-x-auto rounded-8 shadow-hairline-12-elevated">
              <table className="w-full text-14 leading-140">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="px-16px py-8px text-left font-medium text-ink-high">Permission</th>
                    <th className="px-16px py-8px text-left font-medium text-ink-high">Purpose</th>
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
                      <td className="px-16px py-8px font-medium text-ink-high">{perm}</td>
                      <td className="px-16px py-8px">{purpose}</td>
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
            <ul className="list-disc space-y-4px pl-20px">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Withdraw consent for specific data processing activities.</li>
            </ul>
          </Section>

          <Section title="10. Open Source Disclosure">
            <p>
              GupShupGo is open-source software licensed under the MIT License. The source code is publicly available at{" "}
              <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
                github.com/vansh-121/GupShupGo
              </a>.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect the most recent revision. Continued use of the App after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="12. Contact">
            <p>For privacy-related inquiries, data deletion requests, or concerns:</p>
            <ul className="mt-8px list-disc space-y-4px pl-20px">
              <li>
                GitHub:{" "}
                <a href="https://github.com/vansh-121" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
                  github.com/vansh-121
                </a>
              </li>
              <li>
                Issues:{" "}
                <a href="https://github.com/vansh-121/GupShupGo/issues" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
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
      <h2 className="mb-12px text-25 font-medium leading-120 text-ink-high">{title}</h2>
      <div className="space-y-8px">{children}</div>
    </section>
  );
}
