import React, { Component } from 'react'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { themeColor, bgColor } from "../../utils/constants"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { connect } from "react-redux"
import { logout } from "../login/action"
import ButtonMenu from "../metarial/ButtonMenu"
import i18n from "../../i18n/index"
import LangButtons from "../../utils/LangButtons"
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        color: themeColor,
        backgroundColor: "#fff",
        boxShadow: "none",
        //  borderBottom: "1px solid " + themeColor,
        '& a': {
            color: themeColor,
            marginLeft: "20px",
            fontWeight: "bold",
            padding: "10px"
        },
        '& a:hover': {
            padding: "none",
            marginLeft: "none",
            marginBottom: "none",
        }
    }
})
class Header extends Component {


    logOut = () => {
        this.props.logout()
    }

    render() {
        const { classes, loggedIn } = this.props
        const { i18n } = window;
        return (
            loggedIn == false ?
                (<div className={classes.root}>
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                SiteName
                            <Link href="#/" color="inherit">{i18n.t("header.home")}</Link>
                            </Typography>

                            <Link href="#/login" color="inherit">{i18n.t("header.login")}</Link>
                            <Link href="#/register" color="inherit">{i18n.t("header.register")}</Link>
                            <LangButtons />
                        </Toolbar>

                    </AppBar>
                </div >) :
                (<div className={classes.root}>
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                SiteName
                             <Link href="#/" color="inherit">{i18n.t("header.home")}</Link>
                            </Typography>
                            <ButtonMenu i18n={i18n} />
                            <Link onClick={() => this.logOut()} color="inherit">{i18n.t("header.logout")}</Link>
                            <LangButtons />
                        </Toolbar>
                    </AppBar>
                </div>)
        )
    }
}
const mapStateToProps = ({ loginReducer }) => ({
    loggedIn: loginReducer.loggedIn
})
const mapDispatchToProps = {
    logout
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header))
