import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

/** 文章 frontmatter 类型 */
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  hideMeta?: boolean;
}

/** 文章完整类型 */
export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number; // 分钟
  content: string; // 原始 MDX 内容
  excerpt: string; // 前 200 字摘要
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

/**
 * 从文件系统读取所有 MDX 文章
 */
function readAllMdxFiles(): { slug: string; content: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const filenames = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return filenames.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const content = fs.readFileSync(filePath, "utf-8");
    return { slug, content };
  });
}

/**
 * 获取所有文章（按日期倒序排列）
 */
export async function getAllPosts(): Promise<Post[]> {
  const files = readAllMdxFiles();

  const posts = files.map(({ slug, content }) => {
    const { data, content: body } = matter(content);
    const stats = readingTime(body);

    return {
      slug,
      frontmatter: {
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString().split("T")[0],
        tags: data.tags || [],
        featured: data.featured || false,
        hideMeta: data.hideMeta || false,
      },
      readingTime: Math.ceil(stats.minutes),
      content,
      excerpt: body.replace(/[#*\n`]/g, "").slice(0, 200).trim() + "...",
    };
  });

  // 按日期倒序排序
  posts.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });

  return posts;
}

/**
 * 根据 slug 获取单篇文章
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * 获取所有文章的 slug 列表（用于 generateStaticParams）
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

/**
 * 获取精选文章（featured: true，最多 N 篇）
 */
export async function getFeaturedPosts(count = 3): Promise<Post[]> {
  const posts = await getAllPosts();
  const featured = posts.filter((p) => p.frontmatter.featured);
  // 如果标记的精选不够，用最新的补齐
  if (featured.length < count) {
    const rest = posts.filter((p) => !p.frontmatter.featured);
    featured.push(...rest.slice(0, count - featured.length));
  }
  return featured.slice(0, count);
}

/**
 * 按年份分组文章
 */
export function groupPostsByYear(
  posts: Post[]
): { year: string; posts: Post[] }[] {
  const map = new Map<string, Post[]>();

  for (const post of posts) {
    const year = post.frontmatter.date.split("-")[0];
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(post);
  }

  return Array.from(map.entries())
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map(([year, posts]) => ({ year, posts }));
}
