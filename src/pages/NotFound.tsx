import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import SiteShell from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";

/**
 * Not-found route (design §3.3, Requirements 10.1, 10.2, 10.5).
 *
 * Rendered inside `SiteShell`, so the header and footer match every other
 * route. The page owns the single `<h1>` on the document and offers exactly one
 * way forward: a router `Link` back to the landing page.
 *
 * Body copy sits on `bg-surface-alt`, where `text-ink-mid` fails WCAG AA, so it
 * uses `text-ink-high` (design §6.5).
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteShell mainClassName="bg-surface-alt text-ink-high">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-gutter py-section text-center md:py-section-lg">
        <p className="text-caption font-semibold uppercase tracking-wider text-brand">
          Error 404
        </p>
        <h1 className="mt-4 text-display font-semibold text-ink-high">Page not found</h1>
        <p className="mt-6 max-w-2xl text-body-lg text-ink-high">
          The page you are looking for does not exist, or it has moved. Head back to the home page
          to keep exploring GupShupGo.
        </p>
        <p className="mt-3 text-body-sm text-ink-low">
          Requested path: <code className="font-mono">{location.pathname}</code>
        </p>
        <Button
          asChild
          className="mt-10 h-12 min-h-[44px] rounded-pill bg-brand px-8 text-body font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand-dark"
        >
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </SiteShell>
  );
};

export default NotFound;
