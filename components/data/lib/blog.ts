import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogFrontMatter = {
  title: string;
  date: string; // ISO-ish string
  slug: string;
  excerpt?: string;
  tags?: string[];
  paperTitle?: string;
  paperUrl?: string;
};

export type BlogPost = {
  frontMatter: BlogFrontMatter;
  content: string; // HTML
};

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

function getAllBlogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

export function getAllPostsMeta(): BlogFrontMatter[] {
  const files = getAllBlogFiles();
  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    // Defensive defaults so build never fails
    const fm: BlogFrontMatter = {
      title: String(data.title ?? "Untitled post"),
      date: String(data.date ?? "1970-01-01"),
      slug: String(data.slug ?? file.replace(/\.(md|mdx)$/, "")),
      excerpt: data.excerpt ? String(data.excerpt) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      paperTitle: data.paperTitle ? String(data.paperTitle) : undefined,
      paperUrl: data.paperUrl ? String(data.paperUrl) : undefined,
    };

    return fm;
  });

  // newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const files = getAllBlogFiles();

  // find file whose frontmatter.slug matches OR filename matches
  let chosenPath: string | null = null;

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const fmSlug = data?.slug ? String(data.slug) : file.replace(/\.(md|mdx)$/, "");
    if (fmSlug === slug) {
      chosenPath = fullPath;
      break;
    }
  }

  // fallback to filename match
  if (!chosenPath) {
    const byName = files.find((f) => f.replace(/\.(md|mdx)$/, "") === slug);
    if (byName) chosenPath = path.join(BLOG_DIR, byName);
  }

  if (!chosenPath) return null;

  const raw = fs.readFileSync(chosenPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const frontMatter: BlogFrontMatter = {
    title: String(data.title ?? "Untitled post"),
    date: String(data.date ?? "1970-01-01"),
    slug: String(data.slug ?? slug),
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    paperTitle: data.paperTitle ? String(data.paperTitle) : undefined,
    paperUrl: data.paperUrl ? String(data.paperUrl) : undefined,
  };

  return { frontMatter, content: contentHtml };
}