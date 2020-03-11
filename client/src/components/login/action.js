import axios from "axios"
import {ACCESS_TOKEN} from "../../utils/constants";
import { LOGIN_SUCCESS, LOGIN_PENDING, LOG_OUT } from "../../utils/actionTypes";
import {NotificationManager} from 'react-notifications';
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

       sessionStorage[ACCESS_TOKEN] = response.data;
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
axios.defaults.headers.common["Authorization"]= 'Bearer '+localStorage.token;
    })
    .catch(error => {
        NotificationManager.error("Username or password arent correct","Warning")
    })
}

export const logout = ()=>{
    sessionStorage.clear();
    window.location="/#login";
    return {
        type:LOG_OUT
    }
}