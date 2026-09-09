import { Link } from "react-router-dom";
import { ArrowRight, Clock, Eye } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import { useBlogViews } from "@/hooks/useBlogViews";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const { views, formattedViews } = useBlogViews(post.slug, { autoIncrement: false, compact: true });
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <article
        aria-labelledby={`blog-title-${post.slug}`}
        className={cn(
          "group relative overflow-hidden rounded-24 bg-layer-1",
          "shadow-hairline-12-elevated transition-standard hover:shadow-elevation",
          "grid gap-24px lg:grid-cols-2 lg:items-center",
        )}
      >
        {/* Featured Card Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-layer-2 sm:aspect-[16/9] lg:h-full">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-16px top-16px flex items-center gap-8px">
            <span className="rounded-pill bg-brand px-12px py-4px text-12 font-medium leading-100 text-white shadow-elevation">
              Featured Article
            </span>
            <span className="rounded-pill bg-black/60 backdrop-blur-md px-12px py-4px text-12 font-medium leading-100 text-white border border-white/15 shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Featured Card Content */}
        <div className="space-y-16px p-24px sm:p-36px lg:pl-0">
          <div className="flex flex-wrap items-center gap-x-8px gap-y-4px text-12 text-ink-secondary">
            <span className="inline-flex items-center gap-4px">
              <Clock className="h-3.5 w-3.5 text-ink-secondary shrink-0" aria-hidden="true" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-ink-secondary/40" aria-hidden="true">·</span>
            <span>{formattedDate}</span>
            {views > 0 && (
              <>
                <span className="text-ink-secondary/40" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-4px font-medium text-ink-high">
                  <Eye className="h-3.5 w-3.5 text-ink-secondary shrink-0" aria-hidden="true" />
                  <span>{views === 1 ? "1 view" : `${formattedViews} views`}</span>
                </span>
              </>
            )}
          </div>

          <h2 id={`blog-title-${post.slug}`} className="text-24 font-medium leading-125 text-ink-high sm:text-30">
            <Link
              to={`/blog/${post.slug}`}
              className="hover:text-brand transition-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-4"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-15 leading-150 text-ink-secondary sm:text-16 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-12px border-t border-hairline-12/60">
            <div className="flex items-center gap-12px">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-40px w-40px rounded-full object-cover shadow-hairline-12"
              />
              <div>
                <p className="text-14 font-medium leading-120 text-ink-high">{post.author.name}</p>
                <p className="text-12 text-ink-secondary">{post.author.role}</p>
              </div>
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex min-h-[40px] items-center gap-6px rounded-pill bg-layer-2 px-16px text-13 font-medium text-ink-high shadow-hairline-12 transition-standard group-hover:bg-brand group-hover:text-white"
            >
              <span>Read</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={`blog-title-${post.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-20 bg-layer-1",
        "shadow-hairline-12 transition-standard hover:-translate-y-1 hover:shadow-hairline-12-elevated",
      )}
    >
      <div>
        {/* Card Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-layer-2">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-12px top-12px">
            <span className="rounded-pill bg-black/60 backdrop-blur-md px-10px py-4px text-12 font-medium leading-100 text-white border border-white/15 shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-20px space-y-12px">
          <div className="flex flex-wrap items-center gap-x-8px gap-y-4px text-12 text-ink-secondary">
            <span className="inline-flex items-center gap-4px">
              <Clock className="h-3.5 w-3.5 text-ink-secondary shrink-0" aria-hidden="true" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-ink-secondary/40" aria-hidden="true">·</span>
            <span>{formattedDate}</span>
            {views > 0 && (
              <>
                <span className="text-ink-secondary/40" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-4px font-medium text-ink-high">
                  <Eye className="h-3.5 w-3.5 text-ink-secondary shrink-0" aria-hidden="true" />
                  <span>{views === 1 ? "1 view" : `${formattedViews} views`}</span>
                </span>
              </>
            )}
          </div>

          <h3 id={`blog-title-${post.slug}`} className="text-18 font-medium leading-135 text-ink-high line-clamp-2">
            <Link
              to={`/blog/${post.slug}`}
              className="hover:text-brand transition-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-4"
            >
              {post.title}
            </Link>
          </h3>

          <p className="text-14 leading-150 text-ink-secondary line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="mx-20px mb-20px flex items-center justify-between border-t border-hairline-12/60 pt-16px">
        <div className="flex items-center gap-10px">
          <img
            src={post.author.avatar}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="h-32px w-32px rounded-full object-cover shadow-hairline-12"
          />
          <div>
            <p className="text-13 font-medium leading-120 text-ink-high">{post.author.name}</p>
            <p className="text-11 text-ink-secondary">{post.author.role}</p>
          </div>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          aria-label={`Read ${post.title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-layer-2 text-ink-high transition-standard group-hover:bg-brand group-hover:text-white"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
