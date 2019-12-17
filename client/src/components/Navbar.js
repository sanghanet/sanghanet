import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = (props) => {
    return (
        <nav className='navbar'>
            <h4>This is a Navbar!</h4>
            <ul>
                <li><Link to='/'>Dashboard</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/queries'>Queries</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
