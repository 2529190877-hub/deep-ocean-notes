import { getAllPosts, groupPostsByYear } from "@/lib/posts";
import { PostList } from "@/components/posts/post-list";

export const metadata = {
  title: "所有文章",
  description: "浏览所有文章，按年份归档。",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const groups = groupPostsByYear(posts);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-playfair text-4xl text-text-primary mb-12">
          所有文章
        </h1>
        <PostList groups={groups} />
      </div>
    </div>
  );
}
