import { useState, useEffect } from "react";
import {
  fetchArticleViews,
  recordArticleView,
  formatViews,
  getCachedCount,
} from "@/services/blogViews";

interface UseBlogViewsOptions {
  autoIncrement?: boolean;
  compact?: boolean;
}

export function useBlogViews(slug: string, options: UseBlogViewsOptions = {}) {
  const { autoIncrement = false, compact = false } = options;

  const [views, setViews] = useState<number>(() => getCachedCount(slug));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    async function loadViews() {
      try {
        const count = autoIncrement
          ? await recordArticleView(slug)
          : await fetchArticleViews(slug);

        if (!cancelled) {
          setViews(count);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      loadViews();
    }

    return () => {
      cancelled = true;
    };
  }, [slug, autoIncrement]);

  return {
    views,
    formattedViews: formatViews(views, compact),
    loading,
  };
}
