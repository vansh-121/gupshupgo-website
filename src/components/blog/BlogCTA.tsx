import { DownloadButton } from "@/components/DownloadButton";
import { ShieldCheck, Radio, Sparkles } from "lucide-react";

interface BlogCTAProps {
  title?: string;
  description?: string;
  variant?: "inline" | "card";
}

export default function BlogCTA({
  title = "Experience Private Messaging Without Limits",
  description = "Get end-to-end encrypted chats, offline mesh messaging via Bluetooth, and HD calling on Android. No phone number sharing in anonymous mode, zero tracking.",
  variant = "card",
}: BlogCTAProps) {
  if (variant === "inline") {
    return (
      <aside
        aria-label="Download callout"
        className="my-36px flex flex-col items-start justify-between gap-16px rounded-16 bg-layer-1 p-24px shadow-hairline-12 sm:flex-row sm:items-center"
      >
        <div className="space-y-4px">
          <p className="text-16 font-medium text-ink-high">{title}</p>
          <p className="text-14 text-ink-secondary">{description}</p>
        </div>
        <DownloadButton variant="header" className="shrink-0 whitespace-nowrap">
          Get GupShupGo Free
        </DownloadButton>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Download GupShupGo"
      className="my-56px overflow-hidden rounded-24 border border-hairline-12 bg-layer-1 p-28px shadow-hairline-12-elevated sm:p-40px relative"
    >
      {/* Decorative gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl dark:bg-brand/20"
      />

      <div className="relative z-10 flex flex-col gap-28px md:flex-row md:items-center md:justify-between">
        <div className="max-w-[580px] space-y-16px">
          <div className="inline-flex items-center gap-8px rounded-pill bg-pill-mid px-12px py-5px text-12 font-medium text-pill-mid-fg shadow-hairline-12">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Built for Android 8.0+</span>
          </div>

          <h3 className="text-24 font-medium leading-125 text-ink-high sm:text-28">
            {title}
          </h3>

          <p className="text-15 leading-150 text-ink-secondary sm:text-16">
            {description}
          </p>

          <ul className="flex flex-wrap gap-x-12px gap-y-10px pt-6px text-13 text-ink-high">
            <li className="inline-flex items-center gap-6px rounded-pill bg-layer-2 px-12px py-6px shadow-hairline-12">
              <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Signal E2EE Protocol</span>
            </li>
            <li className="inline-flex items-center gap-6px rounded-pill bg-layer-2 px-12px py-6px shadow-hairline-12">
              <Radio className="h-4 w-4 text-blue-500" aria-hidden="true" />
              <span>Offline Mesh Chat</span>
            </li>
            <li className="inline-flex items-center gap-6px rounded-pill bg-layer-2 px-12px py-6px shadow-hairline-12">
              <span className="flex h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              <span>Argon2id Encrypted Vault</span>
            </li>
          </ul>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-16px sm:items-center">
          <div className="flex items-center gap-14px">
            <img
              src="/app_icon.png"
              alt="GupShupGo App Icon"
              width={60}
              height={60}
              loading="lazy"
              decoding="async"
              className="h-60px w-60px rounded-16 shadow-elevation ring-1 ring-hairline-12"
            />
            <div className="text-left">
              <p className="text-17 font-medium text-ink-high">GupShupGo</p>
              <p className="text-13 text-ink-secondary">Free on Google Play</p>
            </div>
          </div>

          <DownloadButton variant="hero" className="w-full sm:w-auto shadow-elevation">
            Download on Google Play
          </DownloadButton>
        </div>
      </div>
    </aside>
  );
}
