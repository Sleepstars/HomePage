export const languages = {
  en: 'English',
  zh: '中文'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    'site.title': 'Sleepstars 的小站',
    'site.description': 'AI enthusiast, student & indie developer',
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.talks': 'Talks',
    'nav.media': 'Media',
    'nav.sponsors': 'Sponsors',
    'nav.chat': "Let's Chat",
    'social.title': 'Find me on',
    'social.email': 'You can definitely reach me at',
    'blog.title': 'Latest Blog Posts',
    'blog.viewAll': 'View all posts →',
    'footer.builtWith': 'Built with',
    'footer.and': 'and'
  },
  zh: {
    'site.title': 'Sleepstars 的小站',
    'site.description': 'AI 爱好者，学生 & 独立开发者',
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.projects': '项目',
    'nav.talks': '演讲',
    'nav.media': '媒体',
    'nav.sponsors': '赞助商',
    'nav.chat': '聊天',
    'social.title': '在这里找到我',
    'social.email': '用邮件一定能找到我',
    'blog.title': '最新博客文章',
    'blog.viewAll': '查看所有文章 →',
    'footer.builtWith': '使用',
    'footer.and': '和'
  }
} as const;
