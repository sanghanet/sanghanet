import React from 'react';

import './Navbar_Header.scss';

const Header = (props) => {
    return (
        <header className='header'>
            <p>Signed in as <br/><span> Jon Doe</span></p>
            <div className="search-field">
                <input type="text" placeholder="Search..."></input>
                <a href="#"><span className="search-icon"></span></a>
            </div>
            <p>Dashboard</p>
        </header>
    );
};

export default Header;
