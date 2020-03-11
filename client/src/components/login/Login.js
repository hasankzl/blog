import React, { Component } from 'react'
import { submitLogin } from "./action";
import { connect } from "react-redux"
import { Redirect } from "react-router";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {themeColor,bgColor} from "../../utils/constants"
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor:bgColor
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& label.Mui-focused': {
            color: themeColor,
          },
          '& link': {
            color: themeColor,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: themeColor,
          },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color:themeColor,
        marginBottom:"40px",
        '&:hover': {
            background: bgColor,
         },
    },
    themeColor:{
        color:themeColor,
        '& Checkbox-checked': {
            color: bgColor,
          },
    }
})

class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    inputHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitHandler = (e) => {
    e.preventDefault();
        this.props.submitLogin(this.state);
    }

    render() {

        const { state, props } = this;
        const { classes } = this.props;
        return props.loggedIn ? (<Redirect to={{ pathname: "/", state: { from: props.location } }} />) : (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form className={classes.form} noValidate onSubmit={e => this.submitHandler(e)}>
                        <Typography variant="h5" className={classes.themeColor} component="h1" align="center">Sign in</Typography>
                        <Grid>
                            <TextField label="Username" autoFocus  margin="normal" required fullWidth name="username" type="text" onChange={e => this.inputHandler(e)} value={state.username} /><br />
                        </Grid>

                        <Grid>
                            <TextField label="Password"   margin="normal" required
                                fullWidth name="password" type="password" onChange={e => this.inputHandler(e)} value={state.password} />
                        </Grid>
                        <FormControlLabel
                         className={classes.themeColor} 
                            control={<Checkbox value="remember" />}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                   
                            className={classes.submit}
                         >Login</Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2"  className={classes.themeColor} >
                                    Forgot password?
                               </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2"  className={classes.themeColor} >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>


            </Container>
        )
    }
}
const mapStateToProps = ({ loginReducer }) => ({
    loggedIn: loginReducer.loggedIn,
    pending: loginReducer.pending,
    error: loginReducer.error
})
const mapDispatchToProps = {
    submitLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))