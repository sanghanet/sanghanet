import React from 'react';
import PropTypes from 'prop-types';

import Logout from './Logout';
import PageNavigation from './PageNavigation';
import './Navbar_Header.scss';

const Navbar = (props) => {
    const activePage = (event) => {
        props.setActivePage(event.currentTarget.querySelector('SPAN').innerHTML);
    };
    return (
        <nav className="navbar">
            <PageNavigation activePage={activePage} />
            <Logout signOut={props.signOut} />
        </nav>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired
};

export default Navbar;
