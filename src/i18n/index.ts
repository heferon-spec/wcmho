import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zu from "./locales/zu.json";
import af from "./locales/af.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import es from "./locales/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zu: { translation: zu },
      af: { translation: af },
      fr: { translation: fr },
      pt: { translation: pt },
      es: { translation: es },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

export const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zu", label: "isiZulu", flag: "🇿🇦" },
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];
