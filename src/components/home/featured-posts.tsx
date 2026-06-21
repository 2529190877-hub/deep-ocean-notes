import type { Post } from "@/lib/posts";
import { PostCard } from "@/components/posts/post-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/components/ui/link";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-playfair text-3xl text-text-primary">
              精选文章
            </h2>
            <Link href="/posts" className="text-sm text-text-secondary">
              查看全部 →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <PostCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
