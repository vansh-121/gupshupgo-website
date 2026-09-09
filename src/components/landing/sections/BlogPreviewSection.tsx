import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { BLOG_POSTS } from "@/data/blogPosts";
import { bandFor } from "@/data/sections";

/**
 * Editorial & Engineering Blog Preview section on the landing page.
 *
 * Exposes internal links to top security, mesh networking, and privacy articles,
 * accelerating Google indexing, passing root PageRank to deep documentation,
 * and presenting rich editorial depth for AdSense evaluation.
 */
export default function BlogPreviewSection() {
  const previewPosts = BLOG_POSTS.slice(0, 3);

  return (
    <Section id="blog" band={bandFor("blog")}>
      <div className="space-y-40px">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-20px min-[680px]:flex-row min-[680px]:items-end">
          <div className="space-y-12px max-w-[680px]">
            <div className="inline-flex items-center gap-8px rounded-pill bg-pill-soft px-12px py-5px text-12 font-medium text-pill-soft-fg shadow-hairline-12">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>The GupShupGo Journal</span>
            </div>

            <SectionHeading sectionId="blog">Latest guides, security research &amp; tech insights</SectionHeading>

            <p className="text-16 leading-150 text-ink-secondary sm:text-18">
              Engineering deep dives into offline Bluetooth mesh protocols, Signal encryption, and practical privacy guides.
            </p>
          </div>

          <Link
            to="/blog"
            className="hidden min-[680px]:inline-flex min-h-[44px] shrink-0 items-center gap-8px rounded-pill bg-layer-2 px-20px text-14 font-medium text-ink-high shadow-hairline-12 hover:bg-brand hover:text-white transition-standard"
          >
            <span>View all articles</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* 3-Article Grid */}
        <div className="grid gap-16px bp810:gap-24px min-[680px]:grid-cols-3">
          {previewPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Mobile View All button */}
        <div className="flex justify-center min-[680px]:hidden pt-8px">
          <Link
            to="/blog"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-8px rounded-pill bg-layer-2 px-20px text-14 font-medium text-ink-high shadow-hairline-12 hover:bg-brand hover:text-white transition-standard"
          >
            <span>View all articles</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
