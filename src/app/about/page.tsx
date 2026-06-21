import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于我和这个空间。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-prose-width mx-auto">
        <ScrollReveal>
          <h1 className="font-playfair text-4xl text-text-primary mb-12">
            关于
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            你好，我是这个空间的作者。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            &ldquo;深海笔记&rdquo;这个名字来源于对深海的想象
            —— 沉静、深邃、不被轻易打扰。这里是我与技术、书籍和生活对话的地方。
            不追求更新频率，只追求每次记录都有意义。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            目前我专注于写代码、读好书、探索有趣的想法。
            如果你对这里的内容感兴趣，欢迎通过邮件与我交流。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 pt-8 border-t border-bg-tertiary">
            <h2 className="font-playfair text-xl text-text-primary mb-4">
              联系方式
            </h2>
            <div className="space-y-2 text-text-secondary">
              <p>
                <span className="text-text-muted">GitHub：</span>
                <a
                  href={SITE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-glow transition-colors ml-2"
                >
                  {SITE.social.github.replace("https://github.com/", "")}
                </a>
              </p>
              <p>
                <span className="text-text-muted">邮箱：</span>
                <a
                  href={`mailto:${SITE.social.email}`}
                  className="text-accent hover:text-accent-glow transition-colors ml-2"
                >
                  {SITE.social.email}
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
