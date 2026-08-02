import { useEffect, useRef, useState } from "react";
import ScreenshotMockup from "@/components/DeviceMockup/ScreenshotMockup";
import { Bluetooth, Lock, Radio, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";

import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MESH_STEPS, type MeshStep, type MeshStepVisualId } from "@/data/meshSteps";
import { bandFor } from "@/data/sections";
import { cn } from "@/lib/utils";

/**
 * Offline nearby mesh chat deep dive, restyled as the Sticky_Step_Section
 * (Requirement 12).
 *
 * This is the ONE section that gets the treatment (Req 12.1). Offline relaying
 * is actually sequential — discover, encrypt, relay, arrive — so numbered steps
 * carry information rather than decoration.
 *
 * Layout (Req 12.2, 12.5, 12.6):
 *
 * - At and above Breakpoint_Small, two columns: the visual column is
 *   `position: sticky` and the step column scrolls past it.
 * - Below Breakpoint_Small, one unpinned column with each step's visual sitting
 *   directly under that step.
 * - Under Reduced_Motion_Preference the pinned column is never rendered at all:
 *   one unpinned column, every step visual present, nothing swaps.
 *
 * Active step tracking (Req 12.4) is a single `IntersectionObserver` over the
 * step elements with a band-shaped root margin, so the crossing test is done by
 * the browser off the main thread instead of by a scroll handler measuring
 * layout every frame.
 *
 * Phrase contract: messages travel between nearby devices over Bluetooth and
 * Wi-Fi Direct with no internet connection, and relaying is multi-hop.
 *
 * The band comes from `bandFor("mesh")` — derived from this section's position in
 * `VISIBLE_SECTIONS`, so it always differs from its neighbours (Req 3.8).
 */

const VISUAL_ICONS: Record<MeshStepVisualId, LucideIcon> = {
  discover: Bluetooth,
  encrypt: Lock,
  relay: Radio,
  delivered: ShieldCheck,
};

/** How much of the four-device chain the diagram lights up, per step. */
const VISUAL_PROGRESS: Record<MeshStepVisualId, number> = {
  discover: 1,
  encrypt: 1,
  relay: 3,
  delivered: 4,
};

const DEVICE_COUNT = 4;

/**
 * Abstract token-only diagram for a step. Marked `aria-hidden` — the step title
 * and description carry all of the meaning (Req 12.3), and the diagram itself is
 * built from layer / hairline / pill tokens so it themes in both modes with no
 * image asset.
 */
function MeshStepVisual({ step, className }: { step: MeshStep; className?: string }) {
  const Icon = VISUAL_ICONS[step.visualId];
  const lit = VISUAL_PROGRESS[step.visualId];

  return (
    <div
      aria-hidden="true"
      data-testid="mesh-step-visual"
      data-visual={step.visualId}
      className={cn(
        "rounded-8 bg-layer-0 p-24px shadow-hairline-12-elevated bp810:p-32px",
        className,
      )}
    >
      <span className="inline-flex items-center gap-8px rounded-pill bg-pill-mid px-12px py-4px text-13 font-medium leading-120 text-pill-mid-fg">
        <Icon className="h-4 w-4" />
        {step.visualCaption}
      </span>

      <div className="mt-24px flex items-center">
        {Array.from({ length: DEVICE_COUNT }).map((_, index) => (
          <div key={index} className="flex flex-1 items-center last:flex-none">
            <span
              className={cn(
                "flex h-40px w-40px shrink-0 items-center justify-center rounded-full transition-standard",
                index < lit
                  ? "bg-brand text-white"
                  : "bg-layer-2 text-ink-secondary shadow-hairline-12",
              )}
            >
              <Smartphone className="h-4 w-4" />
            </span>
            {index < DEVICE_COUNT - 1 ? (
              <span
                className={cn(
                  "mx-8px h-2px flex-1 rounded-pill transition-standard",
                  index < lit - 1 ? "bg-brand" : "bg-layer-3",
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-24px space-y-8px">
        <span className="block h-8px w-full rounded-pill bg-layer-2" />
        <span className="block h-8px w-2/3 rounded-pill bg-layer-2" />
      </div>
    </div>
  );
}

export default function MeshChatSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  /** Pinning is a motion behaviour: it is off entirely under `reduce`. */
  const pinned = !prefersReducedMotion;

  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!pinned) return;
    if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      return;
    }

    const nodes = stepRefs.current.filter((node): node is HTMLLIElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const raw = (entry.target as HTMLElement).dataset.stepIndex;
          const index = raw === undefined ? Number.NaN : Number(raw);
          if (Number.isNaN(index)) return;
          setActiveIndex(index);
        });
      },
      // A band across the middle of the viewport: a step becomes active as it
      // crosses the centre line.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pinned]);

  const activeStep = MESH_STEPS[activeIndex] ?? MESH_STEPS[0];

  return (
    <Section id="mesh" band={bandFor("mesh")}>
      <Reveal className={MEASURE_CLASSES[644]}>
        <SectionHeading sectionId="mesh">Chat with no internet at all</SectionHeading>
        <p className="mt-20px text-lead text-ink-secondary">
          When the network drops, GupShupGo keeps going. Your messages travel between nearby
          devices over Bluetooth and Wi-Fi Direct with no internet connection, hopping from phone
          to phone through multi-hop relaying until they arrive.
        </p>
      </Reveal>

      <div
        className={cn(
          "mt-48px grid grid-cols-1 gap-32px",
          pinned && "bp810:grid-cols-2 bp810:items-start bp810:gap-48px",
        )}
      >
        {pinned ? (
          <div
            data-testid="mesh-pinned-visual"
            className="hidden bp810:sticky bp810:top-112px bp810:block"
          >
            {/* Real offline chat screenshot above the step diagram */}
            <ScreenshotMockup
              lightSrc="/website-screenshots/offline_chat_light.jpeg"
              darkSrc="/website-screenshots/offline_chat_dark.jpeg"
              alt="GupShupGo offline nearby chat screen showing messages delivered over Bluetooth and Wi-Fi Direct with no internet connection."
              size="md"
              tilt3d
              tiltDirection="left"
              className="mx-auto mb-32px max-w-[280px]"
            />
            <MeshStepVisual step={activeStep} />
          </div>
        ) : null}

        {/* Offline chat screenshot on mobile / reduced motion — shown once above the steps */}
        {!pinned && (
          <div className="flex justify-center">
            <ScreenshotMockup
              lightSrc="/website-screenshots/offline_chat_light.jpeg"
              darkSrc="/website-screenshots/offline_chat_dark.jpeg"
              alt="GupShupGo offline nearby chat screen showing messages delivered over Bluetooth and Wi-Fi Direct with no internet connection."
              size="md"
              tilt3d={false}
              className="mx-auto max-w-[280px]"
            />
          </div>
        )}

        <ol className="space-y-48px">
          {MESH_STEPS.map((step, index) => {
            const isActive = pinned && index === activeIndex;

            return (
              <li
                key={step.id}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step-index={index}
                data-active={isActive ? "true" : "false"}
                className={cn(MEASURE_CLASSES[500], "transition-standard")}
              >
                <span
                  className={cn(
                    "block text-33 font-medium leading-100 transition-standard",
                    isActive ? "text-ink-accent" : "text-ink-secondary",
                  )}
                >
                  {String(step.ordinal).padStart(2, "0")}
                </span>
                {/* Req 12.7: one level below the section's own h2. Emitted
                    through SectionHeading so the level stays a prop and the
                    tree-walking heading test keeps working. */}
                <SectionHeading
                  sectionId={`mesh-step-${step.id}`}
                  level={3}
                  className={cn(
                    "mt-12px transition-standard",
                    isActive || !pinned ? "text-ink-high" : "text-ink-secondary",
                  )}
                >
                  {step.title}
                </SectionHeading>
                <p className="mt-12px text-16 leading-140 text-ink-secondary">
                  {step.description}
                </p>

                {/* Unpinned visual: the only one below Breakpoint_Small
                    (Req 12.5) and the only one at all under reduced motion
                    (Req 12.6). */}
                <MeshStepVisual
                  step={step}
                  className={cn("mt-20px", pinned && "bp810:hidden")}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
