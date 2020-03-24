import { GET_USER, EDIT_USER, SAVE_USER } from "../../utils/actionTypes"

const user = {
    id: "",
    username: "",
    email: "",
    name: ""
}
const initialState = {
    errorMessage: "",
    user,
    editUser: user
}


export default (state = initialState, action) => {

    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case EDIT_USER:
            return {
                ...state,
                user: { ...action.payload.user }
            }
        case SAVE_USER:
            return {
                ...state
            }
        default:
            return state;
    }
}