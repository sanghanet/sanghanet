import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <h4>This a Navbar!</h4>
            <ul>
                <li><Link to='/'>Dashboard</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/queries'>Queries</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;
