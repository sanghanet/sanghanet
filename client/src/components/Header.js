import React from 'react';

import './Header.scss';
import FindIcon from './icons/search-25.png';

const Header = (props) => {
    return (
        <header className='header'>
            <p>Signed in as <br/><span> Jon Doe</span></p>
            <div className="search-field">
                <input type="text" placeholder="Search..."></input>
                <a href="#"><img src={FindIcon} alt="Search icon"></img></a>
            </div>
            <p>Dashboard</p>
        </header>
    );
};

export default Header;
