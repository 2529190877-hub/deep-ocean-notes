import Link from "next/link";
import type { Post } from "@/lib/posts";
import { Tag } from "@/components/ui/tag";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface PostListProps {
  groups: { year: string; posts: Post[] }[];
}

export function PostList({ groups }: PostListProps) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-20 text-text-muted">
        还没有文章，敬请期待。
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groups.map(({ year, posts }) => (
        <section key={year}>
          <ScrollReveal>
            <h2 className="font-playfair text-2xl text-text-primary mb-6 flex items-center gap-4">
              {year}
              <span className="flex-1 h-px bg-bg-tertiary" />
            </h2>
          </ScrollReveal>

          <div className="space-y-1">
            {posts.map((post, i) => {
              const date = new Date(post.frontmatter.date).toLocaleDateString(
                "zh-CN",
                { month: "2-digit", day: "2-digit" }
              );

              return (
                <ScrollReveal key={post.slug} delay={i * 0.05}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 px-3 -mx-3 rounded-lg hover:bg-bg-secondary transition-colors"
                  >
                    <time className="text-text-muted text-sm font-mono whitespace-nowrap w-14 shrink-0">
                      {date}
                    </time>

                    <span className="text-text-primary group-hover:text-accent transition-colors flex-1 text-base">
                      {post.frontmatter.title}
                    </span>

                    <span className="text-text-muted text-xs whitespace-nowrap">
                      {post.readingTime} 分钟
                    </span>

                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <span className="hidden sm:flex gap-1">
                          {post.frontmatter.tags.slice(0, 2).map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </span>
                      )}
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
