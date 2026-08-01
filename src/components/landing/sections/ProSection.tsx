import Section, { MEASURE_CLASSES } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Pill from "@/components/Pill";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { PRO_BENEFITS } from "@/data/proBenefits";
import { bandFor } from "@/data/sections";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * Pro subscription section (design §3.7, Requirements 6.1–6.5, 11.4).
 *
 * The eight rows come from `@/data/proBenefits` so the comparison and the data
 * module cannot drift apart (Req 6.1, 6.2). Plan availability and the in-app
 * purchase path are stated as static copy (Req 6.3, 6.4), and no currency
 * symbol or monetary amount appears anywhere in this file (Req 6.5).
 *
 * Gating: this section is rendered by `Index.tsx` only when `PRO_LAUNCHED`
 * (`src/config/app.ts`) is true. While the app's `pro_enabled` Remote Config
 * flag is false the module still builds into its own chunk but is never fetched,
 * so the content below is dormant rather than deleted.
 *
 * The band comes from `bandFor("pro")`, which returns `tint` — the one
 * Tinted_Band the page is allowed (Req 3.10), and Pro is the brand-emphasis
 * moment that earns it. Its neighbours take position-derived bands, so adjacent
 * sections differ (Req 3.8). Because the comparison surface sits on the tint band it uses
 * `bg-layer-0` to read as raised against it, and its pills take the `strong`
 * tint, one step above the band (docs/TOKENS.md).
 *
 * Layout switches on a real render branch rather than on CSS: at `md` and up a
 * semantic `<table>` with a `<caption>`, `scope="col"` column headers and
 * `scope="row"` benefit labels; below `md` a stacked definition list, one card
 * per benefit, so a single column never relies on classes that would strip the
 * table's row/column pairing from assistive technology (Req 11.4, 12.x).
 */

const CAPTION = "GupShupGo free plan compared with GupShupGo Pro across eight benefits.";

const INTRO =
  "Everything below is free to use as listed. Pro lifts the limits and unlocks the extras.";

const PLAN_COPY =
  "Pro is available as a monthly plan or a yearly plan. Subscriptions are purchased inside the GupShupGo Android app, under Settings.";

export default function ProSection() {
  const isMobile = useIsMobile();

  return (
    <Section id="pro" band={bandFor("pro")}>
      <div className={cn(MEASURE_CLASSES[644], "mx-auto text-center")}>
        <SectionHeading sectionId="pro">GupShupGo Pro</SectionHeading>
        <p className="mt-20px text-lead text-ink-high">{INTRO}</p>
      </div>

      <div className="mt-48px">{isMobile ? <ProBenefitList /> : <ProBenefitTable />}</div>

      <p
        className={cn(
          MEASURE_CLASSES[644],
          "mx-auto mt-32px text-center text-16 leading-140 text-ink-high",
        )}
      >
        {PLAN_COPY}
      </p>
    </Section>
  );
}

/** `md` and up: the comparison as a semantic table. */
function ProBenefitTable() {
  return (
    <div className="overflow-hidden rounded-8 bg-layer-0 shadow-hairline-12">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{CAPTION}</caption>
        <thead>
          {/*
           * `border-b` here and on the body rows is a table STRUCTURAL rule, not
           * a decorative boundary: with `border-collapse: collapse` a
           * `box-shadow` on an internal table box is not painted, so
           * `shadow-hairline-12` cannot draw a row rule. Req 4.3 targets
           * decorative boundaries, and the colour is still the Req 4.1 hairline
           * alpha token. Every non-structural edge in this section is a Hairline
           * inset shadow.
           */}
          <tr className="border-b border-hairline-12">
            <th scope="col" className="px-24px py-16px text-14 font-medium leading-140 text-ink-high">
              Feature
            </th>
            <th scope="col" className="px-24px py-16px text-14 font-medium leading-140 text-ink-high">
              Free
            </th>
            <th scope="col" className="px-24px py-16px text-14 font-medium leading-140 text-ink-high">
              <Pill tint="strong">Pro</Pill>
            </th>
          </tr>
        </thead>
        <RevealGroup as="tbody">
          {PRO_BENEFITS.map((benefit) => (
            <Reveal
              as="tr"
              key={benefit.id}
              data-benefit={benefit.id}
              className="border-b border-hairline-12 transition-standard last:border-b-0 hover:bg-layer-1"
            >
              <th
                scope="row"
                className="px-24px py-16px align-top text-16 font-medium leading-140 text-ink-high"
              >
                {benefit.label}
              </th>
              <td className="px-24px py-16px align-top text-16 leading-140 text-ink-secondary">
                {benefit.free}
              </td>
              <td className="px-24px py-16px align-top text-16 leading-140 text-ink-high">
                {benefit.pro}
              </td>
            </Reveal>
          ))}
        </RevealGroup>
      </table>
    </div>
  );
}

/** Below `md`: the same content as a stacked definition list, one card per benefit. */
function ProBenefitList() {
  return (
    <RevealGroup className="space-y-16px">
      <p className="sr-only">{CAPTION}</p>
      {PRO_BENEFITS.map((benefit) => (
        <Reveal
          key={benefit.id}
          data-benefit={benefit.id}
          className="rounded-8 bg-layer-0 p-20px shadow-hairline-12"
        >
          <h3 className="text-25 font-medium leading-120 text-ink-high">{benefit.label}</h3>
          <dl className="mt-12px space-y-12px">
            <div>
              <dt className="text-12 font-medium uppercase leading-130 text-ink-secondary">Free</dt>
              <dd className="mt-4px text-16 leading-140 text-ink-secondary">{benefit.free}</dd>
            </div>
            <div>
              <dt className="text-12 font-medium uppercase leading-130 text-ink-accent">Pro</dt>
              <dd className="mt-4px text-16 leading-140 text-ink-high">{benefit.pro}</dd>
            </div>
          </dl>
        </Reveal>
      ))}
    </RevealGroup>
  );
}
