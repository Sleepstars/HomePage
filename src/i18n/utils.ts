import { translations, languages, type Language } from './translations';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return 'en';
}

export function useTranslations(lang: Language) {
  return function t(key: keyof typeof translations['en']) {
    return translations[lang][key] || translations['en'][key];
  }
}

export function useTranslatedPath(lang: Language) {
  return function translatePath(path: string) {
    return lang === 'en' ? path : `/${lang}${path}`;
  }
}

export function getLanguageFromBrowser(): Language {
  if (typeof navigator === 'undefined') return 'en';

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('zh')) {
    return 'zh';
  }

  return 'en';
}
