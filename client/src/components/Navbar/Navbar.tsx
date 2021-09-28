import React, { useContext, useRef, FocusEvent } from 'react';
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
};

const Navbar: React.FC<NavbarProps> = ({ navStyle }) => {
    const context = useContext(UIcontext);
    const {
        isFinanceAdmin, isEventAdmin, isYogaAdmin, isSuperuser,
        isHamburgerOpen, closeHamburger, mobileView, showSubmenu, setShowSubmenu
    } = context;
    const isAdmin = isFinanceAdmin || isEventAdmin || isYogaAdmin || isSuperuser;

    const backRef = useRef<HTMLLIElement>(null);
    const adminRef = useRef<HTMLLIElement>(null);

    const handleAdmin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation(); // w/o this, bubbling event close the Hamburger in App.js!
        setShowSubmenu(true);
        backRef && backRef.current && backRef.current.focus();
    };

    const handleBack = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation(); // w/o this, bubbling event close the Hamburger in App.js!
        setShowSubmenu(false);
        adminRef && adminRef.current && adminRef.current.focus();
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
        const { key } = event;
        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            event.preventDefault();
        }
    };

    const handleTabNavigation = (event: React.KeyboardEvent<HTMLLIElement>): void => {
        if (event.key === 'Tab' && !event.shiftKey && isAdmin) {
            setShowSubmenu(true);
        }
    };

    const handleForwardIcon = (event: React.KeyboardEvent<HTMLLIElement>): void => {
        if (event.key === 'Enter') {
            setShowSubmenu(true);
            backRef && backRef.current && backRef.current.focus();
        };
    };

    const handleBackIcon = (event: React.KeyboardEvent<HTMLLIElement>): void => {
        if (event.key === 'Enter') {
            setShowSubmenu(false);
            adminRef && adminRef.current && adminRef.current.focus();
        };
        if (event.key === 'Tab' && event.shiftKey) {
            setShowSubmenu(false);
        };
    };

    const handleClick = (): void => {
        closeHamburger();
        if (mobileView) setShowSubmenu(false);
    };

    const handleInFocus = (event: React.FocusEvent): void => {
        if (!event.relatedTarget) {
            if (document.activeElement?.classList.contains('admins')) setShowSubmenu(false);
        }
        if (document.activeElement?.classList.contains('sub-title')) setShowSubmenu(true);
    };

    const createMainMenuItem = (menuItem: MenuItem, index: number): JSX.Element => {
        return (
            <li key={index}>
                <NavLink exact to={`/${menuItem.path}`} className="link" tabIndex={(!mobileView && isAdmin) || (mobileView && isHamburgerOpen && isAdmin) ? 0 : -1}>
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
                        tabIndex={(!mobileView && isAdmin && menuItem.isEnabled) || (mobileView && isHamburgerOpen && isAdmin && menuItem.isEnabled) ? 0 : -1}
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
        <div id={navStyle} onFocus={handleInFocus} onClick={handleClick} >
            <div className={classList} onKeyDown={handleKeyDown}>
                <ul className="main-menu">
                    <li className="admins" tabIndex={(!mobileView && isAdmin) || (mobileView && isHamburgerOpen && isAdmin) ? 0 : -1} onKeyDown={handleForwardIcon} ref={adminRef}>
                        <div className={`link ${isAdmin || 'disabled'}`} onClick={handleAdmin}>
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
                    <li
                        className="back"
                        tabIndex={(!mobileView && isAdmin) || (mobileView && isHamburgerOpen && isAdmin) ? 0 : -1}
                        onKeyDown={handleBackIcon} ref={backRef}
                    >
                        <div className="link" onClick={handleBack}>
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
    navStyle: PropTypes.oneOf<NAVSTYLE>(['hamburger', 'sidenav']).isRequired
};

export default Navbar;
