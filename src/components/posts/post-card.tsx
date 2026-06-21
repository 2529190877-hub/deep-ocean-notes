"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";
import { Tag } from "@/components/ui/tag";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, readingTime } = post;
  const date = new Date(frontmatter.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <article className="card-glow h-full flex flex-col p-6 rounded-xl border border-bg-tertiary bg-bg-secondary hover:border-accent/30 transition-colors">
          {/* 装饰首字母 */}
          <div className="font-playfair text-4xl text-accent/20 mb-4 select-none">
            {frontmatter.title.charAt(0)}
          </div>

          <h3 className="font-playfair text-xl text-text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
            {frontmatter.title}
          </h3>

          <p className="text-text-muted text-sm mb-4 flex-1 line-clamp-2">
            {frontmatter.description}
          </p>

          <div className="flex items-center justify-between text-xs text-text-muted mt-auto pt-4 border-t border-bg-tertiary">
            <span>{date}</span>
            <span>{readingTime} 分钟</span>
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </article>
      </Link>
    </motion.div>
  );
}
