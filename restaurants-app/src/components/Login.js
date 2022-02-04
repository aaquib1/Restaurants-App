import React, { Component } from 'react';
import NavBarMenu from './NavBarMenu';
class Login extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            password: ''
        }
    }
    login() {
        fetch('http://localhost:3000/login?q=' + this.state.name).then((data) => {
            data.json().then((resp) => {
                // console.warn("resp", resp);
                localStorage.setItem('login', JSON.stringify(resp))
                if (resp.length > 0) {
                    console.warn(this.props.history.push('list'));
                }
                else {
                    alert("Please Check User name and Password")
                }
            })
        })
    }
    render() {

        return (
            <div>
                <NavBarMenu />
                <input type="text" placeholder='Enter User Name' name="user" onChange={(event) => this.setState({ name: event.target.value })} /> <br /><br />
                <input type="password" placeholder='Enter Password' name="password" onChange={(event) => this.setState({ password: event.target.value })} /> <br /><br />
                <button onClick={() => { this.login() }}>Login</button>
            </div>
        );
    }
}

export default Login;