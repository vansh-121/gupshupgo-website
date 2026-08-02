import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";

/**
 * Terms of service route, migrated onto the Nova token layer (Req 2.1, 3, 4, 6, 7).
 *
 * Same typographic contract as the privacy policy: the `<h1>` tag keeps its
 * level but takes the 48px h2 composite instead of the 68px display composite,
 * and body copy runs at `leading-140` for dense prose (Req 6.10).
 */
export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service — GupShupGo";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "GupShupGo Terms of Service. Read the terms governing usage of our open-source communication app.");
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

        <h1 className="mb-8px text-h2-xs font-medium text-ink-high bp480:text-h2-sm bp810:text-h2">
          Terms of Service
        </h1>

        <p className="mb-48px text-14 leading-140 text-ink-secondary">Last Updated: February 20, 2026</p>

        <div className="space-y-40px text-16 leading-140 text-ink-secondary">
          <Section title="1. Acceptance of Terms">
            <p>
              By downloading, installing, or using the GupShupGo application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.
            </p>
            <p>
              GupShupGo is developed and maintained by vansh-121 ("Developer") as an open-source project available at{" "}
              <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
                github.com/vansh-121/GupShupGo
              </a>.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>GupShupGo is a mobile communication application that provides:</p>
            <ul className="mt-8px list-disc space-y-4px pl-20px">
              <li>Real-time one-to-one text messaging</li>
              <li>HD video calling and audio-only voice calling via Agora RTC</li>
              <li>WhatsApp-style 24-hour status updates</li>
              <li>Push notifications for messages and incoming calls</li>
              <li>Call log history</li>
              <li>Phone number-based authentication via Firebase</li>
              <li>Guest login mode for testing purposes</li>
            </ul>
            <p className="mt-8px">The App is provided as open-source software under the MIT License.</p>
          </Section>

          <Section title="3. Eligibility">
            <p>You must be at least 13 years of age to use this App. By using GupShupGo, you represent and warrant that:</p>
            <ul className="mt-8px list-disc space-y-4px pl-20px">
              <li>You are at least 13 years old.</li>
              <li>You have the legal capacity to enter into these Terms.</li>
              <li>Your use of the App complies with all applicable laws and regulations.</li>
            </ul>
          </Section>

          <Section title="4. User Accounts">
            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">4.1 Registration</h3>
            <p>To use GupShupGo, you must register using a valid phone number. OTP verification is required. You may also sign in as a Guest for limited functionality.</p>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">4.2 Account Responsibility</h3>
            <ul className="list-disc space-y-4px pl-20px">
              <li>All activity that occurs under your account.</li>
              <li>Maintaining the confidentiality of your device and session.</li>
              <li>Notifying us immediately of any unauthorized use of your account.</li>
            </ul>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">4.3 Accurate Information</h3>
            <p>You agree to provide accurate, current, and complete information during registration and to keep your profile updated.</p>
          </Section>

          <Section title="5. Acceptable Use">
            <p>You agree to use GupShupGo only for lawful, respectful, and personal communication purposes.</p>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">5.1 Prohibited Content</h3>
            <ul className="list-disc space-y-4px pl-20px">
              <li>Content that is illegal, obscene, defamatory, threatening, harassing, hateful, or abusive.</li>
              <li>Child sexual abuse material (CSAM) or any content that exploits minors.</li>
              <li>Spam, unsolicited bulk messages, or commercial solicitations.</li>
              <li>Malware, viruses, or any harmful code.</li>
              <li>Impersonation of another person, entity, or organization.</li>
            </ul>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">5.2 Prohibited Actions</h3>
            <ul className="list-disc space-y-4px pl-20px">
              <li>Reverse-engineering, decompiling, or tampering with the App's backend configuration.</li>
              <li>Exploiting vulnerabilities to access other users' data.</li>
              <li>Using automated bots, scrapers, or scripts.</li>
              <li>Misusing the Guest login feature.</li>
              <li>Interfering with or disrupting the App's servers.</li>
            </ul>

            <h3 className="mb-8px mt-16px text-19 font-medium leading-130 text-ink-high">5.3 Call Conduct</h3>
            <p>You may only initiate calls to users who have consented. Recording calls without consent may be illegal in your jurisdiction.</p>
          </Section>

          <Section title="6. Content Ownership & License">
            <p>You retain ownership of all content you create. By using the App, you grant us a limited, non-exclusive, royalty-free license to store and transmit your content solely to operate the App.</p>
            <p className="mt-8px">We do not actively monitor or read user messages. Status updates expire after 24 hours.</p>
          </Section>

          <Section title="7. Third-Party Services">
            {/*
              The wrapper boundary is decorative → inset Hairline composed with
              the elevation in one declaration (Req 4.3, 4.5). The header-row
              `border-b` and the body-row `divide-y` are structural: they are the
              row grid of a real three-column data table, and Req 4.3 scopes the
              `border`-property ban to *decorative* boundaries.
            */}
            <div className="mt-8px overflow-x-auto rounded-8 shadow-hairline-12-elevated">
              <table className="w-full text-14 leading-140">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="px-16px py-8px text-left font-medium text-ink-high">Service</th>
                    <th className="px-16px py-8px text-left font-medium text-ink-high">Provider</th>
                    <th className="px-16px py-8px text-left font-medium text-ink-high">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-divider">
                  {[
                    ["Firebase Auth", "Google LLC", "Phone OTP authentication"],
                    ["Firestore", "Google LLC", "Database for messages, users, logs"],
                    ["Firebase Storage", "Google LLC", "Media file storage"],
                    ["FCM", "Google LLC", "Push notifications"],
                    ["Agora RTC", "Agora.io", "Real-time audio/video streaming"],
                  ].map(([service, provider, purpose]) => (
                    <tr key={service}>
                      <td className="px-16px py-8px font-medium text-ink-high">{service}</td>
                      <td className="px-16px py-8px">{provider}</td>
                      <td className="px-16px py-8px">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="8. Open Source License">
            <p>GupShupGo source code is released under the MIT License. The MIT License applies to the source code only — these Terms govern your use of the running application.</p>
            <p className="mt-8px">
              Full license:{" "}
              <a href="https://github.com/vansh-121/GupShupGo/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
                github.com/vansh-121/GupShupGo/LICENSE
              </a>
            </p>
          </Section>

          <Section title="9. Disclaimers">
            <p className="mb-8px text-12 font-medium uppercase leading-130 tracking-wider text-ink-high">
              "As Is" Provision
            </p>
            <p>
              GupShupGo is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to merchantability, fitness for a particular purpose, uninterrupted operation, or security.
            </p>
            <p className="mt-8px">Call quality and message delivery depend on your network conditions and third-party infrastructure. This project is maintained by an individual developer on a best-effort basis.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, the Developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, unauthorized access, service interruptions, or damages from reliance on information transmitted via the App.
            </p>
            <p className="mt-8px font-medium text-ink-high">
              Total liability shall not exceed the amount you paid to use the App (which is zero).
            </p>
          </Section>

          <Section title="11. Indemnification">
            <p>You agree to indemnify, defend, and hold harmless the Developer from any claims, damages, losses, or expenses arising from your use of the App, violation of these Terms, or violation of any third party's rights.</p>
          </Section>

          <Section title="12. Account Termination">
            <ul className="list-disc space-y-4px pl-20px">
              <li><strong className="font-medium text-ink-high">By You:</strong> You may stop using the App at any time. Contact us via GitHub Issues to delete your account.</li>
              <li><strong className="font-medium text-ink-high">By Us:</strong> We may suspend or terminate access for users who violate these Terms or compromise security.</li>
              <li><strong className="font-medium text-ink-high">Effect:</strong> Upon termination, your right to use the App ceases. Data may be retained briefly before full deletion.</li>
            </ul>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>We may modify these Terms at any time. Continued use of the App after changes constitutes acceptance. If you disagree, stop using the App.</p>
          </Section>

          <Section title="14. Governing Law">
            <p>These Terms shall be governed by the laws applicable to the Developer's jurisdiction. Disputes shall be resolved through mutual discussion or appropriate courts.</p>
          </Section>

          <Section title="15. Contact">
            <p>For questions, abuse reports, or legal inquiries:</p>
            <ul className="mt-8px list-disc space-y-4px pl-20px">
              <li>
                GitHub Issues:{" "}
                <a href="https://github.com/vansh-121/GupShupGo/issues" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
                  github.com/vansh-121/GupShupGo/issues
                </a>
              </li>
              <li>
                GitHub Profile:{" "}
                <a href="https://github.com/vansh-121" target="_blank" rel="noopener noreferrer" className="text-ink-accent transition-standard hover:underline">
                  github.com/vansh-121
                </a>
              </li>
            </ul>
          </Section>

          {/*
            Was a decorative `border-t` rule. Req 4.3 bans the `border`
            property for decorative boundaries and the inset Hairline cannot
            draw a single edge, so the closing acknowledgement becomes a
            fully-bounded block instead of a rule above bare text.
          */}
          <div className="rounded-8 p-20px text-14 leading-140 shadow-hairline-12">
            <p>By using GupShupGo, you acknowledge that you have read, understood, and agreed to these Terms of Service.</p>
          </div>
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
