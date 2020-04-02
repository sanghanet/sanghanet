import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Questions = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Questions"/>
            <Navbar
                navbarScrollPosUpdate={props.navbarScrollPosUpdate}
                navbarScrollPos={props.navbarScrollPos}
                navStyle="sidenav"
            />
            <main className="align">
                <ComingSoon pageName = "Questions" isPlural = {true}/>
            </main>
            <Footer />
        </div>
    );
};

Questions.propTypes = {
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default Questions;
