import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

interface PostNavigationProps {
  currentSlug: string;
}

export async function PostNavigation({ currentSlug }: PostNavigationProps) {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-bg-tertiary">
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="group flex-1 text-left"
          >
            <span className="text-xs text-text-muted mb-1 block">← 上一篇</span>
            <span className="text-text-secondary group-hover:text-accent transition-colors text-sm">
              {prev.frontmatter.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="group flex-1 text-right"
          >
            <span className="text-xs text-text-muted mb-1 block">下一篇 →</span>
            <span className="text-text-secondary group-hover:text-accent transition-colors text-sm">
              {next.frontmatter.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
