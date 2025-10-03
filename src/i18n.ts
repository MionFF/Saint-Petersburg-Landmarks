// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'es', 'fr', 'de'],
    ns: ['common', 'places'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'cookie'],
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie'],
    },
    partialBundledLanguages: true,
  })

export default i18n
