import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Yoga = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Yoga"/>
            <Navbar
                navbarScrollPosUpdate={props.navbarScrollPosUpdate}
                navbarScrollPos={props.navbarScrollPos}
                navStyle="sidenav"
            />
            <main className="align">
                <ComingSoon pageName = "Yoga" isPlural = {false}/>
            </main>
            <Footer />
        </div>
    );
};

Yoga.propTypes = {
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default Yoga;
