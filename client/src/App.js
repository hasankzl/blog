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
import ConfirmEmailChange from "./components/confirm-email-change/ConfirmEmailChange"
import ConfirmPasswordChange from "./components/confirm-password-change/ConfirmPasswordChange"
import { withStyles } from '@material-ui/core/styles';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { bgColor } from './utils/constants';
import Loader from "./utils/loader"
import "./i18n";
import UserSettings from "./components/user-settings/UserSettings"
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
  constructor(props) {
    super(props)
    this.state = {
      currentLang: props.currentLang
    }
  }
  render() {
    const { classes } = this.props;
    const { props } = this;
    return (
      <div className={classes.siteTheme}>
        <Header {...props} />
        <Loader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/confirmEmail" component={ConfirmEmail} />
          <Route path="/user-settings" component={UserSettings} />
          <Route path="/changeEmailConfirm" component={ConfirmEmailChange} />
          <Route path="/changePasswordConfirm" component={ConfirmPasswordChange} />
        </Switch>
        <NotificationContainer />

      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentLang: state.headerReducer.currentLang
})
export default connect(mapStateToProps)(withRouter(withStyles(basicStyles)(App)));
