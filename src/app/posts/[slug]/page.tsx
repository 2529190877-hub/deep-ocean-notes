import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { compileMdx } from "@/lib/mdx";
import { Prose } from "@/components/mdx/prose";
import { Tag } from "@/components/ui/tag";
import { PostNavigation } from "@/components/posts/post-navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

/** 静态生成所有文章页面 */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** 动态 SEO 元数据 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMdx(post.content);

  const date = new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <article className="max-w-2xl mx-auto">
        {/* 返回链接 */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          ← 所有文章
        </Link>

        {/* 标题区 */}
        <header className="mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl text-text-primary leading-tight mb-4">
            {post.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
            <time>{date}</time>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </header>

        {/* 正文 */}
        <Prose>{content}</Prose>

        {/* 上下篇导航 */}
        <PostNavigation currentSlug={slug} />
      </article>
    </div>
  );
}
