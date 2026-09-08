import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
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
          "group relative overflow-hidden rounded-24 bg-layer-1 p-24px sm:p-36px",
          "shadow-hairline-12-elevated transition-standard hover:shadow-elevation",
          "flex flex-col justify-between gap-24px lg:flex-row lg:items-center",
        )}
      >
        <div className="max-w-[680px] space-y-16px">
          <div className="flex flex-wrap items-center gap-10px">
            <span className="rounded-pill bg-brand px-12px py-4px text-12 font-medium leading-100 text-white">
              Featured Article
            </span>
            <span className="rounded-pill bg-layer-2 px-12px py-4px text-12 font-medium leading-100 text-ink-high">
              {post.category}
            </span>
            <div className="flex items-center gap-4px text-12 text-ink-secondary">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h2 id={`blog-title-${post.slug}`} className="text-24 font-medium leading-130 text-ink-high sm:text-32">
            <Link
              to={`/blog/${post.slug}`}
              className="hover:text-brand transition-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-4"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-15 leading-140 text-ink-secondary sm:text-16 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-12px pt-8px">
            <img
              src={post.author.avatar}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="h-40px w-40px rounded-full object-cover shadow-hairline-12"
            />
            <div>
              <p className="text-14 font-medium leading-120 text-ink-high">{post.author.name}</p>
              <p className="text-12 text-ink-secondary">{formattedDate} · {post.author.role}</p>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex min-h-[44px] items-center gap-8px rounded-pill bg-layer-2 px-20px py-10px text-14 font-medium text-ink-high shadow-hairline-12 transition-standard group-hover:bg-brand group-hover:text-white"
          >
            <span>Read Article</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={`blog-title-${post.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-20 bg-layer-1 p-24px",
        "shadow-hairline-12 transition-standard hover:-translate-y-1 hover:shadow-hairline-12-elevated",
      )}
    >
      <div className="space-y-14px">
        <div className="flex items-center justify-between gap-8px">
          <span className="rounded-pill bg-layer-2 px-10px py-4px text-12 font-medium text-ink-high">
            {post.category}
          </span>
          <div className="flex items-center gap-4px text-12 text-ink-secondary">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 id={`blog-title-${post.slug}`} className="text-19 font-medium leading-130 text-ink-high line-clamp-2">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-brand transition-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-4"
          >
            {post.title}
          </Link>
        </h3>

        <p className="text-14 leading-140 text-ink-secondary line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-20px flex items-center justify-between border-t border-hairline-12 pt-16px">
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
            <p className="text-11 text-ink-secondary">{formattedDate}</p>
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
