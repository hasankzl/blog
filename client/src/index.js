import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {HashRouter} from "react-router-dom";
import {Provider } from "react-redux";
import axios from "axios";
import store from "./utils/store";
import {API_BASE_URL} from "./utils/constants"
axios.defaults.headers.common["Authorization"]= 'Bearer '+localStorage.token;
axios.defaults.baseURL=API_BASE_URL;
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <App />

    </Provider>
  </HashRouter>
,
  document.getElementById('root')
);
