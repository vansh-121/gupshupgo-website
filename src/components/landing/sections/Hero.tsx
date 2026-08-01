import Section from "@/components/Section";
import DownloadButton from "@/components/DownloadButton";
import DeviceMockup from "@/components/DeviceMockup/DeviceMockup";
import { Button } from "@/components/ui/button";
import { MOCKUP_SCREENS } from "@/data/mockupScreens";
import { SECTIONS } from "@/data/sections";
import { PLATFORM_LABEL } from "@/config/app";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

/**
 * Hero section (design §3.6, §6.3).
 *
 * This is the only component in the app that emits an `<h1>` (Requirement
 * 12.3). It carries `id="hero-heading"` so the wrapping `Section`'s
 * `aria-labelledby="hero-heading"` resolves — `SectionHeading` is deliberately
 * not used here because it only emits h2–h4.
 *
 * Requirement 7.7 (visual dominance) is structural: the hero-variant
 * `DownloadButton` is the sole solid `bg-brand` fill, and every sibling control
 * is a `ghost` Button with no fill in any state.
 *
 * Requirement 14.1: nothing here waits on a network request. The copy is
 * inlined, the mockup is CSS-rendered from `mockupScreens.ts`, and there are no
 * images or fetches — so the heading and the Download CTA paint from the entry
 * bundle alone. This component is imported eagerly by `Index.tsx`.
 */

/** Heading copy lives in the shared section registry so nav/tests cannot drift. */
const HERO_HEADING =
  SECTIONS.find((section) => section.id === "hero")?.headingText ??
  "Private messaging, HD calls, and offline chat for Android";

/** The chat screen — `MOCKUP_SCREENS[0]`, rendered eagerly above the fold. */
const HERO_SCREEN = MOCKUP_SCREENS[0];

export default function Hero() {
  const navigateToSection = useSectionNavigation();

  return (
    <Section
      id="hero"
      containerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <div className="max-w-xl">
        <p className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-brand-light px-4 py-1.5 text-caption font-semibold uppercase tracking-wide text-ink-high">
          {PLATFORM_LABEL}
        </p>

        <h1
          id="hero-heading"
          className="mt-6 text-display font-bold text-ink-high"
        >
          {HERO_HEADING}
        </h1>

        <p className="mt-6 text-body-lg text-ink-mid">
          GupShupGo is a messaging and calling app for everyday conversations.
          Send texts, photos, and voice notes, jump into HD video and voice
          calls, and keep chatting with people nearby even when there is no
          internet at all.
        </p>

        <p className="mt-4 text-body text-ink-mid">
          Every chat and call is end-to-end encrypted, and Gup Arcade turns
          staying in touch into points, streaks, and leaderboards.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <DownloadButton variant="hero" />

          <Button
            asChild
            variant="ghost"
            className="h-14 min-h-[44px] w-full justify-center rounded-pill bg-transparent px-6 text-body font-semibold text-ink-high underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:hover:bg-transparent sm:w-auto"
          >
            <a href="#features" onClick={navigateToSection("features")}>
              See everything it does
            </a>
          </Button>
        </div>

        <p className="mt-6 text-body-sm text-ink-mid">
          {PLATFORM_LABEL} — free to download, with an optional Pro subscription
          inside the app.
        </p>
      </div>

      <div className="flex justify-center lg:justify-end">
        <DeviceMockup screen={HERO_SCREEN} className="max-w-[320px]" />
      </div>
    </Section>
  );
}
