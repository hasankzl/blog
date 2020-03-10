import axios from "axios"
import {ACCESS_TOKEN} from "../../utils/constants";
import { LOGIN_SUCCESS, LOGIN_PENDING, LOG_OUT } from "../../utils/actionTypes";

export const submitLogin =({username,password}) =>async dispatch =>{
    dispatch({
        type:LOGIN_PENDING
    })
    await axios
    .post("/login",{
        username,
        password
    })
    .then(response => {
        sessionStorage[ACCESS_TOKEN] = response.data[ACCESS_TOKEN];
        const user = {
            username
        }
        sessionStorage.user = JSON.stringify(user)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:{
                user
            }
        })
    })
    .catch(error => {
        alert(error)
    })
}

export const logout = ()=>{
    sessionStorage.clear();
    window.location="/#login";
    return {
        type:LOG_OUT
    }
}