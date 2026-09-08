import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BlogBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-24px">
      <ol className="flex flex-wrap items-center gap-6px text-13 leading-140 text-ink-secondary">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-4px transition-standard hover:text-ink-high"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-6px">
              <ChevronRight className="h-3.5 w-3.5 text-ink-secondary/60" aria-hidden="true" />
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="transition-standard hover:text-ink-high"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-ink-high line-clamp-1 max-w-[280px] sm:max-w-[400px]" : ""}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
