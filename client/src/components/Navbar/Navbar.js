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
                <NavLink exact to={`/app/${menuItem.name.toLowerCase()}`} className="link">
                    <div className="menu-icon"><menuItem.icon /></div>
                    <span className="title admins">{ menuItem.dictionary }</span>
                </NavLink>
            </li>
        );
    }

    createSubMenuItem = (menuItem, index) => {
        return (
            <li key={index}>
                <div className="sub-link">
                    <NavLink exact to={`/app/admin/${menuItem.name.split('_')[0].toLowerCase()}`}
                        className={`sub-title${menuItem.entitlement ? '' : ' disabled'}`}
                        onClick={this.handleLink}>{ menuItem.dictionary }
                    </NavLink>
                </div>
            </li>
        );
    }

    createMenuChangeItem = (menuItem) => {
        return (
            <li className={menuItem.className}>
                <div className="link" onClick={this.handleSubmenu}>
                    <div className="menu-icon"><menuItem.icon /></div>
                    <span className={`title${menuItem.classname === 'admins' ? ' admins' : ''}`}>{ menuItem.dictionary }</span>
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
            { name: 'DASHBOARD', icon: DashboardIcon, dictionary: DASHBOARD },
            { name: 'PERSONAL', icon: PersonalIcon, dictionary: PERSONAL },
            { name: 'YOGA', icon: YogaIcon, dictionary: YOGA },
            { name: 'FINANCES', icon: FinancesIcon, dictionary: FINANCES },
            { name: 'EVENTS', icon: EventsIcon, dictionary: EVENTS },
            { name: 'MEMBERS', icon: MembersIcon, dictionary: MEMBERS },
            { name: 'QUESTIONS', icon: QuestionsIcon, dictionary: QUESTIONS },
            { name: 'QUERIES', icon: QueriesIcon, dictionary: QUERIES }];

        const subMenu = [
            { name: 'FINANCE_ADMIN', icon: '', entitlement: isFinanceAdmin, dictionary: FINANCE_ADMIN },
            { name: 'EVENT_ADMIN', icon: '', entitlement: isEventAdmin, dictionary: EVENT_ADMIN },
            { name: 'YOGA_ADMIN', icon: '', entitlement: isYogaAdmin, dictionary: YOGA_ADMIN },
            { name: 'SUPERUSER', icon: '', entitlement: isSuperuser, dictionary: SUPERUSER }];

        const adminAndBack = {
            ADMIN: { className: 'admins', icon: ForwardIcon, dictionary: ADMIN },
            BACK: { className: 'back', icon: BackIcon, dictionary: BACK }
        };

        return (
            <div id={navStyle}>
                <div className={classList} onKeyDown={this.handleKeyDown}>
                    <ul className="main-menu">
                        {this.createMenuChangeItem(adminAndBack.ADMIN)}
                        {mainMenu.map((menuItem, index) => this.createMainMenuItem(menuItem, index))}
                        <li id="logout-li">
                            <Logout />
                        </li>
                    </ul>
                    <ul className="sub-menu">
                        {this.createMenuChangeItem(adminAndBack.BACK)}
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
