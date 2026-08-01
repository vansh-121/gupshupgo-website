import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { PRO_BENEFITS } from "@/data/proBenefits";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Pro subscription section (design §3.7, Requirements 6.1–6.5, 11.4).
 *
 * The eight rows come from `@/data/proBenefits` so the comparison and the data
 * module cannot drift apart (Req 6.1, 6.2). Plan availability and the in-app
 * purchase path are stated as static copy (Req 6.3, 6.4), and no currency
 * symbol or monetary amount appears anywhere in this file (Req 6.5).
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
    <Section id="pro" background="surface-alt">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading sectionId="pro">GupShupGo Pro</SectionHeading>
        <p className="mt-4 text-body-lg text-ink-high">{INTRO}</p>
      </div>

      <div className="mt-12">
        {isMobile ? <ProBenefitList /> : <ProBenefitTable />}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-body text-ink-high">{PLAN_COPY}</p>
    </Section>
  );
}

/** `md` and up: the comparison as a semantic table. */
function ProBenefitTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{CAPTION}</caption>
        <thead>
          <tr className="border-b border-hairline">
            <th scope="col" className="px-6 py-4 text-body-sm font-semibold text-ink-high">
              Feature
            </th>
            <th scope="col" className="px-6 py-4 text-body-sm font-semibold text-ink-high">
              Free
            </th>
            <th scope="col" className="px-6 py-4 text-body-sm font-semibold text-brand-dark">
              Pro
            </th>
          </tr>
        </thead>
        <tbody>
          {PRO_BENEFITS.map((benefit) => (
            <tr
              key={benefit.id}
              data-benefit={benefit.id}
              className="border-b border-hairline-divider last:border-b-0"
            >
              <th
                scope="row"
                className="px-6 py-4 align-top text-body font-semibold text-ink-high"
              >
                {benefit.label}
              </th>
              <td className="px-6 py-4 align-top text-body text-ink-mid">{benefit.free}</td>
              <td className="px-6 py-4 align-top text-body text-ink-high">{benefit.pro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Below `md`: the same content as a stacked definition list, one card per benefit. */
function ProBenefitList() {
  return (
    <div className="space-y-4">
      <p className="sr-only">{CAPTION}</p>
      {PRO_BENEFITS.map((benefit) => (
        <div
          key={benefit.id}
          data-benefit={benefit.id}
          className="rounded-xl border border-hairline bg-surface p-5"
        >
          <h3 className="text-h3 font-semibold text-ink-high">{benefit.label}</h3>
          <dl className="mt-3 space-y-3">
            <div>
              <dt className="text-caption font-semibold uppercase tracking-wide text-ink-low">
                Free
              </dt>
              <dd className="mt-1 text-body text-ink-mid">{benefit.free}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold uppercase tracking-wide text-brand-dark">
                Pro
              </dt>
              <dd className="mt-1 text-body text-ink-high">{benefit.pro}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
