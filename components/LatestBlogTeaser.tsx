import Link from "next/link";
import type { BlogListItem } from "../lib/blog";

type Props = {
  post: BlogListItem | null;
};

export default function LatestBlogTeaser({ post }: Props) {
  if (!post) return null;

  const dateLabel = new Date(post.date).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="surface-card relative h-full overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400" />
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Latest blog
            </div>
            <div className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {dateLabel}
            </div>
          </div>

          <Link
            href={`/blogs/${post.slug}`}
            className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Read →
          </Link>
        </div>

        <Link
          href={`/blogs/${post.slug}`}
          className="mt-4 block text-2xl font-bold leading-tight tracking-tight text-slate-900 hover:text-blue-700 dark:text-slate-100 dark:hover:text-blue-300"
        >
          {post.title}
        </Link>

        {post.teaserQuestion && (
          <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-sm italic font-medium leading-6 text-indigo-900 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">
            {post.teaserQuestion}
          </p>
        )}

        {post.excerpt && (
          <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
            {post.excerpt}
          </p>
        )}

        <div className="mt-5 border-t border-slate-200/80 pt-4 dark:border-slate-700">
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Open article
            <span className="ml-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
