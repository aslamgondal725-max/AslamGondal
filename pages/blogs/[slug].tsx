import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getAllPostsMeta, getPostBySlug, type BlogPost } from "../../lib/blog";

type Props = {
  post: BlogPost;
};

const chip =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 " +
  "bg-white dark:bg-gray-900";

const BlogPostPage: NextPage<Props> = ({ post }) => {
  const { frontMatter, content } = post;
  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const readingMinutes = Math.max(1, Math.round(plainText.split(" ").filter(Boolean).length / 220));
  const formattedDate = new Date(frontMatter.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        {frontMatter.excerpt && (
          <meta name="description" content={frontMatter.excerpt} />
        )}
      </Head>

      <article className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="surface-card p-5 lg:sticky lg:top-24">
              <Link
                href="/blogs"
                className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                ← Back to Blog
              </Link>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Article
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                  {frontMatter.title}
                </h1>

                {frontMatter.excerpt && (
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {frontMatter.excerpt}
                  </p>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Published
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {formattedDate}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Read Time
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {readingMinutes} min
                  </div>
                </div>
              </div>

              {frontMatter.tags && frontMatter.tags.length > 0 && (
                <div className="mt-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Topics
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {frontMatter.tags.map((t: string) => (
                      <span key={t} className={chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {frontMatter.paperTitle && frontMatter.paperUrl && (
                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/80 p-4 dark:border-blue-400/20 dark:bg-blue-500/10">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    Source Paper
                  </div>
                  <a
                    href={frontMatter.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm font-semibold leading-6 text-slate-900 underline underline-offset-4 dark:text-slate-100"
                  >
                    {frontMatter.paperTitle}
                  </a>
                </div>
              )}
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="surface-card overflow-hidden">
              <div className="border-b border-slate-200/80 bg-gradient-to-r from-blue-50 via-white to-white px-6 py-5 dark:border-slate-800 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-900 sm:px-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    Research Note
                  </span>
                  <span>{formattedDate}</span>
                  <span aria-hidden="true">•</span>
                  <span>{readingMinutes} min read</span>
                </div>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-9">
                <div
                  className="prose prose-blog max-w-none text-slate-700 dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostsMeta();

  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug || "");
  const post = await getPostBySlug(slug);

  if (!post) return { notFound: true };

  return { props: { post } };
};

export default BlogPostPage;
