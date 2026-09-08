import { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Share2,
  Check,
  Twitter,
  ArrowLeft,
  Info,
  AlertTriangle,
  Lightbulb,
  Quote,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import SEOHead from "@/components/seo/SEOHead";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { BLOG_POSTS, type BlogPost as BlogPostType, type BlogSection } from "@/data/blogPosts";
import { MEASURE_CLASSES } from "@/components/Section";
import { cn } from "@/lib/utils";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const post = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || p.featured)).slice(0, 2);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const postUrl = `https://www.gupshupgo.app/blog/${post.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const formattedPublishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Google Schema: BlogPosting + BreadcrumbList + FAQPage
  const schemas: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "url": postUrl,
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt,
      "inLanguage": "en-US",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl,
      },
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role,
      },
      "publisher": {
        "@type": "Organization",
        "name": "GupShupGo",
        "url": "https://www.gupshupgo.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.gupshupgo.app/app_icon.png",
        },
      },
      "image": "https://www.gupshupgo.app/og-image.png",
      "keywords": post.keywords.join(", "),
      "articleSection": post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.gupshupgo.app",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.gupshupgo.app/blog",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": postUrl,
        },
      ],
    },
  ];

  if (post.faq && post.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faq.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    });
  }

  return (
    <SiteShell>
      <SEOHead
        title={`${post.title} — GupShupGo Blog`}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage="/og-image.png"
        keywords={post.keywords}
        publishedTime={post.publishedAt}
        author={post.author.name}
        jsonLd={schemas}
      />

      <div className={`mx-auto w-full ${MEASURE_CLASSES[1199]} px-20px py-72px bp810:px-36px bp810:py-120px`}>
        <BlogBreadcrumbs
          items={[
            { label: "Blog", to: "/blog" },
            { label: post.category, to: `/blog?category=${encodeURIComponent(post.category)}` },
            { label: post.title },
          ]}
        />

        {/* Back Link */}
        <Link
          to="/blog"
          className="mb-32px inline-flex items-center gap-8px text-14 text-ink-secondary transition-standard hover:text-ink-high"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <header className="mx-auto max-w-[840px] space-y-20px pb-40px border-b border-hairline-12">
          <div className="flex flex-wrap items-center gap-10px">
            <span className="rounded-pill bg-brand/10 px-12px py-4px text-13 font-medium text-brand dark:text-brand-light">
              {post.category}
            </span>
            <div className="flex items-center gap-6px text-13 text-ink-secondary">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-6px text-13 text-ink-secondary">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Published {formattedPublishedDate}</span>
            </div>
          </div>

          <h1 className="text-32 font-medium leading-115 tracking-tight text-ink-high sm:text-44 md:text-50">
            {post.title}
          </h1>

          <p className="text-18 leading-140 text-ink-secondary sm:text-20">
            {post.subtitle}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-col gap-16px pt-12px sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-12px">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                loading="eager"
                decoding="async"
                className="h-48px w-48px rounded-full object-cover shadow-hairline-12"
              />
              <div>
                <p className="text-15 font-medium text-ink-high">{post.author.name}</p>
                <p className="text-13 text-ink-secondary">{post.author.role}</p>
              </div>
            </div>

            {/* Share controls */}
            <div className="flex items-center gap-8px">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy article link"
                className="inline-flex min-h-[40px] items-center gap-6px rounded-pill bg-layer-1 px-14px text-13 font-medium text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X / Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-layer-1 text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-2"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${postUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-layer-1 text-ink-high shadow-hairline-12 transition-standard hover:bg-layer-2"
              >
                <span className="text-14 font-bold">WA</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="mx-auto my-36px max-w-[1024px] overflow-hidden rounded-24 shadow-hairline-12-elevated bg-layer-2">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        {/* Content Layout with Table of Contents */}
        <div className="mx-auto mt-40px grid max-w-[1024px] gap-48px lg:grid-cols-[260px_1fr]">
          {/* Sticky Table of Contents (Desktop) */}
          <aside aria-label="Table of contents" className="hidden lg:block">
            <div className="sticky top-[100px] space-y-12px rounded-16 bg-layer-1 p-20px shadow-hairline-12">
              <p className="text-14 font-medium uppercase tracking-wider text-ink-secondary">
                Table of Contents
              </p>
              <nav>
                <ul className="space-y-8px text-13 leading-130 text-ink-secondary">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block py-4px hover:text-brand transition-standard focus-visible:outline-none focus-visible:text-brand"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                  {post.faq && post.faq.length > 0 && (
                    <li>
                      <a
                        href="#frequently-asked-questions"
                        className="block py-4px hover:text-brand transition-standard focus-visible:outline-none focus-visible:text-brand"
                      >
                        Frequently Asked Questions
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Article Body */}
          <article className="max-w-[760px] space-y-44px text-16 leading-160 text-ink-high">
            {/* Quick Summary / Key Takeaway banner */}
            <div className="rounded-16 bg-layer-1 p-20px shadow-hairline-12 sm:p-24px border-l-4 border-brand space-y-8px">
              <p className="text-14 font-semibold uppercase tracking-wider text-brand">
                Key Takeaway
              </p>
              <p className="text-15 leading-150 text-ink-high">
                {post.excerpt}
              </p>
            </div>

            {/* Sections Rendering */}
            {post.sections.map((section: BlogSection, sIndex: number) => {
              const tocEntry = post.tableOfContents[sIndex];
              const sectionId = tocEntry ? tocEntry.id : `section-${sIndex}`;

              return (
                <section key={sectionId} id={sectionId} className="scroll-mt-120px space-y-20px">
                  <h2 className="text-24 font-medium leading-130 text-ink-high sm:text-28 border-b border-hairline-12/60 pb-12px">
                    {section.heading}
                  </h2>

                  {section.subheading && (
                    <h3 className="text-19 font-medium leading-130 text-ink-high">
                      {section.subheading}
                    </h3>
                  )}

                  {section.paragraphs.map((pText, pIndex) => (
                    <p key={pIndex} className="text-16 leading-160 text-ink-high/90">
                      {pText}
                    </p>
                  ))}

                  {/* Optional In-Article Screenshot / Image */}
                  {section.image && (
                    <figure className="my-32px overflow-hidden rounded-20 bg-layer-1 p-16px sm:p-24px shadow-hairline-12 space-y-12px">
                      <div className="overflow-hidden rounded-16 bg-layer-2/60 p-12px flex justify-center">
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[520px] w-auto rounded-12 object-contain shadow-elevation"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="text-center text-13 text-ink-secondary italic px-12px pt-4px">
                          {section.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Optional Callout */}
                  {section.callout && (
                    <div
                      className={cn(
                        "my-24px rounded-16 p-20px shadow-hairline-12 space-y-8px",
                        section.callout.type === "insight" && "bg-blue-500/10 text-ink-high border-l-4 border-blue-500",
                        section.callout.type === "warning" && "bg-amber-500/10 text-ink-high border-l-4 border-amber-500",
                        section.callout.type === "tip" && "bg-emerald-500/10 text-ink-high border-l-4 border-emerald-500",
                        section.callout.type === "quote" && "bg-layer-1 text-ink-high border-l-4 border-brand italic",
                      )}
                    >
                      <div className="flex items-center gap-8px text-14 font-semibold">
                        {section.callout.type === "insight" && <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />}
                        {section.callout.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden="true" />}
                        {section.callout.type === "tip" && <Lightbulb className="h-4 w-4 text-emerald-500" aria-hidden="true" />}
                        {section.callout.type === "quote" && <Quote className="h-4 w-4 text-brand" aria-hidden="true" />}
                        <span>{section.callout.title || "Note"}</span>
                      </div>
                      <p className="text-15 leading-150 text-ink-high">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Optional Bullet Points */}
                  {section.bulletPoints && (
                    <div className="my-20px space-y-12px rounded-16 bg-layer-1 p-20px shadow-hairline-12">
                      {section.bulletPoints.title && (
                        <p className="text-15 font-semibold text-ink-high">
                          {section.bulletPoints.title}
                        </p>
                      )}
                      <ul className="list-disc space-y-8px pl-20px text-15 leading-150 text-ink-high">
                        {section.bulletPoints.items.map((bItem, bIdx) => (
                          <li key={bIdx}>{bItem}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Optional Comparison Table */}
                  {section.table && (
                    <div className="my-28px overflow-x-auto rounded-16 bg-layer-1 shadow-hairline-12">
                      {section.table.caption && (
                        <p className="px-20px pt-16px text-13 font-medium uppercase tracking-wider text-ink-secondary">
                          {section.table.caption}
                        </p>
                      )}
                      <table className="w-full text-left text-14 text-ink-high">
                        <thead className="bg-layer-2 text-13 font-semibold uppercase tracking-wider text-ink-high">
                          <tr>
                            {section.table.headers.map((hdr, hIdx) => (
                              <th key={hIdx} className="px-16px py-12px">
                                {hdr}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-hairline-12">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-layer-0/50 transition-standard">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-16px py-12px">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* In-article contextual CTA right in the middle */}
                  {sIndex === 2 && (
                    <BlogCTA
                      variant="inline"
                      title="Want private, zero-tracking messaging on Android?"
                      description="Download GupShupGo free on Google Play. Enjoy Signal-protocol encrypted messaging, offline Bluetooth mesh, and HD calls."
                    />
                  )}
                </section>
              );
            })}

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <section id="frequently-asked-questions" className="scroll-mt-120px pt-20px border-t border-hairline-12 space-y-16px">
                <h2 className="text-24 font-medium text-ink-high sm:text-28">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-12px">
                  {post.faq.map((faqItem, fIdx) => {
                    const isOpen = activeFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="rounded-16 bg-layer-1 p-16px shadow-hairline-12 transition-standard"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveFaqIndex(isOpen ? null : fIdx)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between text-left text-16 font-medium text-ink-high"
                        >
                          <span>{faqItem.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-ink-secondary" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-ink-secondary" aria-hidden="true" />
                          )}
                        </button>
                        {isOpen && (
                          <p className="mt-12px text-14 leading-150 text-ink-secondary border-t border-hairline-12 pt-12px">
                            {faqItem.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Author Bio Box */}
            <div className="mt-48px rounded-20 bg-layer-1 p-24px sm:p-32px shadow-hairline-12 flex flex-col sm:flex-row gap-20px items-start">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-64px w-64px rounded-full object-cover shadow-hairline-12 shrink-0"
              />
              <div className="space-y-6px">
                <p className="text-12 font-medium uppercase tracking-wider text-brand">Written by</p>
                <p className="text-18 font-medium text-ink-high">{post.author.name}</p>
                <p className="text-13 text-ink-secondary font-medium">{post.author.role}</p>
                <p className="text-14 leading-140 text-ink-secondary pt-4px">{post.author.bio}</p>
              </div>
            </div>

            {/* Bottom Download Card */}
            <BlogCTA />
          </article>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section aria-label="Related articles" className="mt-72px border-t border-hairline-12 pt-48px space-y-24px">
            <div className="flex items-center justify-between">
              <h2 className="text-24 font-medium text-ink-high">Related Articles</h2>
              <Link to="/blog" className="text-14 font-medium text-brand hover:underline">
                View all articles &rarr;
              </Link>
            </div>
            <div className="grid gap-24px sm:grid-cols-2">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.slug} post={rPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
