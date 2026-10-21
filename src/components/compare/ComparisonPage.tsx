import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Minus,
  Radio,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogCTA from "@/components/blog/BlogCTA";
import {
  comparisonJsonLd,
  COMPARISONS,
  COMPARISONS_LAST_UPDATED,
  type Comparison,
} from "@/data/comparisons";
import { cn } from "@/lib/utils";

/**
 * Competitor Brand Icon SVG helper
 */
function CompetitorIcon({ name }: { name: string }) {
  if (name.toLowerCase().includes("whatsapp")) {
    return (
      <svg
        className="h-7 w-7 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.33 7.34 9.09 7.34 8.89 7.79C8.68 8.24 8.09 9.38 8.09 10.74C8.09 12.1 9.08 13.4 9.22 13.59C9.36 13.78 11.16 16.56 13.92 17.75C14.58 18.03 15.09 18.2 15.49 18.33C16.15 18.54 16.75 18.51 17.22 18.44C17.75 18.36 18.85 17.78 19.08 17.13C19.31 16.48 19.31 15.93 19.24 15.81C19.17 15.69 18.98 15.62 18.7 15.48C18.42 15.34 17.06 14.67 16.81 14.58C16.56 14.49 16.38 14.44 16.19 14.72C16 15.01 15.47 15.63 15.31 15.81C15.15 16 14.99 16.02 14.71 15.88C14.43 15.74 13.25 15.35 11.85 14.1C10.76 13.13 10.02 11.93 9.81 11.57C9.6 11.21 9.79 11.01 9.93 10.87C10.06 10.74 10.22 10.53 10.36 10.36C10.5 10.19 10.55 10.08 10.64 9.9C10.73 9.72 10.69 9.56 10.62 9.42C10.55 9.28 9.99 7.91 9.76 7.36C9.54 6.83 9.31 6.9 9.15 6.89C9 6.89 8.84 6.89 8.68 6.89" />
      </svg>
    );
  }
  // Telegram Paper Plane Icon
  return (
    <svg
      className="h-7 w-7 fill-current"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
    </svg>
  );
}

/** Modern table cell with colored badge indicator */
function Cell({ value, emphasise }: { value: string; emphasise?: boolean }) {
  const isYes = /^Yes/i.test(value);
  const isNo = /^No\b/i.test(value);

  return (
    <td
      className={cn(
        "px-20px py-16px align-top text-14 leading-140 transition-colors",
        emphasise
          ? "bg-brand/[0.04] text-ink-high font-medium border-x border-brand/10 dark:bg-brand/[0.06]"
          : "text-ink-secondary",
      )}
    >
      <span className="inline-flex items-start gap-10px">
        {isYes ? (
          <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
          </span>
        ) : isNo ? (
          <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500/80 dark:text-red-400">
            <X className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
          </span>
        ) : (
          <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-layer-2 text-ink-secondary/70">
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}
        <span className="pt-[1px]">{value}</span>
      </span>
    </td>
  );
}

export default function ComparisonPage({ comparison }: { comparison: Comparison }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sibling = COMPARISONS.find((item) => item.slug !== comparison.slug);

  const competitorBrandColor = comparison.competitorBrandColor || "#25D366";

  return (
    <SiteShell>
      <SEOHead
        title={comparison.title}
        description={comparison.metaDescription}
        canonicalPath={`/${comparison.slug}`}
        ogImage={comparison.coverImage || "/og-image.jpg"}
        keywords={[...comparison.keywords]}
        jsonLd={comparisonJsonLd(comparison)}
      />

      <div
        className={cn(
          "mx-auto w-full px-20px py-60px bp810:px-36px bp810:py-96px",
          MEASURE_CLASSES[809],
        )}
      >
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-12px mb-32px">
          <BlogBreadcrumbs
            items={[{ label: "Compare", to: "/compare" }, { label: `vs ${comparison.competitor}` }]}
          />
          <Link
            to="/compare"
            className="inline-flex items-center gap-6px text-13 font-medium text-ink-secondary transition-standard hover:text-ink-high"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All comparisons
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-20px">
          <div className="inline-flex items-center gap-8px rounded-full bg-brand/10 px-12px py-6px text-12 font-medium text-brand dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Head-to-Head Comparison</span>
          </div>

          <h1 className="text-h2-xs font-semibold tracking-tight text-ink-high bp480:text-h2-sm bp810:text-h2">
            {comparison.h1}
          </h1>

          <p className={cn(MEASURE_CLASSES[644], "text-18 leading-150 text-ink-secondary")}>
            {comparison.intro}
          </p>

          <div className="flex flex-wrap items-center gap-16px pt-4px text-13 text-ink-secondary">
            <span className="inline-flex items-center gap-6px rounded-full bg-layer-1 px-12px py-4px shadow-hairline-12">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              Verified claim audit
            </span>
            <span>Last updated: {COMPARISONS_LAST_UPDATED}</span>
          </div>
        </div>

        {/* Visual Matchup Card (GupShupGo vs Competitor) */}
        <section aria-label="Product Matchup" className="mt-40px">
          <div className="relative overflow-hidden rounded-24 bg-layer-1 p-24px sm:p-36px shadow-hairline-12-elevated">
            {/* Ambient Background Glow */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-15 blur-3xl"
              style={{ backgroundColor: competitorBrandColor }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand/20 opacity-20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-24px md:grid-cols-[1fr_auto_1fr] md:items-center">
              {/* Left Column: GupShupGo */}
              <div className="flex flex-col justify-between rounded-16 border border-brand/20 bg-brand/[0.04] p-24px transition-standard hover:border-brand/40 dark:bg-brand/[0.08]">
                <div className="flex items-center gap-16px mb-16px">
                  <img
                    src="/app_icon.png"
                    alt="GupShupGo App Icon"
                    className="h-14 w-14 rounded-16 shadow-elevation shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-8px">
                      <h2 className="text-20 font-semibold text-ink-high">GupShupGo</h2>
                      <span className="rounded-full bg-brand px-8px py-2px text-11 font-medium text-white shadow-sm">
                        Offline Mesh
                      </span>
                    </div>
                    <p className="text-13 text-ink-secondary">
                      Signal protocol + Bluetooth mesh
                    </p>
                  </div>
                </div>

                <ul className="space-y-8px text-13 text-ink-high">
                  <li className="flex items-center gap-8px">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>Works offline with Bluetooth &amp; Wi-Fi Direct mesh</span>
                  </li>
                  <li className="flex items-center gap-8px">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>Signal-protocol encryption on by default</span>
                  </li>
                  <li className="flex items-center gap-8px">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>PIN-protected on-device Vault (Argon2id)</span>
                  </li>
                  <li className="flex items-center gap-8px">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>100% Open source client code (MIT)</span>
                  </li>
                </ul>
              </div>

              {/* Center "VS" Badge */}
              <div className="flex justify-center md:flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-layer-2 font-bold text-14 text-ink-high shadow-elevation border border-hairline-12">
                  VS
                </div>
              </div>

              {/* Right Column: Competitor */}
              <div className="flex flex-col justify-between rounded-16 border border-hairline-12 bg-layer-0/60 p-24px transition-standard hover:border-hairline-24">
                <div className="flex items-center gap-16px mb-16px">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-16 text-white shadow-elevation"
                    style={{ backgroundColor: competitorBrandColor }}
                  >
                    <CompetitorIcon name={comparison.competitor} />
                  </div>
                  <div>
                    <h2 className="text-20 font-semibold text-ink-high">
                      {comparison.competitor}
                    </h2>
                    <p className="text-13 text-ink-secondary">
                      {comparison.competitorTagline || "Cloud-first messaging app"}
                    </p>
                  </div>
                </div>

                <ul className="space-y-8px text-13 text-ink-secondary">
                  <li className="flex items-center gap-8px">
                    <X className="h-4 w-4 shrink-0 text-ink-secondary/70" />
                    <span>No offline mesh (strictly requires internet)</span>
                  </li>
                  <li className="flex items-center gap-8px">
                    {comparison.competitor === "WhatsApp" ? (
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-ink-secondary/70" />
                    )}
                    <span>
                      {comparison.competitor === "WhatsApp"
                        ? "E2E encrypted chats & calls by default"
                        : "Cloud chats by default (Secret Chats opt-in)"}
                    </span>
                  </li>
                  <li className="flex items-center gap-8px">
                    <X className="h-4 w-4 shrink-0 text-ink-secondary/70" />
                    <span>No comparable on-device zero-knowledge vault</span>
                  </li>
                  <li className="flex items-center gap-8px">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>Available on Android, iOS, web &amp; desktop</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Photo / Hero Graphic preview */}
            {comparison.coverImage && (
              <div className="mt-28px overflow-hidden rounded-16 border border-hairline-12 bg-layer-2 shadow-sm">
                <img
                  src={comparison.coverImage}
                  alt={`GupShupGo vs ${comparison.competitor} preview`}
                  loading="lazy"
                  className="h-48 sm:h-64 w-full object-cover brightness-[0.95] dark:brightness-[0.85]"
                />
              </div>
            )}
          </div>
        </section>

        {/* Modern Feature Comparison Table */}
        <section aria-labelledby="comparison-table-heading" className="mt-56px">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12px mb-20px">
            <div>
              <h2
                id="comparison-table-heading"
                className="text-25 font-semibold leading-120 text-ink-high"
              >
                Feature comparison
              </h2>
              <p className="mt-4px text-14 text-ink-secondary">
                Detailed side-by-side technical and security capabilities
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-16 bg-layer-1 shadow-hairline-12-elevated border border-hairline-12">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                A feature-by-feature comparison of GupShupGo and {comparison.competitor}.
              </caption>
              <thead className="bg-layer-2 text-13 font-semibold uppercase tracking-wider text-ink-high border-b border-hairline-12">
                <tr>
                  <th scope="col" className="px-20px py-16px w-[40%]">
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-20px py-16px w-[30%] bg-brand/10 border-x border-brand/20 text-brand dark:text-emerald-400 font-bold"
                  >
                    <div className="flex items-center gap-8px">
                      <img src="/app_icon.png" alt="" className="h-5 w-5 rounded-md" />
                      <span>GupShupGo</span>
                    </div>
                  </th>
                  <th scope="col" className="px-20px py-16px w-[30%]">
                    <div className="flex items-center gap-8px">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: competitorBrandColor }}
                        aria-hidden="true"
                      />
                      <span>{comparison.competitor}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-12">
                {comparison.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="transition-standard hover:bg-layer-0/60"
                  >
                    <th
                      scope="row"
                      className="px-20px py-16px text-left align-top text-14 font-medium leading-140 text-ink-high"
                    >
                      {row.label}
                    </th>
                    <Cell value={row.gupshupgo} emphasise />
                    <Cell value={row.competitor} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Feature Breakdown with Real Screenshots */}
        {comparison.visualFeatures && comparison.visualFeatures.length > 0 && (
          <section aria-labelledby="visual-showcase-heading" className="mt-64px">
            <div className="text-center max-w-2xl mx-auto mb-36px">
              <div className="inline-flex items-center gap-6px rounded-full bg-brand/10 px-12px py-4px text-12 font-medium text-brand dark:text-emerald-400 mb-12px">
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Real-World Experience</span>
              </div>
              <h2
                id="visual-showcase-heading"
                className="text-25 font-semibold text-ink-high bp810:text-32"
              >
                Why GupShupGo Stands Out in Action
              </h2>
              <p className="mt-8px text-15 text-ink-secondary">
                See how GupShupGo’s unique features deliver privacy and offline survivability that cloud messengers can't match.
              </p>
            </div>

            <div className="space-y-32px">
              {comparison.visualFeatures.map((feature, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div
                    key={feature.title}
                    className={cn(
                      "grid gap-24px rounded-24 bg-layer-1 p-24px sm:p-36px shadow-hairline-12-elevated border border-hairline-12 lg:grid-cols-2 lg:items-center",
                      isEven && "lg:grid-flow-dense",
                    )}
                  >
                    {/* Visual Screenshot Mockup */}
                    <div
                      className={cn(
                        "relative flex justify-center overflow-hidden rounded-16 bg-layer-0 p-16px shadow-sm",
                        isEven && "lg:col-start-2",
                      )}
                    >
                      <img
                        src={feature.image}
                        alt={feature.imageAlt}
                        loading="lazy"
                        className="max-h-[380px] w-auto rounded-12 object-contain shadow-elevation transition-transform duration-500 hover:scale-102"
                      />
                    </div>

                    {/* Text Details */}
                    <div className={cn("space-y-16px", isEven && "lg:col-start-1")}>
                      <span className="inline-block rounded-pill bg-brand/10 px-12px py-4px text-12 font-semibold text-brand dark:text-emerald-400">
                        {feature.badge}
                      </span>
                      <h3 className="text-22 font-semibold text-ink-high">
                        {feature.title}
                      </h3>
                      <p className="text-14 font-medium text-brand dark:text-emerald-400">
                        {feature.tagline}
                      </p>
                      <p className="text-15 leading-150 text-ink-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Narrative Section */}
        <section aria-labelledby="comparison-narrative-heading" className="mt-64px">
          <div className="rounded-24 bg-layer-1 p-24px sm:p-36px shadow-hairline-12 border border-hairline-12">
            <h2
              id="comparison-narrative-heading"
              className="mb-20px text-25 font-semibold leading-120 text-ink-high"
            >
              How they really compare
            </h2>
            <div
              className={cn(
                MEASURE_CLASSES[644],
                "space-y-16px text-16 leading-160 text-ink-secondary",
              )}
            >
              {comparison.narrative.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Deep-Dive Companion Blog Article Card */}
        {comparison.companionBlogSlug && (
          <section aria-label="Companion Blog Guide" className="mt-40px">
            <Link
              to={`/blog/${comparison.companionBlogSlug}`}
              className="group block overflow-hidden rounded-20 border border-brand/25 bg-gradient-to-r from-brand/10 via-layer-1 to-layer-1 p-24px sm:p-32px shadow-hairline-12 transition-standard hover:shadow-elevation hover:border-brand/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16px">
                <div className="space-y-8px">
                  <div className="inline-flex items-center gap-6px text-12 font-semibold uppercase tracking-wider text-brand dark:text-emerald-400">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>In-Depth Editorial Analysis</span>
                  </div>
                  <h3 className="text-18 font-semibold text-ink-high sm:text-20 group-hover:text-brand transition-colors">
                    Read the Full Technical Guide on Our Blog
                  </h3>
                  <p className="text-14 text-ink-secondary max-w-xl">
                    Dive into our full breakdown of architecture, offline mesh algorithms, and cryptographic verification.
                  </p>
                </div>
                <div className="inline-flex items-center gap-8px text-14 font-semibold text-brand dark:text-emerald-400 shrink-0">
                  <span>Read article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* FAQ Section */}
        <section aria-labelledby="comparison-faq-heading" className="mt-56px">
          <h2
            id="comparison-faq-heading"
            className="mb-20px text-25 font-semibold leading-120 text-ink-high"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-12px">
            {comparison.faq.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.q}
                  className="rounded-12 bg-layer-1 p-16px sm:p-20px shadow-hairline-12 border border-hairline-12 transition-standard"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-12px text-left text-16 font-medium leading-140 text-ink-high"
                    >
                      <span>{item.q}</span>
                      {isOpen ? (
                        <ChevronUp
                          className="h-4 w-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDown
                          className="h-4 w-4 shrink-0 text-ink-secondary"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </h3>
                  <div
                    className={cn(
                      "overflow-hidden text-14 leading-150 text-ink-secondary transition-standard",
                      isOpen
                        ? "mt-12px border-t border-hairline-12 pt-12px"
                        : "hidden",
                    )}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Internal links */}
        <nav
          aria-label="Related pages"
          className="mt-48px rounded-16 bg-layer-1 p-24px shadow-hairline-12 border border-hairline-12"
        >
          <h2 className="mb-14px text-18 font-semibold leading-130 text-ink-high">
            Keep exploring
          </h2>
          <ul className="flex flex-wrap gap-x-20px gap-y-10px text-14 leading-140">
            <li>
              <Link
                to="/"
                className="text-ink-accent font-medium underline underline-offset-2 transition-standard hover:no-underline"
              >
                GupShupGo home
              </Link>
            </li>
            <li>
              <Link
                to="/#features"
                className="text-ink-accent font-medium underline underline-offset-2 transition-standard hover:no-underline"
              >
                All features
              </Link>
            </li>
            <li>
              <Link
                to="/#mesh"
                className="text-ink-accent font-medium underline underline-offset-2 transition-standard hover:no-underline"
              >
                How offline chat works
              </Link>
            </li>
            {sibling ? (
              <li>
                <Link
                  to={`/${sibling.slug}`}
                  className="text-ink-accent font-medium underline underline-offset-2 transition-standard hover:no-underline"
                >
                  GupShupGo vs {sibling.competitor}
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                to="/blog"
                className="text-ink-accent font-medium underline underline-offset-2 transition-standard hover:no-underline"
              >
                Blog &amp; guides
              </Link>
            </li>
          </ul>
        </nav>

        {/* Final Conversion CTA */}
        <BlogCTA
          title="Try the private messenger that works offline"
          description="Download GupShupGo free on Google Play — Signal-protocol encryption on by default, a built-in Gup AI assistant, and offline Bluetooth mesh chat when there's no signal."
        />
      </div>
    </SiteShell>
  );
}
