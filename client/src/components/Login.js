import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buddha from './media/sangha_logo.svg';
import GoogleLogo from './media/google_logo.png';

class Login extends Component {
    static get propTypes () {
        return {
            onclick: PropTypes.func
        };
    }

    render () {
        return (
            <div className="app">
                <header>
                    <h1>Welcome to SanghaNet</h1>
                </header>
                <main>
                    <img className="buddha" src={Buddha} alt="buddha logo"/>
                    <button onClick={this.props.onclick} className="login-btn">
                        <div className="google-logo-box">
                            <img className="google-logo" src={GoogleLogo} alt="google logo"/>
                        </div>
                        <div className="login-btn-text noselect">SIGN IN</div>
                    </button>
                </main>
            </div>
        );
    }
};

export default Login;
