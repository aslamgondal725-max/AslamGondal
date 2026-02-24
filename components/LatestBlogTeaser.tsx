import Link from "next/link";
import type { BlogListItem } from "../lib/blog";

type Props = {
  post: BlogListItem | null;
};

export default function LatestBlogTeaser({ post }: Props) {
  if (!post) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Latest blog
          </div>

          <Link
            href={`/blogs/${post.slug}`}
            className="mt-1 block text-lg font-bold text-gray-900 dark:text-gray-100 hover:underline"
          >
            {post.title}
          </Link>

          {/* ✅ New: teaser question under title */}
          {post.teaserQuestion && (
            <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200 italic">
              {post.teaserQuestion}
            </p>
          )}

          {post.excerpt && (
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              {post.excerpt}
            </p>
          )}
        </div>

        <Link
          href={`/blogs/${post.slug}`}
          className="text-sm font-semibold underline text-gray-700 dark:text-gray-300 whitespace-nowrap"
        >
          Read →
        </Link>
      </div>
    </div>
  );
}