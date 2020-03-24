import i18n from "i18next";
import en from "./langs/en";
import tr from "./langs/tr";

i18n.init({
    lng: localStorage.currentLang || "en",
    fallbackLng: "en",
    resources: {
        en,
        tr
    }
});
window.i18n = i18n;
export default i18n;