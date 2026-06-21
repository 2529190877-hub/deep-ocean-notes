import type { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

/**
 * 代码块容器 —— 配合 rehype-pretty-code 输出的 HTML。
 * rehype-pretty-code 已生成完整的 <figure>/<pre>/<code> 结构，
 * 此组件提供外层包裹和文件名/语言标签展示。
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const lang = className?.replace("language-", "") || "";

  return (
    <div className="relative group my-6">
      {lang && (
        <div className="absolute top-2 right-3 text-xs text-text-muted uppercase tracking-wide">
          {lang}
        </div>
      )}
      {children}
    </div>
  );
}
