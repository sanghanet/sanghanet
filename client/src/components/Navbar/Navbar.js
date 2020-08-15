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

        return (
            <div id={navStyle}>
                <div className={classList}>
                    <ul className="main-menu">
                        <li className="admins">
                            <div className="link" onClick={this.handleSubmenu}>
                                <div className="menu-icon"><ForwardIcon /></div>
                                <span className="title admins">{ ADMIN }</span>
                            </div>
                        </li>
                        <li>
                            <NavLink exact to="/app/dashboard" className="link">
                                <div className="menu-icon"><DashboardIcon /></div>
                                <span className="title">{ DASHBOARD }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/personal" className="link">
                                <div className="menu-icon"><PersonalIcon /></div>
                                <span className="title">{ PERSONAL }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/yoga" className="link">
                                <div className="menu-icon"><YogaIcon /></div>
                                <span className="title">{ YOGA }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/finances" className="link">
                                <div className="menu-icon"><FinanceIcon /></div>
                                <span className="title">{ FINANCES }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/events" className="link">
                                <div className="menu-icon"><EventIcon /></div>
                                <span className="title">{ EVENTS }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/members" className="link">
                                <div className="menu-icon"><MembersIcon /></div>
                                <span className="title">{ MEMBERS }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/questions" className="link">
                                <div className="menu-icon"><QuestionsIcon /></div>
                                <span className="title">{ QUESTIONS }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/app/queries" className="link">
                                <div className="menu-icon"><InfoIcon /></div>
                                <span className="title">{ QUERIES }</span>
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
                                <span className="title">{ BACK }</span>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/app/admin/finance"
                                    className={`sub-title${isFinanceAdmin ? '' : ' disabled'}`}
                                    onClick={this.handleLink}>{ FINANCE_ADMIN }</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/app/admin/event"
                                    className={`sub-title${isEventAdmin ? '' : ' disabled'}`}
                                    onClick={this.handleLink}>{ EVENT_ADMIN }</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/app/admin/yoga"
                                    className={`sub-title${isYogaAdmin ? '' : ' disabled'}`}
                                    onClick={this.handleLink}>{ YOGA_ADMIN }</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="sub-link">
                                <NavLink exact to="/app/admin/superuser"
                                    className={`sub-title${isSuperuser ? '' : ' disabled'}`}
                                    onClick={this.handleLink}>{ SUPERUSER }</NavLink>
                            </div>
                        </li>
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
