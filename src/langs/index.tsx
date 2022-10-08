import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ar from './ar';
import en from './en';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';
// export const APP_LANG = I18nManager.isRTL ? "ar" : "en";
I18nManager.allowRTL(true);
export const isRTL = I18nManager.isRTL;
const resources = {en, ar};

const LANG_CODES = Object.keys(resources);

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    AsyncStorage.getItem('user-language', (err, language) => {
      // console.log("langL ", language);
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);

        callback(findBestAvailableLanguage?.languageTag || 'en');

        // callback("ar");
        return;
      }
      callback(language);
      // callback("ar");
    });
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  // detect language
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources,
    whitelist: ['en', 'ar'],
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {useSuspense: false},
  });

export default i18n;
