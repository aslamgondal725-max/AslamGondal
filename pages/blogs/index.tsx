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
    <section className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="pt-2">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Blog
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Long-form notes and commentary on recent research, methods, and ideas.
        </p>
      </div>

      <div className="space-y-5">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/blogs/${p.slug}`}
                  className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:underline"
                >
                  {p.title}
                </Link>

                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </div>

                {p.excerpt && (
                  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {p.excerpt}
                  </p>
                )}

                {p.paperTitle && p.paperUrl && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
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

              <Link
                href={`/blogs/${p.slug}`}
                className="text-sm font-semibold underline text-gray-700 dark:text-gray-300 whitespace-nowrap"
              >
                Read →
              </Link>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">
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