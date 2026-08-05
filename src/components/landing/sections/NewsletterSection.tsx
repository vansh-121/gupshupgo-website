import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { bandFor } from "@/data/sections";
import { cn } from "@/lib/utils";
import NewsletterForm from "./NewsletterForm";

/**
 * Product-updates subscription section (design §3.8, Requirement 8.1, 8.7).
 *
 * Copy describes an ongoing subscription to GupShupGo product updates — no
 * waitlist or pre-launch framing.
 *
 * Nova pass: the band comes from `bandFor("newsletter")`, derived from this
 * section's position in `VISIBLE_SECTIONS` (Req 3.7, 3.8), the text block
 * constrained to the 644px
 * Text_Measure (Req 7.2), lead copy on the `text-lead` composite and the
 * footnote on `text-12 leading-130` (Req 6.10, 6.11). Secondary copy is
 * `text-ink-secondary` — inherited from `Section` — because `ink-mid` does not
 * clear 4.5:1 on `layer-1` (docs/TOKENS.md).
 */
export default function NewsletterSection() {
  return (
    <Section id="newsletter" band={bandFor("newsletter")}>
      <div className={cn("mx-auto text-center", MEASURE_CLASSES[644])}>
        <SectionHeading sectionId="newsletter">Get GupShupGo product updates</SectionHeading>
        <p className="mt-16px text-lead text-ink-secondary">
          Subscribe to hear about new GupShupGo features, app updates, and improvements as
          they ship.
        </p>

        <div className="mt-32px text-left">
          <NewsletterForm />
        </div>

        <p className="mt-16px text-12 leading-130 text-ink-secondary">
          One email per update at most. Unsubscribe whenever you like.
        </p>
      </div>
    </Section>
  );
}
