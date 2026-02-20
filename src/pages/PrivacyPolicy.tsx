import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
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

        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last Updated: February 20, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <Section title="1. Introduction">
            <p>
              GupShupGo ("we", "our", or "us") is an open-source, production-ready Flutter communication application. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the GupShupGo mobile application ("App").
            </p>
            <p>
              By using GupShupGo, you agree to the terms outlined in this Privacy Policy. If you do not agree, please discontinue use of the App.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <h4 className="text-foreground font-medium mt-4 mb-2">2.1 Information You Provide</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">Phone Number:</strong> Used for OTP-based authentication via Firebase.</li>
              <li><strong className="text-foreground">Display Name & Profile Photo:</strong> Shown to other users within the app.</li>
              <li><strong className="text-foreground">Messages:</strong> Text messages and media you send to other users.</li>
              <li><strong className="text-foreground">Status Updates:</strong> Text, images, or videos you post as statuses.</li>
            </ul>

            <h4 className="text-foreground font-medium mt-4 mb-2">2.2 Information Collected Automatically</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">Device Token (FCM):</strong> Used to deliver push notifications for incoming calls and messages.</li>
              <li><strong className="text-foreground">Online/Offline Status:</strong> Updated in real-time to allow other users to see your availability.</li>
              <li><strong className="text-foreground">Call Logs:</strong> Type of call, duration, timestamp, and call status are stored per user.</li>
              <li><strong className="text-foreground">Read Receipts:</strong> Message delivery and read timestamps are stored to display seen/delivered indicators.</li>
            </ul>

            <h4 className="text-foreground font-medium mt-4 mb-2">2.3 Media & Files</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Images, videos, and files you share in chats are uploaded to Firebase Storage and linked within Firestore messages.</li>
              <li>Status media is stored in Firebase Storage and automatically expires after 24 hours.</li>
            </ul>

            <h4 className="text-foreground font-medium mt-4 mb-2">2.4 Guest Login</h4>
            <p>If you sign in as a Guest, Firebase creates an anonymous UID. No phone number or personal data is collected in this mode.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>Authenticate your identity and maintain your session.</li>
              <li>Deliver messages, calls, and notifications to you and recipients.</li>
              <li>Display your profile, online status, and statuses to other users.</li>
              <li>Maintain call log history for your reference.</li>
              <li>Enable real-time communication features via Agora RTC Engine.</li>
              <li>Provide technical support and resolve issues.</li>
            </ul>
            <p className="mt-3">We do <strong className="text-foreground">NOT</strong> use your data for advertising, analytics profiling, or sell it to any third parties.</p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>GupShupGo integrates the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-foreground">Firebase (Google LLC)</strong> — Auth, Firestore, Storage, Cloud Messaging</li>
              <li><strong className="text-foreground">Agora.io</strong> — Real-time audio/video transmission</li>
            </ul>
            <p className="mt-2">By using GupShupGo, you also agree to the policies of these services.</p>
          </Section>

          <Section title="5. Data Storage & Retention">
            <ul className="list-disc pl-5 space-y-1">
              <li>All data is stored on Firebase infrastructure (Google Cloud).</li>
              <li>Messages and call logs are retained until you delete them or your account is deleted.</li>
              <li>Status updates are automatically deleted after 24 hours.</li>
              <li>Guest accounts may be deleted after prolonged inactivity.</li>
            </ul>
          </Section>

          <Section title="6. Data Security">
            <ul className="list-disc pl-5 space-y-1">
              <li>Firestore security rules restrict data access to authenticated users.</li>
              <li>Firebase Storage rules restrict file access to intended sender and recipient.</li>
              <li>All data in transit is protected by TLS/HTTPS encryption.</li>
              <li>Agora RTC channels use encrypted audio/video streams.</li>
            </ul>
            <p className="mt-2">Despite these measures, no system is 100% secure. Use the App at your own risk.</p>
          </Section>

          <Section title="7. Permissions Requested">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-foreground font-medium">Permission</th>
                    <th className="text-left py-2 text-foreground font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
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
                      <td className="py-2 pr-4 text-foreground font-medium">{perm}</td>
                      <td className="py-2">{purpose}</td>
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
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Withdraw consent for specific data processing activities.</li>
            </ul>
          </Section>

          <Section title="10. Open Source Disclosure">
            <p>
              GupShupGo is open-source software licensed under the MIT License. The source code is publicly available at{" "}
              <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                github.com/vansh-121/GupShupGo
              </a>.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect the most recent revision. Continued use of the App after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="12. Contact">
            <p>For privacy-related inquiries, data deletion requests, or concerns:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                GitHub:{" "}
                <a href="https://github.com/vansh-121" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  github.com/vansh-121
                </a>
              </li>
              <li>
                Issues:{" "}
                <a href="https://github.com/vansh-121/GupShupGo/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  github.com/vansh-121/GupShupGo/issues
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
