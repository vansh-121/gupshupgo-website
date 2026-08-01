import Section, { MEASURE_CLASSES } from "@/components/Section";
import DownloadButton from "@/components/DownloadButton";
import DeviceMockup from "@/components/DeviceMockup/DeviceMockup";
import FloatingChip from "@/components/DeviceMockup/FloatingChip";
import Pill from "@/components/Pill";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { FEATURES } from "@/data/features";
import {
  getMockupScreen,
  type MockupCallScreen,
  type MockupChatScreen,
} from "@/data/mockupScreens";
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
 * Mockups (Req 9.2, 9.3): two frames whose bounding boxes overlap
 * horizontally. The forward frame is `size="lg"`, centred, `z-10`; the rear
 * frame is `size="md"`, shifted left past the forward frame's left edge, pushed
 * down 40px and rotated, at `z-0`. Below Breakpoint_Small the rear frame is not
 * rendered at all, so the composition can never exceed the viewport width
 * (Req 9.6, 7.10) — a translated, rotated 320px frame is exactly the thing that
 * would force a horizontal scrollbar at 320px.
 *
 * Chips (Req 9.4, 9.5): both chip labels come from `src/data/` —
 * `chat.streakLabel` and `call.encryptionLabel` — with their icons taken from
 * the matching `FEATURES` entries. They sit inside the forward frame's
 * horizontal bounds on small viewports and only break the edge from
 * Breakpoint_Small up, again to keep the section overflow-free.
 *
 * Req 9.8: nothing here waits on a network request. Copy is inline or from
 * `src/data/`, the mockups are CSS-rendered, and there is no `<img>` and no
 * fetch — so the heading, lead and CTA paint from the entry bundle alone. This
 * component is imported eagerly by `Index.tsx`.
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

      <RevealGroup as="div" className="relative mt-64px flex justify-center">
        {/* Rear frame: offset left, pushed down, rotated, behind (z-0).
            Not rendered below Breakpoint_Small (Req 9.6). */}
        <Reveal
          as="div"
          className="pointer-events-none absolute left-1/2 top-0 z-0 hidden w-full max-w-[320px] -translate-x-[92%] translate-y-40px -rotate-6 bp810:block"
        >
          <DeviceMockup screen={CALL_SCREEN} size="md" />
        </Reveal>

        {/* Forward frame: centred, above (z-10), carries both chips. */}
        <Reveal as="div" className="relative z-10 w-full max-w-[380px]">
          <DeviceMockup
            screen={CHAT_SCREEN}
            size="lg"
            chips={
              <>
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
              </>
            }
          />
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
