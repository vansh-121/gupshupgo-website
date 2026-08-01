import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import NewsletterForm from "./NewsletterForm";

/**
 * Product-updates subscription section (design §3.8, Requirement 8.1, 8.7).
 *
 * Copy describes an ongoing subscription to GupShupGo product updates — no
 * waitlist or pre-launch framing.
 */
export default function NewsletterSection() {
  return (
    <Section id="newsletter" background="surface-alt">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading sectionId="newsletter">Get GupShupGo product updates</SectionHeading>
        <p className="mt-4 text-body-lg text-ink-high">
          Subscribe to hear about new GupShupGo features, app updates, and improvements as
          they ship.
        </p>

        <div className="mt-8 text-left">
          <NewsletterForm />
        </div>

        <p className="mt-4 text-caption text-ink-high">
          One email per update at most. Unsubscribe whenever you like.
        </p>
      </div>
    </Section>
  );
}
