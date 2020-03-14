import axios from "axios"
import { ACCESS_TOKEN ,SEND_PASSWORD_EMAIL} from "../../utils/constants";
import { LOGIN_SUCCESS, LOGIN_PENDING, LOG_OUT } from "../../utils/actionTypes";
import { NotificationManager } from 'react-notifications';
import toast from 'toasted-notes';
export const submitLogin = ({ username, password }) => async dispatch => {
    dispatch({
        type: LOGIN_PENDING
    })
    await axios
        .post("/login", {
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
                type: LOGIN_SUCCESS,
                payload: {
                    user
                }
            })
            axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.token;
        })
        .catch(error => {
            toast.notify("Username or password aren't correct")
        })
}

export const sendPasswordEmail = email => async dispatch => {

    await axios.post(SEND_PASSWORD_EMAIL,{email:email})
        .then(res => {
            toast.notify("We've send a email for reset your password please check it ")
        })
        .catch(res =>{
            NotificationManager.warning('Something went wrong please try again','Warning')
        })
}

export const logout = () => {
    sessionStorage.clear();
    window.location = "/#login";
    return {
        type: LOG_OUT
    }
}