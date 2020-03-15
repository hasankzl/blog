import { combineReducers } from "redux"

import loginReducer from "../components/login/reducer";
import registerReducer from "../components/register/reducer"
import forgotPasswordReducer from "../components/forgotPassword/reducer"
export default combineReducers({
    loginReducer,
    registerReducer,
    forgotPasswordReducer
});