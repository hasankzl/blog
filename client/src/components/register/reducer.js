import { REGISTER, REGISTER_SUCCESS, REGISTER_FAIL } from "../../utils/constants"

const initialState = {
    errorMessage: null,
    isRegister: false
}



export default (state = initialState, action) =>{
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: true
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isRegister:false,
                errorMessage:action.payload.errorMessage
            }
            default:
                return state;
    }
}