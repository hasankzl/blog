import { CHANGE_FAIL, CHANGE_SUCCES } from "../../utils/constants"

const initialState = {

    change: false
}


export default (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_SUCCES:
            return {
                ...state,
                change: true
            }
        case CHANGE_FAIL:
            return {
                ...state,
                change: false
            }
        default: return state
    }
}