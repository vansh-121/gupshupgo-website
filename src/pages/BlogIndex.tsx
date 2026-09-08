import { useState, useMemo } from "react";
import { Search, Sparkles, BookOpen } from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import SEOHead from "@/components/seo/SEOHead";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogCategory } from "@/data/blogPosts";
import { MEASURE_CLASSES } from "@/components/Section";

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const otherPosts = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery.trim()) {
      return filteredPosts;
    }
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "GupShupGo Blog: Privacy, Offline Mesh & Secure Messaging",
    "description": "In-depth guides, engineering deep-dives, and research on private messaging, offline Bluetooth mesh networking, and online safety from GupShupGo.",
    "url": "https://www.gupshupgo.app/blog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": BLOG_POSTS.map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://www.gupshupgo.app/blog/${post.slug}`,
        "name": post.title,
      })),
    },
  };

  return (
    <SiteShell>
      <SEOHead
        title="GupShupGo Blog: Privacy, Offline Mesh & Mobile Security Guides"
        description="Explore expert guides on offline Bluetooth mesh texting, Signal protocol encryption, anonymous chat safety, and low-bandwidth HD calling for Android."
        canonicalPath="/blog"
        keywords={[
          "GupShupGo blog",
          "offline messaging guide",
          "Signal protocol explained",
          "private messaging app android",
          "mesh chat tutorials",
          "anonymous chat safety",
          "android encrypted messaging",
        ]}
        jsonLd={collectionSchema}
      />

      <div className={`mx-auto w-full ${MEASURE_CLASSES[1199]} px-20px py-72px bp810:px-36px bp810:py-120px`}>
        <BlogBreadcrumbs items={[{ label: "Blog" }]} />

        {/* Header Hero */}
        <header className="mb-48px space-y-16px text-left">
          <div className="inline-flex items-center gap-8px rounded-pill bg-brand/10 px-12px py-6px text-13 font-medium text-brand dark:text-brand-light">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>The GupShupGo Journal</span>
          </div>

          <h1 className="text-32 font-medium leading-115 tracking-tight text-ink-high sm:text-44 md:text-52">
            Privacy, Offline Mesh &amp; Modern Communication
          </h1>

          <p className="max-w-[720px] text-16 leading-140 text-ink-secondary sm:text-18">
            Expert insights, cryptographic breakdowns, and practical guides on staying private,
            texting without cellular towers, and building healthier digital friendships.
          </p>

          {/* Search & Category Filter Toolbar */}
          <div className="pt-24px space-y-16px">
            {/* Search Box */}
            <div className="relative max-w-[480px]">
              <Search className="pointer-events-none absolute left-16px top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
                className="h-48px w-full rounded-pill bg-layer-1 pl-44px pr-20px text-14 text-ink-high placeholder:text-ink-secondary/70 shadow-hairline-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-standard"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-8px pt-8px" role="group" aria-label="Filter by category">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                aria-pressed={selectedCategory === "All"}
                className={`min-h-[38px] rounded-pill px-16px text-13 font-medium transition-standard ${
                  selectedCategory === "All"
                    ? "bg-brand text-white shadow-elevation"
                    : "bg-layer-1 text-ink-secondary shadow-hairline-12 hover:text-ink-high hover:bg-layer-2"
                }`}
              >
                All Articles ({BLOG_POSTS.length})
              </button>

              {BLOG_CATEGORIES.map((cat: BlogCategory) => {
                const count = BLOG_POSTS.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isSelected}
                    className={`min-h-[38px] rounded-pill px-16px text-13 font-medium transition-standard ${
                      isSelected
                        ? "bg-brand text-white shadow-elevation"
                        : "bg-layer-1 text-ink-secondary shadow-hairline-12 hover:text-ink-high hover:bg-layer-2"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Featured Post (Only show on default full listing) */}
        {selectedCategory === "All" && !searchQuery.trim() && featuredPost && (
          <section aria-label="Featured article" className="mb-48px">
            <BlogCard post={featuredPost} featured />
          </section>
        )}

        {/* Post Grid */}
        <section aria-label="Blog posts list">
          {filteredPosts.length === 0 ? (
            <div className="rounded-24 bg-layer-1 p-48px text-center shadow-hairline-12 space-y-12px">
              <p className="text-18 font-medium text-ink-high">No matching articles found</p>
              <p className="text-14 text-ink-secondary">
                Try searching for broader keywords such as &ldquo;encryption&rdquo;, &ldquo;mesh&rdquo;, or &ldquo;privacy&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-12px inline-flex min-h-[40px] items-center rounded-pill bg-layer-2 px-20px text-13 font-medium text-ink-high hover:bg-brand hover:text-white transition-standard"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-24px sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Contextual App CTA Banner */}
        <BlogCTA />
      </div>
    </SiteShell>
  );
}
