import React from 'react';
import { ReactComponent as Buddha } from '../media/sangha_logo.svg';
import './Registration.scss';

const Registration = (props) => {
    return (
        <div className='registration'>
            <header>
                <h1>Registration to SanghaNet</h1>
            </header>
            {/* main is a div here to discard general main style */}
            <div className="registration-main">
                <Buddha className="buddha" />
                {/* <form method="POST" action="/auth/google" className="registration-btn">
                    <button>
                        <img src={GoogleLogo} alt="Google logo" />
                        <span>Sign in</span>
                    </button>
                </form> */}
            </div>
        </div>
    );
};

export default Registration;
