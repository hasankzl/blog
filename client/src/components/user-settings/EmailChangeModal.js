import Button from "../metarial/Button"
import TextField from "../metarial/TextField"
import SkyLight from "react-skylight"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import React, { Component } from 'react'
import axios from "axios"
import { EMAIL_CHANGE_URL } from "../../utils/constants"
import { changeEmail } from "./action"
import { themeColor, bgColor } from "../../utils/constants"
export default class EmailChangeModal extends Component {
    constructor() {
        super();
        this.state = {
            newEmail: ""
        }
    }


    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeEmailSubmit = e => {
        e.preventDefault();
        changeEmail(this.state.newEmail);
    }
    render() {
        const dialog = {
            width: '50%',
            minHeight: '102px',
            color: themeColor
        }
        const { state } = this;
        return (
            <div>
                <Button
                    type="submit"
                    fullWidth
                    onClick={() => this.emailModal.show()}
                >
                    EMAIL CHANGE
                </Button>
                <SkyLight
                    hideOnOverlayClicked
                    ref={ref => this.emailModal = ref}
                    title="Change Email"
                    transitionDuration={2000}
                    dialogStyles={dialog}
                >
                    <Container>
                        <form onSubmit={e => this.changeEmailSubmit(e)}>
                            <Grid>
                                <TextField label="Enter new Email " autoFocus margin="normal"
                                    required fullWidth name="newEmail" type="text" onChange={e => this.inputHandler(e)}
                                    value={state.email}
                                /><br />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                            >Change Email</Button>
                        </form>
                    </Container>
                </SkyLight>
            </div>
        )
    }
}
