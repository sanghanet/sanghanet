import React, { Component } from 'react';
import Buddha from './media/sangha_logo.svg';
import GoogleLogo from './media/google_logo.png';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = { login: false };
    }

    logIn = () => {
        this.setState({ login: true });
    }

    render () {
        if (!this.state.login) {
            return (
                <div className="app">
                    <header>
                        <h1>Welcome to SanghaNet</h1>
                    </header>
                    <main>
                        <img className="buddha" src={Buddha} alt="buddha logo"/>
                        <button onClick={this.logIn} className="login-btn">
                            <div className="google-logo-box">
                                <img className="google-logo" src={GoogleLogo} alt="google logo"/>
                            </div>
                            <div className="login-btn-text noselect">SIGN IN</div>
                        </button>
                    </main>
                </div>
            );
        }
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Login;
