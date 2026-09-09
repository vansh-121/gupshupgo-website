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
  ogType?: "website" | "article";
  ogImage?: string;
  keywords?: string[];
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function SEOHead({
  title,
  description,
  canonicalPath,
  noindex,
  ogType = "website",
  ogImage,
  keywords,
  publishedTime,
  author,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute("content") ?? "";
    metaDescription?.setAttribute("content", description);

    // Set canonical URL for this page
    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
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

    // OG type
    const ogTypeEl = document.querySelector('meta[property="og:type"]');
    const originalOgType = ogTypeEl?.getAttribute("content") ?? "website";
    if (ogTypeEl) {
      ogTypeEl.setAttribute("content", ogType);
    }

    // OG title & description
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    const originalOgTitle = ogTitleEl?.getAttribute("content") ?? "";
    if (ogTitleEl) ogTitleEl.setAttribute("content", title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    const originalOgDesc = ogDescEl?.getAttribute("content") ?? "";
    if (ogDescEl) ogDescEl.setAttribute("content", description);

    // OG image
    const ogImageEl = document.querySelector('meta[property="og:image"]');
    const originalOgImage = ogImageEl?.getAttribute("content") ?? "";
    if (ogImage && ogImageEl) {
      ogImageEl.setAttribute("content", ogImage.startsWith("http") ? ogImage : `https://www.gupshupgo.app${ogImage}`);
    }

    // Twitter tags
    const twTitleEl = document.querySelector('meta[name="twitter:title"]');
    const originalTwTitle = twTitleEl?.getAttribute("content") ?? "";
    if (twTitleEl) twTitleEl.setAttribute("content", title);

    const twDescEl = document.querySelector('meta[name="twitter:description"]');
    const originalTwDesc = twDescEl?.getAttribute("content") ?? "";
    if (twDescEl) twDescEl.setAttribute("content", description);

    const twImageEl = document.querySelector('meta[name="twitter:image"]');
    const originalTwImage = twImageEl?.getAttribute("content") ?? "";
    if (ogImage && twImageEl) {
      twImageEl.setAttribute("content", ogImage.startsWith("http") ? ogImage : `https://www.gupshupgo.app${ogImage}`);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const originalKeywords = metaKeywords?.getAttribute("content") ?? "";
    if (keywords && keywords.length > 0 && metaKeywords) {
      metaKeywords.setAttribute("content", keywords.join(", "));
    }

    // JSON-LD dynamic insertion
    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.setAttribute("data-dynamic-seo", "true");
      scriptEl.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
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
      if (ogTypeEl) ogTypeEl.setAttribute("content", originalOgType);
      if (ogTitleEl) ogTitleEl.setAttribute("content", originalOgTitle);
      if (ogDescEl) ogDescEl.setAttribute("content", originalOgDesc);
      if (ogImageEl) ogImageEl.setAttribute("content", originalOgImage);
      if (twTitleEl) twTitleEl.setAttribute("content", originalTwTitle);
      if (twDescEl) twDescEl.setAttribute("content", originalTwDesc);
      if (twImageEl) twImageEl.setAttribute("content", originalTwImage);
      if (metaKeywords) metaKeywords.setAttribute("content", originalKeywords);
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, canonicalPath, noindex, ogType, ogImage, keywords, publishedTime, author, jsonLd]);

  return null;
}
