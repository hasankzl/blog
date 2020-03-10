import React, { Component } from 'react';
import {Route,Switch,withRouter} from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import Home from "./components/home";
import Panel from "./components/admin-panel"
import Login from "./components/login/Login"
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route  path="/login" component={Login}/>
          <PrivateRoute  path="/" component={Panel}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
