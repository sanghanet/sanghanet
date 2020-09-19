import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import Logout from '../Logout/Logout';

import { ReactComponent as DashboardIcon } from '../icons/dashboard.svg';
import { ReactComponent as PersonalIcon } from '../icons/personal.svg';
import { ReactComponent as FinancesIcon } from '../icons/finances.svg';
import { ReactComponent as QueriesIcon } from '../icons/info.svg';
import { ReactComponent as YogaIcon } from '../icons/yoga.svg';
import { ReactComponent as EventsIcon } from '../icons/event.svg';
import { ReactComponent as MembersIcon } from '../icons/members.svg';
import { ReactComponent as QuestionsIcon } from '../icons/questions.svg';
import { ReactComponent as BackIcon } from '../icons/arrow-left.svg';
import { ReactComponent as ForwardIcon } from '../icons/arrow-right.svg';
import { ReactComponent as SuperuserIcon } from '../icons/superman.svg';
import { UIcontext } from '../contexts/UIcontext/UIcontext';

class Navbar extends Component {
    state = {
        showSubmenu: this.props.openSubmenu
    }

    handleSubmenu = (event) => {
        event.stopPropagation(); // w/o this, bubbling event close the Hamburger in App.js!
        this.setState((prevState) => ({ showSubmenu: !prevState.showSubmenu }));
    }

    handleLink = (event) => {
        const { isFinanceAdmin, isEventAdmin, isYogaAdmin, isSuperuser } = this.context;
        const page = event.target.href.split('/').pop();
        switch (page) {
            case 'finance': !isFinanceAdmin && event.preventDefault(); break;
            case 'event': !isEventAdmin && event.preventDefault(); break;
            case 'yoga': !isYogaAdmin && event.preventDefault(); break;
            case 'superuser': !isSuperuser && event.preventDefault(); break;
            default:
        }
    }

    handleKeyDown = (event) => {
        const keyCode = event.keyCode; // CRSR LEFT(37), CRSR RIGHT(39)
        if (keyCode === 37 || keyCode === 39) event.preventDefault();
    }

    createMainMenuItem = (menuItem, index) => {
        return (
            <li key={index}>
                <NavLink exact to={`/${menuItem.path}`} className="link">
                    <div className="menu-icon"><menuItem.icon /></div>
                    <span className="title">{ menuItem.label }</span>
                </NavLink>
            </li>
        );
    }

    createSubMenuItem = (menuItem, index) => {
        return (
            <li key={index}>
                <div className="sub-link">
                    <NavLink exact to={`/${menuItem.path}`}
                        className={`sub-title${menuItem.isEnabled ? '' : ' disabled'}`}
                        onClick={this.handleLink}>{ menuItem.label }
                    </NavLink>
                </div>
            </li>
        );
    }

    render () {
        const { navStyle } = this.props;
        const { isFinanceAdmin, isEventAdmin, isYogaAdmin, isSuperuser } = this.context;
        const classList = this.state.showSubmenu ? 'wrapper show-submenu' : 'wrapper';

        const {
            ADMIN,
            BACK,
            DASHBOARD,
            PERSONAL,
            YOGA,
            FINANCES,
            EVENTS,
            MEMBERS,
            QUESTIONS,
            QUERIES,
            FINANCE_ADMIN,
            EVENT_ADMIN,
            YOGA_ADMIN,
            SUPERUSER
        } = this.context.dictionary.pageAndNavbarTitles;

        const mainMenu = [
            { path: 'app/dashboard', icon: DashboardIcon, label: DASHBOARD },
            { path: 'app/personal', icon: PersonalIcon, label: PERSONAL },
            { path: 'app/yoga', icon: YogaIcon, label: YOGA },
            { path: 'app/finances', icon: FinancesIcon, label: FINANCES },
            { path: 'app/events', icon: EventsIcon, label: EVENTS },
            { path: 'app/members', icon: MembersIcon, label: MEMBERS },
            { path: 'app/questions', icon: QuestionsIcon, label: QUESTIONS },
            { path: 'app/queries', icon: QueriesIcon, label: QUERIES }];

        const subMenu = [
            { path: 'app/admin/finance', icon: FinancesIcon, label: FINANCE_ADMIN, isEnabled: isFinanceAdmin },
            { path: 'app/admin/event', icon: EventsIcon, label: EVENT_ADMIN, isEnabled: isEventAdmin },
            { path: 'app/admin/yoga', icon: YogaIcon, label: YOGA_ADMIN, isEnabled: isYogaAdmin },
            { path: 'app/admin/superuser', icon: SuperuserIcon, label: SUPERUSER, isEnabled: isSuperuser }];

        return (
            <div id={navStyle}>
                <div className={classList} onKeyDown={this.handleKeyDown}>
                    <ul className="main-menu">
                        <li className="admins">
                            <div className="link" onClick={this.handleSubmenu}>
                                <div className="menu-icon"><ForwardIcon /></div>
                                <span className="title admins">{ ADMIN }</span>
                            </div>
                        </li>
                        {mainMenu.map((menuItem, index) => this.createMainMenuItem(menuItem, index))}
                        <li id="logout-li">
                            <Logout />
                        </li>
                    </ul>
                    <ul className="sub-menu">
                        <li className="back">
                            <div className="link" onClick={this.handleSubmenu}>
                                <div className="menu-icon"><BackIcon /></div>
                                <span className="title">{ BACK }</span>
                            </div>
                        </li>
                        {subMenu.map((menuItem, index) => this.createSubMenuItem(menuItem, index))}
                    </ul>
                </div>
            </div>
        );
    }
}

Navbar.contextType = UIcontext;

Navbar.propTypes = {
    navStyle: PropTypes.string.isRequired,
    openSubmenu: PropTypes.bool
};

export default Navbar;
