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
import { ReactComponent as BackIcon } from '../icons/arrow-left.svg';
import { ReactComponent as ForwardIcon } from '../icons/arrow-right.svg';

class Navbar extends Component {
    state = {
        showSubmenu: this.props.openSubmenu
    }

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

    handleSubmenu = (event) => {
        event.stopPropagation(); // w/o this, bubbling event close the Hamburger in App.js!
        this.setState((prevState) => ({ showSubmenu: !prevState.showSubmenu }));
    }

    render () {
        const { navStyle } = this.props;
        const classList = this.state.showSubmenu ? 'wrapper show-submenu' : 'wrapper';
        return (
            <div id={navStyle}>
                <div className={classList}>
                    <ul className="main-menu">
                        <li className="admins">
                            <div className="link" onClick={this.handleSubmenu}>
                                <div className="menu-icon"><ForwardIcon /></div>
                                <span className="title admins">Admins</span>
                            </div>
                        </li>
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
                        <li id="logout-li">
                            <Logout />
                        </li>
                    </ul>
                    <ul className="sub-menu">
                        <li className="back">
                            <div className="link" onClick={this.handleSubmenu}>
                                <div className="menu-icon"><BackIcon /></div>
                                <span className="title">Back</span>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/admin/finance" className="sub-title">Finance Admin</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/admin/event" className="sub-title">Event Admin</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/admin/yoga" className="sub-title">Yoga Admin</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/admin/superuser" className="sub-title">Superuser</NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    navStyle: PropTypes.string.isRequired,
    openSubmenu: PropTypes.bool
};

export default Navbar;
