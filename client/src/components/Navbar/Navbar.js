import React, { Component } from 'react';
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

class Navbar extends Component {
    componentDidMount () {
        const desktopMenu = document.getElementById('sidenav');
        const hamburgerMenu = document.getElementsByClassName('slider')[0];

        switch (window.location.pathname) {
            case '/finances':
                hamburgerMenu.scrollTop = 50;
                desktopMenu.scrollTop = 150;
                break;

            case '/events':
                hamburgerMenu.scrollTop = 130;
                desktopMenu.scrollTop = 250;
                break;

            case '/questions':
                hamburgerMenu.scrollTop = 210;
                desktopMenu.scrollTop = 300;
                break;

            case '/queries':
                hamburgerMenu.scrollTop = 500;
                desktopMenu.scrollTop = 300;
                break;

            case '/superuser':
                hamburgerMenu.scrollTop = 500;
                desktopMenu.scrollTop = 300;
                break;

            default:
                hamburgerMenu.scrollTop = 0;
                break;
        }
    }

    render () {
        return (
            <ul className="navigation" id={this.props.navStyle}>
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
                <li>
                    <NavLink exact to="/superuser" className="link">
                        <div className="menu-icon"><SuperuserIcon /></div>
                        <span className="title">Superuser</span>
                    </NavLink>
                </li>
                <li id="logout-li">
                    <Logout />
                </li>
            </ul>
        );
    }
}

Navbar.propTypes = {
    navStyle: PropTypes.string.isRequired
};

export default Navbar;
