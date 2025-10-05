# 个人主页

使用 **Astro**、**Tailwind CSS** 与 **MDX** 构建的极简个人主页。

## ✨ 功能

- 🎨 **极简设计** - 干净且优雅的界面
- 🌓 **暗/亮模式** - 根据系统偏好自动切换主题
- 🌍 **多语言支持** - 自动检测浏览器语言并记住用户偏好（英文/中文）
- 🎭 **动画背景** - 细腻的粒子效果和渐变
- 👤 **头像支持** - 在页眉和网站图标中显示你的照片
- 🔗 **社交媒体链接** - 可轻松配置并切换显示状态
- 📝 **MDX 支持** - 使用 Markdown 与 JSX 编写内容
- ⚡ **快速且优化** - 基于 Astro 构建，性能极佳

## 🚀 快速开始

### 前置条件

- Node.js 18+
- npm、pnpm 或 yarn

### 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产环境
npm run build

# 本地预览构建产物
npm run preview
```

## 🎨 定制指南

### 1. 更新头像

替换头像图片：

```bash
# 用你的头像替换 public/avatar.png
cp your-avatar.png public/avatar.png
```

### 2. 配置社交媒体链接

编辑 `src/pages/index.astro`（中文页面请编辑 `src/pages/zh/index.astro`）：

```typescript
const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',  // 更新链接
    icon: '&#128187;',
    enabled: true  // 设置为 false 可隐藏
  },
  // 继续添加更多社交链接...
];
```

### 3. 更新个人信息

编辑 `src/i18n/translations.ts` 中的翻译：

```typescript
export const translations = {
  en: {
    'site.title': 'Your Name',
    'site.description': 'Your description',
    'hero.greeting': 'Your introduction...',
    // 更新其他字段…
  },
  zh: {
    'site.title': '你的名字',
    'site.description': '你的描述',
    // 更新中文翻译…
  }
};
```

### 4. 添加更多语言

1. 在 `astro.config.mjs` 中添加语言环境：

```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'zh', 'ja'],  // 新增 'ja'（日语）
}
```

2. 更新 `src/i18n/translations.ts`：

```typescript
export const languages = {
  en: 'English',
  zh: '中文',
  ja: '日本語'
};

export const translations = {
  // 添加日语翻译
  ja: {
    'site.title': 'あなたの名前',
    // …
  }
};
```

3. 为日语创建 `src/pages/ja/index.astro` 页面

### 5. 自定义颜色与样式

编辑 `src/styles/global.css` 以修改主题颜色：

```css
@theme {
  --color-background-light: #ffffff;
  --color-background-dark: #0a0a0a;
  /* 自定义其他颜色… */
}
```

### 6. 修改动画效果

编辑 `src/components/AnimatedBackground.astro` 以自定义粒子效果：

- 更改粒子数量
- 调整颜色与尺寸
- 修改动画时长

## 📁 项目结构

```
/
├── public/
│   └── avatar.png          # 你的头像图片
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.astro
│   │   ├── ThemeToggle.astro
│   │   ├── LanguagePicker.astro
│   │   └── SocialLinks.astro
│   ├── i18n/
│   │   ├── translations.ts  # 所有翻译
│   │   └── utils.ts         # i18n 工具函数
│   ├── layouts/
│   │   └── Layout.astro     # 主布局
│   ├── pages/
│   │   ├── index.astro      # 英文首页
│   │   └── zh/
│   │       └── index.astro  # 中文首页
│   └── styles/
│       └── global.css       # 全局样式
├── astro.config.mjs         # Astro 配置
└── package.json
```

## 🛠️ 技术栈

- **[Astro](https://astro.build)** – Web 框架
- **[Tailwind CSS](https://tailwindcss.com)** – 样式框架
- **[MDX](https://mdxjs.com)** – Markdown + JSX
- **TypeScript** – 类型安全

## 🧞 命令

所有命令均在项目根目录的终端中运行：

| 命令                     | 操作说明                                             |
| :----------------------- | :--------------------------------------------------- |
| `npm install`            | 安装依赖                                             |
| `npm run dev`            | 在 `localhost:4321` 启动本地开发服务器               |
| `npm run build`          | 将站点构建到 `./dist/`                               |
| `npm run preview`        | 本地预览构建产物，便于部署前检查                     |
| `npm run astro ...`      | 运行 CLI 命令，如 `astro add`、`astro check`          |
| `npm run astro -- --help`| 查看 Astro CLI 的帮助信息                            |

## 📝 许可证

MIT

## 🙏 致谢

使用 ❤️ 由 Astro 与 Tailwind CSS 搭建。