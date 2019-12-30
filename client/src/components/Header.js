import React from 'react';
import PropTypes from 'prop-types';

import './Navbar_Header.scss';
import { ReactComponent as Search } from './icons/search.svg';

const Header = (props) => {
    return (
        <header className='header'>
            <p>Signed in as <br/><span> Jon Doe</span></p>
            <div className="search-field">
                <input type="text" placeholder="Search..."></input>
                <button><Search /></button>
            </div>
            <p>{props.activePage}</p>
        </header>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired
};

export default Header;
