import React from 'react';
import PropTypes from 'prop-types';

import Logout from './Logout';
import PageNavigation from './PageNavigation';
import './Navbar_Header.scss';

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <PageNavigation />
            <Logout signOut={props.signOut} />
        </nav>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Navbar;
