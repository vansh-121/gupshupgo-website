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
 * Nova pass: the footer is not a `Section`, so the band and the rhythm are
 * applied here directly. It takes **band 2** (`bg-layer-2`), reading as the
 * raised closing block of the page, plus a `shadow-hairline-12` inset
 * hairline that reads as a top rule at full bleed — so the boundary against
 * whatever band the last section carries is always visible (Req 4.2, 4.3). The
 * container mirrors `Section`: 1320px outer, 1199px inner, `px-20px
 * bp810:px-36px`, `py-64px bp810:py-128px` (Req 7.1, 7.3, 7.5). Secondary copy
 * is `text-ink-secondary`; `ink-mid` is DeviceMockup-only (docs/TOKENS.md).
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

/** Editorial and resource links for SEO discovery. */
const RESOURCE_LINKS: readonly FooterLink[] = [
  { to: "/blog", label: "Blog & Guides" },
  { to: "/blog/how-to-text-without-internet-offline-mesh-messaging", label: "Offline Mesh Chat" },
  { to: "/blog/signal-protocol-explained-messaging-privacy-guide", label: "Signal E2EE Guide" },
  { to: "/blog/psychology-of-chat-streaks-daily-bonds", label: "Chat Bonds & Streaks" },
  { to: "/blog/anonymous-chat-online-safety-guide", label: "Anonymous Chat Safety" },
] as const;

const linkClasses =
  "text-14 leading-140 text-ink-high underline-offset-4 transition-standard hover:text-ink-accent hover:underline";

const columnTitleClasses = "text-16 font-medium leading-140 text-ink-high";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="bg-layer-2 shadow-hairline-12">
      <div className="mx-auto w-full max-w-[1320px] px-20px py-64px bp810:px-36px bp810:py-128px">
        <div className="mx-auto w-full max-w-[1199px]">
          <div className="grid gap-40px sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column — the logo repeat here is decorative (12.8, 14.3, 14.4). */}
            <div className="flex flex-col gap-12px">
              <div className="flex items-center gap-10px">
                <img
                  src="/app_icon.png"
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className="h-32px w-32px rounded-8"
                />
                <span className="text-21 font-medium leading-130 text-ink-high">GupShupGo</span>
              </div>
              <p className="max-w-[448px] text-14 leading-140 text-ink-secondary">
                Private messaging, HD calls, and offline chat, built for everyday
                conversations.
              </p>
            </div>

            {/* Resources / Blog column */}
            <div className="flex flex-col gap-12px">
              <h2 className={columnTitleClasses}>Resources</h2>
              <ul className="flex flex-col gap-8px">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClasses}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal column (Requirement 3.7) */}
            <div className="flex flex-col gap-12px">
              <h2 className={columnTitleClasses}>Legal</h2>
              <ul className="flex flex-col gap-8px">
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
            <div className="flex flex-col gap-12px">
              <h2 className={columnTitleClasses}>Get the app</h2>
              <p className="text-14 leading-140 text-ink-high">{PLATFORM_LABEL}</p>
              <p className="max-w-[448px] text-14 leading-140 text-ink-secondary">
                Download GupShupGo from Google Play and sign in with your phone
                number to start chatting.
              </p>
            </div>
          </div>

          {/* Structural rule: a hairline-coloured element, not a CSS border (Req 4.3). */}
          <div aria-hidden="true" className="mt-40px h-px w-full bg-hairline-12" />

          <p className="mt-24px text-12 leading-130 text-ink-secondary">
            © {year} GupShupGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
