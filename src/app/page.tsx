import { getFeaturedPosts } from "@/lib/posts";
import { Hero } from "@/components/home/hero";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { SITE } from "@/lib/constants";

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts(3);

  return (
    <>
      <Hero />

      <FeaturedPosts posts={featuredPosts} />

      {/* 底部：简短介绍 + 社交链接 */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            在深海中思考，在文字中沉淀。
            <br />
            欢迎随时通过邮件与我交流。
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${SITE.social.email}`}
              className="text-text-muted hover:text-accent transition-colors"
            >
              邮件
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
