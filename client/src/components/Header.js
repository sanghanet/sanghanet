import React from 'react';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';
import Avatar from './icons/avatar.png';
import { ReactComponent as Search } from './icons/search.svg';

const Header = (props) => {
    return (
        <header className='header'>
            <p><img src={Avatar} alt="Profile image" className="avatar"/><br/><span> Jon Doe</span></p>
            <div className="search-field">
                <input type="text" placeholder="Search..."></input>
                <button><Search /></button>
            </div>
            <p className="page-name">{props.activePage}</p>
            <div className="mobile-header">
                <button className="mobile-search">
                    <Search className="mobile-search-icon" />
                </button>
                <button className="burger-lines">
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired
};

export default Header;
