import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Events = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Events"/>
            <Navbar
                navbarScrollPosUpdate={props.navbarScrollPosUpdate}
                navbarScrollPos={props.navbarScrollPos}
                navStyle="sidenav"
            />
            <main className="align">
                <ComingSoon pageName = "Events" isPlural = {true}/>
            </main>
        </div>
    );
};

Events.propTypes = {
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default Events;
