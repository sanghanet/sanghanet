import React from 'react';
import Buddha from './media/sangha_logo.svg';

const Login = (props) => {
    return (
        <div className='app'>
            <header>
                <h1>Welcome to SanghaNet</h1>
            </header>
            <main>
                <img className='buddha' src={Buddha} alt='buddha logo'/>
                <button className = "login-btn">
                    <a href='/auth'>Passport login using link</a>
                </button>
            </main>
        </div>
    );
};

export default Login;
