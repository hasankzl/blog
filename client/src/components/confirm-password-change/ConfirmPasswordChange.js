import React, { Component } from 'react'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from "../metarial/TextField"
import axios from "axios"
import { PASSWORD_CHANGE_CONFIRM_URL } from '../../utils/constants'
class ConfirmPassword extends Component {
    state = {
        success: false,
        message: ""
    }
    componentWillMount() {
        const token = this.props.location.search.substring(1);
        axios.post(PASSWORD_CHANGE_CONFIRM_URL, { token }).then(
            this.setState({
                success: true,
                message: "Email Confirm Succesfully you can login now !!"
            })
        ).catch(
            this.setState({
                success: false,
                message: "Something went wrong please try again "
            })
        )
    }


    render() {
        return (
            <Container>
                <Grid>
                    {this.state.message}
                </Grid>
            </Container>
        )
    }
}

export default ConfirmPassword;