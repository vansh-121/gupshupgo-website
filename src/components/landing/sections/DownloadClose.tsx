import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import DownloadButton from "@/components/DownloadButton";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { PLATFORM_LABEL } from "@/config/app";
import { bandFor } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Closing download section (design §3.5, Requirements 3.1, 7.1, 7.3, 7.6).
 *
 * The `closing`-variant `DownloadButton` is the only action here, so the CTA is
 * unambiguously the primary action of the section (Req 7.1). The store URL,
 * new-tab behaviour, and `rel` come from `DownloadButton` itself (Req 7.3), and
 * platform availability is stated with the shared `PLATFORM_LABEL` so it cannot
 * drift from the rest of the site (Req 7.6).
 *
 * Rendered last in the section registry order (Req 3.1). The band comes from
 * `bandFor("download")` — derived from this section's position in
 * `VISIBLE_SECTIONS`, so it always differs from `newsletter` before it (Req 3.8).
 * As the page's closing moment it gets the largest centred heading and the most
 * generous rhythm of any non-hero section.
 */
export default function DownloadClose() {
  return (
    <Section id="download" band={bandFor("download")}>
      <RevealGroup className={cn(MEASURE_CLASSES[644], "mx-auto text-center")}>
        <Reveal>
          {/* Level 2 already resolves to text-h2-sm / bp810:text-h2 — the
              largest non-hero heading on the page, which is what the closing
              moment wants. */}
          <SectionHeading sectionId="download">
            Get GupShupGo on Android
          </SectionHeading>
        </Reveal>

        <Reveal as="p" className="mt-24px text-lead text-ink-secondary">
          Private messaging, HD video and voice calls, offline mesh chat, and Gup Arcade in
          one app. {PLATFORM_LABEL}.
        </Reveal>

        <Reveal className="mt-40px flex justify-center">
          <DownloadButton variant="closing" />
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
