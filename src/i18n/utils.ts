import en from './en.json';
import ua from './ua.json';

const translations = { en, ua } as const;

export type Locale = 'en' | 'ua';

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'ua') return 'ua';
  return 'en';
}

export function t(locale: Locale): typeof en {
  return translations[locale];
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return `/${locale}${path}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ua' : 'en';
}

type LocalizedString = { en: string; ua: string };

export function l(obj: LocalizedString, locale: Locale): string {
  return obj[locale];
}
