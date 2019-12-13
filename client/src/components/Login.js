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

    onSignIn = (googleUser) => {
        // const profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
        // console.log('Full Name: ' + profile.getName());
        // console.log('Given Name: ' + profile.getGivenName());
        // console.log('Family Name: ' + profile.getFamilyName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        // console.dir(googleUser);
        fetch('/auth', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token: googleUser.Zi.id_token }) // The ID token to pass to your backend
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
