import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { getAllPosts, type BlogListItem } from "../../lib/blog";

type Props = {
  posts: BlogListItem[];
};

const chip =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 " +
  "bg-white dark:bg-gray-900";

const BlogsIndex: NextPage<Props> = ({ posts }) => {
  return (
    <section className="space-y-6">
      <div className="page-hero">
        <div className="relative z-10">
        <p className="eyebrow">
          Writing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Long-form notes and commentary on recent research, methods, and ideas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="soft-chip">{posts.length} posts</span>
          <span className="soft-chip">Research commentary</span>
        </div>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="surface-card-hover panel-accent p-5 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <Link
                  href={`/blogs/${p.slug}`}
                  className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-700 dark:text-slate-100 dark:hover:text-blue-300"
                >
                  {p.title}
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="soft-chip !px-2.5 !py-0.5 !text-[11px] !font-medium">
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  </span>
                  {p.tags && p.tags.length > 0 && (
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {p.tags.length} tags
                    </span>
                  )}
                </div>

                {p.excerpt && (
                  <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
                    {p.excerpt}
                  </p>
                )}

                {p.paperTitle && p.paperUrl && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    Paper:{" "}
                    <a
                      href={p.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {p.paperTitle}
                    </a>
                  </p>
                )}

                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className={chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:pt-1">
                <Link
                  href={`/blogs/${p.slug}`}
                  className="inline-flex whitespace-nowrap rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Read article
                </Link>
              </div>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="surface-card p-5 text-slate-600 dark:text-slate-400">
            No posts yet. Add a markdown file to <code>content/blogs</code>.
          </p>
        )}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default BlogsIndex;
