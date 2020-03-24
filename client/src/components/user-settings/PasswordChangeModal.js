import Button from "../metarial/Button"
import TextField from "../metarial/TextField"
import SkyLight from "react-skylight"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import React, { Component } from 'react'
import axios from "axios"
import { EMAIL_CHANGE_URL } from "../../utils/constants"
import { NotificationManager } from 'react-notifications';
import { changePassword } from "./action"
import { themeColor, bgColor } from "../../utils/constants"
export default class PasswordChangeModal extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: "",
            newPasswordConfirm: ""
        }
    }


    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeEmailSubmit = e => {
        e.preventDefault();
        const { state } = this;
        if (state.newPassword === state.newPasswordConfirm) {
            changePassword(this.state.newPassword);
        }
        else {
            NotificationManager.warning("Passwords aren't same", "Warning")
        }

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
                    onClick={() => this.passwordModal.show()}
                >
                    PASSWORD CHANGE
                </Button>
                <SkyLight
                    hideOnOverlayClicked
                    ref={ref => this.passwordModal = ref}
                    title="Change Password"
                    transitionDuration={2000}
                    dialogStyles={dialog}
                >
                    <Container>
                        <form onSubmit={e => this.changeEmailSubmit(e)}>
                            <Grid>
                                <TextField label="Enter new password " autoFocus margin="normal"
                                    required fullWidth name="newPassword" type="password" onChange={e => this.inputHandler(e)}
                                    value={state.newPassword}
                                /><br />
                                <TextField label="Enter new password again " autoFocus margin="normal"
                                    required fullWidth name="newPasswordConfirm" type="password" onChange={e => this.inputHandler(e)}
                                    value={state.newPasswordConfirm}
                                /><br />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                            >Change Password</Button>
                        </form>
                    </Container>
                </SkyLight>
            </div>
        )
    }
}
