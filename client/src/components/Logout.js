import React from 'react';

import './Navbar_Header.scss';
import { ReactComponent as LogoutIcon } from './icons/logout.svg';

const Logout = (props) => {
    return (
        <button className="link">
            <div className="menu-icon"><LogoutIcon /></div>
            <span className="title">Logout</span>
        </button>
    );
};

export default Logout;
