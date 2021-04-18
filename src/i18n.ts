import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./locales/en/translation.json";
import translationSpa from "./locales/es/translation.json";
// import translationFre from "./locales/fre/translation.json";
// import translationHin from "./locales/hin/translation.json";
// import translationJap from "./locales/jap/translation.json";
// i18n
//   .use(XHR)
//   .use(LanguageDetector)
//   .init({
//     debug: true,
//     lng: "en",
//     fallbackLng: "en", // use en if detected lng is not available

//     keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false // react already safes from xss
//     },

//     resources: {
//       en: {
//         translations: translationEng
//       },
//       es: {
//         translations: translationSpa
//       }
//     },
//     // have a common namespace used around the full app
//     ns: ["translations"],
//     defaultNS: "translations"
//   });

// export default i18n;

import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: translationEng,
  },
  es: {
    translation: translationSpa,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
