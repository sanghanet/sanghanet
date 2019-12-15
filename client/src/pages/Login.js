import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

import Buddha from './media/sangha_logo.svg';

const Login = (props) => {
    const onFailure = (error) => {
        console.error(error);
    };

    const onSignIn = (googleUser) => {
        // const profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
        // console.log('Full Name: ' + profile.getName());
        // console.log('Given Name: ' + profile.getGivenName());
        // console.log('Family Name: ' + profile.getFamilyName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        // console.dir(googleUser);
        fetch('/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token: googleUser.Zi.id_token }) // The ID token to pass to your backend
        }).then((res) => {
            if (res.ok) { props.loginOK(); };
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className='app'>
            <header>
                <h1>Welcome to SanghaNet</h1>
            </header>
            <main>
                <img className='buddha' src={Buddha} alt='buddha logo'/>
                <GoogleLogin
                    clientId='55347337253-aglrjccot9o1n7s2caborv6gnee634pf.apps.googleusercontent.com'
                    onSuccess={onSignIn}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    theme='dark'
                    className='login-btn'
                />
            </main>
        </div>
    );
};

Login.propTypes = {
    loginOK: PropTypes.func.isRequired
};

export default Login;
