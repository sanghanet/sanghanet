import React from 'react';
import Buddha from './media/sangha_logo.svg';
import GoogleLogo from './media/google_logo.png';
import './Login.scss';

const Login = (props) => {
    return (
        <div className='app'>
            <header>
                <h1>Welcome to SanghaNet</h1>
            </header>
            <main>
                <img className='buddha' src={Buddha} alt='buddha logo'/>
                <form method="POST" action="/auth" className="login-btn">
                    <button>
                        <img src={GoogleLogo} alt="Google logo"/>
                        <span>Sign in with Google</span>
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Login;
