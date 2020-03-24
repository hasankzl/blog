import { combineReducers } from "redux"

import loginReducer from "../components/login/reducer";
import registerReducer from "../components/register/reducer"
import forgotPasswordReducer from "../components/forgotPassword/reducer"
import axiosReducer from "./axiosReducer"
import userSettingsReducer from "../components/user-settings/reducer"
import headerReducer from "../components/header/reducer"
export default combineReducers({
    loginReducer,
    registerReducer,
    forgotPasswordReducer,
    axiosReducer,
    userSettingsReducer,
    headerReducer
});