import React from 'react';
import { ReactComponent as Buddha } from './media/sangha_logo.svg';
import GoogleLogo from './media/google_logo.png';
import './Login.scss';

const Login = (props) => {
    return (
        <div className='login'>
            <header>
                <h1>Welcome to SanghaNet</h1>
            </header>
            {/* main is a div here to discard general main style */}
            <div className="login-main">
                <Buddha className="buddha" />
                <form method="POST" action="/auth" className="login-btn">
                    <button>
                        <img src={GoogleLogo} alt="Google logo"/>
                        <span>Sign in</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
