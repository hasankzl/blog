import {REGISTER,REGISTER_SUCCESS,REGISTER_FAIL} from "../../utils/actionTypes"
import {REGISTER_URL} from "../../utils/constants"
import { NotificationManager} from 'react-notifications';
import axios from "axios"

 const registerRequest =(user) => async dispatch =>{

    await axios.post(REGISTER_URL,user)
    .then(response => {
        dispatch({
            type:REGISTER_SUCCESS
        })
        NotificationManager.success('You will get a email. Please click the link', 'Thank You !');
    }).catch(res =>{
        dispatch({
            type:REGISTER_FAIL,
            payload:{errorMessage:res.message}
        })
    if(res.message ==  "Request failed with status code 500"){
        NotificationManager.warning('Please chose another '+res.response.data.message,'Warning')
    }
    else if(res.message ==  "Request failed with status code 400"){
        NotificationManager.warning('Something went wrong please try again','Warning')
    }
    else {
        NotificationManager.warning('Something went wrong please try again','Warning')
    }

    })
}
export default registerRequest;