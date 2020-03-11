import React, { Component } from 'react';
import {Route,Switch,withRouter} from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import Home from "./components/home";
import Panel from "./components/admin-panel"
import Login from "./components/login/Login"
import Register from "./components/register"
import { withStyles } from '@material-ui/core/styles';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const basicStyles=(theme)=>({
  SiteTheme:{
    color:"#00cc00",
    backgroundColor:"#ffe900"
  }
})
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/register" component={Register}/>
          <PrivateRoute  path="/" component={Panel}/>
        </Switch>

        <NotificationContainer/>
      </div>
    );
  }
}

export default withRouter(withStyles(basicStyles)(App));
