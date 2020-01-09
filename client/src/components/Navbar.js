import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logout from './Logout';
import './Navbar_Header.scss';

import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
import { ReactComponent as Profile } from './icons/profile.svg';
import { ReactComponent as Info } from './icons/info.svg';

const Navbar = (props) => {
    const activePage = (event) => {
        props.setActivePage(event.currentTarget.querySelector('SPAN').innerHTML);
    };
    return (
        <nav className="navbar">
            <ul>
                <li onClick={activePage}>
                    <NavLink exact to="/" className="dashboard link">
                        <div className="menu-icon"><DashboardIcon /></div>
                        <span className="title">Dashboard</span>
                    </NavLink>
                </li>
                <li onClick={activePage}>
                    <NavLink exact to="/profile" className="profile link">
                        <div className="menu-icon"><Profile /></div>
                        <span className="title">Profile</span>
                    </NavLink>
                </li>
                <li onClick={activePage}>
                    <NavLink exact to="/queries" className="queries link">
                        <div className="menu-icon"><Info /></div>
                        <span className="title">Queries</span>
                    </NavLink>
                </li>
            </ul>
            <Logout signOut={props.signOut} />
        </nav>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired
};

export default Navbar;
