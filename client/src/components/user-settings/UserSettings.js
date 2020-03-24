import React, { Component } from 'react'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from "../metarial/TextField"
import { getUser, editUser, saveUser } from "./action"
import { connect } from "react-redux";
import Button from "../metarial/Button"
import Typography from '../metarial/Typography'
import EmailChangeModal from "./EmailChangeModal"
import PasswordChangeModal from "./PasswordChangeModal"
class UserSettings extends Component {

    componentDidMount() {
        this.props.getUser();

    }
    inputHandler = e => {
        const { user, editUser: edit } = this.props;
        user[e.target.name] = e.target.value;
        edit(user);
    }
    handleSubmit = e => {
        e.preventDefault();
        const { user, saveUser: save } = this.props;
        save(user);
    }
    render() {
        const { user } = this.props;
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <Container>
                        <Typography variant="h5" component="h1" align="center">User Settings</Typography>
                        <Grid>
                            <TextField label="Username" autoFocus margin="normal" required fullWidth name="username" type="text" onChange={e => this.inputHandler(e)} value={user.username} /><br />
                        </Grid>
                        <Grid>
                            <TextField label="Name" margin="normal" required fullWidth name="name" type="text" onChange={e => this.inputHandler(e)} value={user.name} /><br />
                        </Grid>
                        <Grid>
                            <TextField required label="Password" margin="normal" required
                                fullWidth name="password" type="password" onChange={e => this.inputHandler(e)} value={user.spassword} />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                        >SAVE</Button>

                    </Container>

                </form>
                <EmailChangeModal />
                <PasswordChangeModal />
            </div>
        )
    }
}
const mapStateToProps = ({ userSettingsReducer }) => ({
    user: userSettingsReducer.user
})
const mapDispatchToProps = {
    getUser,
    editUser,
    saveUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);