import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { getAllPosts, type BlogListItem } from "../../lib/blog";

type Props = {
  posts: BlogListItem[];
};

const BlogsIndex: NextPage<Props> = ({ posts }) => {
  return (
    <section className="space-y-12">
      <header className="page-hero">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Blog
        </h1>
        <p className="section-subtext max-w-2xl">
          Long-form notes and commentary on recent research, methods, and ideas.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="soft-chip">{posts.length} posts</span>
          <span className="soft-chip">Research commentary</span>
        </div>
      </header>

      <div>
        {posts.map((p) => (
          <article
            key={p.slug}
            className="border-t border-line py-8 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 text-ink-mut">
                  <span className="text-sm">
                    {new Date(p.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  {p.tags && p.tags.length > 0 && (
                    <span className="eyebrow">{p.tags.length} tags</span>
                  )}
                </div>

                <h2 className="mt-2">
                  <Link
                    href={`/blogs/${p.slug}`}
                    className="font-serif text-2xl font-medium tracking-tight text-ink transition-colors hover:text-ink-soft"
                  >
                    {p.title}
                  </Link>
                </h2>

                {p.excerpt && (
                  <p className="mt-3 leading-7 text-ink-soft">{p.excerpt}</p>
                )}

                {p.paperTitle && p.paperUrl && (
                  <p className="mt-3 text-sm text-ink-mut">
                    Paper:{" "}
                    <a
                      href={p.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                    >
                      {p.paperTitle}
                    </a>
                  </p>
                )}

                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="soft-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-none sm:pt-1">
                <Link href={`/blogs/${p.slug}`} className="cta-link">
                  Read article
                </Link>
              </div>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="surface-card p-6 text-ink-soft">
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
