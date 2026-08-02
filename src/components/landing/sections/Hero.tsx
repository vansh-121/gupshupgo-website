import Section, { MEASURE_CLASSES } from "@/components/Section";
import DownloadButton from "@/components/DownloadButton";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import FloatingChip from "@/components/DeviceMockup/FloatingChip";
import Pill from "@/components/Pill";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { FEATURES } from "@/data/features";
import { getMockupScreen, type MockupCallScreen, type MockupChatScreen } from "@/data/mockupScreens";
import { SECTIONS, bandFor } from "@/data/sections";
import { PLATFORM_LABEL, PRO_LAUNCHED } from "@/config/app";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { cn } from "@/lib/utils";

/**
 * Hero section — Nova centre-aligned composition (Requirement 9).
 *
 * This is the only component in the app that emits an `<h1>` (Req 1.7). It
 * carries `id="hero-heading"` so the wrapping `Section`'s
 * `aria-labelledby="hero-heading"` resolves — `SectionHeading` is deliberately
 * not used here because it only emits h2–h4.
 *
 * Layout (Req 9.1): heading, lead paragraph and the Download CTA stack centred
 * on the axis. The hero-variant `DownloadButton` is the sole solid `bg-brand`
 * fill on the section, and its sibling is a fill-less `ghost` Button in every
 * state, which is how visual dominance is made structural rather than a
 * judgement call.
 *
 * Mockups: two `ScreenshotMockup` phone frames showing real app screenshots.
 * The forward frame uses the chat screenshot (theme-aware), the rear frame
 * uses the call screenshot (same image in both modes). Both get a 3D
 * perspective tilt for a premium showcase feel.
 *
 * Chips (Req 9.4, 9.5): both chip labels come from `src/data/` —
 * `chat.streakLabel` and `call.encryptionLabel` — with their icons taken from
 * the matching `FEATURES` entries. They sit inside the forward frame's
 * horizontal bounds on small viewports and only break the edge from
 * Breakpoint_Small up, again to keep the section overflow-free.
 */

/** Heading copy lives in the shared section registry so nav/tests cannot drift. */
const HERO_HEADING =
  SECTIONS.find((section) => section.id === "hero")?.headingText ??
  "Private messaging, HD calls, and offline chat for Android";

/** Forward frame: the chat screen. Rear frame: the call screen. */
const CHAT_SCREEN = getMockupScreen("chat") as MockupChatScreen;
const CALL_SCREEN = getMockupScreen("call") as MockupCallScreen;

/** Chip icons come from the same typed feature entries as the rest of the page. */
const ARCADE_ICON = FEATURES.find((feature) => feature.id === "arcade")?.Icon;
const ENCRYPTION_ICON = FEATURES.find(
  (feature) => feature.id === "encryption",
)?.Icon;

export default function Hero() {
  const navigateToSection = useSectionNavigation();

  return (
    <Section id="hero" band={bandFor("hero")} hero>
      <RevealGroup as="div" className="flex flex-col items-center text-center">
        <Reveal as="div">
          <Pill tint="soft">{PLATFORM_LABEL}</Pill>
        </Reveal>

        <Reveal
          as="h1"
          id="hero-heading"
          className={cn(
            MEASURE_CLASSES[872],
            "mt-24px text-h1-sm font-medium text-ink-high bp810:text-h1",
          )}
        >
          {HERO_HEADING}
        </Reveal>

        <Reveal
          as="p"
          className={cn(MEASURE_CLASSES[644], "mt-24px text-lead text-ink-secondary")}
        >
          Send texts, photos and voice notes, jump into end-to-end encrypted HD
          video and voice calls, and keep chatting with people nearby even when
          there is no internet at all.
        </Reveal>

        <Reveal
          as="div"
          className="mt-40px flex w-full flex-col items-center gap-12px sm:w-auto sm:flex-row"
        >
          <DownloadButton variant="hero" />

          <Button
            asChild
            variant="ghost"
            /*
              `py-0 leading-100`: the primitive's default size adds `py-2` inside
              this fixed `h-14`, which shrank the box the label centres in.
            */
            className="h-14 min-h-[44px] w-full justify-center rounded-pill bg-transparent px-24px py-0 text-16 font-medium leading-100 text-ink-high underline-offset-4 transition-standard hover:bg-transparent hover:underline dark:bg-transparent dark:hover:bg-transparent sm:w-auto"
          >
            <a href="#features" onClick={navigateToSection("features")}>
              See everything it does
            </a>
          </Button>
        </Reveal>

        <Reveal
          as="p"
          className={cn(
            MEASURE_CLASSES[500],
            "mt-20px text-14 leading-140 text-ink-secondary",
          )}
        >
          {/* Gated on PRO_LAUNCHED: while the app's `pro_enabled` flag is off
              the site says nothing about tiers, only that the download itself
              is free. */}
          {PRO_LAUNCHED
            ? `${PLATFORM_LABEL} — free to download, with an optional Pro subscription inside the app.`
            : `${PLATFORM_LABEL} — free to download from Google Play.`}
        </Reveal>
      </RevealGroup>

      {/* Fanned-out two-phone showcase: both phones clearly visible.
          On mobile only the chat phone renders; the call phone appears from bp810. */}
      <RevealGroup
        as="div"
        className="relative mt-64px flex justify-center bp810:gap-0"
        style={{ perspective: "1400px" }}
      >
        {/* Front phone (chat) — slightly left of center, tilted left */}
        <Reveal
          as="div"
          className="relative z-10 w-full max-w-[320px] bp810:-mr-16px bp810:max-w-[340px]"
        >
          <ScreenshotMockup
            lightSrc="/website-screenshots/chat_screen_light.jpeg"
            darkSrc="/website-screenshots/chat_screen_dark.jpeg"
            alt={CHAT_SCREEN.altText}
            size="lg"
            tilt3d
            tiltDirection="left"
          />

          {/* Floating chips — positioned over the frame, outside role="img" */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <FloatingChip
              className="absolute left-8px top-64px bp810:-left-32px"
              icon={ARCADE_ICON ? <ARCADE_ICON className="h-4 w-4" /> : null}
            >
              {CHAT_SCREEN.streakLabel}
            </FloatingChip>

            <FloatingChip
              className="absolute bottom-80px right-8px bp810:-right-32px"
              icon={
                ENCRYPTION_ICON ? <ENCRYPTION_ICON className="h-4 w-4" /> : null
              }
            >
              {CALL_SCREEN.encryptionLabel}
            </FloatingChip>
          </div>
        </Reveal>

        {/* Rear phone (call) — right of center, tilted right, pushed down.
            Not rendered below Breakpoint_Small (Req 9.6). */}
        <Reveal
          as="div"
          className="pointer-events-none z-0 hidden w-full max-w-[280px] translate-y-48px bp810:-ml-16px bp810:block"
        >
          <ScreenshotMockup
            lightSrc="/website-screenshots/call_screen_both_light_dark.jpeg"
            alt={CALL_SCREEN.altText}
            size="md"
            tilt3d
            tiltDirection="right"
          />
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
