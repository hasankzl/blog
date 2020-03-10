import {LOG_OUT, LOGIN_FAIL, LOGIN_PENDING,LOGIN_SUCCESS} from "../../utils/actionTypes"

const initialState={
    error:"",
    loggedUser:JSON.parse(sessionStorage.user || null),
    loggedIn:!!sessionStorage.token,
    pending:false
}

export default (state= initialState,action) =>
{
    switch(action.type){
        case LOGIN_PENDING:
            return {
                ...state,
                pending:true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                pending:false,
                error:null,
                loggedIn:true,
                loggedUser:action.payload.user
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error:action.payload.error,
                pending:false
            }
        case LOG_OUT:
            return {
                ...state,
                loggedUser:null,
                loggedIn:false
            };
            default:
                return state;
    }
}