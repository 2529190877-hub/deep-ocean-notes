import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-playfair text-6xl text-text-primary mb-4">404</h1>
        <p className="text-text-secondary text-lg mb-8">
          这个页面沉入了深海，暂时找不到。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-glow transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
