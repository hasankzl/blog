import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import Home from "./components/home";
import Panel from "./components/admin-panel"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Header from "./components/header/Header"
import ForgotPassword from "./components/forgotPassword/ForgotPassword"
import ConfirmEmail from "./components/confirm-email/ConfirmEmail"
import { withStyles } from '@material-ui/core/styles';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { bgColor } from './utils/constants';
import Loader from "./utils/loader"
import { connect } from "react-redux"
const basicStyles = (theme) => ({
  siteTheme: {
    color: "#00cc00",
    backgroundColor: "#fff",
    fontFamily: "Trebuchet MS, Helvetica, sans-serif",
    '& a:hover': {
      backgroundColor: bgColor,
      color: "#fff",
      borderRadius: "7px",
      transition: "0.3s",
      textDecoration: "none",
      cursor: "pointer",
      padding: "10px"
    }
  }
})
class App extends Component {
  render() {
    const { classes } = this.props;
    const { fetching } = this.props
    return (
      <div className={classes.siteTheme}>
        <Header />
        <Loader active={fetching}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/confirmEmail" component={ConfirmEmail} />
          </Switch>
          <NotificationContainer />
        </Loader>
      </div>
    );
  }
}
const mapStateToProps = ({ axiosReducer }) => ({
  fetching: axiosReducer.fetching
})
export default connect(mapStateToProps)(withRouter(withStyles(basicStyles)(App)));
