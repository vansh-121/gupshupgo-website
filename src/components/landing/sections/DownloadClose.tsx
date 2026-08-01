import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import DownloadButton from "@/components/DownloadButton";
import { PLATFORM_LABEL } from "@/config/app";

/**
 * Closing download section (design §3.5, Requirements 3.1, 7.1, 7.3, 7.6).
 *
 * The `closing`-variant `DownloadButton` is the only action here, so the CTA is
 * unambiguously the primary action of the section (Req 7.1). The store URL,
 * new-tab behaviour, and `rel` come from `DownloadButton` itself (Req 7.3), and
 * platform availability is stated with the shared `PLATFORM_LABEL` so it cannot
 * drift from the rest of the site (Req 7.6).
 *
 * Rendered last in the section registry order (Req 3.1).
 */
export default function DownloadClose() {
  return (
    <Section id="download">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading sectionId="download">Get GupShupGo on Android</SectionHeading>

        <p className="mt-4 text-body-lg text-ink-mid">
          Private messaging, HD video and voice calls, offline mesh chat, and Gup Arcade in
          one app. {PLATFORM_LABEL}.
        </p>

        <div className="mt-8 flex justify-center">
          <DownloadButton variant="closing" />
        </div>
      </div>
    </Section>
  );
}
