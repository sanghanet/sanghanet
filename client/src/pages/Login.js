import React from 'react';
import Buddha from './media/sangha_logo.svg';
import './Login.scss';

const Login = (props) => {
    return (
        <div className='app'>
            <header>
                <h1>Welcome to SanghaNet</h1>
            </header>
            <main>
                <img className='buddha' src={Buddha} alt='buddha logo'/>
                <form method="POST" action="/auth" className = "login-btn">
                    <input type="submit" value="Login with Google OAuth2" />
                </form>
            </main>
        </div>
    );
};

export default Login;
