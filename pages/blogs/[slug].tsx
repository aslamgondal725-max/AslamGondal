import { type FormEvent, useEffect, useRef, useState } from "react";
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

type ReactionKey = "like" | "insightful" | "applause";

type CommentItem = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  attachments: string[];
};

type InteractionState = {
  reactions: Record<ReactionKey, number>;
  comments: CommentItem[];
};

const initialInteractionState: InteractionState = {
  reactions: {
    like: 0,
    insightful: 0,
    applause: 0,
  },
  comments: [],
};

const BlogPostPage: NextPage<Props> = ({ post }) => {
  const { frontMatter, content } = post;
  const [interactionState, setInteractionState] = useState<InteractionState>(initialInteractionState);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const storageKey = `blog-interactions-${post.slug}`;

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as InteractionState;
      if (parsed?.reactions && Array.isArray(parsed.comments)) {
        setInteractionState(parsed);
      }
    } catch {
      // ignore malformed saved data
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(interactionState));
  }, [interactionState, storageKey]);

  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const readingMinutes = Math.max(1, Math.round(plainText.split(" ").filter(Boolean).length / 220));
  const formattedDate = new Date(frontMatter.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const reactionOptions: Array<{ key: ReactionKey; label: string }> = [
    { key: "like", label: "Like" },
    { key: "insightful", label: "Insightful" },
    { key: "applause", label: "Applause" },
  ];

  const handleReaction = (key: ReactionKey) => {
    setInteractionState((prev) => ({
      ...prev,
      reactions: {
        ...prev.reactions,
        [key]: prev.reactions[key] + 1,
      },
    }));
  };

  const handleFilePick = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setPendingFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const submitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = comment.trim();
    const trimmedName = name.trim() || "Anonymous";
    if (!trimmedText) return;

    const newComment: CommentItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author: trimmedName,
      text: trimmedText,
      createdAt: new Date().toISOString(),
      attachments: pendingFiles.map((file) => file.name),
    };

    setInteractionState((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
    setComment("");
    setPendingFiles([]);
  };

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

                <section className="mt-10 border-t border-slate-200/80 pt-8 dark:border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                      Reactions & Comments
                    </h3>
                    <span className="soft-chip !text-xs">
                      {interactionState.comments.length} comments
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {reactionOptions.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleReaction(option.key)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        {option.label}
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">
                          {interactionState.reactions[option.key]}
                        </span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={submitComment} className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-blue-500/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFilePick(e.target.files)}
                          className="hidden"
                        />
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          multiple
                          onChange={(e) => handleFilePick(e.target.files)}
                          className="hidden"
                        />
                        <input
                          ref={docInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                          multiple
                          onChange={(e) => handleFilePick(e.target.files)}
                          className="hidden"
                        />

                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                          onClick={() => imageInputRef.current?.click()}
                        >
                          + Photo
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                          onClick={() => videoInputRef.current?.click()}
                        >
                          + Video
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                          onClick={() => docInputRef.current?.click()}
                        >
                          + Document
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      rows={4}
                      className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-800 outline-none ring-blue-500/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />

                    {pendingFiles.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pendingFiles.map((file, index) => (
                          <span
                            key={`${file.name}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                          >
                            {file.name}
                            <button
                              type="button"
                              className="font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                              onClick={() => removePendingFile(index)}
                              aria-label={`Remove ${file.name}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 space-y-3">
                    {interactionState.comments.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        No comments yet. Start the discussion.
                      </p>
                    ) : (
                      interactionState.comments.map((item) => (
                        <article
                          key={item.id}
                          className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {item.author}
                            </p>
                            <time className="text-xs text-slate-500 dark:text-slate-400">
                              {new Date(item.createdAt).toLocaleString()}
                            </time>
                          </div>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
                            {item.text}
                          </p>
                          {item.attachments.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.attachments.map((name) => (
                                <span
                                  key={`${item.id}-${name}`}
                                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                >
                                  {name}
                                </span>
                              ))}
                            </div>
                          )}
                        </article>
                      ))
                    )}
                  </div>
                </section>
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
