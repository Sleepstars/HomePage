export const languages = {
  en: 'English',
  zh: '简体中文'
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'en';

export const translations = {
  en: {
    'site.title': 'Sleepstars 的小站',
    'site.description': 'AI enthusiast, student & indie developer',
    'nav.home': 'About',
    'nav.blog': 'Blog',
    'nav.projects': 'My Projects',
    'nav.talks': 'Talks',
    'nav.media': 'Media',
    'nav.sponsors': 'Sponsors',
    'nav.chat': "Let's Chat",
    'social.title': 'Where to find me',
    'social.email': 'You can definitely reach me at',
    'blog.title': 'Latest Blog Posts',
    'blog.viewAll': 'View all posts →',
    'blog.rss': 'RSS Feed',
    'footer.builtWith': 'Built with',
    'footer.and': 'and'
  },
  zh: {
    'site.title': 'Sleepstars 的小站',
    'site.description': 'AI 爱好者，学生 & 独立开发者',
    'nav.home': '关于',
    'nav.blog': '博客',
    'nav.projects': '我的项目',
    'nav.talks': '演讲',
    'nav.media': '媒体',
    'nav.sponsors': '赞助商',
    'nav.chat': '聊天',
    'social.title': '在哪里找到我',
    'social.email': '用邮件一定能找到我',
    'blog.title': '最新博客文章',
    'blog.viewAll': '查看所有文章 →',
    'blog.rss': 'RSS 订阅',
    'footer.builtWith': '使用',
    'footer.and': '和'
  }
} as const;
