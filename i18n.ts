import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import de from './locales/de.json'; // Add other languages as needed

// Language detector
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (language) {
        callback(language);
      } else {
        callback(Localization.getLocales()); // Use device language
      }
    });
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Default language
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
