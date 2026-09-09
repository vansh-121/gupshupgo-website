import { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import SEOHead from "@/components/seo/SEOHead";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogCategory } from "@/data/blogPosts";

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

      <div className="mx-auto w-full max-w-[1199px] px-20px pt-[88px] pb-72px bp810:px-36px bp810:pt-[104px] bp810:pb-120px">
        <BlogBreadcrumbs items={[{ label: "Blog" }]} />

        {/* Header Hero — Medium/Editorial publication style */}
        <header className="mb-48px text-left">
          <div className="space-y-20px max-w-[980px]">
            <div className="inline-flex items-center gap-8px rounded-pill bg-pill-soft px-16px py-6px text-13 font-medium text-pill-soft-fg shadow-hairline-12">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>The GupShupGo Journal</span>
            </div>

            <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-0.03em] text-ink-high sm:text-[50px] md:text-[58px] lg:text-[64px] max-w-[960px]">
              Privacy, Offline Mesh &amp; Modern Communication
            </h1>

            <p className="max-w-[700px] text-16 leading-150 text-ink-secondary sm:text-18">
              Expert insights, cryptographic breakdowns, and practical guides on staying private,
              texting without cellular towers, and building resilient communication.
            </p>
          </div>

          {/* Editorial Toolbar: Category Tabs + Search Input */}
          <div className="mt-36px flex flex-col gap-16px border-b border-hairline-12 pb-20px md:flex-row md:items-center md:justify-between">
            {/* Category Navigation */}
            <nav className="flex flex-wrap items-center gap-8px" aria-label="Filter articles by category">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                aria-pressed={selectedCategory === "All"}
                className={`inline-flex items-center min-h-[38px] rounded-pill px-16px text-13 font-medium transition-standard ${
                  selectedCategory === "All"
                    ? "bg-ink-high text-layer-0 shadow-elevation font-semibold"
                    : "bg-layer-1 text-ink-secondary shadow-hairline-12 hover:text-ink-high hover:bg-layer-2"
                }`}
              >
                <span>All Articles</span>
                <span
                  className={`ml-6px inline-flex h-5 items-center justify-center rounded-full px-7px text-11 font-semibold ${
                    selectedCategory === "All"
                      ? "bg-layer-0/20 text-layer-0"
                      : "bg-layer-2 text-ink-secondary"
                  }`}
                >
                  {BLOG_POSTS.length}
                </span>
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
                    className={`inline-flex items-center min-h-[38px] rounded-pill px-16px text-13 font-medium transition-standard ${
                      isSelected
                        ? "bg-ink-high text-layer-0 shadow-elevation font-semibold"
                        : "bg-layer-1 text-ink-secondary shadow-hairline-12 hover:text-ink-high hover:bg-layer-2"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`ml-6px inline-flex h-5 items-center justify-center rounded-full px-7px text-11 font-semibold ${
                        isSelected
                          ? "bg-layer-0/20 text-layer-0"
                          : "bg-layer-2 text-ink-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Search Box */}
            <div className="relative w-full sm:w-[280px] shrink-0">
              <Search className="pointer-events-none absolute left-16px top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
                className="h-40px w-full rounded-pill bg-layer-1 border border-hairline-12 pl-44px pr-16px text-13 text-ink-high placeholder:text-ink-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-transparent transition-standard"
              />
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
