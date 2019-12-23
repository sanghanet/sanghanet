import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar.scss';
import DashboardIcon from './icons/dashboard-30.png';
import ProfileIcon from './icons/profile-30.png';
import QueryIcon from './icons/query-30.png';
import LogoutIcon from './icons/logout-30.png';

const Navbar = (props) => {
    return (
        <nav className='navbar'>
            <ul>
                <li><Link to='/'><img src={DashboardIcon} alt="Arrow" /></Link></li>
                <li><Link to='/profile'><img src={ProfileIcon} alt="Profile" /></Link></li>
                <li><Link to='/queries'><img src={QueryIcon} alt="Queries" /></Link></li>
            </ul>
            <button onClick={props.signOut}><img src={LogoutIcon} alt="Logout" /></button>
        </nav>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Navbar;
