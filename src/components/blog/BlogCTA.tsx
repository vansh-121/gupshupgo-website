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
      className="my-48px overflow-hidden rounded-24 bg-layer-1 p-28px shadow-hairline-12-elevated sm:p-40px relative"
    >
      {/* Decorative gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl dark:bg-brand/20"
      />

      <div className="relative z-10 flex flex-col gap-24px md:flex-row md:items-center md:justify-between">
        <div className="max-w-[560px] space-y-12px">
          <div className="inline-flex items-center gap-8px rounded-pill bg-pill-mid px-12px py-4px text-12 font-medium text-pill-mid-fg">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Built for Android 8.0+</span>
          </div>

          <h3 className="text-21 font-medium leading-130 text-ink-high sm:text-24">
            {title}
          </h3>

          <p className="text-15 leading-140 text-ink-secondary">
            {description}
          </p>

          <ul className="flex flex-wrap gap-x-20px gap-y-8px pt-8px text-13 text-ink-high">
            <li className="inline-flex items-center gap-6px">
              <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Signal E2EE Protocol</span>
            </li>
            <li className="inline-flex items-center gap-6px">
              <Radio className="h-4 w-4 text-blue-500" aria-hidden="true" />
              <span>Offline Mesh Chat</span>
            </li>
            <li className="inline-flex items-center gap-6px">
              <span className="flex h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              <span>Argon2id Encrypted Vault</span>
            </li>
          </ul>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-12px sm:items-center">
          <div className="flex items-center gap-12px">
            <img
              src="/app_icon.png"
              alt="GupShupGo App Icon"
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="h-56px w-56px rounded-16 shadow-elevation"
            />
            <div className="text-left">
              <p className="text-16 font-medium text-ink-high">GupShupGo</p>
              <p className="text-12 text-ink-secondary">Free on Google Play</p>
            </div>
          </div>

          <DownloadButton variant="hero" className="w-full sm:w-auto">
            Download on Google Play
          </DownloadButton>
        </div>
      </div>
    </aside>
  );
}
