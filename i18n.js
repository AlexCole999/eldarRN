import 'intl-pluralrules'; // Добавляем полифил
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from './locales/en/translation.json';
import * as ge from './locales/ge/translation.json';
import * as uz from './locales/uz/translation.json';
import * as ru from './locales/ru/translation.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ge: { translation: ge },
      uz: { translation: uz },
      ru: { translation: ru },
    },
    lng: 'ru', // Установите язык по умолчанию
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react уже выполняет экранирование
    }
  });

export default i18n;
