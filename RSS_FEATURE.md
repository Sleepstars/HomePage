# RSS 博客订阅功能

这个项目已配置自动从博客 RSS 源获取并显示最新文章。

## 功能特点

- ✅ 自动从 https://blog.sleepstars.net/rss.xml 获取博客文章
- ✅ 在主页的"在这里找到我"部分下方显示最新 5 篇文章
- ✅ 通过 GitHub Actions 每小时自动更新
- ✅ 支持中英文双语界面
- ✅ 响应式设计，支持深色/浅色主题

## 文件说明

### 核心文件

- `scripts/fetch-rss.js` - RSS 获取和解析脚本
- `src/data/blog-posts.json` - 存储最新博客文章的 JSON 数据
- `src/components/BlogPosts.astro` - 博客文章列表组件
- `.github/workflows/update-rss.yml` - GitHub Actions 自动更新工作流

### 修改的文件

- `src/pages/index.astro` - 英文主页，添加了博客文章部分
- `src/pages/zh/index.astro` - 中文主页，添加了博客文章部分
- `src/i18n/translations.ts` - 添加了博客相关的翻译文本
- `package.json` - 添加了 `update-rss` 脚本命令

## 手动更新

如果需要手动更新 RSS 数据，运行：

```bash
npm run update-rss
```

## GitHub Actions 配置

工作流配置为每小时运行一次（可在 `.github/workflows/update-rss.yml` 中修改 cron 表达式）。

当检测到博客文章有更新时，会自动提交并推送更改到仓库。

## 自定义

### 修改 RSS 源

在 `scripts/fetch-rss.js` 中修改 `RSS_URL` 常量：

```javascript
const RSS_URL = 'https://your-blog.com/rss.xml';
```

### 修改显示文章数量

在 `scripts/fetch-rss.js` 中修改：

```javascript
const latestPosts = posts.slice(0, 5); // 改为你想要的数量
```

### 自定义样式

编辑 `src/components/BlogPosts.astro` 中的 Tailwind CSS 类名来调整样式。
