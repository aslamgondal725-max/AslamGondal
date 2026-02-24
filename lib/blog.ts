import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

export type BlogFrontMatter = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  paperTitle?: string;
  paperUrl?: string;

  // ✅ new: shown in About-page teaser
  teaserQuestion?: string;
};

// ✅ list item for index/teasers (includes slug)
export type BlogListItem = BlogFrontMatter & {
  slug: string;
};

// ✅ full post for [slug].tsx
export type BlogPost = {
  slug: string;
  frontMatter: BlogFrontMatter;
  content: string; // HTML string
};

function getBlogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

export function getAllPostsMeta(): BlogListItem[] {
  const files = getBlogFiles();

  const posts: BlogListItem[] = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const fullPath = path.join(BLOG_DIR, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "1970-01-01"),
      excerpt: data.excerpt ? String(data.excerpt) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      paperTitle: data.paperTitle ? String(data.paperTitle) : undefined,
      paperUrl: data.paperUrl ? String(data.paperUrl) : undefined,
    };
  });

  // newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

// ✅ alias used by some pages/components
export function getAllPosts(): BlogListItem[] {
  return getAllPostsMeta();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
    ? mdxPath
    : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const frontMatter: BlogFrontMatter = {
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    paperTitle: data.paperTitle ? String(data.paperTitle) : undefined,
    paperUrl: data.paperUrl ? String(data.paperUrl) : undefined,
    teaserQuestion: data.teaserQuestion ? String(data.teaserQuestion) : undefined,
  };

  return { slug, frontMatter, content: contentHtml };
}