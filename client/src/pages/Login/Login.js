import React, { useContext } from 'react';
import { ReactComponent as Buddha } from '../media/sangha_logo.svg';
import GoogleLogo from '../media/google_logo.png';
import './Login.scss';

import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const Login = (props) => {
    const { loginPageDictionary } = useContext(UIcontext).dictionary;

    const { WELCOME, SIGNIN } = loginPageDictionary;

    return (
        <div className='login'>
            <header>
                <h1>{ WELCOME }</h1>
            </header>
            {/* main is a div here to discard general main style */}
            <div className="login-main">
                <Buddha className="buddha" />
                <form method="POST" action="/auth/google" className="login-btn">
                    <button>
                        <img src={GoogleLogo} alt="Google logo" />
                        <span>{ SIGNIN }</span>
                    </button>
                </form>
            </div>
            <LanguageSelector />
        </div>
    );
};

export default Login;
