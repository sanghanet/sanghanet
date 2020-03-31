import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import Logout from '../Logout/Logout';

import { ReactComponent as DashboardIcon } from '../icons/dashboard.svg';
import { ReactComponent as PersonalIcon } from '../icons/personal.svg';
import { ReactComponent as FinanceIcon } from '../icons/finances.svg';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { ReactComponent as YogaIcon } from '../icons/yoga.svg';
import { ReactComponent as EventIcon } from '../icons/event.svg';
import { ReactComponent as QuestionsIcon } from '../icons/questions.svg';
import { ReactComponent as SuperuserIcon } from '../icons/superuser.svg';
import { Component } from 'react';

class Navbar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            scrollPos: 0
        }
    }

    activePage = props.activePage;
    navStyle = props.navStyle;
    // navStyle has two CSS id: sidenav, hamburger

    render() {
        return (
            <ul onClick={activePage} className="navigation" id={navStyle}>
                <li>
                    <NavLink exact to="/dashboard" className="link">
                        <div className="menu-icon"><DashboardIcon /></div>
                        <span className="title">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/personal" className="link">
                        <div className="menu-icon"><PersonalIcon /></div>
                        <span className="title">Personal Data</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/yoga" className="link">
                        <div className="menu-icon"><YogaIcon /></div>
                        <span className="title">Yoga</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/finances" className="link">
                        <div className="menu-icon"><FinanceIcon /></div>
                        <span className="title">Finances</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/events" className="link">
                        <div className="menu-icon"><EventIcon /></div>
                        <span className="title">Events</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/questions" className="link">
                        <div className="menu-icon"><QuestionsIcon /></div>
                        <span className="title">Personal Questions</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/queries" className="link">
                        <div className="menu-icon"><InfoIcon /></div>
                        <span className="title">Queries</span>
                    </NavLink>
                </li>
                { sessionStorage.isSuperuser === 'true'
                    ? <li>
                        <NavLink exact to="/superuser" className="link">
                            <div className="menu-icon"><SuperuserIcon /></div>
                            <span className="title">Superuser</span>
                        </NavLink>
                    </li>
                    : null
                }
                <li>
                    <Logout />
                </li>
            </ul>
        );
    }
}

Navbar.propTypes = {
    activePage: PropTypes.func,
    navStyle: PropTypes.string.isRequired
};

export default Navbar;
