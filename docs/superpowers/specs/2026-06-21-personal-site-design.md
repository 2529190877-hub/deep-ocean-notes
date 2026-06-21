# 个人主页网站 · 设计文档

> **项目编号**: project_001
> **创建日期**: 2026-06-21
> **状态**: 设计已确认，待实现

---

## 一、项目概述

### 1.1 定位

一个以内容为核心、艺术氛围为导向的个人主页网站。风格关键词：**深海 · 克制 · 文学感 · 高级**。

### 1.2 核心目标

- 展示个人文章（技术 + 生活 + 读书笔记等综合随笔）
- 通过视觉设计传递个人审美品味
- 轻量、可长期维护、内容所有权归作者

### 1.3 非目标

- 不做评论系统（静默阅读体验）
- 不做搜索功能（初期内容量不需要）
- 不做订阅/Newsletter（可在后续迭代）
- 不做后台 CMS（用文件系统管理内容）

---

## 二、技术架构

### 2.1 技术选型

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | Next.js 15 + App Router | RSC 天然适合内容站，SSG 首屏秒开 |
| 内容引擎 | `next-mdx-remote` | 服务端编译 MDX，支持自定义组件嵌入 |
| 样式 | Tailwind CSS + CSS 自定义属性 | 主题色系统、响应式排版 |
| 动效 | Framer Motion | 页面过渡、滚动揭示、微交互 |
| 字体 | Google Fonts | Playfair Display + Inter + JetBrains Mono |
| 代码高亮 | `rehype-pretty-code` | 服务端语法高亮，零客户端 JS |
| 部署 | Vercel (Hobby) | 零配置、自动 CI/CD、免费 |

### 2.2 目录结构

```
project_001_personal_site/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # 根布局：字体加载、全局元数据、主题 Provider
│   │   ├── page.tsx              # 首页：Hero + 精选文章 + 底部
│   │   ├── posts/
│   │   │   ├── page.tsx          # 文章列表：按年月分组的时间线
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 文章详情：MDX 渲染 + 导航
│   │   └── about/
│   │       └── page.tsx          # 关于页：简短自我介绍
│   ├── components/
│   │   ├── layout/               # 布局组件
│   │   │   ├── header.tsx        # 顶部导航
│   │   │   ├── footer.tsx        # 底部社交链接
│   │   │   └── container.tsx     # 内容容器（阅读宽度约束）
│   │   ├── home/
│   │   │   ├── hero.tsx          # 首屏 Hero 区
│   │   │   ├── particle-bg.tsx   # 深海粒子/光晕背景动效
│   │   │   └── featured-posts.tsx # 精选文章卡片
│   │   ├── posts/
│   │   │   ├── post-card.tsx     # 文章卡片
│   │   │   ├── post-list.tsx     # 文章列表（按年月分组）
│   │   │   └── post-navigation.tsx # 上一篇/下一篇导航
│   │   ├── mdx/                  # MDX 自定义组件
│   │   │   ├── prose.tsx         # 文章正文容器（排版样式）
│   │   │   ├── code-block.tsx    # 代码块
│   │   │   └── callout.tsx       # 提示/引用块
│   │   └── ui/                   # 通用 UI 原子组件
│   │       ├── link.tsx          # 链接（悬停动效）
│   │       ├── tag.tsx           # 标签
│   │       └── divider.tsx       # 装饰分割线
│   ├── lib/
│   │   ├── posts.ts              # 文章读取、解析、排序工具函数
│   │   ├── mdx.ts                # MDX 编译配置
│   │   └── constants.ts          # 站点常量（名称、描述、社交链接等）
│   ├── content/                  # ✦ Markdown/MDX 文章存放目录
│   │   ├── hello-world.mdx
│   │   └── ...
│   └── styles/
│       ├── globals.css           # 全局样式 + CSS 自定义属性
│       └── prose.css             # 文章排版专用样式
├── public/
│   ├── images/                   # 文章配图
│   └── favicon.ico
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 2.3 数据流

```
content/*.mdx                    # 文章源文件（Markdown + 可选 React 组件）
    │
    ▼
lib/posts.ts                     # 读取文件系统 → 解析 frontmatter → 排序 → 返回 Post[]
    │
    ├──→ app/posts/page.tsx      # 静态生成文章列表
    ├──→ app/posts/[slug]/page.tsx  # 静态生成每篇文章详情
    └──→ app/page.tsx            # 获取最新 3 篇精选
```

所有页面在构建时静态生成（`generateStaticParams`），运行时零数据请求。

---

## 三、视觉设计

### 3.1 色彩系统

```css
/* 深海基调 */
--bg-primary:     #0a1628;   /* 最深背景（Hero 区） */
--bg-secondary:   #0f1f38;   /* 次级背景（卡片、文章区） */
--bg-tertiary:    #152544;   /* 悬浮态、边框、分割线 */

/* 文字层级 */
--text-primary:   #e8edf4;   /* 正文白，略带蓝灰不刺眼 */
--text-secondary: #8899b4;   /* 次要文字、日期、元信息 */
--text-muted:     #4a5f7a;   /* 极弱文字、装饰性元素 */

/* 强调 */
--accent:         #3b82f6;   /* 主强调色：链接、按钮、激活态 */
--accent-glow:    #60a5fa;   /* 悬停发光、焦点环 */
--gold:           #c9a96e;   /* 点缀金色，极小面积使用 */
```

**设计原则**：深色底 + 低对比舒适阅读 + 蓝色系层次变化 + 金色仅用于"奢侈品级"点缀。

### 3.2 字体系统

| 角色 | 字体 | 字重 | 气质 |
|------|------|------|------|
| 大标题 | Playfair Display | 700 | 优雅、文学感、有"厚度" |
| 正文 | Inter | 400/500 | 现代、干净、屏幕阅读舒适 |
| 代码 | JetBrains Mono | 400 | 技术感、工整 |

**排版原则**：大标题用衬线体拉开"艺术感"距离，正文用无衬线保证可读性，两者之间的张力本身就是一种高级表达。

### 3.3 动效设计

| 位置 | 动效 | 目的 |
|------|------|------|
| Hero 背景 | 缓慢漂浮粒子/光晕，跟随鼠标微弱位移 | 营造沉浸感，不喧宾夺主 |
| 页面过渡 | 淡入 + 微上移 (fade-up) | 软性过渡 |
| 文章卡片悬停 | 微缩放 + 边框发光 | 可点性暗示 |
| 滚动揭示 | 元素进入视口时淡入上移 | 阅读节奏感 |
| 链接悬停 | 下划线从左滑入 | 优雅的交互反馈 |

**动效铁律**：所有动效 duration ≤ 600ms，不使用弹跳（bounce），优先 easing-out。克制即高级。

---

## 四、页面设计

### 4.1 首页 `/`

**三层叙事结构**：

1. **Hero 区**（100vh）
   - 深海渐变背景 + 悬浮粒子/光晕 Canvas 动效
   - 大字姓名标题（Playfair Display，约 5-6rem）
   - 一行简短个人描述/座右铭
   - "阅读文章 →" 引导链接

2. **精选文章区**
   - 展示最新 3 篇文章
   - 卡片式陈列，每篇配装饰性首字母或抽象图形
   - 标题 + 日期 + 标签 + 简短摘要

3. **底部区**
   - 一句话关于
   - 社交链接（GitHub、Twitter/X、邮箱）
   - 极简收尾，无多余信息

### 4.2 文章列表 `/posts`

- 按年月分组的时间线式列表
- 每条：标题 + 日期 + 标签
- 不做分页（初期内容量），超过 50 篇再考虑
- 左侧返回首页链接

### 4.3 文章详情 `/posts/[slug]`

- **顶部**：返回链接 + 标题（大号 Playfair）+ 日期 + 阅读时间 + 标签
- **正文区**：650px 舒适阅读宽度居中，字号 18px，行高 1.8
- **MDX 能力**：
  - 语法高亮代码块（`rehype-pretty-code`）
  - 图片（带标题和暗色边框）
  - 引用块（装饰性左边框）
  - 数学公式（KaTeX，按需加载）
  - 自定义 Callout 组件
- **底部**：上一篇 · 下一篇导航

### 4.4 关于页 `/about`

- 大面积留白
- 简短自我介绍，像一封公开信
- 目前在做的事、兴趣领域、价值观
- 联系方式

---

## 五、内容管理

### 5.1 文章格式

每篇 MDX 文件的 frontmatter：

```yaml
---
title: '文章标题'
description: '简短摘要，显示在卡片和 SEO 中'
date: '2026-06-21'
tags: ['技术', 'Web']
featured: true          # 是否为精选文章（显示在首页）
---
```

### 5.2 发布流程

1. 在 `src/content/` 下创建 `slug-name.mdx`
2. 编写 frontmatter + 正文
3. `git commit && git push`
4. Vercel 自动构建部署

---

## 六、性能目标

| 指标 | 目标 |
|------|------|
| Lighthouse Performance | ≥ 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| 字体加载策略 | `next/font` 子集化 + `display: swap` |
| 图片 | 本地图片用 `next/image`，外部图片懒加载 |

---

## 七、兼容性

- 支持 Chrome、Firefox、Safari、Edge 最新两个大版本
- 响应式：移动端（< 768px）、平板（768-1024px）、桌面（> 1024px）
- 移动端：Hero 字号缩小、去除粒子动效（性能考虑）、文章卡片纵向堆叠

---

## 八、后续迭代（不做在 v1）

- RSS Feed 生成
- 暗色/亮色模式切换（当前仅暗色）
- 搜索功能
- 标签聚合页
- 阅读统计
- 评论系统

---

## 九、文章内容 frontmatter 规范

```yaml
---
title: '文章标题'           # 必填
description: '简短摘要'     # 必填，用于 SEO 和卡片显示
date: '2026-06-21'         # 必填，YYYY-MM-DD
tags: ['标签1', '标签2']    # 可选
featured: false            # 可选，是否在首页精选区展示
---
```

---

## 附录：设计参考关键词

- **氛围**: 深海、夜晚、沉静、思考
- **排版**: 杂志内页、文学刊物、编辑设计
- **动效**: 缓慢、流淌、呼吸、浮现
- **留白**: 克制、呼吸感、让内容成为主角
