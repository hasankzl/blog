import axios from "axios"
import { RESET_PASSWORD } from "../../utils/constants"
import toast from 'toasted-notes';
import { CHANGE_FAIL, CHANGE_SUCCES } from "../../utils/constants"
const changePassword = prop => async dispatch => {

    await axios.post(RESET_PASSWORD, prop).then(res => {
        dispatch({
            type: CHANGE_SUCCES
        })
        toast.notify(res)
    }).catch(res => {
        dispatch({
            type: CHANGE_FAIL
        })
        toast.notify("something went wrong please try another time")
    })
}

export default changePassword;