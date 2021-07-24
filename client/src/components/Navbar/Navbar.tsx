import React, { useState, useContext } from 'react';
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

interface NavbarProps {
    navStyle: NAVSTYLE;
    openSubmenu?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ openSubmenu, navStyle }) => {
    const [showSubmenu, setShowSubmenu] = useState(openSubmenu);

    const context = useContext(UIcontext);
    const { isFinanceAdmin, isEventAdmin, isYogaAdmin, isSuperuser } = context;
    const isAdmin = isFinanceAdmin || isEventAdmin || isYogaAdmin || isSuperuser;

    const handleSubmenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation(); // w/o this, bubbling event close the Hamburger in App.js!
        setShowSubmenu(!showSubmenu);
    };

    const handleLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        const eventTarget = event.target as HTMLAnchorElement;
        const page = eventTarget.href.split('/').pop();
        switch (page) {
            case 'finance': !isFinanceAdmin && event.preventDefault(); break;
            case 'event': !isEventAdmin && event.preventDefault(); break;
            case 'yoga': !isYogaAdmin && event.preventDefault(); break;
            case 'superuser': !isSuperuser && event.preventDefault(); break;
            default:
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const keyCode = event.keyCode; // CRSR LEFT(37), CRSR RIGHT(39)
        if (keyCode === 37 || keyCode === 39) event.preventDefault();
    };

    const handleTabNavigation = (event: React.KeyboardEvent<HTMLLIElement>): void => {
        if (event.key === 'Tab' && !event.shiftKey && isAdmin) {
            setShowSubmenu(true);
        }
    };

    const createMainMenuItem = (menuItem: MenuItem, index: number): JSX.Element => {
        return (
            <li key={index}>
                <NavLink exact to={`/${menuItem.path}`} className="link">
                    <div className="menu-icon"><menuItem.icon /></div>
                    <span className="title">{menuItem.label}</span>
                </NavLink>
            </li>
        );
    };

    const createSubMenuItem = (menuItem: MenuItem, index: number): JSX.Element => {
        return (
            <li key={index}>
                <div className="sub-link">
                    <NavLink
                        exact to={`/${menuItem.path}`}
                        className={`sub-title${menuItem.isEnabled ? '' : ' disabled'}`}
                        onClick={handleLink}
                        tabIndex={menuItem.isEnabled ? 0 : -1}
                    >{menuItem.label}
                    </NavLink>
                </div>
            </li>
        );
    };

    const classList = showSubmenu ? 'wrapper show-submenu' : 'wrapper';
    const {
        ADMINS,
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
    } = context.dictionary.pageAndNavbarTitles;

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
            <div className={classList} onKeyDown={handleKeyDown}>
                <ul className="main-menu">
                    <li className="admins">
                        <div className={`link ${isAdmin || 'disabled'}`} onClick={handleSubmenu}>
                            <div className="menu-icon"><ForwardIcon /></div>
                            <span className="title admins">{ADMINS}</span>
                        </div>
                    </li>
                    {mainMenu.map((menuItem, index) => createMainMenuItem(menuItem, index))}
                    <li id="logout-li" onKeyDown={handleTabNavigation}>
                        <Logout />
                    </li>
                </ul>
                <ul className="sub-menu">
                    <li className="back">
                        <div className="link" onClick={handleSubmenu}>
                            <div className="menu-icon"><BackIcon /></div>
                            <span className="title">{BACK}</span>
                        </div>
                    </li>
                    {subMenu.map((menuItem, index) => createSubMenuItem(menuItem, index))}
                </ul>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    navStyle: PropTypes.oneOf<NAVSTYLE>(['hamburger', 'sidenav']).isRequired,
    openSubmenu: PropTypes.bool
};

export default Navbar;
