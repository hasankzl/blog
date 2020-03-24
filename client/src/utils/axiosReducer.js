import { FETCH_STOP, FETCH_START, FETCH_ERROR } from "./actionTypes"

const initialState = {
    fetching: false,
    errorMessage: false,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                fetching: true,
            }
        case FETCH_STOP:
            return {
                ...state,
                fetching: false,
            }
        case FETCH_ERROR:
            return {
                ...state,
                errorMessage: action.payload.error,
            }
        default: return state
    }
}