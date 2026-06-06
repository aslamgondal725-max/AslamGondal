import { type FormEvent, useEffect, useRef, useState } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Link as LinkIcon, Share2 } from "react-feather";
import { getAllPostsMeta, getPostBySlug, type BlogPost } from "../../lib/blog";

type Props = {
  post: BlogPost;
};

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
  const [linkCopied, setLinkCopied] = useState(false);
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

  const getCurrentUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    const url = getCurrentUrl();
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 1800);
  };

  const handleNativeShare = async () => {
    const url = getCurrentUrl();
    if (!url) return;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: frontMatter.title,
          text: frontMatter.excerpt ?? frontMatter.title,
          url,
        });
        return;
      } catch {
        // user canceled share
      }
    }

    await handleCopyLink();
  };

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        {frontMatter.excerpt && (
          <meta name="description" content={frontMatter.excerpt} />
        )}
      </Head>

      <article className="mx-auto w-full max-w-3xl">
        <Link href="/blogs" className="cta-link">
          Back to Blog
        </Link>

        <header className="mt-6 border-b border-line pb-8">
          <p className="eyebrow">Research Note</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            {frontMatter.title}
          </h1>

          {frontMatter.excerpt && (
            <p className="section-subtext max-w-2xl">{frontMatter.excerpt}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-mut">
            <span>{formattedDate}</span>
            <span aria-hidden="true">/</span>
            <span>{readingMinutes} min read</span>
          </div>

          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {frontMatter.tags.map((t: string) => (
                <span key={t} className="soft-chip">
                  {t}
                </span>
              ))}
            </div>
          )}

          {frontMatter.paperTitle && frontMatter.paperUrl && (
            <div className="mt-5 surface-card p-4">
              <div className="eyebrow">Source Paper</div>
              <a
                href={frontMatter.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-semibold leading-6 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {frontMatter.paperTitle}
              </a>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="btn-ghost px-4 py-2 text-xs"
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn-ghost px-4 py-2 text-xs"
            >
              <LinkIcon size={14} />
              {linkCopied ? "Copied" : "Copy link"}
            </button>
          </div>
        </header>

        <div
          className="prose prose-blog mt-8 max-w-none text-ink-soft"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <section className="mt-12 border-t border-line pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="section-heading">Reactions and Comments</h2>
            <span className="eyebrow">
              {interactionState.comments.length} comments
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {reactionOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => handleReaction(option.key)}
                className="btn-ghost px-4 py-2 text-sm"
              >
                {option.label}
                <span className="rounded-sm border border-line bg-paper-card px-2 py-0.5 text-xs text-ink-soft">
                  {interactionState.reactions[option.key]}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={submitComment} className="mt-6 surface-card p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
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
                  className="rounded-sm border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  onClick={() => imageInputRef.current?.click()}
                >
                  + Photo
                </button>
                <button
                  type="button"
                  className="rounded-sm border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  onClick={() => videoInputRef.current?.click()}
                >
                  + Video
                </button>
                <button
                  type="button"
                  className="rounded-sm border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
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
              className="mt-3 w-full resize-y rounded-sm border border-line bg-paper px-3 py-2 text-sm leading-6 text-ink outline-none transition-colors focus:border-ink"
            />

            {pendingFiles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {pendingFiles.map((file, index) => (
                  <span
                    key={`${file.name}-${index}`}
                    className="inline-flex items-center gap-2 rounded-sm border border-line bg-paper-card px-3 py-1 text-xs text-ink-soft"
                  >
                    {file.name}
                    <button
                      type="button"
                      className="font-bold text-ink-mut transition-colors hover:text-ink"
                      onClick={() => removePendingFile(index)}
                      aria-label={`Remove ${file.name}`}
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button type="submit" className="btn-ink">
                Post Comment
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {interactionState.comments.length === 0 ? (
              <p className="rounded-sm border border-dashed border-line-strong px-4 py-3 text-sm text-ink-mut">
                No comments yet. Start the discussion.
              </p>
            ) : (
              interactionState.comments.map((item) => (
                <article key={item.id} className="surface-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink">
                      {item.author}
                    </p>
                    <time className="text-xs text-ink-mut">
                      {new Date(item.createdAt).toLocaleString()}
                    </time>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-ink-soft">
                    {item.text}
                  </p>
                  {item.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.attachments.map((name) => (
                        <span
                          key={`${item.id}-${name}`}
                          className="inline-flex items-center rounded-sm border border-line bg-paper-card px-2.5 py-1 text-xs text-ink-soft"
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
