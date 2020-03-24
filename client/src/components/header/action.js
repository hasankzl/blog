import i18n from "../../i18n"
import { LANG_CHANGE } from "../../utils/actionTypes";


export default language => {
    i18n.changeLanguage(language);
    localStorage.setItem("currentLang", language);
    return {
        type: LANG_CHANGE,
        payload: {
            lang: language
        }
    }
}
