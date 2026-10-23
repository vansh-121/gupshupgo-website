import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Flame,
  Gamepad2,
  Lock,
  Radio,
  Sparkles,
  UserX,
  X,
} from "lucide-react";

import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { bandFor } from "@/data/sections";
import { EXCLUSIVE_SUPERPOWERS } from "@/data/comparisons";

const SHOWDOWN_ROWS = [
  {
    feature: "Works with No Internet (Offline Mesh)",
    gupshupgo: "Yes — Bluetooth & local Wi-Fi mesh",
    whatsapp: "No — Strictly requires active internet",
    telegram: "No — Strictly requires active internet",
  },
  {
    feature: "Chat Streaks & Friend Bonds",
    gupshupgo: "Yes — Daily streaks with 24h restore",
    whatsapp: "No — Not available",
    telegram: "No — Not available",
  },
  {
    feature: "Anonymous Stranger Chat",
    gupshupgo: "Yes — 1-on-1 chats with blurred media",
    whatsapp: "No — Phone numbers always exposed",
    telegram: "No — Phone required, no random matching",
  },
  {
    feature: "PIN-Protected Secret Vault",
    gupshupgo: "Yes — Separate secret PIN & anti-screenshot",
    whatsapp: "No — Basic phone screen lock only",
    telegram: "No — Basic app passcode only",
  },
  {
    feature: "In-Chat Games & Arcade",
    gupshupgo: "Yes — Built-in mini-games & rewards",
    whatsapp: "No — Not available",
    telegram: "Partial — External web bots only",
  },
  {
    feature: "Silky-Smooth Speed (Zero Lag)",
    gupshupgo: "Yes — Heavy tasks run in background",
    whatsapp: "Standard — Can lag on heavy media",
    telegram: "Standard — Can lag on heavy media",
  },
  {
    feature: "Automatic Privacy & Encryption",
    gupshupgo: "Yes — Chats, calls & status by default",
    whatsapp: "Yes — Personal chats & calls",
    telegram: "No — Secret Chats only (not default)",
  },
];

export default function CompareSection() {
  return (
    <Section id="compare" band={bandFor("compare")}>
      <div className="space-y-48px">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-20px min-[680px]:flex-row min-[680px]:items-end">
          <div className="space-y-12px max-w-[680px]">
            <div className="inline-flex items-center gap-8px rounded-pill bg-pill-soft px-12px py-5px text-12 font-medium text-pill-soft-fg shadow-hairline-12">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              <span>Product Showdown</span>
            </div>

            <SectionHeading sectionId="compare">
              How GupShupGo compares
            </SectionHeading>

            <p className="text-16 leading-150 text-ink-secondary sm:text-18">
              See why mobile users switch to GupShupGo for offline freedom, chat streaks, hidden vaults, and uncompromising privacy.
            </p>
          </div>

          <Link
            to="/compare"
            className="hidden min-[680px]:inline-flex min-h-[44px] shrink-0 items-center gap-8px rounded-pill bg-layer-2 px-20px text-14 font-medium text-ink-high shadow-hairline-12 hover:bg-brand hover:text-white transition-standard"
          >
            <span>Full matrix &amp; deep dives</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* High-Impact Comparison Table */}
        <div className="overflow-x-auto rounded-20 bg-layer-1 border border-hairline-12 shadow-hairline-12-elevated">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <caption className="sr-only">
              Quick comparison of GupShupGo, WhatsApp, and Telegram key features.
            </caption>
            <thead className="bg-layer-2 text-13 font-semibold uppercase tracking-wider text-ink-high border-b border-hairline-12">
              <tr>
                <th scope="col" className="px-20px py-16px w-[34%]">
                  Capability
                </th>
                <th
                  scope="col"
                  className="px-20px py-16px w-[26%] bg-brand/10 border-x border-brand/20 text-brand dark:text-emerald-400 font-bold"
                >
                  <div className="flex items-center gap-8px">
                    <img src="/app_icon.png" alt="" className="h-5 w-5 rounded-md shrink-0" />
                    <span>GupShupGo</span>
                  </div>
                </th>
                <th scope="col" className="px-20px py-16px w-[20%]">
                  <div className="flex items-center gap-8px">
                    <img src="/icons/whatsapp.svg" alt="" className="h-5 w-5 rounded-md object-contain shrink-0" />
                    <span>WhatsApp</span>
                  </div>
                </th>
                <th scope="col" className="px-20px py-16px w-[20%]">
                  <div className="flex items-center gap-8px">
                    <img src="/icons/telegram.svg" alt="" className="h-5 w-5 rounded-md object-contain shrink-0" />
                    <span>Telegram</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-12 text-13">
              {SHOWDOWN_ROWS.map((row) => (
                <tr key={row.feature} className="transition-standard hover:bg-layer-0/60">
                  <th scope="row" className="px-20px py-16px font-medium text-ink-high">
                    {row.feature}
                  </th>
                  <td className="px-20px py-16px bg-brand/[0.04] border-x border-brand/20 dark:bg-brand/[0.08] text-ink-high font-medium">
                    <div className="flex items-center gap-8px">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                      </span>
                      <span>{row.gupshupgo}</span>
                    </div>
                  </td>
                  <td className="px-20px py-16px text-ink-secondary">
                    <div className="flex items-center gap-8px">
                      {row.whatsapp.startsWith("Yes") ? (
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500/80 dark:text-red-400">
                          <X className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                        </span>
                      )}
                      <span>{row.whatsapp}</span>
                    </div>
                  </td>
                  <td className="px-20px py-16px text-ink-secondary">
                    <div className="flex items-center gap-8px">
                      {row.telegram.startsWith("Yes") ? (
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500/80 dark:text-red-400">
                          <X className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                        </span>
                      )}
                      <span>{row.telegram}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Standout Features WhatsApp & Telegram Lack */}
        <div>
          <div className="mb-20px">
            <h3 className="text-18 font-bold text-ink-high sm:text-20">
              Features WhatsApp &amp; Telegram Don't Have
            </h3>
            <p className="mt-4px text-14 text-ink-secondary">
              Capabilities built directly into GupShupGo that mainstream chat apps simply do not offer.
            </p>
          </div>

          <div className="grid gap-16px sm:grid-cols-2 lg:grid-cols-4">
            {EXCLUSIVE_SUPERPOWERS.slice(0, 4).map((feature) => {
              const Icon =
                feature.id === "mesh"
                  ? Radio
                  : feature.id === "streaks"
                  ? Flame
                  : feature.id === "anonymous"
                  ? UserX
                  : Lock;

              return (
                <div
                  key={feature.id}
                  className="flex flex-col justify-between rounded-20 bg-layer-1 border border-hairline-12 p-20px shadow-sm transition-standard hover:border-brand/40 hover:shadow-elevation"
                >
                  <div className="space-y-12px">
                    <div className="flex items-center justify-between gap-8px">
                      <div className="flex h-10 w-10 items-center justify-center rounded-12 bg-brand/10 text-brand dark:text-emerald-400 shrink-0">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="rounded-full bg-layer-2 px-10px py-3px text-11 font-semibold text-brand dark:text-emerald-400 border border-hairline-12">
                        {feature.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-16 font-bold text-ink-high">
                        {feature.title}
                      </h4>
                      <p className="mt-2px text-12 font-medium text-brand dark:text-emerald-400">
                        {feature.subtitle}
                      </p>
                    </div>

                    <p className="text-13 leading-150 text-ink-secondary">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-16px pt-12px border-t border-hairline-12 space-y-6px text-12 text-ink-secondary">
                    <div className="flex items-center gap-6px">
                      <X className="h-3.5 w-3.5 text-red-500/80 shrink-0" aria-hidden="true" />
                      <span><strong>WhatsApp:</strong> Not available</span>
                    </div>
                    <div className="flex items-center gap-6px">
                      <X className="h-3.5 w-3.5 text-red-500/80 shrink-0" aria-hidden="true" />
                      <span><strong>Telegram:</strong> Not available</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Deep Dive Showcase Action Cards */}
        <div className="grid gap-20px sm:grid-cols-2">
          {/* Card 1: GupShupGo vs WhatsApp */}
          <Link
            to="/gupshupgo-vs-whatsapp"
            className="group relative flex flex-col justify-between overflow-hidden rounded-24 border border-hairline-12 bg-layer-1 shadow-hairline-12-elevated transition-standard hover:border-emerald-500/50 hover:shadow-elevation"
          >
            {/* Visual Header Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-layer-2">
              <img
                src="/blog/gupshupgo-vs-whatsapp-cover.jpg"
                alt="GupShupGo vs WhatsApp privacy showdown"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-16px left-16px flex items-center gap-8px">
                <span className="inline-flex items-center gap-6px rounded-full bg-[#25D366] px-12px py-5px text-12 font-semibold text-white shadow-elevation backdrop-blur-md">
                  <img
                    src="/icons/whatsapp.svg"
                    alt=""
                    className="h-4 w-4 rounded-sm object-contain"
                  />
                  vs WhatsApp
                </span>
                <span className="rounded-full bg-brand px-12px py-5px text-12 font-semibold text-white shadow-elevation">
                  Offline Mesh
                </span>
              </div>

              <div className="absolute bottom-16px left-16px right-16px">
                <h3 className="text-19 font-bold text-white drop-shadow-sm sm:text-21">
                  GupShupGo vs WhatsApp
                </h3>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col justify-between p-20px space-y-16px">
              <p className="text-14 leading-150 text-ink-secondary">
                Both encrypt chats end-to-end, but GupShupGo keeps you chatting nearby with zero internet or SIM, adds secret PIN locks, and is 100% open source.
              </p>
              <div className="inline-flex items-center gap-8px text-14 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                <span>Read in-depth WhatsApp comparison</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: GupShupGo vs Telegram */}
          <Link
            to="/gupshupgo-vs-telegram"
            className="group relative flex flex-col justify-between overflow-hidden rounded-24 border border-hairline-12 bg-layer-1 shadow-hairline-12-elevated transition-standard hover:border-sky-500/50 hover:shadow-elevation"
          >
            {/* Visual Header Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-layer-2">
              <img
                src="/blog/gupshupgo-vs-telegram-cover.jpg"
                alt="GupShupGo vs Telegram encryption architecture comparison"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-16px left-16px flex items-center gap-8px">
                <span className="inline-flex items-center gap-6px rounded-full bg-[#229ED9] px-12px py-5px text-12 font-semibold text-white shadow-elevation backdrop-blur-md">
                  <img
                    src="/icons/telegram.svg"
                    alt=""
                    className="h-4 w-4 rounded-sm object-contain"
                  />
                  vs Telegram
                </span>
                <span className="rounded-full bg-brand px-12px py-5px text-12 font-semibold text-white shadow-elevation">
                  Privacy by Default
                </span>
              </div>

              <div className="absolute bottom-16px left-16px right-16px">
                <h3 className="text-19 font-bold text-white drop-shadow-sm sm:text-21">
                  GupShupGo vs Telegram
                </h3>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col justify-between p-20px space-y-16px">
              <p className="text-14 leading-150 text-ink-secondary">
                Telegram stores regular chats on company cloud servers. GupShupGo protects every conversation by default and works during network outages.
              </p>
              <div className="inline-flex items-center gap-8px text-14 font-semibold text-sky-600 dark:text-sky-400 group-hover:underline">
                <span>Read in-depth Telegram comparison</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile View All Link */}
        <div className="flex justify-center min-[680px]:hidden pt-8px">
          <Link
            to="/compare"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-8px rounded-pill bg-layer-2 px-20px text-14 font-medium text-ink-high shadow-hairline-12 hover:bg-brand hover:text-white transition-standard"
          >
            <span>Full matrix &amp; deep dives</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
