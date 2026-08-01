import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import SiteShell from "@/components/layout/SiteShell";
import { MEASURE_CLASSES } from "@/components/Section";
import { Button } from "@/components/ui/button";

/**
 * Not-found route (design §3.3, Requirements 10.1, 10.2, 10.5).
 *
 * Rendered inside `SiteShell`, so the header and footer match every other
 * route. The page owns the single `<h1>` on the document and offers exactly one
 * way forward: a router `Link` back to the landing page.
 *
 * Unlike the legal pages, the 404 keeps a display-scale heading — it is a
 * moment, not a document — so the `<h1>` takes the full h1 composite
 * (`text-h1-sm bp810:text-h1`) rather than the retained `text-display`.
 *
 * Body copy sits on `bg-layer-1`, where `text-ink-mid` fails WCAG AA (4.29:1),
 * so it uses `text-ink-high` and `text-ink-secondary` (docs/TOKENS.md).
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteShell mainClassName="bg-layer-1 text-ink-high">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-20px py-80px text-center bp810:px-36px bp810:py-128px">
        <p className="text-12 font-medium uppercase leading-130 tracking-wider text-ink-accent">
          Error 404
        </p>
        <h1 className="mt-16px text-h1-sm font-medium text-ink-high bp810:text-h1">Page not found</h1>
        <p className={`mt-24px ${MEASURE_CLASSES[644]} text-19 leading-140 text-ink-high`}>
          The page you are looking for does not exist, or it has moved. Head back to the home page
          to keep exploring GupShupGo.
        </p>
        <p className="mt-12px text-14 leading-140 text-ink-secondary">
          Requested path:{" "}
          <code className="rounded-8 bg-layer-2 px-8px py-2px font-mono text-14 leading-140 text-ink-high">
            {location.pathname}
          </code>
        </p>
        <Button
          asChild
          className="mt-40px h-12 min-h-[44px] rounded-pill bg-brand px-32px text-16 font-medium leading-140 text-white shadow-elevation transition-standard hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand-dark"
        >
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </SiteShell>
  );
};

export default NotFound;
