import React, { Component } from 'react'
import registerRequest from "./action";
import { connect } from "react-redux"
import Button from '../metarial/Button';
import Typography from '../metarial/Typography'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '../metarial/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { themeColor, bgColor } from "../../utils/constants"
import { NotificationManager } from 'react-notifications';
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: bgColor
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    themeColor: {
        color: themeColor,
        '& Checkbox-checked': {
            color: bgColor,
        },
    }
})

class Register extends Component {
    state = {
        username: "",
        password: "",
        name: "",
        email: "",
        spassword: ""
    }
    inputHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        if (this.state.password == this.state.spassword)
            this.props.registerRequest(this.state);
        else {
            NotificationManager.warning('Please check the passwords', 'Warning')
        }
    }

    render() {

        const { state, props } = this;
        const { classes } = this.props;
        const { i18n } = window;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PermIdentityOutlinedIcon />
                    </Avatar>
                    <form className={classes.form} noValidate onSubmit={e => this.submitHandler(e)}>

                        <Typography variant="h5" component="h1" align="center">{i18n.t("register.signUp")}</Typography>

                        <Grid>
                            <TextField label={i18n.t("register.username")} autoFocus margin="normal" required fullWidth name="username" type="text" onChange={e => this.inputHandler(e)} value={state.username} /><br />
                        </Grid>

                        <Grid>
                            <TextField label={i18n.t("register.password")} margin="normal" required
                                fullWidth name="password" type="password" onChange={e => this.inputHandler(e)} value={state.password} />
                        </Grid>
                        <Grid>
                            <TextField label={i18n.t("register.password")} margin="normal" required
                                fullWidth name="spassword" type="password" onChange={e => this.inputHandler(e)} value={state.spassword} />
                        </Grid>
                        <Grid>
                            <TextField label={i18n.t("register.name")} margin="normal" required fullWidth name="name" type="text" onChange={e => this.inputHandler(e)} value={state.name} /><br />
                        </Grid>
                        <Grid>
                            <TextField label={i18n.t("register.email")} margin="normal" required fullWidth name="email" type="text" onChange={e => this.inputHandler(e)} value={state.email} /><br />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                        >{i18n.t("register.signUp")}</Button>


                        <Grid item >
                            <Link href="#/login" variant="body2" className={classes.themeColor} align="center" >
                                {i18n.t("register.signIn")}
                            </Link>
                        </Grid>

                    </form>
                </div>

            </Container>
        )
    }
}
const mapStateToProps = ({ registerReducer }) => ({
    isRegister: registerReducer.isRegister,
})
const mapDispatchToProps = {
    registerRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))