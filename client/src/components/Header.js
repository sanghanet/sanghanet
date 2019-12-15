import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

import './Header.css';

const Header = (props) => {
    return (
        <div className='header'>
            <h1>This a Header!</h1>
            <GoogleLogout
                clientId="55347337253-aglrjccot9o1n7s2caborv6gnee634pf.apps.googleusercontent.com"
                buttonText="Sign out"
                onLogoutSuccess={props.signOut}
                theme='dark'
                className='logout-btn'
            >
            </GoogleLogout>
        </div>
    );
};

Header.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Header;
