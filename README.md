# 深海笔记 — 个人主页

> 深海蓝主题 · 艺术氛围 · 内容驱动 · Next.js 16 + MDX

一个以内容为核心、深海蓝为基调的个人主页网站。通过极简的信息架构和克制的视觉动效，营造沉静、高级的阅读体验。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **内容**: MDX (`next-mdx-remote`)
- **样式**: Tailwind CSS v4
- **动效**: Framer Motion
- **代码高亮**: `rehype-pretty-code`
- **部署**: Vercel

## 页面

| 路由 | 说明 |
|------|------|
| `/` | 首页 — Hero + 粒子背景 + 精选文章 |
| `/posts` | 文章列表 — 按年月分组时间线 |
| `/posts/[slug]` | 文章详情 — MDX 渲染 + 代码高亮 |
| `/about` | 关于页 |

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 写文章

在 `src/content/` 下创建 `.mdx` 文件：

```mdx
---
title: '文章标题'
description: '简短摘要'
date: '2026-06-21'
tags: ['技术', 'Web']
featured: true
---

文章正文（Markdown + 可选 React 组件）
```

`git push` 后 Vercel 自动部署。

## 构建

```bash
npm run build
```
