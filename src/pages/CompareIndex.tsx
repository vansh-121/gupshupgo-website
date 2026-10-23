import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Cpu,
  Flame,
  Gamepad2,
  Lock,
  Minus,
  Radio,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserX,
  X,
} from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import SEOHead from "@/components/seo/SEOHead";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogCard from "@/components/blog/BlogCard";
import {
  COMPARE_HIGHLIGHTS,
  COMPARISONS,
  COMPARISONS_LAST_UPDATED,
  EXCLUSIVE_SUPERPOWERS,
} from "@/data/comparisons";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SITE_URL } from "@/config/app";
import { cn } from "@/lib/utils";

/**
 * `/compare` — index for the "GupShupGo vs X" comparison pages.
 */

const jsonLd: Array<Record<string, unknown>> = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GupShupGo comparisons",
    itemListElement: COMPARISONS.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: comparison.h1,
      url: `${SITE_URL}/${comparison.slug}`,
    })),
  },
];

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

export default function CompareIndex() {
  // Grab the comparison blog posts for cross-promotion
  const comparisonPosts = BLOG_POSTS.filter(
    (p) =>
      p.slug === "gupshupgo-vs-whatsapp-honest-comparison" ||
      p.slug === "gupshupgo-vs-telegram-encryption-offline-comparison",
  );

  return (
    <SiteShell>
      <SEOHead
        title="Compare GupShupGo vs WhatsApp & Telegram — Private Messengers"
        description="See how GupShupGo compares with WhatsApp and Telegram: offline Bluetooth mesh chat, end-to-end encryption by default, a built-in AI assistant, price, and open-source status."
        canonicalPath="/compare"
        ogImage="/og-image.jpg"
        keywords={[
          "WhatsApp alternative",
          "Telegram alternative",
          "private messaging app comparison",
          "offline messaging app",
          "encrypted messaging app",
        ]}
        jsonLd={jsonLd}
      />

      <div className="mx-auto w-full max-w-[1240px] px-20px py-60px bp810:px-36px bp810:py-96px">
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-12px mb-32px">
          <BlogBreadcrumbs items={[{ label: "Compare" }]} />
          <Link
            to="/"
            className="inline-flex items-center gap-6px text-13 font-medium text-ink-secondary transition-standard hover:text-ink-high"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-20px">
          <div className="inline-flex items-center gap-8px rounded-full bg-brand/10 px-12px py-6px text-12 font-medium text-brand dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Product Showdowns &amp; Architectural Deep Dives</span>
          </div>

          <h1 className="text-h2-xs font-semibold tracking-tight text-ink-high bp480:text-h2-sm bp810:text-h2">
            How GupShupGo compares
          </h1>

          <p className={cn(MEASURE_CLASSES[644], "text-18 leading-150 text-ink-secondary")}>
            GupShupGo is a private, end-to-end encrypted messenger for Android with one thing nothing
            mainstream offers: it keeps working with no internet at all, chatting with nearby people
            over an offline Bluetooth mesh. Here is how it stacks up against the apps you already know.
          </p>

          <div className="flex flex-wrap items-center gap-16px pt-4px text-13 text-ink-secondary">
            <span className="inline-flex items-center gap-6px rounded-full bg-layer-1 px-12px py-4px shadow-hairline-12">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              Verified claim audit
            </span>
            <span>Last updated: {COMPARISONS_LAST_UPDATED}</span>
          </div>
        </div>

        {/* Hero Banner Visual Showcase */}
        <div className="mt-40px relative overflow-hidden rounded-24 border border-hairline-12 bg-layer-1 shadow-hairline-12-elevated">
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-layer-2 sm:aspect-[21/9]">
            <img
              src="/blog/gupshupgo-vs-whatsapp-cover.jpg"
              alt="Messaging app comparison showdown"
              className="h-full w-full object-cover brightness-[0.9] dark:brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-24px sm:p-36px">
              <span className="inline-block w-fit rounded-full bg-brand px-12px py-4px text-11 font-bold uppercase tracking-wider text-white shadow-elevation">
                The Next Generation of Private Messaging
              </span>
              <h2 className="mt-8px text-20 sm:text-24 font-bold text-white max-w-xl leading-tight">
                Offline Bluetooth Mesh + Default Signal Encryption
              </h2>
              <p className="mt-6px text-13 sm:text-14 text-white/80 max-w-lg hidden sm:block">
                Tired of losing connection in crowded stadiums, flights, and outages? Compare how GupShupGo gives you uninterrupted, mathematical privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Creative Head-to-Head Product Cards */}
        <section aria-labelledby="full-comparisons-heading" className="mt-56px">
          <div className="flex items-center justify-between mb-24px">
            <div>
              <h2
                id="full-comparisons-heading"
                className="text-25 font-semibold leading-120 text-ink-high"
              >
                Full comparisons
              </h2>
              <p className="mt-4px text-14 text-ink-secondary">
                Select an app to explore the full side-by-side technical breakdown
              </p>
            </div>
          </div>

          <div className="grid gap-24px md:grid-cols-2">
            {COMPARISONS.map((comparison) => {
              const isWhatsApp = comparison.competitor === "WhatsApp";
              const brandColor = isWhatsApp ? "#25D366" : "#229ED9";
              const coverImg =
                comparison.coverImage ||
                (isWhatsApp
                  ? "/blog/gupshupgo-vs-whatsapp-cover.jpg"
                  : "/blog/gupshupgo-vs-telegram-cover.jpg");

              return (
                <div
                  key={comparison.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-24 bg-layer-1 border border-hairline-12 shadow-hairline-12-elevated transition-standard hover:shadow-elevation hover:border-brand/40"
                >
                  {/* Card Cover Header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-layer-2">
                    <img
                      src={coverImg}
                      alt={comparison.h1}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    <div className="absolute top-16px left-16px flex items-center gap-8px">
                      <span
                        className="inline-flex items-center gap-6px rounded-full px-12px py-4px text-12 font-semibold text-white shadow-elevation"
                        style={{ backgroundColor: brandColor }}
                      >
                        <img
                          src={isWhatsApp ? "/icons/whatsapp.svg" : "/icons/telegram.svg"}
                          alt=""
                          className="h-4 w-4 rounded-sm object-contain"
                        />
                        vs {comparison.competitor}
                      </span>
                      <span className="rounded-full bg-brand px-12px py-4px text-12 font-semibold text-white shadow-elevation">
                        Offline Ready
                      </span>
                    </div>

                    <div className="absolute bottom-16px left-16px right-16px">
                      <h3 className="text-20 font-bold text-white drop-shadow-sm">
                        {comparison.h1}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-24px space-y-20px">
                    <p className="text-14 leading-150 text-ink-secondary">
                      {comparison.intro}
                    </p>

                    {/* Highlights Preview */}
                    <div className="rounded-12 bg-layer-0/60 p-16px border border-hairline-12 space-y-8px">
                      <span className="text-12 font-semibold uppercase tracking-wider text-ink-high block">
                        Key Differences
                      </span>
                      <div className="flex items-center gap-8px text-13 text-ink-high">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>GupShupGo works with NO internet or SIM via mesh</span>
                      </div>
                      <div className="flex items-center gap-8px text-13 text-ink-high">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>PIN-protected Secret Vault</span>
                      </div>
                      <div className="flex items-center gap-8px text-13 text-ink-secondary">
                        <X className="h-4 w-4 shrink-0 text-ink-secondary/70" />
                        <span>{comparison.competitor} strictly requires active internet</span>
                      </div>
                    </div>

                    {/* Accessible CTA Link matching test regex /GupShupGo vs <competitor>/i */}
                    <Link
                      to={`/${comparison.slug}`}
                      className="inline-flex w-full items-center justify-center gap-8px rounded-pill bg-brand px-20px py-12px text-14 font-semibold text-white shadow-elevation transition-standard hover:bg-brand-dark dark:bg-brand dark:hover:brightness-95"
                    >
                      <span>GupShupGo vs {comparison.competitor}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Three-way highlight table */}
        <section aria-labelledby="highlights-heading" className="mt-64px">
          <div className="mb-20px">
            <h2
              id="highlights-heading"
              className="text-25 font-semibold leading-120 text-ink-high"
            >
              At a glance
            </h2>
            <p className="mt-4px text-14 text-ink-secondary">
              Direct three-way comparison of privacy, networking, and platform reach
            </p>
          </div>

          <div className="overflow-x-auto rounded-16 bg-layer-1 shadow-hairline-12-elevated border border-hairline-12">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <caption className="sr-only">
                Headline comparison of GupShupGo, WhatsApp, and Telegram.
              </caption>
              <thead className="bg-layer-2 text-13 font-semibold uppercase tracking-wider text-ink-high border-b border-hairline-12">
                <tr>
                  <th scope="col" className="px-20px py-16px w-[34%]">
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-20px py-16px w-[24%] bg-brand/10 border-x border-brand/20 text-brand dark:text-emerald-400 font-bold"
                  >
                    <div className="flex items-center gap-8px">
                      <img src="/app_icon.png" alt="" className="h-5 w-5 rounded-md" />
                      <span>GupShupGo</span>
                    </div>
                  </th>
                  <th scope="col" className="px-20px py-16px w-[21%]">
                    <div className="flex items-center gap-8px">
                      <img
                        src="/icons/whatsapp.svg"
                        alt=""
                        className="h-5 w-5 rounded-md object-contain"
                      />
                      <span>WhatsApp</span>
                    </div>
                  </th>
                  <th scope="col" className="px-20px py-16px w-[21%]">
                    <div className="flex items-center gap-8px">
                      <img
                        src="/icons/telegram.svg"
                        alt=""
                        className="h-5 w-5 rounded-md object-contain"
                      />
                      <span>Telegram</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-12">
                {COMPARE_HIGHLIGHTS.map((row) => (
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
                    <Cell value={row.whatsapp} />
                    <Cell value={row.telegram} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Standout Features WhatsApp & Telegram Lack */}
        <section aria-labelledby="exclusive-superpowers-heading" className="mt-64px">
          <div className="mb-24px">
            <div className="inline-flex items-center gap-6px text-12 font-semibold uppercase tracking-wider text-brand dark:text-emerald-400 mb-8px">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>GupShupGo Exclusives</span>
            </div>
            <h2
              id="exclusive-superpowers-heading"
              className="text-25 font-semibold leading-120 text-ink-high"
            >
              Features WhatsApp &amp; Telegram Don't Have
            </h2>
            <p className="mt-4px text-14 text-ink-secondary">
              Capabilities engineered directly into GupShupGo that mainstream messaging apps simply lack
            </p>
          </div>

          <div className="grid gap-24px sm:grid-cols-2 lg:grid-cols-3">
            {EXCLUSIVE_SUPERPOWERS.map((feature) => {
              const Icon =
                feature.id === "mesh"
                  ? Radio
                  : feature.id === "streaks"
                  ? Flame
                  : feature.id === "anonymous"
                  ? UserX
                  : feature.id === "vault"
                  ? Lock
                  : feature.id === "crypto-isolate"
                  ? Cpu
                  : feature.id === "arcade"
                  ? Gamepad2
                  : Smartphone;

              return (
                <div
                  key={feature.id}
                  className="group flex flex-col justify-between rounded-24 bg-layer-1 border border-hairline-12 p-28px shadow-hairline-12-elevated transition-standard hover:border-brand/40 hover:shadow-elevation"
                >
                  <div className="space-y-16px">
                    <div className="flex items-center justify-between gap-12px">
                      <div className="flex h-12 w-12 items-center justify-center rounded-14 bg-brand/10 text-brand dark:text-emerald-400 shrink-0">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="rounded-full bg-layer-2 px-12px py-4px text-11 font-semibold tracking-wide text-brand dark:text-emerald-400 border border-hairline-12">
                        {feature.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-19 font-bold text-ink-high leading-snug">
                        {feature.title}
                      </h3>
                      <p className="mt-4px text-13 font-medium text-brand dark:text-emerald-400">
                        {feature.subtitle}
                      </p>
                    </div>

                    <p className="text-14 leading-160 text-ink-secondary">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-24px pt-16px border-t border-hairline-12 space-y-10px text-13">
                    <div className="flex items-start gap-8px text-ink-secondary">
                      <X className="h-4 w-4 shrink-0 text-red-500/80 mt-[2px]" aria-hidden="true" />
                      <span className="leading-snug">
                        <strong className="font-semibold text-ink-high">WhatsApp:</strong> {feature.whatsappStatus}
                      </span>
                    </div>
                    <div className="flex items-start gap-8px text-ink-secondary">
                      <X className="h-4 w-4 shrink-0 text-red-500/80 mt-[2px]" aria-hidden="true" />
                      <span className="leading-snug">
                        <strong className="font-semibold text-ink-high">Telegram:</strong> {feature.telegramStatus}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cross-Promotion: In-Depth Comparison Articles From the Blog */}
        {comparisonPosts.length > 0 && (
          <section aria-labelledby="blog-comparisons-heading" className="mt-64px">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12px mb-24px">
              <div>
                <div className="inline-flex items-center gap-6px text-12 font-semibold uppercase tracking-wider text-brand dark:text-emerald-400 mb-8px">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>From Our Blog</span>
                </div>
                <h2
                  id="blog-comparisons-heading"
                  className="text-25 font-semibold text-ink-high"
                >
                  In-Depth Editorial Guides
                </h2>
                <p className="mt-4px text-14 text-ink-secondary">
                  Thorough architectural investigations and cryptographic teardowns written by our engineering team
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-6px text-14 font-semibold text-brand transition-colors hover:text-brand-dark dark:text-emerald-400"
              >
                <span>View all articles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-24px sm:grid-cols-2">
              {comparisonPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <nav
          aria-label="Related pages"
          className="mt-56px rounded-16 bg-layer-1 p-24px shadow-hairline-12 border border-hairline-12"
        >
          <h2 className="mb-14px text-18 font-semibold leading-130 text-ink-high">
            Keep exploring
          </h2>
          <ul className="flex flex-wrap gap-x-20px gap-y-10px text-14 leading-140">
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
            <li>
              <Link
                to="/faq"
                className="text-ink-accent font-medium underline underline-offset-2 transition-standard hover:no-underline"
              >
                FAQ
              </Link>
            </li>
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

        {/* Bottom CTA */}
        <BlogCTA
          title="The Private Chat App That Works Even Without Internet"
          description="Download GupShupGo free on Google Play — Signal-protocol encryption on by default, a built-in Gup AI assistant, and offline Bluetooth mesh chat when there's no signal."
        />
      </div>
    </SiteShell>
  );
}
