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

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        {frontMatter.excerpt && (
          <meta name="description" content={frontMatter.excerpt} />
        )}
      </Head>

      <article className="max-w-4xl mx-auto px-6">
        <div className="pt-2">
          <Link
            href="/blogs"
            className="text-sm underline text-gray-600 dark:text-gray-400"
          >
            ← Back to Blog
          </Link>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {frontMatter.title}
          </h1>

          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {new Date(frontMatter.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </div>

          {frontMatter.paperTitle && frontMatter.paperUrl && (
            <div className="mt-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Paper:
              </span>{" "}
              <a
                href={frontMatter.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-800 dark:text-gray-200"
              >
                {frontMatter.paperTitle}
              </a>
            </div>
          )}

          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {frontMatter.tags.map((t: string) => (
                <span key={t} className={chip}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="prose prose-gray dark:prose-invert max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
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