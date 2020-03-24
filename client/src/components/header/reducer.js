import i18n from "../../i18n"
import action from "./action"
import { LANG_CHANGE } from "../../utils/actionTypes"
const initialState = {
    currentLang: i18n.language
}


export default (state = initialState, action) => {


    switch (action.type) {
        case LANG_CHANGE:
            return {
                ...state,
                currentLang: action.payload.lang
            }
        default:
            return state
    }
}