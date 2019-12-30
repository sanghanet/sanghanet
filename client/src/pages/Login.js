import React from 'react';
import PropTypes from 'prop-types';
import Buddha from './media/sangha_logo.svg';

class Login extends React.Component {
    constructor () {
        super();
    }

    render () {
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
    }
};

Login.propTypes = {
    loginOK: PropTypes.func.isRequired
};

export default Login;
