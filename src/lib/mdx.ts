import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";

const prettyCodeOptions: Partial<Options> = {
  theme: "one-dark-pro",
  keepBackground: false,
};

/**
 * 编译 MDX 内容为 React 元素
 */
export async function compileMdx(source: string) {
  return compileMDX({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });
}
