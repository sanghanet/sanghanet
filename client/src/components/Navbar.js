import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';

import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
import { ReactComponent as Profile } from './icons/profile.svg';
import { ReactComponent as Info } from './icons/info.svg';
import { ReactComponent as Logout } from './icons/logout.svg';

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink exact to="/" className="dashboard link">
                        <div className="menu-icon"><DashboardIcon /></div>
                        <span className="title">DASHBOARD</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/profile" className="profile link">
                        <div className="menu-icon"><Profile /></div>
                        <span className="title">PROFILE</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/queries" className="queries link">
                        <div className="menu-icon"><Info /></div>
                        <span className="title">QUERIES</span>
                    </NavLink>
                </li>
            </ul>
            <button onClick={props.signOut} className="link">
                <div className="menu-icon"><Logout /></div>
                <span className="title">EXIT</span>
            </button>
        </nav>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Navbar;
