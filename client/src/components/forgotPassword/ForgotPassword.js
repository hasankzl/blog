import React, { Component } from 'react'
import { connect } from "react-redux"
import Container from "@material-ui/core/Container"
import Button from "../metarial/Button"
import TextField from "../metarial/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from '../metarial/Typography'
import changePassword from "./action"
import { NotificationManager } from 'react-notifications';
class ForgotPassword extends Component {
    state = {
        password: "",
        secondPassword: "",
        token: ""
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount(props) {
        const token = this.props.location.search.substring(1);
        this.setState({
            token
        })
    }
    submitHandler = (e) => {
        const { state } = this
        e.preventDefault();
        if (state.password == state.secondPassword) {
            this.props.changePassword({
                token: state.token,
                password: state.password
            })
        }
        else {
            NotificationManager.error("Password aren't same", "Warning")
        }
    }
    render() {
        const { state } = this


        return (
            <div>
                <Container>
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        <Typography variant="h5" component="h1" align="center">Reset Password</Typography>
                        <Grid>
                            <TextField label="Password" margin="normal" required
                                fullWidth name="password" type="password" onChange={e => this.inputHandler(e)} value={state.password} />
                        </Grid>
                        <Grid>
                            <TextField label="Same Password Again" margin="normal" required
                                fullWidth name="secondPassword" type="password" onChange={e => this.inputHandler(e)} value={state.secondPassword} />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                        >
                            SEND
                </Button>
                    </form>
                </Container>
            </div >
        )
    }
}
const mapStateToProps = ({ forgotPasswordReducer }) => ({
    change: forgotPasswordReducer.change
})
const mapDispatchToProps = {
    changePassword
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);