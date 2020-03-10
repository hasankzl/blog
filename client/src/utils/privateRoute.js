import React from "react";
import PropTypes from "prop-types";
import {Redirect,Route} from "react-router-dom";
import {ACCESS_TOKEN} from "./constants";

const PrivateRoute= ({component:Component,...rest}) =>(
    <Route 
    {...rest}
    render ={props =>{
        const hasToken = !!(localStorage[ACCESS_TOKEN]);

        return hasToken ? (
            <Component {...props} />
        ): 
        <Redirect to={{pathname:"/home",state: {from:props.location}}} />
    }}
    />
);

PrivateRoute.PropTypes = {
    component:PropTypes.oneOfType([PropTypes.element,PropTypes.func]),
    location: PropTypes.oneOfType([PropTypes.string,PropTypes.object])
};

PrivateRoute.defaultProps={
    component:null,
    location:"/"
}

export default PrivateRoute;