import axios from "axios"
import { GET_USER_URL, SAVE_USER_URL, EMAIL_CHANGE_URL, PASSWORD_CHANGE_URL } from "../../utils/constants"
import { GET_USER, EDIT_USER, SAVE_USER } from "../../utils/actionTypes"
import { NotificationManager } from 'react-notifications';
import toast from 'toasted-notes';
export const getUser = () => async dispatch => {
    await axios.get(GET_USER_URL).then(res => {
        dispatch({
            type: GET_USER,
            payload: {
                user: res.data
            }
        })
    }
    ).catch(
        res => {
            console.log(res)
        }
    )
}

export const saveUser = (user) => async dispach => {

    await axios.post(SAVE_USER_URL, user).then(res => {
        dispach({
            type: SAVE_USER
        })
        window.location = "/#";
    }
    ).catch(res => {
        if (res.response.status == 500) {
            const sp = res.response.data.message;
            //çok saçma bir error handling ama olsun 
            const error = sp.split(";")[2]
            if (error) {
                NotificationManager.warning('Please chose another ' + error.substring(error.indexOf('.') + 1, error.indexOf('_')), 'Warning')
            }
            else {
                NotificationManager.error(res.response.data.message, 'Warning');
            }
        }
    })

}

export const editUser = user => dispatch => {
    dispatch({ type: EDIT_USER, payload: { user } })
}

export const changeEmail = email => {

    axios.post(EMAIL_CHANGE_URL, { email: email })
        .then(res => {
            toast.notify("We've send a email for reset your email please check it ")
        })
        .catch(res => {
            NotificationManager.warning('please check the email', 'Warning')
        })
}

export const changePassword = password => {

    axios.post(PASSWORD_CHANGE_URL, { password: password })
        .then(res => {
            toast.notify("We've send a email for reset your password please check it ")
        })
        .catch(res => {
            NotificationManager.warning('please check the email', 'Warning')
        })
}