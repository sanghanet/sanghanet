import React from 'react';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';
import { ReactComponent as LogoutIcon } from './icons/logout.svg';

const Logout = (props) => {
    return (
        <button onClick={props.signOut} className="link">
            <div className="menu-icon"><LogoutIcon /></div>
            <span className="title">Logout</span>
        </button>
    );
};

Logout.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Logout;
