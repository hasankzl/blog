import React, { Component } from 'react'
import {submitLogin} from "./action";
import  {connect} from "react-redux"
import {Redirect} from "react-router";
class Login extends Component {
    state={
        username:"",
        password:""
    }

    inputHandler =(e) =>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitHandler = () =>{
        this.props.submitLogin(this.state);
        alert("2")
    }
    render() {
    const  {state,props} = this;
        return props.loggedIn ?(<Redirect to={{pathname:"/",state:{from:props.location}}} />):(
            <div>
        
                <input name="username" type="text" onChange={ e=>this.inputHandler(e)} value={state.username}/><br/>
                <input name="password" type="password" onChange={e=> this.inputHandler(e)} value={state.password}/>
                <button onClick={this.submitHandler} >SEND</button>

            </div>
        )
    }
}
const mapStateToProps=({loginReducer}) =>({
    loggedIn:loginReducer.loggedIn,
    pending:loginReducer.pending,
    error:loginReducer.error
})
const mapDispatchToProps ={
    submitLogin
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)