import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {locales} from "./locales";
import * as RNLocalize from "react-native-localize";

i18n
    .use(initReactI18next) // passes locales down to react-i18next
    .init({
        resources: locales,
        fallbackLng: "en",
        lng: RNLocalize.getLocales()[0].languageCode,
        keySeparator: false,
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;