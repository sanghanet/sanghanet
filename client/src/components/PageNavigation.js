import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navbar_Header.scss';

import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
import { ReactComponent as ProfileIcon } from './icons/profile.svg';
import { ReactComponent as InfoIcon } from './icons/info.svg';

const PageNavigation = (props) => {
    return (
        <ul onClick={props.activePage}>
            <li>
                <NavLink exact to="/dashboard" className="link">
                    <div className="menu-icon"><DashboardIcon /></div>
                    <span className="title">Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/profile" className="link">
                    <div className="menu-icon"><ProfileIcon /></div>
                    <span className="title">Profile</span>
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/queries" className="link">
                    <div className="menu-icon"><InfoIcon /></div>
                    <span className="title">Queries</span>
                </NavLink>
            </li>
        </ul>
    );
};

PageNavigation.propTypes = {
    activePage: PropTypes.func
};

export default PageNavigation;
