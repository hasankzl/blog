import store from "./store";
import axios from "axios";
import { FETCH_START, FETCH_STOP } from "./actionTypes";
import { NotificationManager } from 'react-notifications';

const showLoading = () => {
    store.dispatch(dispatch => {
        dispatch({
            type: FETCH_START
        })
    })
}

const hideLoading = () => {
    store.dispatch(dispatch => {
        dispatch({
            type: FETCH_STOP
        })
    })
}

axios.interceptors.request.use(
    config => {
        const token = sessionStorage.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        showLoading();
        return config;
    }
)

axios.interceptors.response.use(
    response => {
        hideLoading();
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    NotificationManager.error('You dont have permisson', 'Warning');
                    break;
                case 400:
                    NotificationManager.warning('Something went wrong please try again', 'Warning');
                    break;
                default:
                  //  NotificationManager.warning('Something went wrong please try again', 'Warning');
                    break;
            }
        }
        hideLoading();
        return Promise.reject(error);
    }
)