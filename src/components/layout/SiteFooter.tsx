import { Link } from "react-router-dom";
import { PLATFORM_LABEL } from "@/config/app";

/**
 * Site footer (design §3.6, §6.7).
 *
 * Renders the `contentinfo` landmark shared by every route through
 * `SiteShell`. Column titles are `<h2>` elements inside the labelled
 * landmark, which keeps them out of the `main` heading outline while still
 * giving each link group an accessible name (design §6.7).
 *
 * Requirements:
 *  - 3.7 links to every Legal_Page except the not-found route
 *  - 7.6 states that GupShupGo is available on Android
 *  - 12.8 / 14.3 / 14.4 the decorative logo repeat is hidden from assistive
 *    technology and carries explicit dimensions plus `loading="lazy"`
 *
 * Deliberately contains no repository, open-source, or licence reference
 * (Requirement 3.4).
 */

interface FooterLink {
  readonly to: string;
  readonly label: string;
}

/** Legal_Page routes, matching the route table in `App.tsx` (Requirement 3.7). */
const LEGAL_LINKS: readonly FooterLink[] = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/delete-account", label: "Delete Your Account" },
] as const;

const linkClasses =
  "text-body-sm text-ink-high underline-offset-4 transition-colors hover:text-brand hover:underline";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="border-t border-hairline bg-surface-alt text-ink-high"
    >
      <div className="mx-auto w-full max-w-[1400px] px-gutter py-section">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand column — the logo repeat here is decorative (12.8, 14.3, 14.4). */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/app_icon.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="h-8 w-8 rounded-lg"
              />
              <span className="text-h3 font-semibold text-ink-high">GupShupGo</span>
            </div>
            <p className="max-w-xs text-body-sm text-ink-high">
              Private messaging, HD calls, and offline chat, built for everyday
              conversations.
            </p>
          </div>

          {/* Legal column (Requirement 3.7) */}
          <div className="flex flex-col gap-3">
            <h2 className="text-body-sm font-semibold uppercase tracking-wide text-ink-high">
              Legal
            </h2>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability column (Requirement 7.6) */}
          <div className="flex flex-col gap-3">
            <h2 className="text-body-sm font-semibold uppercase tracking-wide text-ink-high">
              Get the app
            </h2>
            <p className="text-body-sm text-ink-high">{PLATFORM_LABEL}</p>
            <p className="text-body-sm text-ink-high">
              Download GupShupGo from Google Play and sign in with your phone
              number to start chatting.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-hairline-divider pt-6">
          <p className="text-caption text-ink-high">
            © {year} GupShupGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
