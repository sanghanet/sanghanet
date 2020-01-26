import React from 'react';

import Logout from './Logout';
import PageNavigation from './PageNavigation';
import './Navbar_Header.scss';

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <PageNavigation />
            <Logout />
        </nav>
    );
};

export default Navbar;
