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
 *
 * Responsive composition: the fanned two-phone pair is kept at EVERY width —
 * it is the showcase, and splitting it into two separate stacked screens on a
 * phone loses the whole effect.
 *
 * It survives on a 320px screen because the composition is sized in
 * percentages rather than pixels: the group takes the column width, the front
 * frame takes 56% of it, the rear 46%, and they overlap by 3%. Those ratios are
 * fixed, so the pair scales as one object and the overlap stays proportional
 * instead of the second frame being pushed out of the container. The `max-w`
 * on the group is what stops it growing past its intended desktop size, and
 * `ScreenshotMockup`'s own `max-width` ramp is only a ceiling — below it the
 * frames are fluid, so nothing needs a per-breakpoint width here.
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
            // Three-step display ramp: 42px on small phones, 57px from bp480,
            // 68px from Breakpoint_Small. See the `-xs` note in tailwind.config.ts.
            "mt-24px text-h1-xs font-medium text-ink-high bp480:text-h1-sm bp810:text-h1",
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

      {/* Fanned two-phone showcase, held together at every width by the
          percentage sizing described in the file header. */}
      <RevealGroup
        as="div"
        className="relative mx-auto mt-48px flex w-full max-w-[600px] items-start justify-center bp810:mt-64px"
        style={{ perspective: "1400px" }}
      >
        {/* Front phone (chat) — left of centre, tilted left, overlapping its
            sibling by 3% of the group width. */}
        <Reveal
          as="div"
          className="relative z-10 -mr-[3%] w-[56%] max-w-[340px]"
        >

          <ScreenshotMockup
            lightSrc="/website-screenshots/chat_screen_light.jpeg"
            darkSrc="/website-screenshots/chat_screen_dark.jpeg"
            alt={CHAT_SCREEN.altText}
            size="lg"
            tilt3d
            tiltDirection="left"
          />

          {/* Floating chips — positioned over the frame, outside role="img".

              Vertical placement is a percentage so it tracks the frame's height
              as the pair scales (`top`/`bottom` percentages resolve against the
              containing block's height, unlike the percentage margins above).

              The chips also step DOWN in size below Breakpoint_Small: at the
              desktop 14px/12px-padding size a chip is about two thirds the width
              of the scaled-down frame, which reads as a label covering the
              screenshot rather than floating over it. They only break outside
              the frame's edge from bp810, where the section gutter has room for
              the overhang. */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <FloatingChip
              className={cn(
                "absolute left-4px top-[9%] gap-4px whitespace-nowrap px-8px py-4px text-11",
                "bp480:text-12",
                "bp810:-left-32px bp810:gap-8px bp810:px-12px bp810:py-8px bp810:text-14",
              )}
              icon={
                ARCADE_ICON ? (
                  <ARCADE_ICON className="h-3 w-3 bp810:h-4 bp810:w-4" />
                ) : null
              }
            >
              {CHAT_SCREEN.streakLabel}
            </FloatingChip>

            <FloatingChip
              className={cn(
                "absolute bottom-[11%] right-4px gap-4px whitespace-nowrap px-8px py-4px text-11",
                "bp480:text-12",
                "bp810:-right-32px bp810:gap-8px bp810:px-12px bp810:py-8px bp810:text-14",
              )}
              icon={
                ENCRYPTION_ICON ? (
                  <ENCRYPTION_ICON className="h-3 w-3 bp810:h-4 bp810:w-4" />
                ) : null
              }
            >
              {CALL_SCREEN.encryptionLabel}
            </FloatingChip>
          </div>


        </Reveal>

        {/* Rear phone (call) — right of centre, tilted right and dropped so it
            reads as the back layer. `mt-[7%]` is a percentage margin, which
            resolves against the GROUP'S WIDTH (percentage margins always use
            the containing block's inline size, never its height), so the drop
            scales with the composition instead of staying a fixed 48px on a
            320px screen.

            `pointer-events-none` at every width: it always sits under the front
            frame here, so it must never intercept that frame's hover. */}

        <Reveal
          as="div"
          className="pointer-events-none z-0 mt-[8%] w-[46%] max-w-[280px]"

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
