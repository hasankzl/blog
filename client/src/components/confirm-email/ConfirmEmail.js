import React, { Component } from 'react'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from "../metarial/TextField"
import axios from "axios"
import { CONFIRM_EMAIL } from '../../utils/constants'
class ConfirmEmail extends Component {
    state = {
        success: false,
        message: ""
    }
    componentWillMount() {
        const token = this.props.location.search.substring(1);
        axios.post(CONFIRM_EMAIL, { token }).then(
            this.setState({
                success: true,
                message: "Email Confirm Succesfully you can login now !!"
            })
        ).catch(
            this.setState({
                success: false,
                message: "Email Confirm Succesfully you can login now !!"
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

export default ConfirmEmail;