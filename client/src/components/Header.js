import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';
import Avatar from './icons/avatar.png';
import { ReactComponent as Search } from './icons/search.svg';
import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
import { ReactComponent as Profile } from './icons/profile.svg';
import { ReactComponent as Info } from './icons/info.svg';
import { ReactComponent as Logout } from './icons/logout.svg';

const Header = (props) => {
    const handleHamburgerClick = (event) => {
        const slider = event.currentTarget.nextElementSibling;
        slider.classList.toggle('slideIn');
    };
    const mobileActivePage = (event) => {
        props.setActivePage(event.currentTarget.querySelector('SPAN').innerHTML);
    };

    return (
        <header className='header'>
            <p><img src={Avatar} alt="Profile" className="avatar"/><br/><span> Jon Doe</span></p>
            <div className="search-field">
                <input type="text" placeholder="Search..."></input>
                <button><Search /></button>
            </div>
            <p className="page-name">{props.activePage}</p>
            <div className="mobile-header">
                <button className="mobile-search">
                    <Search className="mobile-search-icon" />
                </button>
                <button className="burger-lines" onClick={handleHamburgerClick}>
                    {/* A fake & hidden checkbox is used as click reciever,
                    so you can use the :checked selector on it. */}
                    <input type="checkbox" />

                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                <div className="slider">
                    <ul>
                        <li onClick={mobileActivePage}>
                            <NavLink exact to="/" className="dashboard link">
                                <div className="menu-icon"><DashboardIcon /></div>
                                <span className="title">Dashboard</span>
                            </NavLink>
                        </li>
                        <li onClick={mobileActivePage}>
                            <NavLink exact to="/profile" className="profile link">
                                <div className="menu-icon"><Profile /></div>
                                <span className="title">Profile</span>
                            </NavLink>
                        </li>
                        <li onClick={mobileActivePage}>
                            <NavLink exact to="/queries" className="queries link">
                                <div className="menu-icon"><Info /></div>
                                <span className="title">Queries</span>
                            </NavLink>
                        </li>
                    </ul>
                    <button onClick={props.signOut} className="link">
                        <div className="menu-icon"><Logout /></div>
                        <span className="title">EXIT</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired
};

export default Header;
