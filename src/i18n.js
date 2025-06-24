import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import en from '../locales/en.json';
import de from '../locales/de.json';
import hi from '../locales/hi.json';  // <-- add this

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      hi: { translation: hi },      // <-- and this
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
