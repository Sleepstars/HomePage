import { defineMiddleware } from 'astro:middleware';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLanguage, languages, type Language } from './i18n/translations';

const supportedLocales = Object.keys(languages);
const supportedLocaleSet = new Set(supportedLocales);

const normalize = (value?: string | null) => value?.toLowerCase();

const resolveLocale = (value?: string | null): Language | undefined => {
  if (!value) return undefined;
  const normalized = normalize(value);
  return supportedLocales.find((locale) => locale.toLowerCase() === normalized) as Language | undefined;
};

const extractLocaleFromPath = (pathname: string): Language | undefined => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (!firstSegment) return undefined;
  return resolveLocale(firstSegment);
};

const shouldBypass = (request: Request) => {
  const method = request.method.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') return true;
  const accept = request.headers.get('accept') ?? '';
  return !accept.includes('text/html');
};

export const onRequest = defineMiddleware((context, next) => {
  if (shouldBypass(context.request)) {
    return next();
  }

  const cookieLocale = resolveLocale(context.cookies.get('preferred-language')?.value);
  const headerLocale = resolveLocale(context.preferredLocale);
  const targetLocale = cookieLocale ?? headerLocale;

  if (!targetLocale || targetLocale === defaultLanguage) {
    const pathLocale = extractLocaleFromPath(context.url.pathname);
    if (pathLocale && pathLocale === defaultLanguage) {
      const normalizedPath = context.url.pathname.replace(new RegExp(`^/${pathLocale}`), '') || '/';
      return context.redirect(`${normalizedPath}${context.url.search}`, 301);
    }
    return next();
  }

  const currentLocale = extractLocaleFromPath(context.url.pathname);
  if (currentLocale === targetLocale) {
    return next();
  }

  if (currentLocale && supportedLocaleSet.has(currentLocale)) {
    return next();
  }

  const relativeTargetPath = context.url.pathname === '/' ? '' : context.url.pathname.slice(1);
  const redirectPath = getRelativeLocaleUrl(targetLocale, relativeTargetPath);
  const search = context.url.search ?? '';
  const hash = context.url.hash ?? '';
  return context.redirect(`${redirectPath}${search}${hash}`, 302);
});
