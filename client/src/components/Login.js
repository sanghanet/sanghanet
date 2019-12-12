import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import Buddha from './media/sangha_logo.svg';
import Home from './Home';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = { login: false };
    }

    onFailure = (error) => {
        console.error(error);
    }

    onSignOut = () => {
        this.setState({ login: false });
    }

    onSignIn = (idToken) => {
        // The ID token to pass to your backend
        // If responseType is 'code', callback will return the offline token for use on your server.
        // https://github.com/anthonyjgrove/react-google-login#onsuccess-callback
        console.dir(idToken);
        fetch('/auth', {
            method: 'post',
            body: JSON.stringify(idToken)
        }).then((res) => {
            if (res.ok) { this.setState({ login: true }); };
        }).catch((error) => {
            console.log(error);
        });
    }

    render () {
        if (!this.state.login) {
            return (
                <div className='app'>
                    <header>
                        <h1>Welcome to SanghaNet</h1>
                    </header>
                    <main>
                        <img className='buddha' src={Buddha} alt='buddha logo'/>
                        <GoogleLogin
                            clientId='55347337253-aglrjccot9o1n7s2caborv6gnee634pf.apps.googleusercontent.com'
                            onSuccess={this.onSignIn}
                            onFailure={this.onFailure}
                            cookiePolicy={'single_host_origin'}
                            theme='dark'
                            className='login-btn'
                            responseType='code'
                        />
                    </main>
                </div>
            );
        }
        return (
            <div>
                <Home signOut={this.onSignOut} />
            </div>
        );
    }
}

export default Login;
