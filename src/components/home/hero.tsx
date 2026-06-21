"use client";

import { Link } from "@/components/ui/link";
import { ParticleBg } from "./particle-bg";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 深海渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />

      {/* 粒子动效 */}
      <ParticleBg />

      {/* 光晕装饰 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.h1
          className="font-playfair text-5xl sm:text-6xl md:text-7xl text-text-primary leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          深海笔记
        </motion.h1>

        <motion.p
          className="text-text-secondary text-lg md:text-xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          一个关于技术、生活与思考的个人空间。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-base font-medium text-text-primary hover:text-accent transition-colors"
          >
            阅读文章
            <span className="text-accent">→</span>
          </Link>
        </motion.div>
      </div>

      {/* 底部渐变消退 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
