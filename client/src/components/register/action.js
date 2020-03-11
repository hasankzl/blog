import {REGISTER,REGISTER_SUCCESS,REGISTER_FAIL} from "../../utils/actionTypes"
import {REGISTER_URL} from "../../utils/constants"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios"

 const registerRequest =(user) => async dispatch =>{

    await axios.post(REGISTER_URL,user)
    .then(response => {
        dispatch({
            type:REGISTER_SUCCESS
        })
    }).catch(response =>{
        dispatch({
            type:REGISTER_FAIL,
            payload:{errorMessage:response.message}
        })
    if(response.message ==  "Request failed with status code 500"){
        NotificationManager.warning('Please chose another username','Warning')
    }
    else if(response.message ==  "Request failed with status code 400"){
        NotificationManager.warning('Something went wrong please try again','Warning')
    }
    else {
        NotificationManager.warning('Something went wrong please try again','Warning')
    }

    })
}
export default registerRequest;