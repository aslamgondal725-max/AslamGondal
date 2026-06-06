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
    <div className="surface-card-hover p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">Latest blog</p>
        <span className="text-xs font-medium text-ink-mut">{dateLabel}</span>
      </div>

      <Link
        href={`/blogs/${post.slug}`}
        className="mt-4 block font-serif text-2xl font-medium leading-snug tracking-tight text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-line-strong"
      >
        {post.title}
      </Link>

      {post.teaserQuestion && (
        <p className="mt-4 border-l-2 border-ink pl-4 text-base italic leading-7 text-ink-soft">
          {post.teaserQuestion}
        </p>
      )}

      {post.excerpt && (
        <p className="mt-4 text-ink-soft">{post.excerpt}</p>
      )}

      <div className="mt-6 border-t border-line pt-4">
        <Link href={`/blogs/${post.slug}`} className="cta-link">
          Open article
          <span className="ml-1.5" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
