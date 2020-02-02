import React from 'react';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';
import Logout from './Logout';
import PageNavigation from './PageNavigation';
import SearchBar from './SearchBar';

import Avatar from './icons/avatar.jpg';
import { ReactComponent as SearchIcon } from './icons/search.svg';

const Header = (props) => {
    const handleHamburgerClick = (event) => {
        const slider = event.currentTarget.nextElementSibling;
        slider.classList.toggle('slideIn');
    };
    const mobileCloseMenu = (event) => {
        const slider = event.currentTarget.parentElement;
        slider.classList.toggle('slideIn');
        slider.previousElementSibling.querySelector('INPUT').checked = false;
    };

    return (
        <header className='header'>
            <div className="desktop-header">
                <div className="avatar-container">
                    <img src={Avatar} alt="Profile" className="avatar"/>
                    <p>Baby Yoda</p>
                </div>
                <SearchBar />
                <h1 className="page-name">{props.activePage}</h1>
            </div>
            <div className="mobile-header">
                <button className="mobile-search">
                    <SearchIcon className="mobile-search-icon" />
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
                    <PageNavigation activePage={mobileCloseMenu} />
                    <Logout />
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired
};

export default Header;
