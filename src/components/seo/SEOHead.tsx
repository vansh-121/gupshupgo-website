import { useEffect } from "react";

/**
 * Lightweight per-page SEO component.
 *
 * Sets `document.title` and the `<meta name="description">` content on mount,
 * and restores the original title on unmount. This prevents all sub-pages from
 * inheriting the root `<title>`, which Google can interpret as duplicate content.
 *
 * Also sets the canonical URL for the page to prevent duplicate indexing of
 * trailing-slash and non-trailing-slash variants.
 *
 * When `noindex` is true the component sets `<meta name="robots">` to
 * `noindex, follow` so that error pages (404) are not indexed but their
 * outbound links are still followed.
 */
interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  /** When true, sets `<meta name="robots" content="noindex, follow">`. */
  noindex?: boolean;
}

export default function SEOHead({ title, description, canonicalPath, noindex }: SEOHeadProps) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute("content") ?? "";
    metaDescription?.setAttribute("content", description);

    // Set canonical URL for this page
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const originalCanonical = canonicalLink?.getAttribute("href") ?? "";
    if (canonicalPath && canonicalLink) {
      canonicalLink.setAttribute("href", `https://www.gupshupgo.app${canonicalPath}`);
    }

    // Set robots noindex for error pages
    const metaRobots = document.querySelector('meta[name="robots"]');
    const originalRobots = metaRobots?.getAttribute("content") ?? "";
    if (noindex && metaRobots) {
      metaRobots.setAttribute("content", "noindex, follow");
    }

    return () => {
      document.title = originalTitle;
      metaDescription?.setAttribute("content", originalDescription);
      if (canonicalLink) {
        canonicalLink.setAttribute("href", originalCanonical);
      }
      if (metaRobots) {
        metaRobots.setAttribute("content", originalRobots);
      }
    };
  }, [title, description, canonicalPath, noindex]);

  return null;
}
